import { useNavigate } from 'react-router-dom';
import '../assets/css/home.css';
import Footer from '../components/Footer';

const Home = () => {
    const navigate = useNavigate()

    return (
        <>
        <section>
            <div className='container'>
                <div className='opcoes'>
                    <button className='btn btn-Tereno' onClick={() => navigate('/pesquisar')}>
                        <img src='/img/icon.svg' alt='Tereno Flag' className='flag-icon' />
                        <h1>Tereno</h1>
                    </button>
                    <button className='btn btn-portugues' onClick={() => navigate('/pesquisar')}>
                        <img src='/img/icon.svg' alt='Portuguese Flag' className='flag-icon' />
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
        </section>
        <Footer/>
        </>
    );
};

export default Home;