import axios from "axios";

export const getSolicitacoes = async () => {
    try {
        const response = await axios.get('http://localhost:5002/librasapi/solicitacoes', {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data
    } catch (e) {
        console.error('Erro ao cadastrar usuário:', e);
        return null
    }
}

export const postSolicitacao = async (palavra, contexto, usuario) => {
    try {
        const response = await axios.post(`http://localhost:5002/librasapi/palavrai?descricao=${palavra}&contexto=${contexto}`, {
            headers: { 'Content-Type': 'application/json' },
            usuario: usuario.id,
        });
        return response.data
    } catch (e) {
        console.error('Erro ao cadastrar solicitação:', e);
    }
}

export const sendSolicitacao = async (id, videoFile, contexto, usuario, palavra, observacao) => {
    try {
        const formData = new FormData();
        formData.append('file', videoFile);
        formData.append('usuarioid', usuario.id); 
        formData.append('contextoid', contexto);
        formData.append('palavra', palavra);
        formData.append('observacao', observacao); 
        
        const response = await axios.post(`http://localhost:5002/librasapi/solicitacao/${id}`, formData);
        return response.data
    } catch (e) {
        console.error('Erro ao enviar solicitação:', e);
        return null
    }
}

export const deleteSolicitacao = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5002/librasapi/solicitacao/${id}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data
    } catch (e) {
        console.error('Erro ao deletar solicitação:', e);
        return null
    }
}