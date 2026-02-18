interface ToastOptions {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
}

export function showToast(options: ToastOptions): void {
  const container = document.getElementById('toast-container')!;
  const toast = document.createElement('div');
  toast.className = `toast toast--${options.variant || 'default'}`;

  toast.innerHTML = `
    <div class="toast__content">
      ${options.title ? `<p class="toast__title">${options.title}</p>` : ''}
      ${options.description ? `<p class="toast__description">${options.description}</p>` : ''}
    </div>
    <button class="toast__close" aria-label="Fechar">&times;</button>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('toast--visible'));

  const dismiss = () => {
    toast.classList.remove('toast--visible');
    toast.addEventListener('transitionend', () => toast.remove());
  };

  toast.querySelector('.toast__close')!.addEventListener('click', dismiss);
  setTimeout(dismiss, options.duration || 5000);
}
