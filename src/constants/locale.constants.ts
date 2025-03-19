import { Locale } from "@/enum/locale";

export const LOCALES = [Locale.EN, Locale.JP, Locale.VI, Locale.KR];
export const LOCALES_LABELS = {
  [Locale.EN]: "English",
  [Locale.JP]: "Japanese",
  [Locale.VI]: "Vietnamese",
  [Locale.KR]: "Korean",
};
export const DEFAULT_LOCALE = Locale.VI;
