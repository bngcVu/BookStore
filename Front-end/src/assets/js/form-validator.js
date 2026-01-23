/**
 * Form Validation Utilities
 * Client-side validation with inline error display
 */

class FormValidator {
    constructor(formElement) {
        this.form = formElement;
        this.errors = {};
        this.rules = {};
    }

    /**
     * Add validation rule for a field
     * @param {string} fieldName - Name attribute of the field
     * @param {Array} rules - Array of validation rules
     */
    addRule(fieldName, rules) {
        this.rules[fieldName] = rules;
        return this;
    }

    /**
     * Validate the entire form
     * @returns {boolean} - True if valid, false otherwise
     */
    validate() {
        this.clearErrors();
        let isValid = true;

        for (const [fieldName, rules] of Object.entries(this.rules)) {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            if (!field) continue;

            const value = field.value.trim();

            for (const rule of rules) {
                const error = this.applyRule(value, rule, field);
                if (error) {
                    this.showFieldError(field, error);
                    this.errors[fieldName] = error;
                    isValid = false;
                    break; // Stop at first error for this field
                }
            }
        }

        return isValid;
    }

    /**
     * Apply a single validation rule
     */
    applyRule(value, rule, field) {
        // Required
        if (rule === 'required' && !value) {
            return 'Trường này là bắt buộc';
        }

        // Email
        if (rule === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                return 'Email không hợp lệ';
            }
        }

        // Min length
        if (rule.startsWith('min:')) {
            const min = parseInt(rule.split(':')[1]);
            if (value && value.length < min) {
                return `Tối thiểu ${min} ký tự`;
            }
        }

        // Max length
        if (rule.startsWith('max:')) {
            const max = parseInt(rule.split(':')[1]);
            if (value && value.length > max) {
                return `Tối đa ${max} ký tự`;
            }
        }

        // Numeric
        if (rule === 'numeric' && value) {
            if (isNaN(value)) {
                return 'Phải là số';
            }
        }

        // Min value
        if (rule.startsWith('minValue:')) {
            const min = parseFloat(rule.split(':')[1]);
            if (value && parseFloat(value) < min) {
                return `Giá trị tối thiểu ${min}`;
            }
        }

        // Max value
        if (rule.startsWith('maxValue:')) {
            const max = parseFloat(rule.split(':')[1]);
            if (value && parseFloat(value) > max) {
                return `Giá trị tối đa ${max}`;
            }
        }

        // Voucher code pattern (uppercase letters and numbers)
        if (rule === 'voucherCode' && value) {
            const codeRegex = /^[A-Z0-9]{4,20}$/;
            if (!codeRegex.test(value)) {
                return 'Mã voucher phải là 4-20 ký tự in hoa hoặc số';
            }
        }

        // URL
        if (rule === 'url' && value) {
            try {
                new URL(value);
            } catch {
                return 'URL không hợp lệ';
            }
        }

        // Phone number (VN format)
        if (rule === 'phone' && value) {
            const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                return 'Số điện thoại không hợp lệ';
            }
        }

        // Custom regex
        if (rule.startsWith('regex:')) {
            const pattern = rule.split(':')[1];
            const regex = new RegExp(pattern);
            if (value && !regex.test(value)) {
                return 'Định dạng không hợp lệ';
            }
        }

        // Match another field
        if (rule.startsWith('match:')) {
            const matchFieldName = rule.split(':')[1];
            const matchField = this.form.querySelector(`[name="${matchFieldName}"]`);
            if (matchField && value !== matchField.value) {
                return 'Giá trị không khớp';
            }
        }

        return null;
    }

    /**
     * Show error message for a field
     */
    showFieldError(field, message) {
        // Add error class to field
        field.classList.add('error');

        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Create error message element
        const errorEl = document.createElement('p');
        errorEl.className = 'field-error';
        errorEl.textContent = message;
        errorEl.setAttribute('role', 'alert');

        // Insert after field or after input-addon wrapper
        const wrapper = field.closest('.input-addon') || field;
        wrapper.parentNode.insertBefore(errorEl, wrapper.nextSibling);
    }

    /**
     * Clear all errors
     */
    clearErrors() {
        this.errors = {};

        // Remove error classes
        this.form.querySelectorAll('.error').forEach(field => {
            field.classList.remove('error');
        });

        // Remove error messages
        this.form.querySelectorAll('.field-error').forEach(error => {
            error.remove();
        });
    }

    /**
     * Real-time validation on blur
     */
    enableRealtimeValidation() {
        for (const fieldName of Object.keys(this.rules)) {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            if (!field) continue;

            field.addEventListener('blur', () => {
                this.validateField(fieldName);
            });

            // Clear error on input
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    field.classList.remove('error');
                    const error = field.parentNode.querySelector('.field-error');
                    if (error) error.remove();
                }
            });
        }
    }

    /**
     * Validate a single field
     */
    validateField(fieldName) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        if (!field) return true;

        const rules = this.rules[fieldName];
        if (!rules) return true;

        const value = field.value.trim();

        // Clear previous error
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) existingError.remove();

        // Apply rules
        for (const rule of rules) {
            const error = this.applyRule(value, rule, field);
            if (error) {
                this.showFieldError(field, error);
                return false;
            }
        }

        return true;
    }

    /**
     * Get all errors
     */
    getErrors() {
        return this.errors;
    }
}

// Example usage:
/*
const form = document.querySelector('#voucher-form');
const validator = new FormValidator(form);

validator
    .addRule('code', ['required', 'voucherCode'])
    .addRule('name', ['required', 'min:3', 'max:100'])
    .addRule('discount', ['required', 'numeric', 'minValue:1', 'maxValue:100'])
    .addRule('min_order', ['required', 'numeric', 'minValue:0'])
    .enableRealtimeValidation();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validator.validate()) {
        // Submit form
        console.log('Form is valid!');
    } else {
        console.log('Validation errors:', validator.getErrors());
    }
});
*/

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FormValidator };
}

window.FormValidator = FormValidator;
console.log('[Validator] Form validation utility loaded ✓');
