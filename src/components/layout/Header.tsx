import { Sun, Moon } from "lucide-react";
import type { PaginaAtiva } from "../../types";

interface TopBarProps {
  paginaAtiva: PaginaAtiva;
  temaEscuro: boolean;
  onToggleTema: () => void;
}

const pageTitles: Record<PaginaAtiva, string> = {
  acervo: "Acervo de Jogos",
  relatorios: "Relatórios",
  configuracoes: "Configurações",
};

export function TopBar({ paginaAtiva, temaEscuro, onToggleTema }: TopBarProps) {
  return (
    <header className="top-bar">
      <span className="top-bar-title">{pageTitles[paginaAtiva]}</span>
      <button
        className="top-bar-theme-btn"
        onClick={onToggleTema}
        title={temaEscuro ? "Mudar para tema claro" : "Mudar para tema escuro"}
      >
        {temaEscuro ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </header>
  );
}
