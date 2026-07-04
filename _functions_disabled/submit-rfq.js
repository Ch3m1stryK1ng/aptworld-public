import { GoogleSpreadsheet } from 'google-spreadsheet';

// 主處理函數
export async function onRequestPost(context) {
    try {
        // --- 1. 從 Cloudflare 環境變數中獲取所有必要的憑證 ---
        const {
            SENDGRID_API_KEY,
            GOOGLE_SHEET_ID,
            GOOGLE_SERVICE_ACCOUNT_EMAIL,
            GOOGLE_PRIVATE_KEY,
            RFQ_BUCKET
        } = context.env;

        // --- 2. 解析前端傳來的表單數據 ---
        const formData = await context.request.formData();
        
        // --- 3. 將檔案上傳到 Cloudflare R2 ---
        const attachments = formData.getAll('attachments');
        const uploadedFilePaths = [];
        for (const file of attachments) {
            if (file instanceof File && file.name) {
                const uniqueFileName = `${Date.now()}-${file.name}`;
                await RFQ_BUCKET.put(uniqueFileName, await file.arrayBuffer());
                uploadedFilePaths.push(uniqueFileName);
            }
        }

        // --- 4. 將文字數據和檔案路徑寫入 Google Sheets ---
        // 初始化 Google Sheets 連線
        const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID);
        await doc.useServiceAccountAuth({
            client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // 處理換行符
        });
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0]; // 獲取第一個工作表

        // 準備要寫入的數據行
        const newRow = {
            Timestamp: new Date().toISOString(),
            Company: formData.get('company'),
            Name: formData.get('name'),
            Email: formData.get('email'),
            Phone: formData.get('phone'),
            Country: formData.get('country'),
            Industry: formData.get('industry'),
            ProductType: formData.get('productType'),
            Quantity: formData.get('qty'),
            Incoterm: formData.get('incoterm'),
            DueDate: formData.get('due'),
            Application: formData.get('application'),
            TechDetails: formData.get('tech_details_json'), // 從前端獲取打包好的技術細節
            FilePaths: uploadedFilePaths.join(', ') // 將所有檔案路徑合併成一個字串
        };
        await sheet.addRow(newRow);

        const sendInternalEmail = sendEmail({
            apiKey: SENDGRID_API_KEY,
            to: "xjyang523@gmail.com", // 【重要】換成您公司接收詢盤的信箱
            from: "xjyang523@gmail.com", // 【重要】換成您在 SendGrid 驗證過的寄件信箱
            subject: `New RFQ from ${formData.get('company')}`,
            html: `A new RFQ has been submitted and saved to Google Sheets. <br><br>Company: ${formData.get('company')}<br>Contact: ${formData.get('name')} (${formData.get('email')})<br>Files: ${uploadedFilePaths.join(', ')}`
        });

        const sendConfirmationEmail = sendEmail({
            apiKey: SENDGRID_API_KEY,
            to: formData.get('email'), // 發送給提交表單的客戶
            from: "xjyang@apollopt.com.cn", // 【重要】換成您想顯示的公司業務信箱
            subject: `We've received your RFQ - [Apollo Power Transmission]`,
            html: `Dear ${formData.get('name')},<br><br>Thank you for your inquiry. We have successfully received your RFQ and attached files. Our team will review your project and get back to you shortly.<br><br>Best regards,<br>Your Company Team`
        });

        await Promise.all([sendInternalEmail, sendConfirmationEmail]);

        // --- 6. 向前端返回成功訊息 ---
        return new Response(JSON.stringify({ message: "RFQ submitted successfully!" }), { status: 200 });

    } catch (error) {
        console.error("Submission Error:", error);
        return new Response(JSON.stringify({ message: "An error occurred.", error: error.message }), { status: 500 });
    }
}

// 輔助函數：用於發送郵件
async function sendEmail({ apiKey, to, from, subject, html }) {
    const payload = {
        personalizations: [{ to: [{ email: to }] }],
        from: { email: from },
        subject: subject,
        content: [{ type: 'text/html', value: html }]
    };
    return fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
}