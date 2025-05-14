import { useState } from 'react';
import '../assets/css/login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = () => {
        
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <i className='pi pi-envelope'>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} minLength={8} maxLength={100} pattern='^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$' onInvalid={e => e.target.setCustomValidity("Deve ser um email válido")} required />
            </i>
            <i className='pi pi-lock'>
                <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} maxLength={100} pattern='' onInvalid={e => e.target.setCustomValidity("A senha deve conter 8 caracteres")} required />
            </i>
            <button onClick={() => handleRegister()}>Entrar</button>
        </div>
    );
}

export default Login;
