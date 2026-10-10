# SIMEKA Typography and Public Login Design

## Decision

- Use Plus Jakarta Sans for navigation, body copy, forms, labels, and buttons across public and reporter surfaces.
- Use Poppins for headings, dashboard figures, and other display text.
- Keep the existing visual hierarchy and layouts; this is a system-wide identity alignment, not a redesign.
- Add a compact `Masuk` action to the public header linking to `/pelapor/login`.
- Preserve the full-height GIS layout and keep the header usable down to 320 px without horizontal overflow.

## Responsive behavior

- Desktop and standard phones keep the brand and navigation on one line.
- On very narrow phones, the brand mark is hidden and spacing is reduced rather than increasing the GIS header height.
- `Masuk` is visually distinct from page-navigation links but remains restrained and consistent with SIMEKA blue.

## Acceptance criteria

- No IBM Plex Sans or Newsreader references remain.
- Dashboard, GIS, reporter pages, and login inherit the new font tokens.
- The public header exposes Dashboard, GIS, and Masuk.
- Masuk opens the reporter login page.
- Type checking and production build pass.

