(() => {
  const canvas = document.getElementById("ember-canvas");
  if (!canvas) return;

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
    const size = rand(1.4, 6.2);

    return {
      x: rand(-40, width + 40),
      y: startOffscreen ? rand(height + 20, height + 220) : rand(0, height),
      size,
      vx: rand(-0.014, 0.014),
      vy: rand(-0.028, -0.095),
      life: rand(0.72, 1),
      decay: rand(0.000038, 0.00009),
      flicker: rand(0, Math.PI * 2),
      flickerSpeed: rand(0.0012, 0.0036),
      drift: rand(-0.014, 0.014),
      wobbleAmp: rand(0.008, 0.032),
      redHot: rand(0, 1)
    };
  }

  function init() {
    resize();
    const count = Math.min(82, Math.max(36, Math.floor(width / 24)));
    particles = Array.from({ length: count }, () => makeEmber(false));
  }

  function drawEmber(p, dt) {
    p.flicker += dt * p.flickerSpeed;

    const wobble = Math.sin(p.flicker) * p.wobbleAmp;
    p.x += (p.vx + p.drift + wind + wobble) * dt;
    p.y += p.vy * dt;
    p.life -= p.decay * dt;

    if (p.life <= 0 || p.y < -90 || p.x < -140 || p.x > width + 140) {
      Object.assign(p, makeEmber(true));
    }

    const flicker = 0.68 + Math.sin(p.flicker * 2.2) * 0.18 + Math.sin(p.flicker * 0.6) * 0.11;
    const alpha = Math.max(0, Math.min(1, p.life * flicker));
    const radius = p.size * (0.9 + Math.sin(p.flicker * 1.3) * 0.13);

    const core = p.redHot > 0.45 ? "255, 92, 30" : "255, 177, 70";
    const edge = p.redHot > 0.45 ? "255, 33, 18" : "255, 92, 24";

    ctx.save();
    ctx.globalCompositeOperation = "lighter";

    const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 7.5);
    glow.addColorStop(0, `rgba(255, 222, 145, ${alpha * 0.7})`);
    glow.addColorStop(0.18, `rgba(${core}, ${alpha * 0.46})`);
    glow.addColorStop(0.55, `rgba(${edge}, ${alpha * 0.18})`);
    glow.addColorStop(1, `rgba(${edge}, 0)`);

    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(p.x, p.y, radius * 7.5, 0, Math.PI * 2);
    ctx.fill();

    const ember = ctx.createRadialGradient(p.x - radius * 0.25, p.y - radius * 0.25, 0, p.x, p.y, radius);
    ember.addColorStop(0, `rgba(255, 244, 195, ${alpha})`);
    ember.addColorStop(0.42, `rgba(${core}, ${alpha * 0.95})`);
    ember.addColorStop(1, `rgba(${edge}, ${alpha * 0.2})`);

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

    // Slow random wind direction changes.
    if (Math.random() < 0.0055) {
      windTarget = rand(-0.032, 0.032);
    }

    wind += (windTarget - wind) * 0.01;

    particles.forEach((p) => drawEmber(p, dt));
    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", init);
  init();

  if (!reduceMotion) {
    requestAnimationFrame(tick);
  }
})();
