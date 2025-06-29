import axios from "axios";

const getPalavras = async (q) => {
    if (q === undefined) {
        return [];
    } else {
        try {
            const response = await axios.get(`http://localhost:5002/librasapi/palavras?descricao=${encodeURIComponent(q)}`, {
                headers: { 'Content-Type': 'application/json' }
            });

            const pesquisas = response.data;

            // For each pesquisa, if it has a videos array, fetch videoUrl for each video
            const videosPesquisa = await Promise.all(
                pesquisas.map(async (pesquisa) => {
                    if (Array.isArray(pesquisa.videos) && pesquisa.videos.length > 0) {
                        const videosWithUrl = await Promise.all(
                            pesquisa.videos.map(async (video) => {
                                const { nome, pasta } = video;     
                                let videoUrl = null;
                                try {
                                    const videoResponse = await axios.get(
                                        `http://localhost:5002/librasapi/download/${pasta}/${nome}`,
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
                }})
            );
            return videosPesquisa;
        } catch (error) {
            console.error('Erro ao buscar palavras:', error);
            return [];
        }
    }
}

export default getPalavras;