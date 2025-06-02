import '../assets/css/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>Fábrica de REA - UFPR 2025. Todos os direitos reservados.</p>
        </footer>
    )
}

export default Footer;

{/* <div className="">
    
      {aba === "arquivo" && (
        <div className="">
          <UploadFile />
        </div>
      )}

      <div className="">
        <div className="">
          <button
            type="button"
            className={""}
            onClick={() => setAba("arquivo")}
          >
            Arquivo
          </button>
          <button
            type="button"
            className={""}
            onClick={() => setAba("link")}
          >
            Link
          </button>
        </div>
        <form className="">
          <select
            id="contexto"
            name="contexto"
            defaultValue=""
            required
            className=""
            onInvalid={(e) =>
              e.target.setCustomValidity("Por favor, selecione um contexto.")
            }
            onInput={(e) => e.target.setCustomValidity("")}
          >
            <option value="" disabled>
              Contexto
            </option>
            <option value="contexto1">OP1</option>
            <option value="contexto2">OP2</option>
          </select>
         
          {aba === "link" && (
            <input
              type="text"
              name="link"
              placeholder="Insira o link do YouTube"
              className=""
              pattern="^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$"
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Insira um link válido do YouTube (ex: https://www.youtube.com/watch?v=xxxxx)"
                )
              }
              onInput={(e) => e.target.setCustomValidity("")}
              maxLength={100}
              required
            />
          )}
          <input
            type="text"
            name="palavra"
            placeholder="Digite a palavra"
            required
            className=""
            maxLength={50}
            onInvalid={(e) =>
              e.target.setCustomValidity("Por favor, insira uma palavra.")
            }
          />
          <textarea
            name="observacoes"
            placeholder="Observações"
            className=""
            maxLength={1000}
          ></textarea>
          <button className="">
            <img src={SendIcon} alt="Ícone Enviar" className="" />
          </button>
        </form>
      </div>
    </div>  */}