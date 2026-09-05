function getAdminKey() {
  return (process.env.KEY && process.env.KEY.trim()) ? process.env.KEY.trim() : 'ziyou2026';
}

export default function handler(req, res) {
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
  const actualKey = getAdminKey();

  if (!editKey || editKey !== actualKey) {
    return res.status(401).json({ success: false, error: '編輯密碼錯誤' });
  }

  return res.json({ success: true, message: '已還原至系統預設內容（由瀏覽器端處理）' });
}
