/**
 * Custom Confirmation Dialog System
 * Replaces native confirm() and alert() with styled modals
 */

class ConfirmDialog {
    constructor() {
        this.modal = null;
        this.init();
    }

    init() {
        // Create modal container if doesn't exist
        if (!document.querySelector('.confirm-modal')) {
            this.modal = this.createModal();
            document.body.appendChild(this.modal);
        } else {
            this.modal = document.querySelector('.confirm-modal');
        }
    }

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'confirm-modal';
        modal.innerHTML = `
            <div class="confirm-backdrop"></div>
            <div class="confirm-content">
                <div class="confirm-header">
                    <div class="confirm-icon"></div>
                    <div class="confirm-body">
                        <h3 class="confirm-title"></h3>
                        <p class="confirm-message"></p>
                    </div>
                </div>
                <div class="confirm-footer">
                    <button class="btn-outline confirm-cancel">Hủy</button>
                    <button class="btn-danger confirm-ok">Xác nhận</button>
                </div>
            </div>
        `;

        // Close on backdrop click
        modal.querySelector('.confirm-backdrop').addEventListener('click', () => {
            this.close(false);
        });

        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close(false);
            }
        });

        return modal;
    }

    /**
     * Show confirmation dialog
     * @param {Object} options - Dialog options
     * @returns {Promise<boolean>} - User's choice
     */
    show(options = {}) {
        const {
            title = 'Xác nhận',
            message = 'Bạn có chắc chắn muốn thực hiện hành động này?',
            type = 'danger', // danger, warning, info
            confirmText = 'Xác nhận',
            cancelText = 'Hủy',
            confirmClass = 'btn-danger'
        } = options;

        return new Promise((resolve) => {
            // Update content
            this.modal.querySelector('.confirm-title').textContent = title;
            this.modal.querySelector('.confirm-message').textContent = message;

            // Update icon
            const iconEl = this.modal.querySelector('.confirm-icon');
            iconEl.className = `confirm-icon ${type}`;
            iconEl.innerHTML = this.getIcon(type);

            // Update buttons
            const cancelBtn = this.modal.querySelector('.confirm-cancel');
            const okBtn = this.modal.querySelector('.confirm-ok');

            cancelBtn.textContent = cancelText;
            okBtn.textContent = confirmText;
            okBtn.className = `${confirmClass} confirm-ok`;

            // Button handlers
            const handleCancel = () => {
                this.close(false);
                resolve(false);
                cleanup();
            };

            const handleOk = () => {
                this.close(true);
                resolve(true);
                cleanup();
            };

            const cleanup = () => {
                cancelBtn.removeEventListener('click', handleCancel);
                okBtn.removeEventListener('click', handleOk);
            };

            cancelBtn.addEventListener('click', handleCancel);
            okBtn.addEventListener('click', handleOk);

            // Show modal
            this.modal.classList.add('active');
            okBtn.focus(); // Focus on confirm button
        });
    }

    close(result) {
        this.modal.classList.remove('active');
    }

    getIcon(type) {
        const icons = {
            danger: `
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            `,
            warning: `
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            `,
            info: `
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            `
        };

        return icons[type] || icons.info;
    }

    // Convenience methods
    async confirmDelete(itemName = 'mục này') {
        return this.show({
            title: 'Xác nhận xóa',
            message: `Bạn có chắc chắn muốn xóa ${itemName}? Hành động này không thể hoàn tác.`,
            type: 'danger',
            confirmText: 'Xóa',
            confirmClass: 'btn-danger'
        });
    }

    async confirmAction(action = 'thực hiện hành động này') {
        return this.show({
            title: 'Xác nhận',
            message: `Bạn có chắc chắn muốn ${action}?`,
            type: 'warning',
            confirmText: 'Xác nhận',
            confirmClass: 'btn-primary'
        });
    }
}

// Create global instance
const confirmDialog = new ConfirmDialog();

// Global helper functions
window.showConfirm = async (options) => {
    return confirmDialog.show(options);
};

window.confirmDelete = async (itemName) => {
    return confirmDialog.confirmDelete(itemName);
};

window.confirmAction = async (action) => {
    return confirmDialog.confirmAction(action);
};

// Example usage:
/*
// Simple confirm
const confirmed = await showConfirm({
    title: 'Xác nhận xóa',
    message: 'Bạn có chắc chắn muốn xóa voucher này?',
    type: 'danger'
});

if (confirmed) {
    // Delete item
}

// Or use convenience method
if (await confirmDelete('voucher SUMMER2026')) {
    // Delete voucher
}
*/

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ConfirmDialog, confirmDialog };
}

console.log('[Confirm] Custom confirmation dialog loaded ✓');
