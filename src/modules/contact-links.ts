import { trackEmailClickConversion } from './analytics';

// Rastreia cliques nos links de e-mail (mailto:) como conversão secundária.
// Presente na seção de contato da home e de todas as páginas de serviço.
export function initContactLinks(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => trackEmailClickConversion());
  });
}
