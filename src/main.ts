import './styles/main.css';
import { initNavbar } from './modules/navbar';
import { initScrollAnimator } from './modules/scroll-animator';
import { initContactModal } from './modules/contact-modal';
import { initFooter } from './modules/footer';
import { initCookieConsent } from './modules/cookie-consent';
import { initTestimonials } from './modules/testimonials';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTestimonials();
  initScrollAnimator();
  initContactModal();
  initFooter();
  initCookieConsent();
});
