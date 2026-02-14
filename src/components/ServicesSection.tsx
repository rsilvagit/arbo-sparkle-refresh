import { motion } from "framer-motion";
import {
  TreePine, FileText, Scissors, AlertTriangle,
  Sprout, MapPin, FileCheck, Building, ClipboardList, Stamp,
} from "lucide-react";

const services = [
  { icon: FileText, title: "Laudos Técnicos", desc: "Laudos para corte e/ou poda de árvores" },
  { icon: Scissors, title: "Poda e Remoção", desc: "Serviços seguros de poda e remoção de árvores" },
  { icon: AlertTriangle, title: "Análise de Risco", desc: "Avaliação fitossanitária e análise de risco arbóreo" },
  { icon: Sprout, title: "Plantios Compensatórios", desc: "Monitoramento e execução de plantios" },
  { icon: MapPin, title: "Cobertura Vegetal", desc: "Laudo de cobertura vegetal para licenciamento" },
  { icon: FileCheck, title: "Autorizações", desc: "Obtenção de autorizações junto a órgãos ambientais" },
  { icon: Building, title: "Consultoria Ambiental", desc: "Consultoria e projetos de transplante vegetal" },
  { icon: ClipboardList, title: "Licenciamento", desc: "Licenciamento ambiental completo" },
  { icon: Stamp, title: "ART", desc: "Anotação de Responsabilidade Técnica" },
  { icon: TreePine, title: "Responsabilidade Técnica", desc: "Responsabilidade técnica de empresas" },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-sans text-sm tracking-widest uppercase font-semibold mb-4 block">
            Serviços
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Nossos <span className="text-primary">Serviços</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group p-6 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <service.icon className="h-8 w-8 text-primary mb-4 group-hover:text-accent transition-colors" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{service.title}</h3>
              <p className="font-sans text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
