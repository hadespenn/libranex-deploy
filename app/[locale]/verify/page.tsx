import VerifyView from '@/components/VerifyView';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function VerifyPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);
  return <VerifyView />;
}
