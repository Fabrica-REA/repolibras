import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

// Busca total de vídeos
export const getTotalVideos = async (token) => {
  const response = await axios.get(
    `${API_URL}/librasapi/estatisticas/videos`,
    {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response.data;
}

// Busca total de professores
export const getTotalProfessores = async (token) => {
  const response = await axios.get(
    `${API_URL}/librasapi/estatisticas/professores`,
    {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// Busca vídeos recentes
export const getNovosVideosRecentes = async (token) => {
  const response = await axios.get(
    `${API_URL}/librasapi/estatisticas/videos/recentes`,
    {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// Busca porcentagem de sinais verificados
export const getPorcentagemSinaisVerificados = async (token) => {
  const response = await axios.get(
    `${API_URL}/librasapi/estatisticas/videos/verificados`,
    {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// Busca vídeos pendentes de revisão
export const getVideosPendentesRevisao = async (token) => {
  const response = await axios.get(
    `${API_URL}/librasapi/estatisticas/videos/revisao`,
    {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// Busca gráfico de contribuições mensais
export const getGraficoContribuicoesMensais = async (token) => {
  const response = await axios.get(
    `${API_URL}/librasapi/estatisticas/contribuicoes/30D`,
    {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// Busca quantidade de usuários
export const getCountUsuarios = async (token) => {
  const response = await axios.get(
    `${API_URL}/librasapi/estatisticas/usuarios`,
    {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response.data;
};

// Busca palavras mais buscadas
export const getPalavrasMaisBuscadas = async () => {
    try {
        const response = await axios.get(
            `${API_URL}/librasapi/estatisticas/sinais`,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data; // [{ DesPalavra, total }]
    } catch (e) {
        console.error('Erro ao buscar palavras mais buscadas:', e);
        return [];
    }
};