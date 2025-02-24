import './App.css';
import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Enviar from './pages/Enviar';
import Solicitacoes from './pages/Solicitacoes';
import Gerenciar from './pages/Gerenciar';
import TabContexto from './pages/TabContexto';
import Usuario from './pages/Usuario';
import TipoUsuario from './pages/TipoUsuario';
import SituacaoPalavra from './pages/SituacaoPalavra';
import PalavraReacao from './pages/PalavraReacao';
import Avaliar from "./pages/Avaliar";
import Palavra from "./pages/Palavra";
import Projeto from './pages/Projeto';
import Estatistica from './pages/Estatistica';
import Colabore from './pages/Colabore';
import Pva from './pages/Pva';
import './Navbar.css';
import botao1 from './images/botao1.png';
import botao2 from './images/botao2.png';
import botao3 from './images/botao3.png';
import { UserContext } from "./UserContext";
// npm install react-bootstrap bootstrap
// npm install react-dropzone react-player react-table  react-bootstrap bootstrap react-router-dom

function App() {
  // variáveis 'globais'
  const [token, setToken] = useState('123');
  const [gusuarioId, setGusuarioId] = useState(2);
  const [gcontextoId, setGcontextoId] = useState(3);
  const [gtipousuarioId, setGtipousuarioId] = useState(4);

  return (
    <UserContext.Provider value={[token, setToken, gusuarioId, setGusuarioId, gcontextoId, setGcontextoId, gtipousuarioId, setGtipousuarioId]}>
    <Router>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/">Repositório de Libras</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/enviar"><button className="menu-button"><img src={botao1} alt="Enviar" />Enviar</button></Nav.Link>
              <Nav.Link as={Link} to="/solicitacoes"><button className="menu-button"><img src={botao1} alt="Solicitações" />Solicitações</button></Nav.Link>
              <Nav.Link as={Link} to="/avaliar"><button className="menu-button"><img src={botao2} alt="Avaliar" />Avaliar</button></Nav.Link>
              <Nav.Link as={Link} to="/gerenciar"><button className="menu-button"><img src={botao3} alt="Gerenciar" />Gerenciar</button></Nav.Link>
              <NavDropdown title="Perguntas?" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/Projeto">Projeto / Equipe</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/Estatistica">Resumo</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/colabore">Quero ajudar</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/enviar" element={<Enviar />} />
        <Route path="/TabContexto" element={<TabContexto />} />
        <Route path="/avaliar" element={<Avaliar />} />
        <Route path="/gerenciar" element={<Gerenciar />} />
        <Route path="/solicitacoes" element={<Solicitacoes />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/tipousuario" element={<TipoUsuario />} />
        <Route path="/situacaopalavra" element={<SituacaoPalavra />} />
        <Route path="/palavrareacao" element={<PalavraReacao />} />
        <Route path="/palavra" element={<Palavra />} />
        <Route path="/projeto" element={<Projeto />} />
        <Route path="/estatistica" element={<Estatistica />} />
        <Route path="/colabore" element={<Colabore />} />
        <Route path="/pva" element={<Pva />} />
      </Routes>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
