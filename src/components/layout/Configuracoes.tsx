import { useState } from "react";
import { Settings, Moon, Sun, PlusCircle, Pencil, X, Check } from "lucide-react";
import type { IJogo, StatusJogo } from "../../types";

interface ConfiguracoesProps {
  temaEscuro: boolean;
  onToggleTema: () => void;
  onAdicionarJogo: (jogo: IJogo) => void;
  onEditarJogo: (jogo: IJogo) => void;
  totalJogos: number;
  jogos: IJogo[];
}

export function Configuracoes({ temaEscuro, onToggleTema, onAdicionarJogo, onEditarJogo, totalJogos, jogos }: ConfiguracoesProps) {
  const [titulo, setTitulo] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [genero, setGenero] = useState("");
  const [descricao, setDescricao] = useState("");
  const [capa, setCapa] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [jogoEditado, setJogoEditado] = useState<IJogo | null>(null);

  function handleSubmit() {
    if (!titulo || !plataforma || !genero || !descricao) return;

    const novoJogo: IJogo = {
      id: totalJogos + 1,
      titulo,
      plataforma,
      genero,
      descricao,
      capa,
      status: "disponivel" as StatusJogo,
    };

    onAdicionarJogo(novoJogo);
    setTitulo("");
    setPlataforma("");
    setGenero("");
    setDescricao("");
    setCapa("");
    setSucesso(true);
    setTimeout(() => setSucesso(false), 3000);
  }

  function handleIniciarEdicao(jogo: IJogo) {
    setEditandoId(jogo.id);
    setJogoEditado({ ...jogo });
  }

  function handleCancelarEdicao() {
    setEditandoId(null);
    setJogoEditado(null);
  }

  function handleSalvarEdicao() {
    if (!jogoEditado) return;
    onEditarJogo(jogoEditado);
    setEditandoId(null);
    setJogoEditado(null);
  }

  return (
    <section>
      <div className="d-flex align-items-center gap-2 mb-4">
        <Settings size={22} color="var(--cor-acento)" />
        <h4 className="mb-0 fw-semibold">Configurações</h4>
      </div>

      {/* Toggle Tema */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            {temaEscuro ? <Moon size={18} color="var(--cor-acento)" /> : <Sun size={18} color="var(--cor-acento)" />}
            <span className="fw-medium">Tema {temaEscuro ? "Escuro" : "Claro"}</span>
          </div>
          <div
            onClick={onToggleTema}
            style={{
              width: 48,
              height: 26,
              borderRadius: 999,
              backgroundColor: temaEscuro ? "var(--cor-acento)" : "var(--cor-borda)",
              cursor: "pointer",
              position: "relative",
              transition: "background-color 0.3s",
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "white",
                position: "absolute",
                top: 3,
                left: temaEscuro ? 25 : 3,
                transition: "left 0.3s",
              }}
            />
          </div>
        </div>
      </div>

      {/* Adicionar Novo Título */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center gap-2 mb-4">
            <PlusCircle size={18} color="var(--cor-acento)" />
            <span className="fw-semibold">Adicionar Novo Título</span>
          </div>

          {sucesso && (
            <div className="alert alert-success small py-2 mb-3">
              Jogo adicionado com sucesso!
            </div>
          )}

          <div className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label small text-muted">Título *</label>
              <input type="text" className="form-control" placeholder="Ex: God of War" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label small text-muted">Plataforma *</label>
              <select className="form-select" value={plataforma} onChange={(e) => setPlataforma(e.target.value)}>
                <option value="">Selecione...</option>
                <option>PS5</option>
                <option>Xbox Series X</option>
                <option>Switch</option>
                <option>PC</option>
              </select>
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label small text-muted">Gênero *</label>
              <input type="text" className="form-control" placeholder="Ex: Ação/Aventura" value={genero} onChange={(e) => setGenero(e.target.value)} />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label small text-muted">URL da Capa</label>
              <input type="text" className="form-control" placeholder="https://..." value={capa} onChange={(e) => setCapa(e.target.value)} />
            </div>
            <div className="col-12">
              <label className="form-label small text-muted">Descrição *</label>
              <textarea className="form-control" placeholder="Breve descrição do jogo..." rows={3} value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            </div>
            <div className="col-12">
              <button className="btn btn-primary px-4" onClick={handleSubmit} disabled={!titulo || !plataforma || !genero || !descricao}>
                Adicionar Jogo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Editar Títulos */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex align-items-center gap-2 mb-4">
            <Pencil size={18} color="var(--cor-acento)" />
            <span className="fw-semibold">Editar Títulos</span>
          </div>

          <div className="d-flex flex-column gap-3">
            {jogos.map((jogo) => (
              <div key={jogo.id} className="card border-0 shadow-sm">
                <div className="card-body">
                  {editandoId === jogo.id && jogoEditado ? (
                    <div className="row g-2">
                      <div className="col-12 col-md-6">
                        <input type="text" className="form-control form-control-sm" value={jogoEditado.titulo} onChange={(e) => setJogoEditado({ ...jogoEditado, titulo: e.target.value })} />
                      </div>
                      <div className="col-12 col-md-6">
                        <select className="form-select form-select-sm" value={jogoEditado.plataforma} onChange={(e) => setJogoEditado({ ...jogoEditado, plataforma: e.target.value })}>
                          <option>PS5</option>
                          <option>Xbox Series X</option>
                          <option>Switch</option>
                          <option>PC</option>
                        </select>
                      </div>
                      <div className="col-12 col-md-6">
                        <input type="text" className="form-control form-control-sm" value={jogoEditado.genero} onChange={(e) => setJogoEditado({ ...jogoEditado, genero: e.target.value })} />
                      </div>
                      <div className="col-12 col-md-6">
                        <input type="text" className="form-control form-control-sm" placeholder="URL da capa" value={jogoEditado.capa} onChange={(e) => setJogoEditado({ ...jogoEditado, capa: e.target.value })} />
                      </div>
                      <div className="col-12">
                        <textarea className="form-control form-control-sm" rows={2} value={jogoEditado.descricao} onChange={(e) => setJogoEditado({ ...jogoEditado, descricao: e.target.value })} />
                      </div>
                      <div className="col-12 d-flex gap-2">
                        <button className="btn btn-sm btn-primary d-flex align-items-center gap-1" onClick={handleSalvarEdicao}>
                          <Check size={14} /> Salvar
                        </button>
                        <button className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1" onClick={handleCancelarEdicao}>
                          <X size={14} /> Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="fw-medium">{jogo.titulo}</span>
                        <span className="text-muted small ms-2">{jogo.plataforma} • {jogo.genero}</span>
                      </div>
                      <button className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1" onClick={() => handleIniciarEdicao(jogo)}>
                        <Pencil size={14} /> Editar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}