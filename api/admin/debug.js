import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

function hashPassword(password) {
  return crypto.createHash('sha256').update(password + 'salt').digest('hex');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: { persistSession: false },
        global: { fetch: globalThis.fetch }
      }
    );

    // First, get all users to see if table is accessible
    const { data: allUsers, error: allError } = await supabase
      .from('admin_users')
      .select('username');

    if (allError) {
      return res.status(200).json({
        success: false,
        error: 'Cannot access table',
        tableError: allError.message,
        allUsers: []
      });
    }

    // Now search for the specific user
    const { data, error } = await supabase
      .from('admin_users')
      .select('id, username, password_hash')
      .eq('username', username)
      .single();

    if (error || !data) {
      return res.status(200).json({
        success: false,
        error: 'User not found',
        username_requested: username,
        allUsers: allUsers.map(u => u.username),
        queryError: error?.message
      });
    }

    const passwordHash = hashPassword(password);

    return res.status(200).json({
      success: false,
      username: data.username,
      passwordReceived: password,
      passwordReceivedLength: password.length,
      hashGenerated: passwordHash,
      hashInDB: data.password_hash,
      match: passwordHash === data.password_hash,
      hashesEqual: passwordHash === data.password_hash
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      error: err.message,
      type: err.constructor.name
    });
  }
}
