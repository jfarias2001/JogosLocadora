import { Library, BarChart2, Settings } from "lucide-react";
import type { PaginaAtiva } from "../../types";

interface SidebarProps {
  paginaAtiva: PaginaAtiva;
  onNavegar: (pagina: PaginaAtiva) => void;
}

interface ItemMenu {
  id: PaginaAtiva;
  label: string;
  icone: React.ReactNode;
}

const itensMenu: ItemMenu[] = [
  { id: "acervo", label: "Acervo", icone: <Library size={18} /> },
  { id: "relatorios", label: "Relatórios", icone: <BarChart2 size={18} /> },
  { id: "configuracoes", label: "Configurações", icone: <Settings size={18} /> },
];

export function Sidebar({ paginaAtiva, onNavegar }: SidebarProps) {
  return (
    <aside
      className="d-flex flex-column py-4 px-2"
      style={{
        backgroundColor: "#16213e",
        minHeight: "100vh",
        width: "220px",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <div className="px-3 mb-4">
        <img src="/logo.png" alt="PixelRent" style={{ width: "100%", objectFit: "contain" }} />
      </div>

      <nav className="d-flex flex-column gap-1">
        {itensMenu.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavegar(item.id)}
            className="btn d-flex align-items-center gap-2 px-3 py-2 text-start"
            style={{
              backgroundColor: paginaAtiva === item.id ? "var(--cor-acento)" : "transparent",
              color: "white",
              borderRadius: "8px",
              border: "none",
              transition: "background-color 0.2s",
            }}
          >
            {item.icone}
            <span className="small fw-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}