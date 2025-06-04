import "../assets/css/perfil.css";
import { useState } from "react";
import Perfil from "../components/Perfil";

const options = [
  { key: "perfil", label: "Perfil", icon: " pi-user" },
  // { key: "config", label: "Configurações", icon: " pi-cog" },
  // { key: "access", label: "Acessibilidade", icon: "pi pi-eye" },
  // { key: "terms", label: "Termos ...", icon: "pi-file" },
];


const OptionContent = ({ selected }) => {
  switch (selected) {
    case "perfil":
      return <Perfil />;
    case "config":
      return (
        <div className="option-section">
          {/* Wireframe for Configurações */}
          <div className="setting-item"></div>
          <div className="setting-item"></div>
          <div className="setting-item"></div>
        </div>
      );
    case "access":
      return (
        <div className="option-section">
          {/* Wireframe for Acessibilidade */}
          <div className="toggle-placeholder"></div>
          <div className="slider-placeholder"></div>
        </div>
      );
    case "terms":
      return (
        <div className="option-section">
          {/* Wireframe for Termos ... */}
          <div className="text-block"></div>
          <div className="text-block short"></div>
        </div>
      );
    default:
      return null;
  }
};

const Conta = () => {
  const [selected, setSelected] = useState("perfil");
  return (
    <div className="profile-layout">
      <div className="options-container">
        <div className="options">
          {options.map((opt) => (
            <div
              key={opt.key}
              className={`option-item${selected === opt.key ? " selected" : ""
                }`}
              onClick={() => setSelected(opt.key)}
            >
              <div className="option-icon">
                <i className={`pi ${opt.icon}`} />
                {opt.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="content-container">
        <OptionContent selected={selected} />
      </div>
    </div>
  );
};

export default Conta;