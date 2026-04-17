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

    const { data, error } = await supabase
      .from('admin_users')
      .select('id, username, password_hash')
      .eq('username', username)
      .single();

    if (error || !data) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordHash = hashPassword(password);

    if (passwordHash !== data.password_hash) {
      return res.status(401).json({
        error: 'Invalid credentials',
        debug: {
          passwordReceived: password,
          hashGenerated: passwordHash,
          hashInDB: data.password_hash,
          match: passwordHash === data.password_hash
        }
      });
    }

    const token = Buffer.from(`${data.id}:${Date.now()}`).toString('base64');

    return res.status(200).json({
      success: true,
      token,
      message: 'Login successful',
    });
  } catch (err) {
    console.error('Auth error:', err.message);
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
