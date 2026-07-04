# Apollo Inquiry Backend (Express + Multer + Nodemailer)

A minimal backend to receive multi-file form submissions and forward them via email.

## Quick Start

```bash
# 1) Install deps
npm i

# 2) Create .env from example
cp .env.example .env
# Edit .env with your SMTP settings

# 3) Run
npm run start
# API at http://localhost:3000  (health check /health)
```

## Endpoint

- **POST** `/api/inquiry` — multipart/form-data
  - Text fields: `product_name`, `email`, `specification`, `quantity`, `name`, `message`, `whatsapp`
  - Files: multiple `attachment` fields (use same name), or `<input type="file" name="attachment" multiple>`

### cURL Test

```bash
curl -X POST http://localhost:3000/api/inquiry   -F "product_name=SPB Pulley"   -F "email=buyer@example.com"   -F "specification=HT250, 3535 Taper"   -F "quantity=500"   -F "name=John Buyer"   -F "message=Please quote asap."   -F "attachment=@/path/to/file1.png"   -F "attachment=@/path/to/file2.pdf"
```

## Front-end Form Snippet

```html
<form action="/api/inquiry" method="POST" enctype="multipart/form-data">
  <input type="text"   name="product_name" required>
  <input type="email"  name="email" required>
  <input type="file"   name="attachment" multiple>
  <button type="submit">Submit</button>
</form>
```

> Your current JS that appends files via `formData.append('attachment', file, file.name)` will work without changes. Ensure total email size stays within your SMTP provider's limits (commonly 20–25MB).

## Notes

- Uses in-memory storage via Multer; for very large files consider saving to object storage (S3/OSS/R2) and emailing links instead.
- Set `TO_EMAILS` to a comma-separated list to notify multiple recipients.
