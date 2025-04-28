import { test } from '@playwright/test';
import { StoreNavigation } from './utils/store-navigation';
import * as testData from './data/bracelet-disccount.json';
import { STORE_CONFIG } from '../config/environment';

test.describe('Parametrized Coupon Tests', () => {
    for (const testCase of testData.braceletDiscount) {
        test(testCase.name, async ({ page }) => {
            // Initial setup
            await page.goto(STORE_CONFIG.BASE_URL);
            await page.getByRole('button', { name: 'Yes' }).click();

            // Initialize navigation utility
            const storeNav = new StoreNavigation(page);

            // Navigate through category path
            await storeNav.navigateThroughPath(testCase.navigation.categoryPath);

            // Add product to cart
            await storeNav.addProductToCart(testCase.product.dataPid);

            // Apply coupon
            await storeNav.applyCoupon(testCase.coupon.code);

            // Validate discount
            await storeNav.validateDiscount(testCase.coupon.validation);
        });
    }
}); 