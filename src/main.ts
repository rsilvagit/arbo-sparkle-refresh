import './styles/main.css';
import { injectSharedComponents } from './modules/shared-components';
import { initNavbar } from './modules/navbar';
import { initScrollAnimator } from './modules/scroll-animator';
import { initFooter } from './modules/footer';
import { initCookieConsent } from './modules/cookie-consent';
import { initTestimonials } from './modules/testimonials';
import { initClients } from './modules/clients';
import { initDarkMode } from './modules/dark-mode';
import { initCityFlip } from './modules/city-flip';

function isServicePage(): boolean {
  return window.location.pathname.includes('/servicos/');
}

function setupLazyContactModal(): void {
  const triggers = document.querySelectorAll<HTMLElement>('[data-open-modal="contact"]');
  if (triggers.length === 0) return;

  const handler = async (event: Event) => {
    event.preventDefault();
    const mod = await import('./modules/contact-modal');
    mod.initContactModal();
    mod.openContactModal();
  };

  triggers.forEach(btn => btn.addEventListener('click', handler, { once: true }));
}

document.addEventListener('DOMContentLoaded', async () => {
  injectSharedComponents();
  initDarkMode();
  initNavbar();
  initCookieConsent();
  await initTestimonials();
  await initClients();
  initScrollAnimator();
  initCityFlip();

  if (isServicePage()) {
    const { injectRelatedServices } = await import('./modules/related-services');
    injectRelatedServices();
  }

  setupLazyContactModal();
  initFooter();
});
