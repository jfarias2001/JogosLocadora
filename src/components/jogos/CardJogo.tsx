import { Monitor, Tag, ImageOff, ShoppingCart, RotateCcw, Package } from "lucide-react";
import { useState } from "react";
import type { IJogo } from "../../types";
import { BadgeStatus } from "../common/BadgeStatus";

interface CardJogoProps {
  jogo: IJogo;
  onAlugar: (id: number) => void;
  onDevolver: (id: number) => void;
}

export function CardJogo({ jogo, onAlugar, onDevolver }: CardJogoProps) {
  const [imgError, setImgError] = useState(false);
  const disponivel = jogo.status === "disponivel";
  const semEstoque = jogo.estoque <= 0;

  return (
    <article className="game-card">
      <div className="game-card-cover">
        {imgError || !jogo.capa ? (
          <div className="game-card-no-image">
            <ImageOff size={28} />
            <span>{jogo.titulo}</span>
          </div>
        ) : (
          <img
            src={jogo.capa}
            alt={`Capa de ${jogo.titulo}`}
            onError={() => setImgError(true)}
          />
        )}
        <div className="game-card-badge-overlay">
          <BadgeStatus status={jogo.status} />
        </div>
      </div>

      <div className="game-card-body">
        <h3 className="game-card-title">{jogo.titulo}</h3>
        <div className="game-card-chips">
          <span className="chip">
            <Monitor size={10} />
            {jogo.plataforma}
          </span>
          <span className="chip">
            <Tag size={10} />
            {jogo.genero}
          </span>
        </div>
        <p className="game-card-desc">{jogo.descricao}</p>
        <div className="game-card-stock">
          <Package size={11} />
          {!semEstoque
            ? `${jogo.estoque} cópia${jogo.estoque === 1 ? "" : "s"} disponív${jogo.estoque === 1 ? "el" : "eis"}`
            : "Sem estoque"}
        </div>
      </div>

      <div className="game-card-footer">
        <button
          className="btn btn-primary"
          onClick={() => onAlugar(jogo.id)}
          disabled={semEstoque}
        >
          <ShoppingCart size={13} />
          Alugar
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => onDevolver(jogo.id)}
          disabled={disponivel}
          title="Devolver"
          style={{ flex: "0 0 auto", width: 32, padding: 0 }}
        >
          <RotateCcw size={13} />
        </button>
      </div>
    </article>
  );
}
