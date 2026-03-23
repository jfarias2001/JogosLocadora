import type { StatusJogo } from "../../types";

interface BadgeStatusProps {
  status: StatusJogo;
}

export function BadgeStatus({ status }: BadgeStatusProps) {
  const labels: Record<StatusJogo, string> = {
    disponivel: "Disponível",
    alugado: "Alugado",
    reservado: "Reservado",
  };

  return (
    <span className={`badge badge-${status}`}>
      {labels[status]}
    </span>
  );
}