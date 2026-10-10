import { useMemo, useState } from "react";
import { Link } from "react-router";
import { getReporterHistory, ReporterStatus } from "../../data/reporter";

type FilterValue = "Semua" | ReporterStatus;
const filters: FilterValue[] = ["Semua", "Laporan masyarakat", "Telah ditinjau", "Perlu diperbaiki"];

function statusClass(status: ReporterStatus) {
  if (status === "Telah ditinjau") return "is-reviewed";
  if (status === "Perlu diperbaiki") return "is-revision";
  return "is-community";
}

export default function ReportHistoryPage() {
  const [filter, setFilter] = useState<FilterValue>("Semua");
  const reports = useMemo(() => getReporterHistory(), []);
  const items = useMemo(() => filter === "Semua" ? reports : reports.filter((item) => item.status === filter), [filter, reports]);

  return <div className="report-history-page">
    <header className="report-page-heading"><h3>Riwayat Laporan</h3></header>
    <div className="history-filter" aria-label="Filter status laporan">{filters.map((item) => <button type="button" className={filter === item ? "is-active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
    <p className="history-count" role="status">Menampilkan {items.length} laporan</p>
    {items.length ? <div className="history-list">{items.map((item) => <Link className="history-card" to={`/pelapor/riwayat/${item.id}`} key={item.id}>
      <img src={item.image} alt="" style={{ objectPosition: item.imagePosition }} />
      <div className="history-card-body"><div><span className={`reporter-status ${statusClass(item.status)}`}>{item.status}</span><time>{item.date}</time></div><h2>{item.category}</h2><p>{item.location} · {item.region}</p><small>{item.id}</small></div>
    </Link>)}</div> : <div className="history-empty"><h2>Tidak ada laporan dengan status ini</h2><p>Pilih status lain atau buat laporan baru.</p><Link to="/pelapor/buat-laporan">Buat laporan</Link></div>}
  </div>;
}

