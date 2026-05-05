import "../assets/css/acessibilidade.css";
import { useState } from "react";

const Acessibilidade = () => {
    const [visionEnabled, setVisionEnabled] = useState(true);
    const [visionType, setVisionType] = useState("protanopia");
    const [visionStrength, setVisionStrength] = useState("media");
    const [speechEnabled, setSpeechEnabled] = useState(true);
    const [speechVoice, setSpeechVoice] = useState("padrao");
    const [speechSpeed, setSpeechSpeed] = useState("normal");
    const [speechMode, setSpeechMode] = useState("guiado");

    const visionTypes = [
        { value: "protanopia", label: "Protanopia" },
        { value: "deuteranopia", label: "Deuteranopia" },
        { value: "tritanopia", label: "Tritanopia" },
    ];

    const visionStrengths = [
        { value: "baixa", label: "Baixa" },
        { value: "media", label: "Media" },
        { value: "alta", label: "Alta" },
    ];

    const speechVoices = [
        { value: "padrao", label: "Padrao" },
        { value: "clara", label: "Voz clara" },
        { value: "detalhada", label: "Detalhada" },
    ];

    const speechSpeeds = [
        { value: "lenta", label: "Lenta" },
        { value: "normal", label: "Normal" },
        { value: "rapida", label: "Rapida" },
    ];

    const speechModes = [
        { value: "guiado", label: "Guiado" },
        { value: "resumido", label: "Resumido" },
        { value: "detalhado", label: "Detalhado" },
    ];

    return (
        <div className="access-page">
            <header className="access-hero">
                <div className="access-hero__icon" aria-hidden="true">
                    <i className="pi pi-eye" />
                </div>
                <div className="access-hero__text">
                    <span className="access-eyebrow">Conta / Acessibilidade</span>
                    <h2>Acessibilidade do seu jeito</h2>
                    <p>
                        Ajuste recursos essenciais para leitura, cores e navegacao. Layout
                        limpo, escalavel e pronto para novos modulos.
                    </p>
                </div>
                <div className="access-hero__chip">Preferencias</div>
            </header>

            <div className="access-sections">
                <section className="access-card">
                    <div className="access-card__header">
                        <div>
                            <h3>Daltonismo</h3>
                            <p>
                                Ajuste o filtro de cores para melhorar contraste sem perder
                                fidelidade visual.
                            </p>
                        </div>
                        <button
                            type="button"
                            className={`access-toggle${visionEnabled ? " is-on" : ""}`}
                            onClick={() => setVisionEnabled((prev) => !prev)}
                            aria-pressed={visionEnabled}
                        >
                            {visionEnabled ? "Ativo" : "Inativo"}
                        </button>
                    </div>

                    <div className="access-card__content">
                        <div className="access-field">
                            <div className="access-field__title">Tipo de filtro</div>
                            <p className="access-field__help">
                                Selecione o tipo de daltonismo que deseja compensar.
                            </p>
                            <div className="access-pill-group">
                                {visionTypes.map((item) => (
                                    <button
                                        key={item.value}
                                        type="button"
                                        className={`access-pill${visionType === item.value ? " is-active" : ""}`}
                                        onClick={() => setVisionType(item.value)}
                                        aria-pressed={visionType === item.value}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="access-field">
                            <div className="access-field__title">Intensidade</div>
                            <p className="access-field__help">
                                Equilibre cores e contraste com a intensidade ideal.
                            </p>
                            <div className="access-pill-group">
                                {visionStrengths.map((item) => (
                                    <button
                                        key={item.value}
                                        type="button"
                                        className={`access-pill${visionStrength === item.value ? " is-active" : ""}`}
                                        onClick={() => setVisionStrength(item.value)}
                                        aria-pressed={visionStrength === item.value}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="access-preview">
                            <div className="access-preview__swatch">
                                <span className="access-swatch access-swatch--primary" />
                                <span className="access-swatch access-swatch--accent" />
                                <span className="access-swatch access-swatch--neutral" />
                            </div>
                            <div>
                                <div className="access-preview__title">Pre-visualizacao</div>
                                <p className="access-preview__text">
                                    Pequeno preview do contraste aplicado ao tema da conta.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="access-card">
                    <div className="access-card__header">
                        <div>
                            <h3>Leitura de texto</h3>
                            <p>
                                Ative voz para apoiar navegacao de pessoas cegas ou com baixa
                                visao.
                            </p>
                        </div>
                        <button
                            type="button"
                            className={`access-toggle${speechEnabled ? " is-on" : ""}`}
                            onClick={() => setSpeechEnabled((prev) => !prev)}
                            aria-pressed={speechEnabled}
                        >
                            {speechEnabled ? "Ativo" : "Inativo"}
                        </button>
                    </div>

                    <div className="access-card__content">
                        <div className="access-field">
                            <div className="access-field__title">Voz</div>
                            <p className="access-field__help">
                                Escolha o estilo de voz mais confortavel.
                            </p>
                            <div className="access-pill-group">
                                {speechVoices.map((item) => (
                                    <button
                                        key={item.value}
                                        type="button"
                                        className={`access-pill${speechVoice === item.value ? " is-active" : ""}`}
                                        onClick={() => setSpeechVoice(item.value)}
                                        aria-pressed={speechVoice === item.value}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="access-field">
                            <div className="access-field__title">Velocidade</div>
                            <p className="access-field__help">
                                Ajuste o ritmo da leitura para acompanhar sua rotina.
                            </p>
                            <div className="access-pill-group">
                                {speechSpeeds.map((item) => (
                                    <button
                                        key={item.value}
                                        type="button"
                                        className={`access-pill${speechSpeed === item.value ? " is-active" : ""}`}
                                        onClick={() => setSpeechSpeed(item.value)}
                                        aria-pressed={speechSpeed === item.value}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="access-field">
                            <div className="access-field__title">Modo de leitura</div>
                            <p className="access-field__help">
                                Defina o nivel de detalhes durante a leitura.
                            </p>
                            <div className="access-pill-group">
                                {speechModes.map((item) => (
                                    <button
                                        key={item.value}
                                        type="button"
                                        className={`access-pill${speechMode === item.value ? " is-active" : ""}`}
                                        onClick={() => setSpeechMode(item.value)}
                                        aria-pressed={speechMode === item.value}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="access-preview access-preview--speech">
                            <div className="access-preview__title">Exemplo rapido</div>
                            <p className="access-preview__text">
                                "Bem-vindo a sua conta. Use as setas para navegar entre as
                                opcoes."
                            </p>
                            <div className="access-preview__actions">
                                <button type="button" className="access-primary">
                                    Ouvir exemplo
                                </button>
                                <button type="button" className="access-secondary">
                                    Editar frase
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Acessibilidade;