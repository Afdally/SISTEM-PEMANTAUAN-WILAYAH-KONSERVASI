import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { deleteReporterHistoryItem, getReporterHistory, ReporterHistoryItem, ReporterStatus } from "../../data/reporter";

type StatusFilter = "Semua" | ReporterStatus;

const statusFilters: StatusFilter[] = ["Semua", "Laporan masyarakat", "Telah ditinjau", "Perlu diperbaiki"];

function statusClass(status: ReporterStatus) {
  if (status === "Telah ditinjau") return "is-reviewed";
  if (status === "Perlu diperbaiki") return "is-revision";
  return "is-community";
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState(() => getReporterHistory());
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Semua");
  const [deleteTarget, setDeleteTarget] = useState<ReporterHistoryItem | null>(null);

  const visibleReports = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase("id-ID");
    return reports.filter((report) => {
      const matchesSearch = !keyword || `${report.id} ${report.category} ${report.location} ${report.region}`.toLocaleLowerCase("id-ID").includes(keyword);
      const matchesStatus = statusFilter === "Semua" || report.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [query, reports, statusFilter]);

  useEffect(() => {
    if (!deleteTarget) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDeleteTarget(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [deleteTarget]);

  const requestDelete = (report: ReporterHistoryItem) => {
    setDeleteTarget(report);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteReporterHistoryItem(deleteTarget.id);
    setReports((current) => current.filter((report) => report.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="admin-report-page">
      <header className="admin-page-heading"><div><h1>Laporan</h1></div><p>Data simulasi</p></header>

      <section className="admin-glass-workspace admin-report-workspace">
        <div className="admin-report-toolbar">
          <label className="admin-report-search">
            <span className="sr-only">Cari laporan</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></svg>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari ID, kategori, atau lokasi" />
          </label>
          <label className="admin-report-filter"><span className="sr-only">Filter status</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}>{statusFilters.map((status) => <option key={status}>{status === "Semua" ? "Semua status" : status}</option>)}</select></label>
        </div>

        <div className="admin-report-result-heading"><h2>Laporan masuk</h2><span>{visibleReports.length} laporan</span></div>

        {visibleReports.length ? (
          <div className="admin-report-list">
            <div className="admin-report-list-head" aria-hidden="true"><span>Laporan</span><span>Lokasi</span><span>Status</span><span>Aksi</span></div>
            {visibleReports.map((report) => (
              <article className="admin-report-row" key={report.id}>
                <Link className="admin-report-summary" to={`/admin/laporan/${report.id}`}>
                  <img src={report.image} alt="" style={{ objectPosition: report.imagePosition }} />
                  <span><strong>{report.category}</strong><small>{report.id} · {report.date}</small></span>
                </Link>
                <div className="admin-report-location"><small>Lokasi</small><strong>{report.location}</strong><span>{report.region}</span></div>
                <div><span className={`admin-report-status ${statusClass(report.status)}`}>{report.status}</span></div>
                <div className="admin-report-actions"><Link to={`/admin/laporan/${report.id}`}>Detail</Link><button type="button" onClick={() => requestDelete(report)}>Hapus</button></div>
              </article>
            ))}
          </div>
        ) : (
          <div className="admin-report-empty"><h3>Tidak ada laporan yang cocok</h3><p>Ubah pencarian atau tampilkan kembali semua status.</p><button type="button" onClick={() => { setQuery(""); setStatusFilter("Semua"); }}>Reset pencarian</button></div>
        )}
      </section>

      {deleteTarget && (
        <div className="admin-report-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDeleteTarget(null); }}>
          <section className="admin-report-delete-dialog" role="alertdialog" aria-modal="true" aria-labelledby="admin-report-delete-title" aria-describedby="admin-report-delete-description">
            <h2 id="admin-report-delete-title">Hapus laporan?</h2>
            <p id="admin-report-delete-description"><strong>{deleteTarget.category}</strong> dengan ID {deleteTarget.id} akan dihapus dari tampilan publik dan riwayat pelapor.</p>
            <div><button type="button" onClick={() => setDeleteTarget(null)}>Batal</button><button type="button" onClick={confirmDelete}>Ya, hapus</button></div>
          </section>
        </div>
      )}
    </div>
  );
}
