import { supabaseAdmin, verifyAdminAuth } from '../../lib/supabase.js';

export default async function handler(req, res) {
  const user = await verifyAdminAuth(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    return handleGet(req, res);
  } else if (req.method === 'POST') {
    return handlePost(req, res);
  } else if (req.method === 'PATCH') {
    return handlePatch(req, res);
  } else if (req.method === 'DELETE') {
    return handleDelete(req, res);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

async function handleGet(req, res) {
  try {
    const { data, error } = await supabaseAdmin
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;
    return res.status(200).json(data || []);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function handlePost(req, res) {
  try {
    const { title, slug, subtitle, client, type, year, cover_url, video_url, body, tags } = req.body;

    if (!title || !slug) {
      return res.status(400).json({ error: 'Title and slug required' });
    }

    const { data, error } = await supabaseAdmin
      .from('projects')
      .insert({
        title,
        slug,
        subtitle: subtitle || null,
        client: client || null,
        type: type || 'film',
        year: year || new Date().getFullYear(),
        status: 'draft',
        cover_url: cover_url || null,
        video_url: video_url || null,
        body: body || null,
        tags: tags || [],
      })
      .select()
      .single();

    if (error) throw error;
    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function handlePatch(req, res) {
  try {
    const { id } = req.query;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Project ID required' });
    }

    const { data, error } = await supabaseAdmin
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function handleDelete(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'Project ID required' });
    }

    // Soft delete: set status to archived
    const { error } = await supabaseAdmin
      .from('projects')
      .update({ status: 'archived' })
      .eq('id', id);

    if (error) throw error;
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
