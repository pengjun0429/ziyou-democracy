import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-edit-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const content = await kv.get('site-content');
      return res.json({ success: true, content });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  if (req.method === 'POST') {
    const editKey = (req.headers['x-edit-key'] || '').toString().trim();
    const actualKey = process.env.KEY || 'ziyou2026';
    if (!editKey || editKey !== actualKey) {
      return res.status(401).json({ success: false, error: '密碼錯誤' });
    }

    try {
      const { editKey: _, ...content } = req.body;
      await kv.set('site-content', content);
      return res.json({ success: true, message: '已儲存至 Vercel KV' });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
