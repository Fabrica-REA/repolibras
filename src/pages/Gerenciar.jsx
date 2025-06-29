import "../assets/css/gerenciar.css";
import { useEffect, useState } from "react";
import Video from "../components/Video";
import { getAllVideos, editVideo } from "../api/gerenciar";
import { Loading } from "../utils/Utilidades";
import { getContextos } from "../api/Enviar";

const Gerenciar = () => {
  const [rows, setRows] = useState([]);
  const [contextos, setContextos] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [editing, setEditing] = useState({ row: null, field: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getAllVideos(), getContextos()])
      .then(([videoData, ctxs]) => {
        setRows(videoData.videos);
        setStatusList(videoData.status);
        setContextos(ctxs);
      })
      .catch((e) => {
        console.error("Erro ao carregar dados:", e);
      })
      .finally(() => setLoading(false));
  }, []);

  // Create a map for status Id -> Descricao for O(1) lookup
  const statusMap = statusList.reduce((acc, status) => {
    acc[status.Id] = status.Descricao;
    return acc;
  }, {});

  const handleInputChange = (id, field, value) => {
    const updatedRows = [...rows];
    const rowIndex = updatedRows.findIndex(r => r.PalavraId === id);
    if (rowIndex === -1) return;

    if (field === "palavra") updatedRows[rowIndex].DesPalavra = value;
    else if (field === "contexto") {
      updatedRows[rowIndex].ContextoId = value;
      const contextoObj = contextos.find(ctx => String(ctx.id) === String(value));
      updatedRows[rowIndex].DesContexto = contextoObj ? contextoObj.descricao : "";
    }
    else if (field === "status") {
      updatedRows[rowIndex].SituacaoId = value;
      // Use the statusMap for fast lookup
      updatedRows[rowIndex].DesSituacao = statusMap[value] || value;
    }
    setRows(updatedRows);
  };

  const handleEdit = (id, field) => {
    setEditing({ row: id, field });
  };

  const handleBlur = async () => {
    if (editing.row !== null && editing.field !== null) {
      const row = rows.find(r => r.PalavraId === editing.row);
      setLoading(true);
      try {
        await editVideo(row.PalavraId, row.DesPalavra, row.ContextoId, row.SituacaoId);
      } catch (e) {
        console.error("Erro ao editar vídeo:", e);
      }
      setLoading(false);
    }
    setEditing({ row: null, field: null });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <div className="gerenciar-container" onClick={handleBlur}>
      <div className="title">
        <h1>Gerenciar Vídeos</h1>
      </div>
      {loading ? (
        <Loading open={loading} />
      ) : (
        <div className="gerenciar-table-wrapper">
          <table
            className="gerenciar-table"
            onClick={(e) => e.stopPropagation()}
          >
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
              {rows.map((row) => (
                <tr key={row.PalavraId}>
                  <td data-label="Palavra">
                    {editing.row === row.PalavraId && editing.field === "palavra" ? (
                      <input
                        type="text"
                        value={row.DesPalavra}
                        onChange={(e) =>
                          handleInputChange(row.PalavraId, "palavra", e.target.value)
                        }
                        onKeyDown={handleKeyPress}
                        onBlur={handleBlur}
                        className="editable-input"
                        autoFocus
                      />
                    ) : (
                      <div className="edit-row">
                        <span className="editable-text">{row.DesPalavra}</span>
                        <i
                          className="pi pi-pen-to-square icon-btn"
                          onClick={() => handleEdit(row.PalavraId, "palavra")}
                        />
                      </div>
                    )}
                  </td>
                  <td data-label="Contexto">
                    {editing.row === row.PalavraId && editing.field === "contexto" ? (
                      <select
                        value={row.ContextoId}
                        onChange={(e) =>
                          handleInputChange(row.PalavraId, "contexto", e.target.value)
                        }
                        onKeyDown={handleKeyPress}
                        onBlur={handleBlur}
                        className="editable-select"
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
                        <span className="editable-text">{row.DesContexto}</span>
                        <i
                          className="pi pi-pen-to-square icon-btn"
                          onClick={() => handleEdit(row.PalavraId, "contexto")}
                        />
                      </div>
                    )}
                  </td>
                  <td data-label="Video">
                    <Video src={row.videoUrl} index={row.PalavraId} classNameVideo={"video-player"} />
                  </td>
                  <td data-label="Data de Envio">{row.DataHora}</td>
                  <td data-label="Status">
                    {editing.row === row.PalavraId && editing.field === "status" ? (
                      <select
                        value={row.SituacaoId}
                        onChange={(e) =>
                          handleInputChange(row.PalavraId, "status", e.target.value)
                        }
                        onKeyDown={handleKeyPress}
                        onBlur={handleBlur}
                        autoFocus
                        className="editable-select"
                      >
                        {statusList.map((status) => (
                          <option key={status.Id} value={status.Id}>
                            {status.Descricao}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="edit-row">
                        <span className="editable-text">
                          {statusMap[row.SituacaoId] || row.DesSituacao}
                        </span>
                        <i
                          className="pi pi-pen-to-square icon-btn"
                          onClick={() => handleEdit(row.PalavraId, "status")}
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