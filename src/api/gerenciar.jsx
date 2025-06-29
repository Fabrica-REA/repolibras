import axios from "axios";

export const getAllVideos = async () => {
    try {
        const response = await axios.get('http://localhost:5002/librasapi/gerenciar/video', {
            headers: { 'Content-Type': 'application/json' }
        });
        const { videos = [], status = [] } = response.data || {};

        // For each video, fetch its video file as a blob and create an object URL
        const videosWithUrl = await Promise.all(
            videos.map(async (video) => {
                const { Pasta, NomeArquivo } = video;
                let videoUrl = null;
                if (Pasta && NomeArquivo) {
                    try {
                        const videoResponse = await axios.get(
                            `http://localhost:5002/librasapi/download/${Pasta}/${NomeArquivo}`,
                            { responseType: "blob" }
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

export const editVideo = async (id, descricao, contextoId, situacaoId) => {
    try {
        const response = await axios.put(`http://localhost:5002/librasapi/gerenciar/video/${id}`, {
            descricao,
            contextoId,
            situacaoId
        }, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (e) {
        console.error('Erro ao editar vídeo:', e);
        return null;
    }
}

export const editUsuarioAcesso = async (id, acesso) => {
    try {
        const response = await axios.put(`http://localhost:5002/librasapi/gerenciar/usuario/${id}`, {
            acesso
        }, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (e) {
        console.error('Erro ao editar usuário:', e);
        return null;
    }
}