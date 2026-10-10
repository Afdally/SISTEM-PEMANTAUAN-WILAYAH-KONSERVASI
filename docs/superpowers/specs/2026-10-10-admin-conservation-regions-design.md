# Admin Conservation Regions

## Purpose

Allow KKP administrators to find, add, and update conservation-area records and their spatial packages from one operational page.

## Content

- Search by area name or district.
- Filter by calculated area category.
- List: area name, district, area size, unreviewed reports, category, and action.
- Add/edit form: area name, district, area size, and zipped SHP package.
- A `Peta & lapisan` view inside the same menu, opened either from the view switcher or a region row.
- Region selector, compact layer controls, spatial preview, legend, and source metadata.
- Layers cover the official boundary, zoning, mangrove, coral reef, seagrass, and community-report points.
- Region category remains derived from the number of unreviewed reports, not manually selected.

## Prototype behavior

- The page uses local component state only.
- Add, edit, search, filter, cancel, save, and empty-state actions behave like a dynamic system.
- The SHP field accepts a ZIP package and displays the chosen filename; no file is uploaded in this design stage.
- Map layers are interactive prototype controls; they do not parse or persist the uploaded package yet.
- All visible values remain labelled as simulation through the admin page heading.

## Visual direction

- Operational KKP workspace in a restrained marine-glass language.
- ENERGY 1 / RHYTHM 2 / MOTION 1.
- A comparison list is the focal point; glass stays on the main workspace only.
- Mobile rows reflow into compact cards without horizontal scrolling.

## Decision reasons

- A list is used because administrators compare operational fields across regions.
- GIS stays inside the region-management page because the current job is validating a region and its layers, not operating a separate GIS product.
- A dedicated map view prevents a small preview from making every table row visually heavy.
- Search comes first because area name and district are the primary retrieval paths.
- Orange/red appears only for warning categories because it carries urgency.
- The add form combines metadata and SHP selection because they form one region record.

