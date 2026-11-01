/* =============================================================
   ARQUIVO: 06-video-vitrine.js
   O QUE FAZ: toca o vídeo de fundo só enquanto a vitrine está
              visível. Fora da tela ele é pausado, economizando
              processamento e bateria.
   Se o vídeo não carregar, o fundo escuro da seção continua lá.
   ============================================================= */
"use strict";

function iniciarVideoVitrine() {
    const video = document.getElementById("vitrine-video");
    if (!video || !("IntersectionObserver" in window)) return;

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                // play() devolve uma Promise; o navegador pode recusar o autoplay.
                // O catch evita um erro no console nesse caso.
                const promessa = video.play();
                if (promessa) promessa.catch(() => {});
            } else {
                video.pause();
            }
        });
    });

    observador.observe(video);
}

iniciarVideoVitrine();
