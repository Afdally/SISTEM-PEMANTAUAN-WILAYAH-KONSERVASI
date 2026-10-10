# Rencana Migrasi Publik SIMEKA ke React

1. Siapkan Vite, React, TypeScript, Tailwind, routing, dan konfigurasi build.
2. Pindahkan data simulasi ke modul data bertipe.
3. Buat komponen layout publik dan komponen UI yang digunakan bersama.
4. Bangun Dashboard dari komponen ringkasan, grafik, laporan, dan spesies.
5. Bangun halaman GIS dengan Leaflet, filter, legenda, dan detail titik.
6. Salin aset foto lokal tanpa mengubah proyek HTML lama.
7. Jalankan typecheck, build produksi, pengujian browser desktop, serta pemeriksaan responsif dan aksesibilitas.

## Penyempurnaan GIS pilihan A

1. Perluas model data laporan dengan kategori, wilayah, tanggal ISO, status, foto, dan penanda lokasi sensitif.
2. Ganti filter ekosistem dengan kategori multi-pilih dan tambahkan filter tanggal serta wilayah.
3. Tambahkan cluster laporan, ikon kategori, zoom awal ke kawasan, pencarian lokal, dan kontrol kembali ke kawasan.
4. Susun panel lapisan berkelompok, basemap Jalan/Satelit, zonasi simulasi, dan status lapisan yang belum tersedia.
5. Tambahkan detail laporan berfoto, legenda kontekstual, serta daftar laporan yang mengikuti viewport.
6. Uji filter, reset, cluster, detail, daftar, keyboard, mobile, typecheck, dan build produksi.

## Detail peta bertingkat

1. Simpan posisi layar fitur terpilih dan perbarui ketika peta bergerak atau diperbesar.
2. Ganti panel detail langsung dengan popup ringkas yang terikat pada titik.
3. Tambahkan drawer kiri untuk desktop dan bottom sheet untuk ponsel; keduanya menutup kontrol peta dan dapat ditutup dengan Escape atau tombol tutup.
4. Verifikasi klik titik, klik kartu laporan, desktop, ponsel, typecheck, dan build produksi.

