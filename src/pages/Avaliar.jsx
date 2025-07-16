import { useEffect, useState } from "react";
import { aceitarAvaliacao, getAvaliacoes, recusarAvaliacao } from "../api/avaliacao";
import "../assets/css/avaliar.css";
import Video from "../components/Video";
import { ActionButton, Loading } from "../utils/Utilidades";
import { useUsuario } from "../context/usuarioContext";

const Avaliar = () => {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { usuario, token } = useUsuario();

  useEffect(() => {
    setLoading(true); 
    getAvaliacoes(token)
      .then((res) => {
        setAvaliacoes(res);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Erro ao carregar as avaliações:", e);
        setLoading(false);
      });
  }, []);

  const handleDesaprovacao = async (palavraId, usuarioId, quemRecusou, motivo) => {
    console.log("Dados para recusa:", palavraId, usuarioId, quemRecusou, motivo, token);
    await recusarAvaliacao(palavraId, usuarioId, quemRecusou, motivo, token).then((res) => {
      console.log(res);
    }).catch((e) => {
      console.error("Erro ao recusar a avaliação:", e);
    })
    .finally(() => window.location.reload());
  }

  const handleAprovacao = async (palavraId, usuarioId, quemAprovou) => { 
    console.log("Dados para aprovação:", palavraId, usuarioId, quemAprovou, token);
    
    await aceitarAvaliacao(palavraId, usuarioId, quemAprovou, token).then((res) => {
      console.log("Avaliação aprovada com sucesso!", res);
    }).catch((e) => {
      console.error("Erro ao aprovar a avaliação:", e);
    })
    .finally(() => window.location.reload())
  }

  return (
    <div className="avaliar-page">
      <div className="title">
        <h1>Avaliação</h1>
      </div>
      {loading ? (
        <Loading open={loading} />
      ) : (
        <div className="grid-container">
          {avaliacoes.map((avaliacao, id) => {
            return (
              <div key={id} className="video-container">
                <Video
                  src={
                    avaliacao.NomeArquivo && (avaliacao.NomeArquivo.includes("youtube.com") || avaliacao.NomeArquivo.includes("youtu.be"))
                      ? avaliacao.NomeArquivo
                      : avaliacao.videoUrl
                  }
                  index={id}
                  classNameVideo={"video-player-avaliar"}
                />
                <div className="video-row">
                  <h2>{avaliacao.DesContexto}</h2>
                  <div className="button-group">
                    <ActionButton type={"accept"} icon={"pi-check"} class={"icon-btn accept-button"} action={() => handleAprovacao(avaliacao.PalavraId, avaliacao.usuarioId, usuario.id)}/>
                    <ActionButton
                      type={"decline"}
                      icon={"pi-times"}
                      class={"icon-btn decline-button"}
                      action={(motivo) => handleDesaprovacao(avaliacao.PalavraId, avaliacao.usuarioId, usuario.id, motivo)}
                    />
                  </div>
                </div>
                <h3>{avaliacao.DesPalavra}</h3>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Avaliar;