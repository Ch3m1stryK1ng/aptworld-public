// server.js
import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// 以内存方式接收，多附件 & 单文件≤20MB，合计由邮箱决定（多数邮箱 ~25MB）
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024, files: 10 }
});

// 接口：多文件字段名仍叫 attachment（和你前端一致）
app.post("/api/inquiry", upload.array("attachment", 10), async (req, res) => {
    try {
        const { product_name, email, specification, quantity, name, message } = req.body;

        // 配置发信（用你公司的 SMTP 最稳；也可换成 QQ/163/SendGrid/SES/Resend）
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,           // 例如: smtp.qiye.aliyun.com / smtp.exmail.qq.com
            port: Number(process.env.SMTP_PORT),   // 465(SSL) 或 587(TLS)
            secure: process.env.SMTP_SECURE === "true", // 465 用 true；587 用 false
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        });

        const attachments = (req.files || []).map(f => ({
            filename: f.originalname,
            content: f.buffer,
            contentType: f.mimetype
        }));

        const info = await transporter.sendMail({
            from: `"Website" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
            to: process.env.TO_EMAILS || "xjyang@apollopt.com.cn",
            subject: `新产品咨询 - ${product_name || ""}`,
            html: `
        <h3>新产品咨询（来自官网）</h3>
        <p><b>产品名：</b>${product_name || "-"}</p>
        <p><b>邮箱：</b>${email || "-"}</p>
        <p><b>规格：</b>${specification || "-"}</p>
        <p><b>数量：</b>${quantity || "-"}</p>
        <p><b>姓名：</b>${name || "-"}</p>
        <p><b>留言：</b>${(message || "").replace(/\n/g, "<br>")}</p>
        <p><b>附件数量：</b>${attachments.length}</p>
      `,
            attachments
        });

        res.json({ ok: true, messageId: info.messageId, files: attachments.length });
    } catch (e) {
        console.error(e);
        res.status(500).json({ ok: false, error: String(e) });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("API running on http://localhost:3000");
});
