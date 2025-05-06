export interface SocialLink {
  name: 'X' | 'Discord' | 'Github' | 'Forum' | 'Youtube' | 'LinkedIn' | 'Facebook' | "Docs";
  url: string;
  icon: string;
  handle: string;
}

export interface MetaConfig {
  url: string;
  canonical?: string;
  name: string;
  title: string;
  description: string;
  themeColor: string;
  icons: {
    favicon: string;
    app: string;
    logo: string;
    mark: string;
  };
  og: {
    locale: string;
    type: 'website' | 'article';
    image: string;
    width: number;
    height: number;
  };
  twitterHandle: string;
  socials: SocialLink[];
  email: {
    support: string;
  };
}

export const meta: MetaConfig = {
  url: 'https://plebs.net',
  canonical: 'hhttps://plebs.net',
  name: 'Plebs',
  title: 'P9 Framework',
  description: 'Discover the P in Personality',
  themeColor: '#000000',
  icons: {
    favicon: '/favicon.ico',
    app: '/icon.svg',
    logo: '/logo.svg',
    mark: '/logomark.svg',
  },
  og: {
    locale: 'en-US',
    type: 'website',
    image: 'https://plebs.net/ogimage.png',
    width: 1200,
    height: 675,
  },
  twitterHandle: '@plebsnet',
  socials: [
    {
      name: "X",
      url: "https://x.com/plebsnet",
      icon: "@",
      handle: "plebsnet",
    },
    {
      name: "Discord",
      url: "https://discord.gg/vB5f5svsee",
      icon: "/",
      handle: "plebsnet",
    },
    {
      name: "Github",
      url: "https://github.com/plebsnet",
      icon: "@",
      handle: "plebsnet",
    },
    {
      name: "Youtube",
      url: "https://www.youtube.com/@plebsnet",
      icon: "@",
      handle: "plebsnet",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/plebsnet/",
      icon: "@",
      handle: "plebsnet",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/plebsnet/",
      icon: "@",
      handle: "plebsnet",
    },
  ],
  email: {
    support: 'support@plebs.net',
  },
}