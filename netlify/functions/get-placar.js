// Arquivo: netlify/functions/get-placar.js

// O Netlify expõe variáveis de ambiente (como a API key) via process.env
const API_KEY = process.env.API_KEY_FUTEBOL; 
const API_URL = "SUA_URL_DA_API_DE_PLACAR"; // Ex: https://api.exemplo.com/v1/scores?league=brasileirao

// A função 'handler' é o que o Netlify executa quando a URL da função é acessada
exports.handler = async (event, context) => {
  try {
    // Adiciona a chave de API na URL ou no header (depende da sua API)
    const urlComChave = `${API_URL}&api_key=${API_KEY}`;
    
    // Faz a requisição para a API de Futebol
    const resposta = await fetch(urlComChave);
    
    if (!resposta.ok) {
      // Se a API externa falhar, retorna um erro amigável
      return {
        statusCode: resposta.status,
        body: JSON.stringify({ message: 'Erro ao buscar dados da API de futebol' }),
      };
    }
    
    const dados = await resposta.json();

    // Retorna os dados da API de futebol para o front-end
    return {
      statusCode: 200,
      headers: {
        // Isso é importante para permitir que o GitHub Pages acesse a função
        'Access-Control-Allow-Origin': '*', 
      },
      body: JSON.stringify(dados),
    };

  } catch (error) {
    console.error('Erro na função Netlify:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro interno no servidor', error: error.message }),
    };
  }
};
