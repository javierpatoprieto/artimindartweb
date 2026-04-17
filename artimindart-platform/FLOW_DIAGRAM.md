# ArtiMindArt Dashboard - Diagrama de Flujos

## Arquitectura General

```
┌─────────────────────────────────────┐
│   NAVEGADOR (Client)                │
│   - React Components                │
│   - Tailwind CSS                    │
│   - TypeScript                      │
└──────────────┬──────────────────────┘
               │ HTTPS Requests
               ▼
┌─────────────────────────────────────┐
│   Next.js 14 Middleware             │
│   - Protege /dashboard              │
│   - Protege /projects               │
│   - Valida tokens en cookies        │
└──────────────┬──────────────────────┘
               │ HTTP
               ▼
┌─────────────────────────────────────┐
│   SUPABASE                          │
│   ├─ Auth Service                   │
│   ├─ PostgreSQL (projects table)    │
│   ├─ RLS Policies                   │
│   └─ PostgREST API                  │
└─────────────────────────────────────┘
```

## 1. SIGNUP Flow

```
User → /auth/signup
    ├─ Completar formulario (email, password, confirm)
    ├─ Validación cliente (passwords match, length >= 6)
    ├─ POST supabase.auth.signUp({email, password})
    ├─ Si error → Mostrar mensaje de error
    └─ Si éxito → Success screen → Auto-redirect /auth/login
```

## 2. LOGIN Flow

```
User → /auth/login
    ├─ Completar formulario (email, password)
    ├─ POST supabase.auth.signInWithPassword({email, password})
    ├─ Si éxito:
    │   ├─ Guardar tokens en cookies (7 días)
    │   │  - sb-access-token
    │   │  - sb-refresh-token
    │   └─ router.push('/dashboard')
    │       └─ Dashboard Page carga datos del usuario
    └─ Si error → Mostrar "Invalid credentials"
```

## 3. MIDDLEWARE Protection

```
GET /dashboard
    ├─ Middleware intercepta
    ├─ Lee cookie: sb-access-token
    ├─ Si token existe:
    │   └─ Permitir acceso a /dashboard
    └─ Si NO existe token:
        └─ NextResponse.redirect('/auth/login')
```

## 4. CREATE Project

```
Click "Add Project"
    ├─ Form inline aparece
    ├─ Usuario llena: name, description, status
    ├─ Click "Save"
    ├─ supabase.from('projects').insert({user_id, name, description, status})
    ├─ Supabase valida RLS (auth.uid() = user_id)
    └─ Éxito → Recargar tabla, proyecto aparece
```

## 5. READ Projects

```
Dashboard carga
    ├─ useEffect ejecuta:
    │   └─ supabase.from('projects').select('*').eq('user_id', userId).order('created_at')
    ├─ Supabase RLS: solo devuelve proyectos del usuario
    └─ Tabla renderiza los proyectos
```

## 6. UPDATE Project

```
Click Edit (icono lapiz)
    ├─ Row entra en edit mode (inputs inline)
    ├─ Usuario modifica campos
    ├─ Click "Save"
    ├─ supabase.from('projects').update({...}).eq('id', projectId)
    ├─ Supabase valida RLS
    └─ Éxito → Recargar tabla
```

## 7. DELETE Project

```
Click Delete (icono papelera)
    ├─ Prompt confirmación
    ├─ Si confirma:
    │   ├─ supabase.from('projects').delete().eq('id', projectId)
    │   ├─ Supabase valida RLS
    │   └─ Éxito → Recargar tabla, proyecto desaparece
    └─ Si cancela:
        └─ No hacer nada
```

## 8. LOGOUT Flow

```
Click "Logout"
    ├─ supabase.auth.signOut()
    ├─ Limpiar cookies
    ├─ router.push('/auth/login')
    └─ Middleware detecta NO token → Permitir acceso a /auth/login
```

## Seguridad: RLS en Acción

```
Intento de acceso cruzado:
User A (id=123) intenta GET proyecto de User B (id=456)

1. User A autenticado
2. Obtiene project_id de User B
3. supabase.from('projects').select().eq('id', projectIdDeB)
4. Supabase RLS policy chequea:
   SELECT policy: auth.uid() = projects.user_id
   123 ≠ 456 → 403 Forbidden

Resultado: Acceso denegado
```

## Gestión de Tokens y Cookies

```
Timeline:
1. Usuario login → Supabase devuelve tokens
2. App guarda en cookie: sb-access-token, sb-refresh-token
3. Cada request incluye cookie automáticamente
4. Middleware valida cookie en cada request
5. Cookie expira en 7 días → Usuario debe login nuevamente
```

## Estructura de Base de Datos

```
Table: auth.users (Supabase manage)
┌─────────────┬──────────────────┬────────────┐
│ id          │ email            │ created_at │
├─────────────┼──────────────────┼────────────┤
│ 123-uuid    │ alice@example    │ 2024-01-01 │
│ 456-uuid    │ bob@example      │ 2024-01-02 │
└─────────────┴──────────────────┴────────────┘

Table: public.projects (RLS habilitado)
┌──────────┬─────────┬──────────────┬─────────────┬──────────┬────────────┐
│ id       │ user_id │ name         │ description │ status   │ created_at │
├──────────┼─────────┼──────────────┼─────────────┼──────────┼────────────┤
│ proj-001 │ 123     │ Art Project  │ My creation │ active   │ 2024-01-05 │
│ proj-002 │ 123     │ Design App   │ UI/UX       │ active   │ 2024-01-10 │
│ proj-003 │ 456     │ Web Design   │ Responsive  │ completed│ 2024-01-12 │
└──────────┴─────────┴──────────────┴─────────────┴──────────┴────────────┘

RLS en acción:
- Alice (123) ve: proj-001, proj-002
- Bob (456) ve: proj-003
- Nadie ve proyectos ajenos
```

## Request/Response Examples

### Signup

Request:
```typescript
await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'SecurePass123!'
})
```

Response:
```json
{
  "user": {
    "id": "123-uuid",
    "email": "user@example.com",
    "user_metadata": {}
  },
  "session": null
}
```

### Login

Request:
```typescript
await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'SecurePass123!'
})
```

Response:
```json
{
  "session": {
    "access_token": "eyJhbGc...",
    "refresh_token": "sbr_1234...",
    "expires_in": 3600,
    "user": { "id": "123-uuid", "email": "user@example.com" }
  }
}
```

### Create Project

Request:
```typescript
await supabase.from('projects').insert({
  user_id: '123-uuid',
  name: 'My Project',
  description: 'Description',
  status: 'active'
})
```

Response:
```json
{
  "id": "proj-001",
  "user_id": "123-uuid",
  "name": "My Project",
  "description": "Description",
  "status": "active",
  "created_at": "2024-01-05T10:30:00Z"
}
```

### Read Projects

Request:
```typescript
await supabase
  .from('projects')
  .select('*')
  .eq('user_id', '123-uuid')
  .order('created_at', { ascending: false })
```

Response:
```json
[
  {
    "id": "proj-002",
    "user_id": "123-uuid",
    "name": "Design App",
    "description": "UI/UX",
    "status": "active",
    "created_at": "2024-01-10T14:20:00Z"
  },
  {
    "id": "proj-001",
    "user_id": "123-uuid",
    "name": "Art Project",
    "description": "My creation",
    "status": "active",
    "created_at": "2024-01-05T10:30:00Z"
  }
]
```

### Update Project

Request:
```typescript
await supabase
  .from('projects')
  .update({ status: 'completed' })
  .eq('id', 'proj-001')
```

Response:
```json
[
  {
    "id": "proj-001",
    "status": "completed",
    "updated_at": "2024-01-15T09:45:00Z"
  }
]
```

### Delete Project

Request:
```typescript
await supabase.from('projects').delete().eq('id', 'proj-001')
```

Response: Success (200) - Project deleted

## Error Handling

```
Signup/Login Errors:
- "invalid_credentials" → Email/password incorrect
- "user_already_exists" → Email already registered
- "invalid_email_format" → Invalid email
- "weak_password" → Password too weak

CRUD Errors:
- 401 Unauthorized → No valid session
- 403 Forbidden → RLS policy violation
- 404 Not Found → Resource doesn't exist
- 409 Conflict → Duplicate key
```

## Performance Optimizations

```
Database Indexes:
- user_id: Fast filtering by user
- created_at DESC: Fast sorting

Query Optimization:
- Select only needed columns
- Use filters (eq, order, etc.)
- RLS automatically filters per-user
```

## Security Checklist

✓ Middleware protege rutas privadas
✓ RLS impide acceso cruzado
✓ Tokens en cookies (no localStorage)
✓ Parametrized queries (no SQL injection)
✓ Validación lado cliente y servidor
✓ Session management con Supabase
✓ CORS configurado en Supabase
✓ TypeScript type safety
