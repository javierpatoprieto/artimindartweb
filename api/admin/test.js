export default async function handler(req, res) {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  const roleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  return res.status(200).json({
    URL: url ? 'present' : 'missing',
    url_value: url,
    ANON_KEY: anonKey ? 'present' : 'missing',
    ROLE_KEY: roleKey ? 'present' : 'missing',
  });
}
