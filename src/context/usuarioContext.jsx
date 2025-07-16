import axios from "axios";
import { createContext, useContext, useEffect, useState, useRef } from "react";

// Cria contexto do usuário
const UsuarioContext = createContext({
  usuario: null,
  token: null,
  login: (data, token) => UsuarioProvider.login(data, token),
  cadastro: (data, token) => UsuarioProvider.cadastro(data, token),
  logout: () => UsuarioProvider.logout(),
});

// Provider do contexto do usuário
export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const usuarioRef = useRef(null); 
  const sessionTimeoutRef = useRef(null); 

  console.log(usuarioRef.current);

  // Mantém usuarioRef sincronizado com o estado usuario
  useEffect(() => {
    usuarioRef.current = usuario;
  }, [usuario]);

  // Busca sessão do usuário ao montar o componente
  useEffect(() => {
    axios.get("http://localhost:5002/librasapi/session", {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
      .then((res) => {
        if (res.data) {
          setUsuario(res.data.user);
          setToken(res.data.token);
          usuarioRef.current = res.data.user;
          if (res.data.expiration) startSessionTimeout(res.data.expiration);
        } else {
          clearSession();
        }
      })
      .catch(() => {
        clearSession();
      });

    return () => {
      clearSessionTimeout();
    };
  }, []);

  // Inicia timeout da sessão
  const startSessionTimeout = (expiration) => {
    clearSessionTimeout();
    const timeoutDuration = new Date(expiration).getTime() - Date.now();
    if (timeoutDuration > 0) {
      sessionTimeoutRef.current = setTimeout(() => {
        clearSession();
      }, timeoutDuration);
    } else {
      clearSession();
    }
  };

  // Limpa timeout da sessão
  const clearSessionTimeout = () => {
    if (sessionTimeoutRef.current) {
      clearTimeout(sessionTimeoutRef.current);
      sessionTimeoutRef.current = null;
    }
  };

  // Limpa sessão do usuário
  const clearSession = () => {
    setUsuario(null);
    setToken(null);
    usuarioRef.current = null;
  };

  // Função de login
  const login = (data, tokenParam, expiration) => {
    if (!data) return;
    setUsuario(data);
    setToken(tokenParam);
    usuarioRef.current = data;
    if (expiration) startSessionTimeout(expiration);
  };

  // Função de cadastro
  const cadastro = (data, tokenParam, expiration) => {
    if (!data) return;
    setUsuario(data);
    setToken(tokenParam);
    usuarioRef.current = data;
    if (expiration) startSessionTimeout(expiration);
  };

  // Função de logout
  const logout = () => {
    clearSession();
    clearSessionTimeout();
  };

  // Fornece fallback para usuario para evitar erros nulos nos consumidores (ex: Header.jsx)
  const safeUsuario = usuario || usuarioRef.current || {};

  return (
    <UsuarioContext.Provider value={{ usuario: safeUsuario, token, login, cadastro, logout, usuarioRef }}>
      {children}
    </UsuarioContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUsuario = () => useContext(UsuarioContext);
