import type { Facebook } from "lucide-react";

export const siteConfig = {
  name: 'BeHonor Studio',
  description: 'Creator of LogicCraft, Flick Wand, and ISS Tracker.',
  logo: undefined,
  ogImage: '/og-image.webp',
  primaryColor: '#00008B', // Default primary color
  search: {
    enabled: false,
  },
  announcement: {
    enabled: false,
    id: 'launch_v1', // Change this ID to reshow the banner
    link: '/changelog',
    localizeLink: true, // Set to true to apply i18n routing to the link, false for external/absolute links
  },
  blog: {
    postsPerPage: 6,
  },
  contact: {
    email: {
      support: 'beehonorstu@gmail.com',
    },
    phone: {
      main: '+1 (555) 123-4567',
      label: 'Mon-Fri 9am-6pm PST'
    },
    address: {
      city: 'Endurance',
      full: 'Interstellar Space Station'
    }
  },
  analytics: {
    alwaysLoad: false, // Set to true to bypass cookie consent check
    vendors: {
      googleAnalytics: {
        id: 'G-K9D7ESRZFV',
        enabled: true,
      },
      rybbit: {
        id: "your-site-id", // e.g. 'your-site-id'
        src: 'https://analytics.gladtek.cloud/api/script.js', // Default source
        enabled: false,
      },
      umami: {
        id: "your-website-id", // e.g. 'your-website-id'
        src: 'https://analytics.umami.is/script.js', // Default source
        enabled: false,
      },
      // Add other vendors here (e.g. Plausible, Fathom)
    },
  },
  dateOptions: {
    localeMapping: {
      'en': 'en-GB', // Example: Force UK English date format
    }
  }
};

export const NAV_LINKS = [
  {
    href: '/products',
    label: 'Products',
  },
  {
    href: '/about',
    label: 'About',
  },
  {
    href: '/contact',
    label: 'Contact',
  },
];

export const ACTION_LINKS = {
  primary: undefined,
  social: {
    twitter: '',
    linkedin: '',
    github: '',
    youtube: '',
    facebook: ''

  }
};

export const FOOTER_LINKS = {
  product: {
    title: 'Product',
    links: [
      { href: '/products', label: 'Products' },
      { href: '/about', label: 'About' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { href: '/privacy_policy', label: 'Privacy', localize: false },
      { href: '/terms', label: 'Terms', localize: false }
    ],
  },
};
