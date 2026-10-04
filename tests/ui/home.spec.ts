import { test, expect } from '../../src/fixtures/ui';

// Maps to QAB test cases TC-BOOK-015 (branding on the booking page) and TC-MSG-010.
test.describe('Public site @ui @p1', () => {
  test('the home page shows the site name and the availability form', async ({ home }) => {
    await home.open();
    await expect(home.banner()).toContainText('Shady Meadows');
    await expect(home.availabilityHeading()).toBeVisible();
    await expect(home.availabilityButton()).toBeVisible();
  });

  test('TC-MSG-010 the contact form rejects an invalid email', async ({ home }) => {
    await home.open();
    await home.email().fill('not-an-email');
    const valid = await home.email().evaluate((el) => (el as HTMLInputElement).checkValidity());
    expect(valid).toBe(false);
  });

  test('the contact form exposes the expected fields', async ({ page, home }) => {
    await home.open();
    for (const id of ['#name', '#email', '#phone', '#subject', '#description']) {
      await expect(page.locator(id)).toBeVisible();
    }
  });
});
