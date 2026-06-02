/* SIESTA · SOFT DREAMY — shared script (petals · sparkles · cursor stardust) */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Scroll progress ── */
  const prog = document.getElementById('progress');
  if (prog) addEventListener('scroll', () => {
    const p = scrollY / (document.body.scrollHeight - innerHeight) * 100;
    prog.style.width = Math.min(p, 100) + '%';
  }, { passive: true });

  /* ── Canvas FX: petals + sparkles (behind) · cursor stardust (on top) ── */
  const cv = document.getElementById('sparkles');
  if (cv && !reduce) {
    const c = cv.getContext('2d');

    /* dedicated top-layer canvas so the cursor trail sits ABOVE all content */
    const top = document.createElement('canvas');
    top.style.cssText = 'position:fixed;inset:0;z-index:9998;pointer-events:none';
    document.body.appendChild(top);
    const tc = top.getContext('2d');

    let W, H, petals, sparks, trail = [], mx = -999, my = -999, lastX = null, lastY = null;

    const PETAL = ['255,178,212', '255,150,196', '232,210,255', '255,232,243'];
    const SPARK = ['255,150,205', '170,150,255', '130,200,255', '255,255,255'];

    const size = () => {
      W = cv.width = top.width = innerWidth;
      H = cv.height = top.height = innerHeight;
    };
    const build = () => {
      const np = innerWidth < 700 ? 12 : 22;
      const ns = innerWidth < 700 ? 22 : 40;
      petals = Array.from({ length: np }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        s: Math.random() * 5 + 6, col: PETAL[Math.random() * PETAL.length | 0],
        vy: Math.random() * .5 + .35, rot: Math.random() * 6.28, vr: (Math.random() - .5) * .04,
        sway: Math.random() * 1.1 + .4, ph: Math.random() * 6.28, sp: Math.random() * .02 + .01,
        a: Math.random() * .35 + .45,
      }));
      sparks = Array.from({ length: ns }, () => ({
        x: Math.random() * W, y: Math.random() * H, r: Math.random() * 2.2 + 1,
        col: SPARK[Math.random() * SPARK.length | 0],
        vy: Math.random() * .25 + .05, vx: (Math.random() - .5) * .1,
        ph: Math.random() * 6.28, sp: Math.random() * .03 + .008,
      }));
    };
    size(); build();
    addEventListener('resize', () => { size(); build(); });

    /* emit stardust as the cursor moves */
    addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      if (lastX !== null) {
        const d = Math.hypot(mx - lastX, my - lastY);
        if (d > 3) {
          const n = Math.min(3, 1 + (d / 22 | 0));
          for (let k = 0; k < n; k++) trail.push({
            x: mx + (Math.random() - .5) * 12, y: my + (Math.random() - .5) * 12,
            r: Math.random() * 2.4 + 2.2, col: SPARK[Math.random() * SPARK.length | 0],
            vx: (Math.random() - .5) * .7, vy: (Math.random() - .5) * .7 - .25, life: 1,
          });
          if (trail.length > 90) trail.splice(0, trail.length - 90);
        }
      }
      lastX = mx; lastY = my;
    }, { passive: true });
    addEventListener('mouseleave', () => { lastX = lastY = null; });

    const drawPetal = p => {
      const s = p.s;
      c.save(); c.translate(p.x, p.y); c.rotate(p.rot); c.globalAlpha = p.a;
      const g = c.createLinearGradient(0, 0, 0, -s * 1.6);
      g.addColorStop(0, `rgba(${p.col},.95)`); g.addColorStop(1, `rgba(${p.col},.35)`);
      c.fillStyle = g;
      c.beginPath(); c.moveTo(0, 0);
      c.bezierCurveTo(s * .55, -s * .35, s * .5, -s * 1.2, 0, -s * 1.6);
      c.bezierCurveTo(-s * .5, -s * 1.2, -s * .55, -s * .35, 0, 0);
      c.fill(); c.restore();
    };

    const draw = () => {
      /* back layer: sparks + petals */
      c.clearRect(0, 0, W, H);
      for (const s of sparks) {
        s.ph += s.sp; s.y -= s.vy; s.x += s.vx;
        if (s.y < -6) { s.y = H + 6; s.x = Math.random() * W; }
        const a = .3 + Math.sin(s.ph) * .3;
        const g = c.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3.5);
        g.addColorStop(0, `rgba(${s.col},${Math.max(0, a)})`); g.addColorStop(1, `rgba(${s.col},0)`);
        c.fillStyle = g; c.beginPath(); c.arc(s.x, s.y, s.r * 3.5, 0, 6.2832); c.fill();
      }
      for (const p of petals) {
        p.ph += p.sp; p.y += p.vy; p.x += Math.sin(p.ph) * p.sway; p.rot += p.vr;
        if (p.y > H + 24) { p.y = -24; p.x = Math.random() * W; }
        if (p.x < -24) p.x = W + 24; if (p.x > W + 24) p.x = -24;
        drawPetal(p);
      }
      c.globalAlpha = 1;

      /* top layer: cursor stardust (additive glow, white core) */
      tc.clearRect(0, 0, W, H);
      tc.globalCompositeOperation = 'lighter';
      for (let i = trail.length - 1; i >= 0; i--) {
        const t = trail[i];
        t.life -= .018; t.x += t.vx; t.y += t.vy; t.vy += .004;
        if (t.life <= 0) { trail.splice(i, 1); continue; }
        const R = t.r * 6 * (.55 + t.life * .45);
        const g = tc.createRadialGradient(t.x, t.y, 0, t.x, t.y, R);
        g.addColorStop(0, `rgba(255,255,255,${t.life})`);
        g.addColorStop(.3, `rgba(${t.col},${t.life * .85})`);
        g.addColorStop(1, `rgba(${t.col},0)`);
        tc.fillStyle = g; tc.beginPath(); tc.arc(t.x, t.y, R, 0, 6.2832); tc.fill();
      }
      tc.globalCompositeOperation = 'source-over';

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
      setTimeout(() => { el.style.width = el.dataset.w + '%'; }, 200 + i * 130));
    e.target.querySelectorAll('.count[data-target]').forEach((el, i) =>
      setTimeout(() => countUp(el), 300 + i * 160));
    io.unobserve(e.target);
  }), { threshold: .15 });
  document.querySelectorAll('.fade').forEach(el => io.observe(el));
})();
