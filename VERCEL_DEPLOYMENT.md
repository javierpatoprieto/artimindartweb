# 🚀 Deployment a Vercel - Guía Completa

## Paso 1: Preparar el Repositorio

Tu código ya está en GitHub: https://github.com/javierpatoprieto/artimindartweb

```bash
cd "C:\Users\javie\Web Artimindart"

# Asegúrate que todo esté commiteado
git status

# Push a GitHub
git push origin main
```

---

## Paso 2: Configurar Vercel

### Opción A: Mediante CLI (Recomendado - Más Control)

```bash
# Instala Vercel CLI
npm install -g vercel

# En la carpeta raíz del proyecto
cd "C:\Users\javie\Web Artimindart"

# Loguéate en Vercel
vercel login

# Deploy
vercel --prod
```

### Opción B: Mediante Dashboard Web (Más Fácil)

1. Ve a https://vercel.com/dashboard
2. Haz clic en **"Add New..." → "Project"**
3. Busca y selecciona **"artimindartweb"** en tu GitHub
4. Configura (ver paso 3)
5. Haz clic en **"Deploy"**

---

## Paso 3: Configurar Variables de Entorno en Vercel

Una vez que Vercel detecte el proyecto, necesitas agregar las variables:

### Desde Dashboard Web:
1. Ve a tu proyecto en Vercel
2. Haz clic en **"Settings"** → **"Environment Variables"**
3. Agrega estas variables:

```
NEXT_PUBLIC_SUPABASE_URL = https://wmjihxgwcsdqlgqssbik.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtamloeGd3Y3NkcWxncXNzYmlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MDIwMzMsImV4cCI6MjA5MTA3ODAzM30.yM2qjVNvVRru-ORjs-u5GL73Ch-Vq1QVwEtybnmBphM
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtamloeGd3Y3NkcWxncXNzYmlrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTUwMjAzMywiZXhwIjoyMDkxMDc4MDMzfQ.PHV_OyZtZUjtQV5S-ZWfgeCewc69puSdoe1BbH2CjWI
```

### Opcional (cuando lo tengas):
```
RESEND_API_KEY = (tu API key de Resend)
STRIPE_SECRET_KEY = (tu Stripe secret key)
STRIPE_WEBHOOK_SECRET = (tu Stripe webhook secret)
ADMIN_EMAIL = javierpato@gmail.com
```

---

## Paso 4: Configurar Dominio (Opcional)

### Si tienes dominio personalizado:

1. En Vercel → **Settings → Domains**
2. Haz clic en **"Add Domain"**
3. Ingresa tu dominio (ej: artimindart.com)
4. Sigue las instrucciones DNS
5. Vercel automáticamente genera certificado SSL

### Dominio por defecto:
Vercel te asigna automáticamente: `https://artimindartweb.vercel.app`

---

## Paso 5: Despliegue Automático

Después de configurar Vercel:

✅ **Cada vez que hagas push a GitHub, Vercel automáticamente**:
- Detecta los cambios
- Ejecuta la build
- Despliega a producción

```bash
# Simplemente:
git add .
git commit -m "Tus cambios"
git push origin main

# ¡Vercel hará el resto automáticamente!
```

---

## 📁 Estructura en Vercel

Vercel ejecutará automáticamente:

```
root/
├── vercel.json                    ← Configuración (ya creado)
├── artimindart-platform/
│   ├── package.json
│   ├── .env.local (→ env vars)
│   ├── app/                       ← Rutas Next.js
│   ├── components/
│   ├── public/                    ← Assets estáticos
│   └── ...
└── ...
```

**Nota**: Los archivos HTML en la raíz NO se servirán automáticamente en Vercel. Ver "Paso 6" para soluciones.

---

## Paso 6: Servir Archivos HTML Estáticos (Importante)

### Opción A: Mover HTML al público (Recomendado)

```bash
# Copia los HTML al public folder del Next.js
cp index.html matices.html blog.html post.html \
   artimindart-platform/public/

# Actualiza los links en Next.js si es necesario
git add .
git commit -m "Move static HTML to Next.js public folder"
git push origin main
```

### Opción B: Crear rutas Next.js para servir HTML

En `artimindart-platform/app/`, crea un nuevo archivo:

**app/html/[slug]/page.tsx:**
```typescript
import fs from 'fs';
import path from 'path';

export default async function HTMLPage({ params }: { params: { slug: string } }) {
  const publicPath = path.join(process.cwd(), 'public', `${params.slug}.html`);
  const content = fs.readFileSync(publicPath, 'utf-8');
  
  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  );
}
```

### Opción C: API Route para servir archivos

En `artimindart-platform/app/api/serve-html/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  const file = request.nextUrl.searchParams.get('file');
  
  if (!file) return NextResponse.json({ error: 'File required' }, { status: 400 });
  
  const filePath = path.join(process.cwd(), 'public', `${file}.html`);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  return new NextResponse(content, { headers: { 'Content-Type': 'text/html' } });
}
```

---

## 🔗 URLs en Producción

Después del deployment:

```
Frontend (Next.js):
- https://artimindartweb.vercel.app/
- https://artimindartweb.vercel.app/blog
- https://artimindartweb.vercel.app/services
- https://artimindartweb.vercel.app/work

(Si mueves HTML a public/):
- https://artimindartweb.vercel.app/index.html
- https://artimindartweb.vercel.app/matices.html
- https://artimindartweb.vercel.app/blog.html
```

---

## ✅ Checklist de Deployment

- [ ] Código commiteado a GitHub
- [ ] `vercel.json` configurado ✅
- [ ] Vercel conectado a GitHub
- [ ] Variables de entorno agregadas en Vercel
- [ ] Build exitosa (sin errores)
- [ ] Sitio accesible en URL de Vercel
- [ ] Supabase conectando correctamente
- [ ] HTML estático sirviendo (Paso 6)
- [ ] Dominio personalizado configurado (opcional)
- [ ] SSL/HTTPS activo ✅ (automático)

---

## 🆘 Solución de Problemas

### "Build failed"
```
1. Ver logs en Vercel Dashboard → Deployments → ver error
2. Verificar que Next.js compila localmente:
   cd artimindart-platform && npm run build
3. Si hay errores, fijarlos localmente primero
4. Hacer push nuevamente
```

### "Cannot find module"
```
Vercel no instaló dependencias correctamente
1. En Vercel → Redeploy (sin cambios de código)
2. O: npm install en artimindart-platform y hacer push
```

### "Environment variables not found"
```
1. Verificar que estén agregadas en Settings → Environment Variables
2. Hacer redeploy para que se apliquen:
   Vercel → [Tu proyecto] → Deployments → redeploy
```

### "Supabase connection refused"
```
1. Verificar NEXT_PUBLIC_SUPABASE_URL es correcta
2. Verificar SUPABASE_SERVICE_ROLE_KEY es válida
3. Verificar RLS policies en Supabase
```

---

## 📊 Monitoring & Logs

En Vercel Dashboard:

```
1. Deployments: Ver historial de builds
2. Functions: Ver uso de API routes
3. Analytics: Ver latencia, uptime
4. Logs: Ver errores en tiempo real
```

---

## 💡 Próximos Pasos

1. **Inmediato**: Deploy a Vercel (Pasos 1-4)
2. **Luego**: Configurar HTML estático (Paso 6)
3. **Después**: Agregar Resend y Stripe cuando tengas keys
4. **Final**: Configurar dominio personalizado

---

## 🔗 Recursos Vercel

- **Dashboard**: https://vercel.com/dashboard
- **Docs Next.js**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **CLI Reference**: https://vercel.com/docs/cli

---

## 📞 Comandos Rápidos

```bash
# Loguéate
vercel login

# Deploy preview (rama)
vercel

# Deploy a producción
vercel --prod

# Ver logs en vivo
vercel logs

# Listar proyectos
vercel projects ls

# Ver deployment status
vercel status
```

---

**¿Necesitas ayuda?** Usa los logs de Vercel para diagnosticar problemas.

Última actualización: 2026-04-18
