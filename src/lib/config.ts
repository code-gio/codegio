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
  /** Optional global blog author for article sidebar. */
  author: {
    name: 'Codegio',
    role: 'Product & Engineering',
    avatar: 'https://images.unsplash.com/photo-1669837401587-f9a4cfe3126e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80',
    url: 'https://x.com/codegio',
  },
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
