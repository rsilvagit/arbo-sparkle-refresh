# Arbo Soluções

Site institucional da **Arbo Soluções** — consultoria ambiental e manejo de vegetação urbana em Porto Alegre (CRBio-03).

Produção: https://www.arbosolucoes.com

## Stack

- **Vite 5** + **TypeScript** (sem framework — vanilla TS + DOM)
- **CSS puro** modular em `src/styles/` (sem Tailwind, sem pós-processadores além do próprio Vite)
- **HTML estático** multi-página (`index.html` + `servicos/*/index.html`)
- **sharp** e **lighthouse** como ferramentas de build/auditoria (devDependencies)
- **vite-plugin-sitemap** para geração de `sitemap.xml`

## Scripts

```sh
npm install           # instala dependências
npm run dev           # servidor de desenvolvimento (vite)
npm run build         # build de produção em dist/
npm run preview       # serve o build de produção localmente
```

Scripts utilitários (Node, rodam manualmente):

```sh
node scripts/generate-avif.mjs   # gera variantes AVIF do hero a partir dos .webp
```

## Estrutura

```
├── index.html                 # home
├── servicos/                  # 13 service pages (cada uma com index.html próprio)
├── public/
│   ├── data/                  # clients.json, testimonials.json (fetch em runtime)
│   └── images/
│       ├── hero-bg-*.{avif,webp}
│       ├── logo.webp, og-image.{png,webp}
│       └── clients/           # logos em .webp (light + dark)
├── src/
│   ├── main.ts                # entry point
│   ├── modules/               # clients, testimonials, navbar, contact-modal, etc.
│   └── styles/                # CSS modular por componente
└── scripts/
    └── generate-avif.mjs      # otimização de imagens
```

## Performance — notas de arquitetura

- **LCP**: hero usa `<picture>` com `<source type="image/avif">` + `<source type="image/webp">` + `<img fetchpriority="high" loading="eager">` (não é CSS `background-image`) para ser descoberto pelo preload scanner.
- **Imagens**: AVIF para o hero (14–22% menor que WebP); WebP para logo, og-image e logos de clientes. Sem raster `.png`/`.jpg` em `public/images/`.
- **JS**: `contact-modal` e `related-services` são carregados via `import()` dinâmico (lazy).
- **Dados de conteúdo** (clientes, testimonials): `fetch` em runtime — não são importados estaticamente nos bundles.
- **CLS**: `min-height` reservado no `.hero__subtitle`; fontes carregam com `display=swap` + media toggle via `onload`.

## Deploy

Build estático em `dist/`. Pode ser servido por qualquer CDN/host de static sites (Netlify, Vercel, Cloudflare Pages, S3 + CloudFront, nginx, etc.). Recomenda-se cache imutável (1 ano) para assets em `/images/` e `/assets/`, e cache curto para HTML.
