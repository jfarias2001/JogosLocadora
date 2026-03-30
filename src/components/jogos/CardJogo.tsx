import { Monitor, Tag, FileText, ShoppingCart, RotateCcw, ImageOff } from "lucide-react";
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

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body d-flex gap-3">
        <div
          className="rounded d-flex align-items-center justify-content-center flex-shrink-0"
          style={{ width: 90, height: 120, backgroundColor: "var(--cor-secundaria)", overflow: "hidden" }}
        >
          {imgError ? (
            <ImageOff size={28} color="var(--cor-texto-suave)" />
          ) : (
            <img
              src={jogo.capa}
              alt={`Capa de ${jogo.titulo}`}
              onError={() => setImgError(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </div>

        <div className="d-flex justify-content-between align-items-start flex-grow-1">
          <div className="flex-grow-1 me-3">
            <h5 className="card-title mb-2 fw-semibold">{jogo.titulo}</h5>
            <div className="d-flex gap-3 mb-2">
              <span className="d-flex align-items-center gap-1 small text-muted">
                <Monitor size={14} />
                {jogo.plataforma}
              </span>
              <span className="d-flex align-items-center gap-1 small text-muted">
                <Tag size={14} />
                {jogo.genero}
              </span>
            </div>
            <p className="card-text small text-muted mb-2 d-flex align-items-start gap-1">
              <FileText size={14} style={{ marginTop: "3px", flexShrink: 0 }} />
              {jogo.descricao}
            </p>
            <BadgeStatus status={jogo.status} />
          </div>
          <div className="d-flex flex-column gap-2">
            <button
              className="btn btn-sm btn-primary d-flex align-items-center gap-1"
              onClick={() => onAlugar(jogo.id)}
              disabled={jogo.status !== "disponivel"}
            >
              <ShoppingCart size={14} />
              Alugar
            </button>
            <button
              className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
              onClick={() => onDevolver(jogo.id)}
              disabled={jogo.status !== "alugado"}
            >
              <RotateCcw size={14} />
              Devolver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}