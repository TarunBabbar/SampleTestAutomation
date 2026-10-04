import { test, expect } from '../../src/fixtures/api';

// Maps to QAB test cases TC-AUTH-001, TC-AUTH-002, TC-AUTH-007.
test.describe('Authentication API @api @p0', () => {
  test('TC-AUTH-001 returns a token for valid credentials', async ({ api }) => {
    const response = await api.createToken('admin', 'password123');
    expect(response.status()).toBe(200);
    expect((await response.json()).token).toBeTruthy();
  });

  test('TC-AUTH-002 returns no token for invalid credentials', async ({ api }) => {
    const response = await api.createToken('admin', 'not-the-password');
    const body = await response.json();
    expect(body.token).toBeFalsy(); // restful-booker answers 200 with a "reason"
    expect(body.reason).toBeTruthy();
  });

  test('TC-AUTH-007 returns no token for an empty password', async ({ api }) => {
    const response = await api.createToken('admin', '');
    expect((await response.json()).token).toBeFalsy();
  });
});
