// Arquivo: script.js (no seu repositório do GitHub)

// URL da sua Netlify Function! O Netlify criará esse caminho automaticamente
const FUNCTION_URL = 'https://fastidious-biscuit-7b422a.netlify.app/.netlify/functions/get-placar';

async function atualizarPlacar() {
    const atualizacaoEl = document.getElementById('ultima-atualizacao');
    
    try {
        // 1. CHAMA A FUNÇÃO NETLIFY (que já tem a chave protegida)
        const resposta = await fetch(FUNCTION_URL);
        const dados = await resposta.json();

        // **ATENÇÃO:** // A partir daqui, você precisa saber a estrutura JSON dos DADOS que sua API retorna.
        
        // Exemplo: Se sua API retorna um array de jogos, e você quer o primeiro:
        const jogoAtual = dados.matches[0]; 
        
        if (!jogoAtual) {
            document.getElementById('tempo-jogo').textContent = "SEM JOGOS ATIVOS";
            return; 
        }

        // 2. ATUALIZA O HTML (Ajuste esses campos conforme a estrutura real da sua API)
        document.querySelector('#time-casa .nome-time').textContent = jogoAtual.home_team.name;
        document.getElementById('gols-casa').textContent = jogoAtual.score.home;
        document.querySelector('#time-visitante .nome-time').textContent = jogoAtual.away_team.name;
        document.getElementById('gols-visitante').textContent = jogoAtual.score.away;
        document.getElementById('tempo-jogo').textContent = jogoAtual.status; 
        
        // Atualiza o horário
        const agora = new Date();
        atualizacaoEl.textContent = `Última atualização: ${agora.toLocaleTimeString('pt-BR')}`;

    } catch (error) {
        console.error("Erro ao carregar placar:", error);
        document.getElementById('tempo-jogo').textContent = "ERRO NA CONEXÃO";
        atualizacaoEl.textContent = "Verifique o servidor Netlify.";
    }
}

// Roda a atualização periodicamente (30 segundos)
setInterval(atualizarPlacar, 30000); 
atualizarPlacar();
