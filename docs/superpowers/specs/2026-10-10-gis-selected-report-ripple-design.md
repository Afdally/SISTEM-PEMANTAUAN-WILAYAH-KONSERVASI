# GIS Selected Report Ripple Design

## Approved direction

Add a single coastal ripple to a report marker whenever that report is selected from the map, search, or report list.

- Two thin cyan rings expand and fade over 650 ms.
- The selected marker keeps a static cyan outline while its quick detail is open.
- Marker fill continues to represent danger level and is never replaced by the selection color.
- The previous endless critical-marker pulse is replaced by a static critical halo so only user selection creates motion.
- Reduced-motion users receive the static selected outline without the expanding rings.

## Major decision reasons

- A one-shot ripple confirms which map point was selected.
- Cyan distinguishes interaction state from danger colors.
- A static outline preserves selection after the short animation ends.
- Removing perpetual critical motion keeps the map calm and makes the click response meaningful.

## Acceptance criteria

- Direct marker click, search selection, and report-list selection can trigger the ripple when the marker is visible.
- The animation plays once and does not loop.
- Selected marker identity remains visible after the ripple ends.
- Closing or changing selection removes the previous selected outline.
- Type checking and production build pass.

