import { useState } from 'react';
import '../assets/css/cadastro.css';

const Cadastro = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = () => {
        alert('Conta criada com sucesso!');
    };

    return (
        <div className="cadastro-container">
            <h2>Criar uma Conta</h2>
            <input type="text" placeholder="Nome" value={username} onChange={(e) => setUsername(e.target.value)} minLength={8} maxLength={100} pattern='' required />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} minLength={8} maxLength={100} pattern='' required />
            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} maxLength={100} pattern='' required />
            <button onClick={() => handleRegister()} style={{ borderRadius: '20px' }}>Criar Conta</button>
        </div>
    );
}

export default Cadastro;
