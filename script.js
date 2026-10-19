'use strict';

// Autorise uniquement les liens HTTPS.
function safeUrl(value) {
  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}

function el(tag, className, content) {
  const node = document.createElement(tag);

  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;

  return node;
}

function link(label, value, primary = false) {
  const url = safeUrl(value);
  if (!url) return null;

  const a = el(
    'a',
    primary ? 'action action-primary' : 'action',
    label + ' ↗'
  );

  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';

  return a;
}

function actions(event) {
  const box = el('div', 'actions');
  const gated = event.accessMode === 'presave';

  const entries = [
    [
      gated
        ? 'PRE-SAVE → ACCESS'
        : (event.ticketLabel || 'TICKETS / RSVP'),
      gated ? event.presaveUrl : event.ticketUrl,
      true
    ],
    ...(!gated && !event.released
      ? [['PRE-SAVE', event.presaveUrl, false]]
      : []),
    ['LISTEN RELEASE', event.listenUrl, false],
    ['AFTERMOVIE', event.watchUrl, false]
  ];

  entries.forEach(([label, url, primary]) => {
    const a = link(label, url, primary);
    if (a) box.append(a);
  });

  if (!box.children.length) {
    box.append(
      el(
        'span',
        'unavailable',
        event.status === 'archived'
          ? 'ARCHIVE COMING SOON'
          : 'COMING SOON'
      )
    );
  }

  if (gated && safeUrl(event.presaveUrl)) {
    box.append(
      el(
        'small',
        'access-note',
        'Pre-save on the next page to access RSVP.'
      )
    );
  }

  return box;
}

function renderEvent(event, index, extra = false) {
  const row = el('article', 'event');
  row.id = extra ? event.id : 'event-' + event.n;

  const id = el('div', 'event-id');

  id.append(
    el(
      'span',
      'number',
      extra ? String(index + tourEvents.length + 1) : event.n
    ),
    el('span', 'date', event.date)
  );

  const media = el('div', 'media');

  // Accepte uniquement les chemins locaux d’images.
  const validFlyer =
    typeof event.flyer === 'string' &&
    /^(?:assets\/)?[a-zA-Z0-9_./-]+\.(png|jpe?g|webp)$/i.test(event.flyer) &&
    !event.flyer.startsWith('/') &&
    !event.flyer.includes('..');

  if (validFlyer) {
    const img = el('img');

    img.src = event.flyer;
    img.alt = event.place + ' flyer';
    img.loading = 'lazy';

    img.addEventListener(
      'error',
      () => {
        media.replaceChildren(
          el('span', '', 'FLYER COMING SOON')
        );
      },
      { once: true }
    );

    media.append(img);
  } else {
    media.append(el('span', '', 'FLYER COMING SOON'));
  }

  const info = el('div', 'info');

  const hasAccess = safeUrl(
    event.accessMode === 'presave'
      ? event.presaveUrl
      : event.ticketUrl
  );

  const archived = event.status === 'archived';

  const state = archived
    ? 'ARCHIVED'
    : hasAccess
      ? 'ACCESS OPEN'
      : extra
        ? 'FREE ENTRY'
        : 'UPCOMING';

  info.append(
    el(
      'small',
      hasAccess && !archived ? 'status open' : 'status',
      state
    ),
    el('h3', '', event.place),
    el('p', 'artist', event.artist),
    el(
      'p',
      'track',
      extra ? event.track : 'RELEASE: ' + event.track
    )
  );

  row.append(id, media, info, actions(event));

  return row;
}

function renderSite() {
  const released = tourEvents.filter(
    event => event.released === true
  ).length;

  const count = document.querySelector('#count');
  if (count) {
    count.textContent = released + ' / ' + tourEvents.length;
  }

  const blocks = document.querySelector('#blocks');

  if (blocks) {
    blocks.setAttribute('aria-valuemax', String(tourEvents.length));
    blocks.setAttribute('aria-valuenow', String(released));
    blocks.style.gridTemplateColumns =
      `repeat(${tourEvents.length}, 1fr)`;

    blocks.replaceChildren(
      ...tourEvents.map(event =>
        el('i', event.released ? 'on' : '')
      )
    );
  }

  const albumLabel = document.querySelector('#album-label');

  if (albumLabel) {
    albumLabel.textContent =
      tourEvents.length > 0 && released === tourEvents.length
        ? 'ALBUM LOADED'
        : 'ALBUM LOADING';
  }

  const albumContainer = document.querySelector('#album-link');

  if (albumContainer) {
    const albumLink = link('LISTEN TO THE ALBUM', albumUrl);
    albumContainer.replaceChildren();

    if (albumLink) albumContainer.append(albumLink);
  }

  const events = document.querySelector('#events');

  if (events) {
    events.replaceChildren(
      ...tourEvents.map((event, index) =>
        renderEvent(event, index)
      )
    );
  }

  const extras = document.querySelector('#extras');

  if (extras) {
    extras.replaceChildren(
      ...tourExtras.map((event, index) =>
        renderEvent(event, index, true)
      )
    );
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderSite, {
    once: true
  });
} else {
  renderSite();
}