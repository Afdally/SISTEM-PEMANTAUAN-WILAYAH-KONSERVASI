# Desain Migrasi Publik SIMEKA ke React

## Tujuan

Memindahkan Dashboard dan GIS publik ke React tanpa mengubah arah visual yang telah disetujui. Folder HTML lama tetap utuh sebagai referensi dan cadangan.

## Struktur

- Dashboard memakai layout publik lengkap. GIS hanya mempertahankan navbar agar seluruh ruang di bawahnya dapat dipakai sebagai kanvas peta.
- Dashboard langsung membuka dua panel: Kawasan Konservasi dan Aktivitas Pelaporan.
- Dua grafik, laporan terbaru, dan tiga spesies tetap berada di bawah ringkasan.
- GIS menjadi rute terpisah dan memuat Leaflet hanya ketika dibuka.
- Struktur folder menyediakan tempat untuk layout Admin dan Pelapor pada tahap berikutnya, tanpa membuat halaman kosong yang belum dibutuhkan.

## Sistem desain

- Biru laut sebagai warna identitas; warna status hanya untuk arti Kritis, Siaga, Waspada, dan Normal.
- IBM Plex Sans untuk teks/data dan Newsreader untuk judul bagian.
- Komponen kartu, badge, panel, navigasi, dan spacing menggunakan token yang sama.
- Tidak ada judul hero besar. Judul halaman tetap tersedia untuk pembaca layar.
- ENERGY 2 / RHYTHM 2 / MOTION 1.

## Responsif dan aksesibilitas

- Mobile-first: panel dan grafik bertumpuk; metrik memakai dua kolom bila cukup.
- Semua kontrol minimal 44 piksel, memiliki fokus terlihat, dan dapat digunakan dengan keyboard.
- Status selalu memiliki label teks, bukan warna saja.
- Laporan memakai elemen `details` agar dapat dibuka tanpa interaksi khusus JavaScript.

## Spesifikasi GIS pilihan A

- Filter laporan menggunakan kategori multi-pilih, tingkat bahaya, periode/rentang tanggal, dan wilayah.
- Ekosistem tetap menjadi lapisan spasial, bukan field filter laporan.
- Peta memenuhi seluruh ruang di bawah navbar tanpa kartu pembungkus, footer, atau banner global.
- Toolbar vertikal di sisi kanan membuka satu panel overlay pada satu waktu: pencarian, filter, lapisan, daftar laporan, atau legenda.
- Panel lapisan berisi kawasan, ekosistem, laporan, dan peta dasar; semua panel tertutup secara default agar peta tidak tertutup.
- Titik laporan memakai ikon kategori, ukuran lebih besar untuk Kritis, dan cluster mengikuti bahaya tertinggi.
- Titik satwa dilindungi digeneralisasi dan tidak menampilkan pelapor.
- Detail titik memuat foto, kategori, bahaya, lokasi umum, tanggal, status, dan deskripsi.
- Interaksi detail memakai dua tingkat: klik titik atau kartu membuka popup ringkas yang terikat pada posisi titik; tombol `Lihat detail lengkap` membuka drawer dari kiri pada desktop dan bottom sheet dari bawah pada ponsel.
- Popup ringkas hanya memuat identitas, status, lokasi/tanggal, dan satu tindakan. Bottom sheet menampung foto, metadata, deskripsi, serta informasi tambahan bila data riil bertambah.
- Legenda dibuka dari toolbar dan menampilkan jumlah laporan per tingkat bahaya, ikon kategori, serta zonasi aktif.
- Daftar laporan mengikuti filter serta batas peta yang sedang terlihat, dan kartu dapat memusatkan peta ke titik.
- Tampilan awal menggunakan batas gabungan kawasan. Batas dan zonasi diberi label simulasi sampai data resmi tersedia.

