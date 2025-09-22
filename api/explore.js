// Demo endpoint with FAKE data so Explore works immediately.
// You will call:  https://<your-vercel-domain>/api/explore?wallet=<address>

export default async function handler(req, res) {
  // Allow your website to call this from the browser
  res.setHeader('Access-Control-Allow-Origin', 'https://www.souldaddio.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'method_not_allowed' });

  const { wallet = '', limit = '5' } = req.query || {};
  const lim = Math.min(parseInt(limit, 10) || 5, 50);

  // FAKE messages so you can see the UI working
  const sample = [
    {
      id: '1',
      from: '9xQeWvTf2YH1bZq2cQh4t3mJp3mS1nQdY8h7Z1kJ5qPp',
      to: wallet || '7aK1fQpT8cP4bL9wJr2mEy5nQw8dH2pVx4uTq1sF3oR',
      body: 'gm',
      is_encrypted: false,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      from: wallet || 'So11111111111111111111111111111111111111112',
      to: '9xQeWvTf2YH1bZq2cQh4t3mJp3mS1nQdY8h7Z1kJ5qPp',
      body: 'hello back',
      is_encrypted: false,
      created_at: new Date(Date.now() - 60_000).toISOString()
    }
  ];

  const items = sample.slice(0, lim);
  return res.status(200).json({
    wallet,
    count: items.length,
    next_cursor: null,
    items
  });
}
