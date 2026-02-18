import './styles/main.css';
import { initNavbar } from './modules/navbar';
import { initScrollAnimator } from './modules/scroll-animator';
import { initContactModal } from './modules/contact-modal';
import { initFooter } from './modules/footer';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimator();
  initContactModal();
  initFooter();
});
