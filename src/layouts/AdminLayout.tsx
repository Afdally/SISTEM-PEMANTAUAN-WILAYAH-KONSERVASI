import { NavLink, Outlet, useNavigate } from "react-router";
import AdminIcon from "../components/admin/AdminIcon";
import { adminSessionKey } from "../components/admin/AdminGuard";
import "../admin.css";

const navigation = [
  { to: "/admin", end: true, label: "Dashboard", icon: "dashboard" as const },
  { to: "/admin/laporan", label: "Laporan", icon: "reports" as const },
  { to: "/admin/wilayah", label: "Wilayah", desktopLabel: "Wilayah Konservasi", icon: "area" as const },
  { to: "/admin/kategori", label: "Kategori", desktopLabel: "Kelola Kategori", icon: "category" as const }
];

const navClass = ({ isActive }: { isActive: boolean }) => `admin-nav-link${isActive ? " is-active" : ""}`;

export default function AdminLayout() {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem(adminSessionKey);
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="admin-app">
      <a className="skip-link" href="#admin-main">Lewati ke konten utama</a>
      <header className="admin-header">
        <NavLink to="/admin" className="admin-brand" aria-label="SIMEKA Admin KKP">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span><strong>SIMEKA</strong><small>Admin KKP</small></span>
        </NavLink>
        <div className="admin-account">
          <span><strong>Admin KKP</strong><small>Mode desain</small></span>
          <button type="button" onClick={logout} aria-label="Keluar dari portal admin"><AdminIcon name="logout" /><span>Keluar</span></button>
        </div>
      </header>

      <aside className="admin-sidebar" aria-label="Navigasi Admin">
        <nav>{navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.end} className={navClass}><AdminIcon name={item.icon} /><span>{item.desktopLabel ?? item.label}</span></NavLink>)}</nav>
        <span className="admin-sidebar-note">Data dan batas simulasi</span>
      </aside>

      <main id="admin-main" className="admin-main"><Outlet /></main>

      <nav className="admin-bottom-nav" aria-label="Navigasi Admin">
        {navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.end} className={navClass}><AdminIcon name={item.icon} /><span>{item.label}</span></NavLink>)}
      </nav>
    </div>
  );
}

