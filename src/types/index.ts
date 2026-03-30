export type StatusJogo = "disponivel" | "alugado";

export interface IJogo {
  id: number;
  titulo: string;
  plataforma: string;
  genero: string;
  descricao: string;
  capa: string;
  status: StatusJogo;
}

export interface IDashboard {
  totalJogos: number;
  totalDisponiveis: number;
  totalAlugados: number;
  totalReservados: number;
}

export type PaginaAtiva = "acervo" | "relatorios" | "configuracoes";