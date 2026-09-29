# SEOUL FAKE TOUR — PROJECT REFERENCE

**Project:** Seoul Fake Tour by VERY.FAK3  
**Period:** October–December 2026, Seoul  
**Repository:** `VERYFAK3/FAK3-TOUR`  
**Live site:** https://veryfak3.github.io/FAK3-TOUR/

This file is the shared source of truth for collaborators working on the landing page. Keep it concise and update it when a project decision changes.

## 1. Concept

Seoul Fake Tour is a sequence of parties and music releases. The website is primarily a **functional index / access point / archive**, not an artwork in itself.

VERY.FAK3's position for this project: AI can be used for functional/technical work, but should **not generate or replace the project's art direction**. The site's visual material should come from the team's real flyers, covers, photography, video and other original assets.

Core idea: **“INTERNET GOT THE FAKE ONE — YOU HAD TO BE THERE.”**

## 2. Album progression

The album progression is **0/9 → 9/9**:
1. CAKESHOP — Oct 09 — MITSU — LIGHTS
2. HENZ — Oct 16 — 0SIGGY — ITAEWON BOUNCE
3. SHELTER — Oct 23 — VITALINE — GO! (co-producer; no live performance required)
4. LUKA — Oct 30 — LIL CHERRY — BOULANGERIE
5. FLAC — Nov 06 — FEROZZLESS — 4AM
6. UNDERCITY — Nov 13 — BRYN, FRESH AIR — THANK U FOR BEING HERE
7. MING — Nov 21 — NINEORZERO — IN2U
8. BOLERO — Nov 27 — KIRIN — CINNAMON BABY
9. SEOUL COMMUNITY RADIO — date TBC — BOO THE BAND — HOODANTHEM (release on radio-session day)

**Full album:** Dec 04.  
**Pop-up:** Dec 05–06, location TBC, artist cypher, free entry.  
**VISLA FM:** date TBC, JOHNNY / SILVER / BOBO public recording, free entry, no associated release, therefore outside the 0/9 album counter.

## 3. RSVP

- CAKESHOP — Resident Advisor
- HENZ — Partiful
- SHELTER — Partiful
- LUKA — Partiful
- FLAC — Partiful / Resident Advisor
- UNDERCITY — Resident Advisor
- MING — Partiful
- BOLERO — Partiful
- Pop-up — free entry
- Seoul Community Radio — free entry
- VISLA FM — free entry

Final URLs are still to be supplied.

## 4. Fake worlds / supplied art

These describe the **team-created flyer/art direction**, not visual styles that the website should invent.

1. CAKESHOP — fake video game
2. HENZ — fake magazine
3. SHELTER — fake camera / CCTV
4. LUKA — fake horror movie
5. FLAC — fake TV show
6. UNDERCITY — fake fight / wrestling show
7. MING — fake old Korean flyer
8. BOLERO — fake advertising (e.g. iPod Touch advertising language)
9. Pop-up — fake Y2K website
10. Seoul Community Radio — fake lottery coupon / ticket
11. VISLA FM — no VERY.FAK3 flyer; VISLA supplies its own flyer

## 5. Website UX

The landing page should remain compact, neutral and mobile-friendly.

Each album event is a **rectangular row/card in one vertical timeline**, with:
- number + date
- MEDIA area
- venue
- artist + release
- state / action

The MEDIA area is flexible:
- before event: flyer
- after event: may become cover, photo or aftermovie thumbnail

### Event states

**LOCKED** — event visible, action unavailable.  
**OPEN / THIS WEEK** — active access/pre-save CTA.  
**ACCESS GRANTED** — external pre-save service redirects to RSVP.  
**ARCHIVED** — entry stays available with LISTEN and/or WATCH actions.  
**ALBUM LOADED** — after 9/9, album access replaces the loading state and the pop-up becomes the physical epilogue.

## 6. Pre-save / RSVP flow

Target flow:

`VERY.FAK3 SITE → PRE-SAVE → VALIDATION BY EXTERNAL SERVICE → PARTIFUL / RA`

The static site must **not pretend to verify a pre-save itself**.

found.ee has been considered for pre-save/fanlink and redirect behavior. Before rollout, test one real release end-to-end. Spotify + Apple Music were the initially preferred validation paths because redirect behavior was explicitly documented during research.

Important: do not embed supposedly private RSVP URLs directly in front-end code if the pre-save is meant to act as a gate. Store the redirect on the pre-save service when possible.

## 7. Visual/UI rules

Current direction:
- near-black background
- light neutral text
- VERY.FAK3 red used sparingly for functional states/actions
- real VERY.FAK3 logo
- system typography
- thin rules/borders
- compact rectangular timeline
- generous clarity, minimal decoration

Allowed micro-interactions:
- subtle row hover
- short button hover/inversion
- loading progress transition
- expand/collapse for useful information
- small red active-status indicator when needed

Avoid:
- generated decorative artwork
- fake CRT/scanlines/glitch merely for style
- unnecessary textures
- excessive animation
- modern SaaS/card-dashboard aesthetics
- letting the interface compete with the team's flyers/art

## 8. Technical setup

- Static HTML / CSS / JavaScript
- GitHub repository: `VERYFAK3/FAK3-TOUR`
- GitHub Pages deployment from `main` / root
- Live URL: https://veryfak3.github.io/FAK3-TOUR/
- No backend planned for V1
- Event data currently lives in `script.js`
- Main files: `index.html`, `style.css`, `script.js`, `logo.png`

For collaboration, prefer branches + pull requests for substantial changes rather than editing the live `main` branch blindly.

## 9. Assets / information still needed

- final flyers for events
- confirmed SCR date
- confirmed VISLA FM date
- confirmed pop-up location
- pre-save/fanlink URLs
- Partiful / Resident Advisor URLs
- post-event covers/photos/aftermovie URLs
- any final copy corrections

## 10. Current status

GitHub Pages is live.  
A dark minimal prototype exists.  
Logo is integrated.  
Album counter has been updated conceptually to 0/9.  
The desired layout is now a **single vertical sequence of rectangular event rows**, with flyer/media space.

## 11. Next steps

1. Refine the neutral rectangular timeline and responsive behavior.
2. Integrate real flyers as they become available.
3. Add explicit data fields for status, pre-save URL, RSVP URL, fanlink, aftermovie and media.
4. Connect and test one real pre-save → RSVP journey.
5. Validate mobile UX.
6. Duplicate the tested flow across all releases.
7. During the tour, update each event from LOCKED → OPEN → ARCHIVED.
8. At 9/9, switch the site to ALBUM LOADED / permanent archive.

## Collaboration rule

When a collaborator or a new ChatGPT session joins the project, **read this file first and inspect the current repository before proposing changes**. If a decision made in conversation changes this specification, update this file so GitHub remains the shared source of truth.
