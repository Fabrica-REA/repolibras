import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const response = await axios.get('http://localhost:5001/users');
        setUsers(response.data);
    };
    
    const deleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await axios.delete(`http://localhost:5001/users/${id}`);
            getUsers();
        }
    };
    
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <button onClick={() => deleteUser(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default UserList;

from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

db = mysql.connector.connect(
    host='localhost',
    user='root',
    password='password',
    database='mydatabase'
)

@app.route('/api/users', methods=['GET'])
def get_users():
    cursor = db.cursor()
    cursor.execute('SELECT * FROM users')
    users = []
    for (id, name, email) in cursor:
        users.append({'id': id, 'name': name, 'email': email})
    return jsonify(users)

@app.route('/api/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    cursor = db.cursor()
    cursor.execute('DELETE FROM users WHERE id = %s', (id,))
    db.commit()
    return jsonify({'message': 'User deleted'})

if __name__ == '__main__':
    app.run(debug=True)
