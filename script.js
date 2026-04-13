document.addEventListener("DOMContentLoaded", () => {
  if (!window.SITE_CONTENT) return;

  const map = {
    heroTitle: "hero-title",
    heroText: "hero-text",
    brandsTitle: "brands-title",
    categoriesTitle: "categories-title",
    approachTitle: "approach-title",
    approachText: "approach-text",
    cat1Title: "cat1-title",
    cat1Text: "cat1-text",
    cat2Title: "cat2-title",
    cat2Text: "cat2-text",
    cat3Title: "cat3-title",
    cat3Text: "cat3-text"
  };

  Object.entries(map).forEach(([key, id]) => {
    const el = document.getElementById(id);
    if (el && typeof SITE_CONTENT[key] === "string") {
      el.textContent = SITE_CONTENT[key];
    }
  });
});
