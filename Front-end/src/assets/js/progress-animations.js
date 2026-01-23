/**
 * Option C: Progress Bar Animations
 * Animates progress bars on page load
 */

// Initialize progress bars
function initProgressBars() {
    const progressBars = document.querySelectorAll('.kpi-progress-bar');

    progressBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-width');

        // Stagger animation
        setTimeout(() => {
            bar.style.width = targetWidth + '%';
        }, 300 + (index * 150)); // 150ms delay between each
    });
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProgressBars);
} else {
    initProgressBars();
}

// Export
window.initProgressBars = initProgressBars;
