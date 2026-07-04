// server.js
import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Basic middlewares
app.use(cors());                  // allow cross-origin (adjust as needed)
app.use(express.json());
app.get("/health", (req, res) => res.json({ ok: true }));

// Multer: receive multiple files in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024, files: 10 }, // 20MB per file, up to 10 files
});

// Helper to build transporter
function buildTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = String(process.env.SMTP_SECURE || "true").toLowerCase() === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP configuration missing. Please set SMTP_HOST, SMTP_USER, SMTP_PASS in .env");
  }

  return nodemailer.createTransport({
    host, port, secure,
    auth: { user, pass },
  });
}

// API endpoint for inquiries
app.post("/api/inquiry", upload.array("attachment", 10), async (req, res) => {
  try {
    const {
      product_name,
      email,
      specification,
      quantity,
      name,
      message,
      whatsapp,
    } = req.body;

    const to = process.env.TO_EMAILS || "xjyang@apollopt.com.cn";
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;

    const attachments = (req.files || []).map(f => ({
      filename: f.originalname,
      content: f.buffer,
      contentType: f.mimetype,
    }));

    const transporter = buildTransporter();

    const subject = `新产品咨询 - ${product_name || ""}`.trim() || "新产品咨询";

    // Build HTML body
    const html = `
      <h3>新产品咨询（来自官网）</h3>
      <table border="0" cellpadding="6" cellspacing="0">
        <tr><td><b>产品名</b></td><td>${product_name || "-"}</td></tr>
        <tr><td><b>客户邮箱</b></td><td>${email || "-"}</td></tr>
        <tr><td><b>规格</b></td><td>${specification || "-"}</td></tr>
        <tr><td><b>数量</b></td><td>${quantity || "-"}</td></tr>
        <tr><td><b>姓名</b></td><td>${name || "-"}</td></tr>
        <tr><td><b>WhatsApp</b></td><td>${whatsapp || "-"}</td></tr>
      </table>
      <p><b>留言</b></p>
      <div>${(message || "").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}</div>
      <p><b>附件数量：</b>${attachments.length}</p>
    `;

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
      attachments,
    });

    res.json({ ok: true, messageId: info.messageId, files: attachments.length });
  } catch (err) {
    console.error("[/api/inquiry] error:", err);
    res.status(500).json({ ok: false, error: String(err) });
  }
});

const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
