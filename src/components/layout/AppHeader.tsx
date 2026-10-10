import { NavLink } from "react-router";

export default function AppHeader() {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? "nav-link-active" : ""}`;

  return (
    <header className="site-header">
      <div className="page-shell flex min-h-18 items-center justify-between gap-4">
        <NavLink to="/" className="brand-link" aria-label="SIMEKA, kembali ke Dashboard">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span className="min-w-0">
            <strong className="block text-xl font-bold tracking-[0.02em] text-blue-950 sm:text-2xl">SIMEKA</strong>
            <span className="hidden text-[0.68rem] text-slate-600 sm:block">Sistem Informasi Monitoring Ekosistem, Keanekaragaman, dan Ancaman</span>
          </span>
        </NavLink>
        <nav className="flex items-center gap-1" aria-label="Navigasi utama">
          <NavLink to="/" end className={navClass}>Dashboard</NavLink>
          <NavLink to="/gis" className={navClass}>GIS</NavLink>
          <NavLink to="/pelapor/login" className="nav-link nav-login">Masuk</NavLink>
        </nav>
      </div>
    </header>
  );
}

