import { useState } from "react";
import "../assets/css/pesquisar.css";
import Video from "../components/Video";

const resultadosMock = [
  {
    palavra: "Casa",
    contexto: "Lugar onde você mora",
    videos: [
      "https://www.w3schools.com/html/mov_bbb.mp4",
      "https://samplelib.com/mp4/sample-5s.mp4",
      "https://filesamples.com/samples/video/mp4/sample_640x360.mp4",
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      "https://www.appsloveworld.com/wp-content/uploads/2018/10/640.mp4",
    ],
  },
  {
    palavra: "Árvore",
    contexto: "Planta grande com tronco",
    videos: [
    ]
  },
  {
    palavra: "Carro",
    contexto: "Veículo de transporte",
    videos: [
      "https://www.appsloveworld.com/wp-content/uploads/2018/10/SampleVideo_1280x720_1mb.mp4",
      "https://samplelib.com/mp4/sample-10s.mp4",
      "https://filesamples.com/samples/video/mp4/sample_1280x720_surfing_with_audio.mp4",
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    ],
  },
  {
    palavra: "Casa",
    contexto: "Lugar onde você mora",
    videos: [
      "https://www.w3schools.com/html/mov_bbb.mp4",
      "https://samplelib.com/mp4/sample-5s.mp4",
      "https://filesamples.com/samples/video/mp4/sample_640x360.mp4",
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      "https://www.appsloveworld.com/wp-content/uploads/2018/10/640.mp4",
    ],
  },
  {
    palavra: "Árvore",
    contexto: "Planta grande com tronco",
    videos: [
    ]
  },
  {
    palavra: "Carro",
    contexto: "Veículo de transporte",
    videos: [
      "https://www.appsloveworld.com/wp-content/uploads/2018/10/SampleVideo_1280x720_1mb.mp4",
      "https://samplelib.com/mp4/sample-10s.mp4",
      "https://filesamples.com/samples/video/mp4/sample_1280x720_surfing_with_audio.mp4",
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    ],
  },
  {
    palavra: "Casa",
    contexto: "Lugar onde você mora",
    videos: [
      "https://www.w3schools.com/html/mov_bbb.mp4",    ],
  },
  {
    palavra: "Árvore",
    contexto: "Planta grande com tronco",
    videos: [
    ]
  },
  {
    palavra: "Carro",
    contexto: "Veículo de transporte",
    videos: [
      "https://www.appsloveworld.com/wp-content/uploads/2018/10/SampleVideo_1280x720_1mb.mp4",
      "https://samplelib.com/mp4/sample-10s.mp4",
      "https://filesamples.com/samples/video/mp4/sample_1280x720_surfing_with_audio.mp4",
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    ],
  },
  {
    palavra: "Casa",
    contexto: "Lugar onde você mora",
    videos: [
      "https://www.w3schools.com/html/mov_bbb.mp4",
      "https://www.appsloveworld.com/wp-content/uploads/2018/10/640.mp4",
    ],
  },
  {
    palavra: "Árvore",
    contexto: "Planta grande com tronco",
    videos: [
    ]
  },
  {
    palavra: "Carro",
    contexto: "Veículo de transporte",
    videos: [
      "https://www.appsloveworld.com/wp-content/uploads/2018/10/SampleVideo_1280x720_1mb.mp4",
      "https://samplelib.com/mp4/sample-10s.mp4",
      "https://filesamples.com/samples/video/mp4/sample_1280x720_surfing_with_audio.mp4",
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    ],
  },
];

function Pesquisar() {
  const [modalAberto, setModalAberto] = useState(false);
  const [modalVideos, setModalVideos] = useState([]);
  const [busca, setBusca] = useState("");
  const [open, setOpen] = useState(false);

  const abrirModalVideos = (videos) => {
    setModalVideos(videos);
    setModalAberto(true);
  };

  const fecharModalVideos = () => {
    setModalAberto(false);
    setModalVideos([]);
  };

  const limparBusca = () => setBusca("");

  const resultadosFiltrados = resultadosMock.filter((item) =>
    item.palavra.toLowerCase().includes(busca.toLowerCase().trim())
  );

  console.log("Resultados filtrados:", resultadosFiltrados);  

  return (
    <div className="pesquisar-container">
      <div
        className={
          busca && resultadosFiltrados.length !== 0
            ? "input-wrapper input-wrapper-active"
            : "input-wrapper"
        }
      >
        <span className="search-icon">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" stroke="#9aa0a6" strokeWidth="2" />
            <line
              x1="16.5"
              y1="16.5"
              x2="21"
              y2="21"
              stroke="#9aa0a6"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Pesquise uma Palavra"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          maxLength={50}
        />
        {busca && (
          <span className="clear-btn" onClick={limparBusca}>
            ×
          </span>
        )}
        {busca && resultadosFiltrados.length > 0 && (
          <div className="search-dropdown">
            {resultadosFiltrados.map((item, idx) => (
              <div className="dropdown-item" key={idx}>
                <span>{item.palavra}</span>
                <span
                  style={{
                    marginLeft: "auto",
                    color: "#888",
                    fontSize: "0.95em",
                  }}
                >
                  {item.contexto}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* done for now  */}
      <div className="grid-resultados">
        {busca && resultadosFiltrados.length === 0 ? (
          <div className="nenhum-resultado">
            <p>Nenhum resultado encontrado para "{busca}".</p>
            <button
              className="solicitar-video-btn"
              onClick={() => alert("Solicitação de vídeo enviada!")}
            >
              Solicitar vídeo para esta palavra
            </button>
          </div>
        ) : (
          resultadosFiltrados.map((item, index) => (
            <div className="card" key={index}>
              <div className="card-header">
                <div>
                  <h3>{item.palavra}</h3>
                  <p>{item.contexto}</p>
                </div>
              </div>
              <div className="video-grid">
                {(() => {
                  switch (item.videos.length) {
                    case 0:
                      return (
                        <div className="nenhum-resultado">
                          <li className="pi pi-clock"></li>
                          <span>A palavra está em processo de gravação</span>
                        </div>
                      );
                    case 1:
                      return (
                        <Video src={item.videos[0]} classNameVideo={"video-thumb single"} index={0} />
                      );
                    case 2:
                      return (
                        <>
                          <Video src={item.videos[0]} classNameVideo={"video-thumb double double-top"} index={0} />
                          <Video src={item.videos[1]} classNameVideo={"video-thumb double double-bottom"} index={1} />
                        </>
                      );
                    default:
                      return (
                        <>
                          {item.videos.slice(0, 3).map((src, idx) => (
                            <Video src={src} classNameVideo={"video-thumb"} index={idx} />
                          ))}
                          {item.videos.length > 3 !== index && (
                            <div
                              className="video-thumb mais"
                              onClick={() => abrirModalVideos(item.videos)}
                            >
                              + {item.videos.length - 3}
                            </div>
                          )}
                        </>
                      );
                  }
                })()}
              </div>
            </div>
          ))
        )}
      </div>
      {/* done for now */}
      {modalAberto && (
        <div className="modal-videos-overlay" onClick={fecharModalVideos}>
          <div
            className="modal-videos-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-videos-grid">
              {modalVideos.map((src, idx) => (
                <Video src={src} classNameVideo={"video-thumb"} index={idx} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pesquisar;
