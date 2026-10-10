# Rencana Implementasi Modul Pelapor SIMEKA

1. Tambahkan model dan data simulasi riwayat laporan pada `src/data/reporter.ts`.
2. Buat layout Pelapor dengan header akun, sidebar desktop, dan bottom navigation mobile/tablet.
3. Buat halaman camera-first dengan input kamera/galeri, pratinjau, form lanjutan, validasi, lokasi simulasi, dan konfirmasi kirim.
4. Buat halaman Riwayat dengan filter status serta empty state.
5. Buat halaman Detail yang dapat dibuka dari kartu riwayat.
6. Tambahkan rute `/pelapor/login`, `/pelapor/buat-laporan`, `/pelapor/riwayat`, dan `/pelapor/riwayat/:id` secara lazy-loaded.
7. Tambahkan CSS mobile-first, kemudian reflow tablet dan desktop.
8. Jalankan typecheck, build, uji semua kontrol, desktop, tablet, mobile, dan audit anti-slop.

