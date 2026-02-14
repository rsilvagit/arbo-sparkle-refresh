import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

const clients = [
  "Prefeitura de Porto Alegre",
  "CEEE Equatorial",
  "Grupo Zaffari",
  "Melnick Even",
  "Multiplan",
  "Goldsztein Cyrela",
  "Hospital Moinhos de Vento",
  "Sindicatos e Condomínios",
];

const ClientsSection = () => {
  return (
    <section id="clientes" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-accent font-sans text-sm tracking-widest uppercase font-semibold mb-4 block">
            Confiança
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Quem <span className="text-primary">confia</span> na Arbo
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {clients.map((client, i) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <Building2 className="h-8 w-8 text-primary/60" />
              <span className="font-sans text-sm font-medium text-foreground text-center leading-tight">
                {client}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
