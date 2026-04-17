import { supabaseAdmin, verifyAdminAuth } from '../../lib/supabase.js';

export default async function handler(req, res) {
  const user = await verifyAdminAuth(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { filename, contentType } = req.body;

    if (!filename || !contentType) {
      return res.status(400).json({ error: 'Filename and contentType required' });
    }

    // Create a signed upload URL (10 min expiry)
    const { data, error } = await supabaseAdmin.storage
      .from('media')
      .createSignedUploadUrl(filename, {
        upsert: false,
      });

    if (error) throw error;

    // Save metadata to DB
    await supabaseAdmin.from('media').insert({
      filename,
      file_path: `media/${filename}`,
      mime_type: contentType,
      uploaded_by: user.id,
    });

    return res.status(200).json({
      uploadUrl: data.signedUrl,
      publicUrl: `${process.env.SUPABASE_URL}/storage/v1/object/public/media/${filename}`,
    });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: err.message });
  }
}
