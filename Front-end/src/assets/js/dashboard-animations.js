/**
 * Phase 3: Dashboard Animations
 * Animated number counters, card entrances, and micro-interactions
 */

// ============ ANIMATED NUMBER COUNTERS ============

/**
 * Animates a number from start to target value
 * @param {HTMLElement} element - Element containing the number
 * @param {number} start - Starting value
 * @param {number} end - Target value
 * @param {number} duration - Animation duration in ms
 * @param {string} suffix - Optional suffix (e.g., '₫', '%')
 */
function animateValue(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            element.textContent = formatNumber(end) + suffix;
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current)) + suffix;
        }
    }, 16);
}

/**
 * Format number với Vietnamese locale
 */
function formatNumber(num) {
    return num.toLocaleString('vi-VN');
}

/**
 * Initialize number animations on page load
 */
function initNumberAnimations() {
    const kpiValues = document.querySelectorAll('.kpi-value');

    kpiValues.forEach((el, index) => {
        const text = el.textContent.trim();

        // Extract number and suffix
        const match = text.match(/^([\d,.]+)(.*)$/);
        if (!match) return;

        const numStr = match[1].replace(/[,.]/g, '');
        const suffix = match[2] || '';
        const finalValue = parseInt(numStr);

        if (isNaN(finalValue)) return;

        // Stagger animation start
        setTimeout(() => {
            animateValue(el, 0, finalValue, 1200, suffix);
        }, index * 100); // 100ms delay between each card
    });
}

// ============ CARD SLIDE-IN ANIMATIONS ============

/**
 * Add slide-in animation classes to cards
 */
function initCardAnimations() {
    // KPI Cards
    const kpiCards = document.querySelectorAll('.kpi-card');
    kpiCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 80)); // Staggered entrance
    });

    // Chart Cards
    const chartCards = document.querySelectorAll('.chart-card');
    chartCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 400 + (index * 100)); // Start after KPI cards
    });

    // Activity Panels
    const activityPanels = document.querySelectorAll('.activity-panel');
    activityPanels.forEach((panel, index) => {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(20px)';

        setTimeout(() => {
            panel.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            panel.style.opacity = '1';
            panel.style.transform = 'translateY(0)';
        }, 600 + (index * 100)); // Start after charts
    });
}

// ============ ACTIVITY FEED ANIMATIONS ============

/**
 * Add hover animations to activity items
 */
function initActivityAnimations() {
    const activityItems = document.querySelectorAll('.activity-item');

    activityItems.forEach(item => {
        // Add gradient border effect on hover
        const borderEl = document.createElement('div');
        borderEl.className = 'activity-item-border';
        item.style.position = 'relative';
        item.insertBefore(borderEl, item.firstChild);
    });
}

// ============ INITIALIZE ALL ANIMATIONS ============

/**
 * Initialize all dashboard animations
 */
function initDashboardAnimations() {
    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        console.log('[Animations] Reduced motion detected - skipping animations');
        return;
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initCardAnimations();
            initNumberAnimations();
            initActivityAnimations();
        });
    } else {
        initCardAnimations();
        initNumberAnimations();
        initActivityAnimations();
    }

    console.log('[Animations] Dashboard animations initialized ✓');
}

// Auto-initialize
initDashboardAnimations();

// Export for manual control
window.dashboardAnimations = {
    animateValue,
    initNumberAnimations,
    initCardAnimations,
    initActivityAnimations
};
