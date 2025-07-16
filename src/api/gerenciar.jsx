import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

// Busca todos os vídeos para gerenciamento
export const getAllVideos = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/librasapi/gerenciar/video`, {
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
        });
        const { videos = [], status = [] } = response.data || {};

        // Para cada vídeo, busca o arquivo como blob e cria URL
        const videosWithUrl = await Promise.all(
            videos.map(async (video) => {
                const { Pasta, NomeArquivo } = video;
                let videoUrl = null;
                if (Pasta && NomeArquivo) {
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
                        console.error(`Erro ao capturar o vídeo para id ${video.id}:`, e);
                    }
                }
                return { ...video, videoUrl };
            })
        );

        return { videos: videosWithUrl, status };
    } catch (e) {
        console.error('Erro ao capturar os videos:', e);
        return { videos: [], status: [] };
    }
}

// Edita vídeo
export const editVideo = async (id, descricao, contextoId, situacaoId, token) => {
    try {
        const response = await axios.put(`${API_URL}/librasapi/gerenciar/video/${id}`, {
            descricao,
            contextoId,
            situacaoId
        }, {
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
        });
        return response.data;
    } catch (e) {
        console.error('Erro ao editar vídeo:', e);
        return null;
    }
}

// Edita acesso do usuário
export const editUsuarioAcesso = async (id, acesso, token) => {
    try {
        const response = await axios.put(`${API_URL}/librasapi/gerenciar/usuario/${id}`, {
            acesso
        }, {
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
        });
        return response.data;
    } catch (e) {
        console.error('Erro ao editar usuário:', e);
        return null;
    }
}