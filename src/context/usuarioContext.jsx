import { createContext, useContext, useEffect, useState, useRef } from "react";
import { logout as apiLogout, getSession } from "../api/Usuario";

// Cria contexto do usuário
const UsuarioContext = createContext({
  usuario: null,
  token: null,
  login: () => {},
  cadastro: () => {},
  logout: () => {},
});

// Provider do contexto do usuário
export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token] = useState(null);
  const [loading, setLoading] = useState(true);
  const usuarioRef = useRef(null);
  const sessionTimeoutRef = useRef(null);

  const startSessionTimeout = (expiresAt, maxAgeMs) => {
    clearSessionTimeout();

    let timeoutDuration = null;
    if (expiresAt) {
      timeoutDuration = new Date(expiresAt).getTime() - Date.now();
    } else if (typeof maxAgeMs === "number") {
      timeoutDuration = maxAgeMs;
    }

    if (typeof timeoutDuration !== "number") {
      return;
    }

    if (timeoutDuration > 0) {
      sessionTimeoutRef.current = setTimeout(() => {
        clearSession();
      }, timeoutDuration);
    } else {
      clearSession();
    }
  };

  const applySessionPayload = (payload) => {
    const isAuthenticated = payload?.authenticated ?? Boolean(payload?.user);
    const sessionUser = payload?.user ?? null;

    if (!isAuthenticated || !sessionUser) {
      clearSession();
      return false;
    }

    setUsuario(sessionUser);
    usuarioRef.current = sessionUser;
    startSessionTimeout(payload.expiresAt, payload.maxAgeMs);
    return true;
  };

  // Mantém usuarioRef sincronizado com o estado usuario
  useEffect(() => {
    usuarioRef.current = usuario;
  }, [usuario]);

  // Busca sessão do usuário ao montar o componente
  useEffect(() => {
    setLoading(true);
    getSession()
      .then((res) => {
        applySessionPayload(res.data);
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
    usuarioRef.current = null;
    clearSessionTimeout();
  };

  // Função de login
  const login = (data, _tokenParam, expiresAt, maxAgeMs) => {
    if (!data) {
      clearSession();
      return;
    }
    setUsuario(data);
    usuarioRef.current = data;
    startSessionTimeout(expiresAt, maxAgeMs);
  };

  // Função de cadastro
  const cadastro = (data, _tokenParam, expiresAt, maxAgeMs) => {
    if (!data) {
      clearSession();
      return;
    }
    setUsuario(data);
    usuarioRef.current = data;
    startSessionTimeout(expiresAt, maxAgeMs);
  };

  // Função de logout
  const logout = async () => {
    try {
      await apiLogout(token);
    } catch (e) {
      console.error("Erro ao fazer logout:", e);
    }
    clearSession();
  };

  const safeUsuario = loading ? null : (usuario || usuarioRef.current);

  return (
    <UsuarioContext.Provider value={{ usuario: safeUsuario, token, login, cadastro, logout, usuarioRef, loading }}>
      {children}
    </UsuarioContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUsuario = () => useContext(UsuarioContext);
