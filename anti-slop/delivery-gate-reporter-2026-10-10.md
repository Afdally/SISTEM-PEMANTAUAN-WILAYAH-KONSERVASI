# Delivery Gate Modul Pelapor 2026-10-10

## Design Read

Aplikasi layanan publik untuk pelapor lapangan, bahasa visual pesisir tenang dan utilitarian. ENERGY 2 / RHYTHM 2 / MOTION 1.

## Alasan keputusan utama

- Biru laut mengikat modul Pelapor dengan identitas Blue Forest dan halaman publik SIMEKA.
- Alur camera-first mendahulukan bukti yang memang diwajibkan oleh proses pelaporan.
- Bottom navigation dipakai pada mobile/tablet karena hanya ada dua tujuan utama dan keduanya harus mudah dijangkau ibu jari.
- Sidebar desktop memakai ruang horizontal yang tersedia tanpa menambah menu baru.
- Newsreader menandai judul keputusan; IBM Plex Sans menjaga form dan data mudah dibaca.
- Motif pasang-surut hanya muncul pada panel foto dan login agar identitas terasa tanpa menjadi dekorasi seluruh halaman.
- Bayangan hanya dipakai pada submit bar dan menu akun karena keduanya benar-benar berada di atas konten.

## Hard Gate

- R-02 PASS: tidak ada em dash pada copy antarmuka Pelapor.
- R-03 PASS: tidak ada overflow horizontal pada pengujian 390, 900, dan 1280 piksel.
- R-17/R-18/R-36/R-38 PASS: tidak ada statistik, testimoni, atau klaim keamanan yang dibuat-buat; contoh diberi label simulasi.
- R-23 PASS: hanya memakai foto aset proyek yang sudah tersedia dan logo berbasis identitas SIMEKA yang sudah ada.
- R-24/R-26 PASS: seluruh tautan menuju rute nyata; filter, unggah, lokasi manual, submit, akun, dan kembali memiliki perilaku.
- R-25 PASS: teks utama memakai pasangan biru gelap/putih atau biru gelap/latar terang dengan kontras tinggi.
- R-27 PASS: riwayat memiliki empty state dan form memiliki validasi error serta konfirmasi berhasil.
- R-32 PASS: kontrol native, tautan, bottom navigation, dan sidebar dapat difokuskan dengan keyboard serta memakai fokus global yang terlihat.
- R-33 PASS: perubahan ditulis langsung pada sumber React dan CSS, bukan injeksi eksternal.
- R-34 PASS: tidak ada toggle tema yang setengah jadi; tema terang dipilih untuk layanan publik lapangan.
- R-35 PASS: typecheck dan build lulus; login, filter riwayat, detail, unggah foto, kategori, deskripsi, lokasi manual, submit, dan penyimpanan riwayat telah diuji melalui browser.

## Purpose Gate

- R-01 PASS: tidak ada gradient generik; warna bertingkat hanya dipakai untuk kedalaman panel identitas.
- R-04 PASS: ikon kamera, unggah, lokasi, riwayat, akun, dan kembali sesuai fungsi masing-masing.
- R-06 PASS: Newsreader dipakai untuk karakter editorial lingkungan, sedangkan IBM Plex Sans untuk keterbacaan data.
- R-07 PASS: tidak ada grid dekoratif; motif garis pasang-surut relevan dengan konteks pesisir.
- R-08/R-09 PASS: tidak ada panah dekoratif berulang atau badge promosi tanpa fungsi.
- R-10 PASS: tidak ada glassmorphism yang dipakai sebagai gaya utama.
- R-11/R-12/R-13 PASS: radius, bayangan, dan aksen dibatasi sesuai hierarki.
- R-19 PASS: motion hanya untuk kemunculan form setelah foto dan perpindahan pin; reduced-motion menonaktifkannya.
- R-22 PASS: tidak ada ilustrasi generik.

## Liveliness

- PASS: dial ENERGY 2 / RHYTHM 2 / MOTION 1 dinyatakan dan konsisten.
- PASS: fokus layar Buat Laporan adalah foto; fokus Riwayat adalah daftar status; fokus Detail adalah dokumentasi.
- PASS: whitespace memisahkan pengambilan bukti, pengisian data, dan tindakan kirim.
- PASS: jingga hanya menjadi aksen lokasi/peringatan, bukan warna seluruh komponen.
- PASS: motif garis pasang-surut dan pasangan tipografi menjadi identitas berulang.

## Craftsmanship

- C-1 PASS: setiap keputusan visual utama memiliki alasan tertulis di atas.
- C-2 PASS: tidak ada kontrol mati; integrasi eksternal yang belum tersedia diberi label Mode desain.
- C-3 PASS: hanya ada halaman yang mendukung alur login, buat laporan, riwayat, dan detail.
- C-4 PASS: layout teruji pada mobile, tablet, desktop, filter kosong, validasi, dan sukses.
- C-5 PASS: konten contoh selalu diberi label simulasi.
- R-05/R-20/R-30 PASS: komposisi dibangun dari alur camera-first SIMEKA, bukan template dashboard atau tiruan produk lain.
- R-15/R-16 PASS: CTA menyebut tindakan konkret dan tidak memakai buzzword.
- R-29 PASS: palet dibatasi pada biru laut, biru-hijau, netral, dan jingga sebagai aksen.

## Hasil

PASS. Modul siap dipakai sebagai prototipe desain; Google OAuth, database, penyimpanan foto, geocoding, dan email Admin tetap membutuhkan backend.

