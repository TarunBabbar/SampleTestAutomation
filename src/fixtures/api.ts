import { test as base } from '@playwright/test';

import { RestfulBooker } from '../api/RestfulBooker';

/**
 * Fixtures shared by the API tests:
 *   api   - a RestfulBooker client bound to the project's baseURL
 *   token - an admin token, minted once per test that asks for it
 */
export type ApiFixtures = {
  api: RestfulBooker;
  token: string;
};

export const test = base.extend<ApiFixtures>({
  api: async ({ request }, use) => {
    await use(new RestfulBooker(request));
  },
  token: async ({ api }, use) => {
    const response = await api.createToken();
    const body = await response.json();
    if (!body.token) throw new Error(`Could not mint a token: ${JSON.stringify(body)}`);
    await use(body.token as string);
  },
});

export { expect } from '@playwright/test';
