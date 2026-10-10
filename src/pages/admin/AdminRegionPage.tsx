import { useEffect, useMemo, useState } from "react";

type RegionCategory = "Rendah" | "Sedang" | "Tinggi" | "Kritis";

type ConservationRegion = {
  id: number;
  name: string;
  district: string;
  area: number;
  pendingReports: number;
  category: RegionCategory;
  spatialFile: string;
  legalBasis: string;
  updatedAt: string;
};

const initialRegions: ConservationRegion[] = [
  { id: 1, name: "Pesisir Latawe", district: "Tiworo Utara", area: 18420, pendingReports: 14, category: "Kritis", spatialFile: "latawe-batas.zip", legalBasis: "Dokumen penetapan simulasi", updatedAt: "8 Oktober 2026" },
  { id: 2, name: "Perairan Napabalano", district: "Napabalano", area: 26780, pendingReports: 9, category: "Tinggi", spatialFile: "napabalano-batas.zip", legalBasis: "Dokumen penetapan simulasi", updatedAt: "6 Oktober 2026" },
  { id: 3, name: "Teluk Lasalepa", district: "Lasalepa", area: 17700, pendingReports: 5, category: "Sedang", spatialFile: "lasalepa-batas.zip", legalBasis: "Dokumen penetapan simulasi", updatedAt: "2 Oktober 2026" }
];

const categories: Array<"Semua" | RegionCategory> = ["Semua", "Rendah", "Sedang", "Tinggi", "Kritis"];

type LayerKey = "boundary" | "zoning" | "mangrove" | "coral" | "seagrass" | "reports";

const layerGroups: Array<{ title: string; items: Array<{ key: LayerKey; label: string }> }> = [
  { title: "Kawasan", items: [{ key: "boundary", label: "Batas kawasan" }, { key: "zoning", label: "Zonasi resmi" }] },
  { title: "Ekosistem", items: [{ key: "mangrove", label: "Mangrove" }, { key: "coral", label: "Terumbu karang" }, { key: "seagrass", label: "Padang lamun" }] },
  { title: "Laporan", items: [{ key: "reports", label: "Titik laporan" }] }
];

function formatArea(value: number) {
  return new Intl.NumberFormat("id-ID").format(value);
}

export default function AdminRegionPage() {
  const [regions, setRegions] = useState(initialRegions);
  const [view, setView] = useState<"list" | "map">("list");
  const [selectedRegionId, setSelectedRegionId] = useState(initialRegions[0].id);
  const [layers, setLayers] = useState<Record<LayerKey, boolean>>({ boundary: true, zoning: true, mangrove: true, coral: false, seagrass: false, reports: true });
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<(typeof categories)[number]>("Semua");
  const [editingId, setEditingId] = useState<number | null | undefined>(undefined);
  const [draftName, setDraftName] = useState("");
  const [draftDistrict, setDraftDistrict] = useState("");
  const [draftArea, setDraftArea] = useState("");
  const [draftFile, setDraftFile] = useState("");

  const visibleRegions = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase("id-ID");
    return regions.filter((region) => {
      const matchesQuery = !keyword || `${region.name} ${region.district}`.toLocaleLowerCase("id-ID").includes(keyword);
      const matchesCategory = categoryFilter === "Semua" || region.category === categoryFilter;
      return matchesQuery && matchesCategory;
    });
  }, [regions, query, categoryFilter]);

  const selectedRegion = regions.find((region) => region.id === selectedRegionId) ?? regions[0];

  useEffect(() => {
    if (editingId === undefined) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setEditingId(undefined);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [editingId]);

  const openAddDialog = () => {
    setDraftName("");
    setDraftDistrict("");
    setDraftArea("");
    setDraftFile("");
    setEditingId(null);
  };

  const openEditDialog = (region: ConservationRegion) => {
    setDraftName(region.name);
    setDraftDistrict(region.district);
    setDraftArea(String(region.area));
    setDraftFile(region.spatialFile);
    setEditingId(region.id);
  };

  const saveRegion = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = draftName.trim();
    const district = draftDistrict.trim();
    const area = Number(draftArea);
    if (!name || !district || !area) return;

    if (editingId === null) {
      setRegions((current) => [...current, {
        id: Date.now(),
        name,
        district,
        area,
        pendingReports: 0,
        category: "Rendah",
        spatialFile: draftFile || "Belum ada file",
        legalBasis: "Belum dilengkapi",
        updatedAt: "Hari ini"
      }]);
    } else {
      setRegions((current) => current.map((region) => region.id === editingId ? {
        ...region,
        name,
        district,
        area,
        spatialFile: draftFile || region.spatialFile
      } : region));
    }
    setEditingId(undefined);
  };

  const openMap = (regionId: number) => {
    setSelectedRegionId(regionId);
    setView("map");
  };

  const toggleLayer = (key: LayerKey) => {
    setLayers((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <div className="admin-region-page">
      <header className="admin-page-heading"><div><h1>Wilayah Konservasi</h1></div><p>Data simulasi</p></header>

      <section className="admin-glass-workspace admin-region-workspace">
        <div className="admin-region-view-switch" aria-label="Tampilan wilayah">
          <button type="button" className={view === "list" ? "is-active" : ""} onClick={() => setView("list")}>Daftar wilayah</button>
          <button type="button" className={view === "map" ? "is-active" : ""} onClick={() => setView("map")}>Peta &amp; lapisan</button>
        </div>

        {view === "list" ? (
          <>
            <div className="admin-region-toolbar">
              <label className="admin-region-search">
                <span className="sr-only">Cari wilayah</span>
                <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></svg>
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama atau kecamatan" />
              </label>
              <label className="admin-region-filter"><span className="sr-only">Filter kategori</span><select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value as (typeof categories)[number])}>{categories.map((category) => <option key={category}>{category === "Semua" ? "Semua kategori" : category}</option>)}</select></label>
              <button type="button" className="admin-region-add" onClick={openAddDialog}><span aria-hidden="true">+</span> Tambah wilayah</button>
            </div>

            <div className="admin-region-result-heading"><h2>Daftar wilayah</h2><span>{visibleRegions.length} wilayah</span></div>

            {visibleRegions.length ? (
              <div className="admin-region-table">
                <div className="admin-region-table-head" aria-hidden="true"><span>Wilayah</span><span>Luas</span><span>Belum ditinjau</span><span>Kategori</span><span>Aksi</span></div>
                {visibleRegions.map((region) => (
                  <article className="admin-region-row" key={region.id}>
                    <div className="admin-region-name"><strong>{region.name}</strong><span>{region.district}</span><small>{region.spatialFile}</small></div>
                    <div className="admin-region-area"><small>Luas</small><strong>{formatArea(region.area)}</strong><span>ha</span></div>
                    <div className="admin-region-pending"><small>Belum ditinjau</small><strong>{region.pendingReports}</strong><span>laporan</span></div>
                    <div><span className={`admin-region-category is-${region.category.toLowerCase()}`}>{region.category}</span></div>
                    <div className="admin-region-actions"><button type="button" onClick={() => openMap(region.id)}>Peta</button><button type="button" onClick={() => openEditDialog(region)}>Edit</button></div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="admin-region-empty"><h3>Tidak ada wilayah yang cocok</h3><p>Ubah kata pencarian atau kembalikan filter ke Semua kategori.</p><button type="button" onClick={() => { setQuery(""); setCategoryFilter("Semua"); }}>Reset pencarian</button></div>
            )}
          </>
        ) : (
          <div className="admin-region-map-view">
            <div className="admin-region-map-heading">
              <label><span>Wilayah</span><select value={selectedRegion.id} onChange={(event) => setSelectedRegionId(Number(event.target.value))}>{regions.map((region) => <option key={region.id} value={region.id}>{region.name}</option>)}</select></label>
              <div><strong>{formatArea(selectedRegion.area)} ha</strong><span>{selectedRegion.district}</span></div>
            </div>

            <div className="admin-region-map-layout">
              <aside className="admin-region-layer-panel" aria-label="Lapisan peta">
                <h2>Lapisan</h2>
                {layerGroups.map((group) => <section key={group.title}><h3>{group.title}</h3>{group.items.map((item) => <label key={item.key}><input type="checkbox" checked={layers[item.key]} onChange={() => toggleLayer(item.key)} /><span>{item.label}</span></label>)}</section>)}
              </aside>

              <div className="admin-region-map-canvas">
                <svg viewBox="0 0 900 540" role="img" aria-label={`Pratinjau spasial ${selectedRegion.name}`}>
                  <defs><linearGradient id="admin-sea" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#bfe6ed" /><stop offset="1" stopColor="#78bed0" /></linearGradient><pattern id="admin-map-grid" width="56" height="56" patternUnits="userSpaceOnUse"><path d="M56 0H0V56" fill="none" stroke="#ffffff" strokeOpacity=".22" /></pattern></defs>
                  <rect width="900" height="540" fill="url(#admin-sea)" />
                  <rect width="900" height="540" fill="url(#admin-map-grid)" />
                  <path className="admin-region-land" d="M-20 318C77 273 126 260 211 274c90 15 131 76 221 71 92-6 120-94 213-97 88-3 120 62 275 23v289H-20Z" />
                  {layers.boundary && <path className="admin-region-boundary" d="M182 116 357 65 521 112 689 92 771 208 710 376 541 444 349 404 128 307Z" />}
                  {layers.zoning && <g className="admin-region-zones"><path className="zone-core" d="M244 149 367 112 430 184 373 264 247 244Z" /><path className="zone-use" d="M458 148 641 130 699 221 598 286 454 250Z" /><path className="zone-recovery" d="M351 287 516 274 597 373 486 414 324 372Z" /></g>}
                  {layers.mangrove && <path className="admin-region-mangrove" d="M72 336c75-28 126-30 181-15 52 14 87 40 133 46-29 29-73 47-133 54-85 10-142-18-181-85Z" />}
                  {layers.coral && <g className="admin-region-coral"><circle cx="226" cy="217" r="24" /><circle cx="642" cy="217" r="30" /><circle cx="551" cy="356" r="21" /></g>}
                  {layers.seagrass && <g className="admin-region-seagrass"><ellipse cx="315" cy="315" rx="54" ry="23" /><ellipse cx="647" cy="323" rx="44" ry="20" /></g>}
                  {layers.reports && <g className="admin-region-report-points"><circle className="is-critical" cx="368" cy="191" r="13" /><circle className="is-high" cx="584" cy="205" r="10" /><circle className="is-medium" cx="470" cy="335" r="8" /><circle className="is-low" cx="268" cy="293" r="7" /></g>}
                </svg>
                <span className="admin-region-simulation-note">Batas simulasi</span>
                <div className="admin-region-map-legend"><span><i className="is-critical" />Kritis</span><span><i className="is-high" />Tinggi</span><span><i className="is-medium" />Sedang</span><span><i className="is-low" />Rendah</span></div>
              </div>
            </div>

            <div className="admin-region-map-meta"><div><span>Data spasial</span><strong>{selectedRegion.spatialFile}</strong></div><div><span>Dasar hukum</span><strong>{selectedRegion.legalBasis}</strong></div><div><span>Pembaruan</span><strong>{selectedRegion.updatedAt}</strong></div><button type="button" onClick={() => openEditDialog(selectedRegion)}>Edit data wilayah</button></div>
          </div>
        )}
      </section>

      {editingId !== undefined && (
        <div className="admin-region-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setEditingId(undefined); }}>
          <section className="admin-region-dialog" role="dialog" aria-modal="true" aria-labelledby="region-dialog-title">
            <header><h2 id="region-dialog-title">{editingId === null ? "Tambah wilayah" : "Edit wilayah"}</h2></header>
            <form onSubmit={saveRegion}>
              <div className="admin-region-form-grid">
                <label><span>Nama wilayah</span><input autoFocus value={draftName} onChange={(event) => setDraftName(event.target.value)} placeholder="Nama wilayah konservasi" required /></label>
                <label><span>Kecamatan</span><input value={draftDistrict} onChange={(event) => setDraftDistrict(event.target.value)} placeholder="Nama kecamatan" required /></label>
                <label><span>Luas area (ha)</span><input type="number" min="1" value={draftArea} onChange={(event) => setDraftArea(event.target.value)} placeholder="0" required /></label>
                <label className="admin-region-file-field"><span>Paket data spasial</span><input type="file" accept=".zip" onChange={(event) => setDraftFile(event.target.files?.[0]?.name ?? draftFile)} /><small>{draftFile || "Pilih ZIP berisi SHP, SHX, DBF, dan PRJ"}</small></label>
              </div>
              <div className="admin-region-dialog-actions"><button type="button" onClick={() => setEditingId(undefined)}>Batal</button><button type="submit">Simpan wilayah</button></div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

