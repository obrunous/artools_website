# ARTOOLS

Projeto de estudo desenvolvido a partir do curso **Webdesign com IA**, da **Asimov Academy**, e adaptado para HTML, CSS e JavaScript nativo. Inclui animação por sequência de imagens, menu responsivo, cards interativos e uma janela de demonstração de compra.

O produto e a empresa apresentados são fictícios. Não há compra real.

**[Acessar o site](https://artools-website-self.vercel.app)** · [Repositório no GitHub](https://github.com/obrunous/artools_website)

## Funcionalidades

- Animação da seção principal com uma sequência de 192 imagens no Canvas.
- Layout responsivo e menu para dispositivos móveis.
- Efeitos de entrada ao rolar e iluminação interativa nos cards.
- Vídeo de apresentação e modal de demonstração de compra.
- Tratamento de preferência por movimento reduzido e imagem de reserva para a animação.

## Origem e objetivo

Este repositório reúne a versão de estudo do projeto ARTOOLS produzido durante o curso. O objetivo é praticar a criação de interfaces com apoio de inteligência artificial e compreender a estrutura, os estilos e os comportamentos da página.

A versão aqui organizada utiliza recursos locais e código nativo, com comentários e guias em português para facilitar o aprendizado. O histórico dessas adaptações está em [Refatoração](docs/refatoracao.md).

## Executar localmente

### Pelo VS Code

1. Abra a pasta do projeto no VS Code.
2. Instale a extensão **Live Server**, de **Ritwick Dey**, caso ainda não esteja disponível.
3. Clique com o botão direito em `index.html` e selecione **Open with Live Server**.

### Pelo Terminal

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

| Tecnologia | Uso |
|---|---|
| HTML | Estrutura semântica da página |
| CSS | Layout com Flexbox e Grid, responsividade e animações |
| JavaScript | Menu, modal, vídeo e interações |
| Canvas | Renderização da sequência de imagens |
| IntersectionObserver | Detecção de elementos na área visível |
| requestAnimationFrame | Atualizações da animação |
| GitHub | Versionamento e armazenamento do repositório |
| Vercel | Hospedagem do site |

## Publicação e atualizações

O projeto está hospedado na **Vercel**, a partir do repositório `obrunous/artools_website`, na branch `main`.

Para esse site estático, a configuração utiliza **Framework Preset: Other**, a raiz do repositório como diretório de saída e nenhuma etapa de compilação.

Para atualizar pelo VS Code:

1. Edite os arquivos e salve as alterações.
2. Abra **Controle do Código-Fonte** e revise as diferenças.
3. Prepare os arquivos desejados pelo botão **+**.
4. Escreva uma mensagem e clique em **Commit**.
5. Use **Push / Enviar** para enviar o commit ao GitHub.
6. Confira o novo deployment no painel da Vercel e aguarde o status **Ready**.
7. Abra o site e verifique o resultado.

Com a integração Git ativa, os commits enviados à branch de produção iniciam novos deployments. Salvar arquivos ou criar um commit apenas local não atualiza o site.

## Alterações

Edite a marcação em `index.html`, os estilos em `assets/css/` e os comportamentos em `assets/js/`. Ao mover uma mídia, atualize também seu caminho no HTML ou no JavaScript responsável por carregá-la.
