# ArtiMindArt Dashboard - Setup Guide

Dashboard privado con autenticación y CRUD de proyectos.

## Stack
- Next.js 14
- Supabase (Auth + Database)
- Tailwind CSS
- TypeScript

## Archivos Creados

```
app/
  auth/
    login/page.tsx       # Login page
    signup/page.tsx      # Sign up page
  dashboard/page.tsx     # Dashboard principal (protegido)

components/
  ProjectsTable.tsx      # Tabla CRUD de proyectos

lib/
  supabase-client.ts     # Cliente Supabase

middleware.ts            # Protección de rutas

.env.local.example       # Template de variables de entorno
SETUP_SUPABASE.sql       # SQL para crear tablas
```

## Setup Rápido

### 1. Configurar Supabase

1. Ir a https://supabase.com
2. Crear nuevo proyecto
3. En Supabase Dashboard:
   - Ir a SQL Editor
   - Crear nueva query
   - Copiar contenido de `SETUP_SUPABASE.sql`
   - Ejecutar

### 2. Obtener credenciales Supabase

1. En Supabase Dashboard → Settings → API
2. Copiar:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Configurar variables de entorno

```bash
cp .env.local.example .env.local
```

Editar `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
```

### 4. Instalar dependencias

```bash
npm install
```

Las dependencias requeridas ya están en package.json:
- `@supabase/supabase-js`
- `tailwindcss`
- `lucide-react` (iconos)

### 5. Ejecutar proyecto

```bash
npm run dev
```

Abrir http://localhost:3000

## Flujo de Uso

### Autenticación
1. `/auth/signup` - Crear cuenta (email + password)
2. `/auth/login` - Login
3. Middleware protege `/dashboard` y `/projects`

### Dashboard
- Mostrar email y ID del usuario
- Tabla CRUD de proyectos:
  - **CREATE**: Botón "Add Project"
  - **READ**: Listar proyectos del usuario
  - **UPDATE**: Botón Edit (edita inline)
  - **DELETE**: Botón Delete con confirmación
- Status: active, completed, archived
- **Logout**: Botón top-right

## Seguridad

✓ Row Level Security (RLS) habilitado en Supabase
✓ Cada usuario solo ve sus propios proyectos
✓ Middleware protege rutas privadas
✓ Cookies con tokens de sesión

## API Endpoints Usados

```typescript
// Auth
supabase.auth.signUp()
supabase.auth.signInWithPassword()
supabase.auth.signOut()
supabase.auth.getUser()

// Projects CRUD
.from('projects').select()
.from('projects').insert()
.from('projects').update()
.from('projects').delete()
```

## Testing

### Crear usuario test
1. Ir a http://localhost:3000/auth/signup
2. Email: `test@example.com`
3. Password: `password123`
4. Confirmar email en Supabase (Auth tab)

### Test CRUD
1. Login en http://localhost:3000/auth/login
2. En dashboard:
   - Click "Add Project"
   - Llenar form
   - Click Save
   - Edit/Delete funciona inline

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Verificar `.env.local` tiene valores
- Reiniciar `npm run dev`

### Error: "User not authenticated"
- Verificar cookie `sb-access-token` en navegador
- Hacer login nuevamente

### Error: "Permission denied" en proyectos
- Verificar RLS policies en Supabase
- Ejecutar `SETUP_SUPABASE.sql` nuevamente

### Middleware no redirige a login
- Verificar `middleware.ts` está en raíz
- Revisar config matcher en middleware

## Próximos pasos (opcional)

- [ ] Email verification requerido
- [ ] Password reset
- [ ] User profile page
- [ ] Project sharing
- [ ] Pagination en tabla
- [ ] Search/filter proyectos
- [ ] Confirmar delete con modal
- [ ] Toast notifications

## Links Útiles

- Supabase Docs: https://supabase.com/docs
- Next.js Middleware: https://nextjs.org/docs/advanced-features/middleware
- Tailwind: https://tailwindcss.com
