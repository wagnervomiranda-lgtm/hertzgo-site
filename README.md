# HertzGo — Site Institucional

## Como subir no Vercel

### Drag & Drop
1. Acesse https://vercel.com → **New Project** → **Upload**
2. Arraste **toda esta pasta** (`deploy/`) — não arraste só o `index.html`
3. Confirme. Pronto.

### Git / CLI
```bash
cd deploy
vercel --prod
```

## Estrutura — todos esses arquivos precisam ir junto

```
deploy/
├── index.html           ← entrada principal
├── vercel.json          ← config (cache, clean URLs)
├── site.css             ← estilos
├── components/          ← React/JSX (7 arquivos)
│   ├── App.jsx
│   ├── Logo.jsx
│   ├── HeroBg.jsx
│   ├── MapSection.jsx
│   ├── Sections.jsx     ← Hero, Stats, Tech, Diffs, Footer
│   ├── Sections2.jsx    ← Gallery, App, Vision, Course
│   └── Sections3.jsx    ← Splash, FixedLogo, Loyalty
└── assets/              ← imagens (case-sensitive!)
    ├── logo-hertzgo.jpeg
    ├── mapa-brasil.png
    ├── mapa-only.png
    ├── station-parkway.png
    ├── photos/          ← carrossel + fundos parallax
    │   ├── station-01.jpeg
    │   ├── station-04.jpeg ... 08
    │   └── station-render.jpeg
    └── vision/
        ├── dashboard-01.png
        ├── dashboard-02.png
        └── dashboard-03.png
```

## Por que o standalone único não funcionou

O arquivo `HertzGo - Site (Standalone).html` (12.8 MB) bundla tudo num arquivo só, mas:
- demora 8–15s para descompactar no carregamento
- trava o navegador em mobile
- Vercel não cacheia bem arquivos > 10MB

A versão modular (esta pasta) é a forma correta — cada imagem é cacheada separadamente, carrega em paralelo, e o site abre em < 2s.

## Domínio

Após deploy, configure seu domínio em **Settings → Domains** no Vercel.

## Atualizar conteúdo

Edite o arquivo correspondente na pasta `components/` e re-suba a pasta inteira (ou faça push se estiver via Git).
