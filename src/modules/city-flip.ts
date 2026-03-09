const CITIES = [
  'Porto Alegre',
  'Canoas',
  'Novo Hamburgo',
  'São Leopoldo',
  'Gravataí',
  'Cachoeirinha',
  'Alvorada',
  'Viamão',
  'Guaíba',
  'Esteio',
  'Sapucaia do Sul',
  'Eldorado do Sul',
  'Campo Bom',
  'Sapiranga',
];

const FLIP_INTERVAL = 2500;
const FLIP_DURATION = 400;

function animateElement(el: HTMLElement): void {
  let index = 0;
  const inner = el.querySelector('.city-flip__text') as HTMLElement | null;
  if (!inner) return;

  setInterval(() => {
    // Flip out current city
    inner.classList.add('city-flip__text--out');

    setTimeout(() => {
      // Change text
      index = (index + 1) % CITIES.length;
      inner.textContent = CITIES[index];

      // Remove out, add in
      inner.classList.remove('city-flip__text--out');
      inner.classList.add('city-flip__text--in');

      // Clean up in class after animation
      setTimeout(() => {
        inner.classList.remove('city-flip__text--in');
      }, FLIP_DURATION);
    }, FLIP_DURATION);
  }, FLIP_INTERVAL);
}

export function initCityFlip(): void {
  const elements = document.querySelectorAll<HTMLElement>('.city-flip');
  if (!elements.length) return;

  elements.forEach((el) => {
    // Wrap text content in inner span if not already wrapped
    if (!el.querySelector('.city-flip__text')) {
      const text = el.textContent?.trim() || CITIES[0];
      el.innerHTML = `<span class="city-flip__text">${text}</span>`;
    }

    // Start animation when element is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateElement(el);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
  });
}
