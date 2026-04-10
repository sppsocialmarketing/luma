document.addEventListener("DOMContentLoaded", () => {
  const fireflies = document.querySelectorAll(".firefly");

  window.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 10;
    const y = (event.clientY / window.innerHeight - 0.5) * 10;

    fireflies.forEach((fly, index) => {
      const factor = (index % 4 + 1) * 0.35;
      fly.style.marginLeft = `${x * factor}px`;
      fly.style.marginTop = `${y * factor}px`;
    });
  }, { passive: true });
});
