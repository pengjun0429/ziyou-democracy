/**
 * 資優民主國 - 管理系統通用安全授權驗證模組 (Auth Gate)
 * 用於保護「國民管理系統」與「文件法規管理系統」，必須輸入管理金鑰 (KEY) 才能檢視與操作
 */
(function() {
    window.ZiyuAuthGate = {
        STORAGE_KEY: 'ziyou_site_key',

        // 檢查並取得已儲存的金鑰
        getCurrentKey: function() {
            try {
                return sessionStorage.getItem(this.STORAGE_KEY) || localStorage.getItem(this.STORAGE_KEY) || '';
            } catch (e) {
                return '';
            }
        },

        // 儲存金鑰
        saveKey: function(key) {
            try {
                sessionStorage.setItem(this.STORAGE_KEY, key);
                localStorage.setItem(this.STORAGE_KEY, key);
            } catch (e) {}
        },

        // 清除金鑰（登出）
        clearKey: function() {
            try {
                sessionStorage.removeItem(this.STORAGE_KEY);
                localStorage.removeItem(this.STORAGE_KEY);
            } catch (e) {}
        },

        // 向伺服器驗證金鑰
        verifyKeyOnServer: async function(key) {
            if (!key || !key.trim()) {
                return { success: false, message: '請輸入授權金鑰' };
            }
            try {
                const res = await fetch('/api/auth/verify-key', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ key: key.trim() })
                });
                const data = await res.json();
                return { 
                    success: res.ok && data.success, 
                    message: data.message || (res.ok ? '授權成功' : '密碼錯誤') 
                };
            } catch (err) {
                // 網路斷線或離線預覽備用機制
                console.warn('伺服器驗證端點無法連線，啟用離線驗證備援:', err);
                if (key.trim() === 'ziyou2026') {
                    return { success: true, message: '授權通過 (離線備援)' };
                }
                return { success: false, message: '驗證失敗，請確認密碼是否正確' };
            }
        },

        // 初始化安全驗證門
        init: function(options) {
            const systemName = options.systemName || '國家核心管理系統';
            const systemIcon = options.systemIcon || '🛡️';
            const contentSelector = options.contentSelector || 'main';
            const onUnlockSuccess = options.onUnlockSuccess || function() {};

            const contentEl = document.querySelector(contentSelector);
            if (contentEl) {
                contentEl.classList.add('auth-locked-content');
            }

            // 建立遮罩 DOM
            let overlay = document.getElementById('ziyuAuthOverlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.id = 'ziyuAuthOverlay';
                overlay.className = 'auth-gate-overlay';
                overlay.innerHTML = `
                    <div class="auth-gate-card" id="ziyuAuthCard">
                        <div class="auth-gate-icon">${systemIcon}</div>
                        <h2>資優民主國 ‧ 安全認證</h2>
                        <p class="auth-gate-desc">
                            您正嘗試進入 <strong>${systemName}</strong>。<br>
                            依《憲法防滲透條例》，本系統涉及國家核心機密與法規名冊，請輸入中央政府管理金鑰 (KEY)。
                        </p>
                        <form class="auth-gate-form" id="ziyuAuthForm" onsubmit="return false;">
                            <div class="auth-input-group">
                                <label for="ziyuAuthPassword">國家管理授權密碼 (KEY)：</label>
                                <div class="auth-input-wrapper">
                                    <input type="password" id="ziyuAuthPassword" class="auth-input" placeholder="請輸入管理授權金鑰..." autocomplete="current-password" autofocus required>
                                    <button type="button" class="auth-toggle-pwd" id="btnToggleAuthPwd" title="切換顯示密碼">👁️</button>
                                </div>
                                <div class="auth-error-msg" id="ziyuAuthError"></div>
                            </div>
                            <button type="submit" class="auth-submit-btn" id="btnSubmitAuth">
                                <span>🔓</span> 驗證金鑰並解鎖
                            </button>
                        </form>
                        <div class="auth-gate-actions">
                            <a href="index.html" class="auth-back-link">
                                <span>←</span> 返回資優民主國首頁
                            </a>
                        </div>
                    </div>
                `;
                document.body.appendChild(overlay);
            }

            const inputPwd = document.getElementById('ziyuAuthPassword');
            const errorEl = document.getElementById('ziyuAuthError');
            const submitBtn = document.getElementById('btnSubmitAuth');
            const cardEl = document.getElementById('ziyuAuthCard');
            const togglePwdBtn = document.getElementById('btnToggleAuthPwd');

            // 密碼顯示/隱藏切換
            if (togglePwdBtn && inputPwd) {
                togglePwdBtn.addEventListener('click', function() {
                    const isPwd = inputPwd.getAttribute('type') === 'password';
                    inputPwd.setAttribute('type', isPwd ? 'text' : 'password');
                    togglePwdBtn.textContent = isPwd ? '🔒' : '👁️';
                });
            }

            // 解鎖成功處理
            const unlockUI = () => {
                overlay.classList.add('hidden');
                if (contentEl) {
                    contentEl.classList.remove('auth-locked-content');
                }
                injectNavStatus();
                onUnlockSuccess();
            };

            // 鎖定處理
            const lockUI = () => {
                this.clearKey();
                if (contentEl) {
                    contentEl.classList.add('auth-locked-content');
                }
                overlay.classList.remove('hidden');
                inputPwd.value = '';
                errorEl.textContent = '';
                errorEl.classList.remove('visible');
                inputPwd.focus();
                removeNavStatus();
            };

            // 注入導航列狀態按鈕
            const injectNavStatus = () => {
                const navLinks = document.querySelector('.nav-links');
                if (!navLinks) return;
                
                let existing = document.getElementById('navAuthItem');
                if (!existing) {
                    existing = document.createElement('li');
                    existing.id = 'navAuthItem';
                    existing.style.display = 'flex';
                    existing.style.alignItems = 'center';
                    existing.style.gap = '0.5rem';
                    existing.innerHTML = `
                        <span class="nav-auth-status" title="已通過國家安全授權">
                            <span>🛡️</span> 已授權
                        </span>
                        <button class="nav-lock-btn" id="btnNavLockSystem" title="登出並重新鎖定系統">
                            <span>🚪</span> 鎖定
                        </button>
                    `;
                    navLinks.appendChild(existing);

                    const lockBtn = document.getElementById('btnNavLockSystem');
                    if (lockBtn) {
                        lockBtn.addEventListener('click', function(e) {
                            e.preventDefault();
                            if (confirm('確定要安全鎖定並退出當前管理權限嗎？')) {
                                lockUI();
                            }
                        });
                    }
                }
            };

            const removeNavStatus = () => {
                const item = document.getElementById('navAuthItem');
                if (item) item.remove();
            };

            // 執行驗證嘗試
            const tryAuth = async (pwd) => {
                errorEl.textContent = '';
                errorEl.classList.remove('visible');
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span>⏳</span> 驗證金鑰中...`;

                const result = await this.verifyKeyOnServer(pwd);
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<span>🔓</span> 驗證金鑰並解鎖`;

                if (result.success) {
                    this.saveKey(pwd.trim());
                    unlockUI();
                } else {
                    errorEl.textContent = '❌ ' + (result.message || '金鑰錯誤，請重新輸入');
                    errorEl.classList.add('visible');
                    cardEl.classList.remove('auth-shake');
                    void cardEl.offsetWidth; // 觸發 reflow 重新播放動畫
                    cardEl.classList.add('auth-shake');
                    inputPwd.select();
                }
            };

            // 表單提交
            const form = document.getElementById('ziyuAuthForm');
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const val = inputPwd.value.trim();
                    if (!val) {
                        errorEl.textContent = '❌ 請輸入管理授權金鑰';
                        errorEl.classList.add('visible');
                        inputPwd.focus();
                        return;
                    }
                    tryAuth(val);
                });
            }

            // 初始化時檢查是否已有儲存的金鑰
            const savedKey = this.getCurrentKey();
            if (savedKey) {
                this.verifyKeyOnServer(savedKey).then(res => {
                    if (res.success) {
                        unlockUI();
                    } else {
                        this.clearKey();
                        lockUI();
                    }
                });
            } else {
                lockUI();
            }

            // 公開鎖定方法
            window.lockSystemNow = lockUI;
        }
    };
})();
