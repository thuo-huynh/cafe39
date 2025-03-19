"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOCALES, LOCALES_LABELS } from "@/constants/locale.constants";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LanguagesIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Logo from "../menu/logo";

type Props = {
  locale: string;
};

export default function Header({ locale }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();
  useEffect(() => {}, [pathname, router]);

  const changeLanguage = (language: string) => {
    router.push(
      {
        pathname: pathname.replace(locale, language),
        query: Object.fromEntries(query.entries()),
      },
      {
        locale: language,
      }
    );
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-6">
        <div className="flex items-center">
          <Logo className="text-lg md:text-2xl">Cafe39</Logo>
        </div>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="cursor-pointer">
                <LanguagesIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {LOCALES.map((language) => (
                <DropdownMenuCheckboxItem
                  className="cursor-pointer"
                  key={language}
                  checked={locale === language}
                  onClick={() => changeLanguage(language)}
                >
                  {LOCALES_LABELS[language]}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
