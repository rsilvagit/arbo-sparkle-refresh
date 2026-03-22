interface ServiceInfo {
  slug: string;
  title: string;
  shortDesc: string;
  icon: string;
}

const ALL_SERVICES: ServiceInfo[] = [
  {
    slug: 'poda',
    title: 'Poda de Árvores',
    shortDesc: 'Poda técnica conforme ABNT com responsável habilitado.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/></svg>',
  },
  {
    slug: 'corte-arvores',
    title: 'Remoção de Árvores',
    shortDesc: 'Remoção com laudo técnico e regularização ambiental.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22v-7l-2-2"/><path d="M17 8v.8A6 6 0 0 1 13.8 20H10A6.5 6.5 0 0 1 7 8h0a5 5 0 0 1 10 0Z"/><path d="m14 14-2 2"/></svg>',
  },
  {
    slug: 'analise-risco',
    title: 'Análise de Risco',
    shortDesc: 'Avaliação de risco arbóreo com laudo técnico.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  },
  {
    slug: 'laudos-tecnicos',
    title: 'Laudos Técnicos',
    shortDesc: 'Laudos com ART para corte, poda e manejo vegetal.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>',
  },
  {
    slug: 'consultoria-ambiental',
    title: 'Consultoria Ambiental',
    shortDesc: 'Orientação especializada em legislação ambiental.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  },
  {
    slug: 'licenciamento-ambiental',
    title: 'Licenciamento Ambiental',
    shortDesc: 'Processo de licenciamento junto a órgãos ambientais.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/></svg>',
  },
  {
    slug: 'plantios-compensatorios',
    title: 'Plantios Compensatórios',
    shortDesc: 'Compensação vegetal conforme exigência ambiental.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/></svg>',
  },
  {
    slug: 'monitoramento-vegetacao',
    title: 'Monitoramento de Vegetação',
    shortDesc: 'Acompanhamento técnico de áreas vegetadas.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
  },
  {
    slug: 'cobertura-vegetal',
    title: 'Laudo de Cobertura Vegetal',
    shortDesc: 'Levantamento e diagnóstico de cobertura vegetal.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8v.8A6 6 0 0 1 13.8 20H10A6.5 6.5 0 0 1 7 8h0a5 5 0 0 1 10 0Z"/></svg>',
  },
  {
    slug: 'autorizacoes',
    title: 'Autorizações Ambientais',
    shortDesc: 'Obtenção de autorizações para corte e poda.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  },
  {
    slug: 'biologo',
    title: 'Biólogo Responsável',
    shortDesc: 'Responsabilidade técnica por biólogo habilitado.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  },
  {
    slug: 'art',
    title: 'ART — Anotação Técnica',
    shortDesc: 'Emissão de ART para atividades ambientais.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>',
  },
  {
    slug: 'rt',
    title: 'Responsabilidade Técnica',
    shortDesc: 'RT ambiental para empresas e projetos.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
  },
];

/** Map of related services for each slug */
const RELATED_MAP: Record<string, string[]> = {
  'poda':                    ['corte-arvores', 'analise-risco', 'laudos-tecnicos', 'autorizacoes', 'art'],
  'corte-arvores':           ['poda', 'laudos-tecnicos', 'autorizacoes', 'plantios-compensatorios', 'analise-risco'],
  'analise-risco':           ['poda', 'corte-arvores', 'laudos-tecnicos', 'monitoramento-vegetacao', 'consultoria-ambiental'],
  'laudos-tecnicos':         ['analise-risco', 'art', 'autorizacoes', 'poda', 'corte-arvores'],
  'consultoria-ambiental':   ['licenciamento-ambiental', 'laudos-tecnicos', 'biologo', 'monitoramento-vegetacao', 'analise-risco'],
  'licenciamento-ambiental': ['consultoria-ambiental', 'autorizacoes', 'cobertura-vegetal', 'monitoramento-vegetacao', 'laudos-tecnicos'],
  'plantios-compensatorios': ['corte-arvores', 'monitoramento-vegetacao', 'licenciamento-ambiental', 'cobertura-vegetal', 'autorizacoes'],
  'monitoramento-vegetacao': ['plantios-compensatorios', 'cobertura-vegetal', 'consultoria-ambiental', 'licenciamento-ambiental', 'analise-risco'],
  'cobertura-vegetal':       ['monitoramento-vegetacao', 'licenciamento-ambiental', 'consultoria-ambiental', 'laudos-tecnicos', 'plantios-compensatorios'],
  'autorizacoes':            ['laudos-tecnicos', 'poda', 'corte-arvores', 'licenciamento-ambiental', 'art'],
  'biologo':                 ['art', 'rt', 'consultoria-ambiental', 'laudos-tecnicos', 'analise-risco'],
  'art':                     ['laudos-tecnicos', 'biologo', 'rt', 'autorizacoes', 'poda'],
  'rt':                      ['biologo', 'art', 'consultoria-ambiental', 'licenciamento-ambiental', 'laudos-tecnicos'],
};

function getCurrentServiceSlug(): string | null {
  const path = window.location.pathname;
  const match = path.match(/\/servicos\/([^/]+)/);
  return match ? match[1] : null;
}

export function injectRelatedServices(): void {
  const currentSlug = getCurrentServiceSlug();
  if (!currentSlug) return;

  const relatedSlugs = RELATED_MAP[currentSlug];
  if (!relatedSlugs) return;

  const serviceMap = new Map(ALL_SERVICES.map(s => [s.slug, s]));
  const related = relatedSlugs
    .map(slug => serviceMap.get(slug))
    .filter((s): s is ServiceInfo => !!s)
    .slice(0, 6);

  if (related.length === 0) return;

  const cards = related.map(s => `
    <a href="/servicos/${s.slug}/" class="related-services__card" title="${s.title} - Arbo Soluções">
      ${s.icon}
      <div>
        <p class="related-services__card-title">${s.title}</p>
        <p class="related-services__card-desc">${s.shortDesc}</p>
      </div>
    </a>`).join('');

  const section = `
<section class="related-services">
  <div class="container">
    <div class="related-services__header">
      <span class="section-label">Veja também</span>
      <h2 class="related-services__heading">Serviços <span class="text-primary">Relacionados</span></h2>
    </div>
    <div class="related-services__grid">
      ${cards}
    </div>
  </div>
</section>`;

  const cta = document.querySelector('.contact-cta');
  if (cta) {
    cta.insertAdjacentHTML('beforebegin', section);
  }
}
