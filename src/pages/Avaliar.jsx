import { useEffect, useState } from "react";
import { getAvaliacoes } from "../api/avaliacao";
import "../assets/css/avaliar.css";
import Video from "../components/Video";
import { ActionButton } from "../utils/Utilidades";

const Avaliar = () => {
  const [avaliacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    // setTimeout(() => {
    getAvaliacoes()
      .then((res) => {
        setSolicitacoes(res);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Erro ao carregar as avaliações:", e);
        setLoading(false);
      });
    // }, 2000);
  }, []);
  
  // const videos = Array(9).fill({
  //   context: "Método de teletransporte",
  //   word: "Avião",
  //   videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  // });

  return (
    <div className="avaliar-page">
      <div className="title">
        <h1>Avaliação</h1>
      </div>
      <div className="grid-container">
        {/* {videos.map((avaliacao, idx) => (
          <div key={idx} className="video-container">
            <Video src={video.videoUrl} index={idx} classNameVideo={"video-player"} />
            <div className="video-row">
              <h2>{video.context}</h2>
              <div className="button-group">
                <ActionButton type={"accept"} icon={"pi-check"} class={"icon-btn accept-button"}/>
                <ActionButton type={"decline"} icon={"pi-times"} class={"icon-btn decline-button"}/>
              </div>
            </div>
            <h3>{video.word}</h3>
          </div>
        ))} */}
        {avaliacoes.map((avaliacao, id) => (
          <div key={id} className="video-container">
            <Video src={avaliacao.videoUrl} index={id} classNameVideo={"video-player"} />
            <div className="video-row">
              <h2>{avaliacao.DesContexto}</h2>
              <div className="button-group">
                <ActionButton type={"accept"} icon={"pi-check"} class={"icon-btn accept-button"}/>
                <ActionButton type={"decline"} icon={"pi-times"} class={"icon-btn decline-button"}/>
              </div>
            </div>
            <h3>{avaliacao.DesPalavra}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Avaliar;
