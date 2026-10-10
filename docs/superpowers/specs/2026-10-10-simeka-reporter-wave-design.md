# SIMEKA Reporter Wave Design

## Approved direction

Use a layered coastal-wave motif based on the supplied reference in two places only:

- the camera/upload panel before a report photo is selected;
- the visual half of the reporter login screen on desktop.

The motif is built with CSS pseudo-elements, not a new image asset. It uses SIMEKA navy, ocean blue, and restrained turquoise. It remains static so the interface stays calm and lightweight.

## Major decision reasons

- Wave shapes connect the reporter workflow to the coastal-monitoring purpose.
- Limiting the motif to two identity surfaces prevents decorative repetition.
- CSS shapes scale cleanly between phone and desktop without another network request.
- The wave disappears behind the actual report image after upload, keeping the evidence photo primary.

## Acceptance criteria

- The empty camera/upload panel contains clearly layered wave bands without reducing text or button contrast.
- The desktop login visual replaces outlined ellipses with broad wave bands.
- The mobile login layout remains unchanged because its visual pane stays hidden.
- No new animation, external asset, overflow, or interaction is introduced.
- Type checking and production build pass.

