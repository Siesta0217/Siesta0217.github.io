/* SIESTA · DREAMY — shared script (drifting light motes · pointer FX) */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Scroll progress ── */
  const prog = document.getElementById('progress');
  if (prog) addEventListener('scroll', () => {
    const p = scrollY / (document.body.scrollHeight - innerHeight) * 100;
    prog.style.width = Math.min(p, 100) + '%';
  }, { passive: true });

  /* ── Drifting cool light motes (soft, neutral, dreamy) ── */
  const cv = document.getElementById('sparkles');
  if (cv && !reduce) {
    const c = cv.getContext('2d');
    const COLORS = ['124,131,255', '154,124,255', '55,189,255', '63,220,196', '255,255,255'];
    let W, H, motes, mx = -999, my = -999;

    const size = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
    const build = () => {
      const n = innerWidth < 700 ? 34 : 58;
      motes = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 2.6 + 1.2,
        col: COLORS[Math.random() * COLORS.length | 0],
        vy: Math.random() * .3 + .07, vx: (Math.random() - .5) * .14,
        ph: Math.random() * 6.28, sp: Math.random() * .025 + .006,
        sway: Math.random() * .5 + .1,
      }));
    };
    size(); build();
    addEventListener('resize', () => { size(); build(); });
    addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    const draw = () => {
      c.clearRect(0, 0, W, H);
      for (const m of motes) {
        m.ph += m.sp; m.y -= m.vy; m.x += m.vx + Math.sin(m.ph) * m.sway * .12;
        if (m.y < -8) { m.y = H + 8; m.x = Math.random() * W; }
        if (m.x < -8) m.x = W + 8; if (m.x > W + 8) m.x = -8;
        const dx = mx - m.x, dy = my - m.y, d = Math.hypot(dx, dy);
        let px = m.x, py = m.y;
        if (d < 130) { px -= dx / d * (130 - d) * .04; py -= dy / d * (130 - d) * .04; }
        const a = .25 + Math.sin(m.ph) * .3;
        const R = m.r * 3.6;
        const g = c.createRadialGradient(px, py, 0, px, py, R);
        g.addColorStop(0, `rgba(${m.col},${Math.max(0, a)})`);
        g.addColorStop(1, `rgba(${m.col},0)`);
        c.fillStyle = g; c.beginPath(); c.arc(px, py, R, 0, 6.2832); c.fill();
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
      setTimeout(() => { el.style.width = el.dataset.w + '%'; }, 200 + i * 130));
    e.target.querySelectorAll('.count[data-target]').forEach((el, i) =>
      setTimeout(() => countUp(el), 300 + i * 160));
    io.unobserve(e.target);
  }), { threshold: .15 });
  document.querySelectorAll('.fade').forEach(el => io.observe(el));

  /* ── Premium pointer interactions (fine pointers only) ── */
  const fine = matchMedia('(pointer: fine)').matches;
  if (!reduce && fine) {

    /* cursor spotlight + subtle 3D tilt on cards */
    document.querySelectorAll('.work, .feature, .spec, .link, .mod').forEach(card => {
      let raf = 0;
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
          card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
          const rx = (0.5 - py) * 5.5, ry = (px - 0.5) * 6.5;
          card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-6px)`;
        });
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });

    /* magnetic buttons */
    document.querySelectorAll('.btn, .nav-cta').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        btn.style.transform = `translate(${(x * 6).toFixed(1)}px, ${(y * 6).toFixed(1)}px)`;
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });

    /* gentle scroll parallax on the orb field */
    const orbs = document.querySelector('.orbs');
    if (orbs) addEventListener('scroll', () => {
      orbs.style.transform = `translate3d(0, ${(scrollY * 0.06).toFixed(1)}px, 0)`;
    }, { passive: true });
  }
})();
