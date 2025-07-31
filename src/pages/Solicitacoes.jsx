import { useEffect, useState } from "react";
import "../assets/css/solicitacoes.css";
import UploadFile from "../components/UploadFile";
import { ActionButton, Loading, ErrorMessage } from "../utils/Utilidades";
import { deleteSolicitacao, getSolicitacoes, sendSolicitacao } from "../api/Solicitacoes";
import { useUsuario } from "../context/usuarioContext";
import { getContextos } from "../api/Enviar";

// Página de solicitações
const Solicitacoes = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contextos, setContextos] = useState([]);
  const { usuario, token } = useUsuario();
  const [rowState, setRowState] = useState({});
  const [error, setError] = useState(""); 

  useEffect(() => {
    Promise.all([getSolicitacoes(token), getContextos(token)])
      .then(([solicitacoesRes, contextosRes]) => {
        setSolicitacoes(solicitacoesRes);
        setContextos(contextosRes);
        const initialRowState = {};
        (solicitacoesRes || []).forEach((solicitacao) => {
          initialRowState[solicitacao.PalavraId] = {
            contextoSelecionado: solicitacao.ContextoId,
            file: null,
          };
        });
        setRowState(initialRowState);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Erro ao carregar solicitações ou contextos:", e);
        setLoading(false);
      });
  }, [token]);

  // Remove solicitação
  const handleRemove = async (id) => {
    setLoading(true);
    await deleteSolicitacao(id, token)
      .then((res) => console.log(res), setLoading(false))
      .catch(() => setLoading(false))
      .finally(() => { setLoading(false); window.location.reload(); });
  };

  // Envia solicitação
  const handleSend = async (id, file, contextoSelecionado, usuarioId, palavra, observacao) => {
    if (!file) {
      setError("Selecione um arquivo de vídeo para enviar.");
      return false;
    }
    setError("");
    setLoading(false);
    await sendSolicitacao(id, file, contextoSelecionado, usuarioId, palavra, observacao, token)
      .then((res) => console.log("response : ", res))
      .catch((e) => {
        setError("Erro ao enviar solicitação.");
        console.log(e);
      })
      .finally(() => { setLoading(false); window.location.reload(); });
  };

  // Lida com mudança de contexto
  const handleContextChange = (id, value) => {
    setRowState(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        contextoSelecionado: value
      }
    }));
  };

  // Lida com mudança de arquivo
  const handleFileChange = (id, file) => {
    setRowState(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        file
      }
    }));
  };

  return (
    <div className="solicitacoes-container">
      <div className="title">
        <h1>Solicitações</h1>
      </div>
      <div className="error-message-container">
        <ErrorMessage error={error} onClose={() => setError("")} />
      </div>
      {loading ? (
        <Loading open={loading} />
      ) : solicitacoes.length === 0 ? (
        <div className="empty-state">
          <i className="pi pi-inbox empty-state-icon"></i>
          <h2>Nenhuma solicitação encontrada</h2>
          <p>Você não possui solicitações pendentes no momento.</p>
        </div>
      ) : (
        <table className="solicitacoes-table">
          <thead>
            <tr>
              <th>Palavra</th>
              <th>Contexto</th>
              <th>Video</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {solicitacoes.map((solicitacao) => (
              <tr key={solicitacao.PalavraId}>
                <td>{solicitacao.DesPalavra}</td>
                <td>
                  <select
                    id={`contexto-${solicitacao.PalavraId}`}
                    required
                    value={rowState[solicitacao.PalavraId].contextoSelecionado}
                    onChange={e => handleContextChange(solicitacao.PalavraId, e.target.value)}
                  >
                    <option value="">Selecione um contexto</option>
                    {contextos.map((contexto) => (
                      <option key={contexto.id} value={contexto.id}>
                        {contexto.descricao}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <UploadFile
                    rowId={solicitacao.PalavraId}
                    file={rowState[solicitacao.PalavraId].file}
                    onFileChange={handleFileChange}
                  />
                </td>
                <td>
                  <div className="acoes-cell">
                    <ActionButton
                      icon={"pi-trash"}
                      type={"confirm"}
                      class={"icon-btn decline-button"}
                      message={"Tem certeza que deseja remover está solicitação?"}
                      endMessage={"A solicitação foi removida!"}
                      action={() => handleRemove(solicitacao.PalavraId)}
                    />
                    <ActionButton
                      icon={"pi-send"}
                      type={"decline"}
                      class={"icon-btn accept-button"}
                      message={"Deseja enviar esta solicitação? Adicione uma observação se necessário."}
                      endMessage={"A Solicitação foi enviada!"}
                      observationMode={true}
                      action={(observacao) => {
                        if (!rowState[solicitacao.PalavraId].file) {
                          setError("É obrigatório um arquivo de vídeo para enviar.");
                          return false;
                        }
                        return handleSend(
                          solicitacao.PalavraId,
                          rowState[solicitacao.PalavraId].file,
                          rowState[solicitacao.PalavraId].contextoSelecionado,
                          usuario.id,
                          solicitacao.DesPalavra,
                          observacao
                        );
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Solicitacoes;