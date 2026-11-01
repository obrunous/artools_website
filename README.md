# ARTOOLS

Página de estudo desenvolvida com HTML, CSS e JavaScript nativo. Inclui animação por sequência de imagens, menu responsivo, cards interativos e uma janela de demonstração de compra.

O produto e a empresa apresentados são fictícios. Não há compra real.

## Executar localmente

Na pasta do projeto, execute:

```sh
python3 -m http.server 8000
```

Abra <http://localhost:8000>. Também é possível usar a extensão Live Server do VS Code ou abrir `index.html` diretamente.

Não é necessário instalar dependências ou executar uma compilação. Os recursos da página estão no próprio projeto.

## Estrutura

```text
artools_website/
├── index.html             # Página principal
├── assets/
│   ├── css/               # Estilos organizados por responsabilidade
│   ├── js/                # Comportamentos da página
│   ├── images/
│   │   └── frames/        # 192 imagens da animação principal
│   └── videos/            # Vídeo da vitrine
├── docs/                  # Guias de estudo e histórico da refatoração
├── .gitignore
└── README.md
```

Os arquivos CSS e JavaScript mantêm a numeração para facilitar a leitura e a ordem de carregamento. Os caminhos são relativos, permitindo servir o projeto tanto na raiz quanto em uma subpasta.

## Documentação

- [Como a página funciona](docs/01-como-a-pagina-funciona.md)
- [Conceitos de CSS](docs/02-conceitos-css.md)
- [Conceitos de JavaScript](docs/03-conceitos-javascript.md)
- [Problemas conhecidos e melhorias](docs/04-problemas-e-melhorias.md)
- [Exercícios](docs/05-exercicios.md)
- [Histórico da refatoração](docs/refatoracao.md)

## Tecnologias

HTML semântico, CSS com Flexbox e Grid, JavaScript nativo, Canvas, IntersectionObserver e requestAnimationFrame.

## Alterações

Edite a marcação em `index.html`, os estilos em `assets/css/` e os comportamentos em `assets/js/`. Ao mover uma mídia, atualize também seu caminho no HTML ou no JavaScript responsável por carregá-la.
