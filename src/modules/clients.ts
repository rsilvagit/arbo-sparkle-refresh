interface Client {
  name: string;
  logo: string;
  logoDark?: string;
}

const CACHE_KEY = 'arbo_clients_selection';
const DISPLAY_COUNT = 8;

const BUILDING_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`;

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getCachedSelection(): Client[] | null {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    return JSON.parse(cached) as Client[];
  } catch {
    return null;
  }
}

function cacheSelection(selection: Client[]): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(selection));
  } catch { /* ignore quota errors */ }
}

function createCard(client: Client, delay: number): string {
  const base = import.meta.env.BASE_URL;

  if (client.logo) {
    const lightImg = `<img src="${base}images/clients/${client.logo}" alt="${client.name}" class="clients__logo clients__logo--light" loading="lazy" />`;
    const darkImg = client.logoDark
      ? `<img src="${base}images/clients/${client.logoDark}" alt="${client.name}" class="clients__logo clients__logo--dark" loading="lazy" />`
      : '';

    return `
      <div class="clients__card anim-target" data-anim="scale-in" data-anim-delay="${delay}">
        ${lightImg}
        ${darkImg}
      </div>`;
  }

  return `
    <div class="clients__card anim-target" data-anim="scale-in" data-anim-delay="${delay}">
      ${BUILDING_ICON}
      <span class="clients__card-name">${client.name}</span>
    </div>`;
}

function renderCards(grid: HTMLElement, selected: Client[]): void {
  grid.innerHTML = selected.map((c, i) => createCard(c, i * 50)).join('');
}

export async function initClients(): Promise<void> {
  const grid = document.getElementById('clients-grid');
  if (!grid) return;

  const cached = getCachedSelection();
  if (cached) {
    renderCards(grid, cached);
    return;
  }

  try {
    const base = import.meta.env.BASE_URL;
    const res = await fetch(`${base}data/clients.json`);
    const all: Client[] = await res.json();
    const withLogo = shuffle(all.filter(c => c.logo));
    const withoutLogo = shuffle(all.filter(c => !c.logo));
    const selected = [...withLogo, ...withoutLogo].slice(0, DISPLAY_COUNT);
    cacheSelection(selected);
    renderCards(grid, selected);
  } catch {
    // Fallback: grid stays empty
  }
}
