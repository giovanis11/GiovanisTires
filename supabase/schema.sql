create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  brand text not null,
  name text not null,
  width text not null,
  aspect text not null,
  rim text not null,
  type text not null,
  price numeric(10, 2) not null check (price > 0),
  stock integer not null default 0 check (stock >= 0),
  fuel text not null default 'A',
  wet text not null default 'A',
  noise integer not null default 70 check (noise between 50 and 90),
  load integer not null default 91 check (load > 0),
  speed text not null default 'V',
  description text not null default '',
  image_url text not null default '',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint products_unique_variant unique (brand, name, width, aspect, rim, type)
);

create index if not exists products_created_at_idx on public.products (created_at desc);
create index if not exists products_brand_idx on public.products (brand);

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

grant usage on schema public to anon, authenticated;
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;

alter table public.products enable row level security;

drop policy if exists "Public can read products" on public.products;
create policy "Public can read products"
on public.products
for select
to public
using (true);

drop policy if exists "Authenticated can insert products" on public.products;
create policy "Authenticated can insert products"
on public.products
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated can update products" on public.products;
create policy "Authenticated can update products"
on public.products
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated can delete products" on public.products;
create policy "Authenticated can delete products"
on public.products
for delete
to authenticated
using (true);

insert into storage.buckets (id, name, public)
values ('tire-images', 'tire-images', true)
on conflict (id) do update
set public = excluded.public;

drop policy if exists "Public can read tire images" on storage.objects;
create policy "Public can read tire images"
on storage.objects
for select
to public
using (bucket_id = 'tire-images');

drop policy if exists "Authenticated can upload tire images" on storage.objects;
create policy "Authenticated can upload tire images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'tire-images');

drop policy if exists "Authenticated can update tire images" on storage.objects;
create policy "Authenticated can update tire images"
on storage.objects
for update
to authenticated
using (bucket_id = 'tire-images')
with check (bucket_id = 'tire-images');

drop policy if exists "Authenticated can delete tire images" on storage.objects;
create policy "Authenticated can delete tire images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'tire-images');
