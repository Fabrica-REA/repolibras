import "../assets/css/header.css";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import home from "../assets/images/home_icon.svg";
import enviar from "../assets/images/send_icon.svg";
import avaliar from "../assets/images/clipboard_icon.svg";
import solicitacoes from "../assets/images/request_icon.svg";
import conta from "../assets/images/profile_icon.svg";
import estatisticas from "../assets/images/statistics_icon.svg";
import Home from "../pages/Home";
import Enviar from "../pages/Enviar";
import Solicitacoes from "../pages/Solicitacoes";
import Avaliar from "../pages/Avaliar";
import Gerenciar from "../pages/Gerenciar";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Estatistica from "../pages/Estatistica";
import Pesquisar from "../pages/Pesquisar";
import Conta from "../pages/Conta";
import { Pagina404 } from "../utils/Utilidades";
import { useUsuario } from "../context/usuarioContext";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ allowedRoles, element }) => {
  const { usuario } = useUsuario();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(usuario.acesso)) {
    return <Navigate to="/" replace />;
  }
  return element;
};

const Header = () => {
  const { usuario } = useUsuario();
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

  return (
    <>
      <header className="header">
        <div className="header-logo">
          <Link to="/">Repositório de Libras</Link>
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
                        to="/"
                        className="dropdown-item"
                        onClick={toggleDropdown}
                      >
                        <img src={home} alt="Home" className="dropdown-icon" />
                        Home
                      </Link>
                      {(isCadastrado || isProfessor || isAdministrador) && (
                        <Link
                          to="/enviar"
                          className="dropdown-item"
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
                          to="/solicitacoes"
                          className="dropdown-item"
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
                          to="/avaliar"
                          className="dropdown-item"
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
                          to="/estatistica"
                          className="dropdown-item"
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
                      <Link
                        to="/conta"
                        className="dropdown-item"
                        onClick={toggleDropdown}
                      >
                        <img
                          src={conta}
                          alt="Conta"
                          className="dropdown-icon"
                        />
                        Conta
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Link to="/" className="nav-button">
                    <button className="nav-button-circle">
                      <img src={home} alt="Home" />
                    </button>
                  </Link>
                  {(isCadastrado || isProfessor || isAdministrador) && (
                    <Link to="/enviar" className="nav-button">
                      <button className="nav-button-circle">
                        <img src={enviar} alt="Enviar" />
                      </button>
                    </Link>
                  )}
                  {(isProfessor || isAdministrador || isGestor) && (
                    <Link to="/solicitacoes" className="nav-button">
                      <button className="nav-button-circle">
                        <img src={solicitacoes} alt="Solicitações" />
                      </button>
                    </Link>
                  )}
                  {(isProfessor || isAdministrador) && (
                    <Link to="/avaliar" className="nav-button">
                      <button className="nav-button-circle">
                        <img src={avaliar} alt="Avaliar" />
                      </button>
                    </Link>
                  )}
                  {(isAdministrador || isGestor || isProfessor) && (
                    <Link to="/estatistica" className="nav-button">
                      <button className="nav-button-circle">
                        <img src={estatisticas} alt="Estatísticas" />
                      </button>
                    </Link>
                  )}
                  <Link to="/conta" className="nav-button">
                    <button className="nav-button-circle">
                      <img src={conta} alt="Conta" />
                    </button>
                  </Link>
                </>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="login-btn">
                Login
              </Link>
              <Link to="/cadastro" className="register-btn">
                Cadastro
              </Link>
            </>
          )}
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/enviar"
          element={
            <ProtectedRoute
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
          path="/avaliar"
          element={
            <ProtectedRoute
              allowedRoles={["professor", "administrador"]}
              element={<Avaliar />}
            />
          }
        />
        <Route
          path="/gerenciar"
          element={
            <ProtectedRoute
              allowedRoles={["professor", "administrador", "gestor"]}
              element={<Gerenciar />}
            />
          }
        />
        <Route
          path="/solicitacoes"
          element={
            <ProtectedRoute
              allowedRoles={["professor", "administrador", "gestor"]}
              element={<Solicitacoes />}
            />
          }
        />
        <Route
          path="/estatistica"
          element={
            <ProtectedRoute
              allowedRoles={["administrador", "gestor"]}
              element={<Estatistica />}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/pesquisar" element={<Pesquisar />} />
        <Route path="/conta" element={<Conta />} />
        <Route path="*" element={<Pagina404 />} />
      </Routes>
    </>
  );
};

export default Header;
