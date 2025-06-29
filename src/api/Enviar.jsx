import axios from "axios";

export const getContextos = async () => {
    try {
        const response = await axios.get('http://localhost:5002/librasapi/contextos', {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data
    } catch (e) {
        console.error('Erro ao buscar palavras:', e);
    }
}

export const postArquivo = async (videoFileOrLink, contexto, usuario, palavra, observacao) => {
    try {    
        const formData = new FormData();
        if (videoFileOrLink instanceof File) {
            formData.append('file', videoFileOrLink);
        } else if (typeof videoFileOrLink === 'string') {
            formData.append('link', videoFileOrLink);
        }
        formData.append('usuarioid', usuario.id);
        formData.append('contexto', contexto.descricao);
        formData.append('contextoid', contexto.id);
        formData.append('palavra', palavra);
        formData.append('observacao', observacao);

        const response = await axios.post('http://localhost:5002/librasapi/upload', formData, {
            // Add progress monitoring (optional)
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`Upload Progress: ${percentCompleted}%`);
            }
        });

        return response.status;
    } catch (e) {
        console.error('Erro ao enviar arquivo de vídeo:', e);
        throw e;
    }
}