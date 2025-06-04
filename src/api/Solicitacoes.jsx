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

/*dosen't have in the backend*/
export const deleteSolicitacao = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5002/librasapi/solicitacoes/${id}`, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data
    } catch (e) {
        console.error('Erro ao deletar solicitação:', e);
        return null
    }
}
