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
        {/* <i className='pi pi-envelope'>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} minLength={8} maxLength={100} pattern='^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$' onInvalid={e => e.target.setCustomValidity("Deve ser um email válido")} required />
            </i>
            <i className='pi pi-lock'>
                <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} maxLength={100} pattern='' onInvalid={e => e.target.setCustomValidity("A senha deve conter 8 caracteres")} required />
            </i> */}
        <i className="pi pi-envelope">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </i>
        <i className="pi pi-lock">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
