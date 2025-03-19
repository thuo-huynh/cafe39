import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import localFont from "next/font/local";
import "./globals.css";

const raleway = localFont({
  src: "/fonts/Raleway.woff2",
  variable: "--font-raleway",
  weight: "100 900",
});
export const metadata: Metadata = {
  title: "Cafe 39",
  description: "This is menu of Cafe 39",
};

type Params = Promise<{ locale: string }>;

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const messages = await getMessages();
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className={`${raleway.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
