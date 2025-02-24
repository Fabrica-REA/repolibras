import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import thumbsDownIcon from '../images/thumbsDownIcon.png';
import thumbsUpIcon from '../images/thumbsUpIcon.png';
import cyiapi from '../cyiapi';
import {basecyi} from '../cyiapi';

const Avaliar = () => {
  const [videos, setVideos] = useState([]);
  const [observations, setObservations] = useState({});
  const [hiddenVideos, setHiddenVideos] = useState({});
  const [thumbsDowned, setThumbsDowned] = useState({});
  const [noRecords, setNoRecords] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try{
        const response = await cyiapi.get('/faltaavaliar');
        setVideos(response.data);
        if (response.data.length === 0) {
          setNoRecords(true);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setNoRecords(true); 
      }      
    };
    fetchVideos();
  }, []);

  const handleThumbsUp = async (video) => {
    try {
      const response = await cyiapi.get('/aprovacao', {params:{ 
        palavra: video.PalavraId,
        sequencia: video.Sequencia,
        pasta: video.Pasta,
        arquivo: video.NomeArquivo,
        usuario: 2,
      }});
      console.log('Aprovado!', response);
      setHiddenVideos(prevHiddenVideos => ({ ...prevHiddenVideos, [video.PalavraId]: true }));
    } catch (error) {
      setObservations( error);
      console.error(error);
    }
  };

  const handleThumbsDown = (video) => {
    setThumbsDowned(prevThumbsDowned => ({ ...prevThumbsDowned, [video.PalavraId]: true }));
  }
  const saveObservations = (video, observations) => {
    // Implementar a lógica para salvar as observações
  };

  return (
    <div className="container">
      <div className="video-container">
      {noRecords && <p>Nenhum vídeo para aprovação.</p>}
        {videos.map((video) => (
          !hiddenVideos[video.PalavraId] && (
          <div className="video-column" key={video.id}> 
          <h3 className="video-title">{video.DesContexto} -  {video.DesPalavra}</h3>
          <input className="NomeArqruivo" value={` ${basecyi}/download/${video.Pasta}/${video.NomeArquivo}`} />
          {video.PalavraId} {video.Sequencia} <ReactPlayer className="video-player" width="400px" height="300" url={` ${basecyi}/download/${video.Pasta}/${video.NomeArquivo}`} controls={true} />
            <img className="icon" src={thumbsUpIcon} alt="Aprovado" onClick={() => handleThumbsUp(video)} />&nbsp; &nbsp; &nbsp; 
            <img className="icon" src={thumbsDownIcon} alt="Precisa melhorar" onClick={() => handleThumbsDown(video)} />
            {thumbsDowned[video.PalavraId] && (
              <div><textarea className="observations" value="Em construção!" onChange={e => setObservations({...observations, [video.nome]: e.target.value})} />
              <button className="save-button" onClick={() => saveObservations(video, observations[video.nome])}>Salvar Motivo - em construção</button>
              </div>
            )}
          </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Avaliar;
