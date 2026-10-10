import type { AdminIconName } from "../../components/admin/AdminIcon";
import AdminIcon from "../../components/admin/AdminIcon";

export default function AdminSectionPage({ title, icon }: { title: string; icon: AdminIconName }) {
  return (
    <div className="admin-section-page">
      <header className="admin-page-heading"><div><h1>{title}</h1></div><p>Data simulasi</p></header>
      <section className="admin-glass-workspace admin-next-section">
        <AdminIcon name={icon} />
        <h2>Rancangan berikutnya</h2>
        <p>Struktur halaman sudah tersedia dan akan dilanjutkan pada tahap desain berikutnya.</p>
      </section>
    </div>
  );
}

