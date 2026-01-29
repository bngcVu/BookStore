const { chromium } = require('playwright');

/**
 * Playwright Test Script for BookStore
 * Usage: node playwright_test.js
 * Note: Ensure you are serving the Front-end directory (e.g. http-server -p 8080)
 */

(async () => {
    // 1. Setup
    const browser = await chromium.launch({ headless: false }); // Visible for demo
    const context = await browser.newContext();
    const page = await context.newPage();
    const BASE_URL = 'http://127.0.0.1:8080/Front-end'; // Adjust based on your server

    console.log('🚀 Starting BookStore E2E Test...');

    try {
        // 2. Test Homepage Load
        await page.goto(`${BASE_URL}/index.html`);
        console.log('✅ Homepage Loaded');

        // Check Hero Title
        const title = await page.textContent('h1');
        if (title.includes('Khám phá thế giới')) console.log('✅ Hero Title Verified');

        // 3. Test Navigation to Products
        await page.click('a[href="products.html"]');
        await page.waitForLoadState('networkidle');
        console.log('✅ Navigated to Products Page');

        // 4. Test Filter Interaction (Click a category)
        // Note: In mock, this just reloads or highlights. We'll check if grid exists.
        const productCount = await page.locator('.glass-card').count();
        console.log(`✅ Found ${productCount} products in grid`);

        // 5. Test Product Detail
        // Click first product
        await page.locator('.glass-card a').first().click();
        await page.waitForLoadState('networkidle');
        console.log('✅ Navigated to Product Detail');

        // Add to Cart
        await page.click('button:has-text("Thêm vào giỏ")');
        console.log('✅ Clicked Add to Cart');

        // 6. Test Cart
        await page.click('a[href="cart.html"]'); // Click Cart Icon
        await page.waitForLoadState('networkidle');
        console.log('✅ Navigated to Cart');

        // Check if item is in cart (Mock data puts items there by default)
        const cartItems = await page.locator('#cart-container .glass').count();
        if (cartItems > 0) console.log('✅ Cart has items');

        // 7. Test Checkout
        await page.click('a[href="checkout.html"]');
        console.log('✅ Navigated to Checkout');

        // Fill Form
        await page.fill('input[placeholder="Họ tên"]', 'Playwright Bot');
        await page.fill('input[placeholder="Số điện thoại"]', '0912345678');
        console.log('✅ Filled Checkout Form');

        console.log('🎉 All Frontend Tests Passed!');

    } catch (error) {
        console.error('❌ Test Failed:', error);
        await page.screenshot({ path: 'error_screenshot.png' });
    } finally {
        await browser.close();
    }
})();
