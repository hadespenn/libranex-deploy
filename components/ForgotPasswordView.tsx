'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function ForgotPasswordView() {
  const t = useTranslations();
  const { locale } = useParams<{ locale: string }>();
  const [email, setEmail] = useState('finance@unitycentre.com');
  const [sent, setSent] = useState(false);

  return (
    <div className="lx-split">
      <aside className="lx-brand">
        <div className="lx-brand__logo"><img src="/libranex-logo.svg" alt="Libranex" /><div><div className="lx-brand__name">{t('brand.name')}</div><div className="lx-brand__slogan">{t('brand.slogan')}</div></div></div>
        <div className="lx-brand__copy"><div className="lx-brand__eyebrow">{t('brand.taglineTop')}</div><h1 className="lx-brand__title">{t('brand.title1')}<br /><span className="accent">{t('brand.title2')}<br />{t('brand.title3')}</span></h1><p className="lx-brand__subtitle">{t('brand.subtitle')}</p></div>
        <div className="lx-brand__metrics"><div className="lx-brand__metric"><strong>{t('brand.metrics.markets')}</strong><span>{t('brand.metrics.marketsLabel')}</span></div><div className="lx-brand__metric"><strong>{t('brand.metrics.currencies')}</strong><span>{t('brand.metrics.currenciesLabel')}</span></div><div className="lx-brand__metric"><strong>{t('brand.metrics.monitoring')}</strong><span>{t('brand.metrics.monitoringLabel')}</span></div></div>
      </aside>
      <main className="lx-form-side">
        <section className="lx-card">
          <header className="lx-card__header"><Link href={`/${locale}/login`} className="lx-card__brand"><img src="/libranex-logo.svg" alt="Libranex" /><span>Libranex</span></Link><LanguageSwitcher /></header>
          {sent ? (
            <div className="lx-reset-sent" role="status">
              <div className="lx-reset-sent__icon" aria-hidden="true">✉</div>
              <h1>{t('forgot.sentTitle')}</h1>
              <p>{t('forgot.sentDescription', { email })}</p>
              <Link href={`/${locale}/login`} className="lx-reset-back">{t('forgot.back')}</Link>
            </div>
          ) : (
            <form className="lx-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
              <h1>{t('forgot.title')}</h1>
              <p className="lede">{t('forgot.subtitle')}</p>
              <div className="lx-field"><label htmlFor="reset-email">{t('forgot.email')}</label><input id="reset-email" className="lx-input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></div>
              <button className="lx-btn-primary" type="submit">{t('forgot.submit')}</button>
              <p className="lx-foot"><Link className="lx-link" href={`/${locale}/login`}>{t('forgot.back')}</Link></p>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}