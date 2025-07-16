import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const getAvaliacoes = async (token) => {
    try {
        const avaliacoesResponse = await axios.get(`${API_URL}/librasapi/avaliacoes`, {
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
        });
        const avaliacoes = avaliacoesResponse.data;

        const avaliacoesComVideo = await Promise.all(
            avaliacoes.map(async (avaliacao) => {
                const { Pasta, NomeArquivo } = avaliacao;
                let videoUrl = null;
                try {
                    const videoResponse = await axios.get(
                        `${API_URL}/librasapi/download/${Pasta}/${NomeArquivo}`,
                        {
                            responseType: "blob",
                            headers: {
                                ...(token ? { Authorization: `Bearer ${token}` } : {})
                            }
                        }
                    );
                    videoUrl = URL.createObjectURL(videoResponse.data);
                } catch (e) {
                    console.error(`Erro ao capturar o vídeo para avaliação ${avaliacao.id}:`, e);
                }
                return { ...avaliacao, videoUrl };
            })
        );

        return avaliacoesComVideo;
    } catch (e) {
        console.error('Erro ao capturar as avaliações:', e);
        return null;
    }
}

export const recusarAvaliacao = async (id, usuario_id, quemRecusou, motivo, token) => {
    try {
        const response = await axios.post(`${API_URL}/librasapi/desaprovacao/${id}`, { usuario_id, quemRecusou, motivo }, {
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao recusar a avaliação:', error, id, usuario_id, quemRecusou, motivo, token);
        throw error;
    }
}

export const aceitarAvaliacao = async (id, usuario_id, quemAprovou, token) => {
    try {
        const response = await axios.post(`${API_URL}/librasapi/aprovacao/${id}`, { usuario_id, quemAprovou }, {
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao aceitar a avaliação:', error);
        throw error;
    }
}