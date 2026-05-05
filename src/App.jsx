import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import "./assets/css/app.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ErrorBoundary from "./utils/ErrorBoundary.jsx";
import { useUsuario } from "./context/usuarioContext";
import { applyAccessibilityPlugins, registerBuiltInAccessibilityPlugins } from "./utils/accessibilityPlugins";

function App() {
  const { usuario } = useUsuario();

  useEffect(() => {
    registerBuiltInAccessibilityPlugins();
  }, []);

  useEffect(() => {
    const daltonismoAtivo = Boolean(usuario?.acessibilidade?.daltonismoAtivo);
    const daltonicoTipo = usuario?.acessibilidade?.daltonicoTipo || "normal";
    const colorFilter = daltonismoAtivo ? daltonicoTipo : "normal";

    applyAccessibilityPlugins(usuario?.acessibilidade).catch(() => {
      document.body.setAttribute("data-color-filter", colorFilter);
    });
  }, [usuario]);

  return (
    <ErrorBoundary>
      <Header />
      <Outlet />
      <Footer />
    </ErrorBoundary>
  );
}

export default App;
