import { useState } from "react";
import { Search } from "lucide-react";
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

  const plataformas = [...new Set(jogos.map((j) => j.plataforma))];
  const generos = [...new Set(jogos.map((j) => j.genero))];

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
      <h4 className="mb-4 fw-semibold">Acervo</h4>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-2 align-items-end">
            <div className="col-12 col-md-4">
              <label className="form-label small text-muted">Buscar</label>
              <div className="input-group">
                <span className="input-group-text"><Search size={14} /></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome do jogo..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>
            </div>
            <div className="col-6 col-md-2">
              <label className="form-label small text-muted">Plataforma</label>
              <select className="form-select" value={plataformaFiltro} onChange={(e) => setPlataformaFiltro(e.target.value)}>
                <option value="">Todas</option>
                {plataformas.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="col-6 col-md-2">
              <label className="form-label small text-muted">Gênero</label>
              <select className="form-select" value={generoFiltro} onChange={(e) => setGeneroFiltro(e.target.value)}>
                <option value="">Todos</option>
                {generos.map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="col-6 col-md-2">
              <label className="form-label small text-muted">Status</label>
              <select className="form-select" value={statusFiltro} onChange={(e) => setStatusFiltro(e.target.value)}>
                <option value="">Todos</option>
                <option value="disponivel">Disponível</option>
                <option value="alugado">Alugado</option>
              </select>
            </div>
            <div className="col-6 col-md-2">
              <label className="form-label small text-muted">Ordenar</label>
              <select className="form-select" value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
                <option value="">Padrão</option>
                <option value="az">A → Z</option>
                <option value="za">Z → A</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <span className="text-muted small">{jogosFiltrados.length} título(s) encontrado(s)</span>

      <div className="mt-3">
        {jogosFiltrados.length === 0 ? (
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center text-muted small py-4">
              Nenhum jogo encontrado com os filtros aplicados.
            </div>
          </div>
        ) : (
          jogosFiltrados.map((jogo) => (
            <CardJogo
              key={jogo.id}
              jogo={jogo}
              onAlugar={onAlugar}
              onDevolver={onDevolver}
            />
          ))
        )}
      </div>
    </section>
  );
}