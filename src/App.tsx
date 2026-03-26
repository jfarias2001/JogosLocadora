import { useState } from "react";
import type { IJogo } from "./types";
import { jogosIniciais } from "./data/jogos";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Sidebar } from "./components/layout/Sidebar";
import { ListaJogos } from "./components/jogos/ListaJogos";

function App() {
  const [jogos, setJogos] = useState<IJogo[]>(jogosIniciais);

  const dashboard = {
    totalJogos: jogos.length,
    totalDisponiveis: jogos.filter((j) => j.status === "disponivel").length,
    totalAlugados: jogos.filter((j) => j.status === "alugado").length,
    totalReservados: jogos.filter((j) => j.status === "reservado").length,
  };

  function handleAlugar(id: number) {
    setJogos((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: "alugado" } : j))
    );
  }

  function handleDevolver(id: number) {
    setJogos((prev) =>
      prev.map((j) => (j.id === id ? { ...j, status: "disponivel" } : j))
    );
  }

  return (
    <>
      <Header />
      <main className="container mb-5">
        <div className="row">
          <div className="col-12 col-md-3 mb-4">
            <Sidebar dashboard={dashboard} />
          </div>
          <div className="col-12 col-md-9">
            <ListaJogos
              jogos={jogos}
              onAlugar={handleAlugar}
              onDevolver={handleDevolver}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;