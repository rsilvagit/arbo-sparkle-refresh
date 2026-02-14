import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contato" className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "var(--cta-gradient)", opacity: 0.95 }}
      />
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-accent-foreground mb-6">
            Solicite seu Orçamento Gratuito
          </h2>
          <p className="text-accent-foreground/80 font-sans text-lg mb-4">
            Agende uma visita técnica. Vistoria gratuita em Porto Alegre.*
          </p>
          <p className="text-accent-foreground/60 font-sans text-sm mb-10">
            *Consulte demais localidades.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <a
              href="https://wa.me/5551984843008"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-background text-primary font-sans font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              <Phone className="h-6 w-6" />
              (51) 98484-3008
            </a>
            <a
              href="mailto:arbopodasejardinagem@gmail.com"
              className="inline-flex items-center gap-3 text-accent-foreground/90 font-sans hover:text-accent-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
              arbopodasejardinagem@gmail.com
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-accent-foreground/60 font-sans text-sm">
            <MapPin className="h-4 w-4" />
            Porto Alegre, RS
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
