import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import ReporterIcon from "../../components/reporter/ReporterIcon";
import { reporterCategories, saveReporterHistoryItem } from "../../data/reporter";

type LocationState = { label: string; coordinates: string; pinX: number; pinY: number };

const manualLocations: LocationState[] = [
  { label: "Pesisir Latawe", coordinates: "-4.769, 122.418", pinX: 38, pinY: 54 },
  { label: "Teluk Lasalepa", coordinates: "-4.744, 122.788", pinX: 64, pinY: 42 },
  { label: "Perairan Napabalano", coordinates: "-4.624, 122.697", pinX: 53, pinY: 66 }
];

export default function CreateReportPage() {
  const cameraInput = useRef<HTMLInputElement>(null);
  const galleryInput = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<{ name: string; url: string } | null>(null);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<LocationState | null>(null);
  const [locationMessage, setLocationMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => () => {
    if (photo) URL.revokeObjectURL(photo.url);
  }, [photo]);

  function receivePhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (photo) URL.revokeObjectURL(photo.url);
    setPhoto({ name: file.name, url: URL.createObjectURL(file) });
    setErrors((current) => current.filter((item) => item !== "Tambahkan foto kejadian."));
    setSubmitted(false);
  }

  function useCurrentLocation() {
    setLocationMessage("Mengambil lokasi perangkat…");
    if (!navigator.geolocation) {
      setLocationMessage("Lokasi otomatis tidak tersedia. Pilih titik pada peta.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          label: "Lokasi perangkat",
          coordinates: `${position.coords.latitude.toFixed(5)}, ${position.coords.longitude.toFixed(5)}`,
          pinX: 50,
          pinY: 48
        });
        setLocationMessage("Lokasi perangkat berhasil digunakan.");
      },
      () => setLocationMessage("Izin lokasi tidak diberikan. Pilih titik pada peta."),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  function chooseManualLocation() {
    const currentIndex = location ? manualLocations.findIndex((item) => item.label === location.label) : -1;
    const next = manualLocations[(currentIndex + 1) % manualLocations.length];
    setLocation(next);
    setLocationMessage(`${next.label} dipilih pada peta simulasi.`);
  }

  function submitReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: string[] = [];
    if (!photo) nextErrors.push("Tambahkan foto kejadian.");
    if (!category) nextErrors.push("Pilih kategori kejadian.");
    if (!location) nextErrors.push("Tentukan lokasi kejadian.");
    if (description.trim().length < 20) nextErrors.push("Deskripsi minimal 20 karakter.");
    setErrors(nextErrors);
    if (nextErrors.length) return;
    saveReporterHistoryItem({
      id: "LAP-2026-0049",
      category,
      location: location!.label,
      region: location!.label === "Pesisir Latawe" ? "Tiworo Utara" : location!.label,
      date: "10 Oktober 2026",
      status: "Laporan masyarakat",
      image: "/assets/DSC01043-scaled.jpg",
      imagePosition: "center",
      description: description.trim()
    });
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return <section className="report-success" aria-live="polite">
      <span className="report-success-mark"><ReporterIcon name="check" /></span>
      <div><p>Laporan tersimpan</p><h1>Laporan Anda sudah diterbitkan</h1></div>
      <p>Status awalnya <strong>Laporan masyarakat</strong>. Admin telah dijadwalkan menerima pemberitahuan email pada implementasi backend.</p>
      <dl><div><dt>Kategori</dt><dd>{category}</dd></div><div><dt>Lokasi</dt><dd>{location?.label}</dd></div></dl>
      <div className="report-success-actions"><Link to="/pelapor/riwayat">Lihat riwayat</Link><button type="button" onClick={() => { setSubmitted(false); setPhoto(null); setCategory(""); setDescription(""); setLocation(null); }}>Buat laporan lain</button></div>
    </section>;
  }

  return (
    <div className="report-create-page">
      <header className="report-page-heading"><h3>Laporan Baru</h3></header>

      <form onSubmit={submitReport} noValidate>
        <section className={`photo-first-panel${photo ? " has-photo" : ""}`} aria-labelledby="photo-step-title">
          {!photo ? <>
            <div className="photo-first-copy"><span className="photo-step-number">01</span><div><h2 id="photo-step-title">Tambahkan foto kejadian</h2><p>Foto membantu Admin memahami kondisi sebelum membaca keterangan.</p></div></div>
            <div className="photo-actions">
              <button type="button" className="photo-action-primary" onClick={() => cameraInput.current?.click()}><ReporterIcon name="camera" /><span><strong>Ambil foto</strong><small>Gunakan kamera perangkat</small></span></button>
              <button type="button" onClick={() => galleryInput.current?.click()}><ReporterIcon name="upload" /><span><strong>Unggah foto</strong><small>Pilih dari galeri</small></span></button>
            </div>
          </> : <>
            <img className="report-photo-preview" src={photo.url} alt="Pratinjau foto kejadian" />
            <div className="report-photo-meta"><span><strong>Foto siap digunakan</strong><small>{photo.name}</small></span><div><button type="button" onClick={() => galleryInput.current?.click()}>Ganti</button><button type="button" onClick={() => setPhoto(null)}>Hapus</button></div></div>
          </>}
          <input ref={cameraInput} className="sr-only" type="file" accept="image/*" capture="environment" tabIndex={-1} aria-hidden="true" onChange={receivePhoto} />
          <input ref={galleryInput} className="sr-only" type="file" accept="image/*" tabIndex={-1} aria-hidden="true" onChange={receivePhoto} />
        </section>

        <div className={`report-form-stage${photo ? " is-ready" : ""}`} aria-hidden={!photo}>
          <section className="report-form-panel" aria-labelledby="report-data-title">
            <div className="report-section-heading"><span>02</span><div><h2 id="report-data-title">Ceritakan kejadiannya</h2><p>Isi informasi yang terlihat atau Anda ketahui.</p></div></div>
            <label className="report-field"><span>Kategori kejadian</span><select value={category} onChange={(event) => setCategory(event.target.value)} disabled={!photo}><option value="">Pilih kategori</option>{reporterCategories.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="report-field"><span>Deskripsi</span><textarea value={description} onChange={(event) => setDescription(event.target.value)} disabled={!photo} rows={5} placeholder="Jelaskan apa yang terlihat, perkiraan jumlah atau luas, dan kondisi sekitar." /><small>{description.length}/500 karakter</small></label>
          </section>

          <section className="report-location-panel" aria-labelledby="report-location-title">
            <div className="report-section-heading"><span>03</span><div><h2 id="report-location-title">Tentukan lokasinya</h2><p>Gunakan lokasi perangkat atau tandai pada peta.</p></div></div>
            <button className="use-location-button" type="button" onClick={useCurrentLocation} disabled={!photo}><ReporterIcon name="location" /><span><strong>Gunakan lokasi saat ini</strong><small>Izin perangkat diperlukan</small></span></button>
            <button
              className="report-location-map"
              type="button"
              onClick={chooseManualLocation}
              disabled={!photo}
              style={{ "--pin-x": `${location?.pinX ?? 50}%`, "--pin-y": `${location?.pinY ?? 50}%` } as React.CSSProperties}
            >
              <span className="map-coast" aria-hidden="true" />
              <span className="map-pin"><ReporterIcon name="location" /></span>
              <span className="map-caption">Ketuk peta untuk memindahkan titik</span>
            </button>
            <div className="location-result" role="status"><span>{location ? location.label : "Lokasi belum dipilih"}</span><small>{location?.coordinates ?? (locationMessage || "Pilih salah satu cara di atas.")}</small></div>
          </section>
        </div>

        {errors.length > 0 && <div className="report-form-errors" role="alert"><strong>Laporan belum dapat dikirim</strong><ul>{errors.map((error) => <li key={error}>{error}</li>)}</ul></div>}

        {photo && <div className="report-submit-bar"><span><strong>{category && location ? "Siap ditinjau" : "Lengkapi laporan"}</strong><small>Data langsung dipublikasikan sebagai laporan masyarakat.</small></span><button type="submit">Kirim laporan</button></div>}
      </form>
    </div>
  );
}

