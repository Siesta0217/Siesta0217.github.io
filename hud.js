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
    /* cool motes for the dreamy base, pale-pink petals for a soft warm touch */
    const MOTE  = ['124,131,255', '154,124,255', '55,189,255', '255,255,255'];
    const PETAL = ['255,158,198', '255,138,186', '255,178,212', '246,200,255', '255,224,238'];
    let W, H, motes, petals, mx = -999, my = -999;

    const size = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
    const build = () => {
      const nm = innerWidth < 700 ? 14 : 24;
      const np = innerWidth < 700 ? 14 : 26;
      motes = Array.from({ length: nm }, () => ({
        x: Math.random() * W, y: Math.random() * H, r: Math.random() * 2.4 + 1.2,
        col: MOTE[Math.random() * MOTE.length | 0],
        vy: Math.random() * .3 + .07, vx: (Math.random() - .5) * .14,
        ph: Math.random() * 6.28, sp: Math.random() * .025 + .006, sway: Math.random() * .5 + .1,
      }));
      petals = Array.from({ length: np }, () => ({
        x: Math.random() * W, y: Math.random() * H, s: Math.random() * 5 + 6,
        col: PETAL[Math.random() * PETAL.length | 0],
        vy: Math.random() * .5 + .35, rot: Math.random() * 6.28, vr: (Math.random() - .5) * .04,
        sway: Math.random() * 1.1 + .4, ph: Math.random() * 6.28, sp: Math.random() * .02 + .01,
        a: Math.random() * .3 + .4,
      }));
    };
    size(); build();
    addEventListener('resize', () => { size(); build(); });
    addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

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
      c.clearRect(0, 0, W, H);
      for (const m of motes) {
        m.ph += m.sp; m.y -= m.vy; m.x += m.vx + Math.sin(m.ph) * m.sway * .12;
        if (m.y < -8) { m.y = H + 8; m.x = Math.random() * W; }
        if (m.x < -8) m.x = W + 8; if (m.x > W + 8) m.x = -8;
        const dx = mx - m.x, dy = my - m.y, d = Math.hypot(dx, dy);
        let px = m.x, py = m.y;
        if (d < 130) { px -= dx / d * (130 - d) * .04; py -= dy / d * (130 - d) * .04; }
        const a = .25 + Math.sin(m.ph) * .3, R = m.r * 3.6;
        const g = c.createRadialGradient(px, py, 0, px, py, R);
        g.addColorStop(0, `rgba(${m.col},${Math.max(0, a)})`); g.addColorStop(1, `rgba(${m.col},0)`);
        c.fillStyle = g; c.beginPath(); c.arc(px, py, R, 0, 6.2832); c.fill();
      }
      for (const p of petals) {
        p.ph += p.sp; p.y += p.vy; p.x += Math.sin(p.ph) * p.sway; p.rot += p.vr;
        if (p.y > H + 24) { p.y = -24; p.x = Math.random() * W; }
        if (p.x < -24) p.x = W + 24; if (p.x > W + 24) p.x = -24;
        drawPetal(p);
      }
      c.globalAlpha = 1;
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

  /* ── Romantic typewriter (types a line, deletes it, types the next) ── */
  const typer = document.getElementById('typer');
  if (typer) {
    const PHRASES = [
      'Каждый взгляд на тебя — это тайна, которую я храню в сердце.',
      'Может, когда-нибудь ты это почувствуешь.',
      'Между мечтой и рассветом я думаю только о тебе.',
      'Ты — мой самый тихий и тёплый сон.',
    ];
    if (reduce) {
      typer.textContent = PHRASES[0];
    } else {
      let pi = 0, ci = 0, del = false;
      const tick = () => {
        const full = PHRASES[pi];
        ci += del ? -1 : 1;
        typer.textContent = full.slice(0, ci);
        if (!del && ci >= full.length) { del = true; setTimeout(tick, 2400); }
        else if (del && ci <= 0) { del = false; pi = (pi + 1) % PHRASES.length; setTimeout(tick, 550); }
        else setTimeout(tick, del ? 26 : 50 + Math.random() * 55);
      };
      setTimeout(tick, 700);
    }
  }

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
