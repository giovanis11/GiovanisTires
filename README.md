# Giovanis Tires

React + Vite storefront connected to Supabase for:

- Public product catalog
- Password-protected admin dashboard
- Product CRUD in a `products` table
- Image uploads to Supabase Storage

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and add your project values:

```bash
cp .env.example .env
```

3. Create a Supabase project, then open `Project Settings` -> `API` and paste these into `.env`:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SUPABASE_STORAGE_BUCKET` (optional, defaults to `tire-images`)
- `VITE_ADMIN_PASSWORD`

4. In the Supabase SQL editor, run:

- `supabase/schema.sql`
- `supabase/password-only-policies.sql` if you want password-only admin mode without email users
- `supabase/seed.sql` (optional demo inventory)

5. Start the app:

```bash
npm run dev
```

Full step-by-step setup is in [supabase/SETUP.md](./supabase/SETUP.md).

## Deploy

### Vercel

1. Push this repo to GitHub.
2. Import the repo into Vercel.
3. Add these environment variables in Vercel:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SUPABASE_STORAGE_BUCKET` (optional, defaults to `tire-images`)

4. Redeploy.

The included `vercel.json` already points Vercel at the Vite build output.

## Notes

- If Supabase env vars are missing, the app falls back to demo data so the frontend still renders.
- Placeholder env values from `.env.example` also keep the app in demo mode until real project keys are added.
- `password-only-policies.sql` is convenient for demos, but not secure for a public production launch because writes become anonymous at the database level.
- Anonymous users can read products and public tire images.
