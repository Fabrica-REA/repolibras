import axios from "axios";

export const getAvaliacoes = async () => {
    try {
        // 1. Fetch all avaliações
        const avaliacoesResponse = await axios.get('http://localhost:5002/librasapi/avaliacoes', {
            headers: { 'Content-Type': 'application/json' }
        });
        const avaliacoes = avaliacoesResponse.data;

        // 2. For each avaliação, fetch its video as a blob and create an object URL
        const avaliacoesComVideo = await Promise.all(
            avaliacoes.map(async (avaliacao) => {
                const { Pasta, NomeArquivo } = avaliacao;
                let videoUrl = null;
                try {
                    const videoResponse = await axios.get(
                        `http://localhost:5002/librasapi/download/${Pasta}/${NomeArquivo}`,
                        { responseType: "blob" }
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

export const recusarAvaliacao = async (id, usuario_id, quemRecusou, motivo) => {
    try {
        const response = await axios.post(`http://localhost:5002/librasapi/desaprovacao/${id}`, { usuario_id, quemRecusou, motivo }, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao recusar a avaliação:', error);
        throw error;
    }
}

export const aceitarAvaliacao = async (id, usuario_id, quemAprovou) => {
    try {
        const response = await axios.post(`http://localhost:5002/librasapi/aprovacao/${id}`, { usuario_id, quemAprovou }, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao aceitar a avaliação:', error);
        throw error;
    }
}