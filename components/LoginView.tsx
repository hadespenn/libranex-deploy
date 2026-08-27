'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function LoginView() {
  const t = useTranslations();
  const params = useParams<{ locale: string }>();
  const router = useRouter();
  const locale = params.locale;
  const [show, setShow] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/${locale}/verify`);
  }

  return (
    <div className="lx-split">
      <aside className="lx-brand">
        <div className="lx-brand__logo">
          <img src="/libranex-logo.svg" alt="Libranex" />
          <div>
            <div className="lx-brand__name">{t('brand.name')}</div>
            <div className="lx-brand__slogan">{t('brand.slogan')}</div>
          </div>
        </div>

        <div className="lx-brand__copy">
          <div className="lx-brand__eyebrow">{t('brand.taglineTop')}</div>
          <h1 className="lx-brand__title">
            {t('brand.title1')}
            <br />
            <span className="accent">
              {t('brand.title2')}
              <br />
              {t('brand.title3')}
            </span>
          </h1>
          <p className="lx-brand__subtitle">{t('brand.subtitle')}</p>
        </div>

        <div className="lx-brand__metrics">
          <div className="lx-brand__metric">
            <strong>{t('brand.metrics.markets')}</strong>
            <span>{t('brand.metrics.marketsLabel')}</span>
          </div>
          <div className="lx-brand__metric">
            <strong>{t('brand.metrics.currencies')}</strong>
            <span>{t('brand.metrics.currenciesLabel')}</span>
          </div>
          <div className="lx-brand__metric">
            <strong>{t('brand.metrics.monitoring')}</strong>
            <span>{t('brand.metrics.monitoringLabel')}</span>
          </div>
        </div>
      </aside>

      <main className="lx-form-side">
        <section className="lx-card">
          <header className="lx-card__header">
            <div className="lx-card__brand">
              <img src="/libranex-logo.svg" alt="Libranex" />
              <span>Libranex</span>
            </div>
            <LanguageSwitcher />
          </header>

          <form className="lx-form" onSubmit={handleSubmit}>
            <h1>{t('login.welcomeBack')}</h1>
            <p className="lede">{t('login.subtitle')}</p>

            <div className="lx-field">
              <label htmlFor="email">{t('login.emailLabel')}</label>
              <input
                id="email"
                name="email"
                type="email"
                className="lx-input"
                defaultValue="finance@unitycentre.com"
                placeholder={t('login.emailPlaceholder')}
                autoComplete="email"
              />
            </div>

            <div className="lx-field">
              <label htmlFor="password">{t('login.passwordLabel')}</label>
              <div className="lx-input-wrap">
                <input
                  id="password"
                  name="password"
                  type={show ? 'text' : 'password'}
                  className="lx-input"
                  defaultValue="Libranex#2026"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle"
                  onClick={() => setShow((v) => !v)}
                >
                  {show ? t('login.hidePassword') : t('login.showPassword')}
                </button>
              </div>
            </div>

            <div className="lx-row">
              <label className="lx-check">
                <input type="checkbox" defaultChecked />
                <span>{t('login.remember')}</span>
              </label>
              <a href="#" className="lx-link">
                {t('login.forgot')}
              </a>
            </div>

            <button type="submit" className="lx-btn-primary">
              {t('login.submit')}
            </button>

            <div className="lx-divider">
              <span>{t('login.or')}</span>
            </div>

            <div className="lx-social">
              <button type="button">{t('login.google')}</button>
              <button type="button">{t('login.microsoft')}</button>
            </div>

            <p className="lx-foot">
              {t('login.noAccount')}
              <a href="#" className="lx-link">
                {' '}
                {t('login.register')}
              </a>
            </p>
            <p className="lx-staff">
              {t('login.staffPortal')}
              <a href="#" className="lx-link">
                {' '}
                {t('login.staffPortalLink')}
              </a>
            </p>
          </form>
        </section>
      </main>
    </div>
  );
}
