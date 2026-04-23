import * as React from "react";
import "../assets/css/errorBoundary.css";
import { useLocation, useNavigate } from "react-router-dom";

// ErrorBoundary captura erros JavaScript na árvore de componentes filhos, registra-os e exibe uma UI de fallback.
// Use para evitar que todo o app quebre devido a erros em partes da interface.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidUpdate(prevProps) {
    // Clear the error UI after route changes so the destination page can render again.
    if (
      this.state.hasError &&
      prevProps.location?.pathname !== this.props.location?.pathname
    ) {
      this.setState({ hasError: false });
    }
  }

  static getDerivedStateFromError(error) {
    // Atualiza o estado para que o próximo render exiba a UI de fallback.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error, info);
    // Você também pode registrar o erro em um serviço externo aqui.
  }

  render() {
    if (this.state.hasError) {
      // Renderiza UI de fallback customizada se fornecida, senão mostra mensagem padrão.
      return (
        this.props.fallback || (
          <div className="error-boundary-fallback">
            <div className="error-boundary-content">
              <h1>OPS!</h1>
              <h2>Alguma coisa deu errado. Que vergonha.</h2>
              <h3>Caso o erro persista, consulte o administrador do sistema.</h3>
              <button className="btn exception-button"
                onClick={() => {
                  this.props.navigate(this.props.homePath);
                }}
              >
                Ir para a Home
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// Wrapper para injetar a prop navigate do useNavigate no ErrorBoundary
function ErrorBoundaryWithNavigate(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const homePath = import.meta.env.BASE_URL;

  return (
    <ErrorBoundary
      {...props}
      homePath={homePath}
      location={location}
      navigate={navigate}
    />
  );
}

export default ErrorBoundaryWithNavigate;
