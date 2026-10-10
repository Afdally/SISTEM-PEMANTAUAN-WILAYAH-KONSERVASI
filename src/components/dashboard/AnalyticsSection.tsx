import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { monthlyReports, reportComposition } from "../../data/monitoring";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Filler, Tooltip, Legend);

const lineData = {
  labels: monthlyReports.map((item) => item.month),
  datasets: [{
    data: monthlyReports.map((item) => item.count),
    borderColor: "#0878ac",
    backgroundColor: "rgba(8, 120, 172, 0.12)",
    pointBackgroundColor: "#ffffff",
    pointBorderColor: "#0878ac",
    pointBorderWidth: 2,
    pointRadius: 4,
    pointHoverRadius: 6,
    borderWidth: 3,
    fill: true,
    tension: 0.32
  }]
};

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 450 },
  plugins: { legend: { display: false }, tooltip: { callbacks: { label: (context: { parsed: { y: number | null } }) => `${context.parsed.y ?? 0} laporan` } } },
  scales: {
    x: { grid: { display: false }, ticks: { color: "#587584", font: { family: "IBM Plex Sans" } }, border: { color: "#cfdee4" } },
    y: { beginAtZero: true, ticks: { precision: 0, color: "#587584", font: { family: "IBM Plex Sans" } }, grid: { color: "rgba(73, 111, 130, 0.12)" }, border: { display: false } }
  }
} as const;

const doughnutData = {
  labels: reportComposition.map((item) => item.level),
  datasets: [{
    data: reportComposition.map((item) => item.count),
    backgroundColor: reportComposition.map((item) => item.color),
    borderColor: "#f8fbfc",
    borderWidth: 4,
    hoverOffset: 4
  }]
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "66%",
  animation: { duration: 450 },
  plugins: { legend: { display: false } }
} as const;

export default function AnalyticsSection() {
  return (
    <section className="page-shell mt-5 grid gap-4 lg:grid-cols-[1.25fr_0.9fr]" aria-label="Analitik laporan">
      <article className="content-panel">
        <header className="content-panel-heading">
          <div><p>Pergerakan laporan</p><h2>Tren laporan per bulan</h2></div>
          <span>2026</span>
        </header>
        <div className="mt-5 h-68"><Line data={lineData} options={lineOptions} aria-label="Grafik jumlah laporan per bulan pada tahun 2026" /></div>
      </article>

      <article className="content-panel">
        <header className="content-panel-heading">
          <div><p>Tingkat bahaya</p><h2>Komposisi laporan</h2></div>
          <span>48 laporan</span>
        </header>
        <div className="mt-4 grid grid-cols-[minmax(0,1fr)_minmax(7rem,0.72fr)] items-center gap-3">
          <div className="h-60 min-w-0"><Doughnut data={doughnutData} options={doughnutOptions} aria-label="Komposisi laporan berdasarkan tingkat bahaya" /></div>
          <ul className="m-0 grid list-none gap-3 p-0">
            {reportComposition.map((item) => (
              <li className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2 text-xs" key={item.level}>
                <span className="flex items-center gap-2"><i className="size-2 rounded-full" style={{ backgroundColor: item.color }} />{item.level}</span>
                <strong>{item.count}</strong>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
}

