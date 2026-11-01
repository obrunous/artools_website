# 02 · Conceitos de CSS usados

## Variáveis CSS (`01-base.css`)
`--pedra-900: #1c1917;` em `:root` e `color: var(--pedra-900);` em qualquer lugar. Mudou num ponto, mudou na página toda.

## Nomes de classes
Descrevem **o que a coisa é**, em kebab-case: `.hero-titulo`, `.card-lanterna`, `.botao-escuro`. Evite nomes que descrevem a aparência (`.vermelho-grande`).

## Layout
- **Flexbox** (`display: flex`): uma dimensão. Navbar, rodapé, botões.
- **Grid** (`display: grid`): duas dimensões. Cards (`repeat(3, 1fr)`) e a grade de 12 colunas da seção Tecnologia.
- **Mobile first:** o CSS sem media query é o celular; `@media (min-width: 768px)` e `1024px` ampliam.

## Posicionamento
- `position: sticky` + altura grande = o palco da Hero.
- `position: fixed`: navbar e granulado.
- `position: absolute` + `inset: 0`: camadas empilhadas (fundo, película, brilho).

## `clamp()`, `min()`, `calc()` (título da Hero)
`clamp(MÍN, ideal, MÁX)` mantém o valor dentro de limites. O título usa `min()` de um limite por largura (`vw`) e outro por altura (`vh`).

## Transições e animações
- `transition`: de um estado a outro (hover, `.ativo`).
- `@keyframes` + `animation`: loops e sequências (linha de rolagem, feixe giratório, pulsar).
- `@media (prefers-reduced-motion: reduce)` respeita quem pediu menos movimento.

## Efeitos específicos
- **Texto vazado:** `-webkit-text-stroke` + `color: transparent` (`@supports` dá um plano B).
- **Vidro fosco:** `backdrop-filter: blur()`.
- **Feixe de luz:** `conic-gradient` girando dentro de um contêiner com `overflow: hidden`.
- **Lanterna:** `radial-gradient` usando `var(--mouse-x)`.

## Especificidade
`.animacoes-ativas .revelar.ativo` (3 classes) vence `.animacoes-ativas .revelar` (2 classes). É assim que o estado "visível" sobrepõe o "escondido".
