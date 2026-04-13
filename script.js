document.addEventListener("DOMContentLoaded", () => {});


document.addEventListener("DOMContentLoaded", () => {
  const details = document.querySelector(".disclaimer-details");
  if (!details) return;

  const isMobile = window.matchMedia("(max-width: 760px)").matches;
  if (isMobile) {
    details.removeAttribute("open");
  } else {
    details.setAttribute("open", "");
  }
});
