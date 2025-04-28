import { test, expect } from '@playwright/test';
import { STORE_CONFIG } from '../config/environment';


test.describe('SFCC Store Tests', () => {

    test('should be able to view 25493624M in womens-clothing-bottoms', async ({ page }) => {
        await page.goto(STORE_CONFIG.BASE_URL);
        await page.getByRole('button', { name: 'Yes' }).click();
        
        // Hover over womens
        await page.hover('#womens');
        
        // Hover over womens-clothing
        await page.hover('#womens-clothing');
        
        // Click on womens-clothing-bottoms
        await page.click('#womens-clothing-bottoms');

        // Verify that the specific product is visible
        const product = page.locator('[data-pid="25493624M"]');
        await expect(product).toBeVisible();
    });

}); 