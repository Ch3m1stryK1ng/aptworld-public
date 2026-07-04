// ========== REFACTORED JAVASCRIPT ==========

document.addEventListener("DOMContentLoaded", function () {
    const companyForm = document.getElementById("companyForm");
    const productForm = document.getElementById("productForm");

    // Setup validation and submission for both forms
    if (companyForm) {
        setupFormValidation(companyForm);
    }
    if (productForm) {
        setupFormValidation(productForm);
        setupDragAndDrop();
    }

    // Modal close button
    document.getElementById("closeModalBtn").addEventListener("click", () => {
        document.getElementById("submitModal").style.display = "none";
    });
});

/**
 * A unified function to set up validation and submission for a form.
 * @param {HTMLFormElement} formElement - The form to set up.
 */
function setupFormValidation(formElement) {
    const inputs = formElement.querySelectorAll("input[required], textarea[required]");

    // Real-time validation on input
    inputs.forEach(input => {
        input.addEventListener("input", () => validateField(input));
    });

    formElement.addEventListener("submit", function (e) {
        e.preventDefault();
        let isFormValid = true;

        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        // Handle custom file validation for product form
        if (formElement.id === 'productForm') {
            if (uploadedFiles.length === 0) {
                const fileGroup = document.getElementById('dropArea').closest('.form-group');
                fileGroup.classList.add('error');
                isFormValid = false;
            }
        }

        if (isFormValid) {
            submitFormData(formElement);
        } else {
            showSubmitResult(false, "Please fill all required fields.");
        }
    });
}

/**
 * Validates a single form field and updates its UI.
 * @param {HTMLInputElement|HTMLTextAreaElement} field - The field to validate.
 * @returns {boolean} - True if the field is valid, false otherwise.
 */
function validateField(field) {
    const group = field.closest(".form-group");
    let isValid = false;

    // Trim value for text-based inputs
    const value = field.type !== 'file' ? field.value.trim() : field.value;

    if (field.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    } else {
        isValid = value !== "";
    }

    if (isValid) {
        group.classList.remove("error");
    } else {
        group.classList.add("error");
    }
    return isValid;
}

/**
 * Handles the actual form data submission via Fetch API.
 * @param {HTMLFormElement} formElement - The form being submitted.
 */
async function submitFormData(formElement) {
    const action = formElement.getAttribute('action');
    if (!action) {
        console.error("Form action attribute is not set!");
        showSubmitResult(false, "Form configuration error.");
        return;
    }

    const formData = new FormData(formElement);
    
    if (formElement.id === 'productForm') {
        formData.delete('drawing[]');
        uploadedFiles.forEach(file => {
            formData.append("drawing[]", file, file.name);
        });
    }

    // ================================================================
    // ========== 新增的“侦探”代码，用于在提交前检查数据 ==========
    // ================================================================
    console.log('--- 准备提交表单 ---');
    console.log('提交 URL (action):', action);
    console.log('表单数据内容 (formData):');
    // FormData 对象不能直接打印，需要遍历来查看其内容
    for (let [key, value] of formData.entries()) { 
        console.log(key, ':', value);
    }
    console.log('--------------------');
    // ================================================================

    const submitButton = formElement.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    try {
        const response = await fetch(action, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        if (data.success === "true" || data.success === true) {
            showSubmitResult(true, "Submission successful!");
            formElement.reset();
            if (formElement.id === 'productForm') {
                uploadedFiles = [];
                renderFileList();
            }
        } else {
            showSubmitResult(false, "Submission failed. Please try again.");
        }

    } catch (error) {
        console.error("Submission Error:", error);
        showSubmitResult(false, "A network error occurred.");
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
}

/**
 * Displays the result of the submission in a modal.
 * @param {boolean} success - Whether the submission was successful.
 * @param {string} message - The message to display.
 */
function showSubmitResult(success, message) {
    console.log("showSubmitResult 被调用了! 消息是:", message);

    const modal = document.getElementById("submitModal");
    const iconEl = document.getElementById("submitIcon");
    const messageEl = document.getElementById("submitMessage");

    iconEl.textContent = success ? "✅" : "❌";
    messageEl.textContent = message;
    modal.style.display = "flex";
}


// --- ENHANCED FILE UPLOAD & DRAG-AND-DROP LOGIC ---
let uploadedFiles = [];

function setupDragAndDrop() {
    const dropArea = document.getElementById("dropArea");
    const fileInput = document.getElementById("drawingInput");
    const fileGroup = dropArea.closest('.form-group');

    // Trigger file input click
    dropArea.addEventListener("click", () => fileInput.click());

    // Drag events
    dropArea.addEventListener("dragover", e => {
        e.preventDefault();
        dropArea.classList.add("dragover");
    });
    dropArea.addEventListener("dragleave", () => dropArea.classList.remove("dragover"));
    dropArea.addEventListener("drop", e => {
        e.preventDefault();
        dropArea.classList.remove("dragover");
        const files = Array.from(e.dataTransfer.files);
        addFiles(files);
    });

    // File input change
    fileInput.addEventListener("change", () => {
        const files = Array.from(fileInput.files);
        addFiles(files);
        fileInput.value = ""; // Reset input to allow re-selecting the same file
    });

    function addFiles(files) {
        files.forEach(file => {
            // Prevent duplicates
            if (!uploadedFiles.some(f => f.name === file.name && f.size === file.size)) {
                uploadedFiles.push(file);
            }
        });
        fileGroup.classList.remove('error'); // Remove error once files are added
        renderFileList();
    }
}

function renderFileList() {
    const fileListElement = document.getElementById("fileList");
    fileListElement.innerHTML = "";

    uploadedFiles.forEach((file, index) => {
        const li = document.createElement("li");
        li.textContent = file.name;

        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-file-btn";
        removeBtn.innerHTML = "&times;";
        removeBtn.type = "button";
        removeBtn.onclick = () => {
            removeFile(index);
        };

        li.appendChild(removeBtn);
        fileListElement.appendChild(li);
    });
}

function removeFile(index) {
    uploadedFiles.splice(index, 1);
    renderFileList();

    // Re-validate if this was the last file
    if (uploadedFiles.length === 0) {
        const fileGroup = document.getElementById('dropArea').closest('.form-group');
        fileGroup.classList.add('error');
    }
}