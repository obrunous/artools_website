/* =============================================================
   ARQUIVO: 05-cards-lanterna.js
   O QUE FAZ: descobre onde o mouse está DENTRO de cada card e
              entrega essa posição ao CSS, que desenha o brilho
              (estilos/07-cards-lanterna.css).
   ============================================================= */
"use strict";

function iniciarCardsLanterna() {
    const cards = document.querySelectorAll(".card-lanterna");

    cards.forEach((card) => {
        card.addEventListener("mousemove", (evento) => {
            // Posição e tamanho do card na tela.
            const retangulo = card.getBoundingClientRect();

            // Posição do mouse na janela menos a posição do card
            // = posição do mouse DENTRO do card.
            const x = evento.clientX - retangulo.left;
            const y = evento.clientY - retangulo.top;

            // Grava como variáveis CSS (--mouse-x e --mouse-y) no próprio card.
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });
}

iniciarCardsLanterna();
