# ArtiMindArt Backend Setup Guide

**Status:** Complete backend code ready. Follow these steps to activate.

---

## 1️⃣ Supabase Setup (Database + Auth)

### Create Project
1. Go to [supabase.com](https://supabase.com) → New Project
2. **Name:** `artimindartweb` | **Region:** Europe (eu-west-1) | **Password:** save it
3. Wait ~2 min for creation

### Load Database Schema
1. In Supabase, go to **SQL Editor** (left sidebar)
2. Create a new query, paste the entire contents of `supabase-schema.sql` from this repo
3. Run it (▶ button)
4. Verify: In **Tables** you should see: `projects`, `leads`, `subscribers`, `bookings`, `partners`, `media`

### Configure RLS (Row Level Security)
1. Go to **Authentication** → **Policies**
2. For each table (`projects`, `leads`, etc.), verify the policies are enabled:
   - `projects_public_select` ✓
   - `projects_admin_all` ✓
   - (same for other tables)
3. If any are missing, copy the SQL `CREATE POLICY` lines from `supabase-schema.sql` and run them

### Get API Keys
1. Go to **Settings** → **API** (left bottom)
2. Copy:
   - `Project URL` → `SUPABASE_URL`
   - `anon public` key → `SUPABASE_ANON_KEY`
   - `service_role` key (click "Reveal") → `SUPABASE_SERVICE_ROLE_KEY`

### Enable Auth
1. Go to **Authentication** → **Providers**
2. Email: toggle ON
3. Go to **Email Templates** → customize if desired (optional)

---

## 2️⃣ Resend Setup (Transactional Email)

### Create Account
1. Go to [resend.com](https://resend.com) → Sign up
2. Verify email
3. Go to **API Keys** (left sidebar)
4. Copy the `live` key → `RESEND_API_KEY`

### Add Domain (Optional but recommended for production)
1. Go to **Domains**
2. Add your domain (`artimind.art`)
3. Follow DNS setup (add DKIM, SPF records)
4. Once verified, update `RESEND_FROM=ArtiMindArt <hello@artimind.art>`

> **For now:** Resend free tier allows 3,000 emails/month. Plenty to start.

---

## 3️⃣ Stripe Setup (Payments)

### Create Account
1. Go to [stripe.com](https://stripe.com) → Sign up
2. Go to **Products** (left sidebar)
3. Create 3 products:

#### Product 1: Spark Sprint
- **Name:** Spark
- **Description:** 1–2 week sprint for a focused project
- **Price:** €3,000 (set as recurring or one-time, your choice)
- Copy the **Price ID** → `STRIPE_PRICE_SPARK`

#### Product 2: Signal Campaign
- **Name:** Signal
- **Description:** 3–4 week campaign: film + stills + social cuts
- **Price:** €8,000
- Copy Price ID → `STRIPE_PRICE_SIGNAL`

#### Product 3: Studio Retainer
- **Name:** Studio
- **Description:** Monthly retainer: dedicated hours + pipeline work
- **Price:** €6,000
- Copy Price ID → `STRIPE_PRICE_STUDIO`

### Get API Keys
1. Go to **Developers** → **API Keys** (left)
2. Toggle to **Live Mode** (top right)
3. Copy **Secret Key** → `STRIPE_SECRET_KEY`

### Webhook Setup
1. Go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. **Endpoint URL:** `https://your-vercel-domain.vercel.app/api/stripe/webhook`
4. **Events to send:** Select `checkout.session.completed`
5. Copy **Signing secret** → `STRIPE_WEBHOOK_SECRET`

> **Test mode first:** While testing, use Stripe's test card `4242 4242 4242 4242` with any future date.

---

## 4️⃣ Environment Variables

### Create `.env.local` (Vercel)
Copy `.env.example` and fill in all values:

```bash
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Resend
RESEND_API_KEY=re_your_api_key
RESEND_FROM=ArtiMindArt <hello@artimind.art>

# Stripe
STRIPE_SECRET_KEY=sk_live_yourkey
STRIPE_WEBHOOK_SECRET=whsec_yourkey
STRIPE_PRICE_SPARK=price_1Abc...
STRIPE_PRICE_SIGNAL=price_2Def...
STRIPE_PRICE_STUDIO=price_3Ghi...

# Admin
ADMIN_EMAIL=javierpato@gmail.com
```

### Add to Vercel
1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add each variable from `.env.local`
3. **Important:** Make sure they're available in `Production`

---

## 5️⃣ Install Dependencies & Deploy

### Local (Optional, for testing)
```bash
npm install
npm run dev
# Visit http://localhost:3000
```

### Deploy to Vercel
```bash
git add .
git commit -m "feat: add backend API + database"
git push origin main
```

Vercel auto-deploys. Check the Vercel dashboard for build status.

---

## 6️⃣ Test Each Flow

### ✅ Contact Form
1. Go to landing page (`index.html`)
2. Scroll to **Contact** section
3. Fill form → "Send brief"
4. Check: Email received at `hello@artimind.art` (via Resend)
5. Check Supabase: New row in `leads` table

### ✅ Newsletter
1. Scroll to footer
2. Enter email → Submit
3. Check email for confirm link
4. Click link
5. Check Supabase: `subscribers.confirmed = true`

### ✅ Pricing Checkout
1. Scroll to pricing section
2. Click "Book a campaign" / "Book a retainer" button
3. Enter email → redirected to Stripe Checkout
4. Use test card: `4242 4242 4242 4242` | any future date | any CVC
5. Complete payment
6. Check: Email confirmation received
7. Check Supabase: New row in `bookings` with `status = 'paid'`

### ✅ Admin Dashboard
1. Go to `/admin.html`
2. Click theme toggle to test (client-side works)
3. Once auth is wired: Click "Login" → enter `ADMIN_EMAIL`
4. Check email for magic link
5. Click link → redirected to admin dashboard
6. View live leads, projects, kanban board

---

## 7️⃣ Cloudflare R2 (Optional, for media storage)

Skip this if using Supabase Storage. If you want cheaper video storage:

1. Create Cloudflare account → **R2** (left)
2. Create bucket: `artimind-media`
3. Get API token:
   - **R2 API Tokens** → Create token
   - Copy: `Account ID`, `Access Key ID`, `Secret Access Key`
4. Add to `.env`:
   ```
   R2_ACCOUNT_ID=...
   R2_ACCESS_KEY_ID=...
   R2_SECRET_ACCESS_KEY=...
   R2_BUCKET=artimind-media
   R2_CUSTOM_DOMAIN=media.artimind.art (optional)
   ```

---

## 8️⃣ Next Steps (After Backend is Live)

### Immediate
- [ ] Test all flows (steps above)
- [ ] Add real project data to `projects` table
- [ ] Customize Resend email templates
- [ ] Set up Stripe webhooks (production mode)

### Soon
- [ ] Media upload pipeline (ffmpeg or Mux)
- [ ] Admin dashboard auth (Supabase magic link)
- [ ] Newsletter double-opt-in flows
- [ ] Slack notifications on new leads

### Long-term
- [ ] Analytics dashboard (view KPIs from Supabase)
- [ ] Automated invoicing (Stripe → PDF)
- [ ] Calendar sync for kickoff calls

---

## 🚨 Troubleshooting

### **"API not found" errors**
- Check Vercel deployment logs: `vercel logs <project-name>`
- Ensure all `.env` variables are set in Vercel dashboard

### **"Supabase connection error"**
- Verify `SUPABASE_URL` and keys are correct (no typos)
- Check RLS policies are enabled

### **"Stripe webhook not firing"**
- Verify webhook endpoint URL is correct (use public Vercel domain, not localhost)
- Check Stripe dashboard → Webhooks → Event logs for errors
- Use `stripe listen --forward-to localhost:3000/api/stripe/webhook` for local testing

### **"Emails not sending"**
- Check Resend dashboard → **Logs** for error details
- Verify `RESEND_API_KEY` is correct
- Verify `RESEND_FROM` matches verified sender in Resend

### **"Auth not working"**
- Make sure `ADMIN_EMAIL` matches the email you're signing in with
- Check Supabase → **Authentication** → **Users** to see if user exists
- Test magic link in incognito window

---

## 📚 API Endpoints Reference

All endpoints return JSON. Auth endpoints require `Authorization: Bearer <token>` header.

### Public

| Method | Endpoint | Body | Returns |
|--------|----------|------|---------|
| POST | `/api/leads` | `{name, email, company, project_type, budget, message, source}` | `{id, success}` |
| POST | `/api/subscribe` | `{email}` | `{success}` |
| GET | `/api/subscribe/confirm?token=…` | — | Redirect to landing |
| GET | `/api/projects` | — | `[{id, title, slug, …}]` |
| POST | `/api/checkout` | `{plan, email}` | `{url}` (Stripe Checkout) |
| POST | `/api/stripe/webhook` | (Stripe) | `{received}` |

### Admin (Requires Auth)

| Method | Endpoint | Returns |
|--------|----------|---------|
| GET | `/api/admin/projects` | `[{...}]` all projects |
| POST | `/api/admin/projects` | `{id, ...}` new project |
| PATCH | `/api/admin/projects/:id` | `{...}` updated project |
| DELETE | `/api/admin/projects/:id` | `{success}` |
| GET | `/api/admin/leads` | `{data, total, limit, offset}` |
| PATCH | `/api/admin/leads/:id` | `{...}` updated lead |
| POST | `/api/admin/auth` | `{email}` | `{success, message}` |
| GET | `/api/admin/upload-url` | — | `{uploadUrl, publicUrl}` |

---

## ✨ You're done!

Once all services are configured and deployed:
- Landing page accepts leads ✓
- Contact form sends emails ✓
- Pricing buttons trigger Stripe checkout ✓
- Admin dashboard shows live data ✓
- Projects showcase real work ✓

**Next:** Deploy admin.html and wire it to the backend. See `admin-setup.md` for frontend integration.
