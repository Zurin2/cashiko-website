/**
 * Single source of truth for marketing-site copy that points outward.
 * Change a URL or an address here and every page follows.
 *
 * TODO before launch (tracked in README): confirm `appUrl`, `email` and the
 * legal entity name with the founding team.
 */
export const SITE = {
  name: 'CashIko',
  legalName: 'CashIko',
  tagline: 'The business companion for Pinoy microbusinesses',
  description:
    'CashIko turns a sari-sari store notebook into a clear daily picture: stock, sales, utang, expenses, and the real profit left at the end of the day.',
  url: 'https://cashiko.ph',
  appUrl: 'https://app.cashiko.ph',
  email: 'hello@cashiko.ph',
  locale: 'en_PH',
  country: 'PH',
  founded: '2026',
};

export const NAV = [
  { label: 'Features', href: '/features/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'For sari-sari stores', href: '/for-sari-sari-stores/' },
  { label: 'About', href: '/about/' },
  { label: 'FAQ', href: '/faq/' },
];

export const FOOTER_NAV = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features/' },
      { label: 'Pricing', href: '/pricing/' },
      { label: 'For sari-sari stores', href: '/for-sari-sari-stores/' },
      { label: 'Frequently asked questions', href: '/faq/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About CashIko', href: '/about/' },
      { label: 'Contact', href: '/contact/' },
      { label: 'Start a free trial', href: SITE.appUrl },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/privacy/' },
      { label: 'Terms of service', href: '/terms/' },
    ],
  },
];

export const LEGAL_UPDATED = '21 November 2026';
