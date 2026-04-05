import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="app-footer">
      <GraduationCap size={15} />
      <address style={{ fontStyle: "normal" }}>
        <strong>João Paulo Alves Farias</strong> · Desenvolvimento Web · Prof. Alexandre Almeida ·{" "}
        {new Date().toLocaleDateString("pt-BR")}
      </address>
    </footer>
  );
}
