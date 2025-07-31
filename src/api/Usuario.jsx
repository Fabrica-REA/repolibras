import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const cadastro = async (nome, email, senha) => {
    try {
        const response = await axios.post(
            `${API_URL}/cadastro`,
            { nome, email, senha },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            }
        );
        return { data: response.data };
    } catch (e) {
        console.error('Erro ao cadastrar usuário:', e);
        throw e;
    }
}

export const login = async (email, senha) => {
    try {
        const response = await axios.post(
            `${API_URL}/login`,
            { email, senha },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            }
        );
        return { data: response.data };
    } catch (e) {
        console.error('Erro ao fazer login:', e);
        throw e;
    }
}

export const logout = async (token) => {
    // Asegura que os dados do usuário sejam removidos do armazenamento local
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    try {
        const response = await axios.post(
            `${API_URL}/librasapi/usuario/logout`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                withCredentials: true
            }
        );
        return { data: response.data };
    } catch (e) {
        console.error('Erro ao fazer logout:', e);
        return { data: null };
    }
}

export const editarCredenciais = async (id, nome, email, senha, token) => {
    try {
        const response = await axios.put(
            `${API_URL}/librasapi/usuario/${id}`,
            { nome, email, senha },
            {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                withCredentials: true
            }
        );
        return { data: response.data };
    } catch (e) {
        console.error('Erro ao editar credenciais:', e);
        throw e;
    }
}

export const getUsuarios = async (token) => {
    try {
        const response = await axios.get(
            `${API_URL}/librasapi/usuarios`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                withCredentials: true
            }
        );
        return { data: response.data };
    } catch (e) {
        console.error('Erro ao obter usuários:', e);
        throw e;
    }
}

export const getSession = async () => {
    try {
        const response = await axios.get(
            `${API_URL}/librasapi/session`,
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );
        return { data: response.data };
    } catch (e) {
        console.error('Erro ao obter sessão:', e);
        throw e;
    }
}