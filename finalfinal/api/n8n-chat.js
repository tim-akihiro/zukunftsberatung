// CommonJS, kompatibel ohne package.json "type":"module"
module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const url = process.env.N8N_CHAT_WEBHOOK;
    if (!url) return res.status(500).json({ error: 'Missing N8N_CHAT_WEBHOOK' });

    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body ?? {}),
    });

    const text = await r.text(); // alles durchreichen, kein JSON-Zwang
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(r.status).send(text);
  } catch (e) {
    res.status(500).json({ error: 'Proxy failure', details: String(e) });
  }
};
