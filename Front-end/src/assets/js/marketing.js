// Marketing Management JavaScript
// Tab switching, modal controls, and interactive features

// ============================================
// TAB SWITCHING
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.marketing-tab');
    const tabContents = document.querySelectorAll('.marketing-tab-content');

    tabs.forEach((tab) => {
        tab.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all tabs
            tabs.forEach((t) => t.classList.remove('active'));
            tabContents.forEach((tc) => tc.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');
            document.getElementById(targetTab + '-content').classList.add('active');
        });
    });
});

// ============================================
// FLASH SALE MODAL
// ============================================
function openFlashSaleModal() {
    const modal = document.getElementById('flash-sale-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFlashSaleModal() {
    const modal = document.getElementById('flash-sale-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function viewFlashSaleDetails() {
    alert('Xem chi tiết Flash Sale - Tính năng đang phát triển');
}

// ============================================
// VOUCHER MODAL
// ============================================
function openVoucherModal() {
    const modal = document.getElementById('voucher-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVoucherModal() {
    const modal = document.getElementById('voucher-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ============================================
// VOUCHER FILTERS
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');

            // Remove active class from all buttons
            filterBtns.forEach((b) => b.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Filter logic would go here
            console.log('Filtering by:', filter);
        });
    });
});

// ============================================
// COPY VOUCHER CODE
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const copyBtns = document.querySelectorAll('.copy-btn');

    copyBtns.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const voucherCode =
                this.parentElement.querySelector('.voucher-code').textContent;

            // Copy to clipboard
            navigator.clipboard
                .writeText(voucherCode)
                .then(() => {
                    // Show feedback
                    const originalHTML = this.innerHTML;
                    this.innerHTML = `
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                    `;

                    setTimeout(() => {
                        this.innerHTML = originalHTML;
                    }, 1500);
                })
                .catch((err) => {
                    console.error('Failed to copy:', err);
                });
        });
    });
});

// ============================================
// TOGGLE SWITCHES
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');

    toggleSwitches.forEach((toggle) => {
        toggle.addEventListener('change', function () {
            const isActive = this.checked;
            const row = this.closest('tr') || this.closest('.sale-item');

            console.log('Toggle switched:', isActive);

            // You can add AJAX call here to update status in backend
            // For now, just log the change
        });
    });
});

// ============================================
// CALENDAR NAVIGATION
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const calendarNavBtns = document.querySelectorAll('.calendar-nav-btn');

    calendarNavBtns.forEach((btn, index) => {
        btn.addEventListener('click', function () {
            const monthElement = document.querySelector('.calendar-month');
            const currentMonth = monthElement.textContent;

            console.log('Calendar navigation:', index === 0 ? 'prev' : 'next');

            // Calendar navigation logic would go here
            // For now, just log the action
        });
    });
});

// ============================================
// CLOSE MODAL ON ESCAPE KEY
// ============================================
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeFlashSaleModal();
        closeVoucherModal();
    }
});

// ============================================
// FORM VALIDATION (BASIC)
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const flashSaleForm = document.querySelector('.flash-sale-form');
    const voucherForm = document.querySelector('.voucher-form');

    if (flashSaleForm) {
        flashSaleForm.addEventListener('submit', function (e) {
            e.preventDefault();
            console.log('Flash Sale form submitted');

            // Add validation and AJAX submission here
            alert('Flash Sale đã được tạo thành công!');
            closeFlashSaleModal();
        });
    }

    if (voucherForm) {
        voucherForm.addEventListener('submit', function (e) {
            e.preventDefault();
            console.log('Voucher form submitted');

            // Add validation and AJAX submission here
            alert('Voucher đã được tạo thành công!');
            closeVoucherModal();
        });
    }
});
