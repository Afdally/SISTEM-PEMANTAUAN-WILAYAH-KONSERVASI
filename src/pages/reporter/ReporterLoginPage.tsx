import { Link } from "react-router";
import "../../reporter.css";

export default function ReporterLoginPage() {
  return <main className="reporter-login-page">
    <section className="reporter-login-panel">
      <Link to="/" className="reporter-login-brand" aria-label="Kembali ke halaman publik SIMEKA"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><strong>SIMEKA</strong></Link>
      <div><p>Portal pelapor</p><h1>Masuk untuk mengirim laporan pesisir</h1><span>Riwayat laporan tersimpan mengikuti akun yang digunakan.</span></div>
      <Link className="google-login-button" to="/pelapor/buat-laporan"><i aria-hidden="true">G</i><span>Lanjutkan dengan Google</span></Link>
      <small>Mode desain: autentikasi Google belum terhubung.</small>
    </section>
    <aside className="reporter-login-visual" aria-label="Informasi pelaporan"><div><span>Foto</span><span>Lokasi</span><span>Kategori</span></div><p>Mulai dengan bukti visual, lalu lengkapi informasi kejadiannya.</p></aside>
  </main>;
}

