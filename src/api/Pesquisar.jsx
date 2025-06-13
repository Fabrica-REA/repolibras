import axios from "axios";

const getPalavras = async (q) => {
    if (q === undefined) {
        return [];
    } else {
        try {
            const response = await axios.get(`http://localhost:5002/librasapi/palavras?descricao=${encodeURIComponent(q)}`, {
                headers: { 'Content-Type': 'application/json' }
            })
            return response.data
        } catch (error) {
            console.error('Erro ao buscar palavras:', error);
            return [];
        }
    }
}

export default getPalavras