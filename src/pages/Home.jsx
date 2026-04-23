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
                    <h1>Libras</h1>
                </button>
            </div>
            <div className='sobre'>
                <h1>Sobre</h1>
                <p>
                    O Repositório SignConverse é uma plataforma voltada para a promoção da acessibilidade linguística nas mais diversas línguas de sinais.
                    Nosso objetivo é oferecer recursos educacionais ricos e de fácil acesso para estudantes, professores e todas as pessoas interessadas em aprender ou consultar vocábulos de línguas de sinais ao redor do mundo.
                </p>
                <p>
                    Explore nossos conteúdos, enriqueça seu conhecimento e colabore conosco para fortalecer e disseminar a cultura e a diversidade linguística das línguas de sinais
                </p>
            </div>
        </div>
    );
};

export default Home;