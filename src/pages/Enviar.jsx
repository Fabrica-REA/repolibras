import "../assets/css/enviar.css";
import UploadFile from "../components/UploadFile";
import enviar from "../assets/images/send_icon.svg";
import { useEffect, useState } from "react";
import { getContextos } from "../api/Enviar";

const Enviar = () => {
  const [activeTab, setActiveTab] = useState("Arquivo");
  const [contexto, setContexto] = useState([]);
  // const [loading, setLoading] = useState(true);

  console.log(contexto);
  useEffect(() => {
    getContextos()
    .then(res => setContexto(res))
      .catch(e => {
        console.error('Erro ao carregar contextos:', e);
        // setLoading(false);
      });
  }, [])

  return (
    <div className={`enviar-container${activeTab === "Link" ? " enviar-container-link" : ""}`}>
      {activeTab === "Arquivo" && (
        <div className="enviar-col">
          <div className="file-upload-section">
            <UploadFile classNameFile={"upload-container disabled"} />
          </div>
        </div>
      )}
      <div className={`enviar-col enviar-col-right${activeTab === "Link" ? " enviar-col-right-link" : ""}`}>
        <div className="forms-tabs">
          <div className={`tab${activeTab === "Arquivo" ? " active" : ""}`} onClick={() => setActiveTab("Arquivo")} style={{ cursor: "pointer" }}>Arquivo</div>
          <div className={`tab${activeTab === "Link" ? " active" : ""}`} onClick={() => setActiveTab("Link")} style={{ cursor: "pointer" }}>Link</div>
        </div>
        <div className="enviar-forms">
          <form className="enviar-form" noValidate>
            <div className="form-group">
              <label htmlFor="contexto">Contexto</label>
              <select id="contexto" required>
                <option value="">Selecione um contexto</option>
                {contexto.map((contexto, id) => (
                  <option key={id} value={contexto.descricao}>{contexto.descricao}</option>
                ))}
              </select>
            </div>
            {activeTab === "Link" && (
              <div className="form-group">
                <label htmlFor="link">Link</label>
                <input
                  type="url"
                  id="link"
                  placeholder="Digite o link do video"
                  required
                  pattern="https?://.+"
                  title="Digite uma URL válida começando com http:// ou https://"
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="palavra">Palavra</label>
              <input
                type="text"
                id="palavra"
                placeholder="Digite a palavra"
                minLength={2}
                maxLength={100}
                required
                pattern=".{2,100}"
                title="A palavra deve ter entre 2 e 100 caracteres"
              />
            </div>
            <div className="form-group">
              <label htmlFor="observacoes">Observações</label>
              <textarea
                id="observacoes"
                placeholder="Observações"
                maxLength={500}
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              <img src={enviar} alt="Enviar" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Enviar;