/* ── Interfaces ── */

export interface CnpjResponse {
  razao_social: string;
  estabelecimento: {
    nome_fantasia: string | null;
    logradouro: string;
    numero: string;
    bairro: string;
    cep: string;
    ddd1: string | null;
    telefone1: string | null;
    cidade: { nome: string };
    estado: { sigla: string };
  };
}

export interface CepResponse {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

/* ── Masks ── */

export function applyCnpjMask(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 14);
  return d
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

export function applyCepMask(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 8);
  return d.replace(/^(\d{5})(\d)/, '$1-$2');
}

export function extractDigits(value: string): string {
  return value.replace(/\D/g, '');
}

/* ── Rate Limiter (CNPJ.ws: 3 req/min) ── */

const cnpjTimestamps: number[] = [];
const RATE_LIMIT = 3;
const RATE_WINDOW = 60_000;

function checkRateLimit(): boolean {
  const now = Date.now();
  while (cnpjTimestamps.length && cnpjTimestamps[0] < now - RATE_WINDOW) {
    cnpjTimestamps.shift();
  }
  return cnpjTimestamps.length < RATE_LIMIT;
}

/* ── API Calls ── */

export async function fetchCnpjData(digits: string): Promise<CnpjResponse> {
  if (digits.length !== 14) throw new Error('CNPJ deve conter 14 dígitos.');
  if (!checkRateLimit()) throw new Error('Limite de consultas atingido. Aguarde 1 minuto.');

  cnpjTimestamps.push(Date.now());

  const res = await fetch(`https://publica.cnpj.ws/cnpj/${digits}`);
  if (res.status === 429) throw new Error('Limite do servidor atingido. Tente novamente em breve.');
  if (!res.ok) throw new Error('CNPJ não encontrado ou serviço indisponível.');
  return res.json();
}

export async function fetchCepData(digits: string): Promise<CepResponse> {
  if (digits.length !== 8) throw new Error('CEP deve conter 8 dígitos.');

  const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
  if (!res.ok) throw new Error('Serviço de CEP indisponível.');

  const data: CepResponse = await res.json();
  if (data.erro) throw new Error('CEP não encontrado.');
  return data;
}
