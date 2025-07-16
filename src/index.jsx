import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./utils/ErrorBoundary.jsx";
import { UsuarioProvider } from "./context/usuarioContext.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <ErrorBoundary>
        <UsuarioProvider>
        <App />
        </UsuarioProvider>
      </ErrorBoundary>
    </BrowserRouter>
);
