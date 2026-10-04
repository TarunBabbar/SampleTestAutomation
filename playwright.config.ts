import { defineConfig, devices } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? 'https://restful-booker.herokuapp.com';
const UI_BASE_URL = process.env.UI_BASE_URL ?? 'https://automationintesting.online';

export default defineConfig({
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
  use: { trace: 'retain-on-failure' },
  projects: [
    {
      // API tests target restful-booker. No browser binary needed.
      name: 'api',
      testDir: './tests/api',
      use: { baseURL: API_BASE_URL },
    },
    {
      // UI tests target the restful-booker-platform front end.
      // Requires: npx playwright install chromium
      name: 'ui',
      testDir: './tests/ui',
      use: { baseURL: UI_BASE_URL, ...devices['Desktop Chrome'] },
    },
  ],
});
