# 03 · Conceitos de JavaScript usados

## Organização
Cada arquivo tem **uma função principal** (`iniciarMenuMovel`, `iniciarHero`…) chamada no fim. Vantagens: nomes não colidem entre arquivos e fica claro onde começa a execução. Todo `iniciar…` começa verificando se os elementos existem (`if (!elemento) return;`).

## DOM
`getElementById`, `querySelector(All)`, `classList.add/remove/toggle`, `setAttribute`, `style.setProperty('--var', valor)`.

## Eventos
`click`, `keydown` (Esc), `mousemove`, `scroll`, `resize`, `transitionend`, `load`, e `onload`/`onerror` das imagens.

## IntersectionObserver (`03`, `06`)
Avisa quando um elemento entra/sai da tela. Mais eficiente que calcular posições a cada `scroll`.

## requestAnimationFrame (`04`)
`scroll` dispara dezenas de vezes por quadro. O padrão usado:
```js
let pedida = false;
function pedir() { if (pedida) return; pedida = true; requestAnimationFrame(atualizar); }
```
Muitos avisos viram **um** cálculo por quadro.

## Canvas (`04`)
`canvas.getContext('2d')` devolve o "pincel". `drawImage(img, 0, 0, largura, altura)` desenha. O canvas só é limpo quando já existe um frame válido para desenhar.

## Carregamento de imagens (`04`)
- `new Image()` + `img.src` inicia o download.
- `onload` e `onerror` tratam sucesso e falha.
- `img.complete` não basta (uma imagem quebrada também fica "completa"); conferimos `naturalWidth > 0`.
- Fila com limite de 6 downloads simultâneos; escolhe sempre o frame pendente mais próximo do pedido pela rolagem.
- Uma nova tentativa por frame; se tudo falhar, a imagem estática do HTML continua visível.

## Progresso da rolagem
```js
progresso = pixelsRolados / (alturaDaHero - alturaDoPalco)   // 0 a 1
frame = Math.round(progresso * 191)
```

## Acessibilidade em JS
`aria-expanded`, `aria-label`, devolver o foco ao botão ao fechar com Esc, `<dialog>` nativo, `role="status"` no carregamento.
