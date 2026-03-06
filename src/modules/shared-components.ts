const BASE = '/arbo-sparkle-refresh/';

function isHomePage(): boolean {
  const path = window.location.pathname;
  return path === BASE || path === `${BASE}index.html` || path === '/' || path === '/index.html';
}

function navLink(hash: string, label: string): string {
  const href = isHomePage() ? hash : `${BASE}${hash.replace('#', '#')}`;
  const prefix = isHomePage() ? '' : BASE;
  if (hash.startsWith('#')) return `<a href="${prefix}${hash}" class="navbar__link">${label}</a>`;
  return `<a href="${hash}" class="navbar__link">${label}</a>`;
}

function mobileNavLink(hash: string, label: string, cls = 'navbar__mobile-link'): string {
  const prefix = isHomePage() ? '' : BASE;
  if (hash.startsWith('#')) return `<a href="${prefix}${hash}" class="${cls}">${label}</a>`;
  return `<a href="${hash}" class="${cls}">${label}</a>`;
}

export function renderNavbar(): string {
  const home = isHomePage() ? '#' : BASE;
  return `
  <header id="navbar" class="navbar">
    <div class="container navbar__inner">
      <a href="${home}" class="navbar__brand">
        <img src="/images/logo.png" alt="Arbo Soluções" class="navbar__logo" />
        <span class="navbar__title">Arbo Soluções</span>
      </a>
      <nav class="navbar__links">
        <a href="${home}" class="navbar__link">Home</a>
        ${navLink('#quem-somos', 'Quem Somos')}
        ${navLink('#servicos', 'Serviços')}
        ${navLink('#contato', 'Contato')}
        <a href="https://wa.me/5551984843008" target="_blank" rel="noopener noreferrer" class="navbar__cta">(51) 98484-3008</a>
      </nav>
      <button class="navbar__hamburger" id="hamburger-btn" aria-label="Menu" aria-expanded="false">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
      </button>
    </div>
    <div class="navbar__mobile-menu" id="mobile-menu">
      ${mobileNavLink(home, 'Home')}
      ${mobileNavLink('#quem-somos', 'Quem Somos')}
      ${mobileNavLink('#servicos', 'Serviços')}
      ${mobileNavLink('#contato', 'Contato')}
      <a href="https://wa.me/5551984843008" target="_blank" rel="noopener noreferrer" class="navbar__mobile-phone">(51) 98484-3008</a>
    </div>
  </header>`;
}

export function renderFooter(): string {
  const prefix = isHomePage() ? '' : BASE;
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div>
          <div class="footer__brand">
            <img src="/images/logo.png" alt="Arbo Soluções" class="footer__logo" loading="lazy" width="40" height="40" />
            <span class="footer__brand-name">Arbo Soluções</span>
          </div>
          <p class="footer__tagline">Soluções ambientais com segurança, responsabilidade e respeito às normas desde 2014.</p>
        </div>
        <div>
          <h4 class="footer__col-title">Responsável Técnica</h4>
          <div class="footer__info">
            <p>Biól. Andrea Saldanha Weber - UFRGS</p>
            <p>Esp. Arborização Urbana - UNIFESP</p>
            <p>Esp. Botânica - CRBio03</p>
            <p>CRBio- 53432-03D</p>
          </div>
        </div>
        <div>
          <h4 class="footer__col-title">Navegação</h4>
          <nav class="footer__nav">
            <a href="${prefix}#quem-somos" class="footer__nav-link">Quem Somos</a>
            <a href="${prefix}#servicos" class="footer__nav-link">Serviços</a>
            <a href="${prefix}#contato" class="footer__nav-link">Contato</a>
            <a href="https://wa.me/5551984843008" target="_blank" rel="noopener noreferrer" class="footer__nav-link">WhatsApp</a>
          </nav>
        </div>
      </div>
      <div class="footer__bottom">
        <p class="footer__copyright">&copy; <span id="footer-year"></span> Arbo Soluções. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>`;
}

export function renderContactModal(): string {
  return `
  <dialog id="contact-dialog" class="contact-dialog">
    <div class="contact-dialog__inner">
      <div class="contact-dialog__header">
        <h2 class="contact-dialog__title">Solicite seu Orçamento</h2>
        <button class="contact-dialog__close" id="dialog-close-btn" aria-label="Fechar">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      <form id="contact-form" class="contact-form" novalidate>
        <div class="form-group">
          <label for="name" class="form-label">Nome *</label>
          <input type="text" id="name" name="name" placeholder="Seu nome completo" maxlength="100" class="form-input" />
        </div>
        <div class="form-group">
          <label for="address" class="form-label">Endereço</label>
          <input type="text" id="address" name="address" placeholder="Rua, número, bairro" maxlength="200" class="form-input" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="phone" class="form-label">Telefone *</label>
            <input type="tel" id="phone" name="phone" placeholder="(51) 99999-9999" maxlength="20" class="form-input" />
          </div>
          <div class="form-group">
            <label for="email" class="form-label">E-mail</label>
            <input type="email" id="email" name="email" placeholder="seu@email.com" maxlength="255" class="form-input" />
          </div>
        </div>
        <div class="form-group">
          <label for="serviceType" class="form-label">Tipo de Manejo *</label>
          <select id="serviceType" name="serviceType" class="form-select">
            <option value="" disabled selected>Selecione o serviço</option>
            <option value="Poda de Árvores">Poda de Árvores</option>
            <option value="Remoção / Corte de Árvores">Remoção / Corte de Árvores</option>
            <option value="Análise de Risco">Análise de Risco</option>
            <option value="Laudo Técnico">Laudo Técnico</option>
            <option value="Consultoria Ambiental">Consultoria Ambiental</option>
            <option value="Plantio Compensatório">Plantio Compensatório</option>
            <option value="Licenciamento Ambiental">Licenciamento Ambiental</option>
            <option value="Monitoramento de Vegetação">Monitoramento de Vegetação</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
        <div class="form-group">
          <label for="description" class="form-label">Descrição</label>
          <textarea id="description" name="description" rows="4" maxlength="1000" placeholder="Descreva sua necessidade..." class="form-textarea"></textarea>
        </div>
        <button type="submit" class="btn btn--submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>
          Enviar pelo WhatsApp
        </button>
      </form>
    </div>
  </dialog>
  <div id="toast-container" class="toast-container" aria-live="polite"></div>`;
}

export function renderCookieConsent(): string {
  return `
  <div id="cookie-consent" class="cookie-consent cookie-consent--hidden" role="dialog" aria-label="Consentimento de cookies">
    <div class="cookie-consent__inner container">
      <div class="cookie-consent__text">
        <p>Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência de navegação e analisar o tráfego do site. Ao continuar navegando, você concorda com nossa <a href="#" class="cookie-consent__link">Política de Privacidade</a>.</p>
      </div>
      <div class="cookie-consent__actions">
        <button id="cookie-accept" class="btn btn--cta cookie-consent__btn">Aceitar</button>
        <button id="cookie-reject" class="cookie-consent__btn cookie-consent__btn--outline">Rejeitar</button>
      </div>
    </div>
  </div>`;
}

export function injectSharedComponents(): void {
  const body = document.body;

  // Only inject if placeholders or no existing elements
  if (!document.getElementById('navbar')) {
    body.insertAdjacentHTML('afterbegin', renderNavbar());
  }

  if (!document.getElementById('footer-year')) {
    body.insertAdjacentHTML('beforeend', renderFooter());
  }

  if (!document.getElementById('contact-dialog')) {
    body.insertAdjacentHTML('beforeend', renderContactModal());
  }

  if (!document.getElementById('cookie-consent')) {
    body.insertAdjacentHTML('beforeend', renderCookieConsent());
  }
}
