import { setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';

export function generateStaticParams() {
  return [
    { locale: 'zh-CN' },
    { locale: 'zh-TW' },
    { locale: 'en' },
  ];
}

export default async function LocaleRootPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  redirect(`/${locale}/login`);
}