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
import { initContactLinks } from './modules/contact-links';

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

async function safely(fn: () => void | Promise<void>): Promise<void> {
  try {
    await fn();
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await safely(() => injectSharedComponents());
  await safely(() => initDarkMode());
  await safely(() => initNavbar());
  await safely(() => initCookieConsent());
  await safely(() => initTestimonials());
  await safely(() => initClients());

  // Only hide .anim-target content once the observer that reveals it is live.
  document.documentElement.classList.add('js-anim');
  await safely(() => initScrollAnimator());

  await safely(() => initCityFlip());

  await safely(() => setupLazyContactModal());
  await safely(() => initContactLinks());
  await safely(() => initFooter());
});
