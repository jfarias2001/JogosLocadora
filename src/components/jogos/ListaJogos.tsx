import { useState } from "react";
import { Search, Library, SlidersHorizontal } from "lucide-react";
import type { IJogo } from "../../types";
import { CardJogo } from "./CardJogo";

interface ListaJogosProps {
  jogos: IJogo[];
  onAlugar: (id: number) => void;
  onDevolver: (id: number) => void;
}

export function ListaJogos({ jogos, onAlugar, onDevolver }: ListaJogosProps) {
  const [busca, setBusca] = useState("");
  const [plataformaFiltro, setPlataformaFiltro] = useState("");
  const [generoFiltro, setGeneroFiltro] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");
  const [ordenacao, setOrdenacao] = useState("");

  const plataformas = [...new Set(jogos.map((j) => j.plataforma))].sort();
  const generos = [...new Set(jogos.map((j) => j.genero))].sort();

  const jogosFiltrados = jogos
    .filter((j) => j.titulo.toLowerCase().includes(busca.toLowerCase()))
    .filter((j) => (plataformaFiltro ? j.plataforma === plataformaFiltro : true))
    .filter((j) => (generoFiltro ? j.genero === generoFiltro : true))
    .filter((j) => (statusFiltro ? j.status === statusFiltro : true))
    .sort((a, b) => {
      if (ordenacao === "az") return a.titulo.localeCompare(b.titulo);
      if (ordenacao === "za") return b.titulo.localeCompare(a.titulo);
      return 0;
    });

  return (
    <section>
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="page-header-icon">
            <Library size={20} />
          </div>
          <div>
            <h1 className="page-title">Acervo</h1>
            <p className="page-subtitle">{jogos.length} títulos no catálogo</p>
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter-group filter-search">
          <label className="filter-label">Buscar</label>
          <div className="input-wrapper">
            <span className="input-icon"><Search size={14} /></span>
            <input
              type="text"
              className="input input-with-icon"
              placeholder="Nome do jogo..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Plataforma</label>
          <select
            className="input"
            style={{ minWidth: 130 }}
            value={plataformaFiltro}
            onChange={(e) => setPlataformaFiltro(e.target.value)}
          >
            <option value="">Todas</option>
            {plataformas.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Gênero</label>
          <select
            className="input"
            style={{ minWidth: 130 }}
            value={generoFiltro}
            onChange={(e) => setGeneroFiltro(e.target.value)}
          >
            <option value="">Todos</option>
            {generos.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Status</label>
          <select
            className="input"
            style={{ minWidth: 120 }}
            value={statusFiltro}
            onChange={(e) => setStatusFiltro(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="disponivel">Disponível</option>
            <option value="alugado">Alugado</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">Ordenar</label>
          <select
            className="input"
            style={{ minWidth: 110 }}
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value)}
          >
            <option value="">Padrão</option>
            <option value="az">A → Z</option>
            <option value="za">Z → A</option>
          </select>
        </div>
      </div>

      <p className="result-count">
        <strong>{jogosFiltrados.length}</strong>{" "}
        título{jogosFiltrados.length !== 1 ? "s" : ""} encontrado{jogosFiltrados.length !== 1 ? "s" : ""}
      </p>

      {jogosFiltrados.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <SlidersHorizontal size={28} />
          </div>
          <p className="empty-state-title">Nenhum jogo encontrado</p>
          <p className="empty-state-text">
            Tente ajustar ou remover os filtros aplicados para encontrar mais títulos.
          </p>
        </div>
      ) : (
        <div className="game-grid">
          {jogosFiltrados.map((jogo) => (
            <CardJogo
              key={jogo.id}
              jogo={jogo}
              onAlugar={onAlugar}
              onDevolver={onDevolver}
            />
          ))}
        </div>
      )}
    </section>
  );
}
