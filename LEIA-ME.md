# 📚 ARTOOLS — Versão de Estudo "Pura" (HTML + CSS + JavaScript)

Refatoração de `ARTOOLS_ESTUDO` usando **apenas** HTML, CSS e JavaScript nativo.
A pasta original não foi alterada.

Removidos: Tailwind, GSAP/ScrollTrigger, Iconify, Google Fonts e qualquer CDN.
**A página funciona sem internet.**

## ▶️ Como abrir

- **Recomendado:** servidor estático. No VS Code, extensão *Live Server* → *Open with Live Server*. Ou, no terminal, dentro da pasta: `python3 -m http.server 8000` e abra `http://localhost:8000`.
- **Também funciona** com dois cliques no `index.html` (o projeto não usa módulos ES nem `fetch`, que são bloqueados em `file://`).

## 🗂️ Mapa das pastas

```
ARTOOLS_ESTUDO_PURO/
├── index.html                  monta a página (HTML semântico + sprite de ícones SVG)
├── estilos/
│   ├── 01-base.css                variáveis (cores/fontes), reset, foco, ícones
│   ├── 02-texto-contorno.css      letras vazadas
│   ├── 03-ruido-granulado.css     textura de grão (SVG dentro do CSS)
│   ├── 04-navbar.css              navbar + menu móvel
│   ├── 05-hero.css                Hero, canvas, botões, indicador de carregamento
│   ├── 06-secao-tecnologia.css    seção Tecnologia (+ peças compartilhadas)
│   ├── 07-cards-lanterna.css      cards com brilho que segue o mouse
│   ├── 08-vitrine.css             vídeo + card brilhante
│   ├── 09-rodape-e-modal.css      rodapé e janela de demonstração
│   └── 10-animacoes-surgimento.css  surgir ao rolar + prefers-reduced-motion
├── scripts/                    (cada um é independente; se um falhar, os outros funcionam)
│   ├── 01-menu-movel.js           abrir/fechar menu, aria-*, tecla Esc
│   ├── 02-modal-compra.js         <dialog> de demonstração
│   ├── 03-surgimento-ao-rolar.js  IntersectionObserver
│   ├── 04-hero-frames.js          ⭐ rolagem → frame no canvas, carregamento dos 192 frames
│   ├── 05-cards-lanterna.js       posição do mouse nos cards
│   └── 06-video-vitrine.js        pausa o vídeo fora da tela
├── midia/  frames/ (192 JPGs 1280×720) · imagens/ · videos/
└── guias/  explicações em português
```

## 🔁 O que mudou em relação a `ARTOOLS_ESTUDO`

| Antes | Agora |
|---|---|
| Tailwind (CDN) | Classes próprias em kebab-case (`.hero-titulo`, `.card-lanterna`…), Flexbox, Grid, variáveis CSS e `@media` |
| GSAP + ScrollTrigger | `IntersectionObserver` (surgir), `scroll` + `requestAnimationFrame` (hero), `transition`/`@keyframes` (efeitos) |
| Iconify | SVGs inline num sprite (`<symbol>` + `<use>`) no começo do `<body>` |
| Google Fonts | Fontes locais **se instaladas** (Inter, Space Grotesk, JetBrains Mono); senão fontes do sistema. As letras ficam um pouco diferentes do original, principalmente os títulos |
| Links `href="#"` | Âncoras reais: `#design`, `#tecnologia`, `#especificacoes`, `#inicio` |
| Hambúrguer que não abria | Menu móvel com `aria-expanded`, `aria-controls`, nome acessível e Esc |
| "Comprar" sem destino | Modal `<dialog>` avisando que **não há compra real** |
| Privacy/Terms/Support (`#`) | Texto riscado "indisponível" (sem link falso) |
| Textura de ruído em site externo (quebrada) | Mesmo SVG local do ruído global |
| Texto escondido dependendo de JS | Só é escondido depois que o `IntersectionObserver` está pronto (`.animacoes-ativas`) |
| 192 frames baixados de uma vez | Primeiro o frame necessário, depois fila de 6 por vez, barra de progresso, tratamento de erro |

Detalhes do que foi preservado/ajustado:
- **Texto da Hero ao rolar:** antes cada elemento saía com um pequeno atraso (`stagger`); agora o bloco inteiro sai junto (o JS só escreve `--saida`, o CSS faz o resto).
- **Efeito de entrada do canvas** (fade + zoom) agora está no CSS, aplicado à imagem estática *e* ao canvas juntos.
- **Feixe giratório da vitrine:** o `@keyframes` agora inclui o `translate` que centraliza a luz.
- **Código morto removido:** `.btn-beam`, `.animate-float`, `bg-noise`, `shimmer`, classes inexistentes (`bg-grid`, `perspective-1000`).
- **`<div>` dentro de `<h1>`** virou `<span>` em bloco (HTML válido). Lista de características virou `<ul>`.
- **Contraste:** o texto de direitos do rodapé ficou um tom mais claro para ser legível.
- A pasta `secoes-html/` foi removida (era só cópia de leitura e ficaria desatualizada).
- `artools_tech_feature.png` era na verdade um JPEG; agora se chama `.jpg`.

## ⚠️ Conteúdo fictício

Artools, o produto e a empresa **não existem**. Itens como "Engenharia Suíça", alumínio 6061-T6, 14g, 0.3mm, Ra 0.8µm, "traço sem falha até 15°", "-40% de fadiga" e "Zurich" são texto de exemplo, sem comprovação. A página os identifica com avisos visíveis.

## 🧭 Ordem de estudo sugerida

1. `guias/01-como-a-pagina-funciona.md`
2. `index.html` (de cima para baixo) + `guias/02-conceitos-css.md` + `estilos/01` → `10`
3. `scripts/05`, `02`, `01`, `03` (curtos) + `guias/03-conceitos-javascript.md`
4. `scripts/04-hero-frames.js` (o mais avançado)
5. `guias/04-problemas-e-melhorias.md` e `guias/05-exercicios.md`
