import "../assets/css/enviar.css";
import UploadFile from "../components/UploadFile";
import enviar from "../assets/images/send_icon.svg";
import { useEffect, useState } from "react";
import { getContextos, postArquivo } from "../api/Enviar";
import { useUsuario } from "../context/usuarioContext";
import { ActionButton, Loading, ErrorMessage } from "../utils/Utilidades";

// Componente principal para envio de vídeos ou links
const Enviar = () => {
  // Estados para controlar os campos do formulário e feedbacks
  const [activeTab, setActiveTab] = useState("Arquivo");
  const [palavra, setPalavra] = useState("");
  const [link, setLink] = useState("");
  const [contextoSelecionado, setContextoSelecionado] = useState("");
  const [observacao, setObservacao] = useState("");
  const [linguagem, setLinguagem] = useState("");
  const [contextos, setContextos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const { usuario, token } = useUsuario();

  // Função para envio do formulário
  const upload = async () => {
    // Validações dos campos obrigatórios
    if (!contextoSelecionado) {
      setError("Selecione o contexto.");
      return false;
    }
    if (!linguagem) {
      setError("Selecione a linguagem.");
      return false;
    }
    if (activeTab === "Link" && !link) {
      setError("Digite o link para enviar.");
      setFile(null);
      return false;
    }
    if (activeTab === "Arquivo" && !file) {
      setError("Selecione o arquivo para enviar.");
      setLink("");
      return false;
    }
    if (!palavra || palavra.length < 2 || palavra.length > 80) {
      setError("A palavra deve ter entre 2 e 80 caracteres.");
      return false;
    }

    // Monta o dado para envio
    const fileOrLink = activeTab === "Link" ? link : file;
    try {
      setLoading(true);
      // Envia o arquivo ou link para a API
      await postArquivo(fileOrLink, contextoSelecionado, usuario, palavra, observacao, linguagem, token)
        .then(res => console.log(res))
        .catch(e => {
          setError("Erro ao enviar arquivo.");
          console.error("Erro ao enviar arquivo:", e);
          setLoading(false);
          return false;
        })
        .finally(setTimeout(() => window.location.reload(), 500));
      
      setLoading(false);
      setFile(null);
      setPalavra("");
      setLink("");
      setContextoSelecionado("");
      setObservacao("");
      setError("");
    } catch (e) {
      setLoading(false);
      setError("Erro ao enviar arquivo.", e);
      return false;
    }
  };

  // Carrega os contextos ao montar o componente
  useEffect(() => {
    getContextos(token)
      .then(res => setContextos(res))
      .catch(e => {
        console.error('Erro ao carregar contextos:', e);
        setLoading(false);
      });
  }, [token])

  return (
    <>
      {/* Exibe mensagens de erro */}
      <div className="error-message-container">
        <ErrorMessage error={error} onClose={() => setError("")} />
      </div>
      <div className={`enviar-container${activeTab === "Link" ? " enviar-container-link" : ""}`}>
        <Loading open={loading} />
        {/* Upload de arquivo */}
        {activeTab === "Arquivo" && (
          <div className="enviar-col">
            <div className="file-upload-section">
              <UploadFile
                classNameFile={"upload-container disabled"}
                width={80}
                onFileChange={(File) => setFile(File)}
              />
            </div>
          </div>
        )}
        <div className={`enviar-col enviar-col-right${activeTab === "Link" ? " enviar-col-right-link" : ""}`}>
          {/* Abas para alternar entre arquivo e link */}
          <div className="forms-tabs">
            <div className={`tab${activeTab === "Arquivo" ? " active" : ""}`} onClick={() => setActiveTab("Arquivo")} style={{ cursor: "pointer" }}>Arquivo</div>
            <div className={`tab${activeTab === "Link" ? " active" : ""}`} onClick={() => setActiveTab("Link")} style={{ cursor: "pointer" }}>Link</div>
          </div>
          <div className="enviar-forms">
            <form className="enviar-form">
              {/* Campo de linguagem */}
              <div className="form-group">
                <label htmlFor="linguagem">Linguagem</label>
                <select id="linguagem" required onChange={(e) => setLinguagem(e.target.value)} value={linguagem}>
                  <option value="">Selecione a Linguagem</option>
                  <option value="portugues">Português</option>
                  <option value="terena">Terena</option>
                </select>
              </div>
              {/* Campo de contexto */}
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
              {/* Campo de link, se selecionado */}
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
              {/* Campo de palavra */}
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
              {/* Campo de observações */}
              <div className="form-group">
                <label htmlFor="observacoes">Observações</label>
                <textarea
                  id="observacoes"
                  placeholder="Observações"
                  maxLength={500}
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                ></textarea>
              </div>
              {/* Botão de envio com feedback */}
              <ActionButton
                type={"message"}
                class={"submit-button"}
                title={"Enviar"}
                message={"Enviado com sucesso!"}
                loading={loading}
                action={upload}
                disabled={loading}
                isSubmit
              >
                <img src={enviar} alt="Enviar" />
              </ActionButton>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Enviar;