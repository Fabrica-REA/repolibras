import axios from "axios";

export const cadastro = async (nome, email, senha) => {
    try {
        const response = await axios.post('http://localhost:5002/librasapi/cadastro', { nome, email, senha }, {
            headers: { 'Content-Type': 'application/json' }
        });
        return { data: response.data };
    } catch (e) {
        console.error('Erro ao cadastrar usuário:', e);
        return { data: null };
    }
}

export const login = async (email, senha) => {
    try {
        const response = await axios.post('http://localhost:5002/librasapi/login', { email, senha }, {
            headers: { 'Content-Type': 'application/json' }
        });
        return { data: response.data };
    } catch (e) {
        console.error('Erro ao fazer login:', e);
        return { data: null };
    }
}

export const logout = async () => {
    try {
        const response = await axios.post('http://localhost:5002/logout', {}, {
            headers: { 'Content-Type': 'application/json' }
        });
        return { data: response.data };
    } catch (e) {
        console.error('Erro ao fazer logout:', e);
        return { data: null };
    }
}

export const editarCredenciais = async (id, nome, email, senha) => {
    try {
        const response = await axios.put(`http://localhost:5002/usuario/${id}`, { nome, email, senha }, {
            headers: { 'Content-Type': 'application/json' }
        });
        return { data: response.data };
    } catch (e) {
        console.error('Erro ao editar credenciais:', e);
        return { data: null };
    }
}