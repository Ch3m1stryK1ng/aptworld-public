document.addEventListener('DOMContentLoaded', async () => {

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

        function syncFileInput() {
            const fileInput = formElement.querySelector('.file-input-hidden');
            if (!fileInput) return;

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

        formElement.addEventListener('submit', (e) => {
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

            const MAX_PER_FILE = 20 * 1024 * 1024;
            const MAX_TOTAL = 24 * 1024 * 1024;
            const tooBigOne = uploadedFiles.find(f => f.size > MAX_PER_FILE);
            const totalBytes = uploadedFiles.reduce((s, f) => s + f.size, 0);
            if (tooBigOne) {
                showError(`文件 "${tooBigOne.name}" 大小超过 20MB 的限制。`);
                return;
            }
            if (totalBytes > MAX_TOTAL) {
                showError('总附件大小超过 24MB，请压缩文件后再次发送或者多次发送符合总文件大小的压缩包。');
                return;
            }

            if (formElement.id.includes('product')) {
                const hasFiles = uploadedFiles.length > 0;
                if (!hasFiles) {
                    markFileInvalid(true);
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = '提交咨询';
                    }
                    return;
                } else {
                    markFileInvalid(false);
                }
            }

            const formAction = formElement.getAttribute('action') || '';
            const isNativeSubmit = !!formElement.getAttribute('target'); // 有 target（如 fs_iframe）→ 走原生
            const originalButtonText = submitButton ? submitButton.textContent : '';

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = '发送中 ...';
            }
            if (resultDiv) resultDiv.style.display = 'none';

            const fileInput = formElement.querySelector('.file-input-hidden');
            if (fileInput) {
                if (fileInput.name !== 'attachment') fileInput.name = 'attachment';  // ← 防止误写成 attachments[]
                const dt = new DataTransfer();
                uploadedFiles.forEach(f => dt.items.add(f));
                fileInput.files = dt.files;
            }

            console.log("SUBMIT PATH:", isNativeSubmit ? "native+iframe" : "fetch");
            console.log("uploadedFiles[] before submit:", uploadedFiles.map(f => `${f.name}(${f.size})`));

            if (isNativeSubmit) {

                const targetName = formElement.getAttribute('target');
                const iframe = targetName ? document.querySelector(`iframe[name="${targetName}"]`) : null;
                if (iframe) {
                    const onLoad = () => {
                        iframe.removeEventListener('load', onLoad);
                        showSuccess('完成，您的信息已送达，欢迎您再次咨询。');
                        formElement.reset();
                        uploadedFiles = [];
                        renderFileList(formElement);
                        if (submitButton) {
                            submitButton.disabled = false;
                            submitButton.textContent = originalButtonText;
                        }
                        setTimeout(closeActiveWidget, 2000);
                    };
                    iframe.addEventListener('load', onLoad);
                }
                formElement.submit();
            } else {
                // fetch 提交到自建后端：FormData 里自己追加字段 + 文件
                const formData = new FormData();

                // 追加文本字段（排除 file）
                formElement.querySelectorAll('input, textarea').forEach(input => {
                    if (input.type !== 'file' && input.name) {
                        formData.append(input.name, input.value);
                    }
                });

                // uploadedFiles.forEach(f => {
                //     formData.append('attachment', f, f.name);
                // });

                // if (fileInput && fileInput.files && fileInput.files.length) {
                //     // 这段多余但“保险”——保证任何情况下都有 attachment 进 FormData
                //     Array.from(fileInput.files).forEach(f => formData.append('attachment', f, f.name));
                // }

                const appended = new Set();
                uploadedFiles.forEach(f => {
                    const key = `${f.name}|${f.size}`;
                    if (!appended.has(key)) {
                        formData.append('attachment', f, f.name);
                        appended.add(key);
                    }
                });

                fetch(formAction, {
                    method: 'POST',
                    body: formData,
                })
                    .then(async (res) => {
                        const isJson = res.headers.get('content-type')?.includes('application/json');
                        const data = isJson ? await res.json() : null;
                        if (!res.ok || (data && data.ok === false)) {
                            throw new Error(data?.error || `HTTP ${res.status}`);
                        }
                        showSuccess('完成，您的信息已送达，欢迎您再次咨询。');
                        formElement.reset();
                        uploadedFiles = [];
                        renderFileList(formElement);
                        setTimeout(closeActiveWidget, 2000);
                    })
                    .catch(err => {
                        showError(`抱歉，出现网络或者服务器错误： ${err.message || err}`);
                    })
                    .finally(() => {
                        if (submitButton) {
                            submitButton.disabled = false;
                            submitButton.textContent = originalButtonText;
                        }
                    });

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
            resultDiv.textContent = msg || '有错误。';
            resultDiv.style.display = 'block';
        }
        function showSuccess(msg) {
            if (!resultDiv) return;
            resultDiv.className = 'form-result success';
            resultDiv.textContent = msg || '成功!';
            resultDiv.style.display = 'block';
        }
    }
});