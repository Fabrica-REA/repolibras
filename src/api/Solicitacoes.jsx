import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const getSolicitacoes = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/librasapi/solicitacoes`, {
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
        });
        return response.data
    } catch (e) {
        console.error('Erro ao cadastrar usuário:', e);
        return null
    }
}

export const postSolicitacao = async (palavra, contexto, usuarioId, linguagem, token) => {
    try {
        const response = await axios.post(`${API_URL}/librasapi/solicitacao`, { palavra, contexto, usuario: usuarioId, linguagem }, {
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
        });
        return response.data
    } catch (e) {
        console.error('Erro ao cadastrar solicitação:', e);
    }
}

export const sendSolicitacao = async (id, videoFile, contexto, usuario, palavra, observacao, token) => {
    try {
        const formData = new FormData();
        formData.append('file', videoFile);
        formData.append('usuario', usuario.id);
        formData.append('contextoId', contexto);
        formData.append('palavra', palavra);
        formData.append('observacao', observacao);
        

        const response = await axios.post(`${API_URL}/librasapi/solicitacao/${id}`, formData, {
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
        });
        return response.data
    } catch (e) {
        console.error('Erro ao enviar solicitação:', e);
        return null
    }
}

export const deleteSolicitacao = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/librasapi/solicitacao/${id}`, {
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
        })
        return response.data
    } catch (e) {
        console.error('Erro ao deletar solicitação:', e);
        return null
    }
}