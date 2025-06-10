import "../assets/css/utilidades.css";
import { useState } from "react";

export const Pagina404 = () => {
  return (
    <div className="container-404">
      <h1>404 - Página não encontrada</h1>
      <p>Desculpe, a página que você está procurando não existe.</p>
      <a href="/" className="home-button">
        Voltar para a página inicial
      </a>
    </div>
  );
};

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

export const ConfirmPopUp = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  loading,
  showOnlyMessage,
}) => {
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

export const DeclinePopUp = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  loading,
  showOnlyMessage,
}) => {
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
            <li className="pi pi-times-circle" />
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
                border: "1.5px solid #e57373",
              }}
              placeholder="Digite o motivo da recusa..."
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

export const ActionButton = ({
  icon,
  type,
  class: className,
  title,
  message,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [showOnlyMessage, setShowOnlyMessage] = useState(false);

  const handleRemove = () => {
    setOpen(true);
    setResult("");
    setShowOnlyMessage(false);
  };

  const handleConfirm = () => {
    setLoading(true);
    setShowOnlyMessage(false);
    setTimeout(() => {
      setLoading(false);
      if (type === "accept") {
        setResult("O video foi aprovado!");
      } else if (type === "send") {
        setResult(message || "Enviado com sucesso!");
      } else {
        setResult("Item removido com sucesso");
      }
      setShowOnlyMessage(true);
      setTimeout(() => {
        setOpen(false);
        setResult("");
        setShowOnlyMessage(false);
      }, 800);
    }, 1000);
  };

  const handleCancel = () => {
    setOpen(false);
    setResult("");
    setShowOnlyMessage(false);
  };

  return (
    <>
      <button className={className} onClick={handleRemove}>
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
                onConfirm={!loading && !result ? handleConfirm : undefined}
                onCancel={!loading && !result ? handleCancel : undefined}
              />
            );
          case "decline":
            return (
              <DeclinePopUp
                open={open}
                title={"Confirmar Recusa"}
                message={
                  "Por favor, escreva o motivo da recusa abaixo para confirmar esta ação."
                }
                onConfirm={!loading && !result ? handleConfirm : undefined}
                onCancel={!loading && !result ? handleCancel : undefined}
              />
            );
          case "send":
            return (
              <SendPopUp
                open={open}
                message={result ? result : message}
                loading={loading}
                showOnlyMessage={showOnlyMessage}
                onSend={!loading && !result ? handleConfirm : undefined}
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
                    "Tem certeza que deseja remover este item?"
                  )
                }
                loading={loading}
                showOnlyMessage={showOnlyMessage}
                onConfirm={!loading && !result ? handleConfirm : undefined}
                onCancel={!loading && !result ? handleCancel : undefined}
              />
            );
        }
      })()}
    </>
  );
};
