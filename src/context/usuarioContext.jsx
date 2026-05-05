import { createContext, useContext, useEffect, useState, useRef } from "react";
import { logout as apiLogout, getSession, atualizarAcessibilidade as apiAtualizarAcessibilidade } from "../api/Usuario";
import { applyAccessibilityPlugins, registerBuiltInAccessibilityPlugins } from "../utils/accessibilityPlugins";

const DEFAULT_ACESSIBILIDADE = {
  daltonismoAtivo: false,
  daltonicoTipo: "normal",
  textoFaladoAtivo: false,
  pluginsTTS: [],
};

const DALTONISMO_VALIDOS = ["normal", "protanopia", "deuteranopia", "tritanopia", "achromatopsia"];

const getAccessibilityStorageKey = (userId) => `rlibras:acessibilidade:${userId}`;

const readStoredAcessibilidade = (userId) => {
  if (!userId || typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(getAccessibilityStorageKey(userId));
    return rawValue ? JSON.parse(rawValue) : null;
  } catch {
    return null;
  }
};

const writeStoredAcessibilidade = (userId, acessibilidade) => {
  if (!userId || typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(getAccessibilityStorageKey(userId), JSON.stringify(acessibilidade));
  } catch {
    // localStorage can be unavailable or full; API persistence still applies.
  }
};

const normalizeAcessibilidade = (rawAcessibilidade) => {
  const base = { ...DEFAULT_ACESSIBILIDADE, ...(rawAcessibilidade || {}) };
  return {
    daltonismoAtivo: Boolean(base.daltonismoAtivo),
    daltonicoTipo: DALTONISMO_VALIDOS.includes(base.daltonicoTipo) ? base.daltonicoTipo : "normal",
    textoFaladoAtivo: Boolean(base.textoFaladoAtivo),
    pluginsTTS: Array.isArray(base.pluginsTTS) ? base.pluginsTTS : [],
  };
};

const mergeUsuarioAcessibilidade = (user) => {
  if (!user) {
    return null;
  }

  const storedAcessibilidade = readStoredAcessibilidade(user.id);

  return {
    ...user,
    acessibilidade: normalizeAcessibilidade(user.acessibilidade || storedAcessibilidade),
  };
};

// Cria contexto do usuário
const UsuarioContext = createContext({
  usuario: null,
  token: null,
  login: () => {},
  cadastro: () => {},
  logout: () => {},
  atualizarAcessibilidade: async () => ({}),
});

// Provider do contexto do usuário
export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token] = useState(null);
  const [loading, setLoading] = useState(true);
  const usuarioRef = useRef(null);
  const sessionTimeoutRef = useRef(null);
  const acessibilidadeMutationRef = useRef(0);

  useEffect(() => {
    if (usuario?.id && usuario?.acessibilidade) {
      writeStoredAcessibilidade(usuario.id, usuario.acessibilidade);
    }
  }, [usuario]);

  useEffect(() => {
    registerBuiltInAccessibilityPlugins();
  }, []);

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
    const sessionUser = mergeUsuarioAcessibilidade(payload?.user ?? null);

    if (!isAuthenticated || !sessionUser) {
      clearSession();
      return false;
    }

    setUsuario(sessionUser);
    usuarioRef.current = sessionUser;
    writeStoredAcessibilidade(sessionUser.id, sessionUser.acessibilidade);
    applyAccessibilityPlugins(sessionUser.acessibilidade).catch(() => {});
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
    const normalizedUser = mergeUsuarioAcessibilidade(data);
    setUsuario(normalizedUser);
    usuarioRef.current = normalizedUser;
    writeStoredAcessibilidade(normalizedUser.id, normalizedUser.acessibilidade);
    applyAccessibilityPlugins(normalizedUser.acessibilidade).catch(() => {});
    startSessionTimeout(expiresAt, maxAgeMs);
  };

  // Função de cadastro
  const cadastro = (data, _tokenParam, expiresAt, maxAgeMs) => {
    if (!data) {
      clearSession();
      return;
    }
    const normalizedUser = mergeUsuarioAcessibilidade(data);
    setUsuario(normalizedUser);
    usuarioRef.current = normalizedUser;
    writeStoredAcessibilidade(normalizedUser.id, normalizedUser.acessibilidade);
    applyAccessibilityPlugins(normalizedUser.acessibilidade).catch(() => {});
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

  const atualizarAcessibilidade = async (acessibilidadeParcial) => {
    const currentUser = usuarioRef.current;

    if (!currentUser?.id) {
      throw new Error("Usuario nao autenticado para atualizar acessibilidade.");
    }

    const acessibilidadeAtualizada = normalizeAcessibilidade({
      ...currentUser.acessibilidade,
      ...acessibilidadeParcial,
    });

    const previousUser = currentUser;
    const mutationId = acessibilidadeMutationRef.current + 1;
    acessibilidadeMutationRef.current = mutationId;

    const optimisticUser = {
      ...currentUser,
      acessibilidade: acessibilidadeAtualizada,
    };

    setUsuario(optimisticUser);
    usuarioRef.current = optimisticUser;
    writeStoredAcessibilidade(optimisticUser.id, optimisticUser.acessibilidade);
    await applyAccessibilityPlugins(acessibilidadeAtualizada);

    try {
      const result = await apiAtualizarAcessibilidade(currentUser.id, acessibilidadeAtualizada, token);

      if (mutationId !== acessibilidadeMutationRef.current) {
        return result;
      }

      const responseUser = result?.data?.user || result?.data?.usuario;

      if (responseUser) {
        const normalizedResponseUser = mergeUsuarioAcessibilidade(responseUser);
        setUsuario(normalizedResponseUser);
        usuarioRef.current = normalizedResponseUser;
      }

      return result;
    } catch (error) {
      if (mutationId !== acessibilidadeMutationRef.current) {
        throw error;
      }

      setUsuario(previousUser);
      usuarioRef.current = previousUser;
      writeStoredAcessibilidade(previousUser.id, previousUser.acessibilidade);
      await applyAccessibilityPlugins(previousUser.acessibilidade);
      throw error;
    }
  };

  const safeUsuario = loading ? null : (usuario || usuarioRef.current);

  return (
    <UsuarioContext.Provider value={{ usuario: safeUsuario, token, login, cadastro, logout, atualizarAcessibilidade, usuarioRef, loading }}>
      {children}
    </UsuarioContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUsuario = () => useContext(UsuarioContext);
