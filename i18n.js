/* SIESTA · lightweight i18n — English baseline (in HTML) + 繁體中文 overlay
   Persists choice in localStorage, defaults to the browser language. */
(() => {
  const ZH = {
    /* ── nav ── */
    nav_about: '關於',
    nav_skills: '技能',
    nav_work: '作品',
    nav_cta: '打聲招呼 ✦',

    /* ── hero ── */
    chip: '隨時歡迎 · 自學開發者',
    hero_sub: '17 歲的開發者，做嵌入式系統、自動化與資安工具——尤其喜歡碰硬體。',
    hero_note: '偷偷說——<b>往下捲</b>看看我做了什麼 ✦',
    btn_work: '看看我的作品',
    tagline: '在夢與機器之間，做出一些彷彿有了生命的東西。',

    /* ── about ── */
    eb_about: '關於',
    about_title: '關於我',
    about_body: '我是個 17 歲的自學開發者，喜歡從零開始做東西。最近主力在 <b>Python</b>、<b>C++</b>、<b>JavaScript</b> 和 <i>資訊安全</i>——只要有 <i>硬體</i> 可以玩，我就最開心。',
    st_years: '歲',
    st_langs: '種語言',
    st_projects: '個專案',
    st_live: '上線',

    /* ── skills ── */
    eb_skills: '技能',
    skills_title: '我正在用的技術',
    sk_py: '自動化與腳本',
    sk_js: '網頁與機器人',
    sk_c: '嵌入式系統',
    sk_sec: '基礎概念 · 學習中',

    /* ── work ── */
    eb_work: '作品',
    work_title: '我做過的東西',
    w1_desc: '一台自製智慧時鐘，跑在 LilyGO T-Display-S3-Touch 上——C++ 韌體，UI 直接畫到電容觸控螢幕上。',
    w2_desc: '以 OpenClaw AI 打造的 AI 女僕夥伴——有個性、有記憶，獨特的角色讓每次對話都鮮活。',
    w3_desc: '給 Lunar 1.21 的 Fabric 客戶端 mod——戰鬥、移動、渲染模組，全靠可拖曳的遊戲內 ClickGUI 操控。Java 21，從零寫起。',

    /* ── contact ── */
    eb_contact: '聯絡',
    contact_title: '來聊聊吧 ✦',

    /* ── footer ── */
    foot_built: '從零打造',

    /* ── project pages (shared) ── */
    nav_back: '← 回作品集',
    eb_overview: '總覽',
    overview_title: '這是什麼',
    eb_hardware: '硬體',
    hardware_title: '裡面有什麼',
    eb_features: '功能',
    features_title: '它能做什麼',
    eb_tech: '技術',
    tech_title: '使用工具',
    eb_devlog: '開發紀錄',
    devlog_title: '怎麼做出來的',
    eb_modules: '模組',
    modules_title: '裡面有什麼',
    eb_highlights: '亮點',
    highlights_title: '精華所在',
    eb_install: '安裝',
    install_title: '怎麼跑起來',
    eb_changelog: '更新紀錄',
    changelog_title: '版本歷史',
    eb_traits: '特質',
    traits_title: '她的個性',
    eb_abilities: '能力',
    abilities_title: '她會做什麼',
    eb_stack: '技術',
    stack_title: '建構於',
    btn_github: '在 GitHub 上看 ↗',
    btn_learn: '了解更多 ↓',
    btn_modules: '看模組 ↓',
    btn_traits: '看特質 ↓',

    /* T-Display */
    td_type: '智慧時鐘 · 嵌入式',
    td_chip: 'ESP32-S3 · 進行中',
    td_sub: '一台自製智慧時鐘，建構在 LilyGO T-Display-S3-Touch 開發板上。以 C++ 撰寫韌體，UI 直接渲染到電容觸控螢幕——從韌體層一路自己做起。',
    td_overview: '一台自製智慧時鐘，跑在 <strong>LilyGO T-Display-S3-Touch</strong> 上——一塊內建電容觸控螢幕的 <em>ESP32-S3</em> 開發板。韌體以 <em>C++</em> 撰寫，UI 完全自繪到螢幕上，從零設計，沒有用任何現成的時鐘韌體。',
    td_f1: 'NTP 校時的即時時鐘。',
    td_f2: '自繪在螢幕上的觸控介面。',
    td_f3: '連網即時更新。',
    td_f4: '可切換的多種錶面。',
    td_f5: '最佳化的更新迴圈，低功耗。',
    td_f6: '自寫韌體，沒有現成範本。',
    td_l1: '收到板子。燒錄第一個程式，螢幕顯示「Hello World」。',
    td_l2: '驅動設定完成，電容觸控可用，建立 UI 渲染迴圈。',
    td_l3: '透過 Wi-Fi 做 NTP 校時，多錶面版面系統。',
    td_l4: '已在桌上運行。持續微調 UI 與功耗。',

    /* Valencia Mod */
    vm_type: 'Minecraft 客戶端 Mod',
    vm_chip: 'Fabric Mod · Lunar 1.21',
    vm_sub: '給 Lunar Client 1.21 的自製 Fabric 客戶端 mod——戰鬥、移動與工具模組，全部由可拖曳的遊戲內 ClickGUI 操控。用 Java 從零寫起。',
    vm_overview: 'Valencia 是給 <strong>Lunar Client 1.21</strong> 的 <em>Fabric 客戶端 mod</em>，從零打造、不依賴 Fabric API。具備可拖曳的 <em>ClickGUI</em>、持久化 JSON 設定、遊戲內按鍵重綁，以及橫跨戰鬥、移動、渲染類別且持續成長的模組。採用純 <code>GuiGraphics</code> 渲染——相容 Sodium / Iris。',
    vm_install_title: '怎麼跑起來',

    /* Valencia AI */
    va_type: 'AI 女僕夥伴',
    va_chip: 'AI 夥伴 · 隨時在線',
    va_ov_title: '她是誰',
    va_log_title: '她怎麼長大的',
    va_sub: '以 OpenClaw AI 打造的自製 AI 女僕夥伴——有自己的個性、長期記憶，以及獨特的角色，讓每次對話都鮮活。',
    va_overview: 'Valencia 是建構在 <strong>OpenClaw AI</strong> 上的自製 <em>AI 女僕夥伴</em>。她住在 <em>Discord</em>，維持一致的女僕人設，並保有 <strong>長期記憶</strong>，所以她真的會記得你。目標不是通用助理——而是一個有自己聲音、小怪癖與溫度的角色，跑在以本機為主的 <code>OpenClaw</code> 引擎上。',
  };

  const KEY = 'siesta-lang';
  const orig = new Map();

  const capture = () => document.querySelectorAll('[data-i18n]').forEach(el => {
    if (!orig.has(el)) orig.set(el, el.innerHTML);
  });

  const apply = lang => {
    capture();
    orig.forEach((en, el) => {
      const k = el.dataset.i18n;
      el.innerHTML = (lang === 'zh' && ZH[k] != null) ? ZH[k] : en;
    });
    document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : 'en';
    document.querySelectorAll('[data-lang]').forEach(b =>
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    try { localStorage.setItem(KEY, lang); } catch (e) {}
  };

  const detect = () => {
    try { const s = localStorage.getItem(KEY); if (s) return s; } catch (e) {}
    return (navigator.language || '').toLowerCase().startsWith('zh') ? 'zh' : 'en';
  };

  const init = () => {
    capture();
    apply(detect());
    document.querySelectorAll('[data-lang]').forEach(b =>
      b.addEventListener('click', () => apply(b.dataset.lang)));
  };

  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', init);
  else init();
})();
