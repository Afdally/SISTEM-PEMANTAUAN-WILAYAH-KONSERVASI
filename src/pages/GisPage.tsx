import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { conservationAreas, conservationZones, mapFeatures } from "../data/monitoring";
import type { ConservationArea, MapFeature, Severity } from "../types";
import StatusBadge from "../components/ui/StatusBadge";

const severityColors: Record<Severity, string> = {
  Kritis: "#b93632",
  Siaga: "#d7662f",
  Waspada: "#c9971d",
  Normal: "#247a5e"
};

const severityRank: Record<Severity, number> = { Normal: 0, Waspada: 1, Siaga: 2, Kritis: 3 };

const categoryIcons: Record<string, string> = {
  "Temuan satwa dilindungi": "◆",
  "Penebangan mangrove": "♣",
  "Pemutihan karang": "✺",
  "Sampah/pencemaran": "●",
  Sedimentasi: "≋",
  "Kerusakan akibat jangkar": "⚓",
  "Pemulihan/rehabilitasi": "+ "
};

const categories = Object.keys(categoryIcons);
const regions = ["Batalaiworu", "Lasalepa", "Napabalano", "Tiworo Utara"];
const prototypeToday = new Date("2026-10-10T00:00:00");

type DatePreset = "30-days" | "6-months" | "year" | "custom";
type Basemap = "roads" | "satellite";
type MapPanel = "search" | "filters" | "layers" | "reports" | "legend";
type SelectedFeature =
  | { kind: "report"; value: MapFeature }
  | { kind: "area"; value: ConservationArea }
  | null;

function severitySlug(value: Severity) {
  return value.toLowerCase();
}

function reportMarkerIcon(item: MapFeature) {
  const size = item.severity === "Kritis" ? 42 : 34;
  return L.divIcon({
    className: `report-div-icon severity-${severitySlug(item.severity)}${item.severity === "Kritis" ? " is-critical" : ""}`,
    html: `<span aria-hidden="true">${categoryIcons[item.category] ?? "•"}</span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
}

function MapToolIcon({ name }: { name: MapPanel | "home" }) {
  const paths: Record<MapPanel | "home", React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="6" /><path d="m16 16 4 4" /></>,
    home: <><path d="M4 11.5 12 5l8 6.5" /><path d="M6.5 10.5V20h11v-9.5M10 20v-5h4v5" /></>,
    filters: <><path d="M4 6h16M7 12h10M10 18h4" /><circle cx="8" cy="6" r="1.5" /><circle cx="15" cy="12" r="1.5" /><circle cx="12" cy="18" r="1.5" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
    reports: <><path d="M5 4h14v16H5z" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
    legend: <><circle cx="7" cy="7" r="2" /><path d="M11 7h8" /><circle cx="7" cy="12" r="2" /><path d="M11 12h8" /><circle cx="7" cy="17" r="2" /><path d="M11 17h8" /></>
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export default function GisPage() {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const clusterLayer = useRef<L.MarkerClusterGroup | null>(null);
  const areaLayer = useRef<L.LayerGroup | null>(null);
  const zoneLayer = useRef<L.LayerGroup | null>(null);
  const baseLayer = useRef<L.TileLayer | null>(null);
  const reportMarkers = useRef(new Map<string, L.Marker>());
  const markerSeverity = useRef(new Map<number, Severity>());
  const selectedMarkerElement = useRef<HTMLElement | null>(null);

  const [mapReady, setMapReady] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [severity, setSeverity] = useState("all");
  const [datePreset, setDatePreset] = useState<DatePreset>("year");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [region, setRegion] = useState("all");
  const [search, setSearch] = useState("");
  const [showAreas, setShowAreas] = useState(true);
  const [showZones, setShowZones] = useState(true);
  const [showReports, setShowReports] = useState(true);
  const [basemap, setBasemap] = useState<Basemap>("roads");
  const [activePanel, setActivePanel] = useState<MapPanel | null>(null);
  const [selected, setSelected] = useState<SelectedFeature>(null);
  const [quickPopupPosition, setQuickPopupPosition] = useState<{ x: number; y: number; placement: "above" | "below" } | null>(null);
  const [fullDetailOpen, setFullDetailOpen] = useState(false);
  const [visibleBounds, setVisibleBounds] = useState<L.LatLngBounds | null>(null);

  const filteredReports = useMemo(() => mapFeatures.filter((item) => {
    if (selectedCategories.length && !selectedCategories.includes(item.category)) return false;
    if (severity !== "all" && item.severity !== severity) return false;
    if (region !== "all" && item.region !== region) return false;

    const itemDate = new Date(`${item.dateISO}T00:00:00`);
    if (datePreset === "30-days") {
      const limit = new Date(prototypeToday);
      limit.setDate(limit.getDate() - 30);
      if (itemDate < limit) return false;
    }
    if (datePreset === "6-months") {
      const limit = new Date(prototypeToday);
      limit.setMonth(limit.getMonth() - 6);
      if (itemDate < limit) return false;
    }
    if (datePreset === "year" && itemDate.getFullYear() !== prototypeToday.getFullYear()) return false;
    if (datePreset === "custom") {
      if (customStart && item.dateISO < customStart) return false;
      if (customEnd && item.dateISO > customEnd) return false;
    }
    return true;
  }), [customEnd, customStart, datePreset, region, selectedCategories, severity]);

  const reportsInView = useMemo(() => {
    if (!visibleBounds) return filteredReports;
    return filteredReports.filter((item) => visibleBounds.contains([item.lat, item.lng]));
  }, [filteredReports, visibleBounds]);

  const dangerCounts = useMemo(() => filteredReports.reduce<Record<Severity, number>>((counts, item) => {
    counts[item.severity] += 1;
    return counts;
  }, { Kritis: 0, Siaga: 0, Waspada: 0, Normal: 0 }), [filteredReports]);

  const conservationBounds = useMemo(() => L.latLngBounds(conservationAreas.flatMap((area) => area.coordinates)), []);

  const fitToAreas = useCallback(() => {
    mapInstance.current?.fitBounds(conservationBounds, { padding: [28, 28] });
  }, [conservationBounds]);

  useEffect(() => {
    if (!mapElement.current || mapInstance.current) return;
    const map = L.map(mapElement.current, { zoomControl: false, scrollWheelZoom: true, maxZoom: 18 });
    L.control.zoom({ position: "bottomright" }).addTo(map);
    map.fitBounds(conservationBounds, { padding: [28, 28] });
    map.on("moveend", () => setVisibleBounds(map.getBounds()));

    areaLayer.current = L.layerGroup().addTo(map);
    zoneLayer.current = L.layerGroup().addTo(map);
    clusterLayer.current = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 48,
      iconCreateFunction: (cluster) => {
        const levels = cluster.getAllChildMarkers().map((marker) => markerSeverity.current.get(L.stamp(marker)) ?? "Normal");
        const highest = levels.reduce<Severity>((current, level) => severityRank[level] > severityRank[current] ? level : current, "Normal");
        const count = cluster.getChildCount();
        return L.divIcon({
          className: `report-cluster severity-${severitySlug(highest)}`,
          html: `<span>${count}</span>`,
          iconSize: [44, 44],
          iconAnchor: [22, 22]
        });
      }
    }).addTo(map);

    mapInstance.current = map;
    setVisibleBounds(map.getBounds());
    setMapReady(true);
    window.setTimeout(() => map.invalidateSize(), 0);

    return () => {
      map.remove();
      mapInstance.current = null;
      clusterLayer.current = null;
      areaLayer.current = null;
      zoneLayer.current = null;
      baseLayer.current = null;
      setMapReady(false);
    };
  }, [conservationBounds]);

  useEffect(() => {
    if (!mapReady || !mapInstance.current) return;
    if (baseLayer.current) mapInstance.current.removeLayer(baseLayer.current);
    const layer = basemap === "satellite"
      ? L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", { maxZoom: 18, attribution: "Tiles © Esri" })
      : L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' });
    layer.addTo(mapInstance.current);
    layer.bringToBack();
    baseLayer.current = layer;
  }, [basemap, mapReady]);

  useEffect(() => {
    const layer = areaLayer.current;
    if (!mapReady || !layer) return;
    layer.clearLayers();
    if (!showAreas) return;
    conservationAreas.forEach((item) => {
      const polygon = L.polygon(item.coordinates, { color: "#075f91", fillColor: "#42a7c7", fillOpacity: 0.1, weight: 2.5 });
      polygon.bindTooltip(`${item.name} · batas simulasi`, { sticky: true });
      polygon.on("click", () => showQuickDetail({ kind: "area", value: item }));
      polygon.on("add", () => {
        const element = polygon.getElement();
        if (!element) return;
        element.setAttribute("tabindex", "0");
        element.setAttribute("role", "button");
        element.setAttribute("aria-label", `Buka detail ${item.name}`);
        element.addEventListener("keydown", (event) => {
          const keyboardEvent = event as KeyboardEvent;
          if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
            event.preventDefault();
            showQuickDetail({ kind: "area", value: item });
          }
        });
      });
      polygon.addTo(layer);
    });
  }, [mapReady, showAreas]);

  useEffect(() => {
    const layer = zoneLayer.current;
    if (!mapReady || !layer) return;
    layer.clearLayers();
    if (!showZones) return;
    conservationZones.forEach((item) => {
      L.polygon(item.coordinates, { color: item.color, dashArray: "7 6", fillColor: item.color, fillOpacity: 0.09, weight: 2 })
        .bindTooltip(`${item.name} · simulasi`, { sticky: true })
        .addTo(layer);
    });
  }, [mapReady, showZones]);

  useEffect(() => {
    const layer = clusterLayer.current;
    if (!mapReady || !layer) return;
    layer.clearLayers();
    markerSeverity.current.clear();
    reportMarkers.current.clear();
    if (!showReports) return;

    filteredReports.forEach((item) => {
      const marker = L.marker([item.lat, item.lng], {
        icon: reportMarkerIcon(item),
        keyboard: true,
        title: `${item.severity}: ${item.category}`,
        alt: `${item.severity}: ${item.category}, ${item.location}`
      });
      marker.on("click", () => showQuickDetail({ kind: "report", value: item }));
      markerSeverity.current.set(L.stamp(marker), item.severity);
      reportMarkers.current.set(item.id, marker);
      layer.addLayer(marker);
    });
  }, [filteredReports, mapReady, showReports]);

  useEffect(() => {
    const previous = selectedMarkerElement.current;
    previous?.classList.remove("is-selected", "is-selected-ripple");
    selectedMarkerElement.current = null;

    if (!mapReady || selected?.kind !== "report") return;

    let retryTimer: number | undefined;
    let attempts = 0;
    const applySelection = () => {
      const element = reportMarkers.current.get(selected.value.id)?.getElement();
      if (!element) {
        if (attempts < 4) {
          attempts += 1;
          retryTimer = window.setTimeout(applySelection, 220);
        }
        return;
      }

      selectedMarkerElement.current = element;
      element.classList.add("is-selected");
      element.classList.remove("is-selected-ripple");
      void element.offsetWidth;
      element.classList.add("is-selected-ripple");
    };

    const startTimer = window.setTimeout(applySelection, 0);
    return () => {
      window.clearTimeout(startTimer);
      if (retryTimer) window.clearTimeout(retryTimer);
      selectedMarkerElement.current?.classList.remove("is-selected", "is-selected-ripple");
      selectedMarkerElement.current = null;
    };
  }, [filteredReports, mapReady, selected]);

  useEffect(() => {
    if (!selected) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (fullDetailOpen) setFullDetailOpen(false);
      else setSelected(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [fullDetailOpen, selected]);

  useEffect(() => {
    setFullDetailOpen(false);
    if (!selected || !mapReady || !mapInstance.current) {
      setQuickPopupPosition(null);
      return;
    }

    const map = mapInstance.current;
    const location = selected.kind === "report"
      ? L.latLng(selected.value.lat, selected.value.lng)
      : L.latLngBounds(selected.value.coordinates).getCenter();
    const updatePosition = () => {
      const point = map.latLngToContainerPoint(location);
      const mapWidth = map.getSize().x;
      const narrowMap = mapWidth <= 700;
      const halfPopup = narrowMap ? Math.min(152, (mapWidth - 70) / 2) : 168;
      const minimumX = halfPopup + 8;
      const maximumX = mapWidth - halfPopup - (narrowMap ? 56 : 12);
      const x = maximumX > minimumX
        ? Math.min(Math.max(point.x, minimumX), maximumX)
        : mapWidth / 2;
      setQuickPopupPosition({ x, y: point.y, placement: point.y < 285 ? "below" : "above" });
    };

    updatePosition();
    map.on("move zoom resize", updatePosition);
    return () => {
      map.off("move zoom resize", updatePosition);
    };
  }, [mapReady, selected]);

  function toggleCategory(category: string) {
    setSelectedCategories((current) => current.includes(category) ? current.filter((item) => item !== category) : [...current, category]);
  }

  function resetFilters() {
    setSelectedCategories([]);
    setSeverity("all");
    setDatePreset("year");
    setCustomStart("");
    setCustomEnd("");
    setRegion("all");
    setSelected(null);
  }

  function findLocation(event: FormEvent) {
    event.preventDefault();
    const query = search.trim().toLocaleLowerCase("id-ID");
    if (!query || !mapInstance.current) return;
    const report = filteredReports.find((item) => `${item.location} ${item.region} ${item.category}`.toLocaleLowerCase("id-ID").includes(query));
    if (report) {
      mapInstance.current.setView([report.lat, report.lng], 14);
      showQuickDetail({ kind: "report", value: report });
      return;
    }
    const area = conservationAreas.find((item) => item.name.toLocaleLowerCase("id-ID").includes(query));
    if (area) {
      mapInstance.current.fitBounds(area.coordinates, { padding: [40, 40] });
      showQuickDetail({ kind: "area", value: area });
    }
  }

  function focusReport(report: MapFeature) {
    const map = mapInstance.current;
    if (!map) return;
    showQuickDetail({ kind: "report", value: report });
    map.setView([report.lat, report.lng], 15);
    const marker = reportMarkers.current.get(report.id);
    if (marker && clusterLayer.current) {
      clusterLayer.current.zoomToShowLayer(marker);
    }
    setActivePanel(null);
  }

  function togglePanel(panel: MapPanel) {
    setActivePanel((current) => current === panel ? null : panel);
  }

  function showQuickDetail(feature: Exclude<SelectedFeature, null>) {
    setActivePanel(null);
    setSelected(feature);
  }

  function openFullDetail() {
    setActivePanel(null);
    setFullDetailOpen(true);
  }

  return (
    <main id="main-content" className="gis-screen">
      <h1 className="sr-only">GIS Laporan Pesisir Kabupaten Muna</h1>
      <section className="gis-workspace" aria-label="Peta laporan dan kawasan konservasi">
        <div ref={mapElement} className="gis-map" role="region" aria-label="Peta laporan masyarakat dan kawasan konservasi" />

        <div className="gis-map-tools" aria-label="Alat peta">
          <button type="button" className={activePanel === "search" ? "is-active" : ""} onClick={() => togglePanel("search")} aria-label="Cari lokasi" aria-expanded={activePanel === "search"} data-tooltip="Cari lokasi"><MapToolIcon name="search" /></button>
          <button type="button" onClick={fitToAreas} aria-label="Kembali ke kawasan" data-tooltip="Kembali ke kawasan"><MapToolIcon name="home" /></button>
          <button type="button" className={activePanel === "filters" ? "is-active" : ""} onClick={() => togglePanel("filters")} aria-label="Filter laporan" aria-expanded={activePanel === "filters"} data-tooltip="Filter laporan"><MapToolIcon name="filters" /></button>
          <button type="button" className={activePanel === "layers" ? "is-active" : ""} onClick={() => togglePanel("layers")} aria-label="Manajemen lapisan" aria-expanded={activePanel === "layers"} data-tooltip="Manajemen lapisan"><MapToolIcon name="layers" /></button>
          <button type="button" className={activePanel === "reports" ? "is-active" : ""} onClick={() => togglePanel("reports")} aria-label="Daftar laporan" aria-expanded={activePanel === "reports"} data-tooltip="Daftar laporan"><MapToolIcon name="reports" /></button>
          <button type="button" className={activePanel === "legend" ? "is-active" : ""} onClick={() => togglePanel("legend")} aria-label="Legenda peta" aria-expanded={activePanel === "legend"} data-tooltip="Legenda peta"><MapToolIcon name="legend" /></button>
        </div>

        {activePanel === "search" && <aside className="gis-flyout gis-search-panel" aria-label="Pencarian lokasi">
          <div className="gis-flyout-heading"><div><small>Pencarian</small><h2>Cari lokasi</h2></div><button type="button" onClick={() => setActivePanel(null)} aria-label="Tutup pencarian">×</button></div>
          <form className="map-search" onSubmit={findLocation} role="search"><label className="sr-only" htmlFor="location-search">Cari lokasi</label><input id="location-search" autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Nama lokasi atau kawasan" /><button type="submit">Cari</button></form>
        </aside>}

        {activePanel === "filters" && <aside className="gis-flyout gis-filter-panel" aria-label="Filter laporan pada peta">
          <div className="gis-flyout-heading"><div><small>Laporan</small><h2>Filter data</h2></div><button type="button" onClick={() => setActivePanel(null)} aria-label="Tutup filter">×</button></div>
          <div className="gis-filter-form">
            <details className="category-filter"><summary><span>Kategori</span><strong>{selectedCategories.length ? `${selectedCategories.length} dipilih` : "Semua"}</strong></summary><div className="category-filter-menu"><button type="button" onClick={() => setSelectedCategories([])}>Semua kategori</button>{categories.map((category) => <label key={category}><input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => toggleCategory(category)} /><i>{categoryIcons[category]}</i><span>{category}</span></label>)}</div></details>
            <label className="filter-field"><span>Tingkat bahaya</span><select value={severity} onChange={(event) => setSeverity(event.target.value)}><option value="all">Semua</option><option>Kritis</option><option>Siaga</option><option>Waspada</option><option>Normal</option></select></label>
            <label className="filter-field"><span>Tanggal</span><select value={datePreset} onChange={(event) => setDatePreset(event.target.value as DatePreset)}><option value="30-days">30 hari</option><option value="6-months">6 bulan</option><option value="year">Tahun ini</option><option value="custom">Rentang kustom</option></select></label>
            {datePreset === "custom" && <div className="custom-date-range"><label><span>Dari</span><input type="date" value={customStart} max={customEnd || undefined} onChange={(event) => setCustomStart(event.target.value)} /></label><label><span>Sampai</span><input type="date" value={customEnd} min={customStart || undefined} onChange={(event) => setCustomEnd(event.target.value)} /></label></div>}
            <label className="filter-field"><span>Wilayah</span><select value={region} onChange={(event) => setRegion(event.target.value)}><option value="all">Semua wilayah</option>{regions.map((item) => <option key={item}>{item}</option>)}</select></label>
          </div>
          <div className="filter-actions"><span role="status">Menampilkan <strong>{filteredReports.length}</strong> laporan</span><button type="button" onClick={resetFilters}>Reset filter</button></div>
        </aside>}

        {activePanel === "layers" && <aside className="gis-flyout gis-layer-panel" aria-label="Lapisan peta">
          <div className="gis-flyout-heading"><div><small>Peta</small><h2>Manajemen lapisan</h2></div><button type="button" onClick={() => setActivePanel(null)} aria-label="Tutup lapisan">×</button></div>
          <div className="map-panel-content">
            <fieldset><legend>Kawasan</legend><label><input type="checkbox" checked={showAreas} onChange={(event) => setShowAreas(event.target.checked)} />Batas konservasi <small>simulasi</small></label><label><input type="checkbox" checked={showZones} onChange={(event) => setShowZones(event.target.checked)} />Zonasi <small>simulasi</small></label></fieldset>
            <fieldset><legend>Ekosistem</legend><label className="is-unavailable"><input type="checkbox" disabled />Mangrove</label><label className="is-unavailable"><input type="checkbox" disabled />Terumbu karang</label><label className="is-unavailable"><input type="checkbox" disabled />Padang lamun</label></fieldset>
            <fieldset><legend>Laporan</legend><label><input type="checkbox" checked={showReports} onChange={(event) => setShowReports(event.target.checked)} />Titik laporan</label><label className="is-unavailable"><input type="checkbox" disabled />Kepadatan laporan</label></fieldset>
            <fieldset><legend>Peta dasar</legend><label><input type="radio" name="basemap" checked={basemap === "roads"} onChange={() => setBasemap("roads")} />Jalan</label><label><input type="radio" name="basemap" checked={basemap === "satellite"} onChange={() => setBasemap("satellite")} />Satelit</label></fieldset>
          </div>
        </aside>}

        {activePanel === "reports" && <aside className="gis-flyout gis-report-list" aria-labelledby="gis-report-list-title">
          <div className="gis-flyout-heading"><div><small>Area peta terlihat</small><h2 id="gis-report-list-title">Daftar laporan <span>{reportsInView.length}</span></h2></div><button type="button" onClick={() => setActivePanel(null)} aria-label="Tutup daftar">×</button></div>
          <div className="gis-report-scroll">{reportsInView.length ? reportsInView.map((report) => <button type="button" className="gis-report-card" key={report.id} onClick={() => focusReport(report)}><img src={report.image} alt="" style={{ objectPosition: report.imagePosition }} /><span><span><StatusBadge severity={report.severity} /><small>{report.date}</small></span><strong>{report.category}</strong><small>{report.location}</small></span></button>) : <p className="report-list-empty">Tidak ada laporan pada area peta ini.</p>}</div>
        </aside>}

        {activePanel === "legend" && <aside className="gis-flyout gis-legend-panel" aria-label="Legenda peta">
          <div className="gis-flyout-heading"><div><small>Peta</small><h2>Legenda</h2></div><button type="button" onClick={() => setActivePanel(null)} aria-label="Tutup legenda">×</button></div>
          <div className="map-legend-content"><ul>{(Object.keys(severityColors) as Severity[]).map((level) => <li key={level}><span><i style={{ backgroundColor: severityColors[level] }} />{level}</span><strong>{dangerCounts[level]}</strong></li>)}</ul><div className="category-icon-key">{categories.map((category) => <span key={category}><i>{categoryIcons[category]}</i>{category}</span>)}</div>{showZones && <p><i className="zone-line" /> Zonasi simulasi</p>}</div>
        </aside>}

        <span className="simulation-map-note">Data dan batas simulasi</span>

        {selected && quickPopupPosition && !fullDetailOpen && <aside
          className={`gis-quick-popup is-${quickPopupPosition.placement}`}
          style={{ left: quickPopupPosition.x, top: quickPopupPosition.y }}
          aria-live="polite"
        >
          <button className="gis-popup-close" type="button" onClick={() => setSelected(null)} aria-label="Tutup popup">×</button>
          <div className="gis-popup-title">
            <span>{selected.kind === "area" ? "Kawasan konservasi" : selected.value.category}</span>
            <h2>{selected.kind === "area" ? selected.value.name : selected.value.title}</h2>
            <StatusBadge severity={selected.kind === "area" ? selected.value.condition : selected.value.severity} />
          </div>
          <dl>
            {selected.kind === "area" ? <>
              <div><dt>Luas</dt><dd>{selected.value.area}</dd></div>
              <div><dt>Kewenangan</dt><dd>{selected.value.authority}</dd></div>
            </> : <>
              <div><dt>Lokasi umum</dt><dd>{selected.value.location}</dd></div>
              <div><dt>Tanggal</dt><dd>{selected.value.date}</dd></div>
            </>}
          </dl>
          <button className="gis-open-detail" type="button" onClick={openFullDetail}>Lihat detail lengkap <span aria-hidden="true">→</span></button>
        </aside>}

        {selected && fullDetailOpen && <div className="gis-detail-overlay" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setFullDetailOpen(false);
        }}>
          <section className="gis-bottom-sheet" role="dialog" aria-modal="true" aria-labelledby="gis-full-detail-title">
            <div className="gis-sheet-handle" aria-hidden="true" />
            <button className="gis-sheet-close" type="button" autoFocus onClick={() => setFullDetailOpen(false)} aria-label="Tutup detail lengkap">×</button>
            <header className="gis-sheet-header">
              <div>
                <span>{selected.kind === "area" ? "Kawasan konservasi" : selected.value.category}</span>
                <h2 id="gis-full-detail-title">{selected.kind === "area" ? selected.value.name : selected.value.title}</h2>
              </div>
              <StatusBadge severity={selected.kind === "area" ? selected.value.condition : selected.value.severity} />
            </header>
            <div className="gis-sheet-content">
              {selected.kind === "report" && <figure><img src={selected.value.image} alt="Foto kondisi pada laporan" style={{ objectPosition: selected.value.imagePosition }} /><figcaption>Dokumentasi laporan · data simulasi</figcaption></figure>}
              <div className="gis-sheet-copy">
                <p>{selected.value.description}</p>
                <dl>
                  {selected.kind === "area" ? <>
                    <div><dt>Luas kawasan</dt><dd>{selected.value.area}</dd></div>
                    <div><dt>Ekosistem</dt><dd>{selected.value.ecosystem}</dd></div>
                    <div><dt>Kewenangan</dt><dd>{selected.value.authority}</dd></div>
                    <div><dt>Status data</dt><dd>Batas simulasi</dd></div>
                  </> : <>
                    <div><dt>Lokasi umum</dt><dd>{selected.value.location}</dd></div>
                    <div><dt>Wilayah</dt><dd>{selected.value.region}</dd></div>
                    <div><dt>Tanggal</dt><dd>{selected.value.date}</dd></div>
                    <div><dt>Status</dt><dd>{selected.value.status}</dd></div>
                    <div><dt>Ekosistem</dt><dd>{selected.value.ecosystem}</dd></div>
                    <div><dt>ID laporan</dt><dd>{selected.value.id}</dd></div>
                  </>}
                </dl>
              </div>
            </div>
          </section>
        </div>}
      </section>
    </main>
  );
}
