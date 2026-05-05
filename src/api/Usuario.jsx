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

export const editarCredenciais = async (id, nome, email, senha, token, acessibilidade) => {
    try {
        const payload = {
            nome,
            email,
            senha,
            ...(acessibilidade ? { acessibilidade } : {})
        };

        const response = await axios.put(
            `${API_URL}/librasapi/usuario/${id}`,
            payload,
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

export const atualizarAcessibilidade = async (id, acessibilidade, token) => {
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };

    try {
        const response = await axios.put(
            `${API_URL}/librasapi/usuario/${id}/acessibilidade`,
            { acessibilidade },
            {
                headers,
                withCredentials: true
            }
        );
        return { data: response.data };
    } catch {
        try {
            const fallbackResponse = await axios.put(
                `${API_URL}/librasapi/usuario/${id}`,
                { acessibilidade },
                {
                    headers,
                    withCredentials: true
                }
            );
            return { data: fallbackResponse.data };
        } catch (fallbackError) {
            console.error('Erro ao atualizar acessibilidade:', fallbackError);
            throw fallbackError;
        }
    }
}