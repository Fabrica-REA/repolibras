import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

// Busca palavras e vídeos relacionados
export const getPalavras = async (q, linguagem) => {
    if (q === undefined) {
        return [];
    } else {
        try {
            const response = await axios.get(`${API_URL}/palavras?descricao=${encodeURIComponent(q)}&linguagem=${linguagem}`, {
                headers: { 'Content-Type': 'application/json' }
            });

            const pesquisas = response.data;

            // Para cada pesquisa, se tiver vídeos, busca a URL do vídeo
            const videosPesquisa = await Promise.all(
                pesquisas.map(async (pesquisa) => {
                    if (Array.isArray(pesquisa.videos) && pesquisa.videos.length > 0) {
                        const videosWithUrl = await Promise.all(
                            pesquisa.videos.map(async (video) => {
                                const { nome, pasta } = video;
                                let videoUrl = null;
                                try {
                                    const videoResponse = await axios.get(
                                        `${API_URL}/download/${pasta}/${nome}`,
                                        { responseType: "blob" }
                                    );
                                    videoUrl = URL.createObjectURL(videoResponse.data);   
                                } catch (e) {
                                    console.error(`Erro ao capturar o vídeo para video.id ${video.id || ""}:`, e);
                                }
                                return { ...video, videoUrl };
                            })
                        );
                        return { ...pesquisa, videos: videosWithUrl };
                    }
                })
            );
            return videosPesquisa;
        } catch (error) {
            console.error('Erro ao buscar palavras:', error);
            return [];
        }
    }
}

// Registra busca de palavra
export const postBuscaPalavra = async (desPalavra, usuarioId, linguagem) => {
    try {
        const response = await axios.post(
            `${API_URL}/buscapalavra`,
            {
                desPalavra,
                usuarioId: usuarioId || -1,
                data: new Date().toISOString().slice(0, 19).replace('T', ' '), // Formata para DATETIME do MySQL
                linguagem
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        return response.data;
    } catch (e) {
        console.error("Erro ao registrar busca:", e);
        return null;
    }
};