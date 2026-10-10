export type Severity = "Kritis" | "Siaga" | "Waspada" | "Normal";

export type Report = {
  id: string;
  title: string;
  category: string;
  ecosystem: string;
  location: string;
  region: string;
  severity: Severity;
  reviewStatus: string;
  date: string;
  description: string;
  image: string;
  imagePosition: string;
};

export type SpeciesObservation = {
  name: string;
  image: string;
  imagePosition: string;
};

export type MapFeature = {
  id: string;
  lat: number;
  lng: number;
  title: string;
  category: string;
  ecosystem: string;
  severity: Severity;
  location: string;
  region: string;
  date: string;
  dateISO: string;
  status: "Laporan masyarakat" | "Telah ditinjau";
  description: string;
  image: string;
  imagePosition: string;
  sensitive?: boolean;
};

export type ConservationArea = {
  id: string;
  name: string;
  ecosystem: string;
  condition: Severity;
  area: string;
  authority: string;
  description: string;
  coordinates: Array<[number, number]>;
};

export type ConservationZone = {
  id: string;
  name: string;
  areaId: string;
  color: string;
  coordinates: Array<[number, number]>;
};

