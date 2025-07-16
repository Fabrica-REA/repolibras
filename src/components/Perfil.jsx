import { useState, useRef, useEffect } from "react";
import imgPerfil from "../assets/images/profile_icon.svg";
import { ActionButton, Loading } from "../utils/Utilidades";
import { useUsuario } from "../context/usuarioContext";
import { editarCredenciais } from "../api/Usuario";

const Perfil = () => {
  const { usuario, token } = useUsuario();
  const [avatar] = useState(imgPerfil);
  const [username, setUsername] = useState(usuario?.nome || "");
  const [email, setEmail] = useState(usuario?.email || "");
  const [password, setPassword] = useState(usuario?.senha || "");
  const [ConfirmPassword, setConfirmPassword] = useState(usuario?.senha || "");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = useRef({
    avatar: usuario?.avatar || "",
    username: usuario?.nome || "",
    email: usuario?.email || "",
    password: usuario?.senha || "",
    ConfirmPassword: usuario?.senha || "",
  });

  useEffect(() => {
    if (usuario) {
      setUsername(usuario.nome || "");
      setEmail(usuario.email || "");
      setPassword(usuario.senha || "");
      setConfirmPassword(usuario.senha || "");
      initialValues.current = {
        avatar: usuario.avatar || "",
        username: usuario.nome || "",
        email: usuario.email || "",
        password: usuario.senha || "",
        ConfirmPassword: usuario.senha || "",
      };
    }
  }, [usuario]);

  if (!usuario) {
    return <Loading open={true} />;
  }

  const handleEdit = (usuario, username, email, password) => {
    editarCredenciais(
      usuario.id,
      username,
      email,
      password,
      token
    ).then((res) => console.log(res)).catch((e) => console.log(e))
    setTimeout(() => window.location.reload(), 800);
  };

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
          </label>
        </div>
      </div>
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
        <div style={{ position: "relative" }}>
          <input
            id="senha"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="profile-input"
            minLength={8}
          />
          <span
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={0}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            <i className={`pi ${showPassword ? "pi-eye-slash" : "pi-eye"}`} />
          </span>
        </div>
        <label htmlFor="confirmeSenha">Confirme sua Senha:</label>
        <div style={{ position: "relative" }}>
          <input
            id="confirmeSenha"
            type={showConfirmPassword ? "text" : "password"}
            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="profile-input"
            minLength={8}
          />
          <span
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            tabIndex={0}
            aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            <i className={`pi ${showConfirmPassword ? "pi-eye-slash" : "pi-eye"}`} />
          </span>
        </div>
        <div className="profile-actions">
          {!isChanged ? (
            <button
              className="btn"
              type="submit"
              onClick={handleEdit}
              disabled={!isChanged}
            >
              {" "}
              Salvar Mudanças
            </button>
          ) : (
            <ActionButton
              type={"confirm"}
              class={"btn"}
              title={"Confirmar Alteração"}
              endMessage="Credenciais alteradas com sucesso!"
              message={"Tem certeza que deseja alterar suas credenciais?"}
              action={() => handleEdit(usuario, username, email, password, avatar)}
            >
              Salvar Mudanças
            </ActionButton>
          )}
          <button className="btn">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default Perfil;