create extension if not exists postgis with schema extensions;
create extension if not exists pgcrypto with schema extensions;

do $$ begin create type public.user_role as enum ('rider', 'driver', 'parent', 'corporate_admin', 'events_client', 'ops', 'superadmin'); exception when duplicate_object then null; end $$;
do $$ begin create type public.vertical_type as enum ('go', 'school', 'corporate', 'events', 'airport', 'all'); exception when duplicate_object then null; end $$;
do $$ begin create type public.driver_status as enum ('pending', 'approved', 'suspended', 'offline', 'online', 'on_trip'); exception when duplicate_object then null; end $$;
do $$ begin create type public.trip_status as enum ('requested', 'matched', 'driver_en_route', 'in_progress', 'completed', 'cancelled'); exception when duplicate_object then null; end $$;
do $$ begin create type public.payment_method as enum ('paystack', 'flutterwave', 'cash'); exception when duplicate_object then null; end $$;
do $$ begin create type public.payment_status as enum ('pending', 'paid', 'failed', 'refunded'); exception when duplicate_object then null; end $$;
do $$ begin create type public.enquiry_status as enum ('enquiry', 'quoted', 'active', 'paused', 'ended', 'suspended'); exception when duplicate_object then null; end $$;
do $$ begin create type public.school_trip_direction as enum ('to_school', 'from_school'); exception when duplicate_object then null; end $$;
do $$ begin create type public.school_trip_status as enum ('scheduled', 'driver_en_route', 'waiting', 'in_progress', 'completed', 'missed'); exception when duplicate_object then null; end $$;
do $$ begin create type public.shift_type as enum ('am', 'pm', 'both'); exception when duplicate_object then null; end $$;
do $$ begin create type public.event_status as enum ('enquiry', 'quoted', 'confirmed', 'in_progress', 'completed', 'cancelled'); exception when duplicate_object then null; end $$;
do $$ begin create type public.airport_direction as enum ('arrivals', 'departures'); exception when duplicate_object then null; end $$;
do $$ begin create type public.airport_terminal as enum ('domestic', 'international'); exception when duplicate_object then null; end $$;
do $$ begin create type public.panic_status as enum ('active', 'acknowledged', 'resolved'); exception when duplicate_object then null; end $$;
do $$ begin create type public.compliance_status as enum ('pending', 'success', 'failed'); exception when duplicate_object then null; end $$;

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text unique not null,
  email text,
  role public.user_role not null default 'rider',
  vertical public.vertical_type not null default 'go',
  avatar_url text,
  phone_verified boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.trusted_contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  phone text not null,
  can_track boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  plate_number text unique not null,
  make text not null,
  model text not null,
  year integer not null check (year between 1990 and extract(year from now())::integer + 1),
  colour text not null,
  vehicle_class text not null default 'sedan',
  seats integer not null default 4,
  insurance_url text,
  roadworthiness_url text,
  camera_installed boolean not null default false,
  camera_serial text,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.drivers (
  id uuid primary key references public.users(id) on delete cascade,
  license_number text not null,
  police_report_url text,
  home_address text not null,
  home_address_verified boolean not null default false,
  nin text not null,
  vehicle_id uuid references public.vehicles(id),
  verticals public.vertical_type[] not null default array['go']::public.vertical_type[],
  status public.driver_status not null default 'pending',
  commission_rate numeric(5,4) not null default 0.15,
  rating numeric(3,2) not null default 5.00,
  total_trips integer not null default 0,
  camera_device_id text,
  location extensions.geometry(Point,4326),
  last_location_at timestamptz,
  approved_at timestamptz,
  approved_by uuid references public.users(id),
  created_at timestamptz not null default now()
);

alter table public.vehicles
  add column if not exists driver_id uuid references public.drivers(id);

create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  rider_id uuid not null references public.users(id),
  driver_id uuid references public.drivers(id),
  pickup_location extensions.geometry(Point,4326) not null,
  pickup_address text not null,
  dropoff_location extensions.geometry(Point,4326) not null,
  dropoff_address text not null,
  status public.trip_status not null default 'requested',
  requested_at timestamptz not null default now(),
  pickup_at timestamptz,
  dropoff_at timestamptz,
  distance_km numeric,
  base_fare numeric,
  surge_multiplier numeric not null default 1.0,
  total_fare numeric,
  payment_method public.payment_method not null default 'paystack',
  payment_status public.payment_status not null default 'pending',
  rider_rating integer check (rider_rating between 1 and 5),
  driver_rating integer check (driver_rating between 1 and 5),
  panic_triggered boolean not null default false,
  city text not null default 'lagos'
);

create table if not exists public.surge_zones (
  id uuid primary key default gen_random_uuid(),
  city text not null,
  zone extensions.geometry(Polygon,4326) not null,
  multiplier numeric not null check (multiplier >= 1),
  active_from timestamptz not null,
  active_until timestamptz not null,
  reason text not null,
  created_by uuid references public.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.school_clients (
  id uuid primary key references public.users(id) on delete cascade,
  home_address text not null,
  home_location extensions.geometry(Point,4326)
);

create table if not exists public.school_children (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.school_clients(id) on delete cascade,
  full_name text not null,
  school_name text not null,
  school_location extensions.geometry(Point,4326),
  school_address text not null,
  pickup_address text not null,
  pickup_location extensions.geometry(Point,4326),
  ready_time_am time not null,
  return_time_pm time not null,
  assigned_driver_id uuid references public.drivers(id),
  term_start date,
  term_end date,
  monthly_fee numeric,
  status public.enquiry_status not null default 'enquiry',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.school_trips (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.school_children(id) on delete cascade,
  driver_id uuid references public.drivers(id),
  direction public.school_trip_direction not null,
  scheduled_pickup timestamptz not null,
  driver_arrived_at timestamptz,
  child_boarded_at timestamptz,
  completed_at timestamptz,
  wait_minutes integer not null default 0,
  excess_charge numeric not null default 0,
  surge_multiplier numeric not null default 1.0,
  status public.school_trip_status not null default 'scheduled',
  panic_triggered boolean not null default false
);

create table if not exists public.school_payments (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.school_children(id) on delete cascade,
  month date not null,
  amount numeric not null,
  excess_charges numeric not null default 0,
  payment_provider public.payment_method not null default 'paystack',
  payment_status public.payment_status not null default 'pending',
  paid_at timestamptz,
  invoice_url text,
  unique (child_id, month)
);

create table if not exists public.corporate_clients (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  rc_number text,
  industry text,
  address text not null,
  location extensions.geometry(Point,4326),
  city text not null default 'lagos',
  staff_count integer not null default 0,
  contact_name text not null,
  contact_email text,
  contact_phone text not null,
  admin_user_id uuid references public.users(id),
  hourly_rate_am numeric,
  hourly_rate_pm numeric,
  excess_rate numeric,
  surge_applicable boolean not null default true,
  status public.enquiry_status not null default 'enquiry',
  contract_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.corporate_staff (
  id uuid primary key default gen_random_uuid(),
  corporate_id uuid not null references public.corporate_clients(id) on delete cascade,
  user_id uuid references public.users(id),
  staff_name text not null,
  home_address text not null,
  home_location extensions.geometry(Point,4326),
  pickup_zone text,
  shift public.shift_type not null default 'both',
  is_active boolean not null default true
);

create table if not exists public.corporate_bookings (
  id uuid primary key default gen_random_uuid(),
  corporate_id uuid not null references public.corporate_clients(id),
  driver_id uuid references public.drivers(id),
  shift public.shift_type not null,
  scheduled_start timestamptz not null,
  scheduled_end timestamptz not null,
  actual_start timestamptz,
  actual_end timestamptz,
  hours_booked numeric,
  hours_used numeric,
  excess_hours numeric,
  base_charge numeric,
  excess_charge numeric,
  surge_multiplier numeric not null default 1.0,
  total_charge numeric,
  status public.trip_status not null default 'requested',
  panic_triggered boolean not null default false,
  staff_ids uuid[] not null default '{}'
);

create table if not exists public.event_bookings (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.users(id),
  event_name text not null,
  event_type text not null,
  event_date date not null,
  start_time time not null,
  end_time time not null,
  hours_booked numeric,
  pickup_address text not null,
  pickup_location extensions.geometry(Point,4326),
  dropoff_addresses jsonb not null default '[]',
  guest_count integer not null,
  vehicles_required integer not null default 1,
  vehicle_type text not null default 'mixed',
  special_requirements text,
  quoted_rate_per_hour numeric,
  total_quote numeric,
  deposit_amount numeric,
  deposit_paid boolean not null default false,
  actual_hours numeric,
  excess_hours numeric,
  excess_charge numeric,
  final_amount numeric,
  surge_applicable boolean not null default true,
  status public.event_status not null default 'enquiry',
  assigned_drivers uuid[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.airport_bookings (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.users(id),
  driver_id uuid references public.drivers(id),
  direction public.airport_direction not null,
  terminal public.airport_terminal not null,
  flight_number text,
  pickup_address text not null,
  pickup_location extensions.geometry(Point,4326),
  dropoff_address text not null,
  dropoff_location extensions.geometry(Point,4326),
  scheduled_at timestamptz not null,
  meet_greet boolean not null default false,
  vehicle_type text not null default 'comfort',
  fixed_fare numeric,
  payment_provider public.payment_method not null default 'paystack',
  payment_status public.payment_status not null default 'pending',
  status public.trip_status not null default 'requested',
  panic_triggered boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.panic_alerts (
  id uuid primary key default gen_random_uuid(),
  triggered_by uuid not null references public.users(id),
  trip_id uuid,
  vertical public.vertical_type not null,
  location extensions.geometry(Point,4326) not null,
  address_at_trigger text,
  triggered_at timestamptz not null default now(),
  ops_acknowledged_at timestamptz,
  ops_agent_id uuid references public.users(id),
  police_notified boolean not null default false,
  police_notified_at timestamptz,
  resolved_at timestamptz,
  resolution_notes text,
  status public.panic_status not null default 'active'
);

create table if not exists public.location_snapshots (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid not null references public.drivers(id),
  trip_id uuid,
  vertical public.vertical_type not null default 'go',
  location extensions.geometry(Point,4326) not null,
  speed_kmh numeric,
  heading numeric,
  recorded_at timestamptz not null default now()
);

create table if not exists public.compliance_reports (
  id uuid primary key default gen_random_uuid(),
  report_date date not null unique,
  total_trips integer not null default 0,
  total_drivers_active integer not null default 0,
  trip_data_payload jsonb not null default '{}',
  submitted_at timestamptz,
  submission_status public.compliance_status not null default 'pending',
  response_code text
);

create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id),
  vertical public.vertical_type not null,
  subject text not null,
  priority text not null default 'normal',
  status text not null default 'open',
  assigned_to uuid references public.users(id),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index if not exists drivers_location_gix on public.drivers using gist (location);
create index if not exists trips_pickup_location_gix on public.trips using gist (pickup_location);
create index if not exists trips_dropoff_location_gix on public.trips using gist (dropoff_location);
create index if not exists surge_zones_zone_gix on public.surge_zones using gist (zone);
create index if not exists location_snapshots_location_gix on public.location_snapshots using gist (location);
create index if not exists panic_alerts_location_gix on public.panic_alerts using gist (location);
create index if not exists drivers_status_idx on public.drivers(status);
create index if not exists trips_rider_status_idx on public.trips(rider_id, status);
create index if not exists panic_alerts_status_idx on public.panic_alerts(status, triggered_at desc);

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant usage on all sequences in schema public to authenticated;
alter default privileges in schema public grant select, insert, update, delete on tables to authenticated;
alter default privileges in schema public grant usage on sequences to authenticated;

create or replace function public.current_user_role()
returns public.user_role
language sql
stable
as $$
  select role from public.users where id = (select auth.uid())
$$;

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

create or replace function public.find_nearest_drivers(p_lng double precision, p_lat double precision, p_radius_m integer default 5000)
returns table (
  driver_id uuid,
  full_name text,
  rating numeric,
  vehicle_id uuid,
  distance_m double precision
)
language sql
stable
security invoker
as $$
  with origin as (
    select st_setsrid(st_makepoint(p_lng, p_lat), 4326)::extensions.geography as geog
  )
  select d.id, u.full_name, d.rating, d.vehicle_id,
    st_distance(d.location::extensions.geography, origin.geog) as distance_m
  from public.drivers d
  join public.users u on u.id = d.id
  cross join origin
  where d.status = 'online'
    and d.location is not null
    and st_dwithin(d.location::extensions.geography, origin.geog, p_radius_m)
  order by distance_m asc
  limit 20
$$;

alter table public.users enable row level security;
alter table public.trusted_contacts enable row level security;
alter table public.vehicles enable row level security;
alter table public.drivers enable row level security;
alter table public.trips enable row level security;
alter table public.surge_zones enable row level security;
alter table public.school_clients enable row level security;
alter table public.school_children enable row level security;
alter table public.school_trips enable row level security;
alter table public.school_payments enable row level security;
alter table public.corporate_clients enable row level security;
alter table public.corporate_staff enable row level security;
alter table public.corporate_bookings enable row level security;
alter table public.event_bookings enable row level security;
alter table public.airport_bookings enable row level security;
alter table public.panic_alerts enable row level security;
alter table public.location_snapshots enable row level security;
alter table public.compliance_reports enable row level security;
alter table public.support_tickets enable row level security;

create policy "users can read own profile or ops can read all" on public.users for select to authenticated using ((select auth.uid()) = id or public.is_ops());
create policy "users can update own profile or ops can update all" on public.users for update to authenticated using ((select auth.uid()) = id or public.is_ops()) with check ((select auth.uid()) = id or public.is_ops());
create policy "ops can manage users" on public.users for all to authenticated using (public.is_ops()) with check (public.is_ops());

create policy "trusted contacts owner access" on public.trusted_contacts for all to authenticated using (user_id = (select auth.uid()) or public.is_ops()) with check (user_id = (select auth.uid()) or public.is_ops());
create policy "ops manage vehicles" on public.vehicles for all to authenticated using (public.is_ops()) with check (public.is_ops());
create policy "drivers read assigned vehicle" on public.vehicles for select to authenticated using (driver_id = (select auth.uid()) or public.is_ops());

create policy "drivers read own driver record or ops all" on public.drivers for select to authenticated using (id = (select auth.uid()) or public.is_ops());
create policy "drivers update own live status or ops all" on public.drivers for update to authenticated using (id = (select auth.uid()) or public.is_ops()) with check (id = (select auth.uid()) or public.is_ops());
create policy "ops manage drivers" on public.drivers for all to authenticated using (public.is_ops()) with check (public.is_ops());

create policy "riders and drivers read own trips" on public.trips for select to authenticated using (rider_id = (select auth.uid()) or driver_id = (select auth.uid()) or public.is_ops());
create policy "riders create own trips" on public.trips for insert to authenticated with check (rider_id = (select auth.uid()));
create policy "drivers and ops update assigned trips" on public.trips for update to authenticated using (driver_id = (select auth.uid()) or public.is_ops()) with check (driver_id = (select auth.uid()) or public.is_ops());

create policy "authenticated read active surge zones" on public.surge_zones for select to authenticated using (active_until >= now() or public.is_ops());
create policy "ops manage surge zones" on public.surge_zones for all to authenticated using (public.is_ops()) with check (public.is_ops());

create policy "parents read own school client record" on public.school_clients for select to authenticated using (id = (select auth.uid()) or public.is_ops());
create policy "parents manage own school children" on public.school_children for all to authenticated using (parent_id = (select auth.uid()) or public.is_ops()) with check (parent_id = (select auth.uid()) or public.is_ops());
create policy "parents and drivers read school trips" on public.school_trips for select to authenticated using (public.is_ops() or driver_id = (select auth.uid()) or exists (select 1 from public.school_children c where c.id = child_id and c.parent_id = (select auth.uid())));
create policy "ops manage school trips" on public.school_trips for all to authenticated using (public.is_ops()) with check (public.is_ops());
create policy "parents read school payments" on public.school_payments for select to authenticated using (public.is_ops() or exists (select 1 from public.school_children c where c.id = child_id and c.parent_id = (select auth.uid())));

create policy "corporate admins and ops read clients" on public.corporate_clients for select to authenticated using (admin_user_id = (select auth.uid()) or public.is_ops());
create policy "corporate admins and ops manage staff" on public.corporate_staff for all to authenticated using (public.is_ops() or exists (select 1 from public.corporate_clients c where c.id = corporate_id and c.admin_user_id = (select auth.uid()))) with check (public.is_ops() or exists (select 1 from public.corporate_clients c where c.id = corporate_id and c.admin_user_id = (select auth.uid())));
create policy "corporate admins drivers ops read bookings" on public.corporate_bookings for select to authenticated using (public.is_ops() or driver_id = (select auth.uid()) or exists (select 1 from public.corporate_clients c where c.id = corporate_id and c.admin_user_id = (select auth.uid())));

create policy "events clients and ops read bookings" on public.event_bookings for select to authenticated using (client_id = (select auth.uid()) or public.is_ops());
create policy "events clients create own enquiries" on public.event_bookings for insert to authenticated with check (client_id = (select auth.uid()));
create policy "ops manage event bookings" on public.event_bookings for all to authenticated using (public.is_ops()) with check (public.is_ops());

create policy "airport clients drivers ops read bookings" on public.airport_bookings for select to authenticated using (client_id = (select auth.uid()) or driver_id = (select auth.uid()) or public.is_ops());
create policy "airport clients create own bookings" on public.airport_bookings for insert to authenticated with check (client_id = (select auth.uid()));
create policy "ops manage airport bookings" on public.airport_bookings for all to authenticated using (public.is_ops()) with check (public.is_ops());

create policy "panic involved users and ops can read" on public.panic_alerts for select to authenticated using (triggered_by = (select auth.uid()) or ops_agent_id = (select auth.uid()) or public.is_ops());
create policy "authenticated users can trigger panic" on public.panic_alerts for insert to authenticated with check (triggered_by = (select auth.uid()));
create policy "ops update panic alerts" on public.panic_alerts for update to authenticated using (public.is_ops()) with check (public.is_ops());

create policy "drivers insert own location snapshots" on public.location_snapshots for insert to authenticated with check (driver_id = (select auth.uid()));
create policy "ops read all location snapshots" on public.location_snapshots for select to authenticated using (public.is_ops() or driver_id = (select auth.uid()));

create policy "ops read compliance reports" on public.compliance_reports for select to authenticated using (public.is_ops());
create policy "ops manage compliance reports" on public.compliance_reports for all to authenticated using (public.is_ops()) with check (public.is_ops());

create policy "ticket owner or ops access" on public.support_tickets for all to authenticated using (user_id = (select auth.uid()) or assigned_to = (select auth.uid()) or public.is_ops()) with check (user_id = (select auth.uid()) or public.is_ops());

insert into storage.buckets (id, name, public)
values
  ('driver-documents', 'driver-documents', false),
  ('vehicle-documents', 'vehicle-documents', false),
  ('camera-footage', 'camera-footage', false),
  ('invoices', 'invoices', false)
on conflict (id) do nothing;
