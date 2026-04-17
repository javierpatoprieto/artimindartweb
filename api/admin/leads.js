import { supabaseAdmin, verifyAdminAuth } from '../../lib/supabase.js';

export default async function handler(req, res) {
  const user = await verifyAdminAuth(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    return handleGet(req, res);
  } else if (req.method === 'PATCH') {
    return handlePatch(req, res);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

async function handleGet(req, res) {
  try {
    const { status, limit = 50, offset = 0 } = req.query;

    let query = supabaseAdmin.from('leads').select('*');

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return res.status(200).json({
      data: data || [],
      total: count,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function handlePatch(req, res) {
  try {
    const { id } = req.query;
    const { status } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Lead ID required' });
    }

    if (!['new', 'contacted', 'qualified', 'won', 'lost'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const { data, error } = await supabaseAdmin
      .from('leads')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
