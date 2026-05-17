alter table public.orders
  add column if not exists design_status text default 'Not Started',
  add column if not exists proof_sent_date date,
  add column if not exists approval_date date,
  add column if not exists design_notes text;

create index if not exists orders_design_status_idx
  on public.orders (design_status);
