const MENU_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
const X_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';

function closeMenu(mobileMenu: HTMLElement, hamburgerBtn: HTMLElement): void {
  mobileMenu.classList.remove('is-open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  hamburgerBtn.innerHTML = MENU_SVG;
  document.body.classList.remove('menu-open');
}

function trapFocus(e: KeyboardEvent, mobileMenu: HTMLElement, hamburgerBtn: HTMLElement): void {
  if (e.key === 'Escape') {
    closeMenu(mobileMenu, hamburgerBtn);
    hamburgerBtn.focus();
    return;
  }

  if (e.key !== 'Tab') return;

  const focusable = mobileMenu.querySelectorAll<HTMLElement>('a, button');
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

export function initNavbar(): void {
  const navbar = document.getElementById('navbar')!;
  const hamburgerBtn = document.getElementById('hamburger-btn')!;
  const mobileMenu = document.getElementById('mobile-menu')!;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 50);
  });

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    hamburgerBtn.innerHTML = isOpen ? X_SVG : MENU_SVG;
    document.body.classList.toggle('menu-open', isOpen);

    if (isOpen) {
      const firstLink = mobileMenu.querySelector<HTMLElement>('a');
      firstLink?.focus();
    }
  });

  mobileMenu.addEventListener('keydown', (e) => trapFocus(e, mobileMenu, hamburgerBtn));

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => closeMenu(mobileMenu, hamburgerBtn));
  });

  // Initial check
  window.dispatchEvent(new Event('scroll'));
}
