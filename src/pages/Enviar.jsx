import '../assets/css/enviar.css';
import SendIcon from '../assets/images/send_icon.svg';

const Enviar = () => {
  return (
  <>
    <div className="enviar-container">
    <h2>Formulário de Envio</h2>

    <form className="enviar-form">
    
    <label htmlFor="contexto">Contexto:</label>
    <select id="contexto" name="contexto">
    <option value="">Selecione</option>
    <option value="contexto1">OP1</option>
    <option value="contexto2">OP2</option>
    </select>

    
    <label htmlFor="video">Insira o arquivo de video:</label>
    <div className="upload-wrapper">
    <input type="file" id="video" name="video" accept="video/*" />
    <span className="arquivo-info">Nenhum arquivo selecionado</span>
    </div>

    
    <input
    type="text"
    name="link"
    placeholder="Inser link"
    />

     
    <input
    type="text"
    name="palavra"
    placeholder="Digite a palavra"
    />

    
    <textarea
    name="observacoes"
    placeholder="Observações"
    ></textarea>

    
<button className="botao-enviar">
  <img src={SendIcon} alt="Ícone Enviar" className="icone" />
</button>
    </form>
    </div>
  </>
  );
};

export default Enviar;
