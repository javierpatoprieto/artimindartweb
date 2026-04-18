# 🚀 Setup Vercel - Pasos Automáticos

## ✅ Lo que ya he hecho:

- ✅ Instalé Vercel CLI
- ✅ Configuré `vercel.json` 
- ✅ Agregué admin email a `.env.local`
- ✅ Todas las variables preparadas
- ✅ Código pusheado a GitHub

---

## 🔧 Ahora necesito que hagas esto (requiere tu autenticación):

### Paso 1: Autenticarse en Vercel

```bash
cd "C:\Users\javie\Web Artimindart"
vercel login
```

**Qué hace:**
- Te abre navegador
- Elige tu método de login (GitHub recomendado)
- Confirma la conexión

### Paso 2: Deploy automático

```bash
vercel --prod
```

**Vercel automáticamente:**
1. Detecta tu repo en GitHub
2. Lee `vercel.json`
3. Compila Next.js desde `artimindart-platform/`
4. Despliega a producción

### Paso 3: Agregar variables de entorno

Cuando Vercel te pregunte:

```
? Set up and deploy "~/Web Artimindart"? [Y/n] y
? Which scope should we deploy to? (selecciona tu cuenta)
? Linked to [tu-account]/artimindartweb (created .vercel)
? Environments to configure for deployment?

→ Production
```

Luego ve a: https://vercel.com/dashboard

1. Click en **"artimindartweb"**
2. **Settings → Environment Variables**
3. Agrega estos 4 valores:

```
NEXT_PUBLIC_SUPABASE_URL = https://wmjihxgwcsdqlgqssbik.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtamloeGd3Y3NkcWxncXNzYmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MDIwMzMsImV4cCI6MjA5MTA3ODAzM30.yM2qjVNvVRru-ORjs-u5GL73Ch-Vq1QVwEtybnmBphM

SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtamloeGd3Y3NkcWxncXNzYmlrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTUwMjAzMywiZXhwIjoyMDkxMDc4MDMzfQ.PHV_OyZtZUjtQV5S-ZWfgeCewc69puSdoe1BbH2CjWI

ADMIN_EMAIL = javierpatoprieto@gmail.com
```

### Paso 4: Redeploy

En Vercel Dashboard:
1. **Deployments** (arriba)
2. Click en el último deployment
3. **Redeploy**

---

## 📋 Resumen de Comandos

```bash
# 1. Autenticar (abre navegador)
vercel login

# 2. Deploy a producción
vercel --prod

# 3. Ver estado
vercel status

# 4. Ver logs en vivo
vercel logs
```

---

## 🎯 Resultado Final

Después de completar estos pasos:

```
🌐 Frontend: https://artimindartweb.vercel.app
🌐 Blog:     https://artimindartweb.vercel.app/blog
🌐 Services: https://artimindartweb.vercel.app/services
🌐 Work:     https://artimindartweb.vercel.app/work
```

---

## 🔄 Después (Automático)

Una vez en Vercel, cada `git push` automáticamente:
- Detecta cambios
- Compila
- Deploya

```bash
# Por ejemplo:
git add .
git commit -m "Cambios"
git push origin main
# ✅ Vercel automáticamente publica!
```

---

## ⚡ Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Tu Proyecto**: https://vercel.com/dashboard/artimindartweb
- **GitHub Repo**: https://github.com/javierpatoprieto/artimindartweb

---

## 🆘 Si algo falla

### "Connection refused"
```bash
# Verifica internet y GitHub login
vercel login --cancel  # cancela login anterior
vercel login           # intenta de nuevo
```

### "Build error"
```bash
# Ver logs en Vercel Dashboard → Deployments
# O localmente:
vercel logs
```

### "Environment variables not found"
```
1. Agrégalas en Settings → Environment Variables
2. Redeploy desde Dashboard
```

---

## 📄 Archivos a consultar

- `ENV_VARS_VERCEL.txt` - Valores listos para copiar/pegar
- `VERCEL_DEPLOYMENT.md` - Guía detallada
- `.vercelignore` - Archivos ignorados
- `vercel.json` - Configuración

---

**Necesitas autenticarte tú en Vercel, pero el resto está automatizado.** 

¿Ejecutas `vercel login` desde la terminal?
