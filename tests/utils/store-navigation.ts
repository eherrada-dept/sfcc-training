import { Page, expect } from '@playwright/test';

export class StoreNavigation {
    constructor(private page: Page) {}

    async navigateThroughPath(categoryPath: Array<{ id: string; action: string }>) {
        for (const step of categoryPath) {
            if (step.action === 'hover') {
                await this.page.hover(`#${step.id}`);
            } else if (step.action === 'click') {
                await this.page.click(`#${step.id}`);
            }
        }
    }

    async addProductToCart(dataPid: string) {
        const product = this.page.locator(`[data-pid="${dataPid}"]`);
        await product.click();
        
        // Wait for URL to change and contain the PID
        await this.page.waitForURL(`**/*${dataPid}*`);
        
        // Validate that current URL contains the PID
        const currentUrl = this.page.url();
        expect(currentUrl).toContain(dataPid);
        
        // Click on Add to Cart button
        await this.page.click('.add-to-cart.btn.btn-primary');
        
        // Wait for success alert to appear
        await this.page.waitForSelector('.alert.alert-success.add-to-basket-alert.text-center');
        
        // Click on minicart
        await this.page.click('.minicart');
    }

    async applyCoupon(couponCode: string) {
        // Fill in coupon code
        await this.page.fill('#couponCode', couponCode);
        await this.page.click('.btn.btn-primary.btn-block.promo-code-btn');
        
        // Wait for coupons and promos section to appear
        await this.page.waitForSelector('.coupons-and-promos');
        
        // Verify that the element contains the coupon code
        const couponElement = this.page.locator('.coupons-and-promos');
        await expect(couponElement).toContainText(couponCode);
    }

    async validateDiscount(discountConfig: { type: string; value: number }) {
        // Wait for prices to be visible
        await this.page.waitForSelector('.unit-price');
        
        // Get original price (strike-through)
        const originalPriceElement = this.page.locator('.unit-price .strike-through.list .value');
        const originalPrice = await originalPriceElement.getAttribute('content');
        if (!originalPrice) {
            throw new Error('Could not get original price');
        }
        
        // Get discounted price (sales)
        const discountedPriceElement = this.page.locator('.unit-price .sales .value');
        const discountedPrice = await discountedPriceElement.getAttribute('content');
        if (!discountedPrice) {
            throw new Error('Could not get discounted price');
        }
        
        // Convert prices to numbers - handle potential currency symbols or formatting
        const originalPriceNum = parseFloat(originalPrice.replace(/[^\d.-]/g, ''));
        const discountedPriceNum = parseFloat(discountedPrice.replace(/[^\d.-]/g, ''));
        
        
        // Calculate expected discount based on configuration
        const discountMultiplier = (100 - discountConfig.value) / 100;
        const expectedDiscountedPrice = originalPriceNum * discountMultiplier;
        
        console.log(`Expected discounted price: ${expectedDiscountedPrice}`);
        
        // Verify that discounted price is correct
        expect(discountedPriceNum).toBeCloseTo(expectedDiscountedPrice, 2);
    }
} 