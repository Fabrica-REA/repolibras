import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TipoUsuario() {
    const [tiposUsuario, setTiposUsuario] = useState([]);

    const getTiposUsuario = async () => {
        const response = await axios.get('http://localhost:5001/tiposusuario');
        setTiposUsuario(response.data);
    };

    const deleteTipoUsuario = async (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            await axios.delete(`http://localhost:5001/tiposusuario/${id}`);
            getTiposUsuario();
        }
    };

    const updateModifiedDescricao = async () => {
        if (window.confirm('Are you sure you want to update all modified descricao?')) {
            await axios.put('http://localhost:5001/tiposusuario', tiposUsuario);
            getTiposUsuario();
        }
    };

    useEffect(() => {
        getTiposUsuario();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Descrição</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tiposUsuario.map((tipoUsuario) => (
                    <tr key={tipoUsuario.Id}>
                        <td>{tipoUsuario.Id}</td>
                        <td>
                            <input
                                type="text"
                                value={tipoUsuario.Descricao}
                                onChange={(e) =>
                                    setTiposUsuario(
                                        tiposUsuario.map((item) =>
                                            item.Id === tipoUsuario.Id ? { ...item, Descricao: e.target.value } : item
                                        )
                                    )
                                }
                            />
                        </td>
                        <td>
                            <button onClick={() => deleteTipoUsuario(tipoUsuario.Id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="3">
                        <button className="button-apagar"  onClick={() => updateModifiedDescricao()}>Update Modified Descricao</button>
                    </td>
                </tr>
            </tfoot>
        </table>
    );
}

export default TipoUsuario;
