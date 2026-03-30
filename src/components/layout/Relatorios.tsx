import { useState } from "react";
import { LayoutDashboard, CircleCheck, CircleX, Search } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import type { IDashboard, IJogo } from "../../types";

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

  const dadosPizza = [
    { name: "Disponíveis", value: dashboard.totalDisponiveis, color: "#2d6a4f" },
    { name: "Alugados", value: dashboard.totalAlugados, color: "#c1121f" },
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
      <div className="d-flex align-items-center gap-2 mb-4">
        <LayoutDashboard size={22} color="var(--cor-acento)" />
        <h4 className="mb-0 fw-semibold">Relatórios</h4>
      </div>

      {/* Contadores */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <span className="text-muted small">Total de Jogos</span>
              <h3 className="mb-0 fw-bold">{dashboard.totalJogos}</h3>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <span className="text-muted small">Disponíveis</span>
                <h3 className="mb-0 fw-bold" style={{ color: "var(--cor-disponivel)" }}>{dashboard.totalDisponiveis}</h3>
              </div>
              <CircleCheck size={24} color="var(--cor-disponivel)" />
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <span className="text-muted small">Alugados</span>
                <h3 className="mb-0 fw-bold" style={{ color: "var(--cor-alugado)" }}>{dashboard.totalAlugados}</h3>
              </div>
              <CircleX size={24} color="var(--cor-alugado)" />
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <span className="text-muted small">Taxa de Ocupação</span>
              <h3 className="mb-0 fw-bold" style={{ color: "var(--cor-acento)" }}>
                {Math.round((dashboard.totalAlugados / dashboard.totalJogos) * 100)}%
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <span className="text-muted small fw-semibold">Status do Acervo</span>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={dadosPizza} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
                    {dadosPizza.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [value, name]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="d-flex gap-3 justify-content-center mt-1">
                {dadosPizza.map((item) => (
                  <div key={item.name} className="d-flex align-items-center gap-2 small">
                    <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: item.color }} />
                    <span className="text-muted">{item.name}: <strong>{item.value}</strong></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <span className="text-muted small fw-semibold">Títulos Mais Alugados</span>
              {dadosBarras.length === 0 ? (
                <p className="text-muted small mt-3">Nenhum aluguel registrado ainda.</p>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={dadosBarras} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="titulo" width={120} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="total" fill="#5b5fc7" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="card border-0 shadow-sm mb-3">
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

      {/* Tabela */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <span className="text-muted small fw-semibold">
            {jogosFiltrados.length} título(s) encontrado(s)
          </span>
          <div className="table-responsive mt-2">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th className="small text-muted fw-semibold">Título</th>
                  <th className="small text-muted fw-semibold">Plataforma</th>
                  <th className="small text-muted fw-semibold">Gênero</th>
                  <th className="small text-muted fw-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {jogosFiltrados.map((jogo) => (
                  <tr key={jogo.id}>
                    <td className="fw-medium">{jogo.titulo}</td>
                    <td className="small text-muted">{jogo.plataforma}</td>
                    <td className="small text-muted">{jogo.genero}</td>
                    <td>
                      <span className={`badge badge-${jogo.status}`}>
                        {jogo.status === "disponivel" ? "Disponível" : "Alugado"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}