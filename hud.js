/* SIESTA · SOFT DREAMY — shared script */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Scroll progress ── */
  const prog = document.getElementById('progress');
  if (prog) addEventListener('scroll', () => {
    const p = scrollY / (document.body.scrollHeight - innerHeight) * 100;
    prog.style.width = Math.min(p, 100) + '%';
  }, { passive: true });

  /* ── Soft sparkle drift ── */
  const cv = document.getElementById('sparkles');
  if (cv && !reduce) {
    const c = cv.getContext('2d');
    const COLORS = ['255,176,214', '186,158,255', '150,206,255', '255,210,160', '255,255,255'];
    let W, H, dots, mx = -999, my = -999;
    const size = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
    const build = () => {
      const n = innerWidth < 700 ? 36 : 64;
      dots = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 2.4 + 1.1,
        col: COLORS[Math.random() * COLORS.length | 0],
        vy: Math.random() * .25 + .06, vx: (Math.random() - .5) * .12,
        ph: Math.random() * 6.28, sp: Math.random() * .03 + .008,
      }));
    };
    size(); build();
    addEventListener('resize', () => { size(); build(); });
    addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    const draw = () => {
      c.clearRect(0, 0, W, H);
      for (const d of dots) {
        d.ph += d.sp; d.y -= d.vy; d.x += d.vx;
        if (d.y < -6) { d.y = H + 6; d.x = Math.random() * W; }
        if (d.x < -6) d.x = W + 6; if (d.x > W + 6) d.x = -6;
        const dx = mx - d.x, dy = my - d.y, dist = Math.hypot(dx, dy);
        let px = d.x, py = d.y;
        if (dist < 130) { px -= dx / dist * (130 - dist) * .05; py -= dy / dist * (130 - dist) * .05; }
        const a = .35 + Math.sin(d.ph) * .35;
        const g = c.createRadialGradient(px, py, 0, px, py, d.r * 3.5);
        g.addColorStop(0, `rgba(${d.col},${Math.max(0, a)})`);
        g.addColorStop(1, `rgba(${d.col},0)`);
        c.fillStyle = g;
        c.beginPath(); c.arc(px, py, d.r * 3.5, 0, 6.2832); c.fill();
      }
      requestAnimationFrame(draw);
    };
    draw();
  }

  /* ── Count up ── */
  const countUp = el => {
    const t = +el.dataset.target; let v = 0;
    const step = Math.max(34, 1000 / t);
    const iv = setInterval(() => { v = Math.min(v + 1, t); el.textContent = v; if (v >= t) clearInterval(iv); }, step);
  };

  /* ── Reveal + bar fill + counters ── */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('on');
    e.target.querySelectorAll('.bar__fill[data-w]').forEach((el, i) =>
      setTimeout(() => { el.style.width = el.dataset.w + '%'; }, 150 + i * 130));
    e.target.querySelectorAll('.count[data-target]').forEach((el, i) =>
      setTimeout(() => countUp(el), 250 + i * 160));
    io.unobserve(e.target);
  }), { threshold: .15 });
  document.querySelectorAll('.fade').forEach(el => io.observe(el));
})();
