import type { APIRequestContext, APIResponse } from '@playwright/test';

export interface BookingDates {
  checkin: string;
  checkout: string;
}

export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds?: string;
}

/** Thin client over the restful-booker API (https://restful-booker.herokuapp.com). */
export class RestfulBooker {
  constructor(private readonly request: APIRequestContext) {}

  ping(): Promise<APIResponse> {
    return this.request.get('/ping');
  }

  listBookings(params?: Record<string, string | number>): Promise<APIResponse> {
    return this.request.get('/booking', { params });
  }

  getBooking(id: number): Promise<APIResponse> {
    return this.request.get(`/booking/${id}`);
  }

  createBooking(booking: Booking): Promise<APIResponse> {
    return this.request.post('/booking', { data: booking });
  }

  updateBooking(id: number, booking: Booking, token?: string): Promise<APIResponse> {
    return this.request.put(`/booking/${id}`, { data: booking, headers: this.auth(token) });
  }

  partialUpdateBooking(id: number, patch: Record<string, unknown>, token?: string): Promise<APIResponse> {
    return this.request.patch(`/booking/${id}`, { data: patch, headers: this.auth(token) });
  }

  deleteBooking(id: number, token?: string): Promise<APIResponse> {
    return this.request.delete(`/booking/${id}`, { headers: this.auth(token) });
  }

  createToken(username = 'admin', password = 'password123'): Promise<APIResponse> {
    return this.request.post('/auth', { data: { username, password } });
  }

  private auth(token?: string): Record<string, string> {
    return token ? { Cookie: `token=${token}` } : {};
  }
}
