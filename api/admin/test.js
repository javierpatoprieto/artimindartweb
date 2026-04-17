import { supabaseAdmin } from '../../lib/supabase.js';

export default async function handler(req, res) {
  try {
    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .select('*');

    if (error) {
      return res.status(500).json({ error: error.message, details: error });
    }

    return res.status(200).json({
      success: true,
      count: data?.length || 0,
      users: data
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
