# Admin Category Management

## Purpose

Give KKP administrators one compact place to manage the two different category systems used by SIMEKA.

## Information architecture

- Sidebar destination: **Kelola Kategori**.
- Mobile label: **Kategori**.
- Tab 1, **Kategori Kejadian**: controls the choices shown in the reporter form.
- Tab 2, **Kategori Wilayah**: controls report-count ranges for Rendah, Sedang, Tinggi, and Kritis.

## Interaction

- Event categories can be added, renamed, enabled, or disabled.
- Existing categories are disabled rather than permanently deleted so report history remains valid.
- Region categories expose editable minimum and maximum values.
- This design prototype keeps changes in component state only and labels the data as simulation.
- Add and edit actions use one focused dialog with Cancel and Save actions.

## Visual direction

- Reading: operational admin tool for KKP in a restrained marine-glass language.
- Dials: ENERGY 1 / RHYTHM 2 / MOTION 1.
- The list is the focal point. Glass remains limited to the main workspace.
- Desktop uses a table-like list; mobile reflows each row into a compact management card.

## Major decision reasons

- One sidebar item prevents navigation growth while tabs preserve the distinction between category types.
- Blue identifies primary actions because it is the Blue Forest/SIMEKA brand color.
- Status color appears only on active/inactive state because it carries operational meaning.
- Plus Jakarta Sans and Poppins continue the existing product identity and readability.
- Rows are used instead of a card mosaic because administrators compare names, usage, and status repeatedly.

