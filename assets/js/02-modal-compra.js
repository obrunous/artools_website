/* =============================================================
   ARQUIVO: 02-modal-compra.js
   O QUE FAZ: abre a janela de DEMONSTRAÇÃO quando alguém clica
              em um botão de compra (qualquer elemento com o atributo
              data-abrir-compra).

   Não existe compra real: a janela só explica isso.
   O <dialog> nativo cuida do foco e da tecla Esc. Aqui só
   acrescentamos o clique no fundo escuro para fechar.
   ============================================================= */
"use strict";

function iniciarModalCompra() {
    const modal = document.getElementById("modal-compra");
    const botoes = document.querySelectorAll("[data-abrir-compra]");

    if (!modal || botoes.length === 0) return;

    botoes.forEach((botao) => {
        botao.addEventListener("click", () => {
            // showModal() existe nos navegadores atuais. Se faltar, abrimos sem camada especial.
            if (typeof modal.showModal === "function") {
                modal.showModal();
            } else {
                modal.setAttribute("open", "");
            }
        });
    });

    // Clique no fundo escuro: o alvo do clique é o próprio <dialog>
    // (clicar dentro do conteúdo tem como alvo os elementos filhos).
    modal.addEventListener("click", (evento) => {
        if (evento.target === modal) {
            if (typeof modal.close === "function") modal.close();
            else modal.removeAttribute("open");
        }
    });
}

iniciarModalCompra();
