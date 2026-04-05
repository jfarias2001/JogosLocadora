import type { StatusJogo } from "../../types";

interface BadgeStatusProps {
  status: StatusJogo;
}

const config: Record<StatusJogo, { label: string; cls: string }> = {
  disponivel: { label: "Disponível", cls: "badge badge-success" },
  alugado:    { label: "Alugado",    cls: "badge badge-danger"  },
};

export function BadgeStatus({ status }: BadgeStatusProps) {
  const { label, cls } = config[status] ?? config.disponivel;
  return (
    <span className={cls}>
      <span className="badge-dot" />
      {label}
    </span>
  );
}
