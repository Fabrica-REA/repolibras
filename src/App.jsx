import { Outlet } from "react-router-dom";
import "./assets/css/app.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ErrorBoundary from "./utils/ErrorBoundary.jsx";

function App() {
  return (
    <ErrorBoundary>
      <Header />
      <Outlet />
      <Footer />
    </ErrorBoundary>
  );
}

export default App;
