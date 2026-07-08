import { trackWhatsappClickConversion } from './analytics';

export function initFooter(): void {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

  document.querySelectorAll<HTMLAnchorElement>('.footer a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => trackWhatsappClickConversion());
  });
}
