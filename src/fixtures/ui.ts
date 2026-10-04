import { test as base } from '@playwright/test';

import { AdminLoginPage } from '../pages/AdminLoginPage';
import { HomePage } from '../pages/HomePage';

/** UI fixtures: page objects injected into every UI test. */
export const test = base.extend<{ home: HomePage; admin: AdminLoginPage }>({
  home: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  admin: async ({ page }, use) => {
    await use(new AdminLoginPage(page));
  },
});

export { expect } from '@playwright/test';
