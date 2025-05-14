import '../assets/css/utilidades.css';

export const Pagina404 = () => {
    return (
        <div className="container-404">
            <h1>404 - Página não encontrada</h1>
            <p>Desculpe, a página que você está procurando não existe.</p>
            <a href="/" className="home-button">Voltar para a página inicial</a>
        </div>
    );
};