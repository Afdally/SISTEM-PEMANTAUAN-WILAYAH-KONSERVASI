# Desain Modul Pelapor SIMEKA

## Tujuan

Menyediakan alur pelaporan lapangan yang dimulai dari bukti foto, lalu dilengkapi dengan kategori, lokasi, dan deskripsi. Modul berdiri terpisah dari tampilan publik.

## Arah visual

- Design Read: aplikasi layanan publik untuk pelapor lapangan, bahasa visual pesisir yang tenang dan utilitarian.
- Dial: ENERGY 2 / RHYTHM 2 / MOTION 1.
- Biru laut menjadi warna identitas; jingga hanya menandai peringatan atau kesalahan.
- IBM Plex Sans dipakai untuk form dan data; Newsreader hanya untuk judul penting.
- Motif garis pasang-surut dipakai terbatas pada header sebagai identitas SIMEKA.

## Navigasi

- Mobile dan tablet memakai bottom navigation dengan dua tujuan: Buat Laporan dan Riwayat.
- Desktop memakai sidebar kiri dengan dua tujuan yang sama.
- Detail laporan hanya dibuka dari Riwayat.
- Identitas Google dan logout berada pada menu akun di header.

## Buat Laporan

1. Layar awal berfokus pada Ambil foto dan Unggah foto.
2. Form lanjutan baru aktif setelah foto tersedia.
3. Form memuat kategori, lokasi otomatis atau titik manual, dan deskripsi.
4. Pelapor tidak memilih tingkat bahaya atau prioritas.
5. Pengiriman prototipe menampilkan konfirmasi dan menambahkan laporan ke riwayat lokal sesi.

## Riwayat dan detail

- Riwayat menampilkan foto, kategori, lokasi, tanggal, dan status.
- Filter hanya berdasarkan status yang benar-benar digunakan.
- Detail menampilkan dokumentasi, metadata, deskripsi, serta catatan admin jika tersedia.
- Konten contoh diberi label simulasi.

## Responsif dan aksesibilitas

- Target sentuh minimal 44 piksel.
- Bottom navigation menyediakan ruang bawah agar tidak menutupi konten.
- Form satu kolom pada mobile, dua area pada desktop setelah foto tersedia.
- Semua input memiliki label, pesan validasi, fokus terlihat, dan status teks.

