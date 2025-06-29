import { useEffect, useState } from "react";
import "../assets/css/solicitacoes.css";
import UploadFile from "../components/UploadFile";
import { ActionButton, Loading } from "../utils/Utilidades";
import { deleteSolicitacao, getSolicitacoes, sendSolicitacao } from "../api/Solicitacoes";
import { useUsuario } from "../context/usuarioContext";
import { getContextos } from "../api/Enviar";

const Solicitacoes = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contextos, setContextos] = useState([]);
  const { usuario } = useUsuario();
  const [rowState, setRowState] = useState({});

  console.log("Solicitacoes", solicitacoes, rowState);


  useEffect(() => {
    Promise.all([getSolicitacoes(), getContextos()])
      .then(([solicitacoesRes, contextosRes]) => {
        setSolicitacoes(solicitacoesRes);
        setContextos(contextosRes);
        const initialRowState = {};
        (solicitacoesRes || []).forEach((solicitacao) => {
          initialRowState[solicitacao.PalavraId] = {
            contextoSelecionado: solicitacao.ContextoId,
            file: null,
            observacoes: ""
          };
        });
        setRowState(initialRowState);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Erro ao carregar solicitações ou contextos:", e);
        setLoading(false);
      });
  }, []);

  const handleRemove = async (id) => {
    setLoading(true);
    await deleteSolicitacao(id)
      .then((res) => console.log(res), setLoading(false))
      .catch(() => setLoading(false))
      .finally(() => window.location.reload());
  };

  const handleSend = async (id, file, contextoSelecionado, usuario, palavra, observacoes) => {
    await sendSolicitacao(id, file, contextoSelecionado, usuario, palavra, observacoes)
      .then((res) => console.log(res), setLoading(false))
      .catch((e) => console.log(e))
      .finally(() => window.location.reload());
  };

  const handleContextChange = (id, value) => {
    setRowState(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        contextoSelecionado: value
      }
    }));
  };

  const handleFileChange = (id, file) => {
    console.log(`Updating row ${id} with file:`, file); // Debug log
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
      {loading ? (
        <Loading open={loading} />
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
                      action={(observacoes) =>
                        handleSend(
                          solicitacao.PalavraId,
                          rowState[solicitacao.PalavraId].file,
                          rowState[solicitacao.PalavraId].contextoSelecionado,
                          usuario,
                          solicitacao.DesPalavra,
                          observacoes
                        )
                      }
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