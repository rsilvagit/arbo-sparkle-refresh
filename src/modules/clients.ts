import { shuffle } from './utils';

interface Client {
  name: string;
  logo: string;
  logoDark?: string;
}

const DISPLAY_COUNT = 8;

const BUILDING_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`;

function isDarkMode(): boolean {
  return document.documentElement.classList.contains('dark');
}

function createCard(client: Client, delay: number): string {
  const base = import.meta.env.BASE_URL;

  if (client.logo) {
    const useDark = isDarkMode() && !!client.logoDark;
    const currentLogo = useDark ? client.logoDark! : client.logo;
    const variantClass = useDark ? 'clients__logo--dark' : 'clients__logo--light';
    const darkAttr = client.logoDark ? ` data-logo-dark="${client.logoDark}"` : '';
    return `
      <div class="clients__card anim-target" data-anim="scale-in" data-anim-delay="${delay}">
        <img src="${base}images/clients/${currentLogo}" alt="${client.name}" class="clients__logo ${variantClass}" loading="lazy" width="160" height="48" data-logo-light="${client.logo}"${darkAttr} />
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

function watchThemeChanges(grid: HTMLElement): void {
  const base = import.meta.env.BASE_URL;
  const observer = new MutationObserver(() => {
    const dark = isDarkMode();
    grid.querySelectorAll<HTMLImageElement>('img[data-logo-light]').forEach((img) => {
      const light = img.dataset.logoLight!;
      const darkLogo = img.dataset.logoDark;
      const useDark = dark && !!darkLogo;
      const targetLogo = useDark ? darkLogo! : light;
      const targetSrc = `${base}images/clients/${targetLogo}`;
      if (img.getAttribute('src') !== targetSrc) {
        img.setAttribute('src', targetSrc);
      }
      img.classList.toggle('clients__logo--dark', useDark);
      img.classList.toggle('clients__logo--light', !useDark);
    });
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}

export async function initClients(): Promise<void> {
  const grid = document.getElementById('clients-grid');
  if (!grid) return;

  try {
    const base = import.meta.env.BASE_URL;
    const res = await fetch(`${base}data/clients.json`);
    const all: Client[] = await res.json();
    const withLogo = shuffle(all.filter(c => c.logo));
    const withoutLogo = shuffle(all.filter(c => !c.logo));
    const selected = [...withLogo, ...withoutLogo].slice(0, DISPLAY_COUNT);
    renderCards(grid, selected);
    watchThemeChanges(grid);
  } catch {
    // Fallback: grid stays empty
  }
}
