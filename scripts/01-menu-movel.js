
/* =============================================================
   ARQUIVO: 01-menu-movel.js
   O QUE FAZ: abre e fecha o menu da navbar no celular.

   Acessibilidade:
     - aria-expanded diz ao leitor de tela se o menu está aberto.
     - aria-controls aponta para o menu controlado (id no HTML).
     - aria-label troca entre "Abrir menu" e "Fechar menu".
     - a tecla Esc fecha o menu e devolve o foco ao botão.

   Se este arquivo falhar, o menu NÃO é escondido: a classe
   .menu-pronto só é adicionada no final da preparação, e é ela
   que liga o visual do menu recolhido (estilos/04-navbar.css).
   ============================================================= */
"use strict";

function iniciarMenuMovel() {
    const navbar = document.getElementById("navbar");
    const botao = document.getElementById("botao-menu");
    const menu = document.getElementById("menu-principal");

    // Se algum elemento não existir, não há o que fazer.
    if (!navbar || !botao || !menu) return;

    function menuEstaAberto() {
        return botao.getAttribute("aria-expanded") === "true";
    }

    // devolverFoco: ao fechar com Esc, o foco volta para o botão.
    function definirMenu(aberto, devolverFoco) {
        navbar.classList.toggle("menu-aberto", aberto);
        botao.setAttribute("aria-expanded", String(aberto));
        botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
        if (!aberto && devolverFoco) botao.focus();
    }

    botao.addEventListener("click", () => {
        definirMenu(!menuEstaAberto());
    });

    // Clicou em um link do menu: fecha (a página rola até a seção).
    menu.addEventListener("click", (evento) => {
        if (evento.target.closest("a")) definirMenu(false);
    });

    // Tecla Esc fecha o menu.
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape" && menuEstaAberto()) definirMenu(false, true);
    });

    // Clicar fora da navbar também fecha.
    document.addEventListener("click", (evento) => {
        if (menuEstaAberto() && !navbar.contains(evento.target)) definirMenu(false);
    });

    // Se a janela ficar larga (menu horizontal), volta ao estado fechado.
    const telaGrande = window.matchMedia("(min-width: 768px)");
    telaGrande.addEventListener("change", (evento) => {
        if (evento.matches) definirMenu(false);
    });

    // Tudo pronto: agora o CSS pode recolher o menu no celular.
    document.documentElement.classList.add("menu-pronto");
}

iniciarMenuMovel();
