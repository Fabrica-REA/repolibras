import { useState, useRef, use } from "react";
import imgPerfil from "../assets/images/profile_icon.svg";
import { ActionButton } from "../utils/Utilidades";
import { useUsuario } from "../context/usuarioContext";
import { editarCredenciais } from "../api/Usuario";

const Perfil = () => {
  const { usuario } = useUsuario();
  const [avatar, setAvatar] = useState(imgPerfil);
  const [username, setUsername] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [password, setPassword] = useState(usuario.senha);
  const [ConfirmPassword, setConfirmPassword] = useState(usuario.senha);

  const [edit, setEdit] = useState({
    avatar: false,
    username: false,
    email: false,
    password: false,
    ConfirmPassword: false,
  });

  const handleEdit = (username, email, password) => {
    // editarCredenciais(username, email, password)
    //   .then((res) => {})
    //   .catch((e) => console.log(e));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatar(ev.target.result);
      reader.readAsDataURL(file);
    }
    setEdit((prev) => ({ ...prev, avatar: false }));
  };

  // Store initial values in refs so they don't change on re-render
  const initialValues = useRef({
    avatar: imgPerfil,
    username: usuario.nome,
    email: usuario.email,
    password: usuario.senha,
    ConfirmPassword: usuario.senha,
  });

  const isChanged =
    avatar !== initialValues.current.avatar ||
    username !== initialValues.current.username ||
    email !== initialValues.current.email ||
    password !== initialValues.current.password ||
    ConfirmPassword !== initialValues.current.ConfirmPassword;

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
            />
            <span
              className="edit-avatar-text"
              onClick={() => handleEdit("avatar")}
            >
              <i className="pi pi-pencil" />
            </span>
          </label>
        </div>
      </div>
      {/* {Profile img section} */}

      <form className="profile-form">
        <label htmlFor="nomeCompleto">Nome Completo:</label>
        <input
          id="nomeCompleto"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="profile-input"
          minLength={2}
          maxLength={100}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="profile-input"
        />
        <label htmlFor="senha">Senha:</label>
        <input
          id="senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="profile-input"
          minLength={8}
        />
        <label htmlFor="confirmeSenha">Confirme sua Senha:</label>
        <input
          id="confirmeSenha"
          type="password"
          value={ConfirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="profile-input"
          minLength={8}
        />
        <div className="profile-actions">
          {!isChanged
            ? (<button className="btn" type="submit" onClick={handleEdit} disabled={!isChanged}> Salvar Mudanças</button>)
            : (<ActionButton type={"confirm"} class={"btn"} title={"Confirmar Alteração"} message={"Tem certeza que dejeja alterar suas credenciais?"}>Salvar Mudanças</ActionButton>)}
          <button className="btn">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default Perfil;
