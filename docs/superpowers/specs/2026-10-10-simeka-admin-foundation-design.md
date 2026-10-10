# SIMEKA Admin Foundation Design

## Scope

Create the first admin design slice for KKP:

- `/admin/login` for a separate Google-login entry;
- guarded `/admin` routes using a clearly labelled design-mode session;
- Dashboard Admin;
- desktop sidebar and mobile/tablet bottom navigation;
- real placeholder destinations for Laporan, Wilayah Konservasi, and Kategori Wilayah so navigation has no dead links.

Actual Google OAuth, server authorization, SHP upload, report deletion, and database persistence are outside this design slice.

## Design read

Operational government data workspace for KKP, with a calm marine glass visual language. Dials: ENERGY 1 / RHYTHM 2 / MOTION 1.

## Visual system

- Sidebar is solid deep ocean blue for stable navigation.
- The application background uses broad static wave fields.
- One main glass workspace provides the glassmorphism identity; nested cards use translucent fills without adding blur to every surface.
- Plus Jakarta Sans remains the body typeface and Poppins remains the display/number typeface.
- Danger colors are reserved for real category states; SIMEKA blue and turquoise handle navigation and interaction.

## Dashboard hierarchy

Four compact metrics with no explanatory subcopy:

1. Wilayah konservasi
2. Total luas
3. Laporan bulan ini
4. Belum ditinjau

Below the metrics:

- simulated conservation-area map with category markers;
- category composition;
- monthly report trend;
- latest public reports.

All prototype values remain visibly marked as simulated data.

## Responsive behavior

- Mobile: compact header, two-column metrics, stacked analytics, four-item bottom navigation.
- Tablet: two-column analytics where content fits, bottom navigation remains.
- Desktop at 1024 px and above: sidebar, no bottom navigation, wide two-column analytics.
- All tap targets are at least 44 px and content reserves space above the bottom navigation.

## Authentication behavior

- The Google login button creates only a `sessionStorage` design-session flag and navigates to `/admin`.
- Every `/admin/*` route redirects to `/admin/login` without that flag.
- Logout clears the design-session flag.
- UI explicitly labels the flow as design mode, never as production security.

## Major decision reasons

- A dedicated URL keeps public, reporter, and admin flows separate.
- Sidebar supports recurring desktop data work while bottom navigation keeps the four primary areas reachable on touch devices.
- One glass workspace preserves readability and avoids applying blur to every card.
- Operational metrics and latest reports answer what KKP needs to inspect now.

## Acceptance criteria

- Public `Masuk` continues to open reporter login, not admin login.
- `/admin` is unavailable until the design-mode login is used.
- Login, logout, sidebar, bottom navigation, and every menu destination work.
- Dashboard contains the agreed four metrics and four analytical views with minimal text.
- No horizontal overflow at mobile, tablet, or desktop widths.
- Type checking and production build pass.

