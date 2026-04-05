import { useState } from "react";
import { Settings, PlusCircle, Pencil, X, Check, CheckCircle } from "lucide-react";
import type { IJogo, StatusJogo } from "../../types";

interface ConfiguracoesProps {
  onAdicionarJogo: (jogo: Omit<IJogo, "estoque">) => void;
  onEditarJogo: (jogo: IJogo) => void;
  totalJogos: number;
  jogos: IJogo[];
}

export function Configuracoes({ onAdicionarJogo, onEditarJogo, totalJogos, jogos }: ConfiguracoesProps) {
  const [titulo, setTitulo] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [genero, setGenero] = useState("");
  const [descricao, setDescricao] = useState("");
  const [capa, setCapa] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [jogoEditado, setJogoEditado] = useState<IJogo | null>(null);

  const canSubmit = Boolean(titulo && plataforma && genero && descricao);

  function handleSubmit() {
    if (!canSubmit) return;
    onAdicionarJogo({
      id: totalJogos + 1,
      titulo,
      plataforma,
      genero,
      descricao,
      capa,
      status: "disponivel" as StatusJogo,
    });
    setTitulo(""); setPlataforma(""); setGenero(""); setDescricao(""); setCapa("");
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
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="page-header-icon">
            <Settings size={20} />
          </div>
          <div>
            <h1 className="page-title">Configurações</h1>
            <p className="page-subtitle">Gerencie o catálogo de jogos</p>
          </div>
        </div>
      </div>

      {/* Add game */}
      <div className="card">
        <div className="card-header">
          <div className="card-header-icon"><PlusCircle size={14} /></div>
          <span className="card-header-title">Adicionar Título</span>
        </div>
        <div className="card-body">
          {sucesso && (
            <div className="alert alert-success" style={{ marginBottom: "16px" }}>
              <CheckCircle size={15} />
              Jogo adicionado com sucesso!
            </div>
          )}
          <div className="form-row">
            <div className="form-field">
              <label className="form-label">Título *</label>
              <input
                type="text"
                className="input"
                placeholder="Ex: God of War"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="form-label">Plataforma *</label>
              <select className="input" value={plataforma} onChange={(e) => setPlataforma(e.target.value)}>
                <option value="">Selecione...</option>
                <option>PS5</option>
                <option>Xbox Series X</option>
                <option>Switch</option>
                <option>PC</option>
              </select>
            </div>
            <div className="form-field">
              <label className="form-label">Gênero *</label>
              <input
                type="text"
                className="input"
                placeholder="Ex: Ação/Aventura"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="form-label">URL da Capa</label>
              <input
                type="text"
                className="input"
                placeholder="https://..."
                value={capa}
                onChange={(e) => setCapa(e.target.value)}
              />
            </div>
            <div className="form-field form-full">
              <label className="form-label">Descrição *</label>
              <textarea
                className="input"
                rows={3}
                placeholder="Breve descrição do jogo..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
          </div>
          <div style={{ marginTop: "16px" }}>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={!canSubmit}>
              <PlusCircle size={14} />
              Adicionar Jogo
            </button>
          </div>
        </div>
      </div>

      {/* Edit games */}
      <div className="card">
        <div className="card-header">
          <div className="card-header-icon"><Pencil size={14} /></div>
          <span className="card-header-title">Editar Títulos</span>
          <span style={{ marginLeft: "auto", fontSize: "12px", color: "var(--clr-text-tertiary)" }}>
            {jogos.length} título{jogos.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {jogos.map((jogo) => (
            <div key={jogo.id} className="settings-item">
              {editandoId === jogo.id && jogoEditado ? (
                <div>
                  <div className="form-row" style={{ marginBottom: "12px" }}>
                    <div className="form-field">
                      <label className="form-label">Título</label>
                      <input
                        type="text"
                        className="input"
                        value={jogoEditado.titulo}
                        onChange={(e) => setJogoEditado({ ...jogoEditado, titulo: e.target.value })}
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Plataforma</label>
                      <select
                        className="input"
                        value={jogoEditado.plataforma}
                        onChange={(e) => setJogoEditado({ ...jogoEditado, plataforma: e.target.value })}
                      >
                        <option>PS5</option>
                        <option>Xbox Series X</option>
                        <option>Switch</option>
                        <option>PC</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label className="form-label">Gênero</label>
                      <input
                        type="text"
                        className="input"
                        value={jogoEditado.genero}
                        onChange={(e) => setJogoEditado({ ...jogoEditado, genero: e.target.value })}
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">URL da Capa</label>
                      <input
                        type="text"
                        className="input"
                        placeholder="https://..."
                        value={jogoEditado.capa}
                        onChange={(e) => setJogoEditado({ ...jogoEditado, capa: e.target.value })}
                      />
                    </div>
                    <div className="form-field form-full">
                      <label className="form-label">Descrição</label>
                      <textarea
                        className="input"
                        rows={2}
                        value={jogoEditado.descricao}
                        onChange={(e) => setJogoEditado({ ...jogoEditado, descricao: e.target.value })}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button className="btn btn-primary btn-sm" onClick={handleSalvarEdicao}>
                      <Check size={13} /> Salvar
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={handleCancelarEdicao}>
                      <X size={13} /> Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="settings-item-row">
                  <div className="settings-item-info">
                    <div className="settings-item-name">{jogo.titulo}</div>
                    <div className="settings-item-meta">{jogo.plataforma} · {jogo.genero} · estoque: {jogo.estoque}</div>
                  </div>
                  <div className="settings-item-actions">
                    <button className="btn btn-secondary btn-sm" onClick={() => handleIniciarEdicao(jogo)}>
                      <Pencil size={13} /> Editar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
