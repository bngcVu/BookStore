// Voucher Management Page JavaScript
// Modal, toggle switches, segmented control

// ============================================
// MODAL CONTROLS
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

// Close modal on ESC key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeVoucherModal();
    }
});

// ============================================
// SEGMENTED CONTROL - DISCOUNT TYPE
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const percentageRadio = document.getElementById('type-percentage');
    const fixedRadio = document.getElementById('type-fixed');
    const percentageInputs = document.getElementById('percentage-inputs');
    const fixedInputs = document.getElementById('fixed-inputs');

    if (percentageRadio && fixedRadio) {
        percentageRadio.addEventListener('change', function () {
            if (this.checked) {
                percentageInputs.style.display = 'grid';
                fixedInputs.style.display = 'none';
            }
        });

        fixedRadio.addEventListener('change', function () {
            if (this.checked) {
                percentageInputs.style.display = 'none';
                fixedInputs.style.display = 'grid';
            }
        });
    }
});

// ============================================
// TOGGLE SWITCHES
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');

    toggleSwitches.forEach((toggle) => {
        toggle.addEventListener('change', function () {
            const row = this.closest('tr');
            const voucherCode = row?.querySelector('.voucher-code')?.textContent;
            const isActive = this.checked;

            console.log(`Voucher ${voucherCode} is now ${isActive ? 'active' : 'inactive'}`);

            // Here you would typically:
            // 1. Send API request to update voucher status
            // 2. Show success notification
        });
    });
});

// ============================================
// EDIT VOUCHER
// ============================================
function editVoucher(button) {
    const row = button.closest('tr');

    // Extract voucher data from row
    const voucherCode = row.querySelector('.voucher-code').textContent;
    const voucherName = row.querySelector('.voucher-name').textContent;

    console.log('Edit voucher:', { voucherCode, voucherName });

    // Open modal with populated fields
    openVoucherModal();

    // Here you would typically:
    // 1. Fetch full voucher details from API
    // 2. Populate form fields
    // 3. Change modal title to "Edit Voucher"
    // 4. Change submit button text to "Update Voucher"
}

// ============================================
// DELETE VOUCHER
// ============================================
function deleteVoucher(button) {
    const row = button.closest('tr');
    const voucherCode = row.querySelector('.voucher-code').textContent;
    const voucherName = row.querySelector('.voucher-name').textContent;

    if (
        confirm(
            `Are you sure you want to delete this voucher?\n\nCode: ${voucherCode}\nName: ${voucherName}\n\nThis action cannot be undone.`
        )
    ) {
        console.log('Delete voucher:', voucherCode);

        // Animate row removal
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = 'all 300ms';

        setTimeout(() => {
            row.remove();
        }, 300);

        // Here you would typically:
        // 1. Send DELETE request to API
        // 2. On success, remove row from table
        // 3. Update stats cards
        // 4. Show success notification
    }
}

// ============================================
// FORM SUBMISSION
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const voucherForm = document.querySelector('.voucher-form');

    if (voucherForm) {
        voucherForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Collect form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            console.log('Creating voucher:', data);

            // Here you would typically:
            // 1. Validate form data
            // 2. Send POST request to API
            // 3. On success, add new row to table
            // 4. Update stats cards
            // 5. Close modal
            // 6. Show success notification

            // Simulate success
            setTimeout(() => {
                alert('Voucher created successfully!');
                closeVoucherModal();
            }, 500);
        });
    }
});
