import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { deleteReporterHistoryItem, getReporterHistory, ReporterStatus } from "../../data/reporter";

function statusClass(status: ReporterStatus) {
  if (status === "Telah ditinjau") return "is-reviewed";
  if (status === "Perlu diperbaiki") return "is-revision";
  return "is-community";
}

export default function AdminReportDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const report = getReporterHistory().find((item) => item.id === id);

  useEffect(() => {
    if (!confirmDelete) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setConfirmDelete(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [confirmDelete]);

  if (!report) {
    return <div className="admin-report-detail-screen"><header className="admin-page-heading"><div><h1>Laporan tidak ditemukan</h1></div></header><section className="admin-glass-workspace admin-report-empty"><p>Laporan mungkin telah dihapus atau tidak tersedia.</p><Link to="/admin/laporan">Kembali ke laporan</Link></section></div>;
  }

  const deleteReport = () => {
    deleteReporterHistoryItem(report.id);
    navigate("/admin/laporan", { replace: true });
  };

  return (
    <div className="admin-report-detail-screen">
      <header className="admin-report-page-header">
        <Link to="/admin/laporan" className="admin-report-back" aria-label="Kembali ke daftar laporan"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg></Link>
        <div><small>{report.id}</small><h1>{report.category}</h1></div>
        <span className={`admin-report-status ${statusClass(report.status)}`}>{report.status}</span>
      </header>

      <article className="admin-glass-workspace admin-report-detail-page">
        <figure><img src={report.image} alt="Dokumentasi kejadian yang dilaporkan" style={{ objectPosition: report.imagePosition }} /><figcaption>Foto laporan · data simulasi</figcaption></figure>
        <div className="admin-report-detail-content">
          <section><h2>Informasi laporan</h2><p>{report.description}</p></section>
          <dl><div><dt>Lokasi umum</dt><dd>{report.location}</dd></div><div><dt>Wilayah</dt><dd>{report.region}</dd></div><div><dt>Tanggal</dt><dd>{report.date}</dd></div><div><dt>Status</dt><dd>{report.status}</dd></div></dl>
          <aside><h2>Catatan Admin</h2><p>{report.adminNote ?? "Belum ada catatan."}</p></aside>
          <div className="admin-report-detail-actions"><Link to="/admin/laporan">Kembali</Link><button type="button" onClick={() => setConfirmDelete(true)}>Hapus laporan</button></div>
        </div>
      </article>

      {confirmDelete && <div className="admin-report-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setConfirmDelete(false); }}><section className="admin-report-delete-dialog" role="alertdialog" aria-modal="true" aria-labelledby="admin-detail-delete-title" aria-describedby="admin-detail-delete-description"><h2 id="admin-detail-delete-title">Hapus laporan?</h2><p id="admin-detail-delete-description"><strong>{report.category}</strong> dengan ID {report.id} akan dihapus dari tampilan publik dan riwayat pelapor.</p><div><button type="button" onClick={() => setConfirmDelete(false)}>Batal</button><button type="button" onClick={deleteReport}>Ya, hapus</button></div></section></div>}
    </div>
  );
}
