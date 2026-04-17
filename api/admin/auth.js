import { supabaseAdmin } from '../../lib/supabase.js';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return handleLogin(req, res);
  }
  return res.status(405).json({ error: 'Method not allowed' });
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password + 'salt').digest('hex');
}

async function handleLogin(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // Query admin_users table
    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .select('id, username, password_hash')
      .eq('username', username)
      .single();

    if (error || !data) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const passwordHash = hashPassword(password);
    if (passwordHash !== data.password_hash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create a simple token (base64 encoded id + timestamp)
    const token = Buffer.from(`${data.id}:${Date.now()}`).toString('base64');

    return res.status(200).json({
      success: true,
      token,
      message: 'Login successful',
    });
  } catch (err) {
    console.error('Auth error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
