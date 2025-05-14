import '../assets/css/header.css';
import { Link, Routes, Route } from 'react-router-dom';
import home from '../assets/images/home_icon.svg';
import enviar from '../assets/images/send_icon.svg';
import gerenciar from '../assets/images/user_cog_icon.svg';
import avaliar from '../assets/images/clipboard_icon.svg';
import solicitacoes from '../assets/images/request_icon.svg';
import Home from '../pages/Home';
import Enviar from '../pages/Enviar';
import Solicitacoes from '../pages/Solicitacoes';
import Avaliar from '../pages/Avaliar';
import Gerenciar from '../pages/Gerenciar';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Estatistica from '../pages/Estatistica';

const Header = () => {
    return (
        <>
            <header className="header">
                <div className="header-logo">
                    <Link to="/">Repositório de Libras</Link>
                </div>
                <nav className="header-nav">
                    <Link to="/" className="nav-button">
                        <button className="nav-button-circle">
                            <img src={home} alt="Home" />
                        </button>
                    </Link>
                    <Link to="/enviar" className="nav-button">
                        <button className="nav-button-circle">
                            <img src={enviar} alt="Enviar" />
                        </button>
                    </Link>
                    <Link to="/solicitacoes" className="nav-button">
                        <button className="nav-button-circle">
                            <img src={solicitacoes} alt="Solicitações" />
                        </button>
                    </Link>
                    <Link to="/avaliar" className="nav-button">
                        <button className="nav-button-circle">
                            <img src={avaliar} alt="Avaliar" />
                        </button>
                    </Link>
                    <Link to="/gerenciar" className="nav-button">
                        <button className="nav-button-circle">
                            <img src={gerenciar} alt="Gerenciar" />
                        </button>
                    </Link>
                </nav>
            </header>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/enviar" element={<Enviar />} />
                <Route path="/avaliar" element={<Avaliar />} />
                <Route path="/gerenciar" element={<Gerenciar />} />
                <Route path="/solicitacoes" element={<Solicitacoes />} />
                <Route path="/estatistica" element={<Estatistica />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
            </Routes>
        </>

    );
};

export default Header;