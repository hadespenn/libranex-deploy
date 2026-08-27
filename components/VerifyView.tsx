'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function VerifyView() {
  const t = useTranslations();
  const params = useParams<{ locale: string }>();
  const router = useRouter();
  const locale = params.locale;
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\D/g, '');
    e.target.value = value.slice(-1);
    if (e.target.value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/${locale}/dashboard`);
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

          <div className="lx-steps">
            <div className="lx-step done">
              <span className="lx-step__num">✓</span>
              <span>{t('verify.step1')}</span>
            </div>
            <span className="lx-step__bar" />
            <div className="lx-step active">
              <span className="lx-step__num">2</span>
              <span>{t('verify.step2')}</span>
            </div>
            <span className="lx-step__bar" />
            <div className="lx-step">
              <span className="lx-step__num">3</span>
              <span>{t('verify.step3')}</span>
            </div>
          </div>

          <form className="lx-form" onSubmit={handleSubmit}>
            <h1>{t('verify.title')}</h1>
            <p className="lede">{t('verify.subtitle')}</p>

            <div className="lx-otp">
              {['8', '2', '4', '1', '5', '9'].map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputsRef.current[i] = el;
                  }}
                  inputMode="numeric"
                  maxLength={1}
                  defaultValue={digit}
                  onChange={(e) => handleChange(i, e)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  aria-label={`OTP digit ${i + 1}`}
                />
              ))}
            </div>

            <div className="lx-warning">
              <span>🛡️</span>
              <span>{t('verify.warning')}</span>
            </div>

            <button type="submit" className="lx-btn-primary">
              {t('verify.submit')}
            </button>

            <div className="lx-secondary-row">
              <button type="button">{t('verify.resend')}</button>
              <button
                type="button"
                onClick={() => router.push(`/${locale}/login`)}
              >
                {t('verify.back')}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
