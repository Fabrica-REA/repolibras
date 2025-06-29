import { useState } from 'react';
import '../assets/css/cadastro.css';
import { cadastro } from '../api/Usuario';
import { useUsuario } from '../context/usuarioContext';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const { cadastro: enviarInfo } = useUsuario();
    const navigate = useNavigate()

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError('As senhas não coincidem, verifique se as senhas estão corretas');
            return;
        }
        setPasswordError('');
        setLoading(true);
        cadastro(username, email, password)
            .then((res) => {
                console.log(res.data);
                navigate("/")
                enviarInfo(res.data);
                setLoading(false);
                navigate("/");
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            });
    };

    return (
        <div className="cadastro-container">
            <form action="" method="post">
                <h1>Cadastro</h1>
                <i className='pi pi-user'>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        minLength={2}
                        maxLength={100}
                        pattern="^[A-Za-zÀ-ÿ\s]+$"
                        title="O nome deve conter apenas letras e espaços"
                        required
                    />
                </i>
                <i className='pi pi-envelope'>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        minLength={8}
                        maxLength={100}
                        pattern="^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$"
                        title="Deve ser um email válido"
                        onInvalid={e => e.target.setCustomValidity("Deve ser um email válido")}
                        onInput={e => e.target.setCustomValidity("")}
                        required
                    />
                </i>
                <i className='pi pi-lock'>
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={8}
                        maxLength={100}
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                        title="A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial"
                        onInvalid={e => e.target.setCustomValidity("A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial")}
                        onInput={e => e.target.setCustomValidity("")}
                        required
                    />
                </i>
                <i className='pi pi-lock'>
                    <input
                        type="password"
                        placeholder="Confirme a Senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        minLength={8}
                        maxLength={100}
                        required
                    />
                </i>
                {passwordError && (
                    <span style={{ color: 'red', fontSize: '0.95rem' }}>{passwordError}</span>
                )}
                <button onClick={handleRegister} disabled={loading}>
                    {loading ? <li className="pi pi-spin pi-spinner"></li> : "Criar Conta"}
                </button>
            </form>
        </div>
    );
}

export default Cadastro;
