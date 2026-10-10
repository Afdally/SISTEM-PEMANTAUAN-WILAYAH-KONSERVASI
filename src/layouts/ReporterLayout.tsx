import { NavLink, Outlet } from "react-router";
import ReporterIcon from "../components/reporter/ReporterIcon";
import "../reporter.css";

const navClass = ({ isActive }: { isActive: boolean }) => `reporter-nav-link${isActive ? " is-active" : ""}`;

export default function ReporterLayout() {
  return (
    <div className="reporter-app">
      <a className="skip-link" href="#reporter-main">Lewati ke konten utama</a>
      <header className="reporter-header">
        <NavLink to="/pelapor/buat-laporan" className="reporter-brand" aria-label="SIMEKA Pelapor">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span><strong>SIMEKA</strong><small>Pelaporan pesisir</small></span>
        </NavLink>
        <details className="reporter-account">
          <summary aria-label="Buka menu akun"><span className="reporter-avatar"><ReporterIcon name="user" /></span><span className="reporter-account-copy"><strong>Akun Google</strong><small>Mode desain</small></span></summary>
          <div><p>Autentikasi Google belum dihubungkan.</p><NavLink to="/">Kembali ke halaman publik</NavLink></div>
        </details>
      </header>

      <aside className="reporter-sidebar" aria-label="Navigasi Pelapor">
        <p>Menu pelapor</p>
        <nav>
          <NavLink to="/pelapor/buat-laporan" className={navClass}><ReporterIcon name="camera" /><span><strong>Buat Laporan</strong><small>Foto kejadian baru</small></span></NavLink>
          <NavLink to="/pelapor/riwayat" className={navClass}><ReporterIcon name="history" /><span><strong>Riwayat</strong><small>Status laporan Anda</small></span></NavLink>
        </nav>
      </aside>

      <main id="reporter-main" className="reporter-main"><Outlet /></main>

      <nav className="reporter-bottom-nav" aria-label="Navigasi Pelapor">
        <NavLink to="/pelapor/buat-laporan" className={navClass}><ReporterIcon name="camera" /><span>Buat Laporan</span></NavLink>
        <NavLink to="/pelapor/riwayat" className={navClass}><ReporterIcon name="history" /><span>Riwayat</span></NavLink>
      </nav>
    </div>
  );
}

