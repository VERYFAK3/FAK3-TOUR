'use strict';
// Render only validated links. The site never verifies a pre-save itself.
function safeUrl(value) {
  if (!value) return null;
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; }
  catch { return null; }
}
function el(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}
function link(label, value) {
  const url = safeUrl(value);
  if (!url) return null;
  const a = el('a', 'action', label + ' ↗');
  a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
  return a;
}
function actions(event) {
  const box = el('div', 'actions');
  const gated = event.accessMode === 'presave';
  const entries = [
    [gated ? 'PRE-SAVE → ACCESS' : (event.ticketLabel || 'TICKETS / RSVP'), gated ? event.presaveUrl : event.ticketUrl],
    ...(!gated && !event.released ? [['PRE-SAVE', event.presaveUrl]] : []),
    ['LISTEN', event.listenUrl], ['WATCH', event.watchUrl]
  ];
  entries.forEach(([label, url]) => { const a = link(label, url); if (a) box.append(a); });
  if (!box.children.length) box.append(el('span', 'unavailable', event.status === 'archived' ? 'ARCHIVE COMING SOON' : 'COMING SOON'));
  if (gated && safeUrl(event.presaveUrl)) box.append(el('small', 'access-note', 'Pre-save on the next page to access RSVP.'));
  return box;
}
function renderEvent(event, index, extra = false) {
  const row = el('article', 'event'); row.id = extra ? event.id : 'event-' + event.n;
  const id = el('div', 'event-id');
  id.append(el('span', 'number', extra ? String(index + 10) : event.n), el('span', 'date', event.date));
  const media = el('div', 'media');
  // Only local relative image assets are permitted here.
  if (event.flyer && /^(?:assets\/)?[a-zA-Z0-9_./-]+\.(png|jpe?g|webp)$/i.test(event.flyer) && !event.flyer.includes('..')) {
    const img = el('img'); img.src = event.flyer; img.alt = event.place + ' flyer'; img.loading = 'lazy';
    img.addEventListener('error', () => media.replaceChildren(el('span', '', 'FLYER COMING SOON')), { once: true });
    media.append(img);
  } else media.append(el('span', '', 'FLYER COMING SOON'));
  const info = el('div', 'info');
  const hasAccess = safeUrl(event.accessMode === 'presave' ? event.presaveUrl : event.ticketUrl);
  const state = event.status === 'archived' ? 'ARCHIVED' : hasAccess ? 'ACCESS OPEN' : extra ? 'FREE ENTRY' : 'UPCOMING';
  info.append(el('small', hasAccess ? 'status open' : 'status', state), el('h3', '', event.place), el('p', 'artist', event.artist), el('p', 'track', event.track));
  row.append(id, media, info, actions(event)); return row;
}
const released = tourEvents.filter(e => e.released === true).length;
document.querySelector('#count').textContent = released + ' / ' + tourEvents.length;
const blocks = document.querySelector('#blocks');
blocks.setAttribute('aria-valuemax', tourEvents.length); blocks.setAttribute('aria-valuenow', released);
tourEvents.forEach(e => blocks.append(el('i', e.released ? 'on' : '')));
if (released === tourEvents.length) document.querySelector('#album-label').textContent = 'ALBUM LOADED';
const albumLink = link('LISTEN TO THE ALBUM', albumUrl);
if (albumLink) document.querySelector('#album-link').append(albumLink);
document.querySelector('#events').replaceChildren(...tourEvents.map((e, i) => renderEvent(e, i)));
document.querySelector('#extras').replaceChildren(...tourExtras.map((e, i) => renderEvent(e, i, true)));
