import "../assets/css/gerenciar.css";
import { useEffect, useState } from "react";
import Video from "../components/Video";
import { getAllVideos, editVideo } from "../api/gerenciar";
import { Loading } from "../utils/Utilidades";
import { getContextos } from "../api/Enviar";
import { useUsuario } from "../context/usuarioContext";

// Página de gerenciamento de vídeos
const Gerenciar = () => {
  const [videos, setVideos] = useState([]);
  const [contextos, setContextos] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useUsuario();
  const [editting, setEditting] = useState({ palavra: [], contexto: [], status: [] });
  const [originalValues, setOriginalValues] = useState({ palavra: {}, contexto: {}, status: {} });

  useEffect(() => {
    setLoading(true);
    Promise.all([getAllVideos(token), getContextos(token)])
      .then(([videoData, ctxs]) => {
        setVideos(videoData.videos);
        setStatusList(videoData.status);
        setContextos(ctxs);
        setEditting({
          id: videoData.videos.map((v) => v.PalavraId),
          palavra: videoData.videos.map(() => false),
          contexto: videoData.videos.map(() => false),
          status: videoData.videos.map(() => false),
        });
      })
      .catch((e) => {
        console.error("Erro ao carregar dados:", e);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = async (id, field, value) => {
    setVideos((prev) =>
      prev.map((video) =>
        video.PalavraId === id ? { ...video, [field]: value } : video
      )
    );
    const updated = { ...videos.find((v) => v.PalavraId === id), [field]: value };
    setLoading(true);
    try {
      await editVideo(id, updated.DesPalavra, updated.ContextoId, updated.SituacaoId, token);
    } catch (e) {
      console.error("Erro ao editar vídeo:", e);
    }
    setLoading(false);
  };

  // Função auxiliar para entrar no modo de edição e armazenar valor original
  const startEditing = (idx, field, value) => {
    setEditting((prev) => ({
      ...prev,
      [field]: prev[field].map((val, i) => (i === idx ? true : val)),
    }));
    setOriginalValues((prev) => ({
      ...prev,
      [field]: { ...prev[field], [idx]: value },
    }));
  };

  // Função auxiliar para sair do modo de edição
  const stopEditing = (idx, field) => {
    setEditting((prev) => ({
      ...prev,
      [field]: prev[field].map((val, i) => (i === idx ? false : val)),
    }));
  };

  return (
    <div className="gerenciar-container">
      <div className="title">
        <h1>Gerenciar Vídeos</h1>
      </div>
      {loading ? (
        <Loading open={loading} />
      ) : (
        <div className="gerenciar-table-wrapper">
          <table className="gerenciar-table">
            <thead>
              <tr>
                <th>Palavra</th>
                <th>Contexto</th>
                <th>Video</th>
                <th>Data de Envio</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video, idx) => (
                <tr key={video.PalavraId}>
                  {/* Coluna Palavra */}
                  <td
                    data-label="Palavra"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && editting.palavra[idx]) {
                        const input = e.target.value.trim();
                        const prevValue = originalValues.palavra[idx]?.trim() || videos[idx].DesPalavra?.trim();
                        if (input !== prevValue) {
                          handleEdit(video.PalavraId, "DesPalavra", input);
                        }
                        stopEditing(idx, "palavra");
                      }
                      if (e.key === "Escape" && editting.palavra[idx]) {
                        stopEditing(idx, "palavra");
                        // Reverter para o valor original
                        setVideos((prev) =>
                          prev.map((v) =>
                            v.PalavraId === video.PalavraId
                              ? { ...v, DesPalavra: originalValues.palavra[idx] || v.DesPalavra }
                              : v
                          )
                        );
                      }
                    }}
                  >
                    {editting.palavra[idx] ? (
                      <input
                        type="text"
                        value={video.DesPalavra}
                        onChange={(e) => {
                          const value = e.target.value;
                          setVideos((prev) =>
                            prev.map((v) =>
                              v.PalavraId === video.PalavraId ? { ...v, DesPalavra: value } : v
                            )
                          );
                        }}
                        onBlur={(e) => {
                          const input = e.target.value.trim();
                          const prevValue = originalValues.palavra[idx]?.trim() || videos[idx].DesPalavra?.trim();
                          if (input !== prevValue) {
                            handleEdit(video.PalavraId, "DesPalavra", input);
                          }
                          stopEditing(idx, "palavra");
                        }}
                        className="editable-input"
                        autoFocus
                      />
                    ) : (
                      <div className="edit-row">
                        <span>{video.DesPalavra}</span>
                        <i
                          className="pi pi-pen-to-square icon-btn"
                          onClick={() => startEditing(idx, "palavra", video.DesPalavra)}
                        />
                      </div>
                    )}
                  </td>
                  {/* Coluna Contexto */}
                  <td
                    data-label="Contexto"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && editting.contexto[idx]) {
                        const input = e.target.value;
                        const prevValue = originalValues.contexto[idx] || video.ContextoId;
                        if (input !== prevValue) {
                          handleEdit(video.PalavraId, "ContextoId", input);
                        }
                        stopEditing(idx, "contexto");
                      }
                      if (e.key === "Escape" && editting.contexto[idx]) {
                        stopEditing(idx, "contexto");
                        setVideos((prev) =>
                          prev.map((v) =>
                            v.PalavraId === video.PalavraId
                              ? { ...v, ContextoId: originalValues.contexto[idx] || v.ContextoId }
                              : v
                          )
                        );
                      }
                    }}
                  >
                    {editting.contexto[idx] ? (
                      <select
                        value={video.ContextoId}
                        className="editable-select"
                        onChange={(e) => {
                          const value = e.target.value;
                          setVideos((prev) =>
                            prev.map((v) =>
                              v.PalavraId === video.PalavraId ? { ...v, ContextoId: value } : v
                            )
                          );
                        }}
                        onBlur={(e) => {
                          const input = e.target.value;
                          const prevValue = originalValues.contexto[idx] || video.ContextoId;
                          if (input !== prevValue) {
                            handleEdit(video.PalavraId, "ContextoId", input);
                          }
                          stopEditing(idx, "contexto");
                        }}
                        autoFocus
                      >
                        {contextos.map((contexto) => (
                          <option key={contexto.id} value={contexto.id}>
                            {contexto.descricao}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="edit-row">
                        <span>
                          {contextos.find((c) => c.id === video.ContextoId)?.descricao || ""}
                        </span>
                        <i
                          className="pi pi-pen-to-square icon-btn"
                          onClick={() => startEditing(idx, "contexto", video.ContextoId)}
                        />
                      </div>
                    )}
                  </td>
                  {/* Coluna Video */}
                  <td data-label="Video">
                    <div className="video-block-gerenciar">
                      <Video
                        src={
                          video.NomeArquivo &&
                          (video.NomeArquivo.includes("youtube.com") || video.NomeArquivo.includes("youtu.be"))
                            ? video.NomeArquivo
                            : video.videoUrl
                        }
                        index={video.PalavraId}
                        classNameVideo={"video-player"}
                      />
                    </div>
                  </td>
                  {/* Coluna Data de Envio */}
                  <td data-label="Data de Envio">{video.DataHora}</td>
                  {/* Coluna Status */}
                  <td
                    data-label="Status"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && editting.status[idx]) {
                        const input = e.target.value;
                        const prevValue = originalValues.status[idx] || video.SituacaoId;
                        if (input !== prevValue) {
                          handleEdit(video.PalavraId, "SituacaoId", input);
                        }
                        stopEditing(idx, "status");
                      }
                      if (e.key === "Escape" && editting.status[idx]) {
                        stopEditing(idx, "status");
                        setVideos((prev) =>
                          prev.map((v) =>
                            v.PalavraId === video.PalavraId
                              ? { ...v, SituacaoId: originalValues.status[idx] || v.SituacaoId }
                              : v
                          )
                        );
                      }
                    }}
                  >
                    {editting.status[idx] ? (
                      <select
                        value={video.SituacaoId}
                        className="editable-select"
                        onChange={(e) => {
                          const value = e.target.value;
                          setVideos((prev) =>
                            prev.map((v) =>
                              v.PalavraId === video.PalavraId ? { ...v, SituacaoId: value } : v
                            )
                          );
                        }}
                        onBlur={(e) => {
                          const input = e.target.value;
                          const prevValue = originalValues.status[idx] || video.SituacaoId;
                          if (input !== prevValue) {
                            handleEdit(video.PalavraId, "SituacaoId", input);
                          }
                          stopEditing(idx, "status");
                        }}
                        autoFocus
                      >
                        {statusList.map((status) => (
                          <option key={status.Id} value={status.Id}>
                            {status.Descricao}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="edit-row">
                        <span>
                          {statusList.find((s) => s.Id === video.SituacaoId)?.Descricao || ""}
                        </span>
                        <i
                          className="pi pi-pen-to-square icon-btn"
                          onClick={() => startEditing(idx, "status", video.SituacaoId)}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Gerenciar;