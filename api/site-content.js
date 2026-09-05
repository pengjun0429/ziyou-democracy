import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const SITE_CONTENT_FILE = join(process.cwd(), 'site-content.json');

function getAdminKey() {
  return (process.env.KEY && process.env.KEY.trim()) ? process.env.KEY.trim() : 'ziyou2026';
}

function readContent() {
  try {
    if (existsSync(SITE_CONTENT_FILE)) {
      return JSON.parse(readFileSync(SITE_CONTENT_FILE, 'utf-8'));
    }
  } catch (e) {}
  return null;
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-edit-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    const content = readContent();
    return res.json({ success: true, content });
  }

  if (req.method === 'POST') {
    const editKey = (req.headers['x-edit-key'] || '').toString().trim();
    const actualKey = getAdminKey();
    if (!editKey || editKey !== actualKey) {
      return res.status(401).json({ success: false, error: '編輯密碼錯誤' });
    }
    return res.json({ success: true, message: '內容已由瀏覽器端 localStorage 保存' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
