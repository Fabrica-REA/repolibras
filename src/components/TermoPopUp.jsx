import { useEffect, useState } from "react";
import TermoVideoSinal from "./politicas/termos/TermoVideoSinal";

const TermoAceiteModal = ({
  open,
  title,
  versionLabel,
  loading,
  onCancel,
  onConfirm,
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (open) setChecked(false);
  }, [open]);

  if (!open) return null;

  return (
    <div className="tos-modal-overlay" role="presentation">
      <div
        className="tos-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="tos-modal-header">
          <div className="tos-modal-title">
            <div className="tos-modal-icon" aria-hidden="true">
              <i className="pi pi-shield"></i>
            </div>
            <div className="tos-modal-title-text">
              <h2>{title}</h2>
              {versionLabel ? <p className="tos-modal-subtitle">{versionLabel}</p> : null}
            </div>
          </div>
          <button
            type="button"
            className="tos-modal-close"
            onClick={onCancel}
            aria-label="Fechar"
            disabled={loading}
          >
            <i className="pi pi-times" />
          </button>
        </div>

        <div className="tos-modal-body">
          <div className="tos-modal-body-content">
            <TermoVideoSinal
              acceptance={{
                checked,
                disabled: !!loading,
                onChange: setChecked,
              }}
            />
          </div>
        </div>

        <div className="tos-modal-footer">
          <div className="tos-modal-actions">
            <button type="button" className="tos-btn tos-btn-secondary" onClick={onCancel} disabled={loading}>
              Cancelar
            </button>
            <button
              type="button"
              className="tos-btn tos-btn-primary"
              onClick={() => onConfirm({ checked })}
              disabled={!checked || loading}
            >
              Aceitar e enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermoAceiteModal;
