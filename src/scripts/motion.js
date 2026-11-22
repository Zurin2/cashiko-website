/**
 * Motion layer — one observer, one rAF loop, no dependencies.
 *
 * Everything here is optional polish: without JavaScript the `js` class is
 * never added, so the CSS leaves every element in its final state and the
 * page reads normally. Users who ask for reduced motion get the final state
 * immediately, including counters.
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

/* ── Stagger delays ────────────────────────────────────────────────
   Siblings inside a [data-stagger] container get an increasing delay so
   they arrive in reading order. Capped so long lists never crawl. */
for (const group of document.querySelectorAll('[data-stagger]')) {
  [...group.children].forEach((child, index) => {
    child.style.setProperty('--reveal-delay', `${Math.min(index, 8) * 70}ms`);
  });
}

/* ── Scroll reveal ───────────────────────────────────────────────── */
const revealables = document.querySelectorAll('[data-reveal], [data-stagger]');

if (!('IntersectionObserver' in window)) {
  revealables.forEach((node) => node.classList.add('is-in'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  revealables.forEach((node) => revealObserver.observe(node));
}

/* ── Counters ──────────────────────────────────────────────────────
   The final value is already in the HTML, so this only ever rewrites text
   that is about to be replaced by the same number. */
const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

const formatValue = (value, decimals) =>
  value.toLocaleString('en-PH', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

function countUp(node) {
  const target = Number(node.dataset.count);
  if (!Number.isFinite(target)) return;

  const decimals = Number(node.dataset.countDecimals ?? 0);
  const prefix = node.dataset.countPrefix ?? '';
  const suffix = node.dataset.countSuffix ?? '';
  const duration = Number(node.dataset.countDuration ?? 1100);

  if (reduceMotion.matches) {
    node.textContent = prefix + formatValue(target, decimals) + suffix;
    return;
  }

  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = target * easeOutExpo(progress);
    node.textContent = prefix + formatValue(value, decimals) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counters = document.querySelectorAll('[data-count]');
if ('IntersectionObserver' in window) {
  const countObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        countObserver.unobserve(entry.target);
        countUp(entry.target);
      }
    },
    { threshold: 0.4 },
  );
  counters.forEach((node) => countObserver.observe(node));
} else {
  counters.forEach((node) => {
    node.textContent =
      (node.dataset.countPrefix ?? '') +
      formatValue(Number(node.dataset.count), Number(node.dataset.countDecimals ?? 0)) +
      (node.dataset.countSuffix ?? '');
  });
}

/* ── Spotlight ─────────────────────────────────────────────────────
   Tracks the pointer across dark surfaces. One rAF per frame, not one
   style write per pointer event. */const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

if (finePointer.matches) {
  for (const zone of document.querySelectorAll('[data-spotlight]')) {
    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      zone.style.setProperty('--mx', `${x}px`);
      zone.style.setProperty('--my', `${y}px`);
    };

    zone.addEventListener('pointermove', (event) => {
      const rect = zone.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      if (!frame) frame = requestAnimationFrame(paint);
    });
  }
}

/* ── Header state ──────────────────────────────────────────────────
   The bar only earns a shadow once content is actually moving under it. */
const header = document.querySelector('.site-header');

if (header) {
  let queued = false;

  const syncHeader = () => {
    queued = false;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  window.addEventListener(
    'scroll',
    () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(syncHeader);
    },
    { passive: true },
  );

  syncHeader();
}
