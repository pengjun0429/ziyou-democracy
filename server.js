import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SITE_CONTENT_FILE = path.join(__dirname, 'site-content.json');

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

app.use(express.json({ limit: '10mb' }));

// 取得環境變數中的 KEY 密碼（若未設定則以 ziyou2026 為備用預設值）
const getAdminKey = () => {
  return (process.env.KEY && process.env.KEY.trim()) ? process.env.KEY.trim() : 'ziyou2026';
};

// 權限驗證中介軟體
const requireAdminAuth = (req, res, next) => {
  const clientKey = (req.headers['x-edit-key'] || req.body?.editKey || req.query?.key || '').toString().trim();
  const actualKey = getAdminKey();
  if (!clientKey || clientKey !== actualKey) {
    return res.status(401).json({ success: false, error: '編輯密碼錯誤或未提供授權金鑰 (KEY)' });
  }
  next();
};

// Serve static assets from root
app.use(express.static(__dirname));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 驗證密碼金鑰 API
app.post('/api/auth/verify-key', (req, res) => {
  const { key } = req.body || {};
  const actualKey = getAdminKey();
  const isMatch = typeof key === 'string' && key.trim() === actualKey;
  if (isMatch) {
    return res.json({ success: true, message: '授權通過，已獲取編輯權限' });
  }
  return res.status(401).json({ success: false, message: '密碼錯誤，請重新輸入' });
});

// Site Content API - Read customized site content
app.get('/api/site-content', (req, res) => {
  try {
    if (fs.existsSync(SITE_CONTENT_FILE)) {
      const data = fs.readFileSync(SITE_CONTENT_FILE, 'utf-8');
      return res.json({ success: true, content: JSON.parse(data) });
    }
    return res.json({ success: true, content: null });
  } catch (err) {
    console.error('Error reading site-content.json:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Site Content API - Save customized site content (需要 KEY 密碼授權)
app.post('/api/site-content', requireAdminAuth, (req, res) => {
  try {
    const { content, editKey } = req.body;
    const toSave = content || req.body;
    // 移除 editKey 避免被存入檔案
    if (toSave && toSave.editKey) delete toSave.editKey;

    fs.writeFileSync(SITE_CONTENT_FILE, JSON.stringify(toSave, null, 2), 'utf-8');
    return res.json({ success: true, message: '網站內容已成功儲存至伺服器' });
  } catch (err) {
    console.error('Error writing site-content.json:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Site Content API - Reset to default (需要 KEY 密碼授權)
app.post('/api/site-content/reset', requireAdminAuth, (req, res) => {
  try {
    if (fs.existsSync(SITE_CONTENT_FILE)) {
      fs.unlinkSync(SITE_CONTENT_FILE);
    }
    return res.json({ success: true, message: '已還原至系統預設內容' });
  } catch (err) {
    console.error('Error resetting site-content.json:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// For all other routes, send index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
