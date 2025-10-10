mkdir -p api
cat > api/n8n-chat.js << 'EOF'
export default async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const r = await fetch(process.env.N8N_CHAT_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body ?? {}),
    });
    const text = await r.text(); // ungeparst zurückreichen
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(r.status).send(text);
  } catch (e) {
    res.status(500).json({ error: 'Proxy failure', details: String(e) });
  }
};
EOF
