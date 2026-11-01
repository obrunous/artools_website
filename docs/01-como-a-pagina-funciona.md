# 01 · Como a página funciona

## As três camadas
| Camada | Papel | Onde |
|---|---|---|
| HTML | Estrutura e conteúdo | `index.html` |
| CSS | Aparência e efeitos | `assets/css/` |
| JavaScript | Comportamento | `assets/js/` |

Regra de ouro deste projeto: **o conteúdo precisa ser legível mesmo se o JavaScript falhar.** Por isso o texto só é escondido (para animar) depois que o JS confirma que está pronto.

## Da esquerda para a direita, de cima para baixo
1. **Navbar** (`<header>`): logo, links por âncora, sacola, botão do menu móvel.
2. **Hero** (`#inicio`): 200vh de altura; um "palco" `sticky` fica parado enquanto a rolagem escolhe o frame da caneta.
3. **Tecnologia** (`#tecnologia`, `#especificacoes`): imagem com efeitos de hover + 3 características.
4. **Cards** (`#design`): 3 cards com brilho de lanterna.
5. **Vitrine**: vídeo de fundo + card brilhante com botão de acesso antecipado (abre a demonstração).
6. **Rodapé**.

## Como o JS e o CSS se falam
O JS **não** estiliza diretamente. Ele troca *classes* (`.ativo`, `.menu-aberto`) ou escreve *variáveis CSS* (`--saida`, `--mouse-x`), e o CSS decide a aparência.

| Efeito | JS faz | CSS faz |
|---|---|---|
| Surgir ao rolar | adiciona `.ativo` | `transition` de opacidade/posição/desfoque |
| Texto da Hero saindo | escreve `--saida` (0 a 1) | `calc()` converte em opacidade, deslocamento e blur |
| Lanterna | escreve `--mouse-x/y` | `radial-gradient` nessa posição |
| Menu móvel | alterna `.menu-aberto` e `aria-expanded` | mostra/esconde |

## Ícones
Um sprite SVG no começo do `<body>` define cada ícone uma vez (`<symbol id="icone-sacola">`). Onde precisa: `<svg class="icone"><use href="#icone-sacola"></use></svg>`.
