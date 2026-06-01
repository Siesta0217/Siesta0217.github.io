/* SIESTA · PIXEL HUD — shared script for project pages */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Scroll progress ── */
  const prog = document.getElementById('progress');
  if (prog) addEventListener('scroll', () => {
    const p = scrollY / (document.body.scrollHeight - innerHeight) * 100;
    prog.style.width = Math.min(p, 100) + '%';
  }, { passive: true });

  /* ── Pixel starfield ── */
  const cv = document.getElementById('stars');
  if (cv) {
    const c = cv.getContext('2d');
    const PALETTE = ['#ff2e88', '#27e7ff', '#ffd23f', '#9d6bff', '#ece9ff'];
    let W, H, stars, mx = -999, my = -999;
    const size = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
    const build = () => {
      const n = innerWidth < 700 ? 60 : 110;
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        s: Math.random() < .85 ? 2 : 3,
        col: PALETTE[Math.random() * PALETTE.length | 0],
        vy: Math.random() * .18 + .04, ph: Math.random() * 6.28, sp: Math.random() * .04 + .01,
      }));
    };
    size(); build();
    addEventListener('resize', () => { size(); build(); });
    addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    const draw = () => {
      c.clearRect(0, 0, W, H);
      for (const st of stars) {
        st.ph += st.sp; st.y -= st.vy;
        if (st.y < -4) { st.y = H + 4; st.x = Math.random() * W; }
        const dx = mx - st.x, dy = my - st.y, d = Math.hypot(dx, dy);
        let px = st.x, py = st.y;
        if (d < 140) { px -= dx / d * (140 - d) * .04; py -= dy / d * (140 - d) * .04; }
        c.globalAlpha = Math.max(.06, .35 + Math.sin(st.ph) * .35);
        c.fillStyle = st.col;
        c.fillRect(px | 0, py | 0, st.s, st.s);
      }
      c.globalAlpha = 1;
      requestAnimationFrame(draw);
    };
    draw();
  }

  /* ── Reveal + stat-bar fill ── */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('on');
    e.target.querySelectorAll('.bar__fill[data-w]').forEach((el, i) =>
      setTimeout(() => { el.style.width = el.dataset.w + '%'; }, 120 + i * 110));
    io.unobserve(e.target);
  }), { threshold: .1 });
  document.querySelectorAll('.fade').forEach(el => io.observe(el));

  /* ── Glitch on pixel titles ── */
  document.querySelectorAll('.px-title').forEach(t => {
    const g = () => { t.classList.add('glitch'); setTimeout(() => t.classList.remove('glitch'), 600); };
    t.addEventListener('pointerenter', g);
    if (!reduce) setInterval(g, 8000 + Math.random() * 4000);
  });

  /* ── Decode-scramble on hover ── */
  const CH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*<>/';
  const scramble = el => {
    if (el.dataset.run === '1') return;
    const o = el.dataset.txt || el.textContent;
    el.dataset.txt = o; el.dataset.run = '1';
    let f = 0; const total = 10;
    const iv = setInterval(() => {
      el.textContent = o.split('').map((ch, i) =>
        (ch === ' ' || f > total * (i / o.length)) ? ch : CH[Math.random() * CH.length | 0]).join('');
      if (++f > total) { clearInterval(iv); el.textContent = o; el.dataset.run = '0'; }
    }, 28);
  };
  document.querySelectorAll('.section-label, .cell-title, .spec-value, .mod-name, .log-date').forEach(el => {
    el.dataset.txt = el.textContent;
    el.addEventListener('pointerenter', () => scramble(el));
  });
})();
