import './styles/main.css';
import { injectSharedComponents } from './modules/shared-components';
import { initNavbar } from './modules/navbar';
import { initScrollAnimator } from './modules/scroll-animator';
import { initContactModal } from './modules/contact-modal';
import { initFooter } from './modules/footer';
import { initCookieConsent } from './modules/cookie-consent';
import { initTestimonials } from './modules/testimonials';
import { initClients } from './modules/clients';
import { initDarkMode } from './modules/dark-mode';
import { initCityFlip } from './modules/city-flip';

document.addEventListener('DOMContentLoaded', async () => {
  injectSharedComponents();
  initDarkMode();
  initNavbar();
  await initTestimonials();
  await initClients();
  initScrollAnimator();
  initCityFlip();
  initContactModal();
  initFooter();
  initCookieConsent();
});
