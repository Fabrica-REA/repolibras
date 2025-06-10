export const getusuarios = async () => {
     try {
        const response = await axios.get('http://localhost:5002/librasapi/*', {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data
    } catch (e) {
        console.error('Erro ao buscar os usuarios:', e);
    }
}

export const putUsuario = async (id, acesso) => {
    try {
        const response = await axios.put(`http://localhost:5002/librasapi/usuarios/${id}`, { acesso }, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (e) {
        console.error('Erro ao atualizar o usuário:', e);
    }
}

export const getChavesDesempenho = async () => {}

