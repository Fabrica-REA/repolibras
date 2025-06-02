import '../assets/css/utilidades.css';
import { useState } from 'react';

export const Pagina404 = () => {
    return (
        <div className="container-404">
            <h1>404 - Página não encontrada</h1>
            <p>Desculpe, a página que você está procurando não existe.</p>
            <a href="/" className="home-button">Voltar para a página inicial</a>
        </div>
    );
};

export const Loading = ({ open, message }) => {
    if (!open) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className='loading-container'>
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

export const ConfirmPopUp = ({ open, title, message, onConfirm, onCancel, loading, showOnlyMessage }) => {
    if (!open) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content" style={loading || showOnlyMessage ? {} : { padding: "2rem 2.5rem", minWidth: "320px" }}>
                {loading ? (
                    <div className='loading-container'>
                        <i className="pi pi-spin pi-spinner"></i>
                    </div>
                ) : showOnlyMessage ? (
                    <div style={{ padding: "2rem 2.5rem", minWidth: "320px" }}>
                        <span>{message}</span>
                    </div>
                ) : (
                    <>
                        <li className='pi pi-exclamation-circle' />
                        <h2>{title}</h2>
                        <p>{message}</p>
                        <div>
                            <button onClick={onConfirm}>Confirmar</button>
                            <button onClick={onCancel}>Cancelar</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export const DeclinePopUp = ({ open, title, message, onConfirm, onCancel, loading, showOnlyMessage }) => {
    const [reason, setReason] = useState('');

    if (!open) return null;
    return (
        <div className="modal-overlay" data-decline="true">
            <div className="modal-content" data-decline="true" style={loading || showOnlyMessage ? {} : { padding: "2rem 2.5rem", minWidth: "340px" }}>
                {loading ? (
                    <div className='loading-container'>
                        <i className="pi pi-spin pi-spinner"></i>
                    </div>
                ) : showOnlyMessage ? (
                    <div style={{ padding: "2rem 2.5rem", minWidth: "320px" }}>
                        <span>{message}</span>
                    </div>
                ) : (
                    <div className='decline-container'>
                        <li className='pi pi-times-circle' />
                        <h2>{title}</h2>
                        <span>{message}</span>
                        <textarea
                            className="decline-textarea"
                            style={{ width: "100%", minHeight: "90px", marginBottom: "1.2rem", borderRadius: "0.7rem", padding: "0.7rem", border: "1.5px solid #e57373" }}
                            placeholder="Digite o motivo da recusa..."
                            value={reason}
                            onChange={e => setReason(e.target.value)}
                        />
                        <div className='button-group'>
                            <button
                                onClick={() => onConfirm(reason)}
                                disabled={!reason.trim()}
                                data-decline="true"
                            >
                                Confirmar
                            </button>
                            <button onClick={onCancel} data-decline="true">Cancelar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const ActionButton = ({ icon , type }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [showOnlyMessage, setShowOnlyMessage] = useState(false);

    const handleRemove = () => {
        setOpen(true);
        setResult('');
        setShowOnlyMessage(false);
    };

    const handleConfirm = () => {
        setLoading(true);
        setShowOnlyMessage(false);
        // Simulate async removal
        setTimeout(() => {
            setLoading(false);
            setResult('Item removido com sucesso');
            setShowOnlyMessage(true);
            // Hide modal after 1.5s
            setTimeout(() => {
                setOpen(false);
                setResult('');
                setShowOnlyMessage(false);
            }, 800);
        }, 1000);
    };

    const handleCancel = () => {
        setOpen(false);
        setResult('');
        setShowOnlyMessage(false);
    };

    return (
        <>
            <button className={type ? "icon-btn accept-button" : "icon-btn decline-button"} onClick={handleRemove}>
                <i className={icon ? `pi ${icon}` : "pi pi-trash"}></i>
            </button>
            {icon ? (
                <DeclinePopUp
                    open={open}
                    title={"Confirmar Recusa"}
                    message={"Por favor, escreva o motivo da recusa abaixo para confirmar esta ação."}
                    onConfirm={!loading && !result ? handleConfirm : undefined}
                    onCancel={!loading && !result ? handleCancel : undefined}
                />
            ) : (
                <ConfirmPopUp
                    open={open}
                    title={"Confirmar Remoção"}
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
            )}
        </>
    );
}
