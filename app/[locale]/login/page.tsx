import LoginView from '@/components/LoginView';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function LoginPage({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);
  return <LoginView />;
}
