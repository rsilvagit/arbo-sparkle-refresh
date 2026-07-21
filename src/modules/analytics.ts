declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackContactConversion(): void {
  window.gtag?.('event', 'conversion', {
    send_to: 'AW-952816234/yXLNCNKZ-cwcEOqkq8YD',
  });
}

export function trackWhatsappClickConversion(): void {
  window.gtag?.('event', 'conversion', {
    send_to: 'AW-952816234/7UVWCKH7hLMBEOqkq8YD',
  });
}

// Conversão secundária (só medição): clique no link de e-mail.
// Dispara um evento no GA4 (G-V75B8MZB7W). Marque "contact_email_click" como
// Evento-chave no GA4 e importe-o no Google Ads como conversão SECUNDÁRIA —
// sem alterar código. Não deve entrar no lance (nunca otimizar para isso).
export function trackEmailClickConversion(): void {
  window.gtag?.('event', 'contact_email_click', {
    method: 'email',
  });
}
