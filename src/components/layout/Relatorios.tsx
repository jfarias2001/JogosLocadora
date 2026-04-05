import { useState } from "react";
import { BarChart2, Package, CheckCircle, XCircle, TrendingUp, Search } from "lucide-react";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer,
} from "recharts";
import type { IDashboard, IJogo } from "../../types";
import { BadgeStatus } from "../common/BadgeStatus";

interface RelatoriosProps {
  dashboard: IDashboard;
  jogos: IJogo[];
  historicoAlugueis: Record<number, number>;
}

export function Relatorios({ dashboard, jogos, historicoAlugueis }: RelatoriosProps) {
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

  const taxa = dashboard.totalJogos > 0
    ? Math.round((dashboard.totalAlugados / dashboard.totalJogos) * 100)
    : 0;

  const dadosPizza = [
    { name: "Disponíveis", value: dashboard.totalDisponiveis, color: "#10b981" },
    { name: "Alugados",    value: dashboard.totalAlugados,    color: "#ef4444" },
  ];

  const dadosBarras = Object.entries(historicoAlugueis)
    .map(([id, total]) => ({
      titulo: jogos.find((j) => j.id === Number(id))?.titulo.split(":")[0] ?? "",
      total,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  return (
    <section>
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="page-header-icon">
            <BarChart2 size={20} />
          </div>
          <div>
            <h1 className="page-title">Relatórios</h1>
            <p className="page-subtitle">Visão geral do acervo e aluguéis</p>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-card-label">Total de Jogos</span>
            <div className="stat-card-icon stat-icon-neutral"><Package size={16} /></div>
          </div>
          <div className="stat-card-value">{dashboard.totalJogos}</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-card-label">Disponíveis</span>
            <div className="stat-card-icon stat-icon-success"><CheckCircle size={16} /></div>
          </div>
          <div className="stat-card-value stat-value-success">{dashboard.totalDisponiveis}</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-card-label">Alugados</span>
            <div className="stat-card-icon stat-icon-danger"><XCircle size={16} /></div>
          </div>
          <div className="stat-card-value stat-value-danger">{dashboard.totalAlugados}</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <span className="stat-card-label">Taxa de Ocupação</span>
            <div className="stat-card-icon stat-icon-primary"><TrendingUp size={16} /></div>
          </div>
          <div className="stat-card-value stat-value-primary">{taxa}%</div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-row">
        <div className="card">
          <div className="card-header">
            <div className="card-header-icon"><BarChart2 size={14} /></div>
            <span className="card-header-title">Status do Acervo</span>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={dadosPizza} dataKey="value" cx="50%" cy="50%" outerRadius={75} paddingAngle={3}>
                  {dadosPizza.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v, n) => [v, n]} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "8px" }}>
              {dadosPizza.map((item) => (
                <div key={item.name} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                  <span style={{ color: "var(--clr-text-secondary)" }}>
                    {item.name}: <strong style={{ color: "var(--clr-text)" }}>{item.value}</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-header-icon"><TrendingUp size={14} /></div>
            <span className="card-header-title">Títulos Mais Alugados</span>
          </div>
          <div className="card-body">
            {dadosBarras.length === 0 ? (
              <div style={{ padding: "32px 16px", textAlign: "center", color: "var(--clr-text-secondary)", fontSize: "13px" }}>
                Nenhum aluguel registrado ainda.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dadosBarras} layout="vertical" margin={{ left: 0, right: 16 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="titulo" width={130} tick={{ fontSize: 11, fill: "var(--clr-text-secondary)" }} />
                  <Tooltip />
                  <Bar dataKey="total" fill="var(--clr-primary)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Table with inline filters */}
      <div className="card">
        <div className="card-header" style={{ flexWrap: "wrap", gap: "12px" }}>
          <div className="filter-bar" style={{ marginBottom: 0, border: "none", padding: 0, boxShadow: "none", background: "transparent", flex: 1 }}>
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
              <select className="input" style={{ minWidth: 120 }} value={plataformaFiltro} onChange={(e) => setPlataformaFiltro(e.target.value)}>
                <option value="">Todas</option>
                {plataformas.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Gênero</label>
              <select className="input" style={{ minWidth: 120 }} value={generoFiltro} onChange={(e) => setGeneroFiltro(e.target.value)}>
                <option value="">Todos</option>
                {generos.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Status</label>
              <select className="input" style={{ minWidth: 110 }} value={statusFiltro} onChange={(e) => setStatusFiltro(e.target.value)}>
                <option value="">Todos</option>
                <option value="disponivel">Disponível</option>
                <option value="alugado">Alugado</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Ordenar</label>
              <select className="input" style={{ minWidth: 100 }} value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
                <option value="">Padrão</option>
                <option value="az">A → Z</option>
                <option value="za">Z → A</option>
              </select>
            </div>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Plataforma</th>
                <th>Gênero</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {jogosFiltrados.map((jogo) => (
                <tr key={jogo.id}>
                  <td style={{ fontWeight: 500 }}>{jogo.titulo}</td>
                  <td style={{ color: "var(--clr-text-secondary)" }}>{jogo.plataforma}</td>
                  <td style={{ color: "var(--clr-text-secondary)" }}>{jogo.genero}</td>
                  <td><BadgeStatus status={jogo.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>

          {jogosFiltrados.length === 0 && (
            <div className="empty-state" style={{ padding: "48px 32px" }}>
              <div className="empty-state-icon"><Search size={24} /></div>
              <p className="empty-state-title">Nenhum resultado</p>
              <p className="empty-state-text">Ajuste os filtros para encontrar jogos.</p>
            </div>
          )}
        </div>

        <div style={{ padding: "12px 20px", borderTop: "1px solid var(--clr-border)" }}>
          <span className="result-count">
            <strong>{jogosFiltrados.length}</strong>{" "}
            título{jogosFiltrados.length !== 1 ? "s" : ""} encontrado{jogosFiltrados.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>
    </section>
  );
}
