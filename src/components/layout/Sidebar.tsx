import type { IDashboard } from "../../types";

interface SidebarProps {
  dashboard: IDashboard;
}

export function Sidebar({ dashboard }: SidebarProps) {
  return (
    <aside className="p-3 rounded" style={{ backgroundColor: "var(--cor-secundaria)" }}>
      <h4 className="mb-4">📊 Dashboard</h4>
      <ul className="list-unstyled">
        <li className="mb-3">
          <span className="text-muted">Total de Jogos</span>
          <h3 className="mb-0">{dashboard.totalJogos}</h3>
        </li>
        <li className="mb-3">
          <span className="text-muted">Disponíveis</span>
          <h3 className="mb-0 text-success">{dashboard.totalDisponiveis}</h3>
        </li>
        <li className="mb-3">
          <span className="text-muted">Alugados</span>
          <h3 className="mb-0 text-danger">{dashboard.totalAlugados}</h3>
        </li>
        <li className="mb-3">
          <span className="text-muted">Reservados</span>
          <h3 className="mb-0 text-warning">{dashboard.totalReservados}</h3>
        </li>
      </ul>
    </aside>
  );
}