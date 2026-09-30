import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_KEYWORDS = [
  'equity management',
  'cap table',
  'private markets',
  'investor management',
  'fundraising',
  'governance',
  'compliance',
  'ownership infrastructure',
  'cap table readiness',
];

interface PageMeta {
  title: string;
  description: string;
  keywords: string[];
}

const META_MAP: Record<string, PageMeta> = {
  '/': {
    title: 'Arcstone | Equity Management & Cap Table Platform',
    description:
      'Arcstone helps private companies manage ownership, coordinate investors, and administer the full lifecycle of their cap table from one platform — cap tables, investor workflows, governance, and reporting in a single ownership system.',
    keywords: [...BASE_KEYWORDS, 'equity management software', 'cap table software'],
  },
  '/platform': {
    title: 'Equity Management Platform | Arcstone',
    description:
      'Equity management, investor workflows, governance, and lifecycle administration on one data layer. The full ownership infrastructure for private companies.',
    keywords: [...BASE_KEYWORDS, 'platform', 'lifecycle administration', 'equity management software'],
  },
  '/start-ups': {
    title: 'Equity Management for Start-ups | Arcstone',
    description:
      'Manage your cap table, coordinate investors, and raise capital with control. Arcstone gives founders an investor-ready ownership system from day one.',
    keywords: [...BASE_KEYWORDS, 'startups', 'founders', 'seed funding', 'startup cap table'],
  },
  '/private-firms': {
    title: 'Revenue-Share & Profit-Share Financing | Arcstone',
    description:
      'Ownership, distributions, and structured participation for established private companies — keep control while modernizing how you manage and administer participation.',
    keywords: [...BASE_KEYWORDS, 'private firms', 'private equity', 'distributions', 'revenue share financing'],
  },
  '/raise-capital': {
    title: 'Raise Capital Without Losing Control | Arcstone',
    description:
      'Structured investor participation without unnecessary governance complexity. Run rounds, coordinate investors, and keep your ownership organized.',
    keywords: [...BASE_KEYWORDS, 'raise capital', 'fundraising', 'investors', 'founder-friendly fundraising'],
  },
  '/manage-ownership': {
    title: 'Cap Table & Ownership Management | Arcstone',
    description:
      'Cap tables, rights, documents, and investors in one live record. Keep your company organized, investor-ready, and easier to review.',
    keywords: [...BASE_KEYWORDS, 'ownership', 'cap table software', 'cap table management', 'stakeholders'],
  },
  '/manage-distributions': {
    title: 'Distributions, Governance & Reporting | Arcstone',
    description:
      'Post-raise administration, governance, and reporting. Track distributions, resolutions, and compliance deadlines from the same ownership record.',
    keywords: [...BASE_KEYWORDS, 'distributions', 'profit share', 'revenue share', 'governance', 'board resolutions'],
  },
  '/administer-investors': {
    title: 'Investor Administration & Onboarding | Arcstone',
    description:
      'Onboarding, records, updates, and lifecycle workflows in one place. Streamline investor administration, KYC, and communication.',
    keywords: [...BASE_KEYWORDS, 'investor administration', 'onboarding', 'investor KYC', 'investor portal'],
  },
  '/careers': {
    title: 'Careers | Arcstone',
    description: 'Join Arcstone and help build ownership infrastructure for private markets. Explore open roles.',
    keywords: [...BASE_KEYWORDS, 'careers', 'jobs'],
  },
  '/about-us': {
    title: 'About Arcstone | Mission & Team',
    description:
      'Learn about Arcstone\'s mission to bring ownership management, investor workflows, and lifecycle administration into one connected platform for private companies.',
    keywords: [...BASE_KEYWORDS, 'about', 'company', 'team'],
  },
  '/contact': {
    title: 'Contact | Arcstone',
    description: 'Get in touch with Arcstone for inquiries, partnerships, and platform demonstrations.',
    keywords: [...BASE_KEYWORDS, 'contact'],
  },
  '/waitlist': {
    title: 'Book a Demo | Arcstone',
    description:
      'Book a demo of Arcstone — equity management and ownership infrastructure for private companies. Platform launches September 2026.',
    keywords: [...BASE_KEYWORDS, 'book a demo', 'demo', 'waitlist'],
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Arcstone',
    description: 'How Arcstone collects, uses, and protects your data.',
    keywords: [...BASE_KEYWORDS, 'privacy'],
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | Arcstone',
    description: 'The terms governing the use of Arcstone services.',
    keywords: [...BASE_KEYWORDS, 'terms'],
  },
  '/cookie-policy': {
    title: 'Cookie Policy | Arcstone',
    description: 'How Arcstone uses cookies and similar technologies, and how you can manage your preferences.',
    keywords: [...BASE_KEYWORDS, 'cookies', 'cookie policy', 'privacy'],
  },
  '/legal-and-regulatory': {
    title: 'Legal & Regulatory | Arcstone',
    description: 'Arcstone legal and regulatory information.',
    keywords: [...BASE_KEYWORDS, 'legal', 'regulatory'],
  },
};

const FAQ_DATA: Record<string, { q: string; a: string }[]> = {
  '/raise-capital': [
    {
      q: 'Does raising through Arcstone mean giving investors control of my company?',
      a: 'No. Arcstone is built around structured economic participation rights. Investors can share in the company’s economic upside without receiving voting shares or board seats — unless you specifically choose to grant them.',
    },
    {
      q: 'How are investors verified before they participate?',
      a: 'Investors complete identity and eligibility checks during onboarding. KYC/AML workflows can be applied where required, and participation agreements are executed and stored against each investor record before they are added to the ownership record.',
    },
    {
      q: 'How does Arcstone find relevant investors and funding opportunities?',
      a: 'Arcstone scores and ranks live funding opportunities — funds, accelerators, grants, and competitions — against your company’s stage, sector, geography, and traction. Non-dilutive routes are flagged alongside equity ones.',
    },
    {
      q: 'What happens after the round closes?',
      a: 'The ownership record stays live. Investor updates, distribution tracking, transfer requests, and future rounds are all administered from the same place — so the cap table remains accurate over time.',
    },
  ],
  '/manage-ownership': [
    {
      q: 'Can I move my existing cap table into Arcstone?',
      a: 'Yes. Existing shareholders, share classes, rounds, and rights can be structured into the ownership record so you start from your current position rather than rebuilding history.',
    },
    {
      q: 'Is there a record of changes to ownership?',
      a: 'Every round, transfer, restructure, and corporate event is recorded with a complete and reviewable history, giving you a continuous audit trail of how ownership has evolved.',
    },
    {
      q: 'Can I model an exit or valuation scenario before it happens?',
      a: 'Yes. Run exit waterfalls and goal-seek scenarios directly against the live cap table — vested only, fully accelerated, or excluded — without touching a real record.',
    },
  ],
  '/administer-investors': [
    {
      q: 'How do investors complete onboarding?',
      a: 'Investors receive a secure, structured onboarding link. They submit identity information and documents, complete eligibility checks, and execute agreements — all captured in a consistent format and connected to their record.',
    },
    {
      q: 'Can I run KYC/AML checks?',
      a: 'Identity and eligibility checks are part of the onboarding workflow, and KYC/AML workflows can be applied where required before an investor is granted access to participation terms.',
    },
    {
      q: 'What does an investor see when they log in?',
      a: 'Each investor gets a live, read-only portal assembled directly from the ownership record: their holdings, transactions, participation rights, documents, and any updates or distribution notices — all in one place.',
    },
  ],
  '/manage-distributions': [
    {
      q: 'How are distribution entitlements calculated?',
      a: 'Entitlements are derived from each investor’s participation terms in the ownership record. Revenue-share, profit-share, dividend-like, and exit-based models are tracked at the investor level rather than calculated manually.',
    },
    {
      q: 'How are transfers and exits handled?',
      a: 'Transfers run through structured, eligibility-aware controls so participation rights only move when the conditions defined in the record are met. Exit events are recorded and reflected across positions.',
    },
    {
      q: 'How are board and shareholder decisions recorded?',
      a: 'Resolutions move through the platform with configurable approval thresholds — simple majority, supermajority, or unanimous — with notice periods and adoption status tracked end-to-end.',
    },
  ],
};

function normalizePath(path: string) {
  return path.replace(/\/$/, '') || '/';
}

export const SeoUpdater: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on every route change
    window.scrollTo(0, 0);

    const norm = normalizePath(pathname);
    const meta = META_MAP[norm] ?? {
      title: 'Arcstone | Equity Management & Cap Table Platform',
      description: 'Ownership infrastructure for private companies.',
      keywords: BASE_KEYWORDS,
    };

    document.title = meta.title;

    // Update meta description
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', meta.description);

    // Update meta keywords
    let kwTag = document.querySelector('meta[name="keywords"]');
    if (!kwTag) {
      kwTag = document.createElement('meta');
      kwTag.setAttribute('name', 'keywords');
      document.head.appendChild(kwTag);
    }
    kwTag.setAttribute('content', meta.keywords.join(', '));

    // Update canonical link
    const origin = window.location.origin || 'https://arcstone.one';
    const canonicalUrl = `${origin}${norm === '/' ? '' : norm}`;
    let canTag = document.querySelector('link[rel="canonical"]');
    if (!canTag) {
      canTag = document.createElement('link');
      canTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canTag);
    }
    canTag.setAttribute('href', canonicalUrl);

    // Update OpenGraph & Twitter tags
    const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
      let tag = document.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', `${origin}/og-image.png`);
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);
    setMetaTag('name', 'twitter:image', `${origin}/og-image.png`);

    // Organization & WebSite JSON-LD
    const jsonLdData: Record<string, unknown>[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Arcstone',
        url: origin,
        logo: `${origin}/Logo.png`,
        description:
          'Equity management for private companies — cap tables, investor workflows, governance, and lifecycle administration in one ownership system.',
        slogan: 'Manage Reality',
        foundingDate: '2024',
        founders: [
          { '@type': 'Person', name: 'Messiah Gord', jobTitle: 'Co-founder and CEO' },
          { '@type': 'Person', name: 'Nima Najar', jobTitle: 'Co-founder and CTO' },
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'info@arcstone.one',
          contactType: 'customer service',
          url: `${origin}/contact`,
        },
        sameAs: ['https://www.linkedin.com/company/arc-stone'],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Arcstone',
        url: origin,
        description: meta.description,
        publisher: { '@type': 'Organization', name: 'Arcstone' },
      },
    ];

    if (norm !== '/') {
      jsonLdData.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: origin },
          { '@type': 'ListItem', position: 2, name: meta.title.split('|')[0].trim(), item: canonicalUrl },
        ],
      });
    }

    if (FAQ_DATA[norm]) {
      jsonLdData.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_DATA[norm].map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      });
    }

    let scriptTag = document.getElementById('arcstone-jsonld') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'arcstone-jsonld';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(jsonLdData);
  }, [pathname]);

  return null;
};
