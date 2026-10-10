# Admin Report Management

## Purpose

Give KKP administrators one focused place to inspect community reports that are published immediately and remove reports containing incorrect or unsuitable content.

## Content

- Search by report ID, event category, general location, or district.
- Filter by report status.
- Responsive report list showing photo, category, location, date, ID, and status.
- Dedicated detail page showing the same submitted photo and full report description while retaining the admin navbar and sidebar.
- Delete action in both the list and detail dialog, followed by explicit confirmation.
- No verifier workflow, assignment controls, or invented moderation metrics.

## Prototype behavior

- The page reads from the same reporter-history source used by the reporter area.
- Deletion is persisted in local storage and removes the report from both admin and reporter views on the same browser.
- Sample values remain visibly labelled as simulation in the page heading.

## Visual direction

- Restrained marine administrative workspace using the existing SIMEKA glass language.
- ENERGY 1 / RHYTHM 2 / MOTION 1.
- Photos and report category lead the scanning hierarchy; destructive red is reserved for deletion.
- Mobile rows become readable cards, while desktop uses aligned comparison columns.

## Decision reasons

- A list is used because the admin's primary decision is whether a specific report should remain published.
- Details open at `/admin/laporan/:id` so long content scrolls naturally and can be opened directly without covering navigation.
- Delete confirmation includes the report category and ID to reduce accidental removal.
