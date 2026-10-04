# UI tests (next pass)

The UI suite targets the restful-booker-platform front end at
`https://automationintesting.online` (booking flow, admin login, rooms, messages).

It is intentionally not implemented yet: the platform renders its forms on the
client, so the selectors have to be captured from a real browser first. To add it:

```bash
npx playwright install chromium     # one-off browser download
npm run test:ui
```

Page objects will live in `src/pages/`, specs in this folder.
