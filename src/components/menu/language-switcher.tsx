"use client";

import { Locale } from "@/enum/locale";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type LanguageOption = {
  locale: string;
  label: string;
  flagSrc: string;
};

const languages: LanguageOption[] = [
  {
    locale: Locale.VI,
    label: "Tiếng Việt",
    flagSrc: "/flag/vietnam.png",
  },
  {
    locale: Locale.EN,
    label: "English",
    flagSrc: "/flag/united-states.png",
  },
  {
    locale: Locale.JP,
    label: "日本語",
    flagSrc: "/flag/japan.png",
  },
  {
    locale: Locale.KR,
    label: "한국어",
    flagSrc: "/flag/south-korea.png",
  },
  {
    locale: Locale.CN,
    label: "中文",
    flagSrc: "/flag/china.png",
  },
];

type Props = {
  currentLocale: string;
};

export function LanguageSwitcher({ currentLocale }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();

  const changeLanguage = (locale: string) => {
    router.push(
      {
        pathname: pathname.replace(currentLocale, locale),
        query: Object.fromEntries(query.entries()),
      },
      {
        locale: locale,
      }
    );
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
    transition: {
      duration: 1,
    },
  };

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-2 mb-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {languages.map((lang) => (
        <motion.div key={lang.locale} variants={item}>
          <Button
            variant={currentLocale === lang.locale ? "default" : "outline"}
            className="flex items-center gap-2 px-4 w-32 justify-center hover:bg-secondary hover:text-white"
            onClick={() => changeLanguage(lang.locale)}
          >
            <Image
              src={lang.flagSrc}
              alt={lang.label}
              width={20}
              height={20}
              className="rounded-sm"
            />
            <span>{lang.label}</span>
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
}
