import { useEffect, useState, useRef } from "react";
import "../assets/css/pesquisar.css";
import "../assets/css/utilidades.css";
import Video from "../components/Video";
import { getPalavras,  postBuscaPalavra } from "../api/Pesquisar";
import { base, ConfirmPopUp, Loading } from "../utils/Utilidades";
import { useUsuario } from "../context/usuarioContext";
import { postSolicitacao } from "../api/Solicitacoes";
import { useLocation, useNavigate } from "react-router-dom";

// Página de pesquisa de palavras e vídeos
function Pesquisar() {
  const [modalAberto, setModalAberto] = useState(false);
  const [modalVideos, setModalVideos] = useState([]);
  const [busca, setBusca] = useState("");
  const [resultadosFiltrados, setresultadosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const { usuario, token } = useUsuario();
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const inputRef = useRef(null);
  const location = useLocation();
  const { state } = location;
  const typingTimeoutRef = useRef(null); 
  const navigate = useNavigate();
  
  // Abre modal de vídeos
  const abrirModalVideos = (videos) => {
    setModalVideos(videos);
    setModalAberto(true);
  };

  // Fecha modal de vídeos
  const fecharModalVideos = () => {
    setModalAberto(false);
    setModalVideos([]);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getPalavras(busca, state?.linguagem)
        .then((res) => {
          setresultadosFiltrados(res);
          setLoading(false);
          setDropdownVisible(busca && res.length > 0);
        })
        .catch((e) => {
          console.error("Erro na busca dos videos:", e);
          setLoading(false);
        });
    }, 0);
  }, [busca, state?.linguagem]);

  // Lida com mudança no campo de busca
  const handleBuscaChange = (value) => {
    setBusca(value);
    setDropdownVisible(true);

    // Limpa o timeout anterior se o usuário ainda estiver digitando
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Define um novo timeout para enviar `postBuscaPalavra` após 1.5 segundo de inatividade
    typingTimeoutRef.current = setTimeout(() => {
      if (value.trim() && value.length > 1) {
        postBuscaPalavra(value, usuario?.id, state?.linguagem);
      }
    }, 1500);
  };

  // Lida com solicitação de palavra
  const handlePalavraSolicitacao = async (palavra, contexto, usuario) => {
    try {
      const res = await postSolicitacao(palavra, contexto, usuario , state?.linguagem, token);
      if (res && res.message) {
        setMessageText(res.message);
      } else if (typeof res === "string") {
        setMessageText(res);
      } else {
        setMessageText("Solicitação enviada com sucesso!");
      }
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setBusca("");
      }, 800);
    } catch (e) {
      setMessageText("Erro ao enviar solicitação.");
      console.log(e);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 800);
    }
  };

  // Lida com pressionamento de tecla no input
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      setDropdownVisible(false);
    }
  };

  // Lida com clique em item do dropdown
  const handleDropdownItemClick = (palavra) => {
    setBusca(palavra.DesPalavra);
    setDropdownVisible(false);
    setTimeout(() => {
      inputRef.current && inputRef.current.blur();
    }, 0);
  };

  return (
    <div className="pesquisar-container">
      <div
        className={
          busca && resultadosFiltrados.length !== 0 && dropdownVisible
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
          onChange={(e) => handleBuscaChange(e.target.value)}
          maxLength={50}
          onKeyDown={handleInputKeyDown}
          ref={inputRef}
        />
        {busca && (
          <span className="clear-btn" onClick={() => { setBusca(""); setDropdownVisible(false); }}>
            ×
          </span>
        )}
        {busca && resultadosFiltrados.length > 0 && dropdownVisible && (
          <div className="search-dropdown">
            {resultadosFiltrados.map((palavra, id) => (
              <div
                className="dropdown-item"
                key={id}
                onClick={() => handleDropdownItemClick(palavra)}
                style={{ cursor: "pointer" }}
              >
                <span>{palavra.DesPalavra}</span>
                <span
                  style={{
                    marginLeft: "auto",
                    color: "#888",
                    fontSize: "0.95em",
                  }}
                >
                  {palavra.DesContexto}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="grid-resultados">
        {busca && resultadosFiltrados.length === 0 ? (
          <div className="nenhum-resultado">
            <p>Nenhum resultado encontrado para "{busca}".</p>
            {usuario ? (
              <button
                className="solicitar-video-btn"
                onClick={() => handlePalavraSolicitacao(busca, 1, usuario.id)}
              >
                Solicitar vídeo para esta palavra
              </button>
            ) : (
              <button
                className="solicitar-video-btn"
                onClick={() => navigate(`${base}login`)}
              >
                Solicitar vídeo para esta palavra
              </button>
            )}
          </div>
        ) : loading ? (
          <Loading open={loading} />
        ) : (
          resultadosFiltrados.map((item, id) => {
            return (
              <div className="card" key={id}>
                <div className="card-header">
                  <div>
                    <h3>{item.DesPalavra}</h3>
                    <p>{item.DesContexto}</p>
                  </div>
                </div>
                <div className="video-grid">
                  {item.SituacaoId === 5 ? (
                    <div className="nenhum-resultado">
                      <li className="pi pi-clock"></li>
                      <span>A palavra está in processo de gravação</span>
                    </div>
                  ) : item.SituacaoId === 0 ? (
                    <div className="nenhum-resultado">
                      <li className="pi pi-check-circle"></li>
                      <span>A palavra foi solicitada</span>
                    </div>
                  ) : item.videos.length === 1 ? (
                    <Video
                      src={
                        item.videos[0].videoUrl
                          ? item.videos[0].videoUrl
                          : (item.videos[0].nome && (item.videos[0].nome.includes("youtube.com") || item.videos[0].nome.includes("youtu.be")))
                            ? item.videos[0].nome
                            : ""
                      }
                      classNameVideo={"video-thumb single"}
                      index={0}
                    />
                  ) : item.videos && item.videos.length === 2 ? (
                    <>
                      <Video
                        src={
                          item.videos[0].videoUrl
                            ? item.videos[0].videoUrl
                            : (item.videos[0].nome && (item.videos[0].nome.includes("youtube.com") || item.videos[0].nome.includes("youtu.be")))
                              ? item.videos[0].nome
                              : ""
                        }
                        classNameVideo={"video-thumb double double-top"}
                        index={0}
                      />
                      <Video
                        src={
                          item.videos[1].videoUrl
                            ? item.videos[1].videoUrl
                            : (item.videos[1].nome && (item.videos[1].nome.includes("youtube.com") || item.videos[1].nome.includes("youtu.be")))
                              ? item.videos[1].nome
                              : ""
                        }
                        classNameVideo={"video-thumb double double-bottom"}
                        index={1}
                      />
                    </>
                  ) : item.videos && item.videos.length > 2 ? (
                    <>
                      {item.videos.slice(0, 3).map((video, idx) => (
                        <Video
                          key={idx}
                          src={
                            video.videoUrl
                              ? video.videoUrl
                              : (video.nome && (video.nome.includes("youtube.com") || video.nome.includes("youtu.be")))
                                ? video.nome
                                : ""
                          }
                          classNameVideo={"video-thumb"}
                          index={idx}
                        />
                      ))}
                      {item.videos.length > 3 && (
                        <div
                          className="video-thumb mais"
                          onClick={() => abrirModalVideos(item.videos.map(v => v.videoUrl ? v.videoUrl : (v.nome && (v.nome.includes("youtube.com") || v.nome.includes("youtu.be")) ? v.nome : "")))}
                        >
                          + {item.videos.length - 3}
                        </div>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
            );
          })
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
              {modalVideos.map((src, id) => (
                <Video
                  key={id}
                  src={src}
                  classNameVideo={"video-thumb"}
                  index={id}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {showMessage && (
        <ConfirmPopUp
          open={showMessage}
          title={""}
          message={messageText}
          showOnlyMessage={true}
          onConfirm={() => setShowMessage(false)}
          onCancel={() => setShowMessage(false)}
        />
      )}
    </div>
  );
}

export default Pesquisar;