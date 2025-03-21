import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/layout/header";
import { Metadata } from "next";

type Params = Promise<{ locale: string }>;

export const metadata: Metadata = {
  title: "Cafe 39",
  description: "This is menu of Cafe 39",
  keywords: ["Cafe 39"],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const messages = await getMessages();
  const { locale } = await params;

  return (
    <NextIntlClientProvider messages={messages}>
      <NextTopLoader showSpinner={false} />
      <Header locale={locale} />
      <div className="w-full p-2">{children}</div>
      <Toaster position="top-right" />
    </NextIntlClientProvider>
  );
}
