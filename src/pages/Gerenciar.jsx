import "../assets/css/gerenciar.css";
import { useState } from "react";
import Video from "../components/Video";

const Gerenciar = () => {
  const [rows, setRows] = useState([
    {
      palavra: "Exemplo 1",
      contexto: "Contexto",
      status: "Pendente",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      dataEnvio: "Data de envio",
    },
    {
      palavra: "Exemplo 2",
      contexto: "Contexto",
      status: "Pendente",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      dataEnvio: "Data de envio",
    },
  ]);
  const [editing, setEditing] = useState({ row: null, field: null });

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleEdit = (index, field) => {
    setEditing({ row: index, field });
  };

  const handleBlur = () => {
    setEditing({ row: null, field: null });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <div className="solicitacoes-container" onClick={handleBlur}>
      <div className="title">
        <h1>Gerenciar</h1>
      </div>
      <table
        className="solicitacoes-table"
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
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                {editing.row === index && editing.field === "palavra" ? (
                  <input
                    type="text"
                    value={row.palavra}
                    onChange={(e) =>
                      handleInputChange(index, "palavra", e.target.value)
                    }
                    onKeyDown={handleKeyPress}
                    onBlur={handleBlur}
                    className="editable-input"
                    autoFocus
                  />
                ) : (
                  <div className="edit-row">
                    <span className="editable-text">{row.palavra}</span>
                    <i
                      className="pi pi-pen-to-square icon-btn"
                      onClick={() => handleEdit(index, "palavra")}
                    />
                  </div>
                )}
              </td>
              <td>
                {editing.row === index && editing.field === "contexto" ? (
                  <input
                    type="text"
                    value={row.contexto}
                    onChange={(e) =>
                      handleInputChange(index, "contexto", e.target.value)
                    }
                    onKeyDown={handleKeyPress}
                    onBlur={handleBlur}
                    className="editable-input"
                    autoFocus
                  />
                ) : (
                  <div className="edit-row">
                    <span className="editable-text">{row.contexto}</span>
                    <i
                      className="pi pi-pen-to-square icon-btn"
                      onClick={() => handleEdit(index, "contexto")}
                    />
                  </div>
                )}
              </td>
              <td>
                <Video src={row.videoUrl} classNameVideo={"video-preview"} index={index}>
                  <source src={row.videoUrl} type="video/mp4" />
                  Seu navegador não suporta vídeo.
                </Video>
              </td>
              <td>{row.dataEnvio}</td>
              <td>
                {editing.row === index && editing.field === "status" ? (
                  <select
                    value={row.status}
                    onChange={(e) =>
                      handleInputChange(index, "status", e.target.value)
                    }
                    onKeyDown={handleKeyPress}
                    onBlur={handleBlur}
                    autoFocus
                    className="editable-select"
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Aprovado">Aprovado</option>
                    <option value="Rejeitado">Rejeitado</option>
                  </select>
                ) : (
                  <div className="edit-row">
                    <span className="editable-text">{row.status}</span>
                    <i
                      className="pi pi-pen-to-square icon-btn"
                      onClick={() => handleEdit(index, "status")}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Gerenciar;
