document.addEventListener("DOMContentLoaded", () => {
  const layer = document.getElementById("firefly-layer");
  const count = 8;
  const flies = [];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createFirefly(i) {
    const el = document.createElement("span");
    el.className = "firefly";
    const size = random(5, 8.5);
    const x = random(5, 95);
    const y = random(8, 92);
    const vx = random(-0.018, 0.018);
    const vy = random(-0.016, 0.016);
    const pulse = random(0, Math.PI * 2);
    const drift = random(18, 42);

    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    layer.appendChild(el);

    return { el, x, y, vx, vy, pulse, drift };
  }

  for (let i = 0; i < count; i++) {
    flies.push(createFirefly(i));
  }

  let last = performance.now();

  function animate(now) {
    const dt = Math.min(32, now - last);
    last = now;

    flies.forEach((fly, i) => {
      if (!reduceMotion) {
        fly.x += fly.vx * dt;
        fly.y += fly.vy * dt;

        if (fly.x < 2 || fly.x > 98) fly.vx *= -1;
        if (fly.y < 4 || fly.y > 96) fly.vy *= -1;

        fly.pulse += 0.015 * (i % 3 + 1);
      }

      const wobbleX = Math.sin(fly.pulse) * (fly.drift * 0.08);
      const wobbleY = Math.cos(fly.pulse * 0.9) * (fly.drift * 0.08);
      const scale = 0.92 + (Math.sin(fly.pulse * 1.4) + 1) * 0.08;
      const opacity = 0.5 + (Math.sin(fly.pulse * 1.8) + 1) * 0.18;

      fly.el.style.left = `${fly.x}vw`;
      fly.el.style.top = `${fly.y}vh`;
      fly.el.style.transform = `translate3d(${wobbleX}px, ${wobbleY}px, 0) scale(${scale})`;
      fly.el.style.opacity = opacity.toFixed(2);
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});
