export type StatusJogo = "disponivel" | "alugado" | "reservado";

export interface IJogo {
  id: number;
  titulo: string;
  plataforma: string;
  genero: string;
  status: StatusJogo;
}

export interface IDashboard {
  totalJogos: number;
  totalDisponiveis: number;
  totalAlugados: number;
  totalReservados: number;
}