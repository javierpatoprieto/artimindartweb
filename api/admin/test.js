export default async function handler(req, res) {
  const vars = {
    SUPABASE_URL: !!process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  };

  if (!vars.SUPABASE_URL || !vars.SUPABASE_ANON_KEY || !vars.SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(400).json({
      error: 'Missing environment variables',
      variables: vars,
      missing: Object.entries(vars).filter(([, v]) => !v).map(([k]) => k)
    });
  }

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabaseAdmin = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false } }
    );

    const { data, error } = await supabaseAdmin
      .from('admin_users')
      .select('*');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({
      success: true,
      count: data?.length || 0,
      data: data
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
