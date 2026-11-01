/* =============================================================
   ARQUIVO: 03-surgimento-ao-rolar.js
   O QUE FAZ: faz os elementos .revelar e .revelar-zoom surgirem
              quando entram na tela, usando IntersectionObserver.

   O QUE É IntersectionObserver?
   Um "vigia" do navegador que avisa quando um elemento entra ou
   sai da área visível. É mais eficiente do que escutar "scroll"
   e calcular posições na mão.

   Este script só adiciona classes. A animação em si está no CSS
   (assets/css/10-animacoes-surgimento.css).
   ============================================================= */
"use strict";

function iniciarSurgimento() {
    const elementos = document.querySelectorAll(".revelar, .revelar-zoom");

    // Sem IntersectionObserver (navegador muito antigo) ou sem elementos:
    // saímos SEM ativar .animacoes-ativas, então tudo continua visível.
    if (!("IntersectionObserver" in window) || elementos.length === 0) return;

    // Quando a animação termina, devolvemos o elemento ao estado "normal":
    // sem as classes de surgimento, o hover dele volta a funcionar sem atraso.
    function finalizar(elemento) {
        elemento.classList.remove("revelar", "revelar-zoom", "ativo");
    }

    function revelar(elemento) {
        elemento.classList.add("ativo");

        let terminou = false;
        function terminar() {
            if (terminou) return;
            terminou = true;
            finalizar(elemento);
        }

        // "transitionend" dispara quando a transição acaba. Filtramos para
        // ouvir só a opacidade do PRÓPRIO elemento (filhos também disparam o evento).
        elemento.addEventListener("transitionend", (evento) => {
            if (evento.target === elemento && evento.propertyName === "opacity") terminar();
        });

        // Rede de segurança: se o evento nunca vier, termina depois de 2s.
        window.setTimeout(terminar, 2000);
    }

    const observador = new IntersectionObserver(
        (entradas) => {
            entradas.forEach((entrada) => {
                if (!entrada.isIntersecting) return;
                revelar(entrada.target);
                observador.unobserve(entrada.target); // já apareceu: pode parar de vigiar
            });
        },
        {
            // Dispara quando o topo do elemento passa de 95% da altura da tela,
            // isto é, assim que ele aparece na borda de baixo.
            rootMargin: "0px 0px -5% 0px",
            threshold: 0,
        }
    );

    elementos.forEach((elemento) => observador.observe(elemento));

    // SÓ AGORA escondemos os elementos: o vigia já está pronto para revelá-los.
    document.documentElement.classList.add("animacoes-ativas");
}

iniciarSurgimento();
