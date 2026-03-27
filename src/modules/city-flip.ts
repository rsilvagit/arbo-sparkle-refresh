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
  let intervalId: number | undefined;
  const inner = el.querySelector('.city-flip__text') as HTMLElement | null;
  if (!inner) return;

  function startFlipping(): void {
    if (intervalId) return;
    intervalId = window.setInterval(() => {
      inner!.classList.add('city-flip__text--out');

      setTimeout(() => {
        index = (index + 1) % CITIES.length;
        inner!.textContent = CITIES[index];
        inner!.classList.remove('city-flip__text--out');
        inner!.classList.add('city-flip__text--in');

        setTimeout(() => {
          inner!.classList.remove('city-flip__text--in');
        }, FLIP_DURATION);
      }, FLIP_DURATION);
    }, FLIP_INTERVAL);
  }

  function stopFlipping(): void {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = undefined;
    }
  }

  // Only animate when visible to save CPU
  const visObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startFlipping();
        } else {
          stopFlipping();
        }
      });
    },
    { threshold: 0.1 },
  );
  visObserver.observe(el);
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

    // animateElement now handles its own visibility observer
    animateElement(el);
  });
}
