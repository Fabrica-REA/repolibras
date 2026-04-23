import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const getusuarios = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/librasapi/usuarios`, {
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            withCredentials: true
        });
        return response.data
    } catch (e) {
        console.error('Erro ao buscar os usuarios:', e);
    }
}

export const putUsuario = async (id, acesso, token) => {
    try {
        const response = await axios.put(`${API_URL}/librasapi/usuarios/${id}`, { acesso }, {
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            withCredentials: true
        });
        return response.data;
    } catch (e) {
        console.error('Erro ao atualizar o usuário:', e);
    }
}

export const getChavesDesempenho = async () => { }

