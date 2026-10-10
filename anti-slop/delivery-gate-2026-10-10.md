# Delivery Gate 2026-10-10

## Scope

Migrasi tampilan publik SIMEKA ke React, Vite, TypeScript, Tailwind CSS, Chart.js, dan Leaflet.

## Hasil pemeriksaan

- Dashboard memiliki dua panel ringkasan, dua grafik, empat laporan, dan tiga kartu spesies.
- Tidak ada hero judul besar; H1 tetap tersedia untuk pembaca layar.
- Laporan dapat dibuka dengan elemen `details` dan keyboard.
- GIS memenuhi layar di bawah navbar tanpa footer serta memakai toolbar vertikal untuk pencarian, filter, lapisan, daftar laporan, dan legenda.
- Filter GIS memakai kategori multi-pilih, bahaya default Semua, periode/rentang tanggal, dan wilayah; reset mengembalikan 48 laporan simulasi.
- Cluster mengikuti tingkat bahaya tertinggi, titik Kritis lebih besar, dan titik satwa dilindungi menggunakan lokasi umum.
- Daftar laporan mengikuti filter dan area peta yang terlihat; klik kartu memusatkan peta sekaligus membuka detail.
- Detail memakai dua tingkat: popup ringkas mengikuti koordinat fitur; detail lengkap memakai drawer kiri pada desktop dan bottom sheet pada ponsel.
- Popup dijaga tetap berada di dalam kanvas serta menyisakan ruang untuk toolbar kanan pada tampilan ponsel.
- Titik dan poligon GIS dapat difokuskan dan dibuka memakai Enter atau Space.
- Panel detail GIS dapat ditutup memakai Escape.
- GIS dimuat sebagai bundle terpisah dari Dashboard.
- Tidak ada overflow horizontal pada viewport desktop maupun ponsel pengujian.
- TypeScript typecheck dan build produksi berhasil.
- Audit dependensi produksi melaporkan 0 kerentanan.
- Pasangan warna utama lulus WCAG AA untuk teks normal.
- Folder HTML lama tidak ditimpa.

