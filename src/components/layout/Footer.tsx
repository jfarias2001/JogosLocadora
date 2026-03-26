export function Footer() {
  return (
    <footer className="py-4 mt-5" style={{ backgroundColor: "var(--cor-primaria)" }}>
      <div className="container">
        <address className="text-white mb-0" style={{ fontStyle: "normal" }}>
          <strong>João Paulo Alves Farias</strong> &bull; Disciplina: Desenvolvimento de Software Web &bull; Prof. Alexandre Almeida &bull;{" "}
          {new Date().toLocaleDateString("pt-BR")}
        </address>
      </div>
    </footer>
  );
}