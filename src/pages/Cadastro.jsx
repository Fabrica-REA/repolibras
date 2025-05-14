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
            <h1>Cadastro</h1>
            <i className='pi pi-user'>
                <input type="text" placeholder="Nome" value={username} onChange={(e) => setUsername(e.target.value)} minLength={8} maxLength={100} pattern='' required />
            </i>
            <i className='pi pi-envelope'>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} minLength={8} maxLength={100} pattern='^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$' onInvalid={e => e.target.setCustomValidity("Deve ser um email válido")} required />
            </i>
            <i className='pi pi-lock'>
                <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} maxLength={100} pattern='' onInvalid={e => e.target.setCustomValidity("A senha deve conter 8 caracteres")} required />
            </i>
            <button onClick={() => handleRegister()}>Criar Conta</button>
        </div>
    );
}

export default Cadastro;
