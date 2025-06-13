import axios from "axios";

export const getContextos = async () => {
    try {
        const response = await axios.get('http://localhost:5002/librasapi/contextos', {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data
    } catch (e) {
        console.error('Erro ao buscar palavras:', e);
    }
}

//  const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('usuarioid', 1);
//     formData.append('contexto', contexto);
//     formData.append('contextoid', contextoid);
//     formData.append('novoNomeArquivo', newFileName);
//     setObservacoes( file.name + ' ' + contexto + ' ' + contextoid + ' ' + newFileName);
//     console.log(file);
//     console.log(contextoid);
//     console.log(newFileName);
//     try {
//       const response = await cyiapi.post('/upload', formData);
//       console.log(response.data[0]);
//       if (response.data[0].mensagem)
//         setObservacoes( response.data[0].mensagem);
//       else
//         setObservacoes(`Arquivo ${file.name} foi enviado com sucesso.`);
//     } catch (error) {
//       console.error(error);
//     }
//   };

export const postArquivo = async (videoFile, contexto, usuario, palavra) => {
    try {
        // Create a new FormData instance
        const formData = new FormData();
        formData.append('file', videoFile);
        formData.append('usuarioid', usuario.id);
        formData.append('contexto', contexto.descricao);
        formData.append('contextoid', contexto.id);
        formData.append('palavra', palavra);

        console.log(formData);

        const response = await axios.post('http://localhost:5002/librasapi/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                // Add accept header for video types
                'Accept': 'video/*'
            },

            //     contexto: contexto.descricao,
            //     usuarioid: usuario.id,
            //     contextoid: contexto.id,
            //     originalname: videoFile.name
            // },
            // Add progress monitoring (optional)
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`Upload Progress: ${percentCompleted}%`);
            }
        });

        return response.status;
    } catch (e) {
        console.error('Erro ao enviar arquivo de vídeo:', e);
        throw e;
    }
}