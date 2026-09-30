# VERY.FAK3 — Seoul Fake Tour

Static site, no build step. Open `index.html` to preview or run `python3 -m http.server 8000` in this folder.

## Update content

Edit `data.js`. Each tour entry supports:
- `ticketUrl`: public RA / Partiful URL.
- `presaveUrl`: external pre-save URL.
- `accessMode`: `direct` for tickets, `presave` for pre-save → external RSVP redirect. In gated mode, leave `ticketUrl` blank; configure the redirect with your external provider. This site does not verify saves.
- `listenUrl`, `watchUrl`: HTTPS links to music / video.
- `flyer`: local path such as `assets/cakeshop.jpg`. Use real team artwork.
- `released`: set to `true` only when the song is published. Controls the album counter.
- `status`: `locked` or `archived`. Archived entries keep their configured links; clear obsolete ticket URLs manually.

An empty or invalid URL never creates a clickable button. Dates and artists come from the supplied PROJECT.md and still need team confirmation. `albumUrl` enables the full-album button. Extra events are in `tourExtras`.

## GitHub Pages

Copy the contents of this folder into the root of VERYFAK3/FAK3-TOUR on a new branch. Review the changes, merge into main, and use the existing Pages setup. Keep `data.js` next to `index.html`; it is a new required file. No credentials or backend required.

## Before public launch

Supply and test at least the first actual RSVP link and flyer. Confirm public event/artist information. If using pre-save gating, test a real pre-save → redirect on mobile with the chosen provider. No real booking or music links were supplied in this version.
