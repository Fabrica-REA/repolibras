import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

// Busca total de vídeos
export const getTotalVideos = async (token) => {
  try {
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
  } catch (e) {
    console.error('Erro ao buscar total de vídeos:', e);
    return null;
  }
}

// Busca total de professores
export const getTotalProfessores = async (token) => {
  try {
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
  } catch (e) {
    console.error('Erro ao buscar total de professores:', e);
    return null;
  }
};

// Busca vídeos recentes
export const getNovosVideosRecentes = async (token) => {
  try {
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
  } catch (e) {
    console.error('Erro ao buscar vídeos recentes:', e);
    return null;
  }
};

// Busca porcentagem de sinais verificados
export const getPorcentagemSinaisVerificados = async (token) => {
  try {
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
  } catch (e) {
    console.error('Erro ao buscar porcentagem de sinais verificados:', e);
    return null;
  }
};

// Busca vídeos pendentes de revisão
export const getVideosPendentesRevisao = async (token) => {
  try {
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
  } catch (e) {
    console.error('Erro ao buscar vídeos pendentes de revisão:', e);
    return null;
  }
};

// Busca gráfico de contribuições mensais
export const getGraficoContribuicoesMensais = async (token) => {
  try {
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
  } catch (e) {
    console.error('Erro ao buscar gráfico de contribuições mensais:', e);
    return null;
  }
};

// Busca quantidade de usuários
export const getCountUsuarios = async (token) => {
  try {
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
  } catch (e) {
    console.error('Erro ao buscar quantidade de usuários:', e);
    return null;
  }
};

// Busca palavras mais buscadas
export const getPalavrasMaisBuscadas = async (token) => {
  try {
    const response = await axios.get(
      `${API_URL}/librasapi/estatisticas/sinais`,
      {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (e) {
    console.error('Erro ao buscar palavras mais buscadas:', e);
    return [];
  }
};