// Função para buscar e atualizar os dados
function atualizarPlacar() {
    // ----------------------------------------------------------------------
    // ESTA PARTE ABAIXO SIMULA OS DADOS QUE VIRIAM DE UMA API REAL
    // ----------------------------------------------------------------------
    const dadosSimulados = {
        timeCasa: "FLAMENGO",
        golsCasa: Math.floor(Math.random() * 4), // Gols aleatórios de 0 a 3
        timeVisitante: "SÃO PAULO",
        golsVisitante: Math.floor(Math.random() * 4),
        tempoJogo: ["25:30", "INTERVALO", "80:45", "FIM DE JOGO"][Math.floor(Math.random() * 4)]
    };
    // ----------------------------------------------------------------------

    // Pega os elementos do HTML
    const nomeCasaEl = document.querySelector('#time-casa .nome-time');
    const golsCasaEl = document.getElementById('gols-casa');
    const nomeVisitanteEl = document.querySelector('#time-visitante .nome-time');
    const golsVisitanteEl = document.getElementById('gols-visitante');
    const tempoJogoEl = document.getElementById('tempo-jogo');
    const atualizacaoEl = document.getElementById('ultima-atualizacao');

    // Atualiza o HTML com os dados
    nomeCasaEl.textContent = dadosSimulados.timeCasa;
    golsCasaEl.textContent = dadosSimulados.golsCasa;
    nomeVisitanteEl.textContent = dadosSimulados.timeVisitante;
    golsVisitanteEl.textContent = dadosSimulados.golsVisitante;
    tempoJogoEl.textContent = dadosSimulados.tempoJogo;

    // Atualiza o horário da última atualização
    const agora = new Date();
    atualizacaoEl.textContent = `Última atualização: ${agora.toLocaleTimeString('pt-BR')}`;
}

// 1. Executa a função imediatamente ao carregar
atualizarPlacar();

// 2. Define um loop para rodar a função a cada 10 segundos (10000 milissegundos)
// Isso simula a checagem na API
setInterval(atualizarPlacar, 10000);