import { useEffect, useState } from "react";
import "../assets/css/solicitacoes.css";
import UploadFile from "../components/UploadFile";
import { ActionButton, Loading } from "../utils/Utilidades";
import { getSolicitacoes } from "../api/Solicitacoes";

const Solicitacoes = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(solicitacoes);

  useEffect(() => {
    // setTimeout(() => {
      getSolicitacoes()
        .then((res) => {
          setSolicitacoes(res);
          setLoading(false);
        })
        .catch((e) => {
          console.error("Erro ao carregar solicitações:", e);
          setLoading(false);
        });
    // }, 2000);
  }, []);

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
            {solicitacoes.map((solicitacao, id) => (
              <tr key={id}>
                <td>{solicitacao.DesPalavra}</td>
                <td>{solicitacao.DesContexto}</td>
                <td>
                  <UploadFile />
                </td>
                <td>
                  <div className="acoes-cell">
                    <ActionButton title="Recusar" />
                    <ActionButton icon={"pi-send"} type={"icon-btn accept-button"} title="Enviar"/>
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
