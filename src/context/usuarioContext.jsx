import { createContext, useContext, useState } from "react";

const UsuarioContext = createContext({
    usuario: null,
    login: (data) => UsuarioProvider.login(data),
    cadastro: (data) => UsuarioProvider.cadastro(data),
    logout: () => UsuarioProvider.logout(),
})

export const UsuarioProvider = ({ children }) => {
    const [usuario, setusuario] = useState(null);

    const login = (data) => {
        if (!data.usuario) {
            return;
        }
        setusuario(data.usuario);
    }

    const cadastro = (data) => {
        if (!data.usuario) {
            return;
        }
        setusuario(data.usuario);
    }

    const logout = () => {
        if (!usuario) {
            return;
        }
        setusuario(null);
    }

    return (
        <UsuarioContext.Provider value={{ usuario, login, cadastro, logout }}>
            {children}
        </UsuarioContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUsuario = () => useContext(UsuarioContext)