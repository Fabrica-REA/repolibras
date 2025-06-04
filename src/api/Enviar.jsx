import axios from "axios";

export const getContextos = async () => {
    try {
        const response = await axios.get('http://localhost:5002/librasapi/contextosdes', {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data
    } catch (e) {
        console.error('Erro ao buscar palavras:', e);
    }
}

export const postArquivo = async (videoFile) => {
    try {
        // Create a new FormData instance
        const formData = new FormData();

        // Append the video file to the FormData
        // 'video' is the field name that the server expects
        formData.append('video', videoFile);

        const response = await axios.post('http://localhost:5002/librasapi/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                // Add accept header for video types
                'Accept': 'video/*'
            },
            // Add progress monitoring (optional)
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`Upload Progress: ${percentCompleted}%`);
            }
        });

        return response.data;
    } catch (e) {
        console.error('Erro ao enviar arquivo de vídeo:', e);
        throw e;
    }
}