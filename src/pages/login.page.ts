import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  async login(username: string, password: string): Promise<void> {
    await this.page.locator("#user-name").fill(username);
    await this.page.locator("#password").fill(password);
    await this.page.locator("#login-button").click();
  }

  async getErrorMessage(): Promise<string> {
    const errorText = await this.page
      .locator('[data-test="error"]')
      .textContent();
    return errorText?.trim() ?? "";
  }
}
