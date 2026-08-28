import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['zh-CN', 'zh-TW', 'en'] as const;
type Locale = (typeof locales)[number];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const titleMap = {
    'zh-CN': 'Libranex — 合规全球支付',
    'zh-TW': 'Libranex — 合規全球支付',
    en: 'Libranex — Compliant Global Payments',
  } as const;
  return { title: titleMap[locale] };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
    >
      {children}
    </NextIntlClientProvider>
  );
}
