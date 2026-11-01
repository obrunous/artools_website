/* =============================================================
   ARQUIVO: 04-hero-frames.js
   O QUE FAZ: a animação principal da Hero.
     A) calcula o PROGRESSO DA ROLAGEM (0 a 1) dentro da Hero;
     B) usa esse progresso para escolher qual dos 192 frames
        desenhar no <canvas> (como um "flip book");
     C) faz o texto da Hero sair (subir, sumir e borrar) ao rolar;
     D) carrega os frames aos poucos, com barra de progresso.

   IDEIAS-CHAVE
   - Um vídeo foi cortado em 192 fotos (assets/images/frames/).
   - A Hero tem 200vh e o palco fica "grudado" (sticky). Quanto mais
     você rola, maior o progresso, e maior o número do frame.
   - O JavaScript NÃO anima o texto: só escreve a variável CSS
     --saida (0 a 1). O CSS (assets/css/05-hero.css) faz o resto.
   - A imagem estática do HTML é o plano B: aparece sem JS ou se
     os frames falharem.
   ============================================================= */
"use strict";

function iniciarHero() {
    // ---------------------------------------------------------
    // 1) ELEMENTOS E CONFIGURAÇÕES
    // ---------------------------------------------------------
    const secao = document.getElementById("inicio");
    const palco = secao ? secao.querySelector(".hero-palco") : null;
    const textoHero = document.getElementById("hero-texto");
    const canvas = document.getElementById("hero-canvas");
    const imagemEstatica = document.getElementById("hero-imagem-estatica");
    const indicador = document.getElementById("hero-carregamento");
    const indicadorTexto = document.getElementById("hero-carregamento-texto");
    const barra = document.getElementById("hero-progresso");

    if (!secao || !palco) return; // sem Hero, não há o que fazer

    const TOTAL_DE_FRAMES = 192;
    const PASTA_DOS_FRAMES = "assets/images/frames/";
    const CARREGAMENTOS_SIMULTANEOS = 6; // quantas imagens baixam ao mesmo tempo
    const TENTATIVAS_POR_FRAME = 2;      // 1 tentativa + 1 nova tentativa se falhar
    const IMAGEM_RESERVA = "assets/images/artools_tech_feature.jpg";

    // Quanto da rolagem (em fração da altura da Hero) leva o texto a sair por completo.
    const FRACAO_DA_SAIDA_DO_TEXTO = 0.25;

    // ---------------------------------------------------------
    // 2) PROGRESSO DA ROLAGEM
    // ---------------------------------------------------------
    function limitar(valor, minimo, maximo) {
        return Math.min(maximo, Math.max(minimo, valor));
    }

    // Quanto o topo da Hero já subiu acima da tela (em pixels).
    function pixelsRolados() {
        return -secao.getBoundingClientRect().top;
    }

    // 0 = Hero no topo, 1 = fim da Hero (palco prestes a soltar).
    function progressoDaHero() {
        const distanciaTotal = secao.offsetHeight - palco.offsetHeight;
        if (distanciaTotal <= 0) return 0;
        return limitar(pixelsRolados() / distanciaTotal, 0, 1);
    }

    // 0 = texto no lugar, 1 = texto já saiu.
    function progressoDaSaidaDoTexto() {
        return limitar(pixelsRolados() / (secao.offsetHeight * FRACAO_DA_SAIDA_DO_TEXTO), 0, 1);
    }

    // ---------------------------------------------------------
    // 3) TEXTO DA HERO (só escreve quando o valor muda)
    // ---------------------------------------------------------
    let saidaAnterior = -1;

    function atualizarTexto() {
        if (!textoHero) return;
        const saida = Math.round(progressoDaSaidaDoTexto() * 1000) / 1000;
        if (saida === saidaAnterior) return; // nada mudou: evita trabalho à toa
        saidaAnterior = saida;

        textoHero.style.setProperty("--saida", String(saida));
        textoHero.classList.toggle("hero-texto-oculto", saida >= 1);
    }

    // ---------------------------------------------------------
    // 4) PEDIR ATUALIZAÇÃO NO PRÓXIMO QUADRO (requestAnimationFrame)
    // O evento "scroll" dispara muitas vezes. Em vez de calcular a cada
    // disparo, guardamos um aviso e calculamos UMA vez por quadro da tela.
    // ---------------------------------------------------------
    let atualizacaoPedida = false;
    let sequencia = null; // preenchido mais abaixo, se o canvas funcionar

    function atualizar() {
        atualizacaoPedida = false;
        atualizarTexto();
        if (sequencia) sequencia.mostrarFrameDaRolagem(progressoDaHero());
    }

    function pedirAtualizacao() {
        if (atualizacaoPedida) return;
        atualizacaoPedida = true;
        window.requestAnimationFrame(atualizar);
    }

    window.addEventListener("scroll", pedirAtualizacao, { passive: true });
    window.addEventListener("resize", pedirAtualizacao);
    window.addEventListener("load", pedirAtualizacao); // o navegador pode restaurar a rolagem depois do carregamento

    // ---------------------------------------------------------
    // 5) IMAGEM ESTÁTICA DE RESERVA
    // Se até o frame 1 estiver quebrado, usamos outra imagem local.
    // ---------------------------------------------------------
    if (imagemEstatica) {
        let usouReserva = false;
        const trocarPorReserva = () => {
            if (usouReserva) return;
            usouReserva = true;
            imagemEstatica.src = IMAGEM_RESERVA;
        };
        imagemEstatica.addEventListener("error", trocarPorReserva);
        // O erro pode ter acontecido antes deste script rodar.
        if (imagemEstatica.complete && imagemEstatica.naturalWidth === 0) trocarPorReserva();
    }

    // ---------------------------------------------------------
    // 6) SEQUÊNCIA DE FRAMES NO CANVAS
    // ---------------------------------------------------------
    const contexto = canvas && canvas.getContext ? canvas.getContext("2d") : null;

    if (!contexto) {
        // Sem canvas: a imagem estática continua visível e o texto continua funcionando.
        pedirAtualizacao();
        return;
    }

    const imagens = new Array(TOTAL_DE_FRAMES);                 // objetos Image
    const estados = new Array(TOTAL_DE_FRAMES).fill("pendente"); // pendente | carregando | pronto | erro
    const tentativas = new Array(TOTAL_DE_FRAMES).fill(0);

    let prontos = 0;           // frames carregados com sucesso
    let falhas = 0;            // frames que falharam de vez
    let emAndamento = 0;       // downloads acontecendo agora
    let indiceDesejado = 0;    // frame que a rolagem pede
    let indiceDesenhado = -1;  // frame que está no canvas agora
    let primeiroFrameConcluido = false;
    let ultimoPercentualAvisado = -1;

    function caminhoDoFrame(indice) {
        // padStart(4, "0") completa com zeros: 1 → "0001"
        return `${PASTA_DOS_FRAMES}frame_${String(indice + 1).padStart(4, "0")}.jpg`;
    }

    // ---- Indicador de carregamento ----
    function atualizarIndicador() {
        const concluidos = prontos + falhas;
        const percentual = Math.round((concluidos / TOTAL_DE_FRAMES) * 100);

        if (barra) barra.value = concluidos;

        // O texto (lido por leitores de tela) muda só a cada 10%, para não "tagarelar".
        const degrau = Math.floor(percentual / 10);
        if (indicadorTexto && degrau !== ultimoPercentualAvisado) {
            ultimoPercentualAvisado = degrau;
            indicadorTexto.textContent = `Carregando animação… ${degrau * 10}%`;
        }

        if (concluidos < TOTAL_DE_FRAMES) return;

        // TERMINOU (com sucesso ou não): o indicador nunca fica preso.
        if (prontos === 0) {
            // Nenhum frame carregou: a imagem estática segue como plano B.
            if (indicadorTexto) indicadorTexto.textContent = "Animação indisponível. Mostrando imagem estática.";
            if (barra) barra.hidden = true;
            window.setTimeout(() => { if (indicador) indicador.hidden = true; }, 5000);
        } else {
            if (falhas > 0) console.warn(`Hero: ${falhas} frame(s) não carregaram; o último frame válido é mantido.`);
            if (indicador) indicador.hidden = true;
        }
    }

    // ---- Carregamento de UM frame ----
    function carregarFrame(indice) {
        if (estados[indice] !== "pendente") return;

        estados[indice] = "carregando";
        tentativas[indice] += 1;
        emAndamento += 1;

        const imagem = new Image();
        imagens[indice] = imagem;

        imagem.onload = () => {
            // "complete" sozinho não prova nada: confirmamos que a imagem tem tamanho.
            if (imagem.naturalWidth > 0 && imagem.naturalHeight > 0) {
                finalizarFrame(indice, true);
            } else {
                finalizarFrame(indice, false);
            }
        };
        imagem.onerror = () => finalizarFrame(indice, false);

        imagem.decoding = "async";
        imagem.src = caminhoDoFrame(indice); // começa o download
    }

    function finalizarFrame(indice, sucesso) {
        emAndamento -= 1;
        imagens[indice].onload = null;
        imagens[indice].onerror = null;

        if (sucesso) {
            estados[indice] = "pronto";
            prontos += 1;
            // O frame que a rolagem pede acabou de chegar: desenha.
            if (indice === indiceDesejado) pedirAtualizacao();
        } else if (tentativas[indice] < TENTATIVAS_POR_FRAME) {
            // Nova tentativa depois de uma pausa; por enquanto volta à fila.
            estados[indice] = "espera";
            window.setTimeout(() => {
                estados[indice] = "pendente";
                continuarFila();
            }, 1500);
        } else {
            estados[indice] = "erro";
            falhas += 1;
        }

        primeiroFrameConcluido = true;
        atualizarIndicador();
        continuarFila();
    }

    // ---- Fila: carrega o restante aos poucos ----

    // Escolhe, entre os frames pendentes, o mais PERTO do frame pedido
    // pela rolagem. Assim, se o usuário pular para o meio da Hero,
    // os frames dali vêm primeiro.
    function proximoPendente() {
        let melhor = -1;
        let menorDistancia = Infinity;
        for (let i = 0; i < TOTAL_DE_FRAMES; i++) {
            if (estados[i] !== "pendente") continue;
            const distancia = Math.abs(i - indiceDesejado);
            if (distancia < menorDistancia) {
                menorDistancia = distancia;
                melhor = i;
            }
        }
        return melhor;
    }

    function continuarFila() {
        // O primeiro frame tem prioridade total: a fila só começa depois dele.
        if (!primeiroFrameConcluido) return;

        while (emAndamento < CARREGAMENTOS_SIMULTANEOS) {
            const proximo = proximoPendente();
            if (proximo === -1) break;
            carregarFrame(proximo);
        }
    }

    // ---- Desenho ----
    function desenharFrame(indice) {
        if (estados[indice] !== "pronto") return false;
        if (indice === indiceDesenhado) return true; // já está na tela

        const imagem = imagens[indice];

        // O canvas ganha o tamanho real do frame, então a proporção é preservada.
        // (Mudar width/height apaga o canvas, mas desenhamos logo em seguida.)
        if (canvas.width !== imagem.naturalWidth || canvas.height !== imagem.naturalHeight) {
            canvas.width = imagem.naturalWidth;
            canvas.height = imagem.naturalHeight;
        }

        // Só chegamos aqui com um frame válido, então limpar é seguro.
        contexto.clearRect(0, 0, canvas.width, canvas.height);
        contexto.drawImage(imagem, 0, 0, canvas.width, canvas.height);
        indiceDesenhado = indice;
        return true;
    }

    // API usada pela função atualizar() lá em cima.
    sequencia = {
        mostrarFrameDaRolagem(progresso) {
            indiceDesejado = Math.round(progresso * (TOTAL_DE_FRAMES - 1));

            // Se o frame ainda não chegou, NÃO mexemos no canvas:
            // fica o último frame válido até ele terminar de carregar.
            desenharFrame(indiceDesejado);

            // Garante que a fila continue trabalhando perto do frame pedido.
            continuarFila();
        },
    };

    // ---------------------------------------------------------
    // 7) PARTIDA
    // ---------------------------------------------------------
    // Descobre o frame necessário agora (a página pode abrir já rolada),
    // mostra o indicador e carrega ESSE frame primeiro.
    indiceDesejado = Math.round(progressoDaHero() * (TOTAL_DE_FRAMES - 1));
    if (barra) barra.max = TOTAL_DE_FRAMES;
    if (indicador) indicador.hidden = false;

    carregarFrame(indiceDesejado);
    atualizarTexto();
}

iniciarHero();
