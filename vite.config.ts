import { defineConfig } from "vite";
import path, { resolve } from "path";
import Sitemap from "vite-plugin-sitemap";

const hostname = "https://www.arbosolucoes.com.br";

export default defineConfig({
  base: "/",
  plugins: [
    Sitemap({
      hostname,
      exclude: ["/404"],
      changefreq: "monthly",
      priority: 0.8,
      lastmod: new Date(),
      readable: true,
    }),
  ],
  server: {
    host: "::",
    port: 8080,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "consultoria-ambiental": resolve(__dirname, "servicos/consultoria-ambiental/index.html"),
        "laudos-tecnicos": resolve(__dirname, "servicos/laudos-tecnicos/index.html"),
        "poda": resolve(__dirname, "servicos/poda/index.html"),
        "analise-risco": resolve(__dirname, "servicos/analise-risco/index.html"),
        "plantios-compensatorios": resolve(__dirname, "servicos/plantios-compensatorios/index.html"),
        "licenciamento-ambiental": resolve(__dirname, "servicos/licenciamento-ambiental/index.html"),
        "monitoramento-vegetacao": resolve(__dirname, "servicos/monitoramento-vegetacao/index.html"),
        "corte-arvores": resolve(__dirname, "servicos/corte-arvores/index.html"),
        "autorizacoes": resolve(__dirname, "servicos/autorizacoes/index.html"),
        "biologo": resolve(__dirname, "servicos/biologo/index.html"),
        "art": resolve(__dirname, "servicos/art/index.html"),
        "cobertura-vegetal": resolve(__dirname, "servicos/cobertura-vegetal/index.html"),
        "rt": resolve(__dirname, "servicos/rt/index.html"),
      },
    },
  },
});
