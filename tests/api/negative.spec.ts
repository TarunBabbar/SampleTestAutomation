import { aBooking } from '../../src/data/booking';
import { test, expect } from '../../src/fixtures/api';

// Maps to QAB test cases TC-BOOK-016, TC-NFR-001 and the auth negative cases.
test.describe('Negative and authorisation @api @p1', () => {
  test('PUT without a token is forbidden', async ({ api }) => {
    const { bookingid } = await (await api.createBooking(aBooking())).json();
    const response = await api.updateBooking(bookingid, aBooking());
    expect(response.status()).toBe(403);
  });

  test('DELETE without a token is forbidden', async ({ api }) => {
    const { bookingid } = await (await api.createBooking(aBooking())).json();
    expect((await api.deleteBooking(bookingid)).status()).toBe(403);
  });

  test('an unknown booking id returns 404', async ({ api }) => {
    expect((await api.getBooking(9_999_999)).status()).toBe(404);
  });

  test('TC-BOOK-016 a booking missing a required field is rejected with 4xx', async ({ api }) => {
    // Known defect: restful-booker answers 500 instead of a 4xx validation error
    // for a booking with no lastname. Tracked in Jira as a QAB bug linked to this
    // test case; the test asserts the EXPECTED behaviour and is marked as an
    // expected failure so the defect is documented without reddening the suite.
    test.fail(true, 'restful-booker returns 500 for a missing required field');
    const incomplete = { ...aBooking(), lastname: undefined } as never;
    const response = await api.createBooking(incomplete);
    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).toBeLessThan(500);
  });

  test('TC-NFR-001 malformed JSON does not return 5xx', async ({ request }) => {
    const response = await request.post('/booking', {
      data: '{ "firstname": "broken"',
      headers: { 'Content-Type': 'application/json' },
    });
    expect(response.status()).toBeLessThan(500);
  });
});
