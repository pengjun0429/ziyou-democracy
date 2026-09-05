import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-edit-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const editKey = (req.headers['x-edit-key'] || '').toString().trim();
  const actualKey = process.env.KEY || 'ziyou2026';
  if (!editKey || editKey !== actualKey) {
    return res.status(401).json({ success: false, error: '密碼錯誤' });
  }

  try {
    await kv.del('site-content');
    return res.json({ success: true, message: '已還原至系統預設內容' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
