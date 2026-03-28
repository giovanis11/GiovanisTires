-- WARNING:
-- This is a temporary demo-mode policy patch.
-- It allows anonymous writes so the frontend can work with a simple password gate.
-- Anyone with your public site and anon key can bypass the UI password and write directly.

grant insert, update, delete on public.products to anon;

drop policy if exists "Authenticated can insert products" on public.products;
drop policy if exists "Authenticated can update products" on public.products;
drop policy if exists "Authenticated can delete products" on public.products;

drop policy if exists "Anon can insert products" on public.products;
create policy "Anon can insert products"
on public.products
for insert
to anon
with check (true);

drop policy if exists "Anon can update products" on public.products;
create policy "Anon can update products"
on public.products
for update
to anon
using (true)
with check (true);

drop policy if exists "Anon can delete products" on public.products;
create policy "Anon can delete products"
on public.products
for delete
to anon
using (true);

drop policy if exists "Authenticated can upload tire images" on storage.objects;
drop policy if exists "Authenticated can update tire images" on storage.objects;
drop policy if exists "Authenticated can delete tire images" on storage.objects;

drop policy if exists "Anon can upload tire images" on storage.objects;
create policy "Anon can upload tire images"
on storage.objects
for insert
to anon
with check (bucket_id = 'tire-images');

drop policy if exists "Anon can update tire images" on storage.objects;
create policy "Anon can update tire images"
on storage.objects
for update
to anon
using (bucket_id = 'tire-images')
with check (bucket_id = 'tire-images');

drop policy if exists "Anon can delete tire images" on storage.objects;
create policy "Anon can delete tire images"
on storage.objects
for delete
to anon
using (bucket_id = 'tire-images');
