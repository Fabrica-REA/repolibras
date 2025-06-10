import "../assets/css/enviar.css";
import UploadFile from "../components/UploadFile";
import enviar from "../assets/images/send_icon.svg";
import { useEffect, useState } from "react";
import { getContextos, postArquivo } from "../api/Enviar";
import { useUsuario } from "../context/usuarioContext";

const Enviar = () => {
  const [activeTab, setActiveTab] = useState("Arquivo");
  const [palavra, setPalavra] = useState("");
  const [link, setLink] = useState("");
  const [contextoSelecionado, setContextoSelecionado] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [contextos, setContextos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const { usuario } = useUsuario();
  
  const upload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Selecione um arquivo para enviar.");
      return;
    }
    setLoading(true);
    try {
      // Optionally, you can send other form data as well
      const response = await postArquivo(file, contextoSelecionado, usuario);
      // Handle response as needed
      alert("Arquivo enviado com sucesso!");
      // Optionally reset form fields here
      setFile(null);
      setPalavra("");
      setLink("");
      setContextoSelecionado("");
      setObservacoes("");
    } catch (error) {
      alert("Erro ao enviar arquivo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContextos()
      .then(res => setContextos(res))
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
            <UploadFile
              classNameFile={"upload-container disabled"}
              width={80}
              onFileChange={setFile} // <-- pass handler
            />
          </div>
        </div>
      )}
      <div className={`enviar-col enviar-col-right${activeTab === "Link" ? " enviar-col-right-link" : ""}`}>
        <div className="forms-tabs">
          <div className={`tab${activeTab === "Arquivo" ? " active" : ""}`} onClick={() => setActiveTab("Arquivo")} style={{ cursor: "pointer" }}>Arquivo</div>
          <div className={`tab${activeTab === "Link" ? " active" : ""}`} onClick={() => setActiveTab("Link")} style={{ cursor: "pointer" }}>Link</div>
        </div>
        <div className="enviar-forms">
          <form className="enviar-form" noValidate onSubmit={upload}>
            <div className="form-group">
              <label htmlFor="contexto">Contexto</label>
              <select id="contexto" required value={contextoSelecionado ? contextoSelecionado.descricao : ""} onChange={e => {
                const selected = contextos.find(
                  contexto => contexto.descricao === e.target.value
                );
                setContextoSelecionado(selected || "");
              }}
              >
                <option value="">Selecione um contexto</option>
                {contextos.map((contexto, id) => (
                  <option key={id} value={contexto.descricao}>
                    {contexto.descricao}
                  </option>
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
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
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
                maxLength={80}
                required
                pattern=".{2,80}"
                title="A palavra deve ter entre 2 e 100 caracteres"
                value={palavra}
                onChange={(e) => setPalavra(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="observacoes">Observações</label>
              <textarea
                id="observacoes"
                placeholder="Observações"
                maxLength={500}
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="submit-button" disabled={loading}>
              <img src={enviar} alt="Enviar" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Enviar;