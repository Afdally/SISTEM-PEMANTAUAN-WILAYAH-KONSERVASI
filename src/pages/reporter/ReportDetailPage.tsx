import { Link, useParams } from "react-router";
import ReporterIcon from "../../components/reporter/ReporterIcon";
import { getReporterHistory } from "../../data/reporter";

export default function ReportDetailPage() {
  const { id } = useParams();
  const report = getReporterHistory().find((item) => item.id === id);

  if (!report) return <section className="history-empty"><h1>Laporan tidak ditemukan</h1><p>Data mungkin tidak tersedia pada prototipe ini.</p><Link to="/pelapor/riwayat">Kembali ke riwayat</Link></section>;

  return <article className="report-detail-page">
    <Link className="report-detail-back" to="/pelapor/riwayat"><ReporterIcon name="back" />Kembali ke riwayat</Link>
    <header><div><p>{report.id}</p><h1>{report.category}</h1><span>{report.location} · {report.date}</span></div><span className="reporter-status">{report.status}</span></header>
    <figure><img src={report.image} alt="Dokumentasi kejadian yang dilaporkan" style={{ objectPosition: report.imagePosition }} /><figcaption>Foto laporan · data simulasi</figcaption></figure>
    <div className="report-detail-grid">
      <section><h2>Informasi laporan</h2><p>{report.description}</p><dl><div><dt>Lokasi umum</dt><dd>{report.location}</dd></div><div><dt>Wilayah</dt><dd>{report.region}</dd></div><div><dt>Tanggal</dt><dd>{report.date}</dd></div><div><dt>Status</dt><dd>{report.status}</dd></div></dl></section>
      <aside><h2>Catatan Admin</h2><p>{report.adminNote ?? "Laporan belum memiliki catatan dari Admin."}</p><small>Identitas pelapor tidak ditampilkan pada halaman publik.</small></aside>
    </div>
  </article>;
}

