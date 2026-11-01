# 04 · Problemas encontrados e o que ainda pode melhorar

## ✅ Corrigidos nesta versão
| Problema | Correção |
|---|---|
| Dependência de Tailwind, GSAP, Iconify, Google Fonts e CDNs | Tudo substituído por código/recursos locais |
| Textura de ruído em servidor externo (retornava erro) | SVG local no CSS |
| Links `href="#"` e hambúrguer sem função | Âncoras reais e menu móvel acessível |
| Botão de compra sem destino | Modal de demonstração (sem compra real) |
| Rodapé com links falsos | Itens riscados como indisponíveis |
| Texto escondido por animação mesmo se o JS falhasse | Esconde só depois do observer pronto |
| Hover atrasado por causa do `transition-delay` do surgimento | Classes de surgimento removidas ao terminar |
| CSS e GSAP brigando pelo texto da Hero | Entrada (classes) e saída (`--saida`) são independentes |
| 192 imagens de uma vez, sem aviso, `img.complete` como prova | Fila, progresso, `onerror`, checagem de `naturalWidth`, plano B |
| Canvas limpo antes de ter um frame válido | Só limpa quando vai desenhar |
| Feixe giratório descentralizado | `@keyframes` com `translate` + `rotate` |
| `<div>` dentro de `<h1>` | `<span>` em bloco |
| Alegações sem comprovação como se fossem reais | Avisos "conteúdo fictício" |

## ⚠️ Ainda existe (bom para estudar)
- **Fontes:** sem Inter/Space Grotesk/JetBrains Mono instaladas, o visual dos títulos muda um pouco. Solução permitida: colocar os arquivos `.woff2` (com licença que permita) em `midia/fontes/` e declarar `@font-face`.
- **Canvas 1280×720:** em telas Retina/4K pode ficar levemente suave. Dá para ajustar com `window.devicePixelRatio` (e frames maiores).
- **192 JPGs:** ~9 MB. Reduzir a quantidade de frames ou usar WebP diminuiria o peso.
- **Marca d'água "Veo"** nos frames: vem do material de origem.
- **Barra de rolagem estilizada** só em navegadores baseados em WebKit/Blink.
- **Botões de compra sem JS:** não fazem nada se o JavaScript estiver desligado.
- **Idiomas misturados** (português e inglês) mantidos para preservar o design original.
