export default async function handler(req, res) {
  try {
    const { createClient } = await import('@supabase/supabase-js');

    const client = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await client
      .from('admin_users')
      .select('username')
      .limit(5);

    if (error) {
      return res.json({
        success: false,
        error: error.message,
        code: error.code,
      });
    }

    return res.json({
      success: true,
      count: data?.length || 0,
      usernames: data?.map(u => u.username) || []
    });
  } catch (err) {
    return res.json({
      success: false,
      error: err.message,
      stack: err.stack?.split('\n').slice(0, 3)
    });
  }
}
