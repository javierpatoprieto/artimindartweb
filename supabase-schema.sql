-- ===== PROJECTS (public showreel) =====
create table if not exists projects (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  subtitle      text,
  client        text,
  type          text check (type in ('film','stills','campaign','key_art','case_study','lab')),
  year          int,
  status        text default 'draft' check (status in ('draft','published','archived','scheduled')),
  cover_url     text,
  video_url     text,
  aspect_ratio  text default '16:10',
  tags          text[] default '{}',
  body          text,
  palette       text[] default '{}',
  order_index   int default 0,
  published_at  timestamptz,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ===== LEADS (contact form submissions) =====
create table if not exists leads (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null,
  company       text,
  project_type  text,
  budget        text,
  message       text,
  source        text default 'landing',
  status        text default 'new' check (status in ('new','contacted','qualified','won','lost')),
  ip            inet,
  created_at    timestamptz default now()
);

-- ===== NEWSLETTER =====
create table if not exists subscribers (
  id            uuid primary key default gen_random_uuid(),
  email         text unique not null,
  confirmed     boolean default false,
  confirm_token text,
  created_at    timestamptz default now(),
  unsubscribed_at timestamptz
);

-- ===== BOOKINGS (Stripe-backed sprint deposits) =====
create table if not exists bookings (
  id                 uuid primary key default gen_random_uuid(),
  lead_id            uuid references leads(id) on delete set null,
  plan               text not null,
  amount_cents       int not null,
  currency           text default 'eur',
  stripe_session_id  text,
  stripe_payment_id  text,
  status             text default 'pending' check (status in ('pending','paid','refunded','failed')),
  created_at         timestamptz default now(),
  paid_at            timestamptz
);

-- ===== PARTNERS (logos on landing) =====
create table if not exists partners (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  logo_url     text,
  url          text,
  kind         text default 'partner',
  order_index  int default 0,
  active       boolean default true,
  created_at   timestamptz default now()
);

-- ===== MEDIA (uploaded files metadata) =====
create table if not exists media (
  id           uuid primary key default gen_random_uuid(),
  filename     text not null,
  file_path    text not null unique,
  mime_type    text,
  size_bytes   int,
  duration_sec int,
  width        int,
  height       int,
  uploaded_by  uuid,
  created_at   timestamptz default now()
);

-- ===== ROW LEVEL SECURITY =====
alter table projects enable row level security;
alter table leads enable row level security;
alter table subscribers enable row level security;
alter table bookings enable row level security;
alter table partners enable row level security;
alter table media enable row level security;

-- Projects: public read published only
create policy "projects_public_select" on projects for select using (status = 'published');
create policy "projects_admin_all" on projects for all using (auth.jwt()->>'email' = current_setting('app.admin_email'));

-- Leads: public insert only, admin all
create policy "leads_public_insert" on leads for insert with check (true);
create policy "leads_admin_select" on leads for select using (auth.jwt()->>'email' = current_setting('app.admin_email'));
create policy "leads_admin_update" on leads for update using (auth.jwt()->>'email' = current_setting('app.admin_email'));

-- Subscribers: public insert, admin all
create policy "subscribers_public_insert" on subscribers for insert with check (true);
create policy "subscribers_public_update" on subscribers for update using (email = auth.user()->>'email' or auth.jwt()->>'email' = current_setting('app.admin_email'));
create policy "subscribers_admin_select" on subscribers for select using (auth.jwt()->>'email' = current_setting('app.admin_email'));

-- Bookings: public insert (own only), admin all
create policy "bookings_public_insert" on bookings for insert with check (true);
create policy "bookings_admin_all" on bookings for all using (auth.jwt()->>'email' = current_setting('app.admin_email'));

-- Partners: public read active only
create policy "partners_public_select" on partners for select using (active = true);
create policy "partners_admin_all" on partners for all using (auth.jwt()->>'email' = current_setting('app.admin_email'));

-- Media: public read, admin all
create policy "media_public_select" on media for select using (true);
create policy "media_admin_all" on media for all using (auth.jwt()->>'email' = current_setting('app.admin_email'));

-- ===== INDEXES =====
create index if not exists idx_projects_slug on projects(slug);
create index if not exists idx_projects_status on projects(status);
create index if not exists idx_projects_published_at on projects(published_at desc);
create index if not exists idx_leads_email on leads(email);
create index if not exists idx_leads_status on leads(status);
create index if not exists idx_leads_created_at on leads(created_at desc);
create index if not exists idx_subscribers_email on subscribers(email);
create index if not exists idx_subscribers_confirmed on subscribers(confirmed);
create index if not exists idx_bookings_lead_id on bookings(lead_id);
create index if not exists idx_bookings_stripe_session on bookings(stripe_session_id);
create index if not exists idx_media_uploaded_by on media(uploaded_by);
