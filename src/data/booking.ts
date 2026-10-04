import type { Booking, BookingDates } from '../api/RestfulBooker';

const DAY_MS = 86_400_000;
const iso = (d: Date) => d.toISOString().slice(0, 10);
const rand = (n: number) => Math.floor(Math.random() * n);

/** A future date range, so runs never depend on the service's reset window. */
export function bookingDates(offsetDays = 30, nights = 3): BookingDates {
  const checkin = new Date(Date.now() + offsetDays * DAY_MS);
  const checkout = new Date(checkin.getTime() + nights * DAY_MS);
  return { checkin: iso(checkin), checkout: iso(checkout) };
}

/** Unique per call, so parallel tests never collide. */
export function aBooking(overrides: Partial<Booking> = {}): Booking {
  const tag = `qa${Date.now()}${rand(10_000)}`;
  return {
    firstname: `Auto-${tag}`,
    lastname: 'Tester',
    totalprice: 100 + rand(400),
    depositpaid: true,
    bookingdates: bookingDates(),
    additionalneeds: 'Breakfast',
    ...overrides,
  };
}
