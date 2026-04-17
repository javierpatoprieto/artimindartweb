import { supabaseAdmin } from '../lib/supabase.js';
import { sendLeadNotification } from '../lib/resend.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, company, project_type: projectType, budget, message, source } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields: name, email, message' });
    }

    // Insert lead into Supabase
    const { data, error } = await supabaseAdmin.from('leads').insert({
      name,
      email,
      company: company || null,
      project_type: projectType || null,
      budget: budget || null,
      message,
      source: source || 'landing',
      ip: req.headers['x-forwarded-for'] || req.headers['cf-connecting-ip'] || null,
    }).select().single();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to save lead' });
    }

    // Send notification email
    await sendLeadNotification(data);

    return res.status(200).json({
      success: true,
      message: 'Lead received. We\'ll reply within 48 hours.',
      id: data.id,
    });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: err.message });
  }
}
