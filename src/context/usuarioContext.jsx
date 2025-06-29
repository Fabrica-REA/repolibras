import { createContext, useContext, useState } from "react";

const UsuarioContext = createContext({
  usuario: null,
  login: (data) => UsuarioProvider.login(data),
  cadastro: (data) => UsuarioProvider.cadastro(data),
  logout: () => UsuarioProvider.logout(),
});

export const UsuarioProvider = ({ children }) => {
  //for testing purposes, you can remove this later
  // const [usuario, setUsuario] = useState({ id: "1" ,nome: "Teste", email: "teste@gmail.com", senha: "12345678", acesso: "administrador" });
  const [usuario, setUsuario] = useState(null);
  console.log(usuario);

  const login = (data) => {
    if (!data) {
      return;
    }
    setUsuario(data);
  };

  const cadastro = (data) => {
    if (!data.usuario) {
      return;
    }
    setUsuario(data);
  };

  const logout = () => {
    if (!usuario) {
      return;
    }
    setUsuario(null);
  };

  return (
    <UsuarioContext.Provider value={{ usuario, login, cadastro, logout }}>
      {children}
    </UsuarioContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUsuario = () => useContext(UsuarioContext);
