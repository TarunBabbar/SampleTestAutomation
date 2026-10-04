import { test, expect } from '../../src/fixtures/ui';

// Maps to QAB test cases TC-AUTH-003 (login), TC-AUTH-005 (bad credentials),
// TC-AUTH-004 (logout).
test.describe('Admin authentication @ui @p0', () => {
  test('TC-AUTH-003 valid credentials open the admin area', async ({ admin, page }) => {
    await admin.open();
    await admin.login('admin', 'password');
    await expect(page).toHaveURL(/\/admin\/rooms/);
    await expect(admin.roomsNav()).toBeVisible();
  });

  test('TC-AUTH-005 invalid credentials show an error and stay on the login page', async ({ admin, page }) => {
    await admin.open();
    await admin.login('admin', 'definitely-wrong');
    await expect(admin.error()).toBeVisible();
    await expect(page).toHaveURL(/\/admin$/);
  });

  test('TC-AUTH-004 logout ends the admin session', async ({ admin, page }) => {
    await admin.open();
    await admin.login('admin', 'password');
    await expect(page).toHaveURL(/\/admin\/rooms/);
    await admin.logoutButton().click();
    // Logging out returns to the public site, so the admin area is no longer reachable.
    await expect(page.getByRole('heading', { name: /Welcome to/i })).toBeVisible();
    await expect(page).not.toHaveURL(/\/admin\/rooms/);
  });
});
