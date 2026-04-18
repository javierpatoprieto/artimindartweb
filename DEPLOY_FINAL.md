# 🚀 DEPLOYMENT A VERCEL - LISTO PARA LANZAR

## ✅ Estado Actual

```
✅ Código en GitHub: https://github.com/javierpatoprieto/artimindartweb
✅ Vercel CLI instalado
✅ vercel.json configurado
✅ Variables de entorno preparadas
✅ Admin email: javierpatoprieto@gmail.com
✅ Supabase conectado
```

---

## 🎯 OPCIÓN 1: Dashboard Web (Lo Más Fácil - 2 minutos)

### Paso 1: Ve a Vercel
https://vercel.com/dashboard

### Paso 2: Conecta GitHub
- Click **"Add New" → "Project"**
- Click **"Continue with GitHub"**
- Autoriza a Vercel acceder a tu GitHub
- Busca **"artimindartweb"** en la lista
- Click en el repo

### Paso 3: Importar Proyecto
- Vercel detectará automáticamente `artimindart-platform` como app Next.js
- **No cambies nada en configuración**, click **"Deploy"**
- Espera 3-5 minutos...

### Paso 4: Agregar Variables de Entorno
Una vez deployado (o durante):
1. En Vercel → Tu proyecto
2. **Settings → Environment Variables**
3. Agrega 4 variables (copiar exactamente):

**Variable 1:**
```
Nombre: NEXT_PUBLIC_SUPABASE_URL
Valor: https://wmjihxgwcsdqlgqssbik.supabase.co
```

**Variable 2:**
```
Nombre: NEXT_PUBLIC_SUPABASE_ANON_KEY
Valor: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtamloeGd3Y3NkcWxncXNzYmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MDIwMzMsImV4cCI6MjA5MTA3ODAzM30.yM2qjVNvVRru-ORjs-u5GL73Ch-Vq1QVwEtybnmBphM
```

**Variable 3:**
```
Nombre: SUPABASE_SERVICE_ROLE_KEY
Valor: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtamloeGd3Y3NkcWxncXNzYmlrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTUwMjAzMywiZXhwIjoyMDkxMDc4MDMzfQ.PHV_OyZtZUjtQV5S-ZWfgeCewc69puSdoe1BbH2CjWI
```

**Variable 4:**
```
Nombre: ADMIN_EMAIL
Valor: javierpatoprieto@gmail.com
```

### Paso 5: Redeploy
- En **Deployments** (arriba)
- Click en el deployment
- Click **"Redeploy"**
- Espera que termine ✅

### ✨ ¡LISTO!
Tu web está en: **https://artimindartweb.vercel.app**

---

## 🎯 OPCIÓN 2: Terminal CLI (Más automatizado)

```bash
cd "C:\Users\javie\Web Artimindart"

# 1. Loguéate (abre navegador, autoriza GitHub)
vercel login

# 2. Deploy a producción
vercel --prod

# 3. (Sigue las preguntas - selecciona opciones por defecto)
```

Luego agrega las 4 variables en Vercel Dashboard (Paso 4 arriba).

---

## 🔄 Despliegues Automáticos (Después)

Una vez que Vercel esté configurado, cada cambio se deploya automáticamente:

```bash
# Simplemente:
git add .
git commit -m "Tu cambio"
git push origin main

# ✅ Vercel automáticamente compila y publica!
```

---

## 📋 Checklist Final

```
☐ Ir a https://vercel.com/dashboard
☐ Conectar repo artimindartweb desde GitHub
☐ Dejar que Vercel haga el deploy inicial (5 min)
☐ Agregar 4 variables de entorno exactamente
☐ Hacer Redeploy
☐ Visitar https://artimindartweb.vercel.app ✅
☐ ¡Celebration! 🎉
```

---

## 🔗 URLs en Producción

Después del deployment:

```
🌐 Principal:  https://artimindartweb.vercel.app
📄 Blog:       https://artimindartweb.vercel.app/blog
🎨 Services:   https://artimindartweb.vercel.app/services
🖼️  Work:      https://artimindartweb.vercel.app/work
```

---

## 📞 Si necesitas ayuda

| Problema | Solución |
|----------|----------|
| Build fails | Ver logs en Vercel Dashboard → Deployments |
| Variables no funcionan | Redeploy después de agregar variables |
| Página no carga | Espera 5 min, recarga, limpiar cache |
| Custom domain | Settings → Domains → agregar dominio |

---

## 📚 Documentación

- `ENV_VARS_VERCEL.txt` - Valores listos para copiar
- `VERCEL_SETUP_AUTOMATED.md` - Instrucciones detalladas
- `VERCEL_DEPLOYMENT.md` - Guía completa

---

## 🎯 Resumen

He preparado **todo automáticamente**. Solo necesitas:

1. **Ir a** https://vercel.com/dashboard
2. **Conectar** tu repo de GitHub
3. **Agregar** 4 variables de entorno (copiar/pegar)
4. **Hacer redeploy**
5. **¡Listo!** Tu web estará live en minutos

**No hay código que cambiar. Solo configuración.**

---

**¿Listo? ¡Vamos!** 🚀
