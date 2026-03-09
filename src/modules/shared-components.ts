import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, BASE_PATH } from './config';

const BASE = BASE_PATH;
const LOGO = `${BASE_PATH}images/logo.png`;

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
        <img src="${LOGO}" alt="Arbo Soluções" class="navbar__logo" width="64" height="64" />
        <span class="navbar__title">Arbo Soluções</span>
      </a>
      <nav class="navbar__links">
        <a href="${home}" class="navbar__link">Home</a>
        ${navLink('#quem-somos', 'Quem Somos')}
        ${navLink('#servicos', 'Serviços')}
        ${navLink('#contato', 'Contato')}
        <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener noreferrer" class="navbar__cta">${WHATSAPP_DISPLAY}</a>
        <button class="theme-toggle" aria-label="Alternar tema">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        </button>
      </nav>
      <div class="navbar__mobile-actions">
        <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener noreferrer" class="navbar__mobile-cta" aria-label="WhatsApp">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </a>
        <button class="navbar__hamburger" id="hamburger-btn" aria-label="Menu" aria-expanded="false">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
    </div>
    <div class="navbar__mobile-menu" id="mobile-menu">
      ${mobileNavLink(home, 'Home')}
      ${mobileNavLink('#quem-somos', 'Quem Somos')}
      ${mobileNavLink('#servicos', 'Serviços')}
      ${mobileNavLink('#contato', 'Contato')}
      <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener noreferrer" class="navbar__mobile-phone">${WHATSAPP_DISPLAY}</a>
      <button class="theme-toggle theme-toggle--mobile" aria-label="Alternar tema">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
      </button>
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
            <img src="${LOGO}" alt="Arbo Soluções" class="footer__logo" loading="lazy" width="40" height="40" />
            <span class="footer__brand-name">Arbo Soluções</span>
          </div>
          <p class="footer__tagline">Soluções ambientais com segurança, responsabilidade e respeito às normas desde 2014.</p>
        </div>
        <div>
          <p class="footer__col-title">Responsável Técnica</p>
          <div class="footer__info">
            <p>Biól. Andrea Saldanha Weber - UFRGS</p>
            <p>Esp. Arborização Urbana - UNIFESP</p>
            <p>Esp. Botânica - CRBio03</p>
            <p>CRBio- 53432-03D</p>
          </div>
        </div>
        <div>
          <p class="footer__col-title">Navegação</p>
          <nav class="footer__nav">
            <a href="${prefix}#quem-somos" class="footer__nav-link">Quem Somos</a>
            <a href="${prefix}#servicos" class="footer__nav-link">Serviços</a>
            <a href="${prefix}#contato" class="footer__nav-link">Contato</a>
            <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener noreferrer" class="footer__nav-link">WhatsApp</a>
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
      <!-- Abas PF / PJ -->
      <div class="form-tabs" role="tablist">
        <button type="button" class="form-tab form-tab--active" role="tab" data-tab="pf" aria-selected="true">Pessoa Física</button>
        <button type="button" class="form-tab" role="tab" data-tab="pj" aria-selected="false">Pessoa Jurídica</button>
      </div>
      <form id="contact-form" class="contact-form" novalidate>
        <input type="hidden" id="personType" name="personType" value="pf" />
        <!-- Campo CNPJ (PJ only) -->
        <div id="pj-fields" class="form-pj-section" hidden>
          <div class="form-group">
            <label for="cnpj" class="form-label">CNPJ *</label>
            <div class="form-input-with-status">
              <input type="text" id="cnpj" name="cnpj" placeholder="XX.XXX.XXX/XXXX-XX" maxlength="18" class="form-input" />
              <span id="cnpj-status" class="form-input-status"></span>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="name" id="name-label" class="form-label">Nome *</label>
          <input type="text" id="name" name="name" placeholder="Seu nome completo" maxlength="100" class="form-input" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="phone" class="form-label">Telefone *</label>
            <input type="tel" id="phone" name="phone" placeholder="(51) 99999-9999" maxlength="20" class="form-input" />
          </div>
          <div class="form-group">
            <label for="email" class="form-label">E-mail *</label>
            <input type="email" id="email" name="email" placeholder="seu@email.com" maxlength="255" class="form-input" />
          </div>
        </div>
        <!-- Endereço estruturado -->
        <div class="form-row form-row--cep">
          <div class="form-group form-group--cep">
            <label for="cep" class="form-label">CEP</label>
            <div class="form-input-with-status">
              <input type="text" id="cep" name="cep" placeholder="XXXXX-XXX" maxlength="9" class="form-input" />
              <span id="cep-status" class="form-input-status"></span>
            </div>
          </div>
          <div class="form-group form-group--logradouro">
            <label for="logradouro" class="form-label">Logradouro</label>
            <input type="text" id="logradouro" name="logradouro" placeholder="Rua / Avenida" maxlength="200" class="form-input" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="numero" class="form-label">Número</label>
            <input type="text" id="numero" name="numero" placeholder="Nº" maxlength="10" class="form-input" />
          </div>
          <div class="form-group">
            <label for="bairro" class="form-label">Bairro</label>
            <input type="text" id="bairro" name="bairro" placeholder="Bairro" maxlength="100" class="form-input" />
          </div>
        </div>
        <div class="form-row form-row--cidade">
          <div class="form-group form-group--cidade">
            <label for="cidade" class="form-label">Cidade</label>
            <input type="text" id="cidade" name="cidade" placeholder="Cidade" maxlength="100" class="form-input" />
          </div>
          <div class="form-group form-group--uf">
            <label for="uf" class="form-label">UF</label>
            <input type="text" id="uf" name="uf" placeholder="RS" maxlength="2" class="form-input" />
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
          <textarea id="description" name="description" rows="3" maxlength="1000" placeholder="Descreva sua necessidade..." class="form-textarea"></textarea>
        </div>
        <div id="form-error" class="form-error" role="alert" hidden></div>
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

  // Skip navigation link
  if (!document.querySelector('.skip-link')) {
    body.insertAdjacentHTML('afterbegin', '<a href="#main-content" class="skip-link">Pular para o conteúdo</a>');
  }

  // Only inject if placeholders or no existing elements
  if (!document.getElementById('navbar')) {
    body.insertAdjacentHTML('afterbegin', renderNavbar());
  }

  if (!document.getElementById('footer-year')) {
    body.insertAdjacentHTML('beforeend', renderFooter());
  }

  // Wrap content in <main> if not present (must run after footer injection)
  if (!document.getElementById('main-content')) {
    const navbar = document.getElementById('navbar');
    const footer = document.querySelector('.footer');
    if (navbar && footer) {
      const main = document.createElement('main');
      main.id = 'main-content';
      let sibling = navbar.nextElementSibling;
      const toWrap: Element[] = [];
      while (sibling && sibling !== footer) {
        toWrap.push(sibling);
        sibling = sibling.nextElementSibling;
      }
      if (toWrap.length > 0) {
        navbar.after(main);
        toWrap.forEach(el => main.appendChild(el));
      }
    }
  }

  if (!document.getElementById('contact-dialog')) {
    body.insertAdjacentHTML('beforeend', renderContactModal());
  }

  if (!document.getElementById('cookie-consent')) {
    body.insertAdjacentHTML('beforeend', renderCookieConsent());
  }
}
 
