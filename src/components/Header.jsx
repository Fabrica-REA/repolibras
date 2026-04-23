import "../assets/css/header.css";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import home from "../assets/images/home_icon.svg";
import enviar from "../assets/images/send_icon.svg";
import avaliar from "../assets/images/clipboard_icon.svg";
import solicitacoes from "../assets/images/solicitation_icon.svg";
import conta from "../assets/images/profile_icon.svg";
import estatisticas from "../assets/images/statistics_icon.svg";
import { Suspense, lazy, useState, useEffect } from "react";
import { base, Pagina404, Loading } from "../utils/Utilidades";
import { useUsuario } from "../context/usuarioContext";

// Carregamento dinâmico (lazy load) das páginas
const Home = lazy(() => import("../pages/Home"));
const Enviar = lazy(() => import("../pages/Enviar"));
const Solicitacoes = lazy(() => import("../pages/Solicitacoes"));
const Avaliar = lazy(() => import("../pages/Avaliar"));
const Gerenciar = lazy(() => import("../pages/Gerenciar"));
const Login = lazy(() => import("../pages/Login"));
const Cadastro = lazy(() => import("../pages/Cadastro"));
const Estatistica = lazy(() => import("../pages/Estatistica"));
const Pesquisar = lazy(() => import("../pages/Pesquisar"));
const Conta = lazy(() => import("../pages/Conta"));
const BASE_URL = import.meta.env.BASE_URL; 

// Rota protegida: só permite acesso se o usuário estiver autenticado e tiver o papel permitido
const ProtectedRoute = ({ allowedRoles, element, loading }) => {
  const { usuario } = useUsuario();

  if (loading) {
    return <Loading open={true} />;
  }

  if (!usuario?.acesso || !allowedRoles.includes(usuario.acesso)) {
    return <Navigate to={`${base}login`} replace />;
  }
  return element;
};

//bloqueia login/cadastro quando o usuário já está autenticado
const GuestRoute = ({ element, loading }) => {
  const { usuario } = useUsuario();

  if (loading) {
    return <Loading open={true} />;
  }

  if (usuario) {
    return <Navigate to={base} replace />;
  }

  return element;
};

const Header = () => {
  const { usuario, loading } = useUsuario();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isCadastrado = usuario?.acesso === "cadastrado";
  const isProfessor = usuario?.acesso === "professor";
  const isAdministrador = usuario?.acesso === "administrador";
  const isGestor = usuario?.acesso === "gestor";

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper to prefix base to all routes
  const withBase = (path) => (BASE_URL.endsWith("/") && path.startsWith("/") ? BASE_URL.slice(0, -1) + path : BASE_URL + path);

  return (
    <>
      <header className="header">
        <div className="header-logo">
          <Link to={withBase("/")}>SignConverse</Link>
        </div>
        <nav className="header-nav">
          {usuario ? (
            <>
              {isMobile ? (
                <>
                  <button
                    className="menu-button-circle"
                    onClick={toggleDropdown}
                  >
                    <img src={home} alt="Menu" />
                  </button>
                  {showDropdown && (
                    <div className="dropdown-menu">
                      <Link
                        to={withBase("/")}
                        className="dropdown-item-header"
                        onClick={toggleDropdown}
                      >
                        <img src={home} alt="Home" className="dropdown-icon" />
                        Home
                      </Link>
                      {(isCadastrado || isProfessor || isAdministrador) && (
                        <Link
                          to={withBase("/enviar")}
                          className="dropdown-item-header"
                          onClick={toggleDropdown}
                        >
                          <img
                            src={enviar}
                            alt="Enviar"
                            className="dropdown-icon"
                          />
                          Enviar
                        </Link>
                      )}
                      {(isProfessor || isAdministrador || isGestor) && (
                        <Link
                          to={withBase("/solicitacoes")}
                          className="dropdown-item-header"
                          onClick={toggleDropdown}
                        >
                          <img
                            src={solicitacoes}
                            alt="Solicitações"
                            className="dropdown-icon"
                          />
                          Solicitações
                        </Link>
                      )}
                      {(isProfessor || isAdministrador) && (
                        <Link
                          to={withBase("/avaliar")}
                          className="dropdown-item-header"
                          onClick={toggleDropdown}
                        >
                          <img
                            src={avaliar}
                            alt="Avaliar"
                            className="dropdown-icon"
                          />
                          Avaliar
                        </Link>
                      )}
                      {(isAdministrador || isGestor || isProfessor) && (
                        <Link
                          to={withBase("/estatistica")}
                          className="dropdown-item-header"
                          onClick={toggleDropdown}
                        >
                          <img
                            src={estatisticas}
                            alt="Estatísticas"
                            className="dropdown-icon"
                          />
                          Estatísticas
                        </Link>
                      )}
                      {(isCadastrado || isProfessor || isAdministrador || isGestor) && (
                        <Link
                          to={withBase("/conta")}
                          className="dropdown-item-header"
                          onClick={toggleDropdown}
                        >
                          <img
                            src={conta}
                            alt="Conta"
                            className="dropdown-icon"
                          />
                          Conta
                        </Link>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Link to={withBase("/")} className="nav-button">
                    <button className="nav-button-circle">
                      <img src={home} alt="Home" />
                    </button>
                  </Link>
                  {(isCadastrado || isProfessor || isAdministrador) && (
                    <Link to={withBase("/enviar")} className="nav-button">
                      <button className="nav-button-circle">
                        <img src={enviar} alt="Enviar" />
                      </button>
                    </Link>
                  )}
                  {(isProfessor || isAdministrador || isGestor) && (
                    <Link to={withBase("/solicitacoes")} className="nav-button">
                      <button className="nav-button-circle">
                        <img src={solicitacoes} alt="Solicitações" />
                      </button>
                    </Link>
                  )}
                  {(isProfessor || isAdministrador) && (
                    <Link to={withBase("/avaliar")} className="nav-button">
                      <button className="nav-button-circle">
                        <img src={avaliar} alt="Avaliar" />
                      </button>
                    </Link>
                  )}
                  {(isAdministrador || isGestor || isProfessor) && (
                    <Link to={withBase("/estatistica")} className="nav-button">
                      <button className="nav-button-circle">
                        <img src={estatisticas} alt="Estatísticas" />
                      </button>
                    </Link>
                  )}
                  {(isCadastrado || isProfessor || isAdministrador || isGestor) && (
                    <Link to={withBase("/conta")} className="nav-button">
                      <button className="nav-button-circle">
                        <img src={conta} alt="Conta" />
                      </button>
                    </Link>
                  )}
                </>
              )}
            </>
          ) : (
            <Link to={withBase("/login")} className="login-btn">
              Login
            </Link>
          )}
        </nav>
      </header>
      <Suspense fallback={<Loading open={true} />}>
        <Routes>
          <Route path={BASE_URL} element={<Home />} />
          <Route
            path={withBase("/enviar")}
            element={
              <ProtectedRoute
                loading={loading}
                allowedRoles={[
                  "cadastrado",
                  "professor",
                  "administrador",
                  "gestor",
                ]}
                element={<Enviar />}
              />
            }
          />
          <Route
            path={withBase("/avaliar")}
            element={
              <ProtectedRoute
                loading={loading}
                allowedRoles={["professor", "administrador"]}
                element={<Avaliar />}
              />
            }
          />
          <Route
            path={withBase("/gerenciar")}
            element={
              <ProtectedRoute
                loading={loading}
                allowedRoles={["professor", "administrador", "gestor"]}
                element={<Gerenciar />}
              />
            }
          />
          <Route
            path={withBase("/solicitacoes")}
            element={
              <ProtectedRoute
                loading={loading}
                allowedRoles={["professor", "administrador", "gestor"]}
                element={<Solicitacoes />}
              />
            }
          />
          <Route
            path={withBase("/estatistica")}
            element={
              <ProtectedRoute
                loading={loading}
                allowedRoles={["administrador", "gestor"]}
                element={<Estatistica />}
              />
            }
          />
          <Route
            path={withBase("/conta")}
            element={
              <ProtectedRoute
                loading={loading}
                allowedRoles={["administrador", "gestor", "professor", "cadastrado"]}
                element={<Conta />}
              />
            }
          />
          <Route
            path={withBase("/login")}
            element={<GuestRoute loading={loading} element={<Login />} />}
          />
          <Route
            path={withBase("/cadastro")}
            element={<GuestRoute loading={loading} element={<Cadastro />} />}
          />
          <Route path={withBase("/pesquisar")} element={<Pesquisar />} />
          <Route path="*" element={<Pagina404 />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Header;
