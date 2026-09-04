do $$ begin create type public.driver_subscription_status as enum ('inactive', 'trial', 'active', 'past_due', 'cancelled', 'suspended'); exception when duplicate_object then null; end $$;
do $$ begin create type public.driver_subscription_tier as enum ('go_access', 'go_priority', 'go_premium'); exception when duplicate_object then null; end $$;
do $$ begin create type public.direct_payment_method as enum ('cash', 'bank_transfer', 'driver_account'); exception when duplicate_object then null; end $$;
do $$ begin create type public.direct_payment_status as enum ('pending', 'rider_marked_paid', 'driver_marked_received', 'confirmed', 'disputed', 'escalated'); exception when duplicate_object then null; end $$;
do $$ begin create type public.incident_visibility as enum ('private', 'police_reported', 'hall_of_shame_review', 'published'); exception when duplicate_object then null; end $$;

alter type public.payment_method add value if not exists 'driver_account';

alter table public.drivers
  add column if not exists subscription_status public.driver_subscription_status not null default 'inactive',
  add column if not exists subscription_tier public.driver_subscription_tier,
  add column if not exists subscription_expires_at timestamptz,
  add column if not exists paystack_customer_code text,
  add column if not exists paystack_subscription_code text,
  add column if not exists payout_bank_name text,
  add column if not exists payout_account_number text,
  add column if not exists payout_account_name text,
  add column if not exists bvn text,
  add column if not exists rider_repeat_block_enabled boolean not null default true,
  add column if not exists off_platform_warning_count integer not null default 0;

alter table public.trips
  add column if not exists controlled_fare numeric,
  add column if not exists fare_provider text,
  add column if not exists traffic_duration_seconds integer,
  add column if not exists distance_meters integer,
  add column if not exists driver_payment_method public.direct_payment_method,
  add column if not exists driver_payment_status public.direct_payment_status not null default 'pending',
  add column if not exists rider_marked_paid_at timestamptz,
  add column if not exists driver_marked_received_at timestamptz,
  add column if not exists payment_confirmed_at timestamptz,
  add column if not exists payment_disputed_at timestamptz,
  add column if not exists driver_keeps_full_fare boolean not null default true,
  add column if not exists repeat_driver_blocked boolean not null default true;

create table if not exists public.driver_subscription_plans (
  id public.driver_subscription_tier primary key,
  name text not null,
  monthly_price_naira integer not null check (monthly_price_naira > 0),
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

insert into public.driver_subscription_plans (id, name, monthly_price_naira, description)
values
  ('go_access', 'Go Access', 30000, 'Core Tranzitta Go marketplace access for verified drivers.'),
  ('go_priority', 'Go Priority', 40000, 'Higher visibility for compliant drivers with stronger acceptance and safety record.'),
  ('go_premium', 'Go Premium', 50000, 'Premium Lagos demand access for top-rated verified drivers.')
on conflict (id) do update set
  name = excluded.name,
  monthly_price_naira = excluded.monthly_price_naira,
  description = excluded.description,
  is_active = true;

create table if not exists public.driver_subscriptions (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid not null references public.drivers(id) on delete cascade,
  tier public.driver_subscription_tier not null,
  status public.driver_subscription_status not null default 'inactive',
  paystack_customer_code text,
  paystack_subscription_code text,
  paystack_authorization_code text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  last_payment_at timestamptz,
  next_payment_at timestamptz,
  amount_naira integer not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists driver_subscriptions_driver_status_idx
  on public.driver_subscriptions(driver_id, status, current_period_end desc);

create table if not exists public.trip_payment_confirmations (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  rider_id uuid references public.users(id) on delete set null,
  driver_id uuid references public.drivers(id) on delete set null,
  method public.direct_payment_method not null,
  amount_naira numeric not null check (amount_naira >= 0),
  rider_confirmed boolean not null default false,
  driver_confirmed boolean not null default false,
  rider_confirmed_at timestamptz,
  driver_confirmed_at timestamptz,
  dispute_reason text,
  status public.direct_payment_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists trip_payment_confirmations_trip_idx
  on public.trip_payment_confirmations(trip_id);

create table if not exists public.tranzitta_go_incidents (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid references public.trips(id) on delete set null,
  reported_by uuid references public.users(id) on delete set null,
  accused_user_id uuid references public.users(id) on delete set null,
  category text not null,
  summary text not null,
  evidence jsonb not null default '{}',
  police_reference text,
  visibility public.incident_visibility not null default 'private',
  status text not null default 'open',
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

alter table public.driver_subscription_plans enable row level security;
alter table public.driver_subscriptions enable row level security;
alter table public.trip_payment_confirmations enable row level security;
alter table public.tranzitta_go_incidents enable row level security;

create policy "authenticated read active subscription plans" on public.driver_subscription_plans
  for select to authenticated using (is_active = true);

create policy "drivers read own subscriptions or ops all" on public.driver_subscriptions
  for select to authenticated using (driver_id = (select auth.uid()) or public.is_ops());
create policy "ops manage driver subscriptions" on public.driver_subscriptions
  for all to authenticated using (public.is_ops()) with check (public.is_ops());

create policy "trip parties read payment confirmations" on public.trip_payment_confirmations
  for select to authenticated using (
    rider_id = (select auth.uid())
    or driver_id = (select auth.uid())
    or public.is_ops()
  );
create policy "trip parties update payment confirmations" on public.trip_payment_confirmations
  for update to authenticated using (
    rider_id = (select auth.uid())
    or driver_id = (select auth.uid())
    or public.is_ops()
  )
  with check (
    rider_id = (select auth.uid())
    or driver_id = (select auth.uid())
    or public.is_ops()
  );
create policy "ops manage payment confirmations" on public.trip_payment_confirmations
  for all to authenticated using (public.is_ops()) with check (public.is_ops());

create policy "users read own incidents or ops all" on public.tranzitta_go_incidents
  for select to authenticated using (
    reported_by = (select auth.uid())
    or accused_user_id = (select auth.uid())
    or public.is_ops()
  );
create policy "authenticated create incidents" on public.tranzitta_go_incidents
  for insert to authenticated with check (reported_by = (select auth.uid()) or public.is_ops());
create policy "ops manage incidents" on public.tranzitta_go_incidents
  for all to authenticated using (public.is_ops()) with check (public.is_ops());
