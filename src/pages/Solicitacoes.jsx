import "../assets/css/solicitacoes.css";
import UploadFile from "../components/UploadFile";
import { ActionButton } from "../utils/Utilidades";

const Solicitacoes = () => {
  return (
    <div className="solicitacoes-container">
      <div className="title">
        <h1>Solicitações</h1>
      </div>
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
          <tr>
            <td>Exemplo 1</td>
            <td>Contexto</td>
            <td>
              <UploadFile />
            </td>
            <td>
              <div className="acoes-cell">
               <ActionButton title="Recusar"/>
               <ActionButton icon={"pi-send"} type={"icon-btn accept-button"} title="Enviar"/>
              </div>
            </td>
          </tr>
          <tr>
            <td>Exemplo 2</td>
            <td>Contexto</td>
            <td>
              <UploadFile />
            </td>
            <td>
              <div className="acoes-cell">
               <ActionButton title="Recusar"/>
               <ActionButton icon={"pi-send"} type={"icon-btn accept-button"} title="Enviar"/>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Solicitacoes;