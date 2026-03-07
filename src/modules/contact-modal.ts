import { WHATSAPP_NUMBER } from './config';

export function initContactModal(): void {
  const dialog = document.getElementById('contact-dialog') as HTMLDialogElement;
  const form = document.getElementById('contact-form') as HTMLFormElement;
  const closeBtn = document.getElementById('dialog-close-btn')!;

  const openDialog = () => {
    dialog.showModal();
    document.body.classList.add('menu-open');
  };

  const closeDialog = () => {
    dialog.close();
    document.body.classList.remove('menu-open');
  };

  document.querySelectorAll('[data-open-modal="contact"]').forEach(btn => {
    btn.addEventListener('click', openDialog);
  });

  closeBtn.addEventListener('click', closeDialog);

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) closeDialog();
  });

  dialog.addEventListener('close', () => {
    document.body.classList.remove('menu-open');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = (formData.get('name') as string || '').trim();
    const address = (formData.get('address') as string || '').trim();
    const phone = (formData.get('phone') as string || '').trim();
    const email = (formData.get('email') as string || '').trim();
    const serviceType = (formData.get('serviceType') as string || '').trim();
    const description = (formData.get('description') as string || '').trim();

    const errorEl = document.getElementById('form-error')!;
    if (!name || !phone || !serviceType) {
      errorEl.textContent = 'Preencha pelo menos nome, telefone e tipo de manejo.';
      errorEl.hidden = false;
      return;
    }
    errorEl.hidden = true;

    const message = [
      `*Solicitação de Orçamento*`,
      ``,
      `*Nome:* ${name}`,
      ``,
      address ? `*Endereço:* ${address}\n` : '',
      `*Telefone:* ${phone}`,
      ``,
      email ? `*E-mail:* ${email}\n` : '',
      `*Tipo de Manejo:* ${serviceType}`,
      ``,
      description ? `*Descrição:*\n${description}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');

    form.reset();
    closeDialog();
  });
}
