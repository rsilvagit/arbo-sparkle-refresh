import { defineConfig } from "vite";
import path, { resolve } from "path";

export default defineConfig({
  base: "/arbo-sparkle-refresh/",
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
        "poda-remocao": resolve(__dirname, "servicos/poda-remocao/index.html"),
        "analise-risco": resolve(__dirname, "servicos/analise-risco/index.html"),
        "plantios-compensatorios": resolve(__dirname, "servicos/plantios-compensatorios/index.html"),
        "licenciamento-ambiental": resolve(__dirname, "servicos/licenciamento-ambiental/index.html"),
        "monitoramento-vegetacao": resolve(__dirname, "servicos/monitoramento-vegetacao/index.html"),
      },
    },
  },
});
