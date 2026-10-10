export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white/75">
      <div className="page-shell grid gap-3 py-7 text-xs text-slate-600 sm:grid-cols-[auto_1fr] sm:items-end sm:gap-10">
        <p className="m-0"><strong className="text-sm text-blue-950">SIMEKA</strong><br />Prototipe tampilan publik · {new Date().getFullYear()}</p>
        <p className="m-0 max-w-3xl sm:justify-self-end sm:text-right">Data dan indikator perlu divalidasi sebelum digunakan sebagai informasi resmi.</p>
      </div>
    </footer>
  );
}

