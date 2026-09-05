export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { key } = req.body || {};
  const actualKey = process.env.KEY || 'ziyou2026';

  if (typeof key === 'string' && key.trim() === actualKey) {
    return res.json({ success: true, message: '授權通過' });
  }
  return res.status(401).json({ success: false, message: '密碼錯誤' });
}
