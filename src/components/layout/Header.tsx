import { Gamepad2 } from "lucide-react";

export function Header() {
  return (
    <header className="py-3 mb-4" style={{ backgroundColor: "var(--cor-primaria)" }}>
      <div className="container-fluid px-4 d-flex align-items-center gap-2">
        <Gamepad2 color="white" size={28} />
        <h1 className="text-white mb-0 fs-4 fw-semibold">PixelRent</h1>
      </div>
    </header>
  );
}