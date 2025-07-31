import { createContext, useContext, useEffect, useState, useRef } from "react";
import { logout as apiLogout, getSession } from "../api/Usuario";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

// Cria contexto do usuário
const UsuarioContext = createContext({
  usuario: null,
  token: null,
  login: () => { },
  cadastro: () => { },
  logout: () => { },
});

// Provider do contexto do usuário
export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const storedUser = localStorage.getItem("usuario");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const usuarioRef = useRef(null);
  const sessionTimeoutRef = useRef(null);

  // Mantém usuarioRef sincronizado com o estado usuario
  useEffect(() => {
    usuarioRef.current = usuario;
  }, [usuario]);

  // Busca sessão do usuário ao montar o componente
  useEffect(() => {
    setLoading(true); // Inicia o carregamento antes da chamada da API
    getSession()
      .then((res) => {
        if (res.data) {
          setUsuario(res.data.user);
          setToken(res.data.token);
          usuarioRef.current = res.data.user;
          localStorage.setItem("usuario", JSON.stringify(res.data.user));
          localStorage.setItem("token", res.data.token);
          if (res.data.expiration) startSessionTimeout(res.data.expiration);
        } else {
          clearSession();
        }
      })
      .catch(() => {
        clearSession();
      })
      .finally(() => {
        setLoading(false); // Encerra o carregamento após a chamada da API
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
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
  };

  // Função de login
  const login = (data, tokenParam, expiration) => {
    if (!data) return;
    setUsuario(data);
    setToken(tokenParam);
    usuarioRef.current = data;
    localStorage.setItem("usuario", JSON.stringify(data));
    localStorage.setItem("token", tokenParam);
    if (expiration) startSessionTimeout(expiration);
  };

  // Função de cadastro
  const cadastro = (data, tokenParam, expiration) => {
    if (!data) return;
    setUsuario(data);
    setToken(tokenParam);
    usuarioRef.current = data;
    localStorage.setItem("usuario", JSON.stringify(data));
    localStorage.setItem("token", tokenParam);
    if (expiration) startSessionTimeout(expiration);
  };

  // Função de logout
  const logout = async () => {
    try {
      await apiLogout(token);
    } catch (e) {
      console.error("Erro ao fazer logout:", e);
    }
    clearSession();
    clearSessionTimeout();
  };

  // Fornece fallback para usuario para evitar erros nulos nos consumidores
  const safeUsuario = loading ? {} : (usuario || usuarioRef.current);

  return (
    <UsuarioContext.Provider value={{ usuario: safeUsuario, token, login, cadastro, logout, usuarioRef, loading }}>
      {children}
    </UsuarioContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUsuario = () => useContext(UsuarioContext);
