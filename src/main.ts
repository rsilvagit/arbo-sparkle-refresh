import './styles/main.css';
import { injectSharedComponents } from './modules/shared-components';
import { initNavbar } from './modules/navbar';
import { initScrollAnimator } from './modules/scroll-animator';
import { initContactModal } from './modules/contact-modal';
import { initFooter } from './modules/footer';
import { initCookieConsent } from './modules/cookie-consent';
import { initTestimonials } from './modules/testimonials';
import { initDarkMode } from './modules/dark-mode';

document.addEventListener('DOMContentLoaded', () => {
  injectSharedComponents();
  initDarkMode();
  initNavbar();
  initTestimonials();
  initScrollAnimator();
  initContactModal();
  initFooter();
  initCookieConsent();
});
