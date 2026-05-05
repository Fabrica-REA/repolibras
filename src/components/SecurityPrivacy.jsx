import "../assets/css/securityPrivacy.css";
import { useState } from "react";
import { base } from "../utils/Utilidades";
import { Link } from "react-router-dom";
const SecurityPrivacy = () => {
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

    const devices = [
        {
            id: 1,
            osIcon: "pi pi-facebook",
            browserIcon: "pi pi-chrome",
            deviceName: "Chrome on Windows",
            location: "São Paulo, Brazil",
            countryFlag: "🇧🇷",
            lastActive: "Current",
            isCurrent: true,
        },
        {
            id: 2,
            osIcon: "pi pi-apple",
            browserIcon: "pi pi-safari",
            deviceName: "Safari on MacOS",
            location: "São Paulo, Brazil",
            countryFlag: "🇧🇷",
            lastActive: "2 weeks ago",
            isCurrent: false,
        }
    ];

    const legalItems = [
        {
            id: 1,
            label: "Termo de autorização para submissão de vídeo-sinal",
            href: `${base}politicas`,
            description: "Termo que concede permissão para envio de videos de sinais"
        },
    ];

    return (
        <section className="security-privacy-container">
            {/* Basics Section */}
            <div className="security-settings-section">
                <div className="security-settings-section-header">
                    <h2>Segurança da Conta</h2>
                    <p className="security-settings-item-description">Aplique métodos de segurança para melhor proteção</p>
                </div>

                <div className="security-settings-content">
                    {/* Password */}
                    <div className="security-settings-item security-settings-item-horizontal">
                        <div className="security-settings-item-label">
                            <h3>Senha</h3>
                            <p className="security-settings-item-description">Defina uma senha para proteger sua conta</p>
                        </div>

                        <div className="security-settings-item-row">
                            <div className="security-settings-password-group">
                                <span className="security-settings-password-mask">***********</span>
                                <span className="security-settings-password-badge">
                                    <i className="pi pi-verified" aria-hidden="true" />
                                    Bem segura
                                </span>
                            </div>

                            <button className="security-settings-edit-btn" aria-label="Editar senha">
                                <i className="pi pi-pencil" aria-hidden="true" />
                                Editar
                            </button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="security-settings-divider" />

                    {/* Two Step Verification */}
                    <div className="security-settings-item security-settings-item-horizontal">
                        <div className="security-settings-item-label">
                            <h3>Two step verification</h3>
                            <p className="security-settings-item-description"> Nós recomendamos exigir um código de verificação em adição à sua senha</p>
                        </div>

                        <div className="security-settings-item-row">
                            <div className="security-settings-toggle-group">
                                <button
                                    type="button"
                                    className="security-settings-toggle"
                                    aria-pressed={twoFactorEnabled}
                                    aria-label="Toggle two step verification"
                                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                                >
                                    <span className="security-settings-toggle-thumb" />
                                </button>
                                <span className="security-settings-toggle-label">
                                    {twoFactorEnabled ? "Ativo" : "Inativo"}
                                </span>
                            </div>

                            <button className="security-settings-edit-btn" aria-label="Edit two step verification">
                                <i className="pi pi-pencil" aria-hidden="true" />
                                Editar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sessions / Browsers and Devices Section */}
            <div className="security-settings-section">
                <div className="security-settings-section-header">
                    <h2>Navegadores e Dispositivos</h2>
                    <p className="security-settings-section-description">
                        Navegadores em que foi logado em sua conta
                    </p>
                </div>

                <div className="security-settings-content">
                    {/* Current Session */}
                    {devices.filter(d => d.isCurrent).map((device) => (
                        <div key={device.id} className="security-settings-other-session-block">
                            <div className="security-settings-device-item">
                                <div className="security-settings-device-icon-group">
                                    <i className={device.osIcon} aria-hidden="true" />
                                    <i className={device.browserIcon} aria-hidden="true" />
                                </div>

                                <div className="security-settings-device-info">
                                    <p className="security-settings-device-name">
                                        {device.deviceName}
                                    </p>
                                    <div className="security-settings-device-meta">
                                        <span className="security-settings-dot" />
                                        {device.isCurrent && <span className="security-settings-current-badge">Sessão atual</span>}
                                        <span className="security-settings-meta-dot" />
                                        <span className="security-settings-device-location-inline">
                                            <span className="security-settings-location-flag">{device.countryFlag}</span>
                                            {device.location}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Other Sessions Title */}
                    <div className="security-settings-other-sessions-title">
                        {devices.filter(d => !d.isCurrent).length} outras sessões
                    </div>

                    {/* Other Sessions */}
                    <div className="other-sessions-section">
                        {devices.filter(d => !d.isCurrent).map((device) => (
                            <div key={device.id} className="security-settings-other-session-block">
                                <div className="security-settings-device-item">
                                    <div className="security-settings-device-icon-group">
                                        <i className={device.osIcon} aria-hidden="true" />
                                        <i className={device.browserIcon} aria-hidden="true" />
                                    </div>

                                    <div className="security-settings-device-info">
                                        <p className="security-settings-device-name">{device.deviceName}</p>
                                        <div className="security-settings-device-meta">
                                            <span className="security-settings-device-location-inline">
                                                <span className="security-settings-location-flag">{device.countryFlag}</span>
                                                {device.location}
                                            </span>
                                            <span className="security-settings-meta-dot" />
                                            <span className="security-settings-device-time-inline">{device.lastActive}</span>
                                        </div>
                                    </div>

                                    <button
                                        className="security-settings-signout-btn"
                                        aria-label={`Sign out from ${device.deviceName}`}
                                    >
                                        Remover
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="security-settings-section">
                <div className="security-settings-section-header">
                    <h2>Políticas Jurídicas</h2>
                    <p className="security-settings-section-description">
                        Encontra os documentos legais que regem o uso do SignConverse
                    </p>
                </div>

                <div className="security-settings-content">
                    <div className="security-settings-legal-list">
                        {legalItems.map((item) => (
                            <Link
                                key={item.id}
                                className="security-settings-legal-row"
                                to={item.href}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <div className="">
                                    <span className="security-settings-legal-label">{item.label}</span>
                                    <p className="security-settings-section-description">
                                       {item.description}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="security-settings-external-icon"
                                    aria-label={`Abrir ${item.label} em nova aba`}
                                >
                                    <i className="pi pi-arrow-up-right" aria-hidden="true" />
                                </button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SecurityPrivacy;