(function () {
    document.addEventListener('DOMContentLoaded', () => {

        const form = document.getElementById('rfqForm');
        if (!form) {
            console.error('RFQ Form with ID "rfqForm" not found. Script will not run.');
            return;
        }

        const API_ENDPOINT = 'https://rfq-api.apt-world.com/api/rfq';

        // 表单元素
        const productTypeSelect = document.getElementById('productTypeSelect');
        const allTechSections = document.querySelectorAll('.tech-section');
        const submitButton = form.querySelector('button[type="submit"]');
        const resultMessageContainer = document.getElementById('rfq-result');

        // 文件上传元素
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileInput');
        const fileListContainer = document.getElementById('fileListContainer');
        const fileList = document.getElementById('fileList');
        let fileStore = [];

        // --- Pulley ---
        const pulleyStandardSelect = document.getElementById('pulleyStandard');
        const pulleySectionSelect = document.getElementById('pulleySection');
        const pulleyGroovesInput = document.getElementById('pulleyGrooves');
        const pulleydiaStandardSelect = document.getElementById('pulleydiaStandard');

        const pulleypdInput = document.getElementById('pulleypd');
        const pulleyodInput = document.getElementById('pulleyod');
        const pulleyfInput = document.getElementById('pulleyf');
        const pulleyjInput = document.getElementById('pulleyj');
        const pulleykInput = document.getElementById('pulleyk');
        const pulleylInput = document.getElementById('pulleyl');
        const pulleymInput = document.getElementById('pulleym');
        const pulleyboredia = document.getElementById('pulleyboredia');

        const pulleySectionsData = {
            european: ['SPZ', 'SPA', 'SPB', 'SPC', '8M', '14M', 'T5'],
            american: ['3V', '5V', '8V', '8M', '14M', 'T5']
        };

        // --- Bush ---
        const bushStandardSelect = document.getElementById('bushStandard');
        const bushboreStandardSelect = document.getElementById('bushboreStandard');
        const bushBoreInput = document.getElementById('bushBore');
        const bushLendDInput = document.getElementById('bushLendD');
        const bushOverallLInput = document.getElementById('bushOverallL');
        const bushPCDInput = document.getElementById('bushPCD');

        // --- Coupling ---
        const couplingBoreUnitSelect = document.getElementById('couplingBoreUnit');
        const couplingBore1Input = document.getElementById('couplingBore1');
        const couplingBore2Input = document.getElementById('couplingBore2');

        // --- Sprocket ---
        const sprocketStandardSelect = document.getElementById('sprocketStandard');
        const sprocketPitchSelect = document.getElementById('sprocketPitch');

        const sprocketPitchesData = {
            european: ['06B', '08B', '10B', '12B', '16B', '20B', '24B'],
            american: ['35', '40', '50', '60', '80', '100', '120']
        };

        if (productTypeSelect) {
            productTypeSelect.addEventListener('change', function () {
                allTechSections.forEach(section => section.classList.add('hidden'));
                const selectedType = this.value;
                const targetId = 'tech-' + selectedType.toLowerCase().replace(/ /g, '-');
                const targetSection = document.getElementById(targetId);
                if (targetSection) targetSection.classList.remove('hidden');
            });
        }

        function populateSections(standard) {
            pulleySectionSelect.innerHTML = '<option value="" disabled selected>Section</option>';

            const options = pulleySectionsData[standard];
            options.forEach(optionValue => {
                const option = document.createElement('option');
                option.value = optionValue;
                option.textContent = optionValue;
                pulleySectionSelect.appendChild(option);
            });
        }

        // Pulley
        if (pulleyStandardSelect) {
            function populatePulleySections(standard) {
                pulleySectionSelect.innerHTML = '<option value="" disabled selected>Groove Profile</option>';
                if (pulleySectionsData[standard]) {
                    pulleySectionsData[standard].forEach(val => {
                        const opt = document.createElement('option');
                        opt.value = opt.textContent = val;
                        pulleySectionSelect.appendChild(opt);
                    });
                }
            }
            pulleyStandardSelect.addEventListener('change', (e) => populatePulleySections(e.target.value));
            pulleySectionSelect.addEventListener('change', (e) => {
                pulleyGroovesInput.placeholder = (e.target.value.includes('M') || e.target.value.includes('T')) ? "Teeth" : "Grooves";
            });
            pulleydiaStandardSelect.addEventListener('change', (e) => {
                const unit = (e.target.value === 'metric') ? "(mm)" : "(inch)";
                pulleypdInput.placeholder = `Pitch Dia. PD ${unit}`;
                pulleyodInput.placeholder = `Outside Dia. OD ${unit}`;
                pulleyfInput.placeholder = `Rim Width. F ${unit}`;
                pulleyjInput.placeholder = `Bore Dia. J ${unit}`;
                pulleykInput.placeholder = `Left Hub Projection. K ${unit}`;
                pulleylInput.placeholder = `Hub Length. L ${unit}`;
                pulleymInput.placeholder = `Right Hub Projection. M ${unit}`;
                pulleyboredia.placeholder = `Bore ${unit}`;
            });
        }

        // Bush
        if (bushboreStandardSelect) {
            bushboreStandardSelect.addEventListener('change', (e) => {
                const unit = (e.target.value === 'metric') ? "(mm)" : "(inch)";
                bushBoreInput.placeholder = `Bore ${unit}`;
                bushLendDInput.placeholder = `Large End Diameter ${unit}`;
                bushOverallLInput.placeholder = `Overall Length ${unit}`;
                bushPCDInput.placeholder = `P.C.D. ${unit}`;
            });
        }

        // Coupling
        if (couplingBoreUnitSelect) {
            couplingBoreUnitSelect.addEventListener('change', (e) => {
                const unit = (e.target.value === 'mm') ? "(mm)" : "(inch)";
                couplingBore1Input.placeholder = `Bore 1 Dia. ${unit}`;
                couplingBore2Input.placeholder = `Bore 2 Dia. ${unit}`;
            });
        }

        // Sprocket
        if (sprocketStandardSelect) {
            function populateSprocketPitches(standard) {
                sprocketPitchSelect.innerHTML = '<option value="" disabled selected>Chain Pitch</option>';
                if (sprocketPitchesData[standard]) {
                    sprocketPitchesData[standard].forEach(val => {
                        const opt = document.createElement('option');
                        opt.value = opt.textContent = val;
                        sprocketPitchSelect.appendChild(opt);
                    });
                }
            }
            sprocketStandardSelect.addEventListener('change', (e) => populateSprocketPitches(e.target.value));
        }


        if (dropZone && fileInput && fileListContainer && fileList) {
            const preventDefaults = (e) => { e.preventDefault(); e.stopPropagation(); };
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, preventDefaults);
            });

            const highlight = () => dropZone.classList.add('border-blue-500', 'bg-blue-50');
            const unhighlight = () => dropZone.classList.remove('border-blue-500', 'bg-blue-50');

            ['dragenter', 'dragover'].forEach(eventName => dropZone.addEventListener(eventName, highlight));
            ['dragleave', 'drop'].forEach(eventName => dropZone.addEventListener(eventName, unhighlight));

            dropZone.addEventListener('drop', (e) => addFiles(e.dataTransfer.files));
            fileInput.addEventListener('change', (e) => addFiles(e.target.files));

            function addFiles(files) {
                for (const file of files) {
                    if (!fileStore.some(f => f.name === file.name && f.size === file.size)) {
                        fileStore.push(file);
                    }
                }
                updateFileList();
            }

            function updateFileList() {
                fileListContainer.classList.toggle('hidden', fileStore.length === 0);
                fileList.innerHTML = '';
                fileStore.forEach((file, index) => {
                    const listItem = document.createElement('li');
                    listItem.className = 'flex items-center justify-between bg-slate-100 p-2 rounded-lg text-sm';
                    listItem.innerHTML = `
                    <div class="flex items-center gap-3 overflow-hidden">
                        <svg class="w-6 h-6 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                        <div class="overflow-hidden">
                            <p class="font-medium text-slate-800 truncate">${file.name}</p>
                            <p class="text-xs text-slate-500">${formatBytes(file.size)}</p>
                        </div>
                    </div>
                    <button type="button" data-index="${index}" class="remove-btn p-1 text-slate-500 hover:text-red-600 transition-colors flex-shrink-0">
                        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>`;
                    fileList.appendChild(listItem);
                });
            }

            fileList.addEventListener('click', (e) => {
                const removeBtn = e.target.closest('.remove-btn');
                if (removeBtn) {
                    e.preventDefault();
                    const indexToRemove = parseInt(removeBtn.dataset.index, 10);
                    fileStore.splice(indexToRemove, 1);
                    const newStore = new DataTransfer();
                    fileStore.forEach(file => newStore.items.add(file));
                    fileInput.files = newStore.files;
                    updateFileList();
                }
            });

            window.clearRfqFiles = () => {
                fileStore = [];
                fileInput.value = '';
                updateFileList();
            };

            function formatBytes(bytes, decimals = 2) {
                if (bytes === 0) return '0 Bytes';
                const k = 1024;
                const dm = decimals < 0 ? 0 : decimals;
                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
            }
        }

        // ✅ 仅“提交结果”这块的完整替换代码（去掉重复的 submitButton 处理，统一用 ev.submitter）

        form.addEventListener('submit', async function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            ev.stopImmediatePropagation();

            if (form.dataset.submitting === '1') return;
            form.dataset.submitting = '1';

            // 结果区域节点
            const resultEl = document.getElementById('result');
            const titleEl = document.getElementById('resultTitle');
            const textEl = document.getElementById('resultText');
            const detailsEl = document.getElementById('resultDetails');
            const jsonPreview = document.getElementById('jsonPreview');

            // 精确拿本次触发提交的按钮
            const btn = ev.submitter || form.querySelector('button[type="submit"]');
            const labelSpan = btn ? (btn.querySelector('span') || btn) : null;

            let reverting = false;
            const ORIGINAL_TEXT = (labelSpan && labelSpan.textContent) || 'Submit RFQ';
            const observer = new MutationObserver(() => {
                if (reverting) return;
                if (btn.dataset.loading !== '1' && labelSpan && /Submitting/i.test(labelSpan.textContent)) {
                    reverting = true;
                    labelSpan.textContent = ORIGINAL_TEXT;
                    reverting = false;
                }
            });

            // const setBtnLoading = (on) => {
            //     if (!btn) return;
            //     if (!btn.dataset.originalLabel) btn.dataset.originalLabel = btn.innerHTML;
            //     if (on) {
            //         btn.dataset.loading = '1';
            //         btn.disabled = true;
            //         btn.classList.add('is-loading');
            //         btn.innerHTML = `
            //             <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
            //             <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            //             <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            //             </svg>
            //             Submitting...`;
            //     } else {
            //         btn.disabled = false;
            //         btn.classList.remove('is-loading');
            //         btn.innerHTML = btn.dataset.originalLabel || 'Submit';
            //     }
            // };
            const setBtnLoading = (on) => {
                if (!btn) return;
                if (on) {
                    btn.dataset.loading = '1';
                    btn.disabled = true;
                    if (labelSpan) labelSpan.textContent = 'Submitting...';
                    observer.observe(btn, { subtree: true, childList: true, characterData: true });
                } else {
                    btn.dataset.loading = '0';
                    btn.disabled = false;
                    if (labelSpan) labelSpan.textContent = ORIGINAL_TEXT;
                    queueMicrotask(() => { if (labelSpan) labelSpan.textContent = ORIGINAL_TEXT; });
                    requestAnimationFrame(() => { if (labelSpan) labelSpan.textContent = ORIGINAL_TEXT; });
                    setTimeout(() => observer.disconnect(), 3000);
                }
            }

            // setBtnSubmitting(btn, true);
            setBtnLoading(true);

            // 清空并先隐藏结果框
            if (resultEl) {
                resultEl.classList.add('hidden');
                resultEl.classList.remove('bg-emerald-50', 'border-emerald-200', 'bg-red-50', 'border-red-200');
            }
            if (titleEl) titleEl.textContent = '';
            if (textEl) textEl.textContent = '';
            if (jsonPreview) jsonPreview.textContent = '';
            if (detailsEl) detailsEl.open = false;

            // 组装 FormData（用你维护的 fileStore 覆盖 attachments）
            const formData = new FormData(form);
            formData.delete('attachments');
            if (Array.isArray(window.fileStore)) {
                for (const file of window.fileStore) {
                    formData.append('attachments', file, file.name);
                }
            } else {
                // 兜底：从表单中的文件输入取
                const fileInputs = form.querySelectorAll('input[type="file"][name="attachments"]');
                fileInputs.forEach(inp => {
                    Array.from(inp.files || []).forEach(f => formData.append('attachments', f, f.name));
                });
            }

            // 结果渲染工具
            const setResult = (kind, title, htmlText, preview = null) => {
                if (!resultEl) return;
                resultEl.classList.remove('bg-emerald-50', 'border-emerald-200', 'bg-red-50', 'border-red-200');

                if (kind === 'ok') {
                    resultEl.classList.add('bg-emerald-50', 'border-emerald-200');
                    if (titleEl) titleEl.textContent = title || 'RFQ Submitted!';
                    if (textEl) textEl.innerHTML = htmlText || `We’ve received your request. Our engineer will confirm drawings & parameters within 24 hours.
                                    You can also send additional files to <a class="underline" href="mailto:xjyang@apollopt.com.cn">xjyang@apollopt.com.cn</a>.`;
                } else {
                    resultEl.classList.add('bg-red-50', 'border-red-200');
                    if (titleEl) titleEl.textContent = title || 'Submission failed';
                    if (textEl) textEl.textContent = htmlText || 'Please try again later.';
                }

                if (jsonPreview) {
                    if (preview != null) {
                        jsonPreview.textContent = typeof preview === 'string' ? preview : JSON.stringify(preview, null, 2);
                        if (detailsEl) detailsEl.open = true;
                    } else {
                        jsonPreview.textContent = '';
                        if (detailsEl) detailsEl.open = false;
                    }
                }
                resultEl.classList.remove('hidden');
            };

            try {
                const res = await fetch(API_ENDPOINT, { method: 'POST', body: formData });

                // 稳健解析：优先 JSON，不是 JSON 则文本
                let data = null, raw = null;
                const ct = res.headers.get('content-type') || '';
                if (ct.includes('application/json')) {
                    data = await res.json();
                } else {
                    raw = await res.text();
                }

                if (!res.ok || (data && data.ok === false)) {
                    const msg = (data && data.error) || raw || `HTTP ${res.status}`;
                    throw new Error(msg);
                }

                setResult(
                    'ok',
                    'RFQ Submitted!',
                    `We’ve received your request. Our engineer will confirm drawings & parameters within 24 hours.
                    You can also send additional files to <a class="underline" href="mailto:xjyang@apollopt.com.cn">xjyang@apollopt.com.cn</a>.`,
                    data ?? raw
                );

                // 成功后清理
                form.reset();
                if (typeof window.clearRfqFiles === 'function') window.clearRfqFiles();
                if (typeof productTypeSelect !== 'undefined' && productTypeSelect) {
                    productTypeSelect.dispatchEvent(new Event('change'));
                }

            } catch (error) {
                console.error('Submission error:', error);
                setResult('err', null, `An error occurred: ${error.message}`);
            } finally {
                // setBtnSubmitting(btn, false);
                setTimeout(() => {
                    setBtnLoading(false);
                }, 50);
                queueMicrotask(() => setBtnLoading(false));
                requestAnimationFrame(() => setBtnLoading(false));
                form.dataset.submitting = '0';
            }
        });
    });
})();