import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login Feature', () => {
    test('should login successfully with valid credentials', async ({ page }) => {
        await page.goto('/');

        const loginPage = new LoginPage(page);
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(page).toHaveURL(/inventory.html/);
    });

    test('should show error with invalid credentials', async ({ page }) => {
        await page.goto('/');

        const loginPage = new LoginPage(page);
        await loginPage.login('standard_user', 'secret_sause');

        expect(await loginPage.getErrorMessage()).toBe('Epic sadface: Username and password do not match any user in this service');
    });
});