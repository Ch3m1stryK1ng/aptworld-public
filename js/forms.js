document.addEventListener('DOMContentLoaded', async () => {
    const API_URL = 'https://api.apt-world.com/api/inquiry';


    // === 3) 滚动显示/隐藏（和 back-to-up 一样的触发规则） ===
    function setupFabReveal(thresholdPx = Math.max(300, Math.floor(window.innerHeight * 0.4))) {
        const toggle = () => {
            const show = window.scrollY > thresholdPx;
            document.querySelectorAll('.fab-trigger').forEach(btn => {
                btn.classList.toggle('is-visible', show);
            });
        };
        window.addEventListener('scroll', toggle, { passive: true });
        window.addEventListener('resize', () => toggle(), { passive: true });
        // 初始隐藏
        toggle();
    }

    setupFabReveal();


    // --- 1. 雙模顯示邏輯 (保持不變) ---
    const staticContainer = document.getElementById('static-contact-container');
    const widgetTemplates = document.querySelector('.form-widget-templates');
    if (staticContainer && widgetTemplates) {
        // ... (這部分克隆邏輯無需修改)
        const generalFormTemplate = widgetTemplates.querySelector('#widget-general');
        const productFormTemplate = widgetTemplates.querySelector('#widget-product');
        if (generalFormTemplate) {
            const staticGeneralForm = setupClonedForm(generalFormTemplate, 'static-widget-general', 'static-form-general', ['form-box', 'general-form-box']);
            staticContainer.appendChild(staticGeneralForm);
        }
        if (productFormTemplate) {
            const staticProductForm = setupClonedForm(productFormTemplate, 'static-widget-product', 'static-form-product', ['form-box', 'product-form-box']);
            staticContainer.appendChild(staticProductForm);
        }
    }

    function setupClonedForm(template, widgetId, formId, classes) {
        const clone = template.cloneNode(true);
        clone.classList.remove('form-widget');
        clone.id = widgetId;
        clone.querySelector('form').id = formId;
        clone.classList.add(...classes);
        return clone;
    }

    // --- 2. 浮動窗口交互邏輯 (保持不變) ---
    if (widgetTemplates && !document.body.contains(widgetTemplates)) {
        document.body.appendChild(widgetTemplates);
    }
    if (widgetTemplates) widgetTemplates.style.display = 'block';

    const fabTriggers = document.querySelectorAll('.fab-trigger');
    let activeWidget = null;
    fabTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const widgetId = trigger.dataset.widget;
            const clickedWidget = document.getElementById(widgetId);
            if (activeWidget === clickedWidget) {
                closeActiveWidget();
            } else {
                closeActiveWidget();
                openWidget(widgetId);
            }
        });
    });

    function openWidget(widgetId) {
        const trigger = document.querySelector(`.fab-trigger[data-widget="${widgetId}"]`);
        activeWidget = document.getElementById(widgetId);
        if (!activeWidget) return;
        activeWidget.classList.add('is-open');
        if (trigger) trigger.classList.add('is-active');
    }

    function closeActiveWidget() {
        if (activeWidget) {
            const widgetId = activeWidget.id;
            const trigger = document.querySelector(`.fab-trigger[data-widget="${widgetId}"]`);
            activeWidget.classList.remove('is-open');
            if (trigger) trigger.classList.remove('is-active');
            const resultDiv = activeWidget.querySelector('.form-result');
            if (resultDiv) { resultDiv.style.display = 'none'; }
            activeWidget = null;
        }
    }

    // --- 3. 為所有表單綁定事件 (包括克隆的) ---
    document.querySelectorAll('form').forEach(form => setupForm(form));

    function collectAndNormalize(formElement, isProduct, uploadedFiles) {
        const get = (sel) => (formElement.querySelector(sel)?.value || '').trim();

        // 通用字段
        const payload = {
            name: get('input[name="name"]'),
            email: get('input[name="email"]'),
            phone: get('input[name="whatsapp"]') || get('input[name="phone"]'),
            company: get('input[name="company"]'),
            country: get('input[name="country"]'),
            title: get('input[name="_subject"]') || '',
            page: location.href
        };

        if (isProduct) {
            // 产品表单：把 product_name -> product，并合成一段 message
            const productName = get('input[name="product_name"]');
            const specification = get('input[name="specification"]');
            const quantity = get('input[name="quantity"]');
            const msgPieces = [
                '[Product Inquiry]',
                productName ? `Product: ${productName}` : '',
                specification ? `Specification: ${specification}` : '',
                quantity ? `Quantity: ${quantity}` : ''
            ].filter(Boolean);
            payload.product = productName;
            payload.message = msgPieces.join('\n');

            // 产品表单没有 name，就用邮箱前缀兜底
            if (!payload.name && payload.email) {
                payload.name = payload.email.split('@')[0];
            }
        } else {
            // 通用表单：原生的 message
            payload.message = (formElement.querySelector('textarea[name="message"]')?.value || '').trim();
        }

        // 必填兜底校验（与后端保持一致）
        const must = isProduct
            ? (payload.email && (payload.product || payload.message || (uploadedFiles?.length || 0) > 0))
            : (payload.name && payload.email && payload.message);

        return { payload, isValidForApi: !!must };
    }

    // --- 4. 核心表單處理函數 (已重構和修正) ---
    function setupForm(formElement) {
        const fileGroup = formElement.querySelector('.file-drop-area')?.closest('.form-group');
        function markFileInvalid(show) {
            if (!fileGroup) return;
            fileGroup.classList.toggle('is-invalid', !!show);
            const err = fileGroup.querySelector('.file-error') || fileGroup.querySelector('.error-text');
            if (err) err.style.display = show ? 'block' : 'none';
        }

        let uploadedFiles = [];
        const resultDiv = formElement.querySelector('.form-result');
        const submitButton = formElement.querySelector('button[type="submit"]');
        const requiredInputs = formElement.querySelectorAll('[required]');

        // function syncFileInput() {
        //     const fileInput = formElement.querySelector('.file-input-hidden');
        //     if (!fileInput) return;

        //     const dt = new DataTransfer();
        //     uploadedFiles.forEach(f => dt.items.add(f));
        //     fileInput.files = dt.files;

        //     fileInput.value = '';
        // }

        function syncFileInput() {
            const fileInput = formElement.querySelector('.file-input-hidden');
            if (!fileInput) return;
            // 统一字段名给后端（multer.fields([{ name: 'attachments' }])）
            fileInput.name = 'attachments';
            fileInput.multiple = true;

            const dt = new DataTransfer();
            uploadedFiles.forEach(f => dt.items.add(f));
            fileInput.files = dt.files;

            fileInput.value = '';
        }

        if (formElement.id.includes('product')) {
            setupDragAndDropForForm(formElement);
        }

        requiredInputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.closest('.form-group').classList.remove('is-invalid');
                }
            });
        });

        formElement.addEventListener('submit', async (e) => {
            e.preventDefault();

            let isValid = true;
            requiredInputs.forEach(input => {
                const group = input.closest('.form-group');
                if (!input.value.trim()) {
                    group.classList.add('is-invalid');
                    isValid = false;
                }
            });
            if (!isValid) return;

            const isProduct = formElement.id.includes('product');
            const fileInput = formElement.querySelector('.file-input-hidden');
            const hasFiles = isProduct && uploadedFiles.length > 0;

            // 文件大小/总量校验
            const MAX_PER_FILE = 20 * 1024 * 1024;
            const MAX_TOTAL = 25 * 1024 * 1024;
            const tooBigOne = uploadedFiles.find(f => f.size > MAX_PER_FILE);
            const totalBytes = uploadedFiles.reduce((s, f) => s + f.size, 0);
            if (tooBigOne) { showError(`File "${tooBigOne.name}" exceeds 20MB limit.`); return; }
            if (totalBytes > MAX_TOTAL) { showError('Total attachments exceed 24MB. Please compress or send fewer files.'); return; }
            if (isProduct && !hasFiles) { markFileInvalid(true); return; } else { markFileInvalid(false); }

            const submitButton = formElement.querySelector('button[type="submit"]');
            const originalButtonText = submitButton ? submitButton.textContent : '';
            if (submitButton) { submitButton.disabled = true; submitButton.textContent = 'Submitting...'; }
            if (resultDiv) resultDiv.style.display = 'none';

            const actionAttr = (formElement.getAttribute('action') || '').trim();
            const url = actionAttr && actionAttr !== '#' ? actionAttr : (typeof API_URL !== 'undefined' ? API_URL : '/api/inquiry');

            try {
                let fetchOptions;

                if (isProduct) {
                    // --- 产品表单：手动组装 multipart，并“只从 uploadedFiles 取文件” ---
                    const fd = new FormData();

                    const pick = (name) => (formElement.querySelector(`[name="${name}"]`)?.value || '').trim();

                    const email = pick('email');
                    const name = pick('name') || (email ? email.split('@')[0] : '');
                    const product = pick('product_name');    // HTML 里是 product_name
                    const spec = pick('specification');
                    const qty = pick('quantity');

                    // 文本字段
                    if (name) fd.append('name', name);
                    if (email) fd.append('email', email);
                    if (pick('whatsapp')) fd.append('phone', pick('whatsapp'));
                    if (pick('phone')) fd.append('phone', pick('phone'));
                    if (pick('company')) fd.append('company', pick('company'));
                    if (pick('country')) fd.append('country', pick('country'));
                    if (pick('_subject')) fd.append('title', pick('_subject')); // 后端兼容 _subject / title
                    if (product) fd.append('product', product);                 // 后端也兼容 product_name
                    if (spec) fd.append('specification', spec);
                    if (qty)  fd.append('quantity', qty);
                    fd.append('page', window.location.href);

                    // message 兜底
                    let message = pick('message');
                    // if (!message) {
                    //     const lines = [];
                    //     if (product) lines.push(`Product: ${product}`);
                    //     // if (spec) lines.push(`Specification: ${spec}`);
                    //     // if (qty) lines.push(`Quantity: ${qty}`);
                    //     if (lines.length) message = lines.join('\n');
                    // }
                    if (message) fd.append('message', message);

                    // 关键：直接从 uploadedFiles 追加（不要依赖隐藏 input）
                    uploadedFiles.forEach(f => fd.append('attachments', f, f.name));
                    console.log('[debug] fd attachments:', fd.getAll('attachments').map(f => f.name));

                    fetchOptions = { method: 'POST', mode: 'cors', credentials: 'omit', body: fd };
                } else {
                    // --- 通用表单：走 JSON ---
                    const { payload } = collectAndNormalize(formElement, false, []);
                    fetchOptions = {
                        method: 'POST',
                        mode: 'cors',
                        credentials: 'omit',
                        headers: { 'Content-Type': 'application/json; charset=utf-8' },
                        body: JSON.stringify(payload),
                    };
                }

                const res = await fetch(url, fetchOptions);
                const isJson = res.headers.get('content-type')?.includes('application/json');
                const data = isJson ? await res.json() : null;
                if (!res.ok || (data && data.ok === false)) throw new Error(data?.error || `HTTP ${res.status}`);

                showSuccess('Success! Your message has been sent.');
                formElement.reset();
                uploadedFiles = [];
                renderFileList(formElement);
                setTimeout(closeActiveWidget, 2000);
            } catch (err) {
                showError(`Network/Server error: ${err.message || err}`);
            } finally {
                if (submitButton) { submitButton.disabled = false; submitButton.textContent = originalButtonText; }
            }
        });

        // --- 5. 拖拽功能 (已修正UI bug和刪除功能) ---
        function setupDragAndDropForForm(form) {
            const dropArea = form.querySelector('.file-drop-area');
            const fileInput = form.querySelector('.file-input-hidden');
            const fileListDiv = form.querySelector('.file-list');
            const prompt = form.querySelector('.file-drop-prompt');

            if (!dropArea || !fileInput || !fileListDiv || !prompt) return;

            dropArea.addEventListener('click', () => fileInput.click());
            dropArea.addEventListener('dragover', e => { e.preventDefault(); dropArea.classList.add('is-dragover'); });
            dropArea.addEventListener('dragleave', () => dropArea.classList.remove('is-dragover'));
            dropArea.addEventListener('drop', e => {
                e.preventDefault();
                dropArea.classList.remove('is-dragover');
                addFiles(Array.from(e.dataTransfer.files));
            });
            fileInput.addEventListener('change', () => addFiles(Array.from(fileInput.files)));

            function addFiles(newFiles) {
                newFiles.forEach(file => {
                    if (!uploadedFiles.some(f => f.name === file.name && f.size === file.size)) {
                        uploadedFiles.push(file);
                    }
                });

                fileInput.value = '';
                syncFileInput();
                renderFileList(formElement);
                markFileInvalid(uploadedFiles.length === 0);
            }
        }

        function renderFileList(form) {
            const fileListDiv = form.querySelector('.file-list');
            const prompt = form.querySelector('.file-drop-prompt');
            const keepping = form.querySelector('.file-drop-keepping');
            if (!fileListDiv || !prompt) return;

            // 修正：根據是否有文件來顯示/隱藏提示文字
            if (uploadedFiles.length === 0) {
                prompt.style.display = 'block';
                keepping.style.display = 'none';
                fileListDiv.innerHTML = '';
            } else {
                // prompt.style.display = 'none';
                keepping.style.display = 'block';
                fileListDiv.innerHTML = '';
                uploadedFiles.forEach((file, index) => {
                    const li = document.createElement('li');
                    li.textContent = file.name;
                    const removeBtn = document.createElement('button');

                    removeBtn.type = 'button';
                    removeBtn.className = 'remove-file-btn';
                    removeBtn.innerHTML = '&times;';
                    // 修正：為刪除按鈕正確綁定事件
                    removeBtn.onclick = (e) => {
                        e.stopPropagation();
                        removeFile(index);
                        const fileInput = form.querySelector('.file-input-hidden');
                        if (fileInput) fileInput.value = '';
                    };
                    li.appendChild(removeBtn);
                    fileListDiv.appendChild(li);
                });
            }
        }

        function removeFile(index) {
            uploadedFiles.splice(index, 1);
            syncFileInput();
            renderFileList(formElement);
            markFileInvalid(uploadedFiles.length === 0);
        }

        function showError(msg) {
            if (!resultDiv) return;
            resultDiv.className = 'form-result error';
            resultDiv.textContent = msg || 'An error occurred.';
            resultDiv.style.display = 'block';
        }
        function showSuccess(msg) {
            if (!resultDiv) return;
            resultDiv.className = 'form-result success';
            resultDiv.textContent = msg || 'Success!';
            resultDiv.style.display = 'block';
        }
    }
});