// Login & Registration JavaScript
// Tab switching, OTP modal, password strength, form validation

// ============================================
// TAB SWITCHING
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.login-tab');
    const tabContents = document.querySelectorAll('.login-tab-content');

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
// PASSWORD TOGGLE
// ===========================================
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.parentElement.querySelector('.password-toggle');
    const eyeIcon = button.querySelector('.eye-icon');

    if (input.type === 'password') {
        input.type = 'text';
        eyeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
        `;
    } else {
        input.type = 'password';
        eyeIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        `;
    }
}

// ============================================
// PASSWORD STRENGTH CHECKER
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const signupPassword = document.getElementById('signup-password');
    const strengthIndicator = document.getElementById('password-strength');

    if (signupPassword && strengthIndicator) {
        signupPassword.addEventListener('input', function () {
            const password = this.value;
            const strengthBar = strengthIndicator.querySelector('.strength-fill');
            const strengthText = strengthIndicator.querySelector('.strength-text');

            if (password.length === 0) {
                strengthIndicator.classList.remove('visible');
                return;
            }

            strengthIndicator.classList.add('visible');

            // Calculate strength
            let strength = 0;
            if (password.length >= 8) strength++;
            if (password.length >= 12) strength++;
            if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^a-zA-Z0-9]/.test(password)) strength++;

            // Update UI
            strengthBar.className = 'strength-fill';
            strengthText.className = 'strength-text';

            if (strength <= 2) {
                strengthBar.classList.add('weak');
                strengthText.classList.add('weak');
                strengthText.textContent = 'Mật khẩu yếu';
            } else if (strength <= 4) {
                strengthBar.classList.add('medium');
                strengthText.classList.add('medium');
                strengthText.textContent = 'Mật khẩu trung bình';
            } else {
                strengthBar.classList.add('strong');
                strengthText.classList.add('strong');
                strengthText.textContent = 'Mật khẩu mạnh';
            }
        });
    }
});

// ============================================
// FORM SUBMISSION
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');

    if (signinForm) {
        signinForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('signin-email').value;
            const password = document.getElementById('signin-password').value;

            console.log('Sign In:', { email, password });

            // Simulate API call
            setTimeout(() => {
                openOtpModal(email);
            }, 500);
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('signup-email').value;
            const phone = document.getElementById('signup-phone').value;
            const password = document.getElementById('signup-password').value;

            console.log('Sign Up:', { email, phone, password });

            // Simulate API call
            setTimeout(() => {
                openOtpModal(email);
            }, 500);
        });
    }
});

// ============================================
// OTP MODAL
// ============================================
let otpTimer;
let otpCountdown = 30;

function openOtpModal(target) {
    const modal = document.getElementById('otp-modal');
    const targetElement = document.getElementById('otp-target');

    targetElement.textContent = target;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Reset OTP inputs
    const inputs = document.querySelectorAll('.otp-input');
    inputs.forEach((input) => {
        input.value = '';
        input.classList.remove('filled', 'error');
    });
    inputs[0].focus();

    // Start countdown
    startOtpTimer();
}

function closeOtpModal() {
    const modal = document.getElementById('otp-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';

    // Clear timer
    if (otpTimer) {
        clearInterval(otpTimer);
    }
}

function startOtpTimer() {
    otpCountdown = 30;
    const countdownElement = document.getElementById('otp-countdown');
    const resendButton = document.getElementById('otp-resend-btn');
    const timerText = document.getElementById('otp-timer-text');

    resendButton.disabled = true;
    timerText.style.display = 'inline';

    if (otpTimer) {
        clearInterval(otpTimer);
    }

    otpTimer = setInterval(() => {
        otpCountdown--;
        countdownElement.textContent = otpCountdown;

        if (otpCountdown <= 0) {
            clearInterval(otpTimer);
            resendButton.disabled = false;
            timerText.style.display = 'none';
        }
    }, 1000);
}

function resendOtp() {
    console.log('Resending OTP...');
    startOtpTimer();

    // Simulate API call
    setTimeout(() => {
        alert('Mã OTP mới đã được gửi!');
    }, 500);
}

// ============================================
// OTP INPUT AUTO-FOCUS & VALIDATION
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const otpInputs = document.querySelectorAll('.otp-input');

    otpInputs.forEach((input, index) => {
        // Only allow numbers
        input.addEventListener('input', function (e) {
            const value = e.target.value;

            // Remove non-numeric characters
            e.target.value = value.replace(/[^0-9]/g, '');

            // Add filled class
            if (e.target.value) {
                e.target.classList.add('filled');

                // Auto-focus next input
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            } else {
                e.target.classList.remove('filled');
            }
        });

        // Handle backspace
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                otpInputs[index - 1].focus();
            }
        });

        // Handle paste
        input.addEventListener('paste', function (e) {
            e.preventDefault();
            const pasteData = e.clipboardData.getData('text').replace(/[^0-9]/g, '');

            otpInputs.forEach((input, i) => {
                if (pasteData[i]) {
                    input.value = pasteData[i];
                    input.classList.add('filled');
                }
            });

            // Focus last input or next empty
            const lastFilledIndex = Math.min(pasteData.length - 1, otpInputs.length - 1);
            otpInputs[lastFilledIndex].focus();
        });
    });
});

// ============================================
// OTP FORM SUBMISSION
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const otpForm = document.getElementById('otp-form');

    if (otpForm) {
        otpForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const otpInputs = document.querySelectorAll('.otp-input');
            let otp = '';

            otpInputs.forEach((input) => {
                otp += input.value;
            });

            if (otp.length !== 6) {
                // Shake animation for error
                otpInputs.forEach((input) => {
                    input.classList.add('error');
                });

                setTimeout(() => {
                    otpInputs.forEach((input) => {
                        input.classList.remove('error');
                    });
                }, 300);

                return;
            }

            console.log('OTP Submitted:', otp);

            // Simulate verification
            setTimeout(() => {
                alert('Xác thực thành công! Đang chuyển hướng...');
                closeOtpModal();
                // window.location.href = '/dashboard';
            }, 1000);
        });
    }
});

// ============================================
// CLOSE MODAL ON ESCAPE KEY
// ============================================
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeOtpModal();
    }
});

// ============================================
// SOCIAL LOGIN HANDLERS
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const googleButtons = document.querySelectorAll('.btn-google');
    const facebookButtons = document.querySelectorAll('.btn-facebook');

    googleButtons.forEach((btn) => {
        btn.addEventListener('click', function () {
            console.log('Google Login clicked');
            // window.location.href = '/auth/google';
        });
    });

    facebookButtons.forEach((btn) => {
        btn.addEventListener('click', function () {
            console.log('Facebook Login clicked');
            // window.location.href = '/auth/facebook';
        });
    });
});
