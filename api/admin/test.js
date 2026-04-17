export default async function handler(req, res) {
  const url = process.env.SUPABASE_URL;

  return res.json({
    env_url: url,
    instructions: 'Go to https://app.supabase.com - click your project - Settings → API → Copy Project URL and keys'
  });
}
