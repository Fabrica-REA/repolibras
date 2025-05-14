import React, { useState } from "react";
import "../assets/css/pesquisar.css";

const resultadosMock = [
  {
    palavra: "Casa",
    contexto: "Lugar onde você mora",
    videos: [
      "/videos/casa1.mp4",
      "/videos/casa2.mp4",
      "/videos/casa3.mp4",
      "/videos/casa4.mp4",
      "/videos/casa5.mp4"
    ]
  },
  {
    palavra: "Árvore",
    contexto: "Planta grande com tronco",
    videos: [
      "/videos/arvore1.mp4",
      "/videos/arvore2.mp4",
      "/videos/arvore3.mp4"
    ]
  },
  {
    palavra: "Carro",
    contexto: "Veículo de transporte",
    videos: [
        "videos/carro1.mp4",
        "videos/carro2.mp4",
        "videos/carro3.mp4",
        "videos/carro4.mp4"
    ]
  }
];

function Pesquisar() {
  const [busca, setBusca] = useState("");
  const [expandido, setExpandido] = useState(null);

  const limparBusca = () => setBusca("");
  const toggleExpandido = (index) => {
    setExpandido(expandido === index ? null : index);
  };

  const resultadosFiltrados = resultadosMock.filter((item) =>
    item.palavra.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="pesquisar-container">
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="Pesquise uma Palavra"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        {busca && (
          <span className="clear-btn" onClick={limparBusca}>
            ×
          </span>
        )}
      </div>

      <div className="grade-resultados">
        {resultadosFiltrados.map((item, index) => (
          <div className="card" key={index}>
            <div className="card-header">
              <div>
                <h3>{item.palavra}</h3>
                <p>{item.contexto}</p>
              </div>
              <button className="menu-btn" onClick={() => toggleExpandido(index)}>
                ...
              </button>
            </div>

            <div className="video-grid">
              {item.videos.slice(0, 3).map((src, idx) => (
                <video
                  key={idx}
                  src={src}
                  className="video-thumb"
                  muted
                  playsInline
                  preload="metadata"
                />
              ))}

              {item.videos.length > 3 && expandido !== index && (
                <div className="video-thumb mais" onClick={() => toggleExpandido(index)}>
                  +{item.videos.length - 3}
                </div>
              )}

              {expandido === index &&
                item.videos.slice(3).map((src, idx) => (
                  <video
                    key={`extra-${idx}`}
                    src={src}
                    className="video-thumb"
                    muted
                    playsInline
                    preload="metadata"
                    controls
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pesquisar;