declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackConversion(): void {
  window.gtag?.('event', 'conversion', {
    send_to: 'AW-952816234/yXLNCNKZ-cwcEOqkq8YD',
  });
}
