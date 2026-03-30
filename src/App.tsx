import { useState, useEffect } from "react";
import type { IJogo, PaginaAtiva } from "./types";
import { jogosIniciais } from "./data/jogos";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Sidebar } from "./components/layout/Sidebar";
import { Relatorios } from "./components/layout/Relatorios";
import { Configuracoes } from "./components/layout/Configuracoes";
import { ListaJogos } from "./components/jogos/ListaJogos";

function App() {
  const [jogos, setJogos] = useState<IJogo[]>(jogosIniciais);
  const [historicoAlugueis, setHistoricoAlugueis] = useState<Record<number, number>>({});
  const [paginaAtiva, setPaginaAtiva] = useState<PaginaAtiva>("acervo");
  const [temaEscuro, setTemaEscuro] = useState(false);

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
    setJogos((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: "alugado" } : j))
    );
    setHistoricoAlugueis((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  }

  function handleDevolver(id: number) {
    setJogos((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: "disponivel" } : j))
    );
  }

  function handleAdicionarJogo(novoJogo: IJogo) {
    setJogos((prev) => [...prev, novoJogo]);
  }

  function handleEditarJogo(jogoEditado: IJogo) {
    setJogos((prev) =>
      prev.map((j) => (j.id === jogoEditado.id ? jogoEditado : j))
    );
  }

  function renderPagina() {
    switch (paginaAtiva) {
      case "acervo":
        return (
          <ListaJogos
            jogos={jogos}
            onAlugar={handleAlugar}
            onDevolver={handleDevolver}
          />
        );
      case "relatorios":
        return (
          <Relatorios
            dashboard={dashboard}
            jogos={jogos}
            historicoAlugueis={historicoAlugueis}
          />
        );
      case "configuracoes":
        return (
          <Configuracoes
            temaEscuro={temaEscuro}
            onToggleTema={() => setTemaEscuro((prev) => !prev)}
            onAdicionarJogo={handleAdicionarJogo}
            onEditarJogo={handleEditarJogo}
            totalJogos={jogos.length}
            jogos={jogos}
          />
        );
    }
  }

  return (
    <div className="d-flex">
      <Sidebar paginaAtiva={paginaAtiva} onNavegar={setPaginaAtiva} />
      <div className="d-flex flex-column flex-grow-1" style={{ marginLeft: "220px" }}>
        <Header />
        <main className="container-fluid px-4 mb-5">
          {renderPagina()}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;