import "../assets/css/enviar.css";
import UploadFile from "../components/UploadFile";
import enviar from "../assets/images/send_icon.svg";
import { useState } from "react";

const Enviar = () => {
  const [activeTab, setActiveTab] = useState("Arquivo");

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
          <form className="enviar-form">
            <div className="form-group">
              <label htmlFor="contexto">Contexto</label>
              <select id="contexto">
                <option value="">Selecione um contexto</option>
                <option value="educational">Educacional</option>
                <option value="entertainment">Entretenimento</option>
                <option value="technology">Tecnologia</option>
              </select>
            </div>
            {activeTab === "Link" && (
              <div className="form-group">
                <label htmlFor="link">Link</label>
                <input type="text" id="link" placeholder="Digite o link do video" />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="palavra">Palavra</label>
              <input type="text" id="palavra" placeholder="Digite a palavra" />
            </div>
            <div className="form-group">
              <label htmlFor="observacoes">Observações</label>
              <textarea id="observacoes" placeholder="Observações"></textarea>
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