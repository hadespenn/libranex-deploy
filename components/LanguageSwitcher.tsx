'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const labels: Record<string, string> = {
  'zh-CN': '中文',
  'zh-TW': '繁體中文',
  en: 'English',
};

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const t = useTranslations('common');

  const current = pathname.split('/')[1] || 'zh-CN';

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    const segments = pathname.split('/');
    segments[1] = next;
    const newPath = segments.join('/') || '/';
    router.push(newPath);
  }

  return (
    <div className="lx-lang" aria-label={t('selectLanguage')}>
      <svg className="lx-globe" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
      <select value={current} onChange={onChange}>
        <option value="zh-CN">{labels['zh-CN']}</option>
        <option value="zh-TW">{labels['zh-TW']}</option>
        <option value="en">{labels['en']}</option>
      </select>
    </div>
  );
}
