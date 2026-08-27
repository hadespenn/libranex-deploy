import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['zh-CN', 'zh-TW', 'en'] as const;
type Locale = (typeof locales)[number];
type LocaleParams = Promise<{ locale: string }>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: LocaleParams;
}): Promise<Metadata> {
  const { locale } = await params;
  const titleMap: Record<Locale, string> = {
    'zh-CN': 'Libranex — 合规全球支付',
    'zh-TW': 'Libranex — 合規全球支付',
    en: 'Libranex — Compliant Global Payments',
  };

  if (!locales.includes(locale as Locale)) notFound();

  return { title: titleMap[locale as Locale] };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LocaleParams;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
