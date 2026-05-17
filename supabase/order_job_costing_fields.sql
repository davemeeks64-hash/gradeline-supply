alter table public.orders
  add column if not exists material_cost numeric default 0,
  add column if not exists labor_cost numeric default 0,
  add column if not exists design_fee numeric default 0,
  add column if not exists shipping_cost numeric default 0,
  add column if not exists tax_amount numeric default 0,
  add column if not exists discount_amount numeric default 0,
  add column if not exists profit_estimate numeric default 0;
