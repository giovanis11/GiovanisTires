# Supabase Setup

Use this checklist to create the backend for the app in the Supabase dashboard.

## 1. Create the project

1. Go to `https://supabase.com/dashboard`.
2. Click `New project`.
3. Pick your organization, project name, database password, and region.
4. Wait until the project status becomes ready.

## 2. Copy your project keys into the app

1. Open `Project Settings` -> `API`.
2. Copy:
   - `Project URL`
   - `anon public` key
3. In the repo root, create `.env` from `.env.example`.
4. Fill in:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_PUBLIC_KEY
VITE_SUPABASE_STORAGE_BUCKET=tire-images
VITE_ADMIN_PASSWORD=2003
```

If you leave the example placeholders in place, the app will stay in demo mode.

## 3. Create the database and storage backend

1. In Supabase, open `SQL Editor`.
2. Run the contents of `schema.sql`.
3. If you want password-only dashboard access without email users, run `password-only-policies.sql`.
4. Optional: run `seed.sql` to preload demo products.

What `schema.sql` creates:

- `public.products` table
- `updated_at` trigger
- public read access for products
- authenticated create/update/delete access for products
- public `tire-images` storage bucket
- storage policies for authenticated uploads

## 4. Choose how admin access works

For your current setup you can use a single password from `VITE_ADMIN_PASSWORD`, for example `2003`.

Important:

- This password is only a frontend gate.
- If you run `password-only-policies.sql`, Supabase writes become anonymous.
- That is acceptable for a temporary private demo, but not secure for a public production site.

## 5. Launch locally

Start the Vite app after the env file is ready:

```bash
npm install
npm run dev
```

If the app still shows demo data, check:

- `.env` exists in the project root
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are real values, not placeholders
- `schema.sql` has already been run successfully
- If you use password-only mode, `password-only-policies.sql` has also been run

## 6. Deploy

For Vercel, add the same env vars in the project settings before redeploying:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SUPABASE_STORAGE_BUCKET`
