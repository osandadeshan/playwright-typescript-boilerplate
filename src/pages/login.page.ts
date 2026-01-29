import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  async login(username: string, password: string): Promise<void> {
    await this.page.fill("#user-name", username);
    await this.page.fill("#password", password);
    await this.page.click("#login-button");
  }

  async getPageHeading(): Promise<string> {
    const headingText = await this.page.locator("span.title").textContent();
    return headingText?.trim() ?? "";
  }

  async getErrorMessage(): Promise<string> {
    const errorText = await this.page
      .locator('[data-test="error"]')
      .textContent();
    return errorText?.trim() ?? "";
    ``;
  }
}
