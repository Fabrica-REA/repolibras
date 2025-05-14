import '../assets/css/enviar.css';
import SendIcon from '../assets/images/send_icon.svg';

const Enviar = () => {
  return (
<<<<<<< HEAD
    <>
      <div className="enviar-container">
        <h1>Formulário de Envio</h1>
        <form className="enviar-form">
          <select
            id="contexto"
            name="contexto"
            defaultValue=""
            required
            className="select-contexto"
            onInvalid={(e) => e.target.setCustomValidity("Por favor, selecione um contexto.")}
            onInput={(e) => e.target.setCustomValidity("")}
          >
            <option value="" disabled>Contexto</option>
            <option value="contexto1">OP1</option>
            <option value="contexto2">OP2</option>
          </select>
          <div className="upload-container">
            <label htmlFor="dropzone-file" className="upload-label">
              <div className="upload-content">
                <svg className="upload-icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p className="upload-text"><span className="font-bold">Clique para fazer upload</span> ou arraste e solte</p>
                <p className="upload-subtext">MP4, MOV ou WMV</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden-input" accept="video/*" />
            </label>
          </div>
          <input
            type="text"
            name="link"
            placeholder="Insira o link"
            className="input-field"
            pattern="^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$"
            onInvalid={(e) => e.target.setCustomValidity("Insira um link válido do YouTube (ex: https://www.youtube.com/watch?v=xxxxx)")}
            onInput={(e) => e.target.setCustomValidity("")}
            maxLength={100}
          />
          <input
            type="text"
            name="palavra"
            placeholder="Digite a palavra"
            required
            className="input-field"
            maxLength={50}
            onInvalid={(e) => e.target.setCustomValidity("Por favor, insira uma palavra.")}
          />
          <textarea
            name="observacoes"
            placeholder="Observações"
            className="textarea-field"
            maxLength={1000}
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
=======
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
>>>>>>> 77192e7a1141e9e3666779feacac8b55ba8fadd3
