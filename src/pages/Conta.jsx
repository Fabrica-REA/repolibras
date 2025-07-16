import "../assets/css/perfil.css";
import { useState, useEffect } from "react";
import Perfil from "../components/Perfil";

// Opções do menu lateral do perfil
const options = [
  { key: "perfil", label: "Perfil", icon: "pi-user" }
];

// Renderiza o conteúdo de acordo com a opção selecionada
const OptionContent = ({ selected }) => {
  switch (selected) {
    case "perfil":
      return <Perfil />;
    case "config":
      return (
        <div className="option-section">
          {/* Wireframe para Configurações */}
          <div className="setting-item"></div>
          <div className="setting-item"></div>
          <div className="setting-item"></div>
        </div>
      );
    case "access":
      return (
        <div className="option-section">
          {/* Wireframe para Acessibilidade */}
          <div className="toggle-placeholder"></div>
          <div className="slider-placeholder"></div>
        </div>
      );
    case "terms":
      return (
        <div className="option-section">
          {/* Wireframe para Termos ... */}
          <div className="text-block"></div>
          <div className="text-block short"></div>
        </div>
      );
    default:
      return null;
  }
};

const Conta = () => {
  // Estado para controlar opção selecionada e responsividade
  const [selected, setSelected] = useState("perfil");
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Alterna dropdown no mobile/tablet
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    // Detecta se é mobile/tablet
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth <= 1024); // Ponto de quebra para mobile/tablet
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="profile-layout">
      <div className="options-container">
        {isMobileOrTablet ? (
          <div className="dropdown-options">
            <li
              className="pi pi-align-justify dropdown-icon"
              onClick={toggleDropdown}
            />
            {showDropdown && (
              <ul className="dropdown-menu">
                {options.map((opt) => (
                  <li
                    key={opt.key}
                    className={`dropdown-item-perfil${
                      selected === opt.key ? " selected" : ""
                    }`}
                    onClick={() => {
                      setSelected(opt.key);
                      setShowDropdown(false); // Fecha dropdown após seleção
                    }}
                  >
                    <i className={`pi ${opt.icon} dropdown-item-icon`} />
                    {opt.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="options">
            {options.map((opt) => (
              <div
                key={opt.key}
                className={`option-item${selected === opt.key ? " selected" : ""}`}
                onClick={() => setSelected(opt.key)}
              >
                <div className="option-icon">
                  <i className={`pi ${opt.icon}`} />
                  {opt.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="content-container">
        <OptionContent selected={selected} />
      </div>
    </div>
  );
};

export default Conta;