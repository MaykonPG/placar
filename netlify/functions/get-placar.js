// Arquivo: netlify/functions/get-placar.js

// A chave de API secreta é obtida de forma segura das Variáveis de Ambiente do Netlify.
const API_KEY = process.env.API_KEY_FUTEBOL; 

// O Host da RapidAPI é essencial para a autenticação.
// (Este host é extraído do URL que você forneceu)
const RAPIDAPI_HOST = 'free-football-api-data.p.rapidapi.com'; 

// URL pura da API que retorna a lista de jogadores (ajuste se for o endpoint de placar)
const API_URL = 'https://free-football-api-data.p.rapidapi.com/football-event-statistics?eventid=12650707'; 

// A função 'handler' é o que o Netlify executa
exports.handler = async (event, context) => {
  try {
    // 1. FAZ A REQUISIÇÃO USANDO HEADERS (O MÉTODO CORRETO PARA RAPIDAPI)
    const resposta = await fetch(API_URL, {
        method: 'GET', 
        headers: {
            // As chaves x-rapidapi-key e x-rapidapi-host são padrão da plataforma RapidAPI
            'x-rapidapi-key': API_KEY,      
            'x-rapidapi-host': RAPIDAPI_HOST 
        }
    });

    // Se o status HTTP não for 200 (OK), a autenticação ou a API falhou
    if (!resposta.ok) { 
      // Esta mensagem será retornada para o seu front-end em caso de falha.
      return {
        statusCode: resposta.status,
        body: JSON.stringify({ 
            message: 'Erro ao buscar dados da API de futebol. Verifique a chave e o HOST.' 
        }),
      };
    }
    
    const dados = await resposta.json();

    // 2. RETORNA OS DADOS PARA O FRONT-END (script.js)
    return {
      statusCode: 200,
      headers: {
        // Isso permite que o seu GitHub Pages acesse esta função
        'Access-Control-Allow-Origin': '*', 
      },
      body: JSON.stringify(dados),
    };

  } catch (error) {
    console.error('Erro na função Netlify:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro interno no servidor' }),
    };
  }
};
