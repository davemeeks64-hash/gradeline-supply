alter table public.orders
  add column if not exists quote_status text default 'Not Sent',
  add column if not exists quote_sent_date date,
  add column if not exists invoice_status text default 'Not Created',
  add column if not exists invoice_number text,
  add column if not exists payment_status text default 'Unpaid',
  add column if not exists amount_paid numeric default 0,
  add column if not exists balance_due numeric default 0;

create index if not exists orders_quote_status_idx
  on public.orders (quote_status);

create index if not exists orders_payment_status_idx
  on public.orders (payment_status);
