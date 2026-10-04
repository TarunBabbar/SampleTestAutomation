import { type Page, type Locator, expect } from '@playwright/test';

/** Admin login and post-login chrome of restful-booker-platform. */
export class AdminLoginPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/admin');
    await expect(this.loginButton()).toBeVisible();
  }

  loginButton(): Locator {
    return this.page.getByRole('button', { name: 'Login' });
  }

  logoutButton(): Locator {
    return this.page.getByRole('button', { name: 'Logout' });
  }

  error(): Locator {
    return this.page.getByText('Invalid credentials');
  }

  roomsNav(): Locator {
    return this.page.getByRole('link', { name: 'Rooms' });
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.locator('#username').fill(username);
    await this.page.locator('#password').fill(password);
    await this.loginButton().click();
  }
}
