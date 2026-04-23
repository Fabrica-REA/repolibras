import { useState } from 'react';
import '../assets/css/cadastro.css';
import { cadastro, getSession } from '../api/Usuario';
import { useUsuario } from '../context/usuarioContext';
import { useNavigate, Link } from 'react-router-dom';
import { base, ErrorMessage, Loading, validarEmail, validarSenha } from '../utils/Utilidades';

// Componente de Cadastro
const Cadastro = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState("");
    const { cadastro: enviarInfo } = useUsuario();
    const navigate = useNavigate()

    // Função para lidar com o cadastro do usuário
    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError('As senhas não coincidem, verifique se as senhas estão corretas');
            return;
        }
        if (!validarEmail(email)) {
            setError("O email informado não é válido.");
            return;
        }
        if (!validarSenha(password)) {
            setError("A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial.");
            return;
        }
        setPasswordError('');
        setLoading(true);
        setError("");
        cadastro(username, email, password)
            .then(() => {
                return getSession();
            })
            .then((sessionRes) => {
                if (!sessionRes.data?.authenticated || !sessionRes.data?.user) {
                    throw new Error("Sessão inválida após cadastro.");
                }

                enviarInfo(
                    sessionRes.data.user,
                    null,
                    sessionRes.data.expiresAt,
                    sessionRes.data.maxAgeMs
                );
                setLoading(false);
                setError("");
                navigate(`${base}`);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
                setError("Erro ao criar conta.");
            });
    };

    if (loading) {
        return <Loading open={true} />;
    }

    return (
        <div className="cadastro-container">
            <form action="" method="post">
                <h1>Cadastro</h1>
                <ErrorMessage error={error} onClose={() => setError("")} />
                <i className='pi pi-user'>
                    <input
                        id="cadastro-username"
                        type="text"
                        placeholder="Nome"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        minLength={2}
                        maxLength={100}
                        title="O nome deve conter apenas letras e espaços"
                        required
                    />
                </i>
                <i className='pi pi-envelope'>
                    <input
                        id="cadastro-email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        minLength={8}
                        maxLength={100}
                        title="Deve ser um email válido"
                        onInvalid={e => e.target.setCustomValidity("Deve ser um email válido")}
                        onInput={e => e.target.setCustomValidity("")}
                        required
                    />
                </i>
                <i className='pi pi-lock'>
                    <input
                        id="cadastro-password"
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={8}
                        maxLength={100}
                        title="A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial"
                        onInvalid={e => e.target.setCustomValidity("A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial")}
                        onInput={e => e.target.setCustomValidity("")}
                        required
                    />
                </i>
                <i className='pi pi-lock'>
                    <input
                        id="cadastro-confirm-password"
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
                <button onClick={handleRegister}>
                    Criar Conta
                </button>
                <div className="cadastro-redirect-text">
                    <span>Já tem uma conta? </span>
                    <Link to={`${base}login`} className="cadastro-redirect-link">
                        Entrar
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Cadastro;