(() => {
  const canvas = document.getElementById("ember-canvas");
  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let width = 0;
  let height = 0;
  let particles = [];
  let wind = 0;
  let windTarget = 0;
  let last = performance.now();

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function makeParticle(resetY = true) {
    return {
      x: rand(0, width),
      y: resetY ? rand(height * 0.72, height + 80) : rand(0, height),
      r: rand(1.2, 3.8),
      length: rand(8, 24),
      vx: rand(-0.14, 0.14),
      vy: rand(-0.34, -0.86),
      life: rand(0.45, 1),
      flicker: rand(0, Math.PI * 2),
      wobble: rand(0.4, 1.5),
      hue: rand(24, 44),
      drift: rand(-0.9, 0.9)
    };
  }

  function init() {
    resize();
    const count = Math.min(95, Math.max(42, Math.floor(width / 18)));
    particles = Array.from({ length: count }, () => makeParticle(false));
  }

  function drawParticle(p, dt) {
    p.flicker += dt * 0.004 * p.wobble;

    const localWind = wind + Math.sin(p.flicker) * p.drift;
    p.x += (p.vx + localWind) * dt;
    p.y += p.vy * dt;
    p.life -= dt * 0.000035;

    if (p.y < -60 || p.x < -80 || p.x > width + 80 || p.life <= 0) {
      Object.assign(p, makeParticle(true));
      p.life = rand(0.65, 1);
    }

    const alpha = Math.max(0, Math.min(1, p.life)) * (0.55 + Math.sin(p.flicker * 2.2) * 0.25);
    const grad = ctx.createLinearGradient(p.x, p.y, p.x + localWind * 30, p.y - p.length);
    grad.addColorStop(0, `hsla(${p.hue}, 100%, 62%, 0)`);
    grad.addColorStop(0.42, `hsla(${p.hue}, 100%, 62%, ${alpha})`);
    grad.addColorStop(1, `hsla(45, 100%, 78%, ${alpha * 0.85})`);

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((localWind * 0.8) + 0.18);
    ctx.fillStyle = grad;
    ctx.shadowColor = `hsla(${p.hue}, 100%, 62%, ${alpha})`;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.roundRect(-p.r / 2, -p.length, p.r, p.length, p.r);
    ctx.fill();
    ctx.restore();
  }

  function tick(now) {
    const dt = Math.min(34, now - last);
    last = now;

    if (!reduceMotion) {
      ctx.clearRect(0, 0, width, height);

      if (Math.random() < 0.012) {
        windTarget = rand(-0.08, 0.08);
      }
      wind += (windTarget - wind) * 0.018;

      particles.forEach((p) => drawParticle(p, dt));
      requestAnimationFrame(tick);
    }
  }

  window.addEventListener("resize", init);
  init();

  if (!reduceMotion) {
    requestAnimationFrame(tick);
  }
})();
