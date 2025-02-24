import '../App.css';
import './Componente.css';
import './Enviar.css';
import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import axios from 'axios';
import ComboBoxContexto from './ComboBoxContexto';
import cyiapi from '../cyiapi';
// npm install react-drag-drop-files
const fileTypes = ["mkv", "mp4", "avi", "mov", "webm", "wmv"];


function Enviar() {
  const [file, setFile] = useState(null);
  const [contexto, setContexto] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [contextoid, setContextoid] = useState('');

  React.useEffect(() => {
    console.log('file: ' + file);
  }, [file]);
  
  const handleFileChange = (file) => {
    if (file) {
      setFile(file);
      const nometemp = file.name.split('.')[0];
      const sanitizedFileName = nometemp
        .replace(/[.\:\-=+;\*\$\@\#\?%*\"\<\>\|\\/\(\)]/g, '_') // Remove colons, special characters, and slashes
        .replace(/\s+/g, '_') // Replace spaces with underscores
        .slice(0, 255); // Limit filename length to avoid potential issues on some systems
  
      setNewFileName(sanitizedFileName);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('usuarioid', 1);
    formData.append('contexto', contexto);
    formData.append('contextoid', contextoid);
    formData.append('novoNomeArquivo', newFileName);
    setObservacoes( file.name + ' ' + contexto + ' ' + contextoid + ' ' + newFileName);
    console.log(file);
    console.log(contextoid);
    console.log(newFileName);
    try {
      const response = await cyiapi.post('/upload', formData);
      console.log(response.data[0]);
      if (response.data[0].mensagem)
        setObservacoes( response.data[0].mensagem);
      else
        setObservacoes(`Arquivo ${file.name} foi enviado com sucesso.`);
    } catch (error) {
      console.error(error);
    }
  };

//  <p>{contextoid}</p>
//  <p>{contexto}</p>
return (
    <div className="container">
      <div className="colesquerda">
      <div className="Enviar-container">
        <div className="Enviar-column">
          <h4 className="Enviar-title"></h4>
          <ComboBoxContexto onChange={(event) => {setContextoid(event.target.options[event.target.selectedIndex].value);
            setContexto(event.target.options[event.target.selectedIndex].text)}} /><br />
          <form onSubmit={handleSubmit}>
            <FileUploader handleChange={handleFileChange} name="file" types={fileTypes} />
            <p>{file ? `Vídeo: ${file.name}` : "Ainda sem arquivo selecionado!"}</p>
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="Digite a Palavra"
            />
            <button type="submit">Enviar arquivo</button>
          </form>
          <div>
            <h4>Observações:</h4>
            <p>{observacoes}</p>
          </div>
        </div>
      </div>
      </div>
      <div className="coldireita">
        <h2>Últimos vídeos inseridos</h2>
      </div>
    </div>
  );
}

export default Enviar;

