import { Link } from "react-router";
import { updatedAt } from "../../data/monitoring";

type StatCellProps = {
  value: string;
  label: string;
  featured?: boolean;
  alert?: boolean;
  dark?: boolean;
};

function StatCell({ value, label, featured, alert, dark }: StatCellProps) {
  const classes = [
    "stat-cell",
    featured ? "stat-cell-featured" : "",
    alert ? "stat-cell-alert" : "",
    dark ? "stat-cell-dark" : ""
  ].filter(Boolean).join(" ");

  return <div className={classes}><strong>{value}</strong><span>{label}</span></div>;
}

export default function SummaryOverview() {
  return (
    <section className="page-shell pt-3" aria-label="Ringkasan kawasan dan pelaporan">
      <p className="mb-3 text-right text-xs text-slate-600">Data diperbarui {updatedAt}</p>
      <div className="grid gap-4 lg:grid-cols-[1.06fr_0.94fr]">
        <article className="conservation-panel" aria-labelledby="conservation-title">
          <header className="panel-title-row">
            <h2 id="conservation-title">Kawasan konservasi</h2>
            <Link to="/gis" className="round-link" aria-label="Buka kawasan konservasi di halaman GIS">→</Link>
          </header>
          <div className="grid grid-cols-2 gap-3">
            <StatCell value="81,8" label="Ribu ha luas konservasi" featured dark />
            <StatCell value="6" label="Kawasan dipantau" dark />
            <StatCell value="2" label="Perlu perhatian" dark />
          </div>
        </article>

        <article className="reporting-panel" aria-labelledby="reporting-title">
          <header className="panel-title-row">
            <h2 id="reporting-title">Aktivitas pelaporan</h2>
          </header>
          <div className="grid grid-cols-2 gap-3">
            <StatCell value="48" label="Total laporan" />
            <StatCell value="36" label="Ditinjau" />
            <StatCell value="7" label="Ancaman aktif" alert />
            <StatCell value="12" label="Spesies dilaporkan" />
          </div>
        </article>
      </div>
    </section>
  );
}

