import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

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

    // First, get all users to see if table is accessible
    const { data: allUsers, error: allError } = await supabase
      .from('admin_users')
      .select('*');

    if (allError) {
      return NextResponse.json({
        success: false,
        error: 'Cannot access table',
        tableError: allError.message,
        allUsers: []
      }, { status: 200 });
    }

    return NextResponse.json({
      success: false,
      info: 'Debug info for admin_users table',
      tableData: {
        totalUsers: allUsers ? allUsers.length : 0,
        users: allUsers || [],
        allData: JSON.stringify(allUsers, null, 2)
      },
      requestedUsername: username,
      userFound: allUsers && allUsers.some((u: any) => u.username === username),
      userDetails: allUsers && allUsers.find((u: any) => u.username === username) ? {
        username: allUsers.find((u: any) => u.username === username).username,
        id: allUsers.find((u: any) => u.username === username).id,
        passwordHashLength: allUsers.find((u: any) => u.username === username).password_hash?.length || 0
      } : null,
      environmentCheck: {
        hasURL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY
      }
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err.message,
      type: err.constructor.name
    }, { status: 200 });
  }
}
