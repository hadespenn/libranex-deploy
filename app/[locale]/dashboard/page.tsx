import DashboardView from '@/components/DashboardView';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function DashboardPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);
  return <DashboardView />;
}
