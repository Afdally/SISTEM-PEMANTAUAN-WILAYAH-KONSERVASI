import { Link } from "react-router";
import AdminIcon from "../../components/admin/AdminIcon";
import { adminAreaComposition, adminAreas, adminMetrics, adminRecentReports, adminReportMonths, adminReportTrend } from "../../data/admin";

const statusClass: Record<string, string> = {
  Kritis: "is-critical",
  Tinggi: "is-high",
  Sedang: "is-medium",
  Rendah: "is-low"
};

export default function AdminDashboardPage() {
  const linePoints = adminReportTrend.map((value, index) => `${16 + index * 31},${116 - value * 9}`).join(" ");

  return (
    <div className="admin-dashboard">
      <header className="admin-page-heading"><div><h1>Dashboard</h1><span>10 Oktober 2026</span></div><p>Data simulasi</p></header>

      <section className="dashboard-workspace" aria-label="Ringkasan operasional admin">
        <div className="admin-metric-grid">
          {adminMetrics.map((metric) => <article className={`admin-metric${metric.emphasis ? " is-emphasis" : ""}`} key={metric.label}>
            <strong>{metric.value}</strong>{metric.unit && <small>{metric.unit}</small>}<span>{metric.label}</span>
          </article>)}
        </div>

        <div className="admin-dashboard-grid admin-dashboard-grid-primary">
          <article className="admin-panel admin-map-panel">
            <header><h2>Wilayah konservasi</h2><Link to="/admin/wilayah" aria-label="Buka Wilayah Konservasi"><AdminIcon name="arrow" /></Link></header>
            <div className="admin-map-visual">
              <svg viewBox="0 0 520 250" role="img" aria-label="Peta simulasi tiga wilayah konservasi">
                <path className="admin-coast-shape" d="M0 188C72 166 102 122 177 135c68 12 75 66 145 53 72-14 88-85 198-73v135H0Z" />
                <path className="admin-area-shape area-critical" d="m97 112 42-34 58 17 13 48-44 32-60-19Z" />
                <path className="admin-area-shape area-high" d="m279 60 55-27 62 25-3 55-57 24-56-24Z" />
                <path className="admin-area-shape area-medium" d="m369 151 50-24 54 20 12 47-45 31-60-20Z" />
                <circle className="admin-map-point point-critical" cx="154" cy="127" r="8" />
                <circle className="admin-map-point point-high" cx="338" cy="83" r="8" />
                <circle className="admin-map-point point-medium" cx="426" cy="177" r="8" />
              </svg>
              <span>Batas simulasi</span>
            </div>
            <div className="admin-area-list">{adminAreas.map((area) => <div key={area.name}><i style={{ backgroundColor: area.color }} /><span><strong>{area.name}</strong><small>{area.reports} belum ditinjau</small></span><b>{area.category}</b></div>)}</div>
          </article>

          <article className="admin-panel admin-composition-panel">
            <header><h2>Kategori wilayah</h2><Link to="/admin/kategori" aria-label="Buka Kategori Wilayah"><AdminIcon name="arrow" /></Link></header>
            <div className="admin-category-chart"><div className="admin-donut"><span><strong>3</strong><small>wilayah</small></span></div>
              <ul>{adminAreaComposition.map((item) => <li key={item.label}><span><i style={{ backgroundColor: item.color }} />{item.label}</span><strong>{item.value}</strong></li>)}</ul>
            </div>
          </article>
        </div>

        <div className="admin-dashboard-grid admin-dashboard-grid-secondary">
          <article className="admin-panel admin-trend-panel">
            <header><h2>Laporan per bulan</h2><span>2026</span></header>
            <svg viewBox="0 0 310 135" role="img" aria-label="Tren laporan Januari sampai Oktober 2026">
              <path d="M16 116H295" className="admin-chart-axis" />
              <polyline points={linePoints} className="admin-chart-line" />
              {adminReportTrend.map((value, index) => <circle key={adminReportMonths[index]} cx={16 + index * 31} cy={116 - value * 9} r="3.5" className="admin-chart-point" />)}
            </svg>
            <div className="admin-chart-months">{adminReportMonths.map((month) => <span key={month}>{month}</span>)}</div>
          </article>

          <article className="admin-panel admin-latest-panel">
            <header><h2>Laporan terbaru</h2><Link to="/admin/laporan">Lihat semua</Link></header>
            <div className="admin-latest-list">{adminRecentReports.map((report) => <Link to="/admin/laporan" key={report.id}>
              <span><strong>{report.title}</strong><small>{report.location}</small></span><span><b className={statusClass[report.category]}>{report.category}</b><time>{report.date}</time></span>
            </Link>)}</div>
          </article>
        </div>
      </section>
    </div>
  );
}

