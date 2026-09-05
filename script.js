document.addEventListener('DOMContentLoaded', function() {
    // 1. 計算建國天數 (立國日: 2026年5月28日)
    function calculateDaysSinceFounding() {
        const foundingDate = new Date('2026-05-28T00:00:00');
        const today = new Date();
        const diffTime = today - foundingDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        const daysEl = document.getElementById('days-since-founding');
        if (daysEl) {
            if (diffDays >= 0) {
                daysEl.textContent = diffDays;
            } else {
                daysEl.textContent = '奠基籌備中 (' + Math.abs(diffDays) + '天)';
            }
        }
    }
    calculateDaysSinceFounding();

    // 2. 移動端導航欄切換
    const mobileNavBtn = document.getElementById('mobileNavBtn');
    const navLinks = document.getElementById('navLinks');
    if (mobileNavBtn && navLinks) {
        mobileNavBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileNavBtn.textContent = navLinks.classList.contains('active') ? '✕ 關閉' : '☰ 選單';
        });
    }

    // 點擊導航連結後關閉移動端選單
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileNavBtn) mobileNavBtn.textContent = '☰ 選單';
            }
        });
    });

    // 3. 返回頂部按鈕
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. 平滑滾動到錨點
    document.querySelectorAll('nav a, .footer-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navOffset = 70;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 5. 法規即時搜尋與分類篩選
    const lawSearchInput = document.getElementById('lawSearchInput');
    const catButtons = document.querySelectorAll('.cat-btn');
    const lawCards = document.querySelectorAll('.law-card');

    let currentCategory = 'all';
    let currentSearchQuery = '';

    function filterLaws() {
        lawCards.forEach(card => {
            const cardCat = card.getAttribute('data-category');
            const cardText = card.textContent.toLowerCase();
            const matchesCat = (currentCategory === 'all' || cardCat === currentCategory);
            const matchesSearch = cardText.includes(currentSearchQuery);

            if (matchesCat && matchesSearch) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (lawSearchInput) {
        lawSearchInput.addEventListener('input', function(e) {
            currentSearchQuery = e.target.value.trim().toLowerCase();
            filterLaws();
        });
    }

    catButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            catButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.getAttribute('data-cat');
            filterLaws();
        });
    });

    // 6. 查看法規彈出視窗
    const viewLawButtons = document.querySelectorAll('.view-law');
    viewLawButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lawType = this.getAttribute('data-law');
            showLawModal(lawType);
        });
    });

    // 法規彈出視窗實作
    function showLawModal(lawType) {
        const law = getLawData(lawType);
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'lawModal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <div style="font-weight:700; color:var(--primary-800); font-size:1.1rem; display:flex; align-items:center; gap:0.5rem;">
                        <span>📜</span> 資優民主國官方公報
                    </div>
                    <div class="modal-header-actions">
                        <button class="modal-tool-btn" id="copyLawBtn" title="複製法規內容">
                            📋 複製條文
                        </button>
                        <button class="modal-tool-btn" id="printLawBtn" title="列印條文">
                            🖨️ 列印
                        </button>
                        <button class="close-modal" aria-label="關閉視窗">&times;</button>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="law-text" id="lawModalContent">
                        <h3>${law.title}</h3>
                        <div class="law-date-tag">公布日期：${law.date} ‧ ${law.status}</div>
                        <div class="law-articles">
                            ${law.body}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // 複製條文功能
        const copyBtn = modal.querySelector('#copyLawBtn');
        copyBtn.addEventListener('click', function() {
            const content = modal.querySelector('#lawModalContent').innerText;
            navigator.clipboard.writeText(content).then(() => {
                showNotification('✅ 法規條文已成功複製到剪貼簿！');
            }).catch(() => {
                showNotification('⚠️ 複製失敗，請手動選取文字。');
            });
        });

        // 列印功能
        const printBtn = modal.querySelector('#printLawBtn');
        printBtn.addEventListener('click', function() {
            window.print();
        });
        
        // 關閉彈出視窗
        const closeModal = function() {
            modal.remove();
            document.body.style.overflow = '';
        };

        modal.querySelector('.close-modal').addEventListener('click', closeModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal();
        });

        // ESC 鍵關閉
        const escHandler = function(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }
    
    // 完整法規資料庫
    function getLawData(lawType) {
        const laws = {
            'anti-infiltration': {
                title: '資優民主國 反滲透管制條例',
                date: '中華民國 115 年 5 月 29 日',
                status: '現行有效 ‧ 戰時防諜命令',
                body: `
                    <p><strong>第一條（立法目的）</strong><br>
                    本條例依據資優民主國憲法第二條及第三條精神制定之，旨在防範境外敵對勢力「卓越人民共和國」之滲透、分化與破壞行為，維護本國教室領土安全、班級紀律及神聖不可侵犯之自主學習秩序。</p>
                    
                    <p><strong>第二條（敵對勢力與共匪之定義）</strong><br>
                    本條例所稱「敵對勢力」或「共匪」，係指卓越人民共和國之官方人員、間諜，或意圖刺探本國考試機密、干擾本國國民適性發展之不法分子。</p>
                    
                    <p><strong>第三條（禁止非法越界罪）</strong><br>
                    卓越人民共和國之國民或其代理人，非經本國行政院內政部或外交部合法許可，擅自跨越邊境進入本國教室領土、座位延伸範圍或走廊防線者，構成「非法越界罪」。<br>
                    前項不法越界者，本國立法委員、司法機關或全體國民得合力將其驅逐出境；情節重大者，強制留置於走廊罰站直至下課。</p>
                    
                    <p><strong>第四條（間諜與刺探機密罪）</strong><br>
                    不法分子意圖為卓越人民共和國刺探、搜集、盜取本國之隨堂測驗答案、段考複習筆記、功課作業範本或重要情報者，構成「間諜刺探機密罪」。<br>
                    犯前項之罪者，處沒收其涉案文具及筆記，並通報導師依法究辦。</p>
                    
                    <p><strong>第五條（文化滲透與反宣傳罪）</strong><br>
                    嚴禁任何人在本國領土內，傳播屬於卓越人民共和國之唯物主義刷題思想、惡性排名觀念或任何破壞本國快樂學習本質之言論。<br>
                    違反前項規定進行文化滲透者，強制執行「聽本國唯一真神開導一小時」之精神淨化處分。</p>
                    
                    <p><strong>第六條（禁止通敵與非法利益往來）</strong><br>
                    本國國民不得與卓越人民共和國進行任何損害國家利益之秘密交易（如：私下交換零食、代寫作業、洩漏本國戰術機密等）。<br>
                    違反本條規定者，視為通敵叛國，依法扣減其「國民幸福津貼」，並勒令於班會時間公開檢討。</p>
                    
                    <p><strong>第七條（戰時緊急沒收與徵用）</strong><br>
                    因應兩國宣戰狀態，作戰期間若發現卓越人民共和國放置於本國邊境之個人物品、體育器材或零食，本國政府基於防衛需要，得依法予以沒收或徵用為國有財產。</p>
                    
                    <p><strong>第八條（施行日期）</strong><br>
                    本條例經總統核准，並經資優民主國立法機關通過後，由總統明令公布施行。</p>
                `
            },
            'anti-involution': {
                title: '資優民主國 憲法內卷管制特殊條例',
                date: '中華民國 115 年 5 月 28 日',
                status: '現行有效 ‧ 國家核心刑法',
                body: `
                    <p><strong>第一條（立法目的與實施程序）</strong><br>
                    本條例依據資優民主國憲政精神制定之。本條例經資優民主國總統核准，並經資優班全體人民過半數之同意後，由總統明令公布實施；修正時亦同。</p>
                    
                    <p><strong>第二條（一級內卷罪）</strong><br>
                    國民自行內卷且學業操行表現傑出者，構成「一級內卷罪」，處三年以上十年以下有期徒刑，得併科新臺幣一千元以上五千元以下罰金。<br>
                    前項之未遂犯，罰之。</p>
                    
                    <p><strong>第三條（二級內卷罪）</strong><br>
                    犯前條第一項之罪而情節輕微者，構成「二級內卷罪」，處三年以下有期徒刑，並強制執行八小時之外卷特殊輔導教育。</p>
                    
                    <p><strong>第四條（三級內卷罪）</strong><br>
                    國民自行內卷而未能取得傑出表現者，構成「三級內卷罪」，免處徒刑，惟須接受十二小時之外卷特殊輔導教育。</p>
                    
                    <p><strong>第五條（教唆與販賣內卷罪）</strong><br>
                    販賣內卷相關教材、資料，或引誘、唆使他人進行內卷行為者，依第三條「二級內卷罪」之規定處斷。</p>
                    
                    <p><strong>第六條（擬制內卷行為）</strong><br>
                    言行中提及、倡導或使用「提升實力」等相關詞彙者，視同進行內卷行為，依其情節分別適用本條例相關規定處罰之。</p>
                    
                    <p><strong>第七條（團體內卷罪）</strong><br>
                    三人以上共同意圖進行團體內卷者，構成「團體內卷罪」，其首謀及核心參與者處五年以下有期徒刑，且非經執行完畢，不得假釋。</p>
                    
                    <p><strong>第八條（違法阻確與免責事由）</strong><br>
                    行為人雖有內卷事實，但若具備下列各款條件之一者，免予追究其法律責任：<br>
                    一、持有主管機關核發之合格內卷證明文件者。<br>
                    二、經合法執業醫師開立內卷處方箋者。<br>
                    三、經專業鑑定，其智能商數（IQ）低於八十者。</p>
                `
            },
            'public-morality': {
                title: '資優民主國 妨害風化管理處罰條例',
                date: '中華民國 115 年 5 月 29 日',
                status: '現行有效 ‧ 社會秩序法規',
                body: `
                    <p><strong>一、保障核心：</strong><br>
                    本條例旨在平衡「個人自由」與「公共秩序」，明確規範妨害風化行為之裁罰標準，確立身心健康與尊嚴維護。</p>
                    
                    <p><strong>二、三大核心規範：</strong></p>
                    
                    <p><strong>1. 公共秩序維護：</strong><br>
                    嚴禁於大眾運輸、公園等公眾場所進行猥褻行為，亦不得強行散布或販賣猥褻物品，違者處以罰鍰並沒入其物品。</p>
                    
                    <p><strong>2. 兒少絕對保護：</strong><br>
                    凡涉及未滿十八歲國民之性影像散布、持有、或誘騙媒介者，列為重罪。除依法沒入電子設備外，加處高額罰鍰並強制接受唯一真神的三週心理輔導。</p>
                    
                    <p><strong>3. 學術藝術免責：</strong><br>
                    基於醫療、學術研究或純粹藝術創作，且已採取嚴格成人年齡驗證與遮蔽隔離措施者，不予處罰。</p>
                `
            },
            'education-management': {
                title: '資優民主國 學習與教育內卷管理處罰條例',
                date: '中華民國 115 年 5 月 29 日',
                status: '現行有效 ‧ 快樂學習保障法',
                body: `
                    <p><strong>一、立法目的：</strong><br>
                    為杜絕教育體制中「唯有讀書高」之畸形風氣，禁止超前教育、死記硬背等消磨國民創造力之行為，特制定本條例。</p>
                    
                    <p><strong>二、三大核心違法行為與裁罰：</strong></p>
                    
                    <p><strong>1. 禁止超前與過度學習（刷題條款）：</strong><br>
                    嚴禁學生在法定課堂時間外，每日進行重複性死記硬背、機械式刷題超過兩小時。違者將沒收教材，並強制進行「戶外運動」或「電玩遊戲」進行腦部減壓。</p>
                    
                    <p><strong>2. 禁止無效證照與軍備競賽：</strong><br>
                    嚴禁家長強迫學童於義務教育階段考取非適性之各類高級語文、檢定證照。凡被舉發導致兒童睡眠不足八小時之家庭，將扣減家長之「國民幸福津貼」。</p>
                    
                    <p><strong>3. 嚴禁教育機構惡性排名：</strong><br>
                    學校與校外補習班嚴禁公開張貼「英雄榜」、「成績排名表」或宣傳「狀元文化」。違者除處三十萬資優幣罰鍰外，並勒令機構負責人參加「幼兒遊戲心理學」重修班。</p>
                    
                    <p><strong>三、合法學習之豁免範圍：</strong><br>
                    凡基於個人興趣，自主進行之園藝、烹飪、哲學思辨、藝術塗鴉、動漫研究等「非功利性學習」，一律不受本條例限制。學校應全面推行「發呆課」與「白日夢創新時間」，此類課程之出席率得抵免傳統學科分數。</p>
                `
            }
        };
        
        return laws[lawType] || {
            title: '資優民主國 法規文件',
            date: '115年',
            status: '有效',
            body: '<p>法規內容載入中或正在查核審議中...</p>'
        };
    }
    
    // 全域通知功能
    window.showNotification = function(message) {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <span class="notification-close">&times;</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        const timer = setTimeout(() => {
            notification.remove();
        }, 3200);
        
        notification.querySelector('.notification-close').addEventListener('click', function() {
            clearTimeout(timer);
            notification.remove();
        });
    };

    // ==========================================================================
    // 5. 網站即時編輯模式與內容管理系統 (Live Site Editor & CMS)
    // ==========================================================================
    const safeFetch = function() {
        const fetchFn = (typeof window !== 'undefined' && window.fetch) ? window.fetch : fetch;
        return fetchFn.apply(window, arguments);
    };

    const DEFAULT_SITE_CONTENT = {
        site_title: "資優民主國",
        site_sub_en: "Democratic Meritocracy of Ziyu",
        motto_core: "反對惡性內卷，捍衛自由學習",
        motto_will: "基於資優班全體人民之共同意志",
        nav_brand: "資優民主國",
        founding_badge: "立國紀念 2026.05.28",
        intro_lead: "資優民主國成立於中華民國115年5月28日，由資優班全體人民基於共同意志，以<strong>「反對惡性內卷，捍衛自由學習」</strong>為立國終極核心所建立。國家主權屬於資優班全體人民，實施憲法保障發呆與自主思辨之神聖基本人權。",
        president_name: "總統：蘇◯旭",
        president_sub: "首屆直選以8票絕對多數當選",
        faith_name: "唯一真神：廖◯茹",
        faith_sub: "最高精神指導與心理淨化導師",
        territory_name: "鳳甲基地及各直轄特區",
        territory_sub: "暫以資優班教室及延伸學習空間為統治權",
        peace_name: "已停戰（和平協定生效）",
        peace_sub: "戰亂狀態解除，全面專注自由學習與反內卷",
        dashboard_status_text: "和平狀態 ‧ 已停止戰爭（停戰協議生效中）",
        join_form_url: "https://forms.gle/EYzDqYnR1bhVgxPz7",
        diplo_form_url: "https://forms.gle/APfTxiSsejvtdkhQ8",
        diplo_banner_title: "【全球建交倡議】資優民主國戰後和平外交全面啟動！",
        diplo_banner_desc: "停戰協定已生效！誠邀世界各國、微型國家（Micronation）、各級學校班級及學生自治社團締結平等和平夥伴關係，互派大使、相互承認法權與發呆特權！",
        diplo_title: "資優民主國 國際建交大會",
        diplo_intro_p: "資優民主國致力於在國際微國家社群與青年自治領域建立平等、和平、反內卷之夥伴關係。不論貴國領土位於何處，只要尊重多元、守護自由學習，我們誠摯歡迎遞交建交照會！",
        diplo_p1_title: "🕊️ 和平共處與領土尊重",
        diplo_p1_desc: "互相尊重主權與教室領土完整，互不侵犯，互不干涉彼此課堂自治內政。",
        diplo_p2_title: "🛡️ 反內卷共同防禦協定",
        diplo_p2_desc: "共同抵禦刷題作業主義滲透與排名焦慮，互相給予精神慰藉與安全避風港。",
        diplo_p3_title: "🔬 學術與創意互惠",
        diplo_p3_desc: "促進自製微型專案、發呆哲學思考、藝術創作與課後非功利嗜好交流。",
        footer_brand: "資優民主國 DEMOCRATIC MERITOCRACY OF ZIYU",
        footer_motto: "「反對惡性內卷，捍衛自由學習」",
        footer_copy: "中華民國 115 年 (2026) ‧ 基於資優班全體人民之共同意志 ‧ 永久保存"
    };

    let currentSiteContent = Object.assign({}, DEFAULT_SITE_CONTENT);
    let isSiteEditMode = false;

    // 顯示 Toast 提示
    function showSiteToast(message, isSuccess = true) {
        const toast = document.getElementById('siteToast');
        const msgEl = document.getElementById('siteToastMsg');
        if (!toast || !msgEl) return;
        
        msgEl.textContent = message;
        toast.style.borderLeftColor = isSuccess ? '#10b981' : '#ef4444';
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 將資料套用至網頁 DOM 元素
    function applySiteContentToDOM(content) {
        if (!content) return;
        
        document.querySelectorAll('[data-site-editable]').forEach(el => {
            const key = el.getAttribute('data-site-editable');
            if (content[key] !== undefined) {
                // 如果內容包含 HTML 標籤（如 strong），允許 innerHTML
                if (content[key].includes('<') && content[key].includes('>')) {
                    el.innerHTML = content[key];
                } else {
                    el.textContent = content[key];
                }
            }
        });

        // 檢查表單按鈕連結
        if (content.join_form_url) {
            const joinBtns = document.querySelectorAll('a[href*="forms.gle/EYzDqYnR1bhVgxPz7"]');
            joinBtns.forEach(btn => btn.setAttribute('href', content.join_form_url));
        }

        if (content.diplo_form_url) {
            const diploFormBtn = document.getElementById('diploFormBtn');
            if (diploFormBtn) diploFormBtn.setAttribute('href', content.diplo_form_url);
        }
    }

    // 從當前畫面 DOM 讀取修改後的資料
    function collectSiteContentFromDOM() {
        const collected = Object.assign({}, currentSiteContent);
        document.querySelectorAll('[data-site-editable]').forEach(el => {
            const key = el.getAttribute('data-site-editable');
            if (key) {
                collected[key] = el.innerHTML.trim();
            }
        });
        return collected;
    }

    // 載入網站內容（伺服器優先，localStorage 作為後備）
    async function loadSiteContent() {
        try {
            const res = await safeFetch('/api/site-content');
            if (res.ok) {
                const data = await res.json();
                if (data && data.success && data.content) {
                    currentSiteContent = Object.assign({}, DEFAULT_SITE_CONTENT, data.content);
                    applySiteContentToDOM(currentSiteContent);
                    return;
                }
            }
        } catch (e) {
            console.warn('無法從伺服器取得 site-content，使用本機快取:', e);
        }

        // 本機快取備用
        try {
            const local = localStorage.getItem('ziyou_live_site_content');
            if (local) {
                currentSiteContent = Object.assign({}, DEFAULT_SITE_CONTENT, JSON.parse(local));
                applySiteContentToDOM(currentSiteContent);
            }
        } catch (err) {
            console.error('解析 localStorage 失敗:', err);
        }
    }

    // 管理員編輯密碼 (KEY) 授權管理
    let currentEditKey = sessionStorage.getItem('ziyou_site_key') || '';

    // 向後端驗證 KEY 密碼
    async function verifyAdminKey(key) {
        if (!key || !key.trim()) {
            return { success: false, message: '請輸入授權密碼' };
        }
        try {
            const res = await safeFetch('/api/auth/verify-key', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: key.trim() })
            });
            const data = await res.json();
            return { success: res.ok && data.success, message: data.message || '密碼驗證失敗' };
        } catch (err) {
            return { success: false, message: '無法連線至伺服器驗證，請檢查連線' };
        }
    }

    // 儲存網站內容（攜帶 KEY 授權標頭）
    async function saveSiteContent(contentToSave) {
        currentSiteContent = Object.assign({}, currentSiteContent, contentToSave);
        
        // 1. 存入 localStorage
        try {
            localStorage.setItem('ziyou_live_site_content', JSON.stringify(currentSiteContent));
        } catch (e) {
            console.warn('localStorage 寫入失敗:', e);
        }

        // 2. 存入伺服器 API（需通過 KEY 密碼驗證）
        let serverSuccess = false;
        let errorMessage = '';
        try {
            const res = await safeFetch('/api/site-content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-edit-key': currentEditKey
                },
                body: JSON.stringify(currentSiteContent)
            });

            if (res.status === 401) {
                // 密碼無效或已被更新
                currentEditKey = '';
                sessionStorage.removeItem('ziyou_site_key');
                toggleEditMode(false);
                showSiteToast('❌ 授權密碼 (KEY) 錯誤或已過期，請重新驗證！', false);
                openAuthModal();
                return;
            }

            if (res.ok) {
                const data = await res.json();
                serverSuccess = data.success;
            } else {
                const errData = await res.json();
                errorMessage = errData.error || '伺服器儲存拒絕';
            }
        } catch (e) {
            console.warn('伺服器儲存連線失敗:', e);
        }

        applySiteContentToDOM(currentSiteContent);
        if (serverSuccess) {
            showSiteToast('✅ 網站內容已成功儲存並同步至伺服器檔案！');
        } else if (errorMessage) {
            showSiteToast(`⚠️ ${errorMessage}`, false);
        } else {
            showSiteToast('✅ 內容已儲存於本機瀏覽器（伺服器暫時無法連線）');
        }
    }

    // 重設網站內容為原始預設（需 KEY 授權）
    async function resetSiteContent() {
        if (!confirm('確定要將全站內容還原為系統原廠預設嗎？所有自訂修改將被清除。')) {
            return;
        }

        try {
            const res = await safeFetch('/api/site-content/reset', {
                method: 'POST',
                headers: {
                    'x-edit-key': currentEditKey
                }
            });

            if (res.status === 401) {
                currentEditKey = '';
                sessionStorage.removeItem('ziyou_site_key');
                toggleEditMode(false);
                showSiteToast('❌ 授權密碼 (KEY) 錯誤，無法重設！', false);
                openAuthModal();
                return;
            }
        } catch (e) {
            console.warn('伺服器重設失敗:', e);
        }

        localStorage.removeItem('ziyou_live_site_content');
        currentSiteContent = Object.assign({}, DEFAULT_SITE_CONTENT);
        applySiteContentToDOM(currentSiteContent);
        showSiteToast('🔄 網站內容已完全還原為系統預設！');
    }

    // 開啟密碼驗證視窗
    function openAuthModal() {
        const authModal = document.getElementById('siteAuthModal');
        const keyInput = document.getElementById('siteAuthKeyInput');
        const errEl = document.getElementById('authErrorMsg');
        if (errEl) { errEl.style.display = 'none'; errEl.textContent = ''; }
        if (keyInput) keyInput.value = '';
        if (authModal) {
            authModal.classList.add('active');
            setTimeout(() => {
                if (keyInput) keyInput.focus();
            }, 100);
        }
    }

    // 關閉密碼驗證視窗
    function closeAuthModal() {
        const authModal = document.getElementById('siteAuthModal');
        if (authModal) authModal.classList.remove('active');
    }

    // 啟動編輯模式
    function activateEditMode() {
        isSiteEditMode = true;
        document.body.classList.add('site-editing-active');
        const toggleBtn = document.getElementById('toggleEditBtn');
        const editorBar = document.getElementById('siteEditorBar');

        if (toggleBtn) {
            toggleBtn.classList.add('active');
            toggleBtn.textContent = '✕ 結束編輯';
        }
        if (editorBar) editorBar.classList.add('active');

        // 啟用所有可編輯區塊的 contenteditable
        document.querySelectorAll('[data-site-editable]').forEach(el => {
            el.setAttribute('contenteditable', 'true');
            el.setAttribute('title', '【點擊可直接修改文字】修改完成後請按下方「儲存變更」');
        });
    }

    // 關閉編輯模式
    function deactivateEditMode() {
        isSiteEditMode = false;
        document.body.classList.remove('site-editing-active');
        const toggleBtn = document.getElementById('toggleEditBtn');
        const editorBar = document.getElementById('siteEditorBar');

        if (toggleBtn) {
            toggleBtn.classList.remove('active');
            toggleBtn.textContent = '✏️ 編輯網站';
        }
        if (editorBar) editorBar.classList.remove('active');

        // 取消 contenteditable
        document.querySelectorAll('[data-site-editable]').forEach(el => {
            el.removeAttribute('contenteditable');
            el.removeAttribute('title');
        });
    }

    // 請求進入或退出編輯模式（需密碼驗證）
    async function requestToggleEditMode() {
        if (isSiteEditMode) {
            deactivateEditMode();
            showSiteToast('👁️ 已退出編輯模式');
            return;
        }

        // 若尚未進入編輯模式，檢查是否有儲存且有效的 key
        if (currentEditKey) {
            const verifyRes = await verifyAdminKey(currentEditKey);
            if (verifyRes.success) {
                activateEditMode();
                showSiteToast('✏️ 已驗證 KEY 授權，點擊任一文字即可直接修改！');
                return;
            } else {
                currentEditKey = '';
                sessionStorage.removeItem('ziyou_site_key');
            }
        }

        // 彈出密碼輸入框
        openAuthModal();
    }

    // 切換編輯模式的通用封裝
    function toggleEditMode(forceState) {
        if (forceState === false) {
            deactivateEditMode();
        } else if (forceState === true) {
            activateEditMode();
        } else {
            requestToggleEditMode();
        }
    }

    // 鎖定並登出編輯權限
    function lockAndExitEdit() {
        currentEditKey = '';
        sessionStorage.removeItem('ziyou_site_key');
        deactivateEditMode();
        showSiteToast('🔒 已鎖定並清除編輯權限');
    }

    // 初始化事件監聽
    const toggleBtn = document.getElementById('toggleEditBtn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', requestToggleEditMode);
    }

    const closeEditorBtn = document.getElementById('closeEditorBtn');
    if (closeEditorBtn) {
        closeEditorBtn.addEventListener('click', () => deactivateEditMode());
    }

    const lockEditorBtn = document.getElementById('lockEditorBtn');
    if (lockEditorBtn) {
        lockEditorBtn.addEventListener('click', lockAndExitEdit);
    }

    // 密碼驗證表單事件
    const siteAuthForm = document.getElementById('siteAuthForm');
    const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');
    const cancelAuthModalBtn = document.getElementById('cancelAuthModalBtn');
    const togglePwdBtn = document.getElementById('togglePasswordVisibilityBtn');
    const siteAuthKeyInput = document.getElementById('siteAuthKeyInput');
    const authErrorMsg = document.getElementById('authErrorMsg');

    if (closeAuthModalBtn) closeAuthModalBtn.addEventListener('click', closeAuthModal);
    if (cancelAuthModalBtn) cancelAuthModalBtn.addEventListener('click', closeAuthModal);

    if (togglePwdBtn && siteAuthKeyInput) {
        togglePwdBtn.addEventListener('click', () => {
            const isPwd = siteAuthKeyInput.getAttribute('type') === 'password';
            siteAuthKeyInput.setAttribute('type', isPwd ? 'text' : 'password');
            togglePwdBtn.textContent = isPwd ? '🙈' : '👁️';
        });
    }

    if (siteAuthForm) {
        siteAuthForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const inputVal = siteAuthKeyInput ? siteAuthKeyInput.value.trim() : '';
            if (!inputVal) return;

            const submitBtn = document.getElementById('submitAuthBtn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>⏳</span> 驗證中...';
            }

            const result = await verifyAdminKey(inputVal);

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>🔓</span> 驗證身分並進入編輯';
            }

            if (result.success) {
                currentEditKey = inputVal;
                sessionStorage.setItem('ziyou_site_key', inputVal);
                closeAuthModal();
                activateEditMode();
                showSiteToast('🔓 密碼驗證成功！已進入網站編輯模式');
            } else {
                if (authErrorMsg) {
                    authErrorMsg.textContent = `❌ ${result.message || '密碼錯誤，請重新輸入'}`;
                    authErrorMsg.style.display = 'block';
                }
                if (siteAuthKeyInput) {
                    siteAuthKeyInput.focus();
                    siteAuthKeyInput.select();
                }
            }
        });
    }

    const saveBtn = document.getElementById('saveSiteContentBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const updated = collectSiteContentFromDOM();
            saveSiteContent(updated);
        });
    }

    const resetBtn = document.getElementById('resetSiteContentBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetSiteContent);
    }

    // 網站設定抽屜 / 彈出視窗相關邏輯
    const siteModal = document.getElementById('siteEditorModal');
    const openSettingsBtn = document.getElementById('openSiteSettingsBtn');
    const closeSiteModalBtn = document.getElementById('closeSiteModalBtn');
    const cancelModalBtn = document.getElementById('cancelModalBtn');
    const siteSettingsForm = document.getElementById('siteSettingsForm');

    function openSiteModal() {
        if (!siteModal) return;
        // 帶入當前數值
        document.getElementById('cfg_site_title').value = currentSiteContent.site_title || '';
        document.getElementById('cfg_site_sub_en').value = currentSiteContent.site_sub_en || '';
        document.getElementById('cfg_motto_core').value = currentSiteContent.motto_core || '';
        document.getElementById('cfg_president_name').value = currentSiteContent.president_name || '';
        document.getElementById('cfg_faith_name').value = currentSiteContent.faith_name || '';
        document.getElementById('cfg_territory_name').value = currentSiteContent.territory_name || '';
        document.getElementById('cfg_peace_name').value = currentSiteContent.peace_name || '';
        document.getElementById('cfg_intro_lead').value = currentSiteContent.intro_lead || '';
        document.getElementById('cfg_join_form_url').value = currentSiteContent.join_form_url || '';
        document.getElementById('cfg_diplo_form_url').value = currentSiteContent.diplo_form_url || '';
        document.getElementById('cfg_diplo_banner_desc').value = currentSiteContent.diplo_banner_desc || '';
        
        siteModal.classList.add('active');
    }

    function closeSiteModal() {
        if (siteModal) siteModal.classList.remove('active');
    }

    if (openSettingsBtn) openSettingsBtn.addEventListener('click', openSiteModal);
    if (closeSiteModalBtn) closeSiteModalBtn.addEventListener('click', closeSiteModal);
    if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeSiteModal);

    if (siteSettingsForm) {
        siteSettingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const newValues = {
                site_title: document.getElementById('cfg_site_title').value.trim(),
                site_sub_en: document.getElementById('cfg_site_sub_en').value.trim(),
                motto_core: document.getElementById('cfg_motto_core').value.trim(),
                president_name: document.getElementById('cfg_president_name').value.trim(),
                faith_name: document.getElementById('cfg_faith_name').value.trim(),
                territory_name: document.getElementById('cfg_territory_name').value.trim(),
                peace_name: document.getElementById('cfg_peace_name').value.trim(),
                intro_lead: document.getElementById('cfg_intro_lead').value.trim(),
                join_form_url: document.getElementById('cfg_join_form_url').value.trim(),
                diplo_form_url: document.getElementById('cfg_diplo_form_url').value.trim(),
                diplo_banner_desc: document.getElementById('cfg_diplo_banner_desc').value.trim(),
            };

            saveSiteContent(newValues);
            closeSiteModal();
        });
    }

    // 匯出備份 (JSON)
    const exportBackupBtn = document.getElementById('exportBackupBtn');
    if (exportBackupBtn) {
        exportBackupBtn.addEventListener('click', function() {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentSiteContent, null, 2));
            const dlAnchor = document.createElement('a');
            dlAnchor.setAttribute("href", dataStr);
            dlAnchor.setAttribute("download", `ziyou_site_backup_${new Date().toISOString().slice(0,10)}.json`);
            dlAnchor.click();
            showSiteToast('📥 網站設定備份已成功下載！');
        });
    }

    // 匯入備份 (JSON)
    const importBackupBtn = document.getElementById('importBackupBtn');
    const importBackupInput = document.getElementById('importBackupInput');
    if (importBackupBtn && importBackupInput) {
        importBackupBtn.addEventListener('click', () => importBackupInput.click());
        importBackupInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(evt) {
                try {
                    const parsed = JSON.parse(evt.target.result);
                    saveSiteContent(parsed);
                    closeSiteModal();
                    showSiteToast('📤 網站設定備份已成功匯入並套用！');
                } catch (err) {
                    alert('檔案格式錯誤，請確保為有效的 JSON 備份檔。');
                }
            };
            reader.readAsText(file);
        });
    }

    // 首次載入網站內容
    loadSiteContent();
});
