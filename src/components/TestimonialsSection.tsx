import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Carlos M.",
    role: "Síndico – Condomínio Residencial",
    text: "A Arbo Soluções foi extremamente profissional na remoção de árvores de risco no nosso condomínio. Laudo técnico impecável e equipe muito competente.",
    stars: 5,
  },
  {
    name: "Fernanda L.",
    role: "Engenheira Civil",
    text: "Contratamos a Arbo para o licenciamento ambiental de um empreendimento. O atendimento foi ágil, e toda a documentação foi entregue dentro do prazo.",
    stars: 5,
  },
  {
    name: "Roberto S.",
    role: "Administrador – Shopping Center",
    text: "Excelente trabalho de poda e manutenção da arborização. A bióloga Andrea demonstrou conhecimento técnico excepcional e cuidado com a preservação.",
    stars: 5,
  },
  {
    name: "Juliana P.",
    role: "Proprietária Residencial",
    text: "Precisava de um laudo urgente para remoção de uma árvore em risco. A Arbo atendeu rapidamente e resolveu tudo com muita segurança e profissionalismo.",
    stars: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="depoimentos" className="py-24" style={{ background: "var(--section-gradient)" }}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-sans text-sm tracking-widest uppercase font-semibold mb-4 block">
            Depoimentos
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            O que nossos <span className="text-primary">clientes</span> dizem
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative p-8 rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/15" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="font-sans text-muted-foreground leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div>
                <p className="font-display font-semibold text-foreground">{t.name}</p>
                <p className="font-sans text-sm text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
