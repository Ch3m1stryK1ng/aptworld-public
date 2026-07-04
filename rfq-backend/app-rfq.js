// app-rfq.js (ESM)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import multer from 'multer';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

/* ---------------- CORS ---------------- */
const DEFAULT_ORIGINS = ['https://www.apt-world.com', 'https://apt-world.com'];
const RAW_ALLOWED = (process.env.ALLOWED_ORIGINS || DEFAULT_ORIGINS.join(','));
const ALLOWED_SET = new Set(
    RAW_ALLOWED.split(',').map(s => s.trim()).filter(Boolean)
);

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && ALLOWED_SET.has(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Vary', 'Origin');
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
    }
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    if (req.path.startsWith('/api/') && origin && !ALLOWED_SET.has(origin)) {
        return res.status(403).json({ ok: false, error: 'CORS rejected' });
    }
    next();
});

const corsOptions = {
    origin: (origin, cb) => {
        if (!origin || ALLOWED_SET.has(origin)) {
            cb(null, true);
        } else {
            cb(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept'],
    maxAge: 600
};
app.use(cors(corsOptions));

/* ---------------- Body & File Parsers ---------------- */
app.use(express.json({ limit: '256kb' }));
app.use(express.urlencoded({ limit: '256kb', extended: false }));
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024, files: 12 }
});
const maybeMulter = (req, res, next) => {
    if (req.is('multipart/form-data')) return upload.any()(req, res, next);
    next();
};

/* ---------------- Rate Limiting ---------------- */
function getClientIp(req) {
    return req.headers['cf-connecting-ip']
        || (req.headers['x-forwarded-for'] || '').split(',')[0].trim()
        || req.socket.remoteAddress || '';
}
const limitWindowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000);
const limitMax = Number(process.env.RATE_LIMIT_MAX || 10);
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

/* ---------------- Health Check ---------------- */
app.get('/', (_req, res) => res.type('text/plain').send('OK'));

/* ---------------- Mail Transporter & Helpers ---------------- */
const useSecure = String(process.env.SMTP_SECURE || '').toLowerCase() === 'true';
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
            if (!transporter) throw new Error('Transporter not configured');
            const info = await transporter.sendMail(mailOptions);
            console.log(`[mail attempt #${i}] sent successfully:`, info.messageId);
            return info;
        } catch (error) {
            console.error(`[mail attempt #${i}] failed:`, error.message);
            if (i === retries) {
                console.error('[mail] All retries failed. Saving to fallback log.');
                const fallbackLog = {
                    timestamp: new Date().toISOString(),
                    error: error.message,
                    mailOptions: {
                        ...mailOptions,
                        attachments: (mailOptions.attachments || []).map(a => ({ filename: a.filename, size: a.content?.length })),
                    },
                };
                fs.appendFile('failed_mails.log', JSON.stringify(fallbackLog) + '\n', 'utf8').catch(err => {
                    console.error('[mail] Failed to write to fallback log:', err);
                });
                throw error;
            }
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

/* ---------------- Global Utilities ---------------- */
const MAIL_LOGO_URL_1 = process.env.MAIL_LOGO_URL_1 || '';
const MAIL_LOGO_URL_2 = process.env.MAIL_LOGO_URL_2 || '';

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
    primary: '#007acc',
    text: '#111827',
    subText: '#6b7280',
    bg: '#f4f7f6',
    border: '#e0e0e0',
    cardBg: '#f0f5f9',
    cardBorder: '#dfe9f5'
};

function logoImgTag(l, defaultHeight = 48) {
    const imgHeight = l.height || defaultHeight;
    if (l.url) return `<img src="${l.url}" height="${imgHeight}" alt="${esc(l.alt)}" style="display:block;border:0;">`;
    return '';
}

function renderLogosRowHtml(logos, defaultHeight = 48) {
    if (!logos || logos.length === 0) return '';
    const cells = logos.filter(l => l.url).map((l, index) => {
        const style = index > 0 ? 'padding-left:12px;' : '';
        return `<td valign="middle" style="${style}">${logoImgTag(l, defaultHeight)}</td>`;
    }).join('');
    return `<table cellpadding="0" cellspacing="0" border="0"><tr>${cells}</tr></table>`;
}

function esc(s = '') {
    return String(s ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

function fmtTime(date = new Date()) {
    const zh = date.toLocaleString('zh-CN', { hour12: false, timeZone: 'Asia/Shanghai' });
    const utc = date.toUTCString();
    return `${zh}（北京时间） / ${utc}`;
}

function tryDecodeFilename(name = '') {
    if (!name) return name;
    try {
        if (/^UTF-8''/i.test(name)) return decodeURIComponent(name.replace(/^UTF-8''/i, ''));
        if (/Ã|Â|/.test(name)) return Buffer.from(name, 'latin1').toString('utf8');
    } catch { }
    return name;
}

/* ---------------- RFQ Admin Email Template ---------------- */
function renderRfqHtml(p = {}, files = []) {
    const safe = (v) => esc(v);

    const field = (label, value) => {
        if (!value || String(value).trim() === '') return '';
        const formattedValue = String(value).replace(/\n/g, '<br>'); // Handle multiline notes
        return `<tr><td style="padding:8px 0;color:${brand.subText};width:180px;vertical-align:top;font-weight:600;">${label}</td><td style="padding:8px 0;color:${brand.text};">${formattedValue}</td></tr>`;
    };

    const renderSection = (title, fieldsObject) => {
        const content = Object.entries(fieldsObject)
            .map(([label, value]) => field(label, value))
            .join('');
        if (content.trim() === '') return '';
        return `<tr><td style="padding:20px 30px;"><h3 style="margin:0 0 12px 0;font-size:18px;color:${brand.text};border-bottom:2px solid ${brand.primary};padding-bottom:8px;">${title}</h3><table cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;font-size:15px;">${content}</table></td></tr>`;
    };

    let techSection = '';
    const productType = p.productType;
    if (productType && productType !== "Other") {
        let techFields = {};
        switch (productType) {
            case 'Pulley':
                const pulleyUnit = p.pulleydia_standard === 'imperial' ? '(inch)' : '(mm)';

                techFields = {
                    'Standard': p.pulley_standard,
                    'Groove Profile': p.pulley_section,
                    'Dimension Feature': p.pulleydia_standard,
                    'Grooves': p.pulley_grooves,
                    'Pitch Dia. PD': p.pulley_pd ? `${p.pulley_pd} ${pulleyUnit}` : '',
                    'Outside Dia. OD': p.pulley_od ? `${p.pulley_od} ${pulleyUnit}` : '',
                    'Rim Width F': p.pulley_f ? `${p.pulley_f} ${pulleyUnit}` : '',
                    'Bore Dia. J': p.pulley_j ? `${p.pulley_j} ${pulleyUnit}` : '',
                    'Left Hub Projection K': p.pulley_k ? `${p.pulley_k} ${pulleyUnit}` : '',
                    'Hub Length L': p.pulley_l ? `${p.pulley_l} ${pulleyUnit}` : '',
                    'Right Hub Projection M': p.pulley_m ? `${p.pulley_m} ${pulleyUnit}` : '',
                    'Bore Type': p.pulley_bore_type,
                    'Bore': p.pulley_bore_dia ? `${p.pulley_bore_dia} ${pulleyUnit}` : '',
                    'Keyway Standard': p.pulley_keyway_standard,
                    'Bore Tolerance': p.pulley_bore_tolerance,
                    'Material': p.pulley_material,
                    'Heat Treatment': p.pulley_heat_treatment,
                    'Surface Finish': p.pulley_surface_finish,
                    'Dynamic Balance': p.pulley_dynamic_balance
                };
                break;
            case 'Taper Bushing':
                const bushUnit = p.bushbore_standard === 'imperial' ? '(inch)' : '(mm)';

                techFields = {
                    'Standard': p.bush_standard,
                    'Bore Standard': p.bushbore_standard,
                    'Bush Series': p.bush_series,
                    'Bore': p.bush_bore_dia ? `${p.bush_bore_dia} ${bushUnit}` : '',
                    'Large End Diameter': p.bush_Lend_dia ? `${p.bush_Lend_dia} ${bushUnit}` : '',
                    'Overall Length': p.bush_overall_len ? `${p.bush_overall_len} ${bushUnit}` : '',
                    'P.C.D.': p.bush_PC_dia ? `${p.bush_PC_dia} ${bushUnit}` : '',
                    'Keyway': p.bush_keyway,
                    'Material': p.bush_material,
                    'Surface Finish': p.bush_finish
                };
                break;
            case 'Coupling':
                const couplingUnit = p.coupling_bore_unit === 'inch' ? '(inch)' : '(mm)';

                techFields = {
                    'Type': p.coupling_type,
                    'Model/Size': p.coupling_model,
                    'Bore Unit': p.coupling_bore_unit,
                    'Keyway Standard': p.coupling_keyway_standard,
                    'Bore 1 Dia.': p.coupling_bore1 ? `${p.coupling_bore1} ${couplingUnit}` : '',
                    'Bore 2 Dia.': p.coupling_bore2 ? `${p.coupling_bore2} ${couplingUnit}` : '',
                    'Material': p.coupling_material,
                    'Element/Spider Material': p.coupling_element
                };
                break;
            case 'Sprocket':
                const sprocketUnit = p.sprocket_standard === 'american' ? '(inch)' : '(mm)';

                techFields = {
                    'Standard': p.sprocket_standard,
                    'Chain Pitch': p.sprocket_pitch,
                    'Teeth': p.sprocket_teeth,
                    'Strands': p.sprocket_strands,
                    'Bore Type': p.sprocket_bore_type,
                    'Bore': p.sprocket_bore_dia ? `${p.sprocket_bore_dia} ${sprocketUnit}` : '',
                    'Keyway Standard': p.sprocket_keyway_standard,
                    'Bore Tolerance': p.sprocket_bore_tolerance,
                    'Material': p.sprocket_material,
                    'Teeth Hardening': p.sprocket_heat_treatment,
                    'Surface Finish': p.sprocket_finish
                };
                break;
        }
        techSection = renderSection(`Technical Specifications (${productType})`, techFields);
    }

    const filesContent = files.length > 0
        ? files.map(f => `<li>${safe(tryDecodeFilename(f.originalname))} (${(f.size / 1024 / 1024).toFixed(2)} MB)</li>`).join('')
        : '<li>None</li>';

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

    const logos = [
        { url: MAIL_LOGO_URL_1, alt: 'APT Logo', height: 70 },
        { url: MAIL_LOGO_URL_2, alt: 'APT Text Logo', height: 55 }
    ];

    return `<!doctype html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>RFQ Received</title>
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
                                <td style="padding:20px 30px; border-bottom:1px solid ${brand.border};">
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                        <tr>
                                            <td class="logo-cell" valign="middle">
                                                ${renderLogosRowHtml(logos, 48)}
                                            </td>
                                            <td class="title-cell" valign="middle" style="padding-left:12px;">
                                                <div style="font-size:24px;font-weight:700;color:${brand.text};">New RFQ Submission</div>
                                                <div style="font-size:12px;color:${brand.subText};margin-top:4px;">${fmtTime(new Date())}</div>
                                            </td>
                                        </tr>
                                    </table>
                                    <div style="margin-top:12px;font-size:12px;color:${brand.subText};">${topMeta}</div>
                                </td>
                            </tr>
                            ${renderSection('Contact Information', {
        'Company': safe(p.company),
        'Contact Person': safe(p.name),
        'Email': `<a href="mailto:${safe(p.email)}" style="color:${brand.primary};">${safe(p.email)}</a>`,
        'Phone / WhatsApp': safe(p.phone),
        'Industry': safe(p.industry),
        'Country / Region': safe(p.country),
        'Destination Port': safe(p.port)
    }
    )}
                            ${renderSection('Project Information', {
        'Product Type': safe(p.productType),
        'Quantity': safe(p.qty),
        'Incoterm': safe(p.incoterm),
        'Due Date': safe(p.due),
        'Application / Series': safe(p.series)
    }
    )}
                            ${techSection}
                            ${renderSection('Quality & Compliance', {
        'Reports Required': safe(p.reports),
        'Packaging': safe(p.packaging),
        'NDA Agreement': safe(p.nda),
        'Notes': `<div style="white-space:pre-wrap;word-break:break-word;">${safe(p.notes)}</div>`
    }
    )}
                            ${renderSection(`Attachments (${files.length})`, { '': `<ul>${filesContent}</ul>` })}
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

/* ---------------- RFQ Auto-Reply Email Template ---------------- */
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
    const base = process.env.AUTO_REPLY_SUBJECT || 'Thanks for your rfq';
    const hint = payload.product || payload.title || '';
    return hint ? `${base} – ${hint}` : base;
}

function buildRfqAckHtml(p = {}) {
    const hello = p.name ? `Hi ${esc(p.name)},` : 'Hello,';
    const logos = [{ url: MAIL_LOGO_URL_1, alt: 'APT Logo', height: 70 }, { url: MAIL_LOGO_URL_2, alt: 'APT Text Logo', height: 55 }];

    const field = (label, value) => {
        if (!value || String(value).trim() === '') return '';
        return `<tr><td style="padding:8px 0;color:${brand.subText};width:35%;vertical-align:top;font-weight:600;">${label}</td><td style="padding:8px 0;color:${brand.text};">${esc(value)}</td></tr>`;
    };

    const fieldRawHtml = (label, rawHtmlValue) => {
        if (!rawHtmlValue) return '';
        return `<tr><td style="padding:8px 0;color:${brand.subText};width:35%;vertical-align:top;font-weight:600;">${esc(label)}</td><td style="padding:8px 0;color:${brand.text};">${rawHtmlValue}</td></tr>`;
    }

    return `<!doctype html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>RFQ Received</title>
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
                                <td style="padding:20px 30px; border-bottom:1px solid ${brand.border};">
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                        <tr>
                                            <td class="logo-cell" valign="middle">${renderLogosRowHtml(logos, 48)}</td>
                                            <td class="title-cell" valign="middle" class="title-cell" style="padding-left:12px;">
                                                <div style="font-size:24px;font-weight:700;color:${brand.text};line-height:1.2;">Apollo Power Transmission</div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:40px 30px;">
                                    <p style="margin:0;font-size:20px;font-weight:600;color:${brand.text};">${hello}</p>
                                    <p style="margin:16px 0 0 0;font-size:16px;line-height:1.6;color:${brand.subText};">
                                        Thank you for your Request for Quotation. We have received it successfully and our engineering team will get back to you with a detailed quote shortly.
                                    </p>
                                    <p style="margin:16px 0 0 0;font-size:16px;line-height:1.6;color:${brand.subText};">
                                        For your reference, here is a summary of your request:
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:0 30px;">
                                    <table cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;font-size:15px;padding:15px;background-color:#fafafa;border-radius:8px;">
                                        ${field('Company', p.company)}
                                        ${field('Contact Person', p.name)}
                                        ${fieldRawHtml('Email', p.email ? `<a href="mailto:${esc(p.email)}" style="color:${brand.primary};text-decoration:none;">${esc(p.email)}</a>` : '')}
                                        ${field('Product Type', p.productType)}
                                        ${field('Quantity', p.qty)}
                                        ${field('Incoterm', p.incoterm)}
                                        ${field('Date', p.due)}
                                        ${field('Destination Port', p.port)}
                                        ${fieldRawHtml('Page', p.origin ? `<a href="${esc(p.origin)}" style="color:${brand.primary};text-decoration:none;">${esc(p.origin)}</a>` : '')}
                                        ${field('Notes', p.notes)}
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:30px 30px 40px 30px;">
                                    <p style="margin:0;font-size:16px;color:${brand.subText};">
                                        If you didn’t submit this request, please ignore this email.
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:0 30px 40px 30px;">
                                    <table class="contact-card" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:${brand.cardBg};border-radius:8px;padding:25px;">
                                        <tr>
                                            <td style="font-size:15px;color:${brand.text};line-height:1.7;">
                                                <strong style="font-size:16px;color:${brand.primary};">Apollo Power Transmission (APT)</strong><br>
                                                <strong>Website:</strong> <a href="https://apt-world.com" style="color:${brand.primary};text-decoration:none;">apt-world.com</a><br>
                                                strong>Industry Address:</strong> Dacaozhuang Development Zone, Ningjin Coutry, Hebei Province, China<br>
                                                <strong>Sales Department Address:</strong> Ruihe Center 1104, Changan District, Shijiazhuang City, Hebei Province, China
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding-top:20px;">
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
                    </td>
                </tr>
            </table>
        </body>
    </html>`;
}

async function sendAutoReply(transporter, to, payload) {
    const fromUser = process.env.SMTP_USER;
    if (!fromUser) throw new Error('SMTP_USER not set for auto-reply');

    const replyTo = process.env.REPLY_TO;

    const info = await sendMailWithRetry({
        from: `"ApolloPT RFQ" <${fromUser}>`,
        to,
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

/* ---------------- /api/rfq (NEW ENDPOINT) ---------------- */
app.post('/api/rfq', maybeMulter, rateLimit, async (req, res) => {
    const ip = getClientIp(req);
    const ua = req.headers['user-agent'] || '';
    const origin = req.headers.origin || '';
    const files = Array.isArray(req.files) ? req.files : [];
    const b = req.body || {};

    const payload = {
        ip, ua, origin,
        // Contact
        company: b.company, name: b.name, email: b.email, phone: b.phone,
        industry: b.industry, country: b.country, port: b.port,
        // Project
        productType: b.productType, qty: b.qty, incoterm: b.incoterm,
        due: b.due, series: b.series,
        // Pulley
        pulley_standard: b.pulley_standard, pulley_section: b.pulley_section,
        pulleydia_standard: b.pulleydia_standard, pulley_grooves: b.pulley_grooves,
        pulley_pd: b.pulley_pd, pulley_od: b.pulley_od, pulley_f: b.pulley_f,
        pulley_j: b.pulley_j, pulley_k: b.pulley_k, pulley_l: b.pulley_l, pulley_m: b.pulley_m,
        pulley_bore_type: b.pulley_bore_type, pulley_bore_dia: b.pulley_bore_dia,
        pulley_keyway_standard: b.pulley_keyway_standard, pulley_bore_tolerance: b.pulley_bore_tolerance,
        pulley_material: b.pulley_material, pulley_heat_treatment: b.pulley_heat_treatment,
        pulley_surface_finish: b.pulley_surface_finish, pulley_dynamic_balance: b.pulley_dynamic_balance,
        // Taper Bushing
        bush_standard: b.bush_standard, bushbore_standard: b.bushbore_standard,
        bush_series: b.bush_series, bush_bore_dia: b.bush_bore_dia,
        bush_Lend_dia: b.bush_Lend_dia, bush_overall_len: b.bush_overall_len,
        bush_PC_dia: b.bush_PC_dia, bush_keyway: b.bush_keyway,
        bush_material: b.bush_material, bush_finish: b.bush_finish,
        // Coupling
        coupling_type: b.coupling_type, coupling_model: b.coupling_model,
        coupling_bore_unit: b.coupling_bore_unit, coupling_keyway_standard: b.coupling_keyway_standard,
        coupling_bore1: b.coupling_bore1, coupling_bore2: b.coupling_bore2,
        coupling_material: b.coupling_material, coupling_element: b.coupling_element,
        // Sprocket
        sprocket_standard: b.sprocket_standard, sprocket_pitch: b.sprocket_pitch,
        sprocket_teeth: b.sprocket_teeth, sprocket_strands: b.sprocket_strands,
        sprocket_bore_type: b.sprocket_bore_type, sprocket_bore_dia: b.sprocket_bore_dia,
        sprocket_keyway_standard: b.sprocket_keyway_standard, sprocket_bore_tolerance: b.sprocket_bore_tolerance,
        sprocket_material: b.sprocket_material, sprocket_heat_treatment: b.sprocket_heat_treatment,
        sprocket_finish: b.sprocket_finish,
        // Quality & Others
        reports: Array.isArray(b.reports) ? b.reports.join(', ') : b.reports,
        packaging: b.packaging,
        nda: b.nda ? 'Yes' : 'No',
        notes: b.notes,
    };

    if (!payload.company || !payload.name || !payload.email) {
        return res.status(400).json({ ok: false, error: 'Company, Name, and Email are required.' });
    }

    console.log('[RFQ]', {
        time: new Date().toISOString(),
        email: payload.email,
        company: payload.company,
        files: files.map(f => ({ name: f.originalname, type: f.mimetype, size: f.size }))
    });

    const toAdmin = process.env.MAIL_TO;
    const from = process.env.SMTP_USER;
    const customerEmail = payload.email;

    if (transporter && toAdmin && from) {
        try {
            const adminSubject = `[RFQ] for ${payload.productType || 'Products'} from ${payload.company}`;
            
            await sendMailWithRetry({
                from: `"ApolloPT RFQ" <${from}>`,
                to: toAdmin,
                replyTo: customerEmail, 
                subject: adminSubject,
                html: renderRfqHtml(payload, files), 
                attachments: files.map(f => ({
                    filename: tryDecodeFilename(f.originalname),
                    content: f.buffer,
                    contentType: f.mimetype,
                })),
            });
        } catch (err) {
            console.error('[mail][admin] Failed to send RFQ notification:', err);
        }
    } else {
        console.warn('[mail][admin] Skipped sending admin notification due to missing config.');
    }

    if (autoReplyEnabled && transporter && isValidEmail(customerEmail) && shouldSendAck(customerEmail)) {
        try {
            const ackMailOptions = {
                from: `"ApolloPT Website RFQ" <${from}>`,
                to: customerEmail,
                replyTo: process.env.REPLY_TO || from,
                subject: ackSubject(payload), 
                html: buildRfqAckHtml(payload), 
                attachments: files.map(f => ({
                    content: f.buffer,
                    contentType: f.mimetype,
                })),
            };
            await sendMailWithRetry(ackMailOptions);
            lastAckByEmail.set(customerEmail, Date.now()); 
            console.log(`[ack] RFQ auto-reply sent to ${customerEmail}`);
        } catch (err) {
            console.error('[mail][ack] Failed to send RFQ auto-reply:', err);
        }
    } else {
        const now = Date.now();
        const last = lastAckByEmail.get(customerEmail) || 0;
        const timeLeft = Math.round((ACK_WINDOW_MIN * 60 * 1000 - (now - last)) / 1000);
        if(timeLeft > 0) {
          console.log(`[ack] skipped for ${customerEmail}. Reason: rate limit window. Please try again in ${timeLeft} seconds.`);
        } else {
          console.log(`[ack] skipped for ${customerEmail}. Reason: auto-reply disabled or invalid email.`);
        }
    }

    return res.status(200).json({ ok: true, message: 'RFQ submitted successfully.' });
});


/* ---------------- Start Server ---------------- */
if (transporter) {
    transporter.verify((error, success) => {
        if (error) {
            console.error('[SMTP VERIFY FAILED]', error);
        } else {
            console.log('[SMTP VERIFY SUCCESS] Server is ready');
        }
    });
}

app.listen(PORT, () => {
    console.log(`RFQ Backend listening on ${PORT}`);
    console.log('Allowed origins:', Array.from(ALLOWED_SET).join(', '));
});