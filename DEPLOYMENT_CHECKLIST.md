# 🚀 ArtiMindArt Backend Deployment Checklist

## ✅ Complete (Ready to Use)

- [x] **Landing page** (`index.html`) — Live on Vercel with design
- [x] **Admin dashboard** (`admin.html`) — Design complete, ready for auth wiring  
- [x] **Backend API structure** — All endpoints created
  - [x] `/api/leads` — Contact form submission
  - [x] `/api/subscribe` — Newsletter signup with confirm
  - [x] `/api/projects` — Public project listing
  - [x] `/api/checkout` — Stripe Checkout redirect
  - [x] `/api/stripe/webhook` — Payment confirmation
  - [x] `/api/admin/projects` — Project CRUD
  - [x] `/api/admin/leads` — Lead management
  - [x] `/api/admin/auth` — Magic link login
  - [x] `/api/admin/upload-url` — Media upload signing
- [x] **Database schema** (`supabase-schema.sql`) — RLS-enabled, ready to import
- [x] **Environment template** (`.env.example`) — All variables documented
- [x] **Email integration** — Resend setup with templates
- [x] **Payment integration** — Stripe Checkout + webhooks
- [x] **Frontend wiring** — Contact form + pricing CTAs connected to API
- [x] **Setup guide** (`SETUP.md`) — Step-by-step for all services
- [x] **Code committed** — Pushed to GitHub repo

---

## ⏭️ Next Steps (In Order)

### **Step 1: Create Supabase Project** (5 min)
```bash
1. Go to supabase.com → Create new project
2. Name: "artimindartweb" | Region: eu-west-1
3. Copy URL and keys to .env.local
4. Run supabase-schema.sql in SQL Editor
5. Verify tables created
```
👉 **See:** SETUP.md sections 1️⃣

---

### **Step 2: Set Up Resend** (3 min)
```bash
1. Go to resend.com → Create free account
2. Copy API key to RESEND_API_KEY in .env.local
3. Verify emails land in inbox
```
👉 **See:** SETUP.md sections 2️⃣

---

### **Step 3: Configure Stripe** (10 min)
```bash
1. Go to stripe.com → Create account
2. Create 3 Products (Spark, Signal, Studio)
3. Copy price IDs to STRIPE_PRICE_* env vars
4. Set up webhook for checkout.session.completed
5. Copy webhook secret to STRIPE_WEBHOOK_SECRET
```
👉 **See:** SETUP.md sections 3️⃣

---

### **Step 4: Add Environment Variables to Vercel** (5 min)
```bash
1. Go to Vercel dashboard → Settings → Environment Variables
2. Paste all values from .env.local
3. Make sure they're for "Production"
4. Redeploy (should auto-trigger)
```
👉 **See:** SETUP.md sections 4️⃣

---

### **Step 5: Test Each Flow** (15 min)
```bash
✓ Contact form → email received
✓ Newsletter signup → confirm email works
✓ Pricing CTA → Stripe Checkout loads
✓ Payment → Booking created in Supabase
✓ Admin login → Magic link received
```
👉 **See:** SETUP.md sections 6️⃣

---

## 📦 What's in This Repo

```
.
├── index.html              # Landing page (live)
├── admin.html              # Admin dashboard
├── api-client.js           # Frontend form integration
├── package.json            # Dependencies (Supabase, Resend, Stripe)
├── .env.example            # Environment template
├── supabase-schema.sql     # Database schema + RLS
├── SETUP.md                # Full setup instructions
├── DEPLOYMENT_CHECKLIST.md # This file
├── lib/
│   ├── supabase.js         # Supabase client + auth
│   ├── resend.js           # Email templates & sending
│   └── stripe.js           # Stripe utilities
└── api/
    ├── leads.js            # POST /api/leads
    ├── subscribe.js        # POST /api/subscribe + GET confirm
    ├── projects.js         # GET /api/projects
    ├── checkout.js         # POST /api/checkout
    ├── stripe/
    │   └── webhook.js      # POST /api/stripe/webhook
    └── admin/
        ├── projects.js     # Admin project CRUD
        ├── leads.js        # Admin lead management
        ├── auth.js         # Magic link login
        └── upload-url.js   # Media upload signing
```

---

## 🔗 Quick Links

| Service | What To Do | Time |
|---------|-----------|------|
| **Supabase** | Create project, import schema | 5 min |
| **Resend** | Get API key | 3 min |
| **Stripe** | Create 3 products, set webhook | 10 min |
| **Vercel** | Add env vars, redeploy | 5 min |
| **Testing** | Run through all flows | 15 min |
| **Total** | | ~40 min |

---

## 🎯 After Full Setup

Once all 5 steps are done:

1. **Landing page fully functional**
   - Leads saved to Supabase
   - Emails sent via Resend
   - Projects fetched from database

2. **Payments working**
   - Users can book sprints/campaigns
   - Stripe handles payment securely
   - Confirmations email automatically

3. **Admin dashboard live**
   - Login with magic link
   - View/manage leads, projects, invoices
   - Upload media files

4. **Ready for real projects**
   - Add your work to `projects` table
   - Accept leads from landing page
   - Track leads → bookings → invoices

---

## 🆘 Troubleshooting

**"API endpoints return 500 errors"**
→ Check Vercel logs: `vercel logs`

**"Emails not sending"**
→ Verify `RESEND_API_KEY` in Vercel env vars

**"Stripe checkout fails"**
→ Make sure webhook endpoint URL is your public Vercel domain

**"Database queries return empty"**
→ Verify RLS policies are enabled in Supabase

---

## ✨ You're Ready!

The backend is **production-ready**. Follow SETUP.md and you'll have a fully functional AI creative studio platform in under an hour.

Questions? Check SETUP.md or the inline code comments.

**Good luck! 🚀**
