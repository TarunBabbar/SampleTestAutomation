import { type Page, type Locator, expect } from '@playwright/test';

export interface Enquiry {
  name: string;
  email: string;
  phone: string;
  subject: string;
  description: string;
}

/** Public booking site of restful-booker-platform. */
export class HomePage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/');
    await expect(this.banner()).toBeVisible();
  }

  banner(): Locator {
    return this.page.getByRole('heading', { name: /Welcome to/i });
  }

  availabilityHeading(): Locator {
    return this.page.getByRole('heading', { name: /Check Availability/i });
  }

  availabilityButton(): Locator {
    return this.page.getByRole('button', { name: 'Check Availability' });
  }

  email(): Locator {
    return this.page.locator('#email');
  }

  async fillEnquiry(fields: Enquiry): Promise<void> {
    await this.page.locator('#name').fill(fields.name);
    await this.page.locator('#email').fill(fields.email);
    await this.page.locator('#phone').fill(fields.phone);
    await this.page.locator('#subject').fill(fields.subject);
    await this.page.locator('#description').fill(fields.description);
  }

  async submitEnquiry(): Promise<void> {
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }
}
