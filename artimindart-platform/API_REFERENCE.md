# API Reference - ArtiMindArt Dashboard

## Authentication

### Sign Up
```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
});
```

### Sign In
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});

// Store tokens in cookies
if (data?.session?.access_token) {
  document.cookie = `sb-access-token=${data.session.access_token}; path=/`;
  document.cookie = `sb-refresh-token=${data.session.refresh_token}; path=/`;
}
```

### Sign Out
```typescript
await supabase.auth.signOut();
// Clear cookies
document.cookie = 'sb-access-token=; path=/; max-age=0';
document.cookie = 'sb-refresh-token=; path=/; max-age=0';
```

### Get Current User
```typescript
const { data } = await supabase.auth.getUser();
const user = data?.user;
// user.id, user.email, user.user_metadata
```

## Projects Table

### Create Project
```typescript
const { data, error } = await supabase.from('projects').insert({
  user_id: userId,
  name: 'My Project',
  description: 'Project description',
  status: 'active' // 'active' | 'completed' | 'archived'
});
```

### Read All Projects (Current User)
```typescript
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .eq('user_id', userId)
  .order('created_at', { ascending: false });
```

### Read Single Project
```typescript
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .eq('id', projectId)
  .single();
```

### Update Project
```typescript
const { data, error } = await supabase
  .from('projects')
  .update({
    name: 'Updated Name',
    description: 'Updated description',
    status: 'completed'
  })
  .eq('id', projectId);
```

### Delete Project
```typescript
const { data, error } = await supabase
  .from('projects')
  .delete()
  .eq('id', projectId);
```

## Projects Table Schema

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Error Handling

### Common Error Patterns
```typescript
try {
  const { data, error } = await supabase.from('projects').select('*');
  
  if (error) {
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    // Handle specific errors
    if (error.code === '401') {
      // Unauthorized - redirect to login
      router.push('/auth/login');
    }
  }
} catch (err) {
  console.error('Unexpected error:', err);
}
```

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Note: `NEXT_PUBLIC_*` variables are exposed to client-side code (intentional for Supabase anon key).

## Route Protection

### Middleware Rules
- `/auth/login` - Redirects to `/dashboard` if authenticated
- `/auth/signup` - Redirects to `/dashboard` if authenticated
- `/dashboard` - Redirects to `/auth/login` if NOT authenticated
- `/projects` - Redirects to `/auth/login` if NOT authenticated

### Check Auth in Component
```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-client';

export default function ProtectedPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.push('/auth/login');
      }
    };
    checkAuth();
  }, [router]);

  return <div>Protected Content</div>;
}
```

## Row Level Security (RLS)

Policies ensure users only see/modify their own projects:

```sql
-- Select own projects
CREATE POLICY "Users can view their own projects"
  ON projects FOR SELECT
  USING (auth.uid() = user_id);

-- Insert own projects
CREATE POLICY "Users can insert their own projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Update own projects
CREATE POLICY "Users can update their own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = user_id);

-- Delete own projects
CREATE POLICY "Users can delete their own projects"
  ON projects FOR DELETE
  USING (auth.uid() = user_id);
```

## Status Codes

### Auth Errors
- `invalid_credentials` - Email/password incorrect
- `user_already_exists` - Email already registered
- `invalid_email_format` - Email format invalid
- `weak_password` - Password too weak

### Database Errors
- `401` - Unauthorized (no valid session)
- `403` - Forbidden (RLS policy violation)
- `404` - Resource not found
- `409` - Conflict (unique constraint)

## Testing

### Create Test User
1. Sign up at `/auth/signup`
2. Email: `test@example.com`
3. Password: `Password123!`
4. Confirm email in Supabase Auth tab

### Test CRUD
```typescript
// Create
POST /projects?name=TestProject&description=Test

// Read
GET /dashboard (shows all projects)

// Update
PATCH /projects/[id]?name=UpdatedName

// Delete
DELETE /projects/[id]
```

## Performance Tips

### Indexes
Projects table has indexes on:
- `user_id` - Fast filtering by user
- `created_at DESC` - Fast sorting

### Query Optimization
```typescript
// Bad - downloads all columns
await supabase.from('projects').select('*');

// Good - select only needed columns
await supabase.from('projects').select('id,name,status');

// Good - use filters
await supabase
  .from('projects')
  .select('*')
  .eq('user_id', userId)
  .eq('status', 'active');
```

## Links

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase PostgREST API](https://supabase.com/docs/guides/api)
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js Middleware](https://nextjs.org/docs/advanced-features/middleware)
