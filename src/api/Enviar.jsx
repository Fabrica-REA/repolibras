import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

// Busca contextos
export const getContextos = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/librasapi/contextos`, {
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
        });
        return response.data
    } catch (e) {
        console.error('Erro ao buscar palavras:', e);
    }
}

// Envia arquivo ou link
export const postArquivo = async (videoFileOrLink, contexto, usuario, palavra, observacao, linguagem, token) => {
    try {    
        const formData = new FormData();
        if (videoFileOrLink instanceof File) {
            formData.append('file', videoFileOrLink);
        } else if (typeof videoFileOrLink === 'string') {
            formData.append('link', videoFileOrLink);
        }
        formData.append('usuarioid', usuario.id);
        formData.append('contextoid', contexto.id);
        formData.append('palavra', palavra);
        formData.append('observacao', observacao);
        formData.append('linguagem', linguagem);

        const response = await axios.post(`${API_URL}/librasapi/upload`, formData, {
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
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