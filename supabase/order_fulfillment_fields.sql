alter table public.orders
  add column if not exists fulfillment_method text default 'Pickup',
  add column if not exists pickup_date date,
  add column if not exists delivery_date date,
  add column if not exists shipping_carrier text,
  add column if not exists tracking_number text,
  add column if not exists delivery_notes text;

create index if not exists orders_fulfillment_method_idx
  on public.orders (fulfillment_method);

create index if not exists orders_tracking_number_idx
  on public.orders (tracking_number);
