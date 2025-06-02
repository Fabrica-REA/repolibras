import "../assets/css/avaliar.css";
import Video from "../components/Video";
import { ActionButton } from "../utils/Utilidades";

const Avaliar = () => {
  const videos = Array(9).fill({
    context: "Método de teletransporte",
    word: "Avião",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  });

  return (
    <div className="avaliar-page">
      <div className="title">
        <h1>Avaliação</h1>
      </div>
      <div className="grid-container">
        {videos.map((video, index) => (
          <div key={index} className="video-container">
            <Video src={video.videoUrl} index={index} classNameVideo={"video-player"} />
            <div className="video-row">
              <h2>{video.context}</h2>
              <div className="button-group">
                <ActionButton icon={"pi-check"} type={"icon-btn accept-button"} title="Enviar"/>
                <ActionButton icon={"pi-times"} title="Recusar"/>
              </div>
            </div>
            <h3>{video.word}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Avaliar;
