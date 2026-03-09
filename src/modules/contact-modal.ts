import { WHATSAPP_NUMBER } from './config';
import { showToast } from './toast';
import {
  applyCnpjMask,
  applyCepMask,
  extractDigits,
  fetchCnpjData,
  fetchCepData,
} from './cnpj-cep-service';

/* ── Helper ── */

function fillField(id: string, value: string): void {
  const el = document.getElementById(id) as HTMLInputElement | null;
  if (el && value) el.value = value;
}

function clearStatus(el: HTMLElement): void {
  el.className = 'form-input-status';
  el.textContent = '';
}

/* ── Init ── */

export function initContactModal(): void {
  const dialog = document.getElementById('contact-dialog') as HTMLDialogElement;
  const form = document.getElementById('contact-form') as HTMLFormElement;
  const closeBtn = document.getElementById('dialog-close-btn')!;

  const personTypeInput = document.getElementById('personType') as HTMLInputElement;
  const pjFields = document.getElementById('pj-fields')!;
  const tabs = dialog.querySelectorAll<HTMLButtonElement>('.form-tab');
  const cnpjInput = document.getElementById('cnpj') as HTMLInputElement;
  const cnpjStatus = document.getElementById('cnpj-status')!;
  const cepInput = document.getElementById('cep') as HTMLInputElement;
  const cepStatus = document.getElementById('cep-status')!;
  const nameLabel = document.getElementById('name-label')!;
  const nameInput = document.getElementById('name') as HTMLInputElement;

  /* ── Dialog open / close ── */

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

  /* ── Tabs PF / PJ ── */

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const value = tab.dataset.tab!;
      personTypeInput.value = value;

      tabs.forEach(t => {
        const isActive = t.dataset.tab === value;
        t.classList.toggle('form-tab--active', isActive);
        t.setAttribute('aria-selected', String(isActive));
      });

      const isPj = value === 'pj';
      pjFields.hidden = !isPj;

      // Swap label: "Nome" ↔ "Razão Social"
      nameLabel.textContent = isPj ? 'Razão Social *' : 'Nome *';
      nameInput.placeholder = isPj ? 'Razão social da empresa' : 'Seu nome completo';

      if (!isPj) {
        cnpjInput.value = '';
        clearStatus(cnpjStatus);
      }
    });
  });

  /* ── CNPJ mask + auto-lookup ── */

  let cnpjLookupDone = false;

  cnpjInput.addEventListener('input', () => {
    cnpjInput.value = applyCnpjMask(cnpjInput.value);
    const digits = extractDigits(cnpjInput.value);

    if (digits.length < 14) {
      clearStatus(cnpjStatus);
      cnpjLookupDone = false;
    }

    if (digits.length === 14 && !cnpjLookupDone) {
      cnpjLookupDone = true;
      lookupCnpj(digits);
    }
  });

  async function lookupCnpj(digits: string): Promise<void> {
    cnpjStatus.className = 'form-input-status form-input-status--loading';
    cnpjStatus.textContent = '';

    try {
      const data = await fetchCnpjData(digits);
      cnpjStatus.className = 'form-input-status form-input-status--success';
      cnpjStatus.textContent = '✓';

      // Auto-fill razão social / nome fantasia
      nameInput.value = data.estabelecimento.nome_fantasia || data.razao_social;

      // Auto-fill address
      const est = data.estabelecimento;
      fillField('logradouro', est.logradouro);
      fillField('numero', est.numero);
      fillField('bairro', est.bairro);
      fillField('cidade', est.cidade.nome);
      fillField('uf', est.estado.sigla);

      if (est.cep) {
        cepInput.value = applyCepMask(est.cep.replace(/\D/g, ''));
      }

      // Auto-fill phone (only if empty)
      if (est.ddd1 && est.telefone1) {
        const phoneInput = document.getElementById('phone') as HTMLInputElement;
        if (!phoneInput.value.trim()) {
          phoneInput.value = `(${est.ddd1}) ${est.telefone1}`;
        }
      }
    } catch (err) {
      cnpjStatus.className = 'form-input-status form-input-status--error';
      cnpjStatus.textContent = '✗';
      showToast({
        title: 'Erro na consulta CNPJ',
        description: (err as Error).message,
        variant: 'destructive',
      });
    }
  }

  /* ── CEP mask + auto-lookup ── */

  let cepLookupDone = false;

  cepInput.addEventListener('input', () => {
    cepInput.value = applyCepMask(cepInput.value);
    const digits = extractDigits(cepInput.value);

    if (digits.length < 8) {
      clearStatus(cepStatus);
      cepLookupDone = false;
    }

    if (digits.length === 8 && !cepLookupDone) {
      cepLookupDone = true;
      lookupCep(digits);
    }
  });

  async function lookupCep(digits: string): Promise<void> {
    cepStatus.className = 'form-input-status form-input-status--loading';
    cepStatus.textContent = '';

    try {
      const data = await fetchCepData(digits);
      cepStatus.className = 'form-input-status form-input-status--success';
      cepStatus.textContent = '✓';

      fillField('logradouro', data.logradouro);
      fillField('bairro', data.bairro);
      fillField('cidade', data.localidade);
      fillField('uf', data.uf);
    } catch (err) {
      cepStatus.className = 'form-input-status form-input-status--error';
      cepStatus.textContent = '✗';
      showToast({
        title: 'Erro na consulta CEP',
        description: (err as Error).message,
        variant: 'destructive',
      });
    }
  }

  /* ── Form submission ── */

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);

    const personType = (fd.get('personType') as string) || 'pf';
    const cnpj = (fd.get('cnpj') as string || '').trim();
    const name = (fd.get('name') as string || '').trim();
    const phone = (fd.get('phone') as string || '').trim();
    const email = (fd.get('email') as string || '').trim();
    const cep = (fd.get('cep') as string || '').trim();
    const logradouro = (fd.get('logradouro') as string || '').trim();
    const numero = (fd.get('numero') as string || '').trim();
    const bairro = (fd.get('bairro') as string || '').trim();
    const cidade = (fd.get('cidade') as string || '').trim();
    const uf = (fd.get('uf') as string || '').trim();
    const serviceType = (fd.get('serviceType') as string || '').trim();
    const description = (fd.get('description') as string || '').trim();

    // Validation
    const errorEl = document.getElementById('form-error')!;
    const missing: string[] = [];
    if (!name) missing.push(personType === 'pj' ? 'razão social' : 'nome');
    if (!phone && !email) missing.push('telefone ou e-mail');
    if (!serviceType) missing.push('tipo de manejo');
    if (personType === 'pj' && extractDigits(cnpj).length !== 14) missing.push('CNPJ');

    if (missing.length) {
      errorEl.textContent = `Preencha: ${missing.join(', ')}.`;
      errorEl.hidden = false;
      return;
    }
    errorEl.hidden = true;

    // Build address string
    const addressParts = [logradouro, numero, bairro, cidade, uf, cep].filter(Boolean);
    const addressStr = addressParts.join(', ');

    // Build WhatsApp message
    const lines: string[] = [
      '*Solicitação de Orçamento*',
      '',
      `*Tipo:* ${personType === 'pj' ? 'Pessoa Jurídica' : 'Pessoa Física'}`,
    ];

    if (personType === 'pj' && cnpj) {
      lines.push(`*CNPJ:* ${cnpj}`);
    }

    const nameFieldLabel = personType === 'pj' ? 'Razão Social' : 'Nome';
    lines.push('', `*${nameFieldLabel}:* ${name}`, '', `*Telefone:* ${phone}`);

    if (email) lines.push('', `*E-mail:* ${email}`);
    if (addressStr) lines.push('', `*Endereço:* ${addressStr}`);

    lines.push('', `*Tipo de Manejo:* ${serviceType}`);

    if (description) lines.push('', `*Descrição:*\n${description}`);

    const message = lines.join('\n');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');

    // Reset
    form.reset();
    resetExtras();
    closeDialog();
  });

  /* ── Reset extras ── */

  function resetExtras(): void {
    personTypeInput.value = 'pf';
    pjFields.hidden = true;
    nameLabel.textContent = 'Nome *';
    nameInput.placeholder = 'Seu nome completo';
    tabs.forEach(t => {
      t.classList.toggle('form-tab--active', t.dataset.tab === 'pf');
      t.setAttribute('aria-selected', String(t.dataset.tab === 'pf'));
    });
    clearStatus(cnpjStatus);
    clearStatus(cepStatus);
    cnpjLookupDone = false;
    cepLookupDone = false;
  }
}
