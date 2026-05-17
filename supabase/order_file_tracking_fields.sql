alter table public.orders
  add column if not exists proof_file_url text,
  add column if not exists customer_artwork_url text,
  add column if not exists final_design_file_url text,
  add column if not exists lightburn_file_url text;
