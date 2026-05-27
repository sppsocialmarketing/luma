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

  function makeEmber(startOffscreen = true) {
    const size = rand(1.4, 5.6);
    return {
      x: rand(-40, width + 40),
      y: startOffscreen ? rand(height + 20, height + 180) : rand(0, height),
      size,
      vx: rand(-0.018, 0.018),
      vy: rand(-0.045, -0.135),
      life: rand(0.72, 1),
      decay: rand(0.000045, 0.000105),
      flicker: rand(0, Math.PI * 2),
      flickerSpeed: rand(0.0014, 0.0038),
      drift: rand(-0.018, 0.018),
      warm: rand(0, 1),
      wobbleAmp: rand(0.012, 0.04)
    };
  }

  function init() {
    resize();
    const count = Math.min(70, Math.max(34, Math.floor(width / 26)));
    particles = Array.from({ length: count }, () => makeEmber(false));
  }

  function drawEmber(p, dt) {
    p.flicker += dt * p.flickerSpeed;

    const wobble = Math.sin(p.flicker) * p.wobbleAmp;
    p.x += (p.vx + p.drift + wind + wobble) * dt;
    p.y += p.vy * dt;
    p.life -= p.decay * dt;

    if (p.life <= 0 || p.y < -80 || p.x < -120 || p.x > width + 120) {
      Object.assign(p, makeEmber(true));
    }

    const flicker = 0.72 + Math.sin(p.flicker * 2.4) * 0.18 + Math.sin(p.flicker * 0.7) * 0.1;
    const alpha = Math.max(0, Math.min(1, p.life * flicker));
    const radius = p.size * (0.85 + Math.sin(p.flicker * 1.5) * 0.12);

    const hue = p.warm > 0.55 ? 34 : 22;
    const core = p.warm > 0.55 ? "255, 214, 116" : "255, 135, 45";
    const edge = p.warm > 0.55 ? "255, 112, 31" : "255, 67, 20";

    const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 5.6);
    glow.addColorStop(0, `rgba(${core}, ${alpha * 0.95})`);
    glow.addColorStop(0.24, `rgba(${core}, ${alpha * 0.5})`);
    glow.addColorStop(0.58, `rgba(${edge}, ${alpha * 0.18})`);
    glow.addColorStop(1, `rgba(${edge}, 0)`);

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius * 5.6, 0, Math.PI * 2);
    ctx.fill();

    const ember = ctx.createRadialGradient(p.x - radius * 0.25, p.y - radius * 0.25, 0, p.x, p.y, radius);
    ember.addColorStop(0, `rgba(255, 241, 186, ${alpha})`);
    ember.addColorStop(0.45, `rgba(${core}, ${alpha * 0.92})`);
    ember.addColorStop(1, `rgba(${edge}, ${alpha * 0.22})`);

    ctx.fillStyle = ember;
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function tick(now) {
    const dt = Math.min(34, now - last);
    last = now;

    if (reduceMotion) return;

    ctx.clearRect(0, 0, width, height);

    // Random, slow wind changes. Enough to feel organic, not chaotic.
    if (Math.random() < 0.006) {
      windTarget = rand(-0.035, 0.035);
    }
    wind += (windTarget - wind) * 0.012;

    particles.forEach((p) => drawEmber(p, dt));
    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", init);
  init();

  if (!reduceMotion) {
    requestAnimationFrame(tick);
  }
})();
