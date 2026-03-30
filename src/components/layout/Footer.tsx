import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-4 mt-5" style={{ backgroundColor: "var(--cor-primaria)" }}>
      <div className="container d-flex align-items-center gap-2">
        <GraduationCap size={18} color="white" />
        <address className="text-white mb-0 small" style={{ fontStyle: "normal" }}>
          <strong>João Paulo Alves Farias</strong> &bull; Desenvolvimento Web &bull; Prof. Alexandre Almeida &bull;{" "}
          {new Date().toLocaleDateString("pt-BR")}
        </address>
      </div>
    </footer>
  );
}