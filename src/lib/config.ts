import { dev } from '$app/environment';
import type { NavItem, SocialLink } from "$lib/types/nav";
import {
  IconLifebuoy,
  IconList,
  IconCreditCard,
  IconDashboard,
  IconUser,
  IconPackages,
  IconCards,
  IconWallet,
  IconTruck,
  IconUsers,
  IconAdjustments,
  IconCoin,
  IconChartLine,
  IconSettings,
  IconReceipt,
  IconFolder,
  IconSparkles,
} from "@tabler/icons-svelte";

export const siteConfig = {
  title: "Codegio",
  description: "Trusted by service businesses and operators around the world.",
  logo: "/logo.svg",
  logoDark: "/logo-dark.svg",
  favicon: "/favicon.svg",
  faviconDark: "/favicon.svg",
  ripToUsd: 1.0,
  /** Base URL for RSS and OG (no trailing slash). */
  url: dev ? 'http://localhost:5173' : 'https://codegio.com',
};

export const socialLinks: SocialLink[] = [
  {
    title: "Codegio",
    url: "https://x.com/codegio",
    icon: "twitter",
  },
];

export const publicNav: NavItem[] = [
  {
    title: "Blog",
    url: "/blog",
  },
];

export const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconDashboard,
  },


];


export const navSecondary: NavItem[] = [
  {
    title: "Support",
    url: "/support",
    icon: IconLifebuoy,
  },
  {
    title: "Roadmap",
    url: "/roadmap",
    icon: IconList,
  },
];

export const userNav = [
  {
    title: "Account",
    icon: IconUser,
    url: "/account",
  },
  {
    title: "Billing",
    icon: IconCreditCard,
    url: "/billing",
  },
];
