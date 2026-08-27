import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['zh-CN', 'zh-TW', 'en'] as const;
type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  const messages = await (locale === 'zh-CN'
    ? import('../messages/zh-CN.json')
    : locale === 'zh-TW'
    ? import('../messages/zh-TW.json')
    : import('../messages/en.json'));

  return { messages: messages.default as any };
});
