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

  if (className) {
    node.className = className;
  }

  if (content !== undefined) {
    node.textContent = content;
  }

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
  const archived = event.status === 'archived';
  const gated = event.accessMode === 'presave';

  // Les soirées archivées ne proposent plus de billetterie.
  if (!archived) {
    const accessUrl = gated
      ? event.presaveUrl
      : event.ticketUrl;

    const accessLabel = gated
      ? 'PRE-SAVE → ACCESS'
      : (event.ticketLabel || 'TICKETS / RSVP');

    const accessLink = link(accessLabel, accessUrl, true);

    if (accessLink) {
      box.append(accessLink);
    }

    if (event.accessNotice && !safeUrl(accessUrl)) {
      box.append(
        el('span', 'action access-notice', event.accessNotice)
      );
    }

    if (event.guestCodeNotice) {
      box.append(
        el('span', 'action access-notice', event.guestCodeNotice)
      );
    }

    if (!gated && !event.released) {
      const presaveLink = link('PRE-SAVE', event.presaveUrl);

      if (presaveLink) {
        box.append(presaveLink);
      }
    }

    const raLink = link(
      'TICKETS · RESIDENT ADVISOR (IF NO KOREAN CARD)',
      event.raUrl,
      true
    );

    if (raLink) {
      box.append(raLink);
    }
  }

  const listenLink = link('LISTEN RELEASE', event.listenUrl);
  const aftermovieLink = link('AFTERMOVIE', event.watchUrl);

  if (listenLink) {
    box.append(listenLink);
  }

  if (aftermovieLink) {
    box.append(aftermovieLink);
  }

  if (!box.children.length) {
    box.append(
      el(
        'span',
        'unavailable',
        archived ? 'ARCHIVE COMING SOON' : 'COMING SOON'
      )
    );
  }

  if (!archived && gated && safeUrl(event.presaveUrl)) {
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
    /^[a-zA-Z0-9_./-]+\.(png|jpe?g|webp)$/i.test(event.flyer) &&
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
    media.append(
      el('span', '', 'FLYER COMING SOON')
    );
  }

  const info = el('div', 'info');
  const archived = event.status === 'archived';

  const hasAccess =
    !archived &&
    (
      safeUrl(
        event.accessMode === 'presave'
          ? event.presaveUrl
          : event.ticketUrl
      ) ||
      safeUrl(event.raUrl)
    );

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
      hasAccess ? 'status open' : 'status',
      state
    ),
<<<<<<< HEAD
    el('h3', '', event.place)
=======
    el('h3', '', event.place),
    el('p', 'artist', event.artist),
    el(
      'p',
      'track',
      event.track ? (extra ? event.track : 'RELEASE: ' + event.track) : ''
    )
>>>>>>> e66739f6c16dd0459850c4586968116fc2409e72
  );

  if (event.artist) {
    info.append(
      el('p', 'artist', event.artist)
    );
  }

  if (event.track) {
    const trackText =
      extra || event.album === false
        ? event.track
        : 'RELEASE: ' + event.track;

    info.append(
      el('p', 'track', trackText)
    );
  }

  row.append(
    id,
    media,
    info,
    actions(event)
  );

  return row;
}

function renderSite() {
<<<<<<< HEAD
  // Compte uniquement les singles, pas les autres événements.
  const singles = tourEvents.filter(
    event => event.album === true
  );

  const released = singles.filter(
    event => event.released === true
  ).length;

  const count = document.querySelector('#count');

  if (count) {
    count.textContent = `${released} / ${singles.length}`;
  }
=======
  const singles = tourEvents.filter(event => event.album === true);
  const released = singles.filter(event => event.released === true).length;

  const count = document.querySelector('#count');
  if (count) count.textContent = `${released} / ${singles.length}`;
>>>>>>> e66739f6c16dd0459850c4586968116fc2409e72

  const blocks = document.querySelector('#blocks');
  if (blocks) {
<<<<<<< HEAD
    blocks.setAttribute(
      'aria-valuemax',
      String(singles.length)
    );

    blocks.setAttribute(
      'aria-valuenow',
      String(released)
    );

    blocks.style.gridTemplateColumns =
      `repeat(${Math.max(singles.length, 1)}, 1fr)`;

    blocks.replaceChildren(
      ...singles.map(event =>
        el('i', event.released ? 'on' : '')
      )
=======
    blocks.setAttribute('aria-valuemax', String(singles.length));
    blocks.setAttribute('aria-valuenow', String(released));
    blocks.style.gridTemplateColumns = `repeat(${singles.length}, 1fr)`;
    blocks.replaceChildren(
      ...singles.map(event => el('i', event.released ? 'on' : ''))
>>>>>>> e66739f6c16dd0459850c4586968116fc2409e72
    );
  }

  const albumLabel = document.querySelector('#album-label');
  if (albumLabel) {
    albumLabel.textContent =
      singles.length > 0 && released === singles.length
<<<<<<< HEAD
        ? 'ALL SINGLES RELEASED'
        : 'SINGLES LOADING';
=======
        ? 'ALBUM LOADED'
        : 'ALBUM LOADING';
>>>>>>> e66739f6c16dd0459850c4586968116fc2409e72
  }


  const albumContainer = document.querySelector('#album-link');

  if (albumContainer) {
    const albumLink = link(
      'LISTEN TO THE ALBUM',
      albumUrl
    );

    albumContainer.replaceChildren();

    if (albumLink) {
      albumContainer.append(albumLink);
    }
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
  document.addEventListener(
    'DOMContentLoaded',
    renderSite,
    { once: true }
  );
} else {
  renderSite();
}