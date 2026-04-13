document.getElementById("hero-title").innerText = SITE_DATA.heroTitle;
document.getElementById("hero-text").innerText = SITE_DATA.heroText;

const container = document.getElementById("brand-logos");
SITE_DATA.brands.forEach(src=>{
  const img = document.createElement("img");
  img.src = src;
  container.appendChild(img);
});
