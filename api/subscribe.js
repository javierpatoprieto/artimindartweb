import { supabaseAdmin } from '../lib/supabase.js';
import { sendSubscribeConfirm } from '../lib/resend.js';
import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return handleSubscribe(req, res);
  } else if (req.method === 'GET') {
    return handleConfirm(req, res);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleSubscribe(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email required' });
    }

    // Generate confirm token
    const token = crypto.randomBytes(32).toString('hex');

    // Insert/upsert subscriber
    const { error } = await supabaseAdmin.from('subscribers').upsert(
      {
        email,
        confirmed: false,
        confirm_token: token,
      },
      { onConflict: 'email' }
    );

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to subscribe' });
    }

    // Send confirmation email
    await sendSubscribeConfirm(email, token);

    return res.status(200).json({
      success: true,
      message: 'Check your email to confirm subscription.',
    });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: err.message });
  }
}

async function handleConfirm(req, res) {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ error: 'Token required' });
    }

    // Find and confirm subscriber
    const { data, error: selectError } = await supabaseAdmin
      .from('subscribers')
      .select('id, email')
      .eq('confirm_token', token)
      .single();

    if (selectError || !data) {
      return res.status(404).json({ error: 'Invalid or expired token' });
    }

    // Mark as confirmed
    const { error: updateError } = await supabaseAdmin
      .from('subscribers')
      .update({ confirmed: true, confirm_token: null })
      .eq('id', data.id);

    if (updateError) {
      console.error('Supabase error:', updateError);
      return res.status(500).json({ error: 'Failed to confirm' });
    }

    // Redirect to landing with success message
    return res.redirect(302, '/?newsletter=confirmed');
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: err.message });
  }
}
