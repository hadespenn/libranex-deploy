'use client';

import { useTranslations } from 'next-intl';
import { FormEvent, useEffect, useRef, useState } from 'react';
import DashboardShell from './DashboardShell';

const CHANNELS = [
  { key: 'online', status: 'Active', statusKey: 'active' },
  { key: 'offline', status: 'Pilot', statusKey: 'pilot' },
  { key: 'subscription', status: 'Active', statusKey: 'active' },
  { key: 'stablecoin', status: 'Phase 3', statusKey: 'phase' },
] as const;

const BARS = [
  { key: 'card', height: 100 },
  { key: 'wallet', height: 78 },
  { key: 'bank', height: 60 },
  { key: 'qr', height: 46 },
  { key: 'ussd', height: 28 },
];

export default function GlobalView() {
  const t = useTranslations('global');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const amountRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!checkoutOpen) return;
    amountRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setCheckoutOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [checkoutOpen]);

  function openCheckout() {
    setError('');
    setCheckoutOpen(true);
  }

  function submitCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const amount = Number(String(data.get('amount') || '').replace(/,/g, ''));
    const callback = String(data.get('callback') || '');
    if (amount <= 0 || !Number.isFinite(amount)) {
      setError(t('checkout.errors.amount'));
      amountRef.current?.focus();
      return;
    }
    if (!/^https:\/\//i.test(callback)) {
      setError(t('checkout.errors.callback'));
      const callbackInput = event.currentTarget.elements.namedItem('callback');
      if (callbackInput instanceof HTMLInputElement) callbackInput.focus();
      return;
    }
    setCheckoutOpen(false);
    setNotice(t('checkout.success'));
    window.setTimeout(() => setNotice(''), 3200);
  }

  return (
    <DashboardShell
      active="global"
      headerTitle={t('header.title')}
      headerSubtitle={t('header.subtitle')}
    >
     
     
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0 0' }}>
        <div>
      <h2 className="lx-section-title">{t('hero.title')}</h2>
      <p className="lx-section-sub">{t('hero.subtitle')}</p>

       </div>
        <button className="lx-cta" type="button" style={{height: '40px'}} onClick={openCheckout}>{t('cta.create')}</button>
      </div>

      <div className="lx-global-row">
        {CHANNELS.map((c) => (
          <article key={c.key} className="lx-balance-card lx-panel">
            <div className="lx-balance-card__head"><span>{t(`channels.${c.key}.title`)}</span></div>
            <div className="lx-balance-card__sub">{t(`channels.${c.key}.desc`)}</div>
            <div className={`lx-balance-card__status ${c.statusKey}`}>
              <span className="led" />
              <span>{c.status}</span>
            </div>
          </article>
        ))}
      </div>
      <div className="lx-panel">
      <h2 className="lx-section-title" style={{ marginBottom: 28 }}>{t('insight.title')}</h2>
      <div className="lx-chart">
        {BARS.map((b) => (
          <div key={b.key} className="lx-chart__col">
            <div className="lx-chart__bar" style={{ height: `${b.height}%` }} />
            <p>{t(`insight.${b.key}`)}</p>
          </div>
        ))}
      </div>
      </div>
      {checkoutOpen && (
        <div className="lx-checkout-modal" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setCheckoutOpen(false);
        }}>
          <section className="lx-checkout-modal__panel" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
            <div className="lx-checkout-modal__head">
              <h2 id="checkout-title">{t('checkout.title')}</h2>
              <button type="button" className="lx-checkout-modal__close" aria-label={t('checkout.close')} onClick={() => setCheckoutOpen(false)}>×</button>
            </div>
            <form onSubmit={submitCheckout}>
              <div className="lx-checkout-form">
                <label>{t('checkout.amount')}<input ref={amountRef} name="amount" inputMode="decimal" defaultValue="125.50" /></label>
                <label>{t('checkout.currency')}<select name="currency" defaultValue="USD"><option>USD</option><option>SGD</option></select></label>
                <label>{t('checkout.callback')}<input name="callback" type="url" defaultValue="https://merchant.example/webhook" /></label>
                <label>{t('checkout.expiry')}<select name="expiry" defaultValue="24"><option value="24">{t('checkout.expiry24')}</option></select></label>
              </div>
              {error && <p className="lx-checkout-modal__error" role="alert">{error}</p>}
              <div className="lx-checkout-modal__actions">
                <button className="lx-cta" type="submit">{t('checkout.submit')}</button>
                <button className="lx-outline-btn" type="button" onClick={() => setCheckoutOpen(false)}>{t('checkout.cancel')}</button>
              </div>
            </form>
          </section>
        </div>
      )}
      {notice && <div className="lx-toast" role="status">{notice}</div>}
    </DashboardShell>
  );
}
