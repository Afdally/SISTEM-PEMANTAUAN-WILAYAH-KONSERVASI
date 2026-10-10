import { useEffect, useState } from "react";

type EventCategory = {
  name: string;
  reports: number;
  active: boolean;
};

type RegionCategory = {
  name: "Rendah" | "Sedang" | "Tinggi" | "Kritis";
  min: number;
  max: number | null;
  color: string;
};

type DialogState =
  | { kind: "event"; index: number | null }
  | { kind: "region"; index: number }
  | null;

const initialEventCategories: EventCategory[] = [
  { name: "Temuan satwa dilindungi", reports: 3, active: true },
  { name: "Penebangan mangrove", reports: 12, active: true },
  { name: "Pembukaan tambak", reports: 4, active: true },
  { name: "Sampah/pencemaran", reports: 9, active: true },
  { name: "Abrasi", reports: 6, active: true },
  { name: "Sedimentasi", reports: 2, active: true },
  { name: "Pemutihan karang", reports: 7, active: true },
  { name: "Kerusakan akibat jangkar", reports: 1, active: true },
  { name: "Penangkapan ikan destruktif", reports: 3, active: true },
  { name: "Kerusakan lokasi rehabilitasi", reports: 1, active: false }
];

const initialRegionCategories: RegionCategory[] = [
  { name: "Rendah", min: 0, max: 2, color: "#27836b" },
  { name: "Sedang", min: 3, max: 5, color: "#c9971d" },
  { name: "Tinggi", min: 6, max: 10, color: "#d7662f" },
  { name: "Kritis", min: 11, max: null, color: "#b93632" }
];

export default function AdminCategoryPage() {
  const [activeTab, setActiveTab] = useState<"event" | "region">("event");
  const [eventCategories, setEventCategories] = useState(initialEventCategories);
  const [regionCategories, setRegionCategories] = useState(initialRegionCategories);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [draftName, setDraftName] = useState("");
  const [draftMin, setDraftMin] = useState("0");
  const [draftMax, setDraftMax] = useState("");

  useEffect(() => {
    if (!dialog) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDialog(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [dialog]);

  const openEventDialog = (index: number | null) => {
    setDraftName(index === null ? "" : eventCategories[index].name);
    setDialog({ kind: "event", index });
  };

  const openRegionDialog = (index: number) => {
    const category = regionCategories[index];
    setDraftName(category.name);
    setDraftMin(String(category.min));
    setDraftMax(category.max === null ? "" : String(category.max));
    setDialog({ kind: "region", index });
  };

  const saveDialog = () => {
    if (!dialog) return;
    if (dialog.kind === "event") {
      const name = draftName.trim();
      if (!name) return;
      if (dialog.index === null) {
        setEventCategories((current) => [...current, { name, reports: 0, active: true }]);
      } else {
        setEventCategories((current) => current.map((item, index) => index === dialog.index ? { ...item, name } : item));
      }
    } else {
      const min = Math.max(0, Number(draftMin) || 0);
      const max = draftMax.trim() === "" ? null : Math.max(min, Number(draftMax) || min);
      setRegionCategories((current) => current.map((item, index) => index === dialog.index ? { ...item, min, max } : item));
    }
    setDialog(null);
  };

  const toggleCategory = (index: number) => {
    setEventCategories((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, active: !item.active } : item));
  };

  return (
    <div className="admin-category-page">
      <header className="admin-page-heading"><div><h1>Kelola Kategori</h1></div><p>Data simulasi</p></header>

      <section className="admin-glass-workspace admin-category-workspace">
        <div className="admin-category-toolbar">
          <div className="admin-category-tabs" role="tablist" aria-label="Jenis kategori">
            <button type="button" role="tab" aria-selected={activeTab === "event"} className={activeTab === "event" ? "is-active" : ""} onClick={() => setActiveTab("event")}>Kategori Kejadian</button>
            <button type="button" role="tab" aria-selected={activeTab === "region"} className={activeTab === "region" ? "is-active" : ""} onClick={() => setActiveTab("region")}>Kategori Wilayah</button>
          </div>
          {activeTab === "event" && <button type="button" className="admin-category-add" onClick={() => openEventDialog(null)}><span aria-hidden="true">+</span> Tambah kategori</button>}
        </div>

        {activeTab === "event" ? (
          <div className="admin-category-content" role="tabpanel">
            <header className="admin-category-section-heading"><div><h2>Kategori kejadian</h2><span>{eventCategories.length} kategori</span></div></header>
            <div className="admin-category-table">
              <div className="admin-category-table-head" aria-hidden="true"><span>Nama kategori</span><span>Laporan</span><span>Status</span><span>Aksi</span></div>
              {eventCategories.map((category, index) => (
                <div className="admin-category-row" key={`${category.name}-${index}`}>
                  <div className="admin-category-name"><strong>{category.name}</strong><small>Ditampilkan pada form pelapor</small></div>
                  <div className="admin-category-usage"><small>Laporan</small><strong>{category.reports}</strong></div>
                  <button type="button" className={`admin-category-status ${category.active ? "is-active" : "is-inactive"}`} onClick={() => toggleCategory(index)} aria-label={`${category.active ? "Nonaktifkan" : "Aktifkan"} ${category.name}`}><i aria-hidden="true" />{category.active ? "Aktif" : "Nonaktif"}</button>
                  <button type="button" className="admin-category-edit" onClick={() => openEventDialog(index)}>Edit</button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="admin-category-content" role="tabpanel">
            <header className="admin-category-section-heading"><div><h2>Kategori wilayah</h2><span>Berdasarkan laporan belum ditinjau</span></div></header>
            <div className="admin-region-category-list">
              {regionCategories.map((category, index) => (
                <article key={category.name}>
                  <i style={{ backgroundColor: category.color }} aria-hidden="true" />
                  <div><strong>{category.name}</strong><span>{category.max === null ? `${category.min}+ laporan` : `${category.min} - ${category.max} laporan`}</span></div>
                  <button type="button" onClick={() => openRegionDialog(index)}>Atur rentang</button>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      {dialog && (
        <div className="admin-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDialog(null); }}>
          <section className="admin-category-dialog" role="dialog" aria-modal="true" aria-labelledby="category-dialog-title">
            <header><h2 id="category-dialog-title">{dialog.kind === "event" ? (dialog.index === null ? "Tambah kategori" : "Edit kategori") : `Atur ${draftName}`}</h2></header>
            {dialog.kind === "event" ? (
              <label><span>Nama kategori</span><input autoFocus value={draftName} onChange={(event) => setDraftName(event.target.value)} placeholder="Nama kejadian" /></label>
            ) : (
              <div className="admin-range-fields">
                <label><span>Jumlah minimum</span><input autoFocus type="number" min="0" value={draftMin} onChange={(event) => setDraftMin(event.target.value)} /></label>
                <label><span>Jumlah maksimum</span><input type="number" min="0" value={draftMax} onChange={(event) => setDraftMax(event.target.value)} placeholder="Tanpa batas" disabled={draftName === "Kritis"} /></label>
              </div>
            )}
            <div className="admin-dialog-actions"><button type="button" onClick={() => setDialog(null)}>Batal</button><button type="button" onClick={saveDialog}>Simpan</button></div>
          </section>
        </div>
      )}
    </div>
  );
}

