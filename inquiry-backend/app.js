// app.js (ESM)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

/* ---------------- CORS ---------------- */
const DEFAULT_ORIGINS = ['https://www.apt-world.com', 'https://apt-world.com'];
const RAW_ALLOWED = (process.env.ALLOWED_ORIGINS || DEFAULT_ORIGINS.join(','));
const ALLOWED_SET = new Set(
  RAW_ALLOWED.split(',').map(s => s.trim()).filter(Boolean)
);

// 统一的 CORS 处理（含预检 & 拦截非白名单浏览器）
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && ALLOWED_SET.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);

  // 仅对浏览器的 /api/* 做白名单拦截（服务端/脚本没有 origin，不拦）
  if (req.path.startsWith('/api/') && origin && !ALLOWED_SET.has(origin)) {
    return res.status(403).json({ ok: false, error: 'CORS rejected' });
  }
  next();
});

// 额外启用 cors 库（非必须，但方便未来扩展）
const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);
    cb(null, ALLOWED_SET.has(origin));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept'],
  maxAge: 600
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

/* ---------------- Body 解析 ---------------- */
app.use(express.json({ limit: '256kb', type: ['application/json', 'application/*+json'] }));
app.use(express.urlencoded({ limit: '256kb', extended: false }));

/* ---------------- Multer（仅处理 multipart/form-data） ---------------- */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024, files: 12 } // 单文件 ≤20MB，总数≤12
});
function maybeMulter(req, res, next) {
  if (req.is('multipart/form-data')) return upload.any()(req, res, next);
  next();
}

/* ---------------- 获取 IP / 简单限流 ---------------- */
function getClientIp(req) {
  return req.headers['cf-connecting-ip']
    || (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
    || req.socket.remoteAddress || '';
}
const limitWindowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000);
const limitMax = Number(process.env.RATE_LIMIT_MAX || 5);
const buckets = new Map();
function rateLimit(req, res, next) {
  const ip = getClientIp(req);
  const now = Date.now();
  const b = buckets.get(ip) || { count: 0, resetAt: now + limitWindowMs };
  if (now > b.resetAt) { b.count = 0; b.resetAt = now + limitWindowMs; }
  b.count += 1; buckets.set(ip, b);
  res.setHeader('X-RateLimit-Limit', String(limitMax));
  res.setHeader('X-RateLimit-Remaining', String(Math.max(0, limitMax - b.count)));
  res.setHeader('X-RateLimit-Reset', String(Math.ceil(b.resetAt / 1000)));
  if (b.count > limitMax) return res.status(429).json({ ok: false, error: 'Too Many Requests' });
  next();
}

/* ---------------- 健康检查 ---------------- */
app.get('/', (_req, res) => res.type('text/plain').send('OK'));

/* ---------------- 邮件发送器（SMTP） ---------------- */
const useSecure = String(process.env.SMTP_SECURE || '').toLowerCase() === 'true'; // 465 才 true
const hasSmtp = !!process.env.SMTP_HOST;
const transporter = hasSmtp
  ? nodemailer.createTransport({
    pool: true,
    maxConnections: 3,
    maxMessages: 100,
    rateDelta: 1000,
    rateLimit: 10,

    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || (useSecure ? 465 : 587)),
    secure: useSecure,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,

    connectionTimeout: 15_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  })
  : null;

if (transporter) {
  transporter.verify()
    .then(() => console.log('[smtp] verify ok'))
    .catch(err => console.error('[smtp] verify failed:', err));
}

async function sendMailWithRetry(mailOptions, retries = 3, delay = 5000) {
  for (let i = 1; i <= retries; i++) {
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`[mail attempt #${i}] sent successfully:`, info.messageId);
      return info; // 成功后立刻返回
    } catch (error) {
      console.error(`[mail attempt #${i}] failed:`, error.message);
      if (i === retries) {
        // 如果已经是最后一次重试，就记录到本地文件
        console.error('[mail] All retries failed. Saving to fallback log.');
        const fallbackLog = {
          timestamp: new Date().toISOString(),
          error: error.message,
          mailOptions: {
            ...mailOptions,
            // 为了安全，不要记录附件的 buffer 内容，只记录文件名
            attachments: (mailOptions.attachments || []).map(a => ({ filename: a.filename, size: a.content.length })),
          },
        };
        // 异步写入文件，不阻塞主流程
        fs.appendFile('failed_mails.log', JSON.stringify(fallbackLog) + '\n', 'utf8').catch(err => {
          console.error('[mail] Failed to write to fallback log:', err);
        });
        throw error; // 向上抛出最终的错误
      }
      // 等待一段时间再重试
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

/* ---------------- 品牌 / LOGO ---------------- */
// 只用外链 https 即可（不当附件发）
const MAIL_LOGO_URL_1 = process.env.MAIL_LOGO_URL_1 || '';
const MAIL_LOGO_URL_2 = process.env.MAIL_LOGO_URL_2 || '';

function logoImgTag(l, defaultHeight = 38) {
  const imgHeight = l.height || defaultHeight;
  if (l.url) return `<img src="${l.url}" height="${imgHeight}" alt="${esc(l.alt)}" style="display:block">`;
  return '';
}

// function renderLogosRowHtml(logos, defaultHeight = 38) {
//   const imgs = logos.map(l => logoImgTag(l, defaultHeight)).filter(Boolean);
//   return imgs.length
//     ? `<div style="display:flex;align-items:center;gap:8px;">${imgs.join('')}</div>`
//     : '';
// }

function renderLogosRowHtml(logos, defaultHeight = 38) {
  if (!logos || logos.length === 0) return '';

  const cells = logos.map((l, index) => {
    const style = index > 0 ? 'padding-left:6px;' : '';
    return `<td valign="middle" style="${style}">${logoImgTag(l, defaultHeight)}</td>`;
  }).join('');

  return `<table cellpadding="0" cellspacing="0" border="0"><tr>${cells}</tr></table>`;
}

/* ---------------- 工具 ---------------- */
function esc(s = '') {
  return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}
function fmtTime(date = new Date()) {
  const zh = date.toLocaleString('zh-CN', { hour12: false, timeZone: 'Asia/Shanghai' });
  const utc = date.toUTCString();
  return `${zh}（北京时间） / ${utc}`;
}
function tryDecodeFilename(name = '') {
  if (!name) return name;
  if (/^UTF-8''/i.test(name)) {
    const raw = name.replace(/^UTF-8''/i, '');
    try { return decodeURIComponent(raw); } catch { }
  }
  if (/Ã|Â|�/.test(name)) {
    try { return Buffer.from(name, 'latin1').toString('utf8'); } catch { }
  }
  return name;
}
function renderText(p = {}) {
  const lines = [
    '📩 新官网询盘 (Plain Text)',
    `时间: ${fmtTime(new Date())}`,
    `来源: ${p.origin || ''}`,
    `IP: ${p.ip || ''}`,
    '',
    `姓名: ${p.name || ''}`,
    `公司: ${p.company || ''}`,
    `邮箱: ${p.email || ''}`,
    `电话: ${p.phone || ''}`,
    `国家/地区: ${p.country || ''}`,
    `产品: ${p.product || ''}`,
    `规格: ${p.specification || ''}`,
    `数量: ${p.quantity || ''}`,
    `标题: ${p.title || ''}`,
    `页面: ${p.page || ''}`,
    '',
    '留言：',
    p.message || '',
    '',
    `User-Agent: ${p.ua || ''}`,
  ];
  return lines.join('\n');
}
function renderHtml(p = {}, files = []) {
  const brand = {
    primary: '#1f8ceb',
    text: '#111827',
    subText: '#6b7280',
    bg: '#f3f4f6',
    border: '#e5e7eb',
  };

  const logos = [
    { url: MAIL_LOGO_URL_1, alt: 'Logo 1', height: 70 },
    { url: MAIL_LOGO_URL_2, alt: 'Logo 2', height: 55 },
  ];

  // function logoImgTag(l, defaultHeight = 38) {
  //   const imgHeight = l.height || defaultHeight;
  //   if (l.url) return `<img src="${l.url}" height="${imgHeight}" alt="${esc(l.alt)}" style="display:block">`;
  //   return '';
  // }

  // function renderLogosRowHtml(logos, defaultHeight = 38) {
  //   const imgs = logos.map(l => logoImgTag(l, defaultHeight)).filter(Boolean);
  //   return imgs.length
  //     ? `<div style="display:flex;align-items:center;gap:8px;">${imgs.join('')}</div>`
  //     : '';
  // }

  const safe = (v) => esc(v ?? '');
  const field = (label, value) => {
    if (!value) return '';
    return `
      <tr>
        <td style="padding:6px 10px;border-bottom:1px solid ${brand.border};color:${brand.subText};white-space:nowrap;">${label}</td>
        <td style="padding:6px 10px;border-bottom:1px solid ${brand.border};color:${brand.text};word-break:break-all;">${value}</td>
      </tr>`;
  };

  const topMeta = [
    p.origin && `<span style="display:inline-block;padding:4px 8px;border:1px solid ${brand.border};border-radius:999px;margin-right:6px;">Origin: ${safe(p.origin)}</span>`,
    p.ip && `<span style="display:inline-block;padding:4px 8px;border:1px solid ${brand.border};border-radius:999px;margin-right:6px;">IP: ${safe(p.ip)}</span>`,
  ].filter(Boolean).join('');

  const filesBlock = (files && files.length)
    ? `
      <tr>
        <td style="padding:16px 24px;border-top:1px solid ${brand.border}" colspan="2">
          <div style="font-weight:600;color:${brand.text};margin-bottom:8px;">附件（${files.length}）</div>
          <ul style="margin:0;padding-left:18px;color:${brand.text};line-height:1.6">
            ${files.map(f => `<li>${safe(tryDecodeFilename(f.originalname))}（${safe(f.size < 1024 * 1024 ? (Math.round(f.size / 102.4) / 10 + ' KB') : (Math.round(f.size / 104857.6) / 10 + ' MB'))}）</li>`).join('')}
          </ul>
        </td>
      </tr>`
    : '';

  return `<!doctype html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:${brand.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,'Noto Sans','PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.bg};padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid ${brand.border};border-radius:16px;overflow:hidden">
          <tr>
            <td style="padding:20px 24px;border-bottom:1px solid ${brand.border};background:linear-gradient(90deg, ${brand.bg}, #fff);">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td valign="middle">
                  ${renderLogosRowHtml(logos, 48)}
                </td>
                <td valign="middle" style="padding-left:12px;">
                  <div style="font-size:18px;font-weight:700;color:${brand.text};line-height:1.2;">新官网询盘</div>
                  <div style="font-size:12px;color:${brand.subText};margin-top:4px;">${fmtTime(new Date())}</div>
                </td>
              </tr>
            </table>
            <div style="margin-top:12px;font-size:12px;color:${brand.subText};">${topMeta}</div>  
            </td>
          </tr>

          <tr><td style="padding:6px 0 0 0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
              ${field('姓名', safe(p.name))}
              ${field('公司', safe(p.company))}
              ${field('邮箱', p.email ? `<a href="mailto:${safe(p.email)}" style="color:${brand.primary};text-decoration:none;">${safe(p.email)}</a>` : '')}
              ${field('电话/WhatsApp', safe(p.phone))}
              ${field('国家/地区', safe(p.country))}
              ${field('产品', safe(p.product))}
              ${field('规格', safe(p.specification))}
              ${field('数量', safe(p.quantity))}
              ${field('标题', safe(p.title))}
              ${field('页面', p.page ? `<a href="${safe(p.page)}" style="color:${brand.primary};text-decoration:none;">${safe(p.page)}</a>` : '')}
              ${field('User-Agent', safe(p.ua))}
            </table>
          </td></tr>

          <tr>
            <td style="padding:16px 24px;">
              <div style="font-weight:600;color:${brand.text};margin-bottom:8px;">留言</div>
              <div style="padding:12px;border:1px solid ${brand.border};border-radius:12px;background:#fafafa;color:${brand.text};line-height:1.6;white-space:pre-wrap;word-break:break-word;">
                ${safe(p.message || '')}
              </div>
            </td>
          </tr>

          ${filesBlock}

          <tr>
            <td style="padding:14px 24px;border-top:1px solid ${brand.border};background:${brand.bg};color:${brand.subText};font-size:12px;">
              如需回复访客，请直接 <strong>“回复邮件”</strong>（已设置 Reply-To 到访客邮箱）。
            </td>
          </tr>
        </table>

        <div style="color:${brand.subText};font-size:12px;margin-top:12px;">
          © ${new Date().getFullYear()} Apollo Power Transmission
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ---------------- 自动回复 ---------------- */
const autoReplyEnabled = /^true$/i.test(process.env.AUTO_REPLY_ENABLED || 'true');
const ACK_WINDOW_MIN = Number(process.env.AUTO_REPLY_WINDOW_MIN || 1);
const lastAckByEmail = new Map();

function isValidEmail(email = '') {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    && !/no-?reply/i.test(email)
    && !/postmaster|mailer-daemon/i.test(email);
}
function shouldSendAck(email) {
  const now = Date.now();
  const last = lastAckByEmail.get(email) || 0;
  if (now - last < ACK_WINDOW_MIN * 60 * 1000) return false;
  return true;
}

function ackSubject(payload = {}) {
  const base = process.env.AUTO_REPLY_SUBJECT || 'Thanks for your inquiry';
  const hint = payload.product || payload.title || '';
  return hint ? `${base} – ${hint}` : base;
}

function buildAckHtml(p = {}) {
  const hello = p.name ? `Hi ${esc(p.name)},` : 'Hello,';
  const tail = new Date().toLocaleString('en-GB', { hour12: false });

  const socialLinks = {
    linkedin: 'https://www.linkedin.com/in/xiangjiang-yang-b233a6172/?trk=public-profile-join-page',
    twitter: 'https://x.com/Xiangjiang523',
    facebook: 'https://www.facebook.com/profile.php?id=100075473473693',
  };
  const socialIcons = {
    linkedin: 'https://apt-world.com/images/home/linkedin.webp',
    twitter: 'https://apt-world.com/images/home/twitter.webp',
    facebook: 'https://apt-world.com/images/home/facebook.webp',
  };

  const brand = {
    primary: '#1f8ceb',
    text: '#111827',
    subText: '#6b7280',
    bg: '#f4f7f6',
    border: '#e0e0e0',
    cardBg: '#f0f5f9',
    cardBorder: '#dfe9f5'
  };

  const logos = [
    { url: MAIL_LOGO_URL_1, alt: 'Logo 1', height: 70 },
    { url: MAIL_LOGO_URL_2, alt: 'Logo 2', height: 55 },
  ];

  const field = (label, value) => {
    if (!value) return '';
    return `
      <tr>
        <td style="padding:10px 15px;border-bottom:1px solid ${brand.border};color:${brand.subText};width:120px;font-size:14px;font-weight:600;">${esc(label)}</td>
        <td style="padding:10px 15px;border-bottom:1px solid ${brand.border};font-size:15px;color:${brand.text};">${esc(value)}</td>
      </tr>`;
  };

  const fieldRawHtml = (label, rawHtmlValue) => {
    if (!rawHtmlValue) return '';
    return `
    <tr>
      <td style="padding:10px 15px;border-bottom:1px solid ${brand.border};color:${brand.subText};width:120px;font-size:14px;font-weight:600;">${esc(label)}</td>
      <td style="padding:10px 15px;border-bottom:1px solid ${brand.border};font-size:15px;color:${brand.text};">${rawHtmlValue}</td>
    </tr>`;
  };

  return `<!doctype html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Auto Reply</title>
    <style>
      @media screen and (max-width: 600px) {
        .content-table { width: 100% !important; }
        .contact-card { width: 100% !important; }
      }
      @media screen and (max-width: 600px) {
        .logo-cell,
        .title-cell {
          display: block !important;
          width: 100% !important;
          text-align: center !important;
          padding-left: 0 !important;
        }

        .title-cell {
          padding-left: 0 !important;
          padding-top: 15px !important;
        }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:${brand.bg};font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="${brand.bg}">
    <tr>
      <td align="center" style="padding:20px 0;">
        <table class="content-table" width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:680px;background-color:#ffffff;border:1px solid ${brand.border};border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:20px 30px; border-bottom:1px solid ${brand.border}; background:linear-gradient(90deg, ${brand.cardBg}, #ffffff);">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td valign="middle" class="logo-cell">
                    ${renderLogosRowHtml(logos, 48)}
                  </td>
                  <td valign="middle" class="title-cell" style="padding-left:12px;">
                    <div style="font-size:24px;font-weight:700;color:${brand.text};line-height:1.2;">Apollo Power Transmission</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 30px 20px 30px;">
              <p style="margin:0;font-size:18px;line-height:1.6;color:${brand.text};">${hello}</p>
              <p style="margin:16px 0 0 0;font-size:16px;line-height:1.6;color:${brand.subText};">Thanks for reaching out to Apollo Power Transmission (APT). We’ve received your message and our team will get back to you shortly.</p>
              <p style="margin:16px 0 0 0;font-size:16px;line-height:1.6;color:${brand.subText};">If you have any further questions, please feel free to contact us via this email.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 30px;">
              <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;background:#fafafa;border:1px solid ${brand.border};border-radius:8px;">
                <tbody>
                  ${fieldRawHtml('Email', p.email ? `<a href="mailto:${esc(p.email)}" style="color:${brand.primary};text-decoration:none;">${esc(p.email)}</a>` : '')}
                  ${field('Name', p.name)}
                  ${field('Product', p.product)}
                  ${field('Specification', p.specification)}
                  ${field('Quantity', p.quantity)}
                  ${field('Title', p.title)}
                  ${fieldRawHtml('Page', p.page ? `<a href="${esc(p.page)}" style="color:${brand.primary};text-decoration:none;">${esc(p.page)}</a>` : '')}
                  <tr>
                    <td style="padding:10px 15px;color:${brand.subText};vertical-align:top;font-size:14px;font-weight:600;">Message</td>
                    <td style="padding:10px 15px;white-space:pre-wrap;font-size:15px;color:${brand.text};">${esc(p.message || '')}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 30px 30px 30px;">
              <p style="margin:0;font-size:16px;color:${brand.subText};">If you didn’t submit this request, please ignore this email.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 30px 40px 30px;">
              <table class="contact-card" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:${brand.cardBg};border:1px solid ${brand.cardBorder};border-radius:8px;padding:25px;">
                <tr>
                  <td style="font-size:15px;color:${brand.text};line-height:1.7;">
                    <strong style="font-size:16px;color:${brand.primary};">Apollo Power Transmission (APT)</strong><br>
                    <strong>Website:</strong> <a href="https://apt-world.com" style="color:${brand.primary};text-decoration:none;">apt-world.com</a><br>
                    <strong>Industry Address:</strong> Dacaozhuang Development Zone, Ningjin Coutry, Hebei Province, China<br>
                    <strong>Sales Department Address:</strong> Ruihe Center 1104, Changan District, Shijiazhuang City, Hebei Province, China
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:10px;">
                    <a href="${socialLinks.linkedin}" style="text-decoration:none;display:inline-block;margin-right:10px;">
                      <img src="${socialIcons.linkedin}" alt="LinkedIn" width="26" height="26" border="0" style="display:block; border-radius: 6px;">
                    </a>
                    <a href="${socialLinks.twitter}" style="text-decoration:none;display:inline-block;margin-right:10px;">
                      <img src="${socialIcons.twitter}" alt="Twitter" width="26" height="26" border="0" style="display:block; border-radius: 6px;">
                    </a>
                    <a href="${socialLinks.facebook}" style="text-decoration:none;display:inline-block;">
                      <img src="${socialIcons.facebook}" alt="Facebook" width="26" height="26" border="0" style="display:block; border-radius: 6px;">
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <table class="content-table" width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:680px;">
          <tr>
            <td align="center" style="padding:20px 0;">
              <p style="color:${brand.subText};font-size:12px;margin:0;">Sent: ${tail}</p>
              <p style="color:${brand.subText};font-size:12px;margin:5px 0 0 0;">
                © ${new Date().getFullYear()} Apollo Power Transmission
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  </body>
  </html>`;
}
function buildAckText(p = {}) {
  return [
    `Hello${p.name ? ' ' + p.name : ''},`,
    `Thanks for reaching out to Apollo Power Transmission APT. We’ve received your message and will reply shortly.`,
    `If you have any further questions, please feel free to contact us via this email.`,
    '',
    `Email: ${p.email || ''}`,
    `Name: ${p.name || ''}`,
    `Product: ${p.product || ''}`,
    `Specification: ${p.specification || ''}`,
    `Quantity: ${p.quantity || ''}`,
    `Title: ${p.title || ''}`,
    `Page: ${p.page || ''}`,
    '',
    'Message:',
    String(p.message || ''),
  ].join('\n');
}
async function sendAutoReply(transporter, to, payload) {
  // 163 企业邮：发件人必须是本地用户或其别名
  const fromUser = process.env.SMTP_USER;
  if (!fromUser) throw new Error('SMTP_USER not set for auto-reply');

  const replyTo = process.env.REPLY_TO;

  const info = await sendMailWithRetry({
    from: `"ApolloPT Website" <${fromUser}>`,
    sender: fromUser,
    replyTo,
    envelope: { from: fromUser, to },
    subject: ackSubject(payload),
    html: buildAckHtml(payload),
    text: buildAckText(payload)
  });
  lastAckByEmail.set(to, Date.now());
  console.log('[ack] sent', info && (info.messageId || info.response));
}

/* ---------------- /api/inquiry ---------------- */
app.post('/api/inquiry', maybeMulter, rateLimit, async (req, res) => {
  const isMultipart = !!req.is('multipart/form-data');
  const ip = getClientIp(req);
  const ua = req.headers['user-agent'] || '';
  const origin = req.headers.origin || '';

  const b = req.body || {};
  let name = b.name || '';
  const email = b.email || '';
  const phone = b.phone || b.whatsapp || '';
  const company = b.company || '';
  const country = b.country || '';
  const title = b.title || b._subject || '';
  const page = b.page || b._page || req.headers.referer || '';
  const product = b.product || b.product_name || '';

  // 独立规格/数量字段
  const specification = b.specification || b.spec || '';
  const quantity = b.quantity || b.qty || '';

  let message = b.message || '';

  // 若无 message，且是产品表单常见字段，补充 message（仅兜底）
  // if (!message && (product || specification || quantity)) {
  //   const parts = [
  //     product ? `Product: ${product}` : '',
  //     // specification ? `Specification: ${specification}` : '',
  //     // quantity ? `Quantity: ${quantity}` : ''
  //   ].filter(Boolean);
  //   if (parts.length) message = parts.join('\n');
  // }

  if (!name && email) name = email.split('@')[0];

  // 校验
  if (isMultipart) {
    const hasFiles = Array.isArray(req.files) && req.files.length > 0;
    if (!email || !(message || product || specification || quantity || hasFiles)) {
      return res.status(400).json({ ok: false, error: 'email and one of message/product/specification/quantity/attachments required' });
    }
  } else {
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'name/email/message required' });
    }
  }

  // 附件总量限制
  const files = Array.isArray(req.files) ? req.files : [];
  const totalBytes = files.reduce((s, f) => s + (f.size || 0), 0);
  const MAX_TOTAL = 25 * 1024 * 1024;
  if (totalBytes > MAX_TOTAL) {
    return res.status(400).json({ ok: false, error: 'Total attachments exceed 24MB' });
  }

  const payload = {
    ip, ua, origin,
    name, email, phone, company, country, title, page,
    product, specification, quantity, message
  };

  // 业务日志
  console.log('[inquiry]', {
    time: new Date().toISOString(),
    ...payload,
    files: files.map(f => ({ name: f.originalname, type: f.mimetype, size: f.size }))
  });

  // 发管理员通知
  try {
    if (!transporter) {
      console.warn('[mail] transporter not configured; skipped sending');
    } else {
      const to = process.env.MAIL_TO;
      const from = process.env.SMTP_USER;
      if (!to || !from) {
        console.warn('[mail] MAIL_TO/SMTP_FROM missing, skip sending');
      } else {
        const subject = `[Inquiry] ${product || title || 'New message'} - ${name || email}`;

        const info = await sendMailWithRetry({
          from: `"ApolloPT Website" <${from}>`,
          to,
          subject,
          replyTo: email || undefined,
          text: renderText(payload),
          html: renderHtml(payload, files),
          attachments: files.map(f => ({
            filename: tryDecodeFilename(f.originalname),
            content: f.buffer,
            contentType: f.mimetype
          }))
        });
        console.log('[mail] sent', info && (info.messageId || info.response));
      }
    }
  } catch (err) {
    console.error('[mail] send failed:', err);
    // 邮件失败不影响前端响应
  }

  // 自动回复（失败也不影响前端）
  try {
    if (autoReplyEnabled && transporter && isValidEmail(email) && shouldSendAck(email)) {
      await sendAutoReply(transporter, email, payload);
    } else {
      // console.log('[ack] skipped', {
      //   enabled: autoReplyEnabled,
      //   hasTransporter: !!transporter,
      //   email,
      //   ok: isValidEmail(email),
      //   windowOk: shouldSendAck(email)
      // });
      const now = Date.now();
      const last = lastAckByEmail.get(email) || 0;
      const timeLeft = Math.round((ACK_WINDOW_MIN * 60 * 1000 - (now - last)) / 1000);

      console.log(`[ack] skipped for ${email}. Reason: rate limit window. Please try again in ${timeLeft} seconds.`);
    }
  } catch (e) {
    console.warn('[ack] failed:', e);
  }

  return res.status(200).json({ ok: true });
});

// 兜底：GET /api/inquiry 返回 404（避免误探）
app.get('/api/inquiry', (_req, res) => res.status(404).type('text/plain').send('Not Found'));

/* ---------------- 启动 ---------------- */
if (transporter) {
  transporter.verify((error, success) => {
    if (error) {
      console.error('[SMTP VERIFY FAILED]', error);
      console.warn('!!! SMTP configuration is incorrect. Emails will not be sent. !!!');
    } else {
      console.log('[SMTP VERIFY SUCCESS] Server is ready to take our messages');
    }
  });
}

app.listen(PORT, () => {
  console.log(`Apollo Inquiry Backend listening on ${PORT}`);
  console.log('Allowed origins:', Array.from(ALLOWED_SET).join(', '));
});
