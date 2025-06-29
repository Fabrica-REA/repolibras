import { getUsuarios } from "../api/Usuario";
import { editUsuarioAcesso } from "../api/gerenciar";
import "../assets/css/gerenciar.css";
import { useEffect, useState } from "react";
import { Loading } from "../utils/Utilidades";



const GerenciarUsuarios = () => {
    const [users, setUsers] = useState([]);
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(true);
    const acessoOptions = ["professor", "administrador", "gestor", "cadastrado"];

    const handleEdit = (id) => {
        setEditing(id);
    };

    const handleChange = async (userId, value) => {
        const updated = users.map(u =>
            u.Id === userId ? { ...u, Login: value } : u
        );
        try {
            await editUsuarioAcesso(userId, value);
            setUsers(updated);
        } catch (e) {
            console.error(e);
        }
        setEditing(null);
        setLoading(false);
    };

    const handleBlur = () => {
        setEditing(null);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleBlur();
    };

    useEffect(() => {
        getUsuarios()
            .then((res) => setUsers(res.data))
            .catch(e => console.log(e))
            .finally(() => setLoading(false));
    }, [])

    console.log(users);

    return (
        <div className="gerenciar-container" onClick={handleBlur}>
            <div className="title">
                <h1>Gerenciar Usuários</h1>
            </div>
            {loading ? (
                <Loading open={loading} />
            ) : (
                <table
                    className="gerenciar-table"
                    onClick={(e) => e.stopPropagation()}
                >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Acesso</th>
                            <th>Data de Cadastro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.Id}>
                                <td>{user.Id}</td>
                                <td>{user.Nome}</td>
                                <td>{user.email}</td>
                                <td>
                                    {editing === user.Id ? (
                                        <select
                                            value={user.Login}
                                            onChange={(e) =>
                                                handleChange(user.Id, e.target.value)
                                            }
                                            onBlur={handleBlur}
                                            onKeyDown={handleKeyPress}
                                            autoFocus
                                            className="editable-select"
                                        >
                                            {acessoOptions.map((opt) => (
                                                <option key={opt} value={opt}>
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <div className="edit-row">
                                            <span className="editable-text">
                                                {user.Login}
                                            </span>
                                            <i
                                                className="pi pi-pen-to-square icon-btn"
                                                onClick={() => handleEdit(user.Id)}
                                                tabIndex={0}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter")
                                                        handleEdit(user.Id);
                                                }}
                                                role="button"
                                                aria-label="Editar acesso"
                                            />
                                        </div>
                                    )}
                                </td>
                                <td>{user.DataCriacao}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default GerenciarUsuarios;
