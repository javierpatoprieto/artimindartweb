export default async function handler(req, res) {
  // Test 1: Fetch to Google
  let googleTest = null;
  try {
    const g = await fetch('https://www.google.com', { timeout: 5000 });
    googleTest = { ok: g.ok, status: g.status };
  } catch (err) {
    googleTest = { error: err.message };
  }

  // Test 2: Fetch to Supabase
  let supabaseTest = null;
  try {
    const url = process.env.SUPABASE_URL;
    const roleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const testUrl = `${url}/rest/v1/admin_users?select=username`;

    const s = await fetch(testUrl, {
      headers: {
        'apikey': roleKey,
        'Authorization': `Bearer ${roleKey}`,
      }
    });
    supabaseTest = { ok: s.ok, status: s.status };
  } catch (err) {
    supabaseTest = { error: err.message };
  }

  return res.json({
    google: googleTest,
    supabase: supabaseTest
  });
}
