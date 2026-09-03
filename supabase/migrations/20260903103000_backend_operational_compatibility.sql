create extension if not exists pgcrypto with schema extensions;

alter type public.payment_method add value if not exists 'card_hold';
alter type public.payment_method add value if not exists 'bank_transfer';
alter type public.payment_status add value if not exists 'holding';
alter type public.payment_status add value if not exists 'transfer_pending';
alter type public.event_status add value if not exists 'booked';
alter type public.airport_direction add value if not exists 'arrival';
alter type public.airport_direction add value if not exists 'departure';
alter type public.trip_status add value if not exists 'booked';

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  type text not null,
  title text not null,
  body text,
  data jsonb not null default '{}',
  read_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.notifications
  alter column user_id drop not null,
  alter column body drop not null,
  add column if not exists read_at timestamptz;

alter table public.trips
  alter column rider_id drop not null,
  alter column pickup_location drop not null,
  alter column dropoff_location drop not null;

alter table public.trips
  add column if not exists tier text check (tier in ('go', 'executive')),
  add column if not exists estimated_fare numeric,
  add column if not exists passenger_count integer not null default 1 check (passenger_count between 1 and 12),
  add column if not exists special_requirements text,
  add column if not exists contact_name text,
  add column if not exists contact_phone text,
  add column if not exists rider_verified_driver boolean not null default false,
  add column if not exists driver_verified_rider boolean not null default false;

create table if not exists public.school_enquiries (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.users(id) on delete set null,
  child_name text not null,
  school_name text not null,
  school_address text not null,
  pickup_address text not null,
  morning_ready_time time,
  afternoon_close_time time,
  special_notes text,
  status text not null default 'submitted',
  created_at timestamptz not null default now()
);

create table if not exists public.vehicle_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  vertical public.user_vertical not null default 'school',
  vehicle_type text not null default 'bus',
  seats integer not null default 12,
  created_at timestamptz not null default now()
);

alter table public.school_children
  add column if not exists vehicle_group_id uuid references public.vehicle_groups(id),
  add column if not exists term_fee numeric,
  add column if not exists qr_code_token text not null default encode(gen_random_bytes(18), 'hex');

alter table public.school_trips
  add column if not exists scheduled_date date,
  add column if not exists child_boarded_at timestamptz,
  add column if not exists school_confirmed_at timestamptz,
  add column if not exists school_confirmed_by text;

create table if not exists public.school_child_pickups (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid references public.school_trips(id) on delete cascade,
  child_id uuid references public.school_children(id) on delete cascade,
  driver_id uuid references public.drivers(id) on delete set null,
  status text not null default 'scheduled',
  qr_scanned_at timestamptz,
  child_boarded_at timestamptz,
  school_confirmed_at timestamptz,
  school_confirmed_by text,
  created_at timestamptz not null default now()
);

alter table public.school_child_pickups
  add column if not exists driver_id uuid references public.drivers(id) on delete set null,
  add column if not exists created_at timestamptz not null default now();

alter table public.school_payments
  add column if not exists parent_id uuid references public.users(id) on delete set null,
  add column if not exists term_start date,
  add column if not exists term_end date,
  add column if not exists base_term_fee numeric,
  add column if not exists created_at timestamptz not null default now();

create table if not exists public.school_job_postings (
  id uuid primary key default gen_random_uuid(),
  school_name text not null,
  pickup_zone text not null,
  children_count integer not null default 1,
  term_start date,
  term_end date,
  morning_time time,
  afternoon_time time,
  vehicle_requirement text,
  fuel_covered boolean not null default false,
  weekly_wage numeric,
  status text not null default 'open',
  posted_at timestamptz not null default now()
);

create table if not exists public.school_driver_bids (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.school_job_postings(id) on delete cascade,
  driver_id uuid not null references public.drivers(id) on delete cascade,
  message text,
  status text not null default 'submitted',
  created_at timestamptz not null default now(),
  unique (job_id, driver_id)
);

create table if not exists public.corporate_enquiries (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  rc_number text,
  industry text,
  registered_address text,
  office_address text not null,
  city text not null default 'Lagos',
  contact_name text not null,
  contact_title text,
  contact_email text,
  contact_phone text not null,
  staff_count integer not null default 0,
  shifts text,
  am_shift_start time,
  am_shift_end time,
  pm_shift_start time,
  pm_shift_end time,
  working_days_per_month integer not null default 22,
  notes text,
  status text not null default 'enquiry',
  created_at timestamptz not null default now()
);

alter table public.event_bookings
  alter column client_id drop not null,
  alter column start_time drop not null,
  alter column hours_booked drop not null,
  alter column end_time drop not null,
  alter column guest_count drop not null;

alter table public.event_bookings
  add column if not exists agreed_start_time timestamptz,
  add column if not exists estimated_hours numeric,
  add column if not exists passenger_count integer,
  add column if not exists dropoff_address text,
  add column if not exists contact_name text,
  add column if not exists contact_phone text,
  add column if not exists contact_email text;

alter table public.airport_bookings
  alter column client_id drop not null,
  alter column pickup_address drop not null,
  alter column dropoff_address drop not null,
  alter column dropoff_location drop not null,
  alter column flight_time drop not null;

alter table public.airport_bookings
  add column if not exists airline text,
  add column if not exists scheduled_flight_time timestamptz,
  add column if not exists destination_zone text,
  add column if not exists destination_address text,
  add column if not exists luggage_count integer not null default 1,
  add column if not exists meet_greet_preference boolean,
  add column if not exists passenger_count integer not null default 1,
  add column if not exists contact_name text,
  add column if not exists contact_phone text,
  add column if not exists contact_email text,
  add column if not exists flight_status text not null default 'on_time';

create index if not exists notifications_user_created_idx on public.notifications(user_id, created_at desc);
create index if not exists school_enquiries_status_created_idx on public.school_enquiries(status, created_at desc);
create index if not exists school_job_postings_status_idx on public.school_job_postings(status, posted_at desc);
create index if not exists corporate_enquiries_status_created_idx on public.corporate_enquiries(status, created_at desc);

create or replace function public.is_ops()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.users
    where id = (select auth.uid())
      and role in ('ops', 'superadmin')
      and is_active = true
  )
$$;

alter table public.notifications enable row level security;
alter table public.school_enquiries enable row level security;
alter table public.vehicle_groups enable row level security;
alter table public.school_child_pickups enable row level security;
alter table public.school_job_postings enable row level security;
alter table public.school_driver_bids enable row level security;
alter table public.corporate_enquiries enable row level security;

create policy "users read own notifications or ops all" on public.notifications
  for select to authenticated using (user_id = (select auth.uid()) or public.is_ops());
create policy "ops manage notifications" on public.notifications
  for all to authenticated using (public.is_ops()) with check (public.is_ops());

create policy "ops manage school enquiries" on public.school_enquiries
  for all to authenticated using (public.is_ops()) with check (public.is_ops());
create policy "parents read own school enquiries" on public.school_enquiries
  for select to authenticated using (parent_id = (select auth.uid()) or public.is_ops());

create policy "authenticated read vehicle groups" on public.vehicle_groups
  for select to authenticated using (true);
create policy "ops manage vehicle groups" on public.vehicle_groups
  for all to authenticated using (public.is_ops()) with check (public.is_ops());

create policy "parents drivers ops read child pickups" on public.school_child_pickups
  for select to authenticated using (
    public.is_ops()
    or driver_id = (select auth.uid())
    or exists (
      select 1 from public.school_children c
      where c.id = child_id and c.parent_id = (select auth.uid())
    )
  );
create policy "drivers ops update child pickups" on public.school_child_pickups
  for update to authenticated using (public.is_ops() or driver_id = (select auth.uid()))
  with check (public.is_ops() or driver_id = (select auth.uid()));

create policy "authenticated read open school jobs" on public.school_job_postings
  for select to authenticated using (status = 'open' or public.is_ops());
create policy "ops manage school jobs" on public.school_job_postings
  for all to authenticated using (public.is_ops()) with check (public.is_ops());

create policy "drivers read own bids or ops all" on public.school_driver_bids
  for select to authenticated using (driver_id = (select auth.uid()) or public.is_ops());
create policy "drivers create own bids" on public.school_driver_bids
  for insert to authenticated with check (driver_id = (select auth.uid()));
create policy "ops manage school bids" on public.school_driver_bids
  for all to authenticated using (public.is_ops()) with check (public.is_ops());

create policy "ops manage corporate enquiries" on public.corporate_enquiries
  for all to authenticated using (public.is_ops()) with check (public.is_ops());
