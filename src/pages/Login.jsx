import { useState } from "react";
import "../assets/css/login.css";
import { login } from "../api/Usuario";
import { useUsuario } from "../context/usuarioContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login: enviarInfo } = useUsuario();
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    login(email, password)
      .then((res) => {
        console.log(res.data);
        navigate("/")
        enviarInfo(res.data);
        setLoading(false);
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} method="post">
        <h1>Login</h1>
        <i className="pi pi-envelope">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$"
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
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            title="A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial"
            onInvalid={e => e.target.setCustomValidity("A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial")}
            onInput={e => e.target.setCustomValidity("")}
            required
          />
        </i>
        <button>
          {loading ? <li className="pi pi-spin pi-spinner"></li> : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
