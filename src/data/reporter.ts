export type ReporterStatus = "Laporan masyarakat" | "Telah ditinjau" | "Perlu diperbaiki";

export type ReporterHistoryItem = {
  id: string;
  category: string;
  location: string;
  region: string;
  date: string;
  status: ReporterStatus;
  image: string;
  imagePosition: string;
  description: string;
  adminNote?: string;
};

export const reporterCategories = [
  "Temuan satwa dilindungi",
  "Penebangan mangrove",
  "Pembukaan tambak",
  "Sampah/pencemaran",
  "Abrasi",
  "Sedimentasi",
  "Pemutihan karang",
  "Kerusakan akibat jangkar",
  "Penangkapan ikan destruktif",
  "Kerusakan lokasi rehabilitasi"
];

export const reporterHistory: ReporterHistoryItem[] = [
  {
    id: "LAP-2026-0048",
    category: "Penebangan mangrove",
    location: "Pesisir Latawe",
    region: "Tiworo Utara",
    date: "8 Oktober 2026",
    status: "Laporan masyarakat",
    image: "/assets/DSC01043-scaled.jpg",
    imagePosition: "18% center",
    description: "Beberapa batang mangrove baru ditebang dan material masih berada di sekitar lokasi."
  },
  {
    id: "LAP-2026-0039",
    category: "Sampah/pencemaran",
    location: "Teluk Lasalepa",
    region: "Lasalepa",
    date: "2 Oktober 2026",
    status: "Telah ditinjau",
    image: "/assets/DSC01043-scaled.jpg",
    imagePosition: "55% center",
    description: "Sampah plastik terkumpul pada bagian pesisir setelah pasang.",
    adminNote: "Lokasi dan kategori telah diperiksa oleh Admin."
  },
  {
    id: "LAP-2026-0027",
    category: "Pemutihan karang",
    location: "Perairan Napabalano",
    region: "Napabalano",
    date: "21 September 2026",
    status: "Perlu diperbaiki",
    image: "/assets/DSC01043-scaled.jpg",
    imagePosition: "72% center",
    description: "Terlihat bagian karang berwarna lebih pucat pada area dangkal.",
    adminNote: "Tambahkan keterangan perkiraan luas area yang diamati."
  },
  {
    id: "LAP-2026-0018",
    category: "Temuan satwa dilindungi",
    location: "Napabalano (lokasi disamarkan)",
    region: "Napabalano",
    date: "10 September 2026",
    status: "Telah ditinjau",
    image: "/assets/DSC01043-scaled.jpg",
    imagePosition: "35% center",
    description: "Penyu hijau terlihat berenang dekat area lamun.",
    adminNote: "Koordinat publik telah disamarkan untuk melindungi lokasi sensitif."
  }
];

const storageKey = "simeka-reporter-history";
const deletedStorageKey = "simeka-deleted-reports";

function getDeletedReportIds() {
  if (typeof window === "undefined") return [] as string[];
  try {
    return JSON.parse(window.localStorage.getItem(deletedStorageKey) ?? "[]") as string[];
  } catch {
    return [] as string[];
  }
}

export function getReporterHistory() {
  if (typeof window === "undefined") return reporterHistory;
  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as ReporterHistoryItem[];
    const deletedIds = getDeletedReportIds();
    return [...saved, ...reporterHistory.filter((item) => !saved.some((savedItem) => savedItem.id === item.id))].filter((item) => !deletedIds.includes(item.id));
  } catch {
    const deletedIds = getDeletedReportIds();
    return reporterHistory.filter((item) => !deletedIds.includes(item.id));
  }
}

export function saveReporterHistoryItem(item: ReporterHistoryItem) {
  if (typeof window === "undefined") return;
  const current = getReporterHistory().filter((entry) => !reporterHistory.some((sample) => sample.id === entry.id) && entry.id !== item.id);
  window.localStorage.setItem(storageKey, JSON.stringify([item, ...current]));
  const deletedIds = getDeletedReportIds().filter((id) => id !== item.id);
  window.localStorage.setItem(deletedStorageKey, JSON.stringify(deletedIds));
}

export function deleteReporterHistoryItem(id: string) {
  if (typeof window === "undefined") return;
  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as ReporterHistoryItem[];
    window.localStorage.setItem(storageKey, JSON.stringify(saved.filter((item) => item.id !== id)));
  } catch {
    window.localStorage.setItem(storageKey, "[]");
  }
  const deletedIds = new Set(getDeletedReportIds());
  deletedIds.add(id);
  window.localStorage.setItem(deletedStorageKey, JSON.stringify([...deletedIds]));
}

