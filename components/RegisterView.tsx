'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function RegisterView() {
  const t = useTranslations();
  const { locale } = useParams<{ locale: string }>();
  const [show, setShow] = useState(false);

  return (
    <div className="lx-split">
      <aside className="lx-brand">
        <div className="lx-brand__logo"><img src="/libranex-logo.svg" alt="Libranex" /><div><div className="lx-brand__name">{t('brand.name')}</div><div className="lx-brand__slogan">{t('brand.slogan')}</div></div></div>
        <div className="lx-brand__copy"><div className="lx-brand__eyebrow">{t('brand.taglineTop')}</div><h1 className="lx-brand__title">{t('brand.title1')}<br /><span className="accent">{t('brand.title2')}<br />{t('brand.title3')}</span></h1><p className="lx-brand__subtitle">{t('brand.subtitle')}</p></div>
        <div className="lx-brand__metrics"><div className="lx-brand__metric"><strong>{t('brand.metrics.markets')}</strong><span>{t('brand.metrics.marketsLabel')}</span></div><div className="lx-brand__metric"><strong>{t('brand.metrics.currencies')}</strong><span>{t('brand.metrics.currenciesLabel')}</span></div><div className="lx-brand__metric"><strong>{t('brand.metrics.monitoring')}</strong><span>{t('brand.metrics.monitoringLabel')}</span></div></div>
      </aside>
      <main className="lx-form-side lx-register-side">
        <section className="lx-card lx-register-card">
          <header className="lx-card__header"><Link href={`/${locale}/login`} className="lx-card__brand"><img src="/libranex-logo.svg" alt="Libranex" /><span>Libranex</span></Link><LanguageSwitcher /></header>
          <form className="lx-form" onSubmit={(event) => event.preventDefault()}>
            <div className="lx-register-steps">{['account', 'access', 'kyc', 'review'].map((step, index) => <div className={index === 0 ? 'active' : ''} key={step}><b>{index + 1}</b><span>{t(`register.steps.${step}`)}</span></div>)}</div>
            <h1>{t('register.title')}</h1><p className="lede">{t('register.subtitle')}</p>
            <div className="lx-register-grid">
              <div className="lx-field"><label htmlFor="name">{t('register.name')}</label><input id="name" className="lx-input" defaultValue="Lin Manager" autoComplete="name" required /></div>
              <div className="lx-field"><label htmlFor="title">{t('register.jobTitle')}</label><input id="title" className="lx-input" defaultValue="Finance Director" autoComplete="organization-title" required /></div>
              <div className="lx-field"><label htmlFor="register-email">{t('register.email')}</label><input id="register-email" className="lx-input" type="email" defaultValue="finance@unitycentre.com" autoComplete="email" required /></div>
              <div className="lx-field"><label htmlFor="phone">{t('register.phone')}</label><div className="lx-phone"><select aria-label={t('register.countryCode')} defaultValue="+86"><option value="+86">🇨🇳 +86</option><option value="+852">🇭🇰 +852</option><option value="+853">🇲🇴 +853</option><option value="+65">🇸🇬 +65</option><option value="+1">🇺🇸 +1</option><option value="+44">🇬🇧 +44</option><option value="+61">🇦🇺 +61</option><option value="+81">🇯🇵 +81</option><option value="+971">🇦🇪 +971</option></select><input id="phone" className="lx-input" type="tel" defaultValue="138 0000 0000" autoComplete="tel-national" required /></div></div>
              <div className="lx-field"><label htmlFor="new-password">{t('register.password')}</label><div className="lx-input-wrap"><input id="new-password" className="lx-input" type={show ? 'text' : 'password'} defaultValue="Libranex2026" autoComplete="new-password" required /><button className="toggle" type="button" onClick={() => setShow(v => !v)}>{show ? t('login.hidePassword') : t('login.showPassword')}</button></div></div>
              <div className="lx-field"><label htmlFor="invite">{t('register.invite')}</label><input id="invite" className="lx-input" placeholder="INV-XXXX" autoComplete="off" /></div>
            </div>
            <label className="lx-register-agree"><input type="checkbox" defaultChecked required /><span>{t('register.agreement')}</span></label>
            <button className="lx-btn-primary" type="submit">{t('register.submit')}</button>
            <p className="lx-foot">{t('register.hasAccount')} <Link className="lx-link" href={`/${locale}/login`}>{t('register.login')}</Link></p>
          </form>
        </section>
      </main>
    </div>
  );
}