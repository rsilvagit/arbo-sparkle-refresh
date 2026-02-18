const STORAGE_KEY = 'arbo-cookie-consent';

export function initCookieConsent(): void {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return;

  const banner = document.getElementById('cookie-consent');
  if (!banner) return;

  banner.classList.remove('cookie-consent--hidden');

  const acceptBtn = document.getElementById('cookie-accept');
  const rejectBtn = document.getElementById('cookie-reject');

  const dismiss = (value: string) => {
    localStorage.setItem(STORAGE_KEY, value);
    banner.classList.add('cookie-consent--hidden');
  };

  acceptBtn?.addEventListener('click', () => dismiss('accepted'));
  rejectBtn?.addEventListener('click', () => dismiss('rejected'));
}
