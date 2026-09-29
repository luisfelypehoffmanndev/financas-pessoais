-- Schema do app de finanças pessoais.
-- Idempotente: pode ser executado mais de uma vez.

do $$
begin
  if not exists (select 1 from pg_type where typname = 'transaction_type') then
    create type transaction_type as enum ('income', 'expense');
  end if;
end
$$;

create table if not exists transactions (
  id          uuid primary key default gen_random_uuid(),
  description text not null check (char_length(description) between 1 and 120),
  amount      numeric(12, 2) not null check (amount > 0),
  type        transaction_type not null,
  occurred_on  date not null default current_date,
  is_recurring boolean not null default false,
  created_at   timestamptz not null default now()
);

create index if not exists transactions_chronological_idx
  on transactions (occurred_on desc, created_at desc);

-- Totais calculados no banco em vez de somar no JavaScript.
create or replace view transaction_summary as
select
  coalesce(sum(amount) filter (where type = 'income'), 0)  as total_income,
  coalesce(sum(amount) filter (where type = 'expense'), 0) as total_expense,
  coalesce(sum(case when type = 'income' then amount else -amount end), 0) as balance
from transactions;
