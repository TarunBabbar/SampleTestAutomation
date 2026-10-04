import { aBooking } from '../../src/data/booking';
import { test, expect } from '../../src/fixtures/api';

// Maps to QAB test cases TC-BOOK-001, TC-BOOK-011, TC-BOOK-013 (+ CRUD coverage).
test.describe('Booking API @api @p0', () => {
  test('TC-BOOK-001 creates a booking and returns a retrievable id', async ({ api }) => {
    const payload = aBooking();
    const created = await api.createBooking(payload);
    expect(created.status()).toBe(200);

    const { bookingid } = await created.json();
    expect(bookingid).toBeGreaterThan(0);

    const fetched = await api.getBooking(bookingid);
    expect(fetched.status()).toBe(200);
    const body = await fetched.json();
    expect(body.firstname).toBe(payload.firstname);
    expect(body.lastname).toBe(payload.lastname);
    expect(body.bookingdates.checkin).toBe(payload.bookingdates.checkin);
    expect(body.bookingdates.checkout).toBe(payload.bookingdates.checkout);
  });

  test('TC-BOOK-011 a new booking appears in the booking list', async ({ api }) => {
    const { bookingid } = await (await api.createBooking(aBooking())).json();
    const listed = await api.listBookings();
    expect(listed.status()).toBe(200);
    const ids = (await listed.json()) as Array<{ bookingid: number }>;
    expect(ids.map((b) => b.bookingid)).toContain(bookingid);
  });

  test('TC-BOOK-013 the deposit flag round-trips', async ({ api }) => {
    const payload = aBooking({ depositpaid: false });
    const { bookingid } = await (await api.createBooking(payload)).json();
    const fetched = await (await api.getBooking(bookingid)).json();
    expect(fetched.depositpaid).toBe(false);
  });

  test('updates a booking with a token (PUT)', async ({ api, token }) => {
    const { bookingid } = await (await api.createBooking(aBooking())).json();
    const updated = aBooking({ firstname: 'Updated', totalprice: 999 });
    const response = await api.updateBooking(bookingid, updated, token);
    expect(response.status()).toBe(200);
    expect((await response.json()).firstname).toBe('Updated');
  });

  test('partially updates a booking with a token (PATCH)', async ({ api, token }) => {
    const { bookingid } = await (await api.createBooking(aBooking())).json();
    const response = await api.partialUpdateBooking(bookingid, { additionalneeds: 'Late checkout' }, token);
    expect(response.status()).toBe(200);
    expect((await response.json()).additionalneeds).toBe('Late checkout');
  });

  test('deletes a booking with a token and it is then gone', async ({ api, token }) => {
    const { bookingid } = await (await api.createBooking(aBooking())).json();
    expect((await api.deleteBooking(bookingid, token)).status()).toBe(201);
    expect((await api.getBooking(bookingid)).status()).toBe(404);
  });

  test('filters the booking list by guest name and dates', async ({ api }) => {
    const payload = aBooking();
    await api.createBooking(payload);
    const response = await api.listBookings({
      firstname: payload.firstname,
      checkin: payload.bookingdates.checkin,
      checkout: payload.bookingdates.checkout,
    });
    expect(response.status()).toBe(200);
    expect(Array.isArray(await response.json())).toBe(true);
  });
});
