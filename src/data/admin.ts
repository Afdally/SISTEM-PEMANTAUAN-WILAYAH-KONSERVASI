export type AdminAreaCategory = "Rendah" | "Sedang" | "Tinggi" | "Kritis";

export const adminMetrics = [
  { label: "Wilayah konservasi", value: "3" },
  { label: "Total luas", value: "62,9", unit: "ribu ha" },
  { label: "Laporan bulan ini", value: "10" },
  { label: "Belum ditinjau", value: "7", emphasis: true }
];

export const adminAreas: Array<{
  name: string;
  reports: number;
  category: AdminAreaCategory;
  color: string;
}> = [
  { name: "Pesisir Latawe", reports: 14, category: "Kritis", color: "#b93632" },
  { name: "Perairan Napabalano", reports: 9, category: "Tinggi", color: "#d7662f" },
  { name: "Teluk Lasalepa", reports: 5, category: "Sedang", color: "#c9971d" }
];

export const adminAreaComposition = [
  { label: "Kritis", value: 1, color: "#b93632" },
  { label: "Tinggi", value: 1, color: "#d7662f" },
  { label: "Sedang", value: 1, color: "#c9971d" },
  { label: "Rendah", value: 0, color: "#247a5e" }
];

export const adminReportTrend = [2, 3, 3, 4, 4, 5, 4, 6, 7, 10];
export const adminReportMonths = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt"];

export const adminRecentReports = [
  { id: "RPT-026", title: "Penebangan mangrove", location: "Pesisir Latawe", date: "8 Okt", category: "Kritis" as AdminAreaCategory },
  { id: "RPT-025", title: "Pemutihan karang", location: "Perairan Napabalano", date: "7 Okt", category: "Tinggi" as AdminAreaCategory },
  { id: "RPT-024", title: "Sampah di padang lamun", location: "Teluk Lasalepa", date: "5 Okt", category: "Sedang" as AdminAreaCategory },
  { id: "RPT-023", title: "Regenerasi mangrove", location: "Batalaiworu", date: "3 Okt", category: "Rendah" as AdminAreaCategory }
];

