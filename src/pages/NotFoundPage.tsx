import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main id="main-content" className="page-shell py-20">
      <p className="text-sm font-bold uppercase tracking-widest text-blue-700">404</p>
      <h1 className="font-display text-4xl text-blue-950">Halaman tidak ditemukan</h1>
      <Link className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-blue-800 px-5 font-semibold text-white" to="/">Kembali ke Dashboard</Link>
    </main>
  );
}

