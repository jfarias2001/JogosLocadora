import { useState, useEffect } from "react";
import type { IJogo, PaginaAtiva } from "./types";
import { jogosIniciais } from "./data/jogos";
import { Sidebar } from "./components/layout/Sidebar";
import { TopBar } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Relatorios } from "./components/layout/Relatorios";
import { Configuracoes } from "./components/layout/Configuracoes";
import { ListaJogos } from "./components/jogos/ListaJogos";
import "./styles/global.css";

function App() {
  const [jogos, setJogos] = useState<IJogo[]>(() =>
    jogosIniciais.map((j) => ({
      ...j,
      estoque: Math.floor(Math.random() * 3) + 1,
    }))
  );
  const [historicoAlugueis, setHistoricoAlugueis] = useState<Record<number, number>>({});
  const [alugadosUsuario, setAlugadosUsuario] = useState<Record<number, boolean>>({});
  const [mensagem, setMensagem] = useState<{ texto: string; tipo: "success" | "warning" } | null>(null);
  const [paginaAtiva, setPaginaAtiva] = useState<PaginaAtiva>("acervo");
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", temaEscuro ? "dark" : "light");
  }, [temaEscuro]);

  const dashboard = {
    totalJogos: jogos.length,
    totalDisponiveis: jogos.filter((j) => j.status === "disponivel").length,
    totalAlugados: jogos.filter((j) => j.status === "alugado").length,
    totalReservados: 0,
  };

  function handleAlugar(id: number) {
    const jogoAtual = jogos.find((j) => j.id === id);
    if (!jogoAtual) return;

    if (alugadosUsuario[id]) {
      setMensagem({ texto: "Já alugado.", tipo: "warning" });
      return;
    }

    if (jogoAtual.estoque <= 0) {
      setMensagem({ texto: "Sem estoque disponível.", tipo: "warning" });
      return;
    }

    setJogos((prev) =>
      prev.map((j) =>
        j.id === id
          ? {
              ...j,
              status: "alugado",
              estoque: Math.max(0, j.estoque - 1),
            }
          : j
      )
    );
    setAlugadosUsuario((prev) => ({ ...prev, [id]: true }));
    setHistoricoAlugueis((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setMensagem({ texto: "1 unidade alugada com sucesso.", tipo: "success" });
  }

  function handleDevolver(id: number) {
    if (!alugadosUsuario[id]) {
      setMensagem({ texto: "Este jogo não está alugado por você.", tipo: "warning" });
      return;
    }

    setJogos((prev) =>
      prev.map((j) =>
        j.id === id
          ? {
              ...j,
              status: "disponivel",
              estoque: j.estoque + 1,
            }
          : j
      )
    );
    setAlugadosUsuario((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setMensagem({ texto: "Jogo devolvido com sucesso.", tipo: "success" });
  }

  function handleAdicionarJogo(novoJogo: Omit<IJogo, "estoque">) {
    setJogos((prev) => [...prev, { ...novoJogo, estoque: 1 }]);
  }

  function handleEditarJogo(jogoEditado: IJogo) {
    setJogos((prev) => prev.map((j) => (j.id === jogoEditado.id ? jogoEditado : j)));
  }

  function renderPagina() {
    switch (paginaAtiva) {
      case "acervo":
        return <ListaJogos jogos={jogos} onAlugar={handleAlugar} onDevolver={handleDevolver} />;
      case "relatorios":
        return <Relatorios dashboard={dashboard} jogos={jogos} historicoAlugueis={historicoAlugueis} />;
      case "configuracoes":
        return (
          <Configuracoes
            onAdicionarJogo={handleAdicionarJogo}
            onEditarJogo={handleEditarJogo}
            totalJogos={jogos.length}
            jogos={jogos}
          />
        );
    }
  }

  return (
    <div className="app-layout container-fluid">
      <div className="row g-0 min-vh-100">
        <aside
          className={`${sidebarCollapsed ? "col-12 col-lg-2 col-xl-1" : "col-12 col-lg-3 col-xl-2"} app-sidebar${sidebarCollapsed ? " collapsed" : ""}`}
        >
          <Sidebar
            paginaAtiva={paginaAtiva}
            onNavegar={setPaginaAtiva}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
          />
        </aside>
        <main className={`${sidebarCollapsed ? "col-12 col-lg-10 col-xl-11" : "col-12 col-lg-9 col-xl-10"} app-main`}>
          <TopBar
            paginaAtiva={paginaAtiva}
            temaEscuro={temaEscuro}
            onToggleTema={() => setTemaEscuro((prev) => !prev)}
          />
          <section className="page-content">
            {mensagem && (
              <div className={`alert ${mensagem.tipo === "success" ? "alert-success" : "alert-warning"} mb-3`}>
                {mensagem.texto}
              </div>
            )}
            {renderPagina()}
          </section>
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;
