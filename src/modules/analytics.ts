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
