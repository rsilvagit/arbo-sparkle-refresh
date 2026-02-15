import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { TreePine, Phone, ChevronDown } from "lucide-react";

const services = [
  "Consultoria Ambiental",
  "Laudos Técnicos",
  "Poda e Remoção de Árvores",
  "Análise de Risco em Árvores",
  "Plantios Compensatórios",
  "Licenciamento Ambiental",
  "Monitoramento de Vegetação"
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--hero-overlay)" }}
      />

      <div className="relative z-10 container mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          
          <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            <span className="block mb-1">Arbo Soluções</span>
            <span className="block text-accent text-3xl md:text-5xl">
              Corte e Poda de Árvores
            </span>
          </h1>

          <p className="text-primary-foreground/80 font-sans text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Manejo seguro e responsável da vegetação urbana desde 2014. Segurança, preservação e respeito às normas ambientais.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {services.map((s) => (
              <span
                key={s}
                className="px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground/90 text-sm font-sans"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5551984843008"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-sans font-semibold text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ background: "var(--cta-gradient)" }}
            >
              <Phone className="h-5 w-5" />
              Solicite um Orçamento
            </a>
            <a
              href="#quem-somos"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-sans font-semibold border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-300"
            >
              Conheça a Empresa
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="h-8 w-8 text-primary-foreground/50 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
