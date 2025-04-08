import { useState } from 'react';
import '../assets/css/Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = () => {
        
    };

    return (
        <main>
            <div className="login-container">
                <h2>Login</h2>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} minLength={1} maxLength={100} pattern='' required/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} maxLength={100} pattern='' required/>
                <button onClick={handleLogin} style={{ backgroundColor: '#3483fa', borderRadius: '20px', color: '#fff' }}>Login</button>
            </div>
        </main>
    );
}

export default Login;
