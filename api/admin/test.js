export default async function handler(req, res) {
  try {
    const url = process.env.SUPABASE_URL;
    const roleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Test basic fetch to Supabase
    const testUrl = `${url}/rest/v1/admin_users?select=username`;
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'apikey': roleKey,
        'Authorization': `Bearer ${roleKey}`,
      }
    });

    const data = await response.json();

    return res.json({
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: data
    });
  } catch (err) {
    return res.json({
      success: false,
      error: err.message,
      type: err.constructor.name
    });
  }
}
