import React, { useState } from 'react';
import axios from 'axios';

function CriarUsuario() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [permissions, setPermissions] = useState([]);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePermissionsChange = (event) => {
        const selectedPermissions = Array.from(event.target.selectedOptions, (option) => option.value);
        setPermissions(selectedPermissions);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const user = {
            username: username,
            password: password,
            permissions: permissions
        };

        axios.post('/api/users', user)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div>
            <h1>User Management</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <label htmlFor="permissions">Permissions:</label>
                    <select multiple id="permissions" value={permissions} onChange={handlePermissionsChange}>
                        <option value="view_dashboard">View Dashboard</option>
                        <option value="view_profile">View Profile</option>
                        <option value="view_settings">View Settings</option>
                    </select>
                </div>
                <button type="submit">Create User</button>
            </form>
        </div>
    );
}

export default CriarUsuario;


from flask import Flask, request, jsonify

app = Flask(__name__)

users = []

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    user = {
        'username': data['username'],
        'password': data['password'],
        'permissions': data['permissions']
    }
    users.append(user)
    return jsonify(user), 201

if __name__ == '__main__':
    app.run(debug=True)
