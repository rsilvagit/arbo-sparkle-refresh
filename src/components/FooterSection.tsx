import logo from "@/assets/logo.png";

const FooterSection = () => {
  return (
    <footer className="py-16 bg-foreground">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Arbo Soluções" className="h-12 w-12 object-contain" />
              <span className="font-display text-xl font-bold text-background">Arbo Soluções</span>
            </div>
            <p className="font-sans text-background/60 text-sm leading-relaxed">
              Soluções ambientais com segurança, responsabilidade e respeito às normas desde 2014.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-background mb-4">Responsável Técnica</h4>
            <div className="font-sans text-background/70 text-sm space-y-1">
              <p>Biól. Andrea Saldanha Weber - UFRGS</p>
              <p>Esp. Arborização Urbana - UNIFESP</p>
              <p>Esp. Botânica - CRBio03</p>
              <p>CRBio- 53432-03D</p>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-background mb-4">Navegação</h4>
            <nav className="font-sans text-sm space-y-2">
              <a href="#quem-somos" className="block text-background/70 hover:text-accent transition-colors">Quem Somos</a>
              <a href="#servicos" className="block text-background/70 hover:text-accent transition-colors">Serviços</a>
              <a href="#contato" className="block text-background/70 hover:text-accent transition-colors">Contato</a>
              <a href="https://wa.me/5551984843008" target="_blank" rel="noopener noreferrer" className="block text-background/70 hover:text-accent transition-colors">WhatsApp</a>
            </nav>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 text-center">
          <p className="font-sans text-background/40 text-sm">
            © {new Date().getFullYear()} Arbo Soluções. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
