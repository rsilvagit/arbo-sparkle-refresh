import { showToast } from './toast';

export function initContactModal(): void {
  const dialog = document.getElementById('contact-dialog') as HTMLDialogElement;
  const form = document.getElementById('contact-form') as HTMLFormElement;
  const closeBtn = document.getElementById('dialog-close-btn')!;

  // All buttons that open the modal
  document.querySelectorAll('[data-open-modal="contact"]').forEach(btn => {
    btn.addEventListener('click', () => dialog.showModal());
  });

  closeBtn.addEventListener('click', () => dialog.close());

  // Close on backdrop click
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
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

    if (!name || !phone || !serviceType) {
      showToast({
        title: 'Campos obrigatórios',
        description: 'Preencha pelo menos nome, telefone e tipo de manejo.',
        variant: 'destructive',
      });
      return;
    }

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

    window.open(`https://wa.me/5551984843008?text=${encodeURIComponent(message)}`, '_blank');

    form.reset();
    dialog.close();
  });
}
