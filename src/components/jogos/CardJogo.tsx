import type { IJogo, StatusJogo } from "../../types";
import { BadgeStatus } from "../common/BadgeStatus";

interface CardJogoProps {
  jogo: IJogo;
  onAlugar: (id: number) => void;
  onDevolver: (id: number) => void;
}

export function CardJogo({ jogo, onAlugar, onDevolver }: CardJogoProps) {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title mb-1">{jogo.titulo}</h5>
          <p className="card-text text-muted mb-1">
            {jogo.plataforma} • {jogo.genero}
          </p>
          <BadgeStatus status={jogo.status} />
        </div>
        <div className="d-flex flex-column gap-2">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => onAlugar(jogo.id)}
            disabled={jogo.status !== "disponivel"}
          >
            Alugar
          </button>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => onDevolver(jogo.id)}
            disabled={jogo.status !== "alugado"}
          >
            Devolver
          </button>
        </div>
      </div>
    </div>
  );
}