import axios from "axios";

export const getAvaliacoes = async () => {
    try {
        const response = await axios.get('http://localhost:5002/librasapi/faltaavaliar', {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data
    } catch (e) {
        console.error('Erro ao capturaraas avaliações:', e);
        return null
    }
}

export const recusarAvaliacao = async (avaliacaoId) => {}

export const aceitarAvaliacao = async (avaliacaoId) => {}