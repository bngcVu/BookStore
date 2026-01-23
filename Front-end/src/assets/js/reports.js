// Reports Page JavaScript with Chart.js
// Revenue chart, Orders chart, Top Products chart

// ============================================
// CHART CONFIGURATION
// ============================================
const chartColors = {
    primary: '#8B0000', // Dark Red
    success: '#10B981',
    blue: '#3B82F6',
    warning: '#F59E0B',
    gray: '#6B7280',
};

// Generate sample data for 30 days
function generateDailyData(days = 30, min = 3000000, max = 12000000) {
    const data = [];
    const labels = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        labels.push(
            date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
        );
        data.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    return { labels, data };
}

// Format currency VND
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
}

// ============================================
// REVENUE LINE CHART
// ============================================
function createRevenueChart() {
    const ctx = document.getElementById('revenue-chart');
    if (!ctx) return;

    const { labels, data } = generateDailyData(30, 3000000, 12000000);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Doanh thu',
                    data: data,
                    borderColor: chartColors.primary,
                    backgroundColor: 'rgba(139, 0, 0, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    pointBackgroundColor: chartColors.primary,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return 'Doanh thu: ' + formatCurrency(context.parsed.y);
                        },
                    },
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return (value / 1000000).toFixed(0) + 'M';
                        },
                    },
                },
            },
        },
    });
}

// ============================================
// ORDERS BAR CHART
// ============================================
function createOrdersChart() {
    const ctx = document.getElementById('orders-chart');
    if (!ctx) return;

    const { labels, data } = generateDailyData(30, 20, 80);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Đơn hàng',
                    data: data,
                    backgroundColor: chartColors.blue,
                    borderRadius: 4,
                    barThickness: 8,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return 'Đơn hàng: ' + context.parsed.y;
                        },
                    },
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 20,
                    },
                },
            },
        },
    });
}

// ============================================
// TOP PRODUCTS HORIZONTAL BAR CHART
// ============================================
function createTopProductsChart() {
    const ctx = document.getElementById('top-products-chart');
    if (!ctx) return;

    const products = [
        { name: 'Đắc Nhân Tâm', sold: 450 },
        { name: 'Nhà Giả Kim', sold: 380 },
        { name: 'Tôi Thấy Hoa Vàng...', sold: 340 },
        { name: 'Cà Phê Cùng Tony', sold: 310 },
        { name: 'Tuổi Trẻ Đáng Giá...', sold: 285 },
        { name: 'Think and Grow Rich', sold: 260 },
        { name: '7 Thói Quen...', sold: 245 },
        { name: 'Rich Dad Poor Dad', sold: 220 },
        { name: 'Atomic Habits', sold: 195 },
        { name: 'The Subtle Art...', sold: 170 },
    ];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: products.map((p) => p.name),
            datasets: [
                {
                    label: 'Số lượng bán',
                    data: products.map((p) => p.sold),
                    backgroundColor: [
                        chartColors.primary,
                        chartColors.success,
                        chartColors.blue,
                        '#FBBF24',
                        '#6366F1',
                        '#EC4899',
                        '#8B5CF6',
                        '#10B981',
                        '#F59E0B',
                        chartColors.gray,
                    ],
                    borderRadius: 4,
                },
            ],
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return 'Đã bán: ' + context.parsed.x + ' cuốn';
                        },
                    },
                },
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 100,
                    },
                },
            },
        },
    });
}

// ============================================
// INITIALIZE CHARTS
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    createRevenueChart();
    createOrdersChart();
    createTopProductsChart();
});

// ============================================
// TIME RANGE CHANGE
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const timeRangeSelect = document.getElementById('time-range');

    if (timeRangeSelect) {
        timeRangeSelect.addEventListener('change', function () {
            const days = parseInt(this.value);
            console.log('Time range changed:', days, 'days');

            // Here you would typically:
            // 1. Fetch new data from API for selected time range
            // 2. Destroy existing charts
            // 3. Recreate charts with new data

            alert(
                `Đang tải dữ liệu ${days} ngày qua...\n\n(Feature này cần kết nối API backend)`
            );
        });
    }
});
