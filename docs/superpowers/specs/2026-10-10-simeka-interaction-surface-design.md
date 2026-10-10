# SIMEKA Interaction Surface Design

## Design read

Public-service monitoring application for residents and government staff, using a calm coastal-utilitarian visual language. Dials: ENERGY 2 / RHYTHM 2 / MOTION 1.

## Approved direction

Combine restrained coastal glass with tactile interaction feedback.

- Tactile feedback belongs only to actionable controls and cards: hover lifts, press returns, focus remains visible.
- Glass is limited to the GIS flyout and selected filter/control states. Solid content cards remain the reading surface.
- Static analytics and species cards receive refined surfaces but no misleading click motion.
- Motion is short, state-driven, and disabled by `prefers-reduced-motion`.
- SIMEKA blue remains the primary color; pale coastal cyan is the supporting surface and terracotta remains a data/status accent.

## Major decision reasons

- Short elevation on actionable cards clarifies clickability.
- Press compression gives touch and mouse users immediate feedback.
- Limited glass lets map context remain visible without weakening text contrast.
- Solid analytics cards avoid implying that non-interactive data panels can be opened.
- Image zoom is restricted to clickable report cards because it reinforces their drill-down behavior.

## Acceptance criteria

- Navbar, primary buttons, filters, GIS tools, report cards, and reporter history cards expose hover, active, and focus feedback.
- No perpetual animation or broad page entrance animation is introduced.
- No interaction causes horizontal overflow or content shift.
- Reduced-motion mode removes new transforms and transitions.
- Type checking and production build pass.

