import { reports } from "../../data/monitoring";
import StatusBadge from "../ui/StatusBadge";

export default function LatestReports() {
  return (
    <section className="page-shell mt-15" aria-labelledby="latest-reports-title">
      <header className="section-heading">
        <div><p>Laporan terbaru</p><h2 id="latest-reports-title">Temuan dari lapangan</h2></div>
        <span>Klik kartu untuk membuka detail.</span>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {reports.map((report) => (
          <details className="report-card" key={report.id}>
            <summary>
              <img src={report.image} alt="Pesisir pada lokasi laporan" loading="lazy" style={{ objectPosition: report.imagePosition }} />
              <span className="report-card-content">
                <span className="flex items-center justify-between gap-2">
                  <span className="report-category">{report.category}</span>
                  <StatusBadge severity={report.severity} />
                </span>
                <strong>{report.title}</strong>
                <span>{report.location}</span>
                <time>{report.date}</time>
              </span>
            </summary>
            <div className="report-card-detail">
              <p>{report.description}</p>
              <dl><div><dt>Status</dt><dd>{report.reviewStatus}</dd></div><div><dt>ID</dt><dd>{report.id}</dd></div></dl>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

