# Admin Report Management Plan

1. Extend `src/data/reporter.ts` with browser-persisted deletion shared by reporter and admin pages.
2. Create `src/pages/admin/AdminReportsPage.tsx` with search, status filter, responsive list, links to detail, and delete confirmation.
3. Create `src/pages/admin/AdminReportDetailPage.tsx` and route `/admin/laporan/:id` to it so details remain inside the normal admin layout.
4. Add isolated `.admin-report-*` styles to `src/admin.css` without changing Dashboard styles.
5. Do not run builds, browser checks, or automated tests because the user will inspect the prototype.
