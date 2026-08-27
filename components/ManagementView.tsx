'use client';

import { useTranslations } from 'next-intl';
import DashboardShell from './DashboardShell';
import SettingsView from './SettingsView';
import ApprovalView from './ApprovalView';

type Section = 'approval' | 'developer' | 'settings';

const CONFIG = {
  approval: {
    active: 'approval',
    stats: ['pending', 'today', 'approved', 'rejected'],
    cards: ['payment', 'account', 'beneficiary'],
  },
  developer: {
    active: 'developer',
    stats: ['apiCalls', 'successRate', 'webhooks', 'keys'],
    cards: ['apiKeys', 'webhooks', 'logs'],
  },
  settings: {
    active: 'more',
    stats: ['members', 'roles', 'security', 'notifications'],
    cards: ['organization', 'members', 'security'],
  },
} as const;

export default function ManagementView({ section }: { section: Section }) {
  if (section === 'settings') return <SettingsView />;
  if (section === 'approval') return <ApprovalView />;
  const t = useTranslations(section);
  const config = CONFIG[section];

  return (
    <DashboardShell active={config.active} headerTitle={t('header.title')} headerSubtitle={t('header.subtitle')}>
      <div className="lx-management-hero">
        <div>
          <h2 className="lx-section-title">{t('hero.title')}</h2>
          <p className="lx-section-sub">{t('hero.subtitle')}</p>
        </div>
        <button className="lx-cta" type="button">{t('cta')}</button>
      </div>

      <div className="lx-management-stats">
        {config.stats.map((key) => (
          <article className="lx-panel lx-management-stat" key={key}>
            <span>{t(`stats.${key}.label`)}</span>
            <strong>{t(`stats.${key}.value`)}</strong>
            <small>{t(`stats.${key}.hint`)}</small>
          </article>
        ))}
      </div>

      <section className="lx-panel lx-management-section">
        <div className="lx-section-header">
          <div>
            <h2 className="lx-section-title">{t('section.title')}</h2>
            <p className="lx-section-sub">{t('section.subtitle')}</p>
          </div>
        </div>
        <div className="lx-management-cards">
          {config.cards.map((key) => (
            <article className="lx-management-card" key={key}>
              <div className="lx-management-card__icon">{t(`cards.${key}.icon`)}</div>
              <div>
                <h3>{t(`cards.${key}.title`)}</h3>
                <p>{t(`cards.${key}.description`)}</p>
                <button type="button">{t(`cards.${key}.action`)} →</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}