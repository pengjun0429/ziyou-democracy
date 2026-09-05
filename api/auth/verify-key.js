function getAdminKey() {
  return (process.env.KEY && process.env.KEY.trim()) ? process.env.KEY.trim() : 'ziyou2026';
}

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
  const actualKey = getAdminKey();
  const isMatch = typeof key === 'string' && key.trim() === actualKey;

  if (isMatch) {
    return res.json({ success: true, message: '授權通過，已獲取編輯權限' });
  }
  return res.status(401).json({ success: false, message: '密碼錯誤，請重新輸入' });
}
