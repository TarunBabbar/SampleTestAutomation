import { test, expect } from '../../src/fixtures/api';

test.describe('Service health @api @p1', () => {
  test('GET /ping returns 201', async ({ api }) => {
    const response = await api.ping();
    expect(response.status()).toBe(201);
  });

  test('GET /booking returns a list', async ({ api }) => {
    const response = await api.listBookings();
    expect(response.status()).toBe(200);
    expect(Array.isArray(await response.json())).toBe(true);
  });
});
