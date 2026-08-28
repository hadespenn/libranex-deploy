import VerifyView from '@/components/VerifyView';
import { setRequestLocale } from 'next-intl/server';

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <VerifyView />;
}
