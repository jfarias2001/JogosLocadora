import type { IJogo } from "../../types";
import { CardJogo } from "./CardJogo";

interface ListaJogosProps {
  jogos: IJogo[];
  onAlugar: (id: number) => void;
  onDevolver: (id: number) => void;
}

export function ListaJogos({ jogos, onAlugar, onDevolver }: ListaJogosProps) {
  return (
    <section>
      <h4 className="mb-4">🎮 Jogos Disponíveis</h4>
      {jogos.map((jogo) => (
        <CardJogo
          key={jogo.id}
          jogo={jogo}
          onAlugar={onAlugar}
          onDevolver={onDevolver}
        />
      ))}
    </section>
  );
}