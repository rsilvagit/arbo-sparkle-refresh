import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const serviceTypes = [
  "Poda de Árvores",
  "Remoção / Corte de Árvores",
  "Análise de Risco",
  "Laudo Técnico",
  "Consultoria Ambiental",
  "Plantio Compensatório",
  "Licenciamento Ambiental",
  "Monitoramento de Vegetação",
  "Outro",
];

interface ContactFormModalProps {
  children: React.ReactNode;
}

const ContactFormModal = ({ children }: ContactFormModalProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    serviceType: "",
    description: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.serviceType) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha pelo menos nome, telefone e tipo de manejo.",
        variant: "destructive",
      });
      return;
    }

    const message = [
      `*Solicitação de Orçamento*`,
      ``,
      `*Nome:* ${form.name.trim()}`,
      ``,
      form.address.trim() ? `*Endereço:* ${form.address.trim()}\n` : "",
      `*Telefone:* ${form.phone.trim()}`,
      ``,
      form.email.trim() ? `*E-mail:* ${form.email.trim()}\n` : "",
      `*Tipo de Manejo:* ${form.serviceType}`,
      ``,
      form.description.trim() ? `*Descrição:*\n${form.description.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5551984843008?text=${encoded}`, "_blank");

    setForm({ name: "", address: "", phone: "", email: "", serviceType: "", description: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-foreground">
            Solicite seu Orçamento
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-sans text-foreground">Nome *</Label>
            <Input
              id="name"
              placeholder="Seu nome completo"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              maxLength={100}
              className="bg-background text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="font-sans text-foreground">Endereço</Label>
            <Input
              id="address"
              placeholder="Rua, número, bairro"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              maxLength={200}
              className="bg-background text-foreground"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-sans text-foreground">Telefone *</Label>
              <Input
                id="phone"
                placeholder="(51) 99999-9999"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                maxLength={20}
                className="bg-background text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-sans text-foreground">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                maxLength={255}
                className="bg-background text-foreground"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-sans text-foreground">Tipo de Manejo *</Label>
            <Select value={form.serviceType} onValueChange={(v) => handleChange("serviceType", v)}>
              <SelectTrigger className="bg-background text-foreground">
                <SelectValue placeholder="Selecione o serviço" />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                {serviceTypes.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="font-sans text-foreground">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva sua necessidade..."
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              maxLength={1000}
              rows={4}
              className="bg-background text-foreground resize-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full font-sans font-semibold text-accent-foreground gap-2"
            style={{ background: "var(--cta-gradient)" }}
          >
            <Send className="h-4 w-4" />
            Enviar pelo WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal;
