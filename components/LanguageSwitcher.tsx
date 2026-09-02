'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const labels: Record<string, string> = {
  'zh-CN': '中文',
  'zh-TW': '繁體中文',
  en: 'English',
};

export default function LanguageSwitcher({
  value,
  onLocaleChange,
}: {
  value?: string;
  onLocaleChange?: (locale: string) => void;
} = {}) {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const t = useTranslations('common');

  const current = value || pathname.split('/')[1] || 'zh-CN';

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    if (onLocaleChange) {
      onLocaleChange(next);
      return;
    }
    const segments = pathname.split('/');
    segments[1] = next;
    const newPath = segments.join('/') || '/';
    router.push(newPath);
  }

  return (
    <div className="lx-lang" aria-label={t('selectLanguage')}>
      🌐 
      <select value={current} onChange={onChange}>
        <option value="zh-CN">{labels['zh-CN']}</option>
        <option value="zh-TW">{labels['zh-TW']}</option>
        <option value="en">{labels['en']}</option>
      </select>
    </div>
  );
}
