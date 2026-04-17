import { supabaseAdmin } from '../../lib/supabase.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return handleLogin(req, res);
  } else if (req.method === 'GET') {
    return handleCallback(req, res);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

async function handleLogin(req, res) {
  try {
    const { email } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL || 'javierpato@gmail.com';

    if (email !== adminEmail) {
      return res.status(403).json({ error: 'Admin access only' });
    }

    // Send magic link
    const { error } = await supabaseAdmin.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.VERCEL_URL || 'https://artimind.art'}/admin.html?auth=callback`,
      },
    });

    if (error) throw error;

    return res.status(200).json({
      success: true,
      message: 'Check your email for the magic link.',
    });
  } catch (err) {
    console.error('Auth error:', err);
    return res.status(500).json({ error: err.message });
  }
}

async function handleCallback(req, res) {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'Auth code required' });
    }

    const { data, error } = await supabaseAdmin.auth.exchangeCodeForSession(code);

    if (error) throw error;

    // Store session token in secure httpOnly cookie
    res.setHeader('Set-Cookie', `auth_token=${data.session.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax`);

    return res.redirect(302, '/admin.html');
  } catch (err) {
    console.error('Auth callback error:', err);
    return res.status(500).json({ error: err.message });
  }
}
