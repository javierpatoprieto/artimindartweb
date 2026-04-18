import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

function hashPassword(password: string) {
  return crypto.createHash('sha256').update(password + 'salt').digest('hex');
}

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || '',
      {
        auth: { persistSession: false },
      }
    );

    const { data, error } = await supabase
      .from('admin_users')
      .select('id, username, password_hash')
      .eq('username', username)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const passwordHash = hashPassword(password);

    if (passwordHash !== data.password_hash) {
      return NextResponse.json({
        error: 'Invalid credentials',
        debug: {
          passwordReceived: password,
          hashGenerated: passwordHash,
          hashInDB: data.password_hash,
          match: passwordHash === data.password_hash
        }
      }, { status: 401 });
    }

    const token = Buffer.from(`${data.id}:${Date.now()}`).toString('base64');

    return NextResponse.json({
      success: true,
      token,
      message: 'Login successful',
    });
  } catch (err: any) {
    console.error('Auth error:', err.message);
    return NextResponse.json({ error: 'Server error: ' + err.message }, { status: 500 });
  }
}
