import "../assets/css/estatistica.css";
import { useState } from "react";
import GerenciarUsuarios from "./GerenciarUsuarios";
import Gerenciar from "./Gerenciar";
import Dashboard from "./Dashboard";

// Define as páginas do dashboard
const pages = {
  dashboard: <div className="dashboard-content"><Dashboard /></div>,
  usuários: <div className="dashboard-content"><GerenciarUsuarios /></div>,
  videos: <div className="dashboard-content"><Gerenciar /></div>,
};

const Estatistica = () => {
  // Estado para controlar página selecionada e dropdown
  const [selectedPage, setSelectedPage] = useState("dashboard");
  const [openDropdown, setOpenDropdown] = useState(null);

  // Menu lateral do dashboard
  const menu = [
    {
      icon: "pi pi-chart-pie",
      label: "dashboard",
    },
    {
      icon: "pi pi-users",
      label: "usuários",
    },
    {
      icon: "pi pi-video",
      label: "videos",
    },
  ];

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        {menu.map((item, idx) => (
          <div
            key={item.label}
            className={"sidebar-icon" + (selectedPage === item.label.toLowerCase() ? " active" : "")}
            onClick={() => {
              setSelectedPage(item.label.toLowerCase());
              setOpenDropdown(openDropdown === idx ? null : idx);
            }}
          >
            <i className={item.icon} />
          </div>
        ))}
      </aside>
      <main className="dashboard-main">{pages[selectedPage]}</main>
    </div>
  );
};

export default Estatistica;