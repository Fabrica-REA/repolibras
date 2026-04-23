import { useState } from "react";
import "../assets/css/login.css";
import { login, getSession } from "../api/Usuario";
import { useUsuario } from "../context/usuarioContext";
import { useNavigate, Link } from "react-router-dom";
import { base, ErrorMessage, Loading, validarEmail, validarSenha } from "../utils/Utilidades";

// Componente de Login
function Login() {
  // Estados para controlar os campos do formulário e feedbacks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login: enviarInfo } = useUsuario();
  const navigate = useNavigate();

  // Função para lidar com o login do usuário
  const handleLogin = (e) => {
    e.preventDefault();
    if (!validarEmail(email)) {
      setError("O email informado não é válido.");
      return;
    }
    if (!validarSenha(password)) {
      setError("A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial.");
      return;
    }
    setLoading(true);
    setError("");
    login(email, password)
      .then(() => {
        return getSession();
      })
      .then((sessionRes) => {
        if (!sessionRes.data?.authenticated || !sessionRes.data?.user) {
          throw new Error("Sessão inválida após login.");
        }

        enviarInfo(
          sessionRes.data.user,
          null,
          sessionRes.data.expiresAt,
          sessionRes.data.maxAgeMs
        );
        setLoading(false);
        setError("");
        navigate(`${base}`);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        setError(
          e?.response?.data?.error ||
          e?.response?.data?.message ||
          e?.message ||
          "Email ou senha inválidos."
        );
      });
  };

  if (loading) {
    return <Loading open={true} />;
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} method="post">
        <h1>Login</h1>
        <ErrorMessage error={error} onClose={() => setError("")} />
        <i className="pi pi-envelope">
          <input
            id="login-email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            title="Deve ser um email válido"
            onInvalid={e => e.target.setCustomValidity("Deve ser um email válido")}
            onInput={e => e.target.setCustomValidity("")}
            required
          />
        </i>
        <i className="pi pi-lock">
          <input
            id="login-password"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            maxLength={100}
            title="A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial"
            onInvalid={e => e.target.setCustomValidity("A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial")}
            onInput={e => e.target.setCustomValidity("")}
            required
          />
        </i>
        <button>Login</button>
        <div className="login-redirect-text">
          <span>Não tem uma conta? </span>
          <Link to={`${base}cadastro`} className="login-redirect-link">
            Cadastre-se
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;