import { Library, BarChart2, Settings, PanelLeftClose, PanelLeft } from "lucide-react";
import type { PaginaAtiva } from "../../types";

interface SidebarProps {
  paginaAtiva: PaginaAtiva;
  onNavegar: (pagina: PaginaAtiva) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const itensMenu: { id: PaginaAtiva; label: string; Icon: React.ElementType }[] = [
  { id: "acervo",        label: "Acervo",        Icon: Library   },
  { id: "relatorios",    label: "Relatórios",     Icon: BarChart2 },
  { id: "configuracoes", label: "Configurações",  Icon: Settings  },
];

export function Sidebar({ paginaAtiva, onNavegar, collapsed, onToggleCollapse }: SidebarProps) {
  return (
    <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>
      <div className="sidebar-brand">
        <div className="sidebar-brand-logo">
          <img src="/logo.png" alt="PixelRent" />
        </div>
        <div className="sidebar-brand-logo-compact">
          <img src="/logo.png" alt="PixelRent" />
        </div>
      </div>

      <nav className="sidebar-nav">
        <span className="sidebar-section-label">Menu</span>
        {itensMenu.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`sidebar-btn${paginaAtiva === id ? " active" : ""}`}
            onClick={() => onNavegar(id)}
            title={collapsed ? label : undefined}
          >
            <span className="sidebar-btn-icon">
              <Icon size={17} />
            </span>
            <span className="sidebar-btn-label">{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-divider" />

      <button
        className="sidebar-collapse-btn"
        onClick={onToggleCollapse}
        title={collapsed ? "Expandir sidebar" : "Recolher sidebar"}
      >
        <span className="sidebar-btn-icon">
          {collapsed ? <PanelLeft size={17} /> : <PanelLeftClose size={17} />}
        </span>
        <span className="sidebar-collapse-btn-label">
          {collapsed ? "Expandir" : "Recolher"}
        </span>
      </button>
    </aside>
  );
}
