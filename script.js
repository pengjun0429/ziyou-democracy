document.addEventListener('DOMContentLoaded', function() {
    // 計算建國天數
    function calculateDaysSinceFounding() {
        const foundingDate = new Date('2026-05-28');
        const today = new Date();
        const diffTime = Math.abs(today - foundingDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        document.getElementById('days-since-founding').textContent = diffDays;
    }
    
    calculateDaysSinceFounding();
    
    // 平滑滾動到錨點
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 查看法規按鈕功能
    const viewLawButtons = document.querySelectorAll('.view-law');
    viewLawButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lawType = this.getAttribute('data-law');
            showLawModal(lawType);
        });
    });
    
    // 法規彈出視窗
    function showLawModal(lawType) {
        const lawContent = getLawContent(lawType);
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="law-text">${lawContent}</div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 關閉彈出視窗
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', function() {
            modal.remove();
        });
        
        // 點擊外部關閉
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    // 獲取法規內容
    function getLawContent(lawType) {
        const laws = {
            'anti-infiltration': `
                <h3>資優民主國 反滲透管制條例</h3>
                <p>中華民國 115 年 5 月 29 日公布實施</p>
                <div class="law-articles">
                    <p><strong>第一條（立法目的）</strong><br>
                    本條例依據資優民主國憲法第二條及第三條精神制定之，旨在防範境外敵對勢力「卓越人民共和國」之滲透、分化與破壞行為，維護本國教室領土安全、班級紀律及神聖不可侵犯之學習秩序。</p>
                    
                    <p><strong>第二條（敵對勢力與共匪之定義）</strong><br>
                    本條例所稱「敵對勢力」或「共匪」，係指卓越人民共和國之官方人員、間諜，或意圖刺探本國考試機密、干擾本國國民適性發展之不法分子。</p>
                    
                    <p><strong>第三條（禁止非法越界罪）</strong><br>
                    卓越人民共和國之國民或其代理人，非經本國行政院內政部或外交部合法許可，擅自跨越邊境進入本國教室領土、座位延伸範圍或走廊防線者，構成「非法越界罪」。<br>
                    前項不法越界者，本國立法委員、司法機關或全體國民得合力將其驅逐出境；情節重大者，強制留置於走廊罰站直至下課。</p>
                    
                    <p><strong>第四條（間諜與刺探機密罪）</strong><br>
                    不法分子意圖為卓越人民共和國刺探、搜集、盜取本國之隨堂測驗答案、段考複習筆記、功課作業範本或重要八卦情報者，構成「間諜刺探機密罪」。<br>
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
                </div>
            `,
            'anti-involution': `
                <h3>資優民主國 憲法內卷管制特殊條例</h3>
                <p>中華民國 115 年 5 月 28 日公布實施</p>
                <div class="law-articles">
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
                </div>
            `,
            'public-morality': `
                <h3>資優民主國 妨害風化管理處罰條例</h3>
                <p>資優民主國115年5月29日公布實施</p>
                <div class="law-articles">
                    <p><strong>一、保障核心：</strong><br>
                    本條例旨在平衡「個人自由」與「公共秩序」，明確規範妨害風化行為之裁罰標準。</p>
                    
                    <p><strong>二、三大核心規範：</strong></p>
                    
                    <p><strong>1. 公共秩序維護：</strong><br>
                    嚴禁於大眾運輸、公園等公眾場所進行猥褻行為，亦不得強行散布或販賣猥褻物品，違者處以罰鍰並沒入其物品。</p>
                    
                    <p><strong>2. 兒少絕對保護：</strong><br>
                    凡涉及未滿十八歲國民之性影像散布、持有、或誘騙媒介者，列為重罪。除依法沒入電子設備外，加處高額罰鍰並強制接受唯一真神的三週心理輔導。</p>
                    
                    <p><strong>3. 學術藝術免責：</strong><br>
                    基於醫療、學術研究或純粹藝術創作，且已採取嚴格成人年齡驗證與遮蔽隔離措施者，不予處罰。</p>
                </div>
            `,
            'education-management': `
                <h3>資優民主國 學習與教育內卷管理處罰條例</h3>
                <p>資優民主國115年5月29日公布實施</p>
                <div class="law-articles">
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
                </div>
            `
        };
        
        return laws[lawType] || '<p>法規內容載入中...</p>';
    }
    
    // 快速操作按鈕功能
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent;
            showNotification(`正在執行：${action}`);
        });
    });
    
    // 通知功能
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <span class="notification-close">&times;</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // 3秒後自動關閉
        setTimeout(() => {
            notification.remove();
        }, 3000);
        
        // 點擊關閉
        notification.querySelector('.notification-close').addEventListener('click', function() {
            notification.remove();
        });
    }
    
    // 添加動態CSS樣式
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        
        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            max-width: 800px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        }
        
        .close-modal {
            position: absolute;
            top: 1rem;
            right: 1rem;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
        
        .close-modal:hover {
            color: #333;
        }
        
        .law-text h3 {
            color: #2c3e50;
            margin-bottom: 1rem;
        }
        
        .law-articles p {
            margin-bottom: 1rem;
            text-align: justify;
        }
        
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 1rem;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            z-index: 1001;
            animation: slideIn 0.3s ease;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .notification-close {
            margin-left: 1rem;
            cursor: pointer;
            font-size: 1.2rem;
        }
    `;
    
    document.head.appendChild(dynamicStyles);
});