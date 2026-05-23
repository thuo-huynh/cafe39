import type { Locale } from '@/i18n';

export type LocalizedStrings = Partial<Record<Locale, string>> & { en: string };

export interface MenuItem {
  id: string;
  price: number;
  img: string;
  names: LocalizedStrings;
  notes?: { en?: string } & Partial<Record<Locale, string>>;
  badge?: string;
  highlight?: string;
}

export interface MenuCategory {
  id: string;
  icon: string;
  items: MenuItem[];
}

export interface MenuData {
  categories: MenuCategory[];
}

export interface Review {
  name: string;
  stars: number;
  date: string;
  body: LocalizedStrings;
}

export interface Friend {
  id: string;
  flag: string;
  name: string;
  date: string;
  placeholder: string;
  img?: string;
}
