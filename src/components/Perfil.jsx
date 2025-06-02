import "../assets/css/perfil.css";
import imgPerfil from "../assets/images/profile_icon.svg";
import { useState } from "react";

const options = [
  { key: "perfil", label: "Perfil", icon: " pi-user" },
  { key: "config", label: "Configurações", icon: " pi-cog" },
  { key: "access", label: "Acessibilidade", icon: "pi pi-eye" },
  { key: "terms", label: "Termos ...", icon: "pi-file" },
];

const ConteudoPerfil = () => {
  const [avatar, setAvatar] = useState(imgPerfil);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatar(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="option-container">
      <div className="profile">
        <div className="avatar editable-avatar">
          <label htmlFor="avatar-upload" className="avatar-label">
            <img src={avatar} alt="Avatar" className="avatar-img" />
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
              readOnly
            />
            <span className="edit-avatar-text">Editar</span>
          </label>
        </div>
      </div>
      <div className="info">
        <label className="profile-label">
          Nome de usuário:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="profile-input"
            readOnly
          />
        </label>
        <label className="profile-label">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="profile-input"
            readOnly
          />
        </label>
        <label className="profile-label">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="profile-input"
            readOnly
          />
        </label>
      </div>
    </div>
  );
};

const OptionContent = ({ selected }) => {
  switch (selected) {
    case "perfil":
      return <ConteudoPerfil />;
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

const Perfil = () => {
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

export default Perfil;
