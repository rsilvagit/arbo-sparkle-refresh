interface Testimonial {
  text: string;
  name: string;
}

const testimonials: Testimonial[] = [
  {
    text: "Agradecemos a Arbo pelo excelente serviço prestado. A remoção do pinheiro ocorreu de forma rápida, minimamente invasiva, como prometido. Parabéns!",
    name: "Ivo – Cond. Cedro",
  },
  {
    text: "Trabalho excepcional e o atendimento extremamente atencioso.",
    name: "Maria Cristina",
  },
  {
    text: "Em primeiro lugar gostaria de ressaltar a pontualidade e a responsabilidade da equipe, além disso, o trabalho é impecável, super bem feito, de forma rápida, segura e organizada. Depois do trabalho concluído a equipe deixou o local limpo! Super recomendo!",
    name: "Mônica",
  },
  {
    text: "Serviço excelente, cumprem agendas. Pessoal muito profissional, bióloga qualificada, possuem estrutura de atendimento (pessoal e equipamentos) para os serviços a que se propõem.",
    name: "Antônio Carlos",
  },
  {
    text: "Ótimo atendimento, resolveram tudo com muita agilidade, a equipe está de parabéns.",
    name: "Marcos",
  },
  {
    text: "Excelentes profissionais, muito caprichosos e eficientes. Estão de parabéns.",
    name: "S. Herbs",
  },
  {
    text: "Atendimento impecável! Desde o processo burocrático com os órgãos regulamentares até a finalização do corte das árvores. Todos profissionais altamente qualificados. Recomendo fortemente para quem precisa deste tipo de serviço!",
    name: "Gabriela",
  },
  {
    text: "Serviço realizado de forma eficiente e dentro das nossas expectativas!",
    name: "Luis Fernando",
  },
  {
    text: "Excelente equipe. Pontualidade, educação, preço justo e competência. Eu recomendo.",
    name: "Lurdes",
  },
  {
    text: "Serviço de qualidade, o resultado ficou excelente.",
    name: "Pablo",
  },
  {
    text: "Estamos passando por aqui para registrarmos o excelente trabalho de poda e remoção de árvore realizado por esta empresa em nosso condomínio. Aspectos positivos: Pontualidade, Qualidade, Profissionalismo.",
    name: "Conj. Res. Parque do Sabiá",
  },
  {
    text: "O serviço de corte da árvore que contratamos foi realizado com grande profissionalismo, começando pela qualidade do contrato apresentado e passando pelas garantias que tivemos. A assistência, especialmente com todos os detalhes de documentação junto à PMPA e o atendimento durante o serviço foram perfeitos. Aspectos positivos: Pontualidade, Qualidade, Profissionalismo.",
    name: "Weimar",
  },
  {
    text: "Excelente atendimento e serviço executado conforme combinado. Recomendo a empresa.",
    name: "Daniel",
  },
  {
    text: "A prestação do serviço foi perfeita.",
    name: "Ana Luisa",
  },
  {
    text: "Ótimo trabalho, rápido e confiável. Me ajudaram muito.",
    name: "Cícero",
  },
  {
    text: "O trabalho foi tranquilo e bem executado, mas mesmo assim fui denunciada. A SMAM esteve no condomínio e a documentação feita pela empresa ARBO com a bióloga Andrea Weber estava toda correta. Os fiscais saíram satisfeitos e eu também.",
    name: "Cond. Dom Pedro",
  },
  {
    text: "Sobre nossa bióloga: Excelente profissional, serviço de qualidade e muito bem feito, super recomendo!",
    name: "David",
  },
  {
    text: "Ótimo atendimento, atenciosa, objetiva, com muito conhecimento, recomendo. O trabalho de poda foi concluído com sucesso, equipe de qualidade, execução com segurança, enfim, só elogios à Andrea e sua equipe. Super recomendado, parabéns.",
    name: "Ildemar",
  },
  {
    text: "Ótimo trabalho, super indico! Competência dez! Em todas etapas.",
    name: "Marina – Cond. Cravina",
  },
];

const QUOTE_ICON = `<svg class="testimonials__quote-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>`;

const STAR_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function createCard(testimonial: Testimonial, delay: number): string {
  const stars = STAR_ICON.repeat(5);
  return `
    <div class="testimonials__card anim-target" data-anim="fade-up" data-anim-delay="${delay}">
      ${QUOTE_ICON}
      <div class="testimonials__stars">${stars}</div>
      <p class="testimonials__text">"${testimonial.text}"</p>
      <div><p class="testimonials__name">${testimonial.name}</p></div>
    </div>`;
}

export function initTestimonials(): void {
  const grid = document.getElementById("testimonials-grid");
  if (!grid) return;

  const selected = shuffle(testimonials).slice(0, 4);
  grid.innerHTML = selected.map((t, i) => createCard(t, i * 100)).join("");
}
