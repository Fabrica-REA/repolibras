import "../assets/css/utilidades.css";
import { useState, useEffect, useRef } from "react";

// Página 404 padrão
export const Pagina404 = () => {
  return (
    <div className="container-404">
      <h1>404 - Página não encontrada</h1>
      <p>Desculpe, a página que você está procurando não existe.</p>
      <a href={`${base}`} className="home-button">
        Voltar para a página inicial
      </a>
    </div>
  );
};

// Componente de loading (carregamento)
export const Loading = ({ open, message }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="loading-container">
          <i className="pi pi-spin pi-spinner"></i>
        </div>
        {message && (
          <div style={{ marginTop: "1rem" }}>
            <span>{message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Popup de confirmação genérico
export const ConfirmPopUp = ({ open, title, message, onConfirm, onCancel, loading, showOnlyMessage, }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        style={
          loading || showOnlyMessage
            ? {}
            : { padding: "2rem 2.5rem", minWidth: "320px" }
        }
      >
        {loading ? (
          <div className="loading-container">
            <i className="pi pi-spin pi-spinner"></i>
          </div>
        ) : showOnlyMessage ? (
          <div style={{ padding: "2rem 2.5rem", minWidth: "320px" }}>
            <span>{message}</span>
          </div>
        ) : (
          <>
            <li className="pi pi-exclamation-circle" />
            <h2>{title}</h2>
            <p>{message}</p>
            <div className="button-group">
              <button onClick={onConfirm}>Confirmar</button>
              <button onClick={onCancel}>Cancelar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Popup para recusa ou observação
export const DeclinePopUp = ({ open, title, message, onConfirm, onCancel, loading, showOnlyMessage, observationMode, }) => {
  const [reason, setReason] = useState("");

  if (!open) return null;
  return (
    <div className="modal-overlay" data-decline="true">
      <div
        className="modal-content"
        data-decline="true"
        style={
          loading || showOnlyMessage
            ? {}
            : { padding: "2rem 2.5rem", minWidth: "340px" }
        }
      >
        {loading ? (
          <div className="loading-container">
            <i className="pi pi-spin pi-spinner"></i>
          </div>
        ) : showOnlyMessage ? (
          <div style={{ padding: "2rem 2.5rem", minWidth: "320px" }}>
            <span>{message}</span>
          </div>
        ) : (
          <div className="decline-container">
            <li
              className={`pi ${observationMode ? "pi-comment" : "pi-times-circle"
                }`}
            />
            <h2>{title}</h2>
            <span>{message}</span>
            <textarea
              className="decline-textarea"
              style={{
                width: "100%",
                minHeight: "90px",
                marginBottom: "1.2rem",
                borderRadius: "0.7rem",
                padding: "0.7rem",
                border: observationMode ? "1.5px solid #1976d2" : "1.5px solid #e57373",
              }}
              placeholder={
                observationMode
                  ? "Digite uma observação..."
                  : "Digite o motivo da recusa..."
              }
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="button-group">
              <button
                onClick={() => onConfirm(reason)}
                disabled={!reason.trim()}
                data-decline="true"
              >
                Confirmar
              </button>
              <button onClick={onCancel} data-decline="true">
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Popup para envio (usado em algumas ações)
const SendPopUp = ({ open, message, loading, showOnlyMessage, onSend }) => {
  if (open && !loading && !showOnlyMessage) {
    onSend();
  }
  if (!open) return null;
  return (
    <div className="modal-overlay" data-send="true">
      <div
        className="modal-content"
        data-send="true"
        style={
          loading || showOnlyMessage
            ? {}
            : { padding: "2rem 2.5rem", minWidth: "340px" }
        }
      >
        {loading ? (
          <div className="loading-container">
            <i className="pi pi-spin pi-spinner"></i>
          </div>
        ) : showOnlyMessage ? (
          <div style={{ padding: "2rem 2.5rem", minWidth: "320px" }}>
            <span>{message}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

// Botão de ação genérico com popup e feedback
export const ActionButton = ({ icon, type, class: className, title, message, children, action, endMessage, observationMode, disabled, }) => {
  // Estados internos para controlar popup, loading e mensagens
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [showOnlyMessage, setShowOnlyMessage] = useState(false);

  // Abre popup e executa ação se necessário
  const handleRemove = () => {
    setOpen(true);
    setResult("");
    setShowOnlyMessage(false);
    if (type === "message" && typeof action === "function") {
      Promise.resolve(action())
        .then((res) => {
          if (res === false) {
            setOpen(false);
          }
        })
        .catch(() => {
          setOpen(false);
        });
    }
  };

  // Confirma ação e mostra feedback
  const handleConfirm = (value) => {
    setLoading(true);
    setShowOnlyMessage(false);
    Promise.resolve(typeof action === "function" ? action(value) : undefined)
      .then((res) => {
        setLoading(false);
        if (res === false) {
          setOpen(false);
          setResult("");
          setShowOnlyMessage(false);
          return;
        }
        if (type === "accept") {
          setResult(endMessage || "O video foi aprovado!");
        } else if (type === "send") {
          setResult(endMessage || "Enviado com sucesso!");
        } else {
          setResult(endMessage || "Item removido com sucesso");
        }
        setShowOnlyMessage(true);
        setTimeout(() => {
          setOpen(false);
          setResult("");
          setShowOnlyMessage(false);
        }, 800);
      })
      .catch(() => {
        setLoading(false);
        setOpen(false);
        setResult("");
        setShowOnlyMessage(false);
      });
  };

  // Cancela popup
  const handleCancel = () => {
    setOpen(false);
    setResult("");
    setShowOnlyMessage(false);
  };

  // Renderiza botão e popup conforme o tipo
  return (
    <>
      <button
        className={className}
        onClick={handleRemove}
        type="button"
        disabled={disabled ? disabled : false}
      >
        {icon ? <i className={`pi ${icon}`}></i> : children}
      </button>
      {(() => {
        switch (type) {
          case "accept":
            return (
              <ConfirmPopUp
                open={open}
                title={"Confirmar Aprovação"}
                message={
                  result ? (
                    <span>{result}</span>
                  ) : (
                    "Tem certeza que deseja aprovar este video?"
                  )
                }
                loading={loading}
                showOnlyMessage={showOnlyMessage}
                onConfirm={!loading && !result ? () => handleConfirm() : undefined}
                onCancel={!loading && !result ? handleCancel : undefined}
              />
            );
          case "decline":
            return (
              <DeclinePopUp
                open={open}
                title={
                  observationMode ? "Adicionar Observação" : "Confirmar Recusa"
                }
                message={
                  result
                    ? <span>{result}</span>
                    : observationMode
                      ? "Adicione uma observação para esta solicitação."
                      : "Por favor, escreva o motivo da recusa abaixo para confirmar esta ação."
                }
                onConfirm={!loading && !result ? handleConfirm : undefined}
                onCancel={!loading && !result ? handleCancel : undefined}
                loading={loading}
                showOnlyMessage={showOnlyMessage}
                observationMode={observationMode}
              />
            );
          case "send":
            return (
              <SendPopUp
                open={open}
                message={result ? result : message}
                loading={loading}
                showOnlyMessage={showOnlyMessage}
                onSend={!loading && !result ? () => handleConfirm() : undefined}
              />
            );
          case "confirm":
            return (
              <ConfirmPopUp
                open={open}
                title={title ? title : "Confirmar Remoção"}
                message={
                  result ? (
                    <span>{result}</span>
                  ) : (
                    <span>{message}</span>
                  )
                }
                loading={loading}
                showOnlyMessage={showOnlyMessage}
                onConfirm={!loading && !result ? () => handleConfirm() : undefined}
                onCancel={!loading && !result ? handleCancel : undefined}
              />
            );
          case "message":
            return (
              <ConfirmPopUp
                open={open}
                title={title || ""}
                message={result || message}
                showOnlyMessage={true}
              />
            );
        }
      })()}
    </>
  );
};

// Componente de mensagem de erro com barra de progresso para auto-fechamento
export const ErrorMessage = ({ error, onClose, duration = 3000 }) => {
  const [progress, setProgress] = useState(100);
  const timerRef = useRef();

  useEffect(() => {
    if (!error) return;
    setProgress(100);

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timerRef.current);
          setTimeout(() => {
            if (onClose) onClose();
          }, 0);
          return 0;
        }
        return prev - 100 / (duration / 50);
      });
    }, 50);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [error, onClose, duration]);

  if (!error) return null;
  return (
    <div className="error-message">
      <span>{error}</span>
      <div className="error-message-progress-bar-bg">
        <div
          className="error-message-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>
      {onClose && (
        <li className="pi pi-times error-message-close" onClick={onClose}></li>
      )}
    </div>
  );
};

// Funções utilitárias para validação de email e senha
export function validarEmail(email) {
  const emailRegex = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
}

export function validarSenha(senha) {
  const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return senhaRegex.test(senha);
}

//Variável da base da URL do projeto
export const base = import.meta.env.BASE_URL;