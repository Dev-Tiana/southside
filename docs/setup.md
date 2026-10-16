# Setup guide

## Prerequisites

Use Node 22 or another version supported by the project, pnpm 10.18.0, and the project environment supplied by Manus. The managed project already has the required application dependencies installed.

## Install and run

From the project root run `pnpm install`, then load the managed project environment. Start the server with `pnpm dev`. The default listener is `http://127.0.0.1:3000` in the sandbox. Check `GET /api/health` and `GET /manus-routes.json` before using the preview.

Run `pnpm check` for TypeScript diagnostics, `pnpm test` for unit and platform tests, and `pnpm build` for the production bundle. The current suite includes platform authentication coverage and shared booking date and pricing coverage.

## Database

The server uses `DATABASE_URL` and Drizzle. Apply committed migrations with `pnpm db:migrate`. The current migration is `drizzle/0001_mushy_sentry.sql`. `pnpm db:push` generates a new migration and applies migrations, so use it only after reviewing the generated SQL and understanding that the managed database is shared by development and publication.

Do not seed fake guests, fake reviews, fake availability, or fake prices. The public room leads are intentionally not inserted as live inventory. Use explicit hotel supplied records for operational configuration.

## Optional payment configuration

Payment is disabled unless `PAYSTACK_PUBLIC_KEY`, `PAYSTACK_SECRET_KEY`, `PAYSTACK_WEBHOOK_SECRET`, and `PAYSTACK_CALLBACK_URL` are configured. Keep these values server side. Start with Paystack test credentials and test webhook delivery. Never put the secret key in Vite client variables.

## Staff access

The protected dashboard uses the project authentication flow. Sign in through the dashboard entry and assign staff access through the authorized owner process. Do not add passwords to source code, `.env` files committed to Git, screenshots, or issue comments.
