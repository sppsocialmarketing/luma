document.addEventListener("DOMContentLoaded", () => {
  const fireflies = document.querySelectorAll(".firefly");
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  window.addEventListener("mousemove", (event) => {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 10;
    mouseY = (event.clientY / window.innerHeight - 0.5) * 10;
  }, { passive: true });

  function tick() {
    currentX += (mouseX - currentX) * 0.06;
    currentY += (mouseY - currentY) * 0.06;

    fireflies.forEach((fly, index) => {
      const factor = (index % 4 + 1) * 0.35;
      fly.style.transform = `translate3d(${currentX * factor}px, ${currentY * factor}px, 0)`;
    });

    requestAnimationFrame(tick);
  }

  tick();
});
