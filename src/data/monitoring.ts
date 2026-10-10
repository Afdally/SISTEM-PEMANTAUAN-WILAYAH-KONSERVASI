import type { ConservationArea, ConservationZone, MapFeature, Report, Severity, SpeciesObservation } from "../types";

export const updatedAt = "9 Oktober 2026";

export const monthlyReports = [
  { month: "Jan", count: 2 },
  { month: "Feb", count: 3 },
  { month: "Mar", count: 3 },
  { month: "Apr", count: 4 },
  { month: "Mei", count: 4 },
  { month: "Jun", count: 5 },
  { month: "Jul", count: 4 },
  { month: "Agu", count: 6 },
  { month: "Sep", count: 7 },
  { month: "Okt", count: 10 }
];

export const reportComposition: Array<{ level: Severity; count: number; color: string }> = [
  { level: "Kritis", count: 2, color: "#b93632" },
  { level: "Siaga", count: 5, color: "#d7662f" },
  { level: "Waspada", count: 9, color: "#c9971d" },
  { level: "Normal", count: 32, color: "#247a5e" }
];

export const reports: Report[] = [
  {
    id: "RPT-026",
    title: "Penebangan mangrove",
    category: "Ancaman",
    ecosystem: "Mangrove",
    location: "Pesisir Latawe",
    region: "Tiworo Utara",
    severity: "Kritis",
    reviewStatus: "Belum ditinjau admin",
    date: "8 Oktober 2026",
    description: "Beberapa batang baru ditebang dan material masih berada di lokasi.",
    image: "/assets/DSC01043-scaled.jpg",
    imagePosition: "18% center"
  },
  {
    id: "RPT-025",
    title: "Pemutihan karang",
    category: "Kondisi ekosistem",
    ecosystem: "Terumbu karang",
    location: "Perairan Napabalano",
    region: "Napabalano",
    severity: "Siaga",
    reviewStatus: "Sudah ditinjau admin",
    date: "7 Oktober 2026",
    description: "Warna memucat terlihat pada sebagian koloni di titik pengamatan.",
    image: "/assets/DSC01043-scaled.jpg",
    imagePosition: "center 70%"
  },
  {
    id: "RPT-024",
    title: "Sampah di padang lamun",
    category: "Ancaman",
    ecosystem: "Padang lamun",
    location: "Teluk Lasalepa",
    region: "Lasalepa",
    severity: "Waspada",
    reviewStatus: "Sudah ditinjau admin",
    date: "5 Oktober 2026",
    description: "Sampah plastik terdampar pada bagian dangkal ketika air surut.",
    image: "/assets/DSC01043-scaled.jpg",
    imagePosition: "72% center"
  },
  {
    id: "RPT-023",
    title: "Regenerasi mangrove",
    category: "Pemulihan",
    ecosystem: "Mangrove",
    location: "Batalaiworu",
    region: "Batalaiworu",
    severity: "Normal",
    reviewStatus: "Sudah ditinjau admin",
    date: "3 Oktober 2026",
    description: "Anakan baru tercatat pada area saluran pasang surut yang dipulihkan.",
    image: "/assets/DSC01043-scaled.jpg",
    imagePosition: "32% 40%"
  }
];

export const species: SpeciesObservation[] = [
  { name: "Kuntul kecil", image: "/assets/DSC01043-scaled.jpg", imagePosition: "center 30%" },
  { name: "Penyu hijau", image: "/assets/DSC01043-scaled.jpg", imagePosition: "62% center" },
  { name: "Kepiting bakau", image: "/assets/DSC01043-scaled.jpg", imagePosition: "25% 65%" }
];

const gisReportTemplates = [
  { title: "Penebangan mangrove", category: "Penebangan mangrove", ecosystem: "Mangrove", severity: "Kritis" as Severity, location: "Pesisir Latawe", region: "Tiworo Utara", lat: -4.769, lng: 122.418, description: "Beberapa batang baru ditebang dan material masih berada di lokasi." },
  { title: "Pemutihan karang", category: "Pemutihan karang", ecosystem: "Terumbu karang", severity: "Siaga" as Severity, location: "Perairan Napabalano", region: "Napabalano", lat: -4.624, lng: 122.697, description: "Koloni karang menunjukkan indikasi pemucatan pada titik pengamatan." },
  { title: "Sampah di pesisir", category: "Sampah/pencemaran", ecosystem: "Padang lamun", severity: "Waspada" as Severity, location: "Teluk Lasalepa", region: "Lasalepa", lat: -4.744, lng: 122.788, description: "Sampah plastik ditemukan pada bagian dangkal ketika air surut." },
  { title: "Pengamatan penyu hijau", category: "Temuan satwa dilindungi", ecosystem: "Biodiversitas", severity: "Normal" as Severity, location: "Perairan Napabalano (disamarkan)", region: "Napabalano", lat: -4.657, lng: 122.661, description: "Koordinat ditampilkan secara umum untuk melindungi lokasi sensitif.", sensitive: true },
  { title: "Sedimentasi meningkat", category: "Sedimentasi", ecosystem: "Padang lamun", severity: "Waspada" as Severity, location: "Pesisir Lasalepa", region: "Lasalepa", lat: -4.721, lng: 122.772, description: "Kekeruhan air meningkat setelah hujan deras." },
  { title: "Kerusakan akibat jangkar", category: "Kerusakan akibat jangkar", ecosystem: "Terumbu karang", severity: "Siaga" as Severity, location: "Perairan Tampo", region: "Napabalano", lat: -4.681, lng: 122.642, description: "Bekas jangkar terlihat pada area karang dangkal." },
  { title: "Regenerasi mangrove", category: "Pemulihan/rehabilitasi", ecosystem: "Mangrove", severity: "Normal" as Severity, location: "Batalaiworu", region: "Batalaiworu", lat: -4.833, lng: 122.716, description: "Anakan mangrove tercatat pada saluran pasang surut yang dipulihkan." }
];

const dateFormatter = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" });

export const mapFeatures: MapFeature[] = Array.from({ length: 48 }, (_, index) => {
  const template = gisReportTemplates[index % gisReportTemplates.length];
  const date = new Date(2026, 9, 8);
  date.setDate(date.getDate() - index * 5);
  const jitterLat = template.sensitive ? 0 : ((index % 5) - 2) * 0.006;
  const jitterLng = template.sensitive ? 0 : ((Math.floor(index / 3) % 5) - 2) * 0.006;
  const dateISO = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
  return {
    ...template,
    id: `GIS-${String(index + 1).padStart(3, "0")}`,
    lat: template.lat + jitterLat,
    lng: template.lng + jitterLng,
    date: dateFormatter.format(date),
    dateISO,
    status: index % 3 === 0 ? "Laporan masyarakat" : "Telah ditinjau",
    image: "/assets/DSC01043-scaled.jpg",
    imagePosition: `${20 + (index % 6) * 12}% center`
  };
});

export const conservationAreas: ConservationArea[] = [
  {
    id: "area-latawe",
    name: "Kawasan Pesisir Latawe",
    ecosystem: "Mangrove",
    condition: "Kritis",
    area: "18,4 ribu ha",
    authority: "Pemerintah daerah",
    description: "Area simulasi pemantauan tutupan dan regenerasi mangrove.",
    coordinates: [[-4.798, 122.388], [-4.767, 122.374], [-4.731, 122.398], [-4.724, 122.447], [-4.758, 122.472], [-4.797, 122.451]]
  },
  {
    id: "area-napabalano",
    name: "Kawasan Perairan Napabalano",
    ecosystem: "Terumbu karang",
    condition: "Siaga",
    area: "31,6 ribu ha",
    authority: "Pemerintah provinsi",
    description: "Area simulasi pemantauan tutupan karang dan indikasi pemutihan.",
    coordinates: [[-4.67, 122.655], [-4.635, 122.642], [-4.59, 122.668], [-4.583, 122.721], [-4.616, 122.755], [-4.659, 122.731]]
  },
  {
    id: "area-lasalepa",
    name: "Kawasan Teluk Lasalepa",
    ecosystem: "Padang lamun",
    condition: "Waspada",
    area: "12,9 ribu ha",
    authority: "Pemerintah daerah",
    description: "Area simulasi pemantauan padang lamun dan sedimentasi.",
    coordinates: [[-4.792, 122.751], [-4.754, 122.736], [-4.708, 122.759], [-4.701, 122.808], [-4.741, 122.838], [-4.786, 122.821]]
  }
];

export const conservationZones: ConservationZone[] = [
  { id: "zone-latawe-core", name: "Zona inti", areaId: "area-latawe", color: "#7c3aed", coordinates: [[-4.782, 122.398], [-4.756, 122.392], [-4.744, 122.427], [-4.772, 122.444]] },
  { id: "zone-napabalano-use", name: "Zona pemanfaatan", areaId: "area-napabalano", color: "#0f7b9f", coordinates: [[-4.651, 122.671], [-4.615, 122.659], [-4.601, 122.702], [-4.637, 122.729]] },
  { id: "zone-lasalepa-core", name: "Zona inti", areaId: "area-lasalepa", color: "#7c3aed", coordinates: [[-4.774, 122.764], [-4.735, 122.751], [-4.718, 122.786], [-4.755, 122.811]] }
];

