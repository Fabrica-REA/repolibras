import "../assets/css/estatistica.css";
import { useState } from "react";
import GerenciarUsuarios from "./GerenciarUsuarios";

const pages = {
  dashboard: (
    <div className="dashboard-content">
      <h2 style={{ marginBottom: 24 }}>Visão Geral</h2>
    </div>
  ),
  usuários: <div className="dashboard-content"><GerenciarUsuarios/></div>,
  // relatórios: <div className="dashboard-content">Reports & Analytics</div>,
  // configurações: <div className="dashboard-content">Settings</div>,
};

const Estatistica = () => {
  const [selectedPage, setSelectedPage] = useState("usuários");
  const [openDropdown, setOpenDropdown] = useState(null);

  const menu = [
    // {
    //   icon: "pi pi-chart-line",
    //   label: "Dashboard",
    // },
    {
      icon: "pi pi-users",
      label: "Usuários",
    },
    // {
    //   icon: "pi pi-clipboard",
    //   label: "Relatórios",
    // },
    // {
    //   icon: "pi pi-cog",
    //   label: "Configurações",
    // },
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