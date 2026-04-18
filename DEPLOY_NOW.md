# 🚀 Deploy a Vercel - Guía Rápida (3 minutos)

## ⚡ Lo más rápido: Dashboard Web

1. Ve a https://vercel.com/dashboard
2. Haz clic **"Add New → Project"**
3. Conecta tu GitHub: https://github.com/javierpatoprieto/artimindartweb
4. Vercel detectará automáticamente `artimindart-platform` como app Next.js
5. **Environment Variables** - Copia estos valores:

```
NEXT_PUBLIC_SUPABASE_URL = https://wmjihxgwcsdqlgqssbik.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtamloeGd3Y3NkcWxncXNzYmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MDIwMzMsImV4cCI6MjA5MTA3ODAzM30.yM2qjVNvVRru-ORjs-u5GL73Ch-Vq1QVwEtybnmBphM
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtamloeGd3Y3NkcWxncXNzYmlrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTUwMjAzMywiZXhwIjoyMDkxMDc4MDMzfQ.PHV_OyZtZUjtQV5S-ZWfgeCewc69puSdoe1BbH2CjWI
ADMIN_EMAIL = javierpato@gmail.com
```

6. Haz clic **"Deploy"** ✅
7. Espera ~3 min y listo!

---

## 🔗 Tu URL de Vercel

```
https://artimindartweb.vercel.app
```

---

## 📝 O usa CLI (si prefieres terminal)

```bash
npm install -g vercel
cd "C:\Users\javie\Web Artimindart"
vercel login
vercel --prod
# Luego agrega las env vars cuando te pregunte
```

---

## 📂 Nota: Archivos HTML Estáticos

Los archivos HTML en la raíz (index.html, matices.html, etc.) **no se servirán automáticamente**.

### Soluciones:

#### ✅ Opción A (Fácil): Mover a public/
```bash
cp index.html matices.html blog.html post.html \
   artimindart-platform/public/

git add .
git commit -m "Move HTML to public"
git push origin main
# Vercel automáticamente redepploya
```

#### ✅ Opción B (Mejor): Crear rutas en Next.js
Los archivos estarán disponibles en:
- `/index.html` → `/` (o `/index`)
- `/matices.html` → `/matices`
- `/blog.html` → `/blog`
- `/post.html` → `/post`

(Ya tienes rutas en Next.js para esto)

---

## ✅ Checklist Rápido

- [ ] Push a GitHub completado ✅
- [ ] Ve a https://vercel.com/dashboard
- [ ] Conecta repo `artimindartweb`
- [ ] Agrega 3 variables de Supabase
- [ ] Haz clic "Deploy"
- [ ] Espera 3-5 minutos
- [ ] Accede a https://artimindartweb.vercel.app ✅

---

## 🎉 ¡Eso es todo!

Una vez deployado, cada `git push` a `main` automáticamente redepploya en Vercel.

```bash
# Para hacer cambios:
git add .
git commit -m "Tu cambio"
git push origin main
# Vercel automáticamente compila y publica!
```

---

Ver detalles completos en: **VERCEL_DEPLOYMENT.md**
