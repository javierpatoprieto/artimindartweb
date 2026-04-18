# 🎨 ArtiMindArt - Quick Access Guide

## ✅ Servidores en ejecución

| Componente | URL | Puerto | Descripción |
|-----------|-----|--------|-------------|
| **Frontend** | http://localhost:8000 | 8000 | Sitio web estático (HTML/CSS/JS) |
| **Backend API** | http://localhost:3000 | 3000 | Next.js API & Dashboard |

---

## 🌐 Páginas Principales

### Frontend (Puerto 8000)
- **Home**: http://localhost:8000/index.html
- **Matrices**: http://localhost:8000/matices.html
- **Blog**: http://localhost:8000/blog.html
- **Post**: http://localhost:8000/post.html

### Backend Dashboard (Puerto 3000)
- **Home**: http://localhost:3000/
- **Blog**: http://localhost:3000/blog
- **Services**: http://localhost:3000/services
- **Work**: http://localhost:3000/work

### Admin Panel (Puerto 3000)
- **Admin Login**: http://localhost:3000/admin (si está implementado)
- **Admin Dashboard**: http://localhost:3000/dashboard (si está implementado)

---

## 🔧 Configuración Actual

### Base de datos: Supabase ✓
```
URL: https://wmjihxgwcsdqlgqssbik.supabase.co
Status: Conectado
Tables: projects, leads, subscribers, bookings, partners, media
```

### Variables de Entorno

**Backend** (`.env.local`):
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`

**Pendiente de configurar**:
- ⏳ `RESEND_API_KEY` (para email transaccional)
- ⏳ `STRIPE_SECRET_KEY` (para pagos)
- ⏳ `ADMIN_EMAIL` (usuario permitido para login admin)

---

## 🚀 Próximos Pasos

### 1. **Configurar Resend** (Email)
```bash
# Ve a https://resend.com
# 1. Crea cuenta y verifica email
# 2. Obtén API key desde Settings → API Keys
# 3. Agrega a: artimindart-platform/.env.local
RESEND_API_KEY=your-key-here
RESEND_FROM=ArtiMindArt <hello@artimind.art>
```

### 2. **Configurar Stripe** (Pagos)
```bash
# Ve a https://stripe.com
# 1. Crea cuenta y obtén claves desde Dashboard
# 2. Agrega a: artimindart-platform/.env.local
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_SPARK=price_...
STRIPE_PRICE_SIGNAL=price_...
STRIPE_PRICE_STUDIO=price_...
```

### 3. **Configurar Admin**
```bash
# Edita: artimindart-platform/.env.local
ADMIN_EMAIL=javierpato@gmail.com
```

### 4. **Reiniciar servidores** (después de cambiar .env)
```bash
# Mata los procesos actuales y reinicia:
pkill -f "npm run dev"
pkill -f "node server-frontend"

# Luego:
cd artimindart-platform && npm run dev &
node server-frontend.js &
```

---

## 📁 Estructura del Proyecto

```
C:\Users\javie\Web Artimindart\
├── index.html                    # Landing page principal
├── matices.html                  # Matriz de servicios
├── blog.html                     # Página de blog
├── admin-dashboard.html          # Dashboard admin (frontend)
├── admin-login.html              # Login admin (frontend)
├── styles.css                    # Estilos globales
├── script.js                     # JavaScript frontend
├── api-client.js                 # Cliente API
├── server-frontend.js            # Servidor HTTP frontend
├── supabase-schema.sql           # Schema base de datos
├── SETUP.md                      # Guía de setup
├── BACKEND.md                    # Documentación backend
└── artimindart-platform/         # Backend Next.js
    ├── package.json
    ├── .env.local                # Variables de entorno
    ├── app/                      # Rutas Next.js
    ├── components/               # Componentes React
    ├── public/                   # Archivos estáticos
    └── node_modules/
```

---

## 🔍 Verificación Rápida

```bash
# 1. Verificar frontend
curl http://localhost:8000/index.html

# 2. Verificar backend
curl http://localhost:3000/

# 3. Verificar Supabase conexión
# (Intenta crear una cuenta en el formulario del sitio)

# 4. Ver logs de error
# Frontend: Abre http://localhost:8000 en navegador → F12 → Console
# Backend: Revisa la terminal donde corre "npm run dev"
```

---

## 💡 Puntos Clave

✅ **Funcionando**:
- Supabase database & auth
- Frontend HTML estático
- Backend Next.js
- API routes

⏳ **Requiere Setup**:
- Resend (email)
- Stripe (payments)
- Admin authentication

---

## 🆘 Solución de Problemas

### "Cannot reach localhost:8000"
```bash
# Verifica que el servidor esté corriendo
netstat -an | grep 8000

# Si no está, reinicia:
cd C:\Users\javie\Web\ Artimindart
node server-frontend.js &
```

### "Cannot reach localhost:3000"
```bash
# Verifica que Next.js esté corriendo
netstat -an | grep 3000

# Si no está, reinicia:
cd C:\Users\javie\Web\ Artimindart\artimindart-platform
npm run dev &
```

### Cambios en .env no se reflejan
```bash
# Mata y reinicia ambos servidores (ver sección 4 arriba)
```

---

## 📞 Recursos

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Resend Docs**: https://resend.com/docs
- **Stripe Docs**: https://stripe.com/docs

---

Última actualización: 2026-04-18
