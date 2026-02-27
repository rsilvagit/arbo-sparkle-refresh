const STORAGE_KEY = 'arbo-cookie-consent';

export function initCookieConsent(): void {
  if (localStorage.getItem(STORAGE_KEY)) return;

  const banner = document.getElementById('cookie-consent');
  if (!banner) return;

  banner.classList.remove('cookie-consent--hidden');

  const dismiss = (value: string) => {
    localStorage.setItem(STORAGE_KEY, value);
    banner.classList.add('cookie-consent--hidden');
  };

  document.getElementById('cookie-accept')?.addEventListener('click', () => dismiss('accepted'));
  document.getElementById('cookie-reject')?.addEventListener('click', () => dismiss('rejected'));
}
