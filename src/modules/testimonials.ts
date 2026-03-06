interface Testimonial {
  text: string;
  name: string;
}

const CACHE_KEY = 'arbo_testimonials_selection';

const QUOTE_ICON = `<svg class="testimonials__quote-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>`;

const STAR_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getCachedSelection(): Testimonial[] | null {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    return JSON.parse(cached) as Testimonial[];
  } catch {
    return null;
  }
}

function cacheSelection(selection: Testimonial[]): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(selection));
  } catch { /* ignore quota errors */ }
}

function createCard(testimonial: Testimonial, delay: number): string {
  const stars = STAR_ICON.repeat(5);
  return `
    <div class="testimonials__card anim-target" data-anim="fade-up" data-anim-delay="${delay}">
      ${QUOTE_ICON}
      <div class="testimonials__stars">${stars}</div>
      <p class="testimonials__text">"${testimonial.text}"</p>
      <div><p class="testimonials__name">${testimonial.name}</p></div>
    </div>`;
}

function renderCards(grid: HTMLElement, selected: Testimonial[]): void {
  grid.innerHTML = selected.map((t, i) => createCard(t, i * 100)).join('');
}

export async function initTestimonials(): Promise<void> {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;

  // Use cached selection if available (same session)
  const cached = getCachedSelection();
  if (cached) {
    renderCards(grid, cached);
    return;
  }

  try {
    const base = import.meta.env.BASE_URL;
    const res = await fetch(`${base}data/testimonials.json`);
    const all: Testimonial[] = await res.json();
    const selected = shuffle(all).slice(0, 4);
    cacheSelection(selected);
    renderCards(grid, selected);
  } catch {
    // Fallback: grid stays empty rather than breaking the page
  }
}
