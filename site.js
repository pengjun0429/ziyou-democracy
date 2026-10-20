
const constitution = {
  id: 'constitution',
  title: '資優民主國憲法',
  shortTitle: '憲法（正式修訂版）',
  level: '憲法位階',
  eyebrow: '壹・憲法位階 / 115.10.20 正式修訂',
  description: '資優民主國之根本法。本版保留原憲法十條體例，並以較正式的法典語言修正條文內容，補足人民權利、政府權限、緊急命令監督與憲法最高性。',
  badge: '正式修訂',
  articles: [
    ['前言｜制憲宗旨', '資優民主國為保障人民之人格尊嚴、自由發展、平等參與及安心學習，建立以人民主權、民主政治、法治原則與權力分立為基礎之憲政秩序，制定本憲法。'],
    ['第一條｜國體與主權', '資優民主國為民主共和國。國家主權屬於全體人民；一切國家權力之行使，應以憲法及人民之授權為依據。'],
    ['第二條｜領域與治理範圍', '本國之治理範圍，以資優班教室、共同使用之學習空間及依合法程序納入管理之活動範圍為限。領域之增減或治理權限之變更，應經法律明定。'],
    ['第三條｜憲政體制與法治原則', '資優民主國採民主政治、權力分立與依法行政之憲政體制。建國初期或發生重大危機時，得依法律採取必要之集中行政措施；其期間、範圍及監督方式，應由法律明定，不得免除國家機關受憲法拘束之責任。任何機關或個人，不得以職位、政治多數、班級慣例或其他名義免除憲法與法律之拘束。'],
    ['第四條｜平等與人格尊嚴', '人民不分性別、座位、智商、入學成績、家庭背景、身心狀況或個人興趣，在法律上一律平等。國家不得無正當理由為差別待遇；差別待遇之目的、手段及其效果，應符合比例原則。人民之人格尊嚴、身體自主、隱私、休息及不受羞辱之權利，應受國家保障。'],
    ['第五條｜自由權之保障', '人民之言論、講學、著作、出版、藝術創作及合理休閒活動之自由，應予保障。對前項自由之限制，應以法律定之，並以保護他人權利、公共安全或必要之學習秩序為限。人民受調查、限制或處分前，應被告知事由、依據及可能結果，並獲得合理之陳述、申辯及救濟機會。處罰應遵守法律明確性、罪責相當與比例原則。'],
    ['第六條｜教育、適性發展與人民義務', '人民有接受教育、選擇適當學習方式及依其興趣與能力發展之權利。國家應維護學習、休息、運動與自由探索之平衡，不得以單一排名、考試結果或過度競爭作為評價人民價值之唯一依據。人民有遵守憲法及合法法律之義務，並應尊重他人之人格尊嚴、學習權、休息權與安全。'],
    ['第七條｜總統與政府組織', '總統為國家元首，代表國家並統合行政政策。總統由人民直接選舉之，任期一年，得連選連任一次。總統公布法律、依法任命官員及發布行政命令；其職權不得逾越憲法與法律之授權。國家設立立法院、行政院及司法院，分別行使立法、行政及司法權。人民之權利受公權力侵害時，得依法請求司法救濟。'],
    ['第八條｜憲法最高性、緊急命令與修憲', '本憲法為國家最高規範。法律、命令、行政措施及班級規範與本憲法牴觸者，於牴觸範圍內無效。《內卷管制特殊條例》得依法律程序作為憲法性特別法施行，但不得具有優於本憲法之效力。國家遭遇急迫危險時，總統得依法律發布緊急命令；緊急命令應載明原因、措施、範圍及期限，並於發布後七日內送交立法院追認。人格尊嚴、法律明確性、正當程序及司法救濟之核心保障，不得停止適用。憲法修正案須經立法院全體委員四分之三出席，出席委員四分之三決議提出，並經人民複決同意後，由總統公布；修憲不得破壞民主共和、人民主權、權力分立、平等原則、人格尊嚴、正當程序及司法救濟之核心內容。'],
    ['第九條｜施行日期', '本憲法自公布日起施行。'],
    ['第十條｜法律不溯及既往', '法律原則上不得溯及既往；涉及刑罰或其他不利處分者，應以行為時已生效且內容明確之法律為依據。但新法對人民較為有利者，得依法律規定適用之。']
  ]
}
const laws = [
  { id: 'anti-spiral', level: '憲法性特別法', title: '資優民主國內卷管制特殊條例', date: '115.05.31', tag: '核心法規', desc: '依法制定之憲法性特別法，旨在防止惡性內卷；本版補上比例原則、正當程序與合理免責。', articles: [['第一條｜立法目的', '本條例旨在抑制以排名、比較與過度競爭傷害人民身心之惡性內卷，推動休息、適性發展與有品質的學習。'], ['第二條｜比例原則', '依本條例採取之輔導、限制或處分，應依行為情節、實際影響與改善可能性分級，不得以羞辱、暴力或不必要之剝奪替代教育。'], ['第三條｜免責與輔導', '基於醫療、研究、個人興趣或經合法程序認定之合理學習行為，不視為惡性內卷。需要協助者，優先提供外卷輔導、休息安排與資源支持。']] },
  { id: 'infiltration', level: '法律位階', title: '資優民主國反滲透管制條例', date: '115.05.29', tag: '國安與秩序', desc: '防範境外勢力刺探考試機密、破壞教室秩序與干擾適性發展。', articles: [['第一條｜立法目的', '為保護學習資料、公共秩序與人民安全，防範境外勢力以欺騙、脅迫或未經授權之方式介入國家事務。'], ['第二條｜程序保障', '調查與限制措施應有明確事由、期限與申訴機制，不得以模糊的政治標籤取代具體證據。']] },
  { id: 'education', level: '法律位階', title: '資優民主國學習與教育管理條例', date: '115.05.29', tag: '快樂學習', desc: '禁止超前教育與惡性排名，將白日夢、發呆與非功利性學習納入適性發展。', articles: [['第一條｜學習平衡', '國家應維護課堂學習、休息、運動與自由探索之平衡，不以單一考試結果作為評價人民之唯一依據。'], ['第二條｜多元發展', '園藝、烹飪、哲學、藝術、動漫研究與其他非功利性學習，均受國家尊重與合理支持。']] },
  { id: 'morality', level: '法律位階', title: '資優民主國公共秩序與兒少保護條例', date: '115.05.29', tag: '權利保障', desc: '把公共場所秩序與兒少保護集中整理，避免法規散落與責任不清。', articles: [['第一條｜公共秩序', '人民於公共場所應尊重他人安全與人格，不得以暴力、脅迫或強制方式妨害他人。'], ['第二條｜兒少保護', '涉及兒童及少年之剝削、誘騙或性影像散布者，依法從重處理，並提供受害者保護、陪伴與救濟。']] },
  { id: 'org', level: '行政命令位階', title: '政府機關組織規程與首長名冊', date: '115.05.28', tag: '組織名冊', desc: '公布總統府、立法院、行政院、司法院與各部會的職掌與現任首長。', articles: [['第一條｜機關配置', '總統府負責國家統合；立法院負責立法與監督；行政院負責政策執行；司法院負責審判與法規解釋。'], ['第二條｜公開原則', '首長名冊、職掌與代理順序應公開，職位空缺時應依程序補實，不得以永久暫代取代民主授權。']] }
]

const history = [
  ['115.05.28', '建國日', '資優民主國成立，公布第一批法規，並以直選產生首任總統。'],
  ['115.05.29', '制憲與建法', '開始制憲，公布反滲透、公共秩序與學習教育管理相關法規。'],
  ['115.05.30', '非常時期', '發布對外戰亂臨時條款；本次網站整理將非常條款與常態憲政規則分開呈現。'],
  ['115.05.31', '第一次修憲', '增訂不溯及既往與憲法性特別法之位階說明，建立法規全書的四級索引。'],
  ['115.10.20', '第二次修憲', '重新編排憲法條號，補上權利保障、正當程序、政府分工與較清楚的修憲門檻。']
]

const app = document.querySelector('#app')
let state = { view: 'home', query: '', level: '全部' }
const allLaws = [constitution, ...laws]

function icon(name) {
  const icons = { seal: '✦', search: '⌕', arrow: '↗', book: '▤', scale: '⚖', history: '◷', check: '✓' }
  return icons[name] || '•'
}
function esc(value) { return value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])) }
function articleList(items) { return items.map(([title, body], i) => `<article class="article"><div class="article-no">${String(i + 1).padStart(2, '0')}</div><div><h3>${esc(title)}</h3><p>${esc(body)}</p></div></article>`).join('') }
function lawCard(law, index) { return `<button class="law-card" data-law="${law.id}" style="--delay:${index * 45}ms"><div class="law-card-top"><span class="law-level">${esc(law.level)}</span><span class="law-date">${esc(law.date || '115.10.20')}</span></div><h3>${esc(law.title)}</h3><p>${esc(law.desc || law.description)}</p><div class="law-card-bottom"><span>${esc(law.tag || '法規全文')}</span><span>${icon('arrow')}</span></div></button>` }
function header() { return `<header class="site-header"><a class="wordmark" href="#/"><span class="seal">${icon('seal')}</span><span><b>資優民主國</b><small>法規全書 / OFFICIAL CODE</small></span></a><nav><a href="#/constitution" class="${state.view === 'constitution' ? 'active' : ''}">憲法</a><a href="#/laws" class="${state.view === 'laws' ? 'active' : ''}">法規索引</a><a href="#/history" class="${state.view === 'history' ? 'active' : ''}">建國沿革</a></nav><div class="header-status"><span class="status-dot"></span>第 02 次修憲完成</div></header>` }
function footer() { return `<footer><div><span class="footer-mark">${icon('seal')}</span><strong>資優民主國法規全書</strong></div><span>建於 115 年 · 以法治管理內卷，以幽默保存秩序</span><a href="https://hackmd.io/joJDlumQTnavUHiZIxgZig" target="_blank" rel="noreferrer">原始編纂文件 ${icon('arrow')}</a></footer>` }
function home() {
  return `<main class="home"><section class="hero"><div class="hero-copy"><div class="kicker"><span class="red-rule"></span> OFFICIAL CODEX / 115.10.20</div><h1>法規可以很嚴肅，<em>國民不必。</em></h1><p class="hero-lead">一部把班級公約、國家法典與反內卷宣言編成公共文件的官方入口。先讀憲法，再決定今天要不要內卷。</p><div class="hero-actions"><a class="primary-btn" href="#/constitution" aria-label="前往資優民主國憲法全文">前往憲法全文 ${icon('arrow')}</a><a class="text-btn" href="#/laws">查看全部法規</a></div></div><div class="hero-seal"><div class="seal-ring"><span>資優<br/>民主</span><small>PUBLIC CODE</small></div><div class="seal-caption">國家印鑑<br/><b>修憲已公告</b></div></div></section><section class="quick-stats"><div><strong>04</strong><span>法規位階</span></div><div><strong>10</strong><span>憲法條文</span></div><div><strong>05.28</strong><span>建國紀念日</span></div><div class="stat-note">「把規則說清楚，大家就可以放心發呆。」<br/><span>— 編纂委員會註</span></div></section><section class="home-grid"><div class="section-heading"><div><span class="section-label">01 / 法規導覽</span><h2>從根本大法開始</h2></div><a class="text-btn" href="#/laws">完整索引 ${icon('arrow')}</a></div><div class="feature-law">${lawCard(constitution, 0)}<div class="feature-note"><span class="note-tag">本次整理</span><h3>憲法更清楚了。</h3><p>原稿的「第四條」重複與位階衝突已統一修正，新增正當程序、司法救濟與比例原則，保留反內卷世界觀但讓制度更能被閱讀。</p><a class="constitution-link-btn" href="#/constitution">直接閱讀憲法全文 ${icon('arrow')}</a></div></div><div class="section-heading second"><div><span class="section-label">02 / 四級索引</span><h2>國家的規則，分層放好</h2></div></div><div class="level-strip"><a href="#/laws?level=憲法性特別法"><span>01</span><b>憲法性特別法</b><small>依憲法授權之特別法</small></a><a href="#/constitution"><span>02</span><b>憲法</b><small>國家根本大法</small></a><a href="#/laws?level=法律位階"><span>03</span><b>法律</b><small>立法機關制定</small></a><a href="#/laws?level=行政命令位階"><span>04</span><b>行政命令</b><small>執行與組織規程</small></a></div></section></main>`
}
function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r/g, '').split('\n')
  let html = '', listOpen = false
  const inline = value => value.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\[([^\]]+)\]\((#[^)]+)\)/g, '<a href="$2">$1</a>')
  const closeList = () => { if (listOpen) { html += '</ul>'; listOpen = false } }
  for (const raw of lines) {
    const line = raw.trim()
    if (!line) { closeList(); continue }
    if (line === '---') { closeList(); html += '<hr>'; continue }
    if (line.startsWith('- ')) { if (!listOpen) { html += '<ul>'; listOpen = true }; html += `<li>${inline(esc(line.slice(2)))}</li>`; continue }
    closeList()
    if (line.startsWith('### ')) html += `<h3>${inline(esc(line.slice(4)))}</h3>`
    else if (line.startsWith('## ')) html += `<h2>${inline(esc(line.slice(3)))}</h2>`
    else if (line.startsWith('# ')) html += `<h1>${inline(esc(line.slice(2)))}</h1>`
    else if (line.startsWith('> ')) html += `<blockquote>${inline(esc(line.slice(2)))}</blockquote>`
    else html += `<p>${inline(esc(line))}</p>`
  }
  closeList()
  return html
}
function setupConstitutionMarkdown() {
  const target = document.querySelector('#constitution-md-content')
  if (!target) return
  fetch('constitution-official.md').then(r => r.ok ? r.text() : Promise.reject(new Error('load failed'))).then(text => { target.innerHTML = markdownToHtml(text) }).catch(() => { target.innerHTML = '<p>無法載入 constitution-official.md，請稍後再試。</p>' })
}
function constitutionPage() { return `<main class="inner-page"><div class="page-intro"><div><span class="kicker"><span class="red-rule"></span>壹・憲法位階 / 115.10.20 正式修訂</span><h1>資優民主國憲法</h1><p>本頁直接讀取並預覽官方 Markdown 原稿 constitution-official.md。</p></div><div class="revision-stamp">修訂<br/><b>02</b><small>通過</small></div></div><div class="markdown-web-wrap"><div class="markdown-source-note">來源文件：<code>constitution-official.md</code>　·　<a href="https://github.com/pengjun0429/ziyou-democracy/blob/main/constitution-official.md" target="_blank" rel="noreferrer">在 GitHub 編輯 ↗</a></div><article id="constitution-md-content" class="markdown-web-preview">正在載入 Markdown 憲法原稿…</article></div></main>` }
function lawsPage() { const filtered = allLaws.filter(l => l.id !== 'constitution' && (state.level === '全部' || l.level === state.level) && (!state.query || `${l.title}${l.desc}${l.level}`.toLowerCase().includes(state.query.toLowerCase()))); return `<main class="inner-page laws-page"><div class="page-intro compact"><div><span class="kicker"><span class="red-rule"></span>法規索引 / INDEX</span><h1>把每一條規則放回它的位置</h1><p>以位階、日期與主題快速定位法規。搜尋「內卷」「教育」或「權利」，看看它們各自被安排在哪一層。</p></div></div><div class="filters"><label class="search-box">${icon('search')}<input id="law-search" value="${esc(state.query)}" placeholder="搜尋法規、主題或條文" /></label><div class="filter-pills">${['全部','憲法性特別法','法律位階','行政命令位階'].map(l=>`<button class="pill ${state.level===l?'selected':''}" data-level="${l}">${l}</button>`).join('')}</div></div><div class="index-count">顯示 ${filtered.length} 部法規 <span>／ 共 ${laws.length} 部公開編纂</span></div><section class="law-grid">${filtered.length ? filtered.map(lawCard).join('') : '<div class="empty-state">找不到這一條。也許它正在發呆，請換個關鍵字。</div>'}</section></main>` }
function historyPage() { return `<main class="inner-page history-page"><div class="page-intro compact"><div><span class="kicker"><span class="red-rule"></span>編纂紀錄 / ARCHIVE</span><h1>一個國家的規則，如何長出來</h1><p>從教室成立到第二次修憲，這裡記下法規如何在班級生活中逐步成形。</p></div></div><section class="timeline">${history.map(([date,title,body],i)=>`<div class="timeline-item ${i===history.length-1?'current':''}"><div class="timeline-date">${date}</div><div class="timeline-dot"></div><div class="timeline-copy"><span>${i===history.length-1?'LATEST AMENDMENT':'PUBLIC RECORD'}</span><h2>${title}</h2><p>${body}</p></div></div>`).join('')}</section><section class="archive-note"><div class="archive-icon">${icon('history')}</div><div><h2>編纂者備註</h2><p>這不是一個要求大家變得一模一樣的國家。修憲的方向，是把「誰可以決定什麼」說清楚，也把「誰可以好好休息」寫進規則裡。</p></div></section></main>` }
function render() { let body = state.view === 'constitution' ? constitutionPage() : state.view === 'laws' ? lawsPage() : state.view === 'history' ? historyPage() : home(); app.innerHTML = `<div class="site-shell">${header()}${body}${footer()}</div>`; bind() }
function bind() { setupConstitutionMarkdown(); document.querySelectorAll('[data-law]').forEach(el => el.addEventListener('click', () => { const law = allLaws.find(x => x.id === el.dataset.law); if (law?.id === 'constitution') location.hash = '/constitution' })); document.querySelectorAll('[data-level]').forEach(el => el.addEventListener('click', () => { state.level = el.dataset.level; state.view = 'laws'; render() })); const search = document.querySelector('#law-search'); if (search) { search.addEventListener('input', e => { state.query = e.target.value; document.querySelector('.law-grid').innerHTML = lawsPage().match(/<section class="law-grid">([\s\S]*?)<\/section>/)[1]; bind() }); } }
function route() { const path = location.hash.replace('#','').split('?')[0] || '/'; state.view = path === '/constitution' ? 'constitution' : path === '/laws' ? 'laws' : path === '/history' ? 'history' : 'home'; const params = new URLSearchParams(location.hash.split('?')[1] || ''); if (params.get('level')) state.level = params.get('level'); render(); window.scrollTo({ top: 0, behavior: 'smooth' }) }
window.addEventListener('hashchange', route); route()
