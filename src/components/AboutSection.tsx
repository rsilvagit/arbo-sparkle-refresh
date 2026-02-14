import { motion } from "framer-motion";
import { Shield, Award, Clock, Leaf } from "lucide-react";

const highlights = [
  { icon: Shield, label: "Segurança" },
  { icon: Award, label: "CRBio Registrada" },
  { icon: Clock, label: "Desde 2014" },
  { icon: Leaf, label: "Sustentabilidade" },
];

const AboutSection = () => {
  return (
    <section id="quem-somos" className="py-24" style={{ background: "var(--section-gradient)" }}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <span className="text-accent font-sans text-sm tracking-widest uppercase font-semibold mb-4 block">
            Quem Somos
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
            Compromisso com a <span className="text-primary">natureza urbana</span>
          </h2>
          <p className="text-muted-foreground font-sans text-lg leading-relaxed mb-6">
            A Arbo Soluções atua no setor de manejo da vegetação urbana: poda, remoção e tratamento de árvores. Nosso trabalho tem como foco a segurança das pessoas, a preservação ambiental e a compatibilização da arborização com edificações e infraestruturas existentes.
          </p>
          <p className="text-muted-foreground font-sans text-lg leading-relaxed">
            A empresa conta com a atuação e responsabilidade técnica de bióloga formada pela UFRGS, especialista em Botânica e Arborização Urbana pela UNIFESP, com atuação desde 2010 na área de manejo vegetal.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 p-6 rounded-xl bg-background border border-border"
            >
              <item.icon className="h-8 w-8 text-primary" />
              <span className="font-sans font-semibold text-foreground text-sm text-center">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
