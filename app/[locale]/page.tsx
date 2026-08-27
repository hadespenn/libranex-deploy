import { redirect } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function LocaleRootPage({
  params,
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(params.locale);
  redirect(`/${params.locale}/login`);
}
