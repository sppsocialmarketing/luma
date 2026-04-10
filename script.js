const brands = [
  {
    name: 'Brand One',
    tier: 'Core line',
    description:
      'Placeholder for a cost-effective quality brand built for dependable sell-through and strong value positioning.',
    image: 'assets/brands/brand-placeholder-1.svg',
  },
  {
    name: 'Brand Two',
    tier: 'Premium line',
    description:
      'Placeholder for a premium-forward brand with elevated design, better margins, and sharper shelf presence.',
    image: 'assets/brands/brand-placeholder-2.svg',
  },
  {
    name: 'Brand Three',
    tier: 'Luxury line',
    description:
      'Placeholder for a flagship luxury line focused on top-tier presentation across flower, extracts, or edibles.',
    image: 'assets/brands/brand-placeholder-3.svg',
  },
];

const grid = document.getElementById('brandGrid');

if (grid) {
  grid.innerHTML = brands
    .map(
      (brand) => `
        <article class="brand-card reveal-up">
          <img src="${brand.image}" alt="${brand.name} placeholder image" />
          <div class="brand-card-content">
            <span class="brand-tier">${brand.tier}</span>
            <h3>${brand.name}</h3>
            <p>${brand.description}</p>
          </div>
        </article>
      `
    )
    .join('');
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

document.querySelectorAll('.reveal-up').forEach((item) => observer.observe(item));
