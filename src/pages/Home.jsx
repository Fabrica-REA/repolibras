import { useNavigate } from 'react-router-dom';
import '../assets/css/home.css';
import { base } from '../utils/Utilidades';

// Página inicial
const Home = () => {
    const navigate = useNavigate();

    return (
        <div className='container'>
            <div className='opcoes'>
                <button
                    className='btn btn-Terena'
                    onClick={() => navigate(`${base}pesquisar`, { state: { linguagem: "terena" } })}
                >
                    <img src={`${base}img/language.svg`} alt='Terena Flag' />
                    <h1>Terena</h1>
                </button>
                <button
                    className='btn btn-portugues'
                    onClick={() => navigate(`${base}pesquisar`, { state: { linguagem: "portugues" } })}
                >
                    <img src={`${base}img/language.svg`} alt='Portuguese Flag' />
                    <h1>Português</h1>
                </button>
            </div>
            <div className='sobre'>
                <h1>Sobre</h1>
                <p>
                    O Repositório de Libras é uma plataforma dedicada a promover a inclusão e acessibilidade
                    através da Língua Brasileira de Sinais (Libras). Ele oferece recursos educacionais para estudantes, professores e
                    qualquer pessoa interessada em aprender Libras.
                </p>
                <p>
                    Explore nosso conteúdo e contribua para a disseminação da cultura e linguagem de sinais!
                </p>
            </div>
        </div>
    );
};

export default Home;