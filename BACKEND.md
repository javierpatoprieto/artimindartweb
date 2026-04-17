# ArtiMindArt — Backend specification

> Status: **not implemented**. This document is the handoff spec so a developer (or you)
> can wire the landing page + admin dashboard to a real backend.
>
> Stack recommendation: **Supabase + Resend + Stripe + Cloudflare R2** (or Supabase Storage).
> Cheap, fast to ship, scales to millions of requests, and all services have generous free tiers.

---

## 1. Why this stack

| Need                          | Service              | Why |
| ----------------------------- | -------------------- | --- |
| Leads + newsletter + projects | **Supabase** (Postgres + Auth + RLS) | One DB, auth, realtime, row-level security. Free tier covers you for ages. |
| Transactional email (contact form + confirmations) | **Resend** | Dead-simple API. Free 3k emails/mo. |
| Payments (sprint deposits, retainers) | **Stripe** (Checkout + Customer Portal) | Standard. Use Checkout to avoid PCI scope. |
| Media storage (video/images) | **Supabase Storage** or **Cloudflare R2** | R2 is cheaper at scale and zero egress. |
| Admin auth                    | Supabase Auth (magic link, only `javierpato@...`) | One user for now. |
| Deployment                    | **Vercel** or **Cloudflare Pages** | Static landing + `/api` serverless routes. |

Alternative simpler stack if you want to skip Supabase:
**Formspree** (lead form) + **ConvertKit** (newsletter) + **Stripe Payment Links** + a headless CMS like **Sanity** for projects. No code backend, but less control.

---

## 2. Database schema (Postgres / Supabase)

```sql
-- projects (public showreel)
create table projects (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  subtitle      text,
  client        text,
  type          text check (type in ('film','stills','campaign','key_art','case_study','lab')),
  year          int,
  status        text default 'draft' check (status in ('draft','published','archived','scheduled')),
  cover_url     text,                 -- poster image
  video_url     text,                 -- optional mp4/hls
  aspect_ratio  text default '16:10', -- '21:9','9:16', etc
  tags          text[] default '{}',
  body          text,                 -- markdown case study
  palette       text[] default '{}',
  order_index   int default 0,
  published_at  timestamptz,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- leads (contact form submissions)
create table leads (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null,
  company       text,
  project_type  text,
  budget        text,       -- '<5k','5-15k','15-40k','40k+'
  message       text,
  source        text,       -- 'landing','partners_cta','pricing_spark', etc
  status        text default 'new' check (status in ('new','contacted','qualified','won','lost')),
  ip            inet,
  created_at    timestamptz default now()
);

-- newsletter
create table subscribers (
  id            uuid primary key default gen_random_uuid(),
  email         text unique not null,
  confirmed     boolean default false,
  confirm_token text,
  created_at    timestamptz default now(),
  unsubscribed_at timestamptz
);

-- bookings (Stripe-backed sprint deposits)
create table bookings (
  id                 uuid primary key default gen_random_uuid(),
  lead_id            uuid references leads(id),
  plan               text not null, -- 'spark','signal','studio'
  amount_cents       int not null,
  currency           text default 'eur',
  stripe_session_id  text,
  stripe_payment_id  text,
  status             text default 'pending' check (status in ('pending','paid','refunded','failed')),
  created_at         timestamptz default now(),
  paid_at            timestamptz
);

-- partners (logos shown on landing)
create table partners (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  logo_url     text,
  url          text,
  kind         text default 'partner', -- 'partner','client','tool'
  order_index  int default 0,
  active       boolean default true
);
```

Enable **Row Level Security** on every table. Policies:
- `projects`: public SELECT only where `status = 'published'`. Admin: full CRUD.
- `leads`, `subscribers`, `bookings`: public INSERT only. Admin: full CRUD.
- `partners`: public SELECT only where `active = true`. Admin: full CRUD.

---

## 3. API surface

All endpoints are serverless functions (`/api/*`) on Vercel / Cloudflare Pages.

### Public

| Method | Path                    | Purpose                                         |
| ------ | ----------------------- | ----------------------------------------------- |
| `POST` | `/api/leads`            | Receive contact form. Validate → insert into `leads` → email `hello@artimind.art` via Resend → reply 200. |
| `POST` | `/api/subscribe`        | Newsletter signup. Double-opt-in: send confirm token via Resend. |
| `GET`  | `/api/subscribe/confirm?token=…` | Mark `confirmed = true`. |
| `GET`  | `/api/projects`         | Return published projects, ordered by `order_index`. Can be pre-rendered at build time. |
| `GET`  | `/api/projects/:slug`   | Single project case-study page. |
| `POST` | `/api/checkout`         | Create Stripe Checkout session for a plan. Return `url`. |
| `POST` | `/api/stripe/webhook`   | Stripe webhook → mark booking paid, notify Javier. |

### Admin (requires auth)

| Method | Path                          | Purpose                                |
| ------ | ----------------------------- | -------------------------------------- |
| `GET`  | `/api/admin/projects`         | List all (incl. drafts).               |
| `POST` | `/api/admin/projects`         | Create.                                |
| `PATCH`| `/api/admin/projects/:id`     | Update (title, status, order, etc).    |
| `DELETE`| `/api/admin/projects/:id`    | Archive (soft delete).                 |
| `POST` | `/api/admin/upload-url`       | Signed upload URL for direct-to-R2 / Supabase Storage. |
| `GET`  | `/api/admin/leads`            | List + filter.                         |
| `PATCH`| `/api/admin/leads/:id`        | Update status.                         |

---

## 4. Wiring the existing frontend

### `index.html` — contact form

Find the `<form>` inside `#contact` and replace the inline `onsubmit` with:

```js
document.querySelector('#contact form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));
  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, source: 'landing' })
  });
  if (res.ok) form.querySelector('button').textContent = 'Sent ✓';
  else form.querySelector('button').textContent = 'Try again ✗';
});
```

### `index.html` — projects

Currently the project grid is hard-coded. Replace with a fetch on load:

```js
const projects = await fetch('/api/projects').then(r => r.json());
renderProjects(projects); // map each to a <article class="project …"> tile
```

Project tiles should lazy-load a `<video muted loop playsinline>` on hover.

### `admin.html`

Currently all data is static. Swap the KPI numbers, project table rows and leads list for the corresponding fetches. Gate the whole page behind a Supabase Auth check that only lets `javierpato@…` in (magic link login at `/login`).

---

## 5. Resend email templates

- **Lead received → Javier**: subject `🎬 new lead · {{name}} · {{budget}}`, body has all form fields + reply-to = lead email.
- **Lead received → client autoreply**: thank-you, 48h SLA, linked case studies.
- **Newsletter confirm**: one button → `/api/subscribe/confirm?token=…`.
- **Booking paid**: receipt + calendar invite to kickoff call.

---

## 6. Stripe

- One **Product** per plan (`Spark`, `Signal`, `Studio`) with a **Price** that represents the deposit (e.g. 30% of scope).
- The "Book a project" / "Book a campaign" / "Let's talk" buttons on the Pricing section call `POST /api/checkout` with `{ plan: 'spark' }` → redirect to `session.url`.
- On `checkout.session.completed` webhook → insert `bookings` row, mark lead `status = 'won'`, email confirmation.

---

## 7. Environment variables

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=   # server only
SUPABASE_ANON_KEY=           # public, for admin client-side reads

RESEND_API_KEY=
RESEND_FROM="ArtiMindArt <hello@artimind.art>"

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_SPARK=price_…
STRIPE_PRICE_SIGNAL=price_…
STRIPE_PRICE_STUDIO=price_…

R2_ACCOUNT_ID=                # optional if using R2
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=artimind-media
```

---

## 8. Build order (suggested)

1. Spin up Supabase project, run schema, enable RLS.
2. Wire `/api/leads` + `/api/subscribe` + Resend → contact form and footer newsletter work end-to-end.
3. Deploy admin auth (magic link).
4. Replace static projects/leads in `admin.html` with real CRUD.
5. Swap hard-coded projects in `index.html` for `/api/projects`.
6. Add Stripe Checkout to pricing CTAs.
7. Add media upload + transcoding (ffmpeg in a worker or [mux.com](https://mux.com) for HLS).

Estimated dev: ~1 week for steps 1–5 · 2–3 days for Stripe · 2 days for media pipeline.
