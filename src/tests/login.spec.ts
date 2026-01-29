import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test.describe("login feature", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test(
    "should login successfully with valid credentials",
    { tag: ["@login", "@smoke", "@positive"] },
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.login("standard_user", "secret_sauce");

      expect(await loginPage.getPageHeading()).toBe("Products");
      await expect(page).toHaveURL(/inventory.html/);
    },
  );

  test(
    "should show error with invalid credentials",
    { tag: ["@login", "@regression", "@negative"] },
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.login("standard_user", "secret_sause");

      expect(await loginPage.getErrorMessage()).toBe(
        "Epic sadface: Username and password do not match any user in this service",
      );
    },
  );
});
