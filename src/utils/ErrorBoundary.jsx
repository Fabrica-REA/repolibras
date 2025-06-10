import * as React from "react";
import "../assets/css/errorBoundary.css";
import { useNavigate } from "react-router-dom";

// ErrorBoundary catches JavaScript errors in its child component tree, logs them, and displays a fallback UI.
// Use it to prevent the entire app from crashing due to errors in part of the UI.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error, info);
    // You can also log the error to an error reporting service here.
  }

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI if provided, otherwise show a default message.
      return (
        this.props.fallback || (
          <div className="error-boundary-fallback">
            <div className="error-boundary-content">
              <h1>WHOPPS!</h1>
              <h2>Alguma coisa deu errado. Isso é vergonhoso</h2>
              <h3>Caso o erro persista, consulte administrador do sistema</h3>
              <button className="btn exception-button"
                onClick={() => {
                  this.props.navigate("/");
                  setTimeout(() => window.location.reload(), 0);
                }}
              >
                Ir para Home
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// Wrapper to inject navigate prop from useNavigate into ErrorBoundary
function ErrorBoundaryWithNavigate(props) {
  const navigate = useNavigate();
  return <ErrorBoundary {...props} navigate={navigate} />;
}

export default ErrorBoundaryWithNavigate;
