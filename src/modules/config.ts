export const WHATSAPP_NUMBER = '5551984843008';
export const WHATSAPP_DISPLAY = '(51) 98484-3008';
export const WHATSAPP_DEFAULT_MESSAGE = 'Olá! Visitei o site da Arbo Soluções e gostaria de solicitar um orçamento.';
export const BASE_PATH = '/';

/** Serviço associado a uma página `/servicos/<slug>/`. */
export interface PageService {
  /** Nome exibido na mensagem do WhatsApp. */
  label: string;
  /** Valor equivalente na lista "Tipo de Manejo" do modal, quando existir. */
  modalOption?: string;
}

const SERVICE_PAGES: Record<string, PageService> = {
  'poda': { label: 'Poda de Árvores', modalOption: 'Poda de Árvores' },
  'corte-arvores': { label: 'Remoção / Corte de Árvores', modalOption: 'Remoção / Corte de Árvores' },
  'analise-risco': { label: 'Análise de Risco Arbóreo', modalOption: 'Análise de Risco' },
  'laudos-tecnicos': { label: 'Laudo Técnico', modalOption: 'Laudo Técnico' },
  'consultoria-ambiental': { label: 'Consultoria Ambiental', modalOption: 'Consultoria Ambiental' },
  'plantios-compensatorios': { label: 'Plantio Compensatório', modalOption: 'Plantio Compensatório' },
  'licenciamento-ambiental': { label: 'Licenciamento Ambiental', modalOption: 'Licenciamento Ambiental' },
  'monitoramento-vegetacao': { label: 'Monitoramento de Vegetação', modalOption: 'Monitoramento de Vegetação' },
  'art': { label: 'ART (Anotação de Responsabilidade Técnica)' },
  'autorizacoes': { label: 'Autorização Ambiental para Corte e Poda' },
  'biologo': { label: 'Biólogo - Responsabilidade Técnica' },
  'cobertura-vegetal': { label: 'Laudo de Cobertura Vegetal' },
  'rt': { label: 'Responsabilidade Técnica Ambiental' },
};

/** Serviço da página atual (ou `null` na home e em páginas sem serviço). */
export function getPageService(pathname: string = window.location.pathname): PageService | null {
  const match = pathname.match(/^\/servicos\/([^/]+)/);
  return match ? SERVICE_PAGES[match[1]] ?? null : null;
}

/** Mensagem inicial do WhatsApp, com origem (site) e serviço da página. */
export function buildWhatsappMessage(pathname: string = window.location.pathname): string {
  const service = getPageService(pathname);
  if (!service) return WHATSAPP_DEFAULT_MESSAGE;
  return `Olá! Vim pelo site da Arbo Soluções e gostaria de solicitar um orçamento de ${service.label}.`;
}

export function buildWhatsappHref(pathname?: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsappMessage(pathname))}`;
}
