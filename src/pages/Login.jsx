import { useState } from "react";
import "../assets/css/login.css";
import { login } from "../api/Usuario";
import { useUsuario } from "../context/usuarioContext";
import { useNavigate, Link } from "react-router-dom";
import { ErrorMessage, validarEmail, validarSenha } from "../utils/Utilidades"; 
import axios from "axios";

// Componente de Login
function Login() {
  // Estados para controlar os campos do formulário e feedbacks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  const { login: enviarInfo } = useUsuario();
  const navigate = useNavigate()

  // Função para lidar com o login do usuário
  const handleLogin = (e) => {
    e.preventDefault();
    // Validação antes de enviar
    // Verifica se o email é válido
    if (!validarEmail(email)) {
      setError("O email informado não é válido.");
      return;
    }
    // Verifica se a senha atende aos requisitos
    if (!validarSenha(password)) {
      setError("A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial.");
      return;
    }
    setLoading(true);
    setError("");
    // Realiza o login e busca a sessão do usuário
    login(email, password)
      .then(() => {
        return axios.get("http://localhost:5002/librasapi/session", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
      })
      .then((sessionRes) => {
        // Atualiza o contexto com os dados do usuário e token
        const user = sessionRes.data.user || sessionRes.data;
        const token = sessionRes.data.token;
        enviarInfo(user, token);
        setLoading(false);
        setError("");
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        // Tenta obter a mensagem de erro da resposta da API, senão usa padrão
        setError(
          e?.response?.data?.error ||
          e?.response?.data?.message ||
          e?.message ||
          "Email ou senha inválidos."
        );
      });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} method="post">
        <h1>Login</h1>
        <ErrorMessage error={error} onClose={() => setError("")} />
        <i className="pi pi-envelope">
          <input
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
        <button>
          {loading ? <li className="pi pi-spin pi-spinner"></li> : "Login"}
        </button>
        <div className="login-redirect-text">
          <span>Não tem uma conta? </span>
          <Link to="/cadastro" className="login-redirect-link">
            Cadastre-se
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
