"use client";

import { useTranslations } from "next-intl";
import DashboardShell from "./DashboardShell";

const TABS = [
  "accounts",
  "topup",
  "internal",
  "external",
  "limit",
  "va",
  "settlement",
  "safeguard",
  "wealth",
] as const;

const FIAT_CARDS = [
  { network: "ACH & Wire", amount: "$4.21M", meta: "USD · Active" },
  { network: "SEPA", amount: "€920K", meta: "EUR · Active" },
  { network: "FAST", amount: "S$1.48M", meta: "SGD · Active" },
] as const;

const FIAT_ROWS = [
  { cur: "USD", account: "8301 2245 6677", balance: "$4,210,320" },
  { cur: "EUR", account: "7301 9921 4421", balance: "€920,180" },
  { cur: "SGD", account: "4200 0100 9900", balance: "S$1,480,000" },
];

const CRYPTO_CARDS = [
  { network: "TRC20", amount: "680.4K", meta: "USDT · Screened" },
  { network: "ERC20", amount: "600K", meta: "USDC · Screened" },
] as const;

const CRYPTO_ROWS = [
  {
    asset: "USDT",
    wallet: "0x82F1…AA91",
    network: "TRON · TRC20",
    balance: "680,400.00 USDT",
    status: "Screened",
    statusKey: "ok" as const,
  },
  {
    asset: "USDC",
    wallet: "0x4A90…19C2",
    network: "Ethereum · ERC20",
    balance: "600,000.00 USDC",
    status: "OSL review",
    statusKey: "warn" as const,
  },
];

type IconClass = "lx-icon-tile--blue" | "lx-icon-tile--gold";

function Module({
  icon,
  iconClass,
  title,
  desc,
  action,
  cards,
  listTitle,
  children,
}: {
  icon: string;
  iconClass: IconClass;
  title: string;
  desc: string;
  action?: React.ReactNode;
  cards?: React.ReactNode;
  listTitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="lx-module">
      <header className="lx-module__head">
        <span className={`lx-icon-tile ${iconClass}`}>{icon}</span>
        <div className="lx-module__head-text">
          <h2 className="lx-section-head__title">{title}</h2>
          <p className="lx-section-head__desc">{desc}</p>
        </div>
        {action ? <div className="lx-module__head-action">{action}</div> : null}
      </header>
      {cards}
      {listTitle ? (
        <h3 className="lx-module__list-title">{listTitle}</h3>
      ) : null}
      {children}
    </section>
  );
}

export default function AccountsView() {
  const t = useTranslations("accounts");
  return (
    <DashboardShell
      active="accounts"
      headerTitle={t("header.title")}
      headerSubtitle={t("header.subtitle")}
    >
      {/* hero（隐藏：DashboardShell header 已显示标题） */}
      <h2 className="lx-section-title" style={{ display: "none" }}>
        {t("hero.title")}
      </h2>
      <p className="lx-section-sub" style={{ display: "none" }}>
        {t("hero.subtitle")}
      </p>

      {/* tabs row */}
      <div className="lx-tabs-row">
        <div className="lx-tabs">
          {TABS.map((k) => (
            <button
              key={k}
              type="button"
              className={`lx-pill ${k === "accounts" ? "lx-pill--active" : ""}`}
            >
              {t(`tabs.${k}`)}
            </button>
          ))}
        </div>
        <button className="lx-cta" type="button">
          {t("cta.create")}
        </button>
      </div>

      {/* ===== 资产总额估算概览卡 ===== */}
      <div className="lx-overview-card lx-overview-card--navy lx-overview-card--split">
        <div className="lx-overview-card__main">
          <div className="lx-overview-card__label lx-overview-card__label--light">
            {t("overview.label")}
          </div>
          <div className="lx-overview-card__title--light">
            {t("overview.title")}
          </div>
          <p
            className="lx-overview-card__disclaimer lx-overview-card__disclaimer--light"
            style={{ maxWidth: 520 }}
          >
            {t("overview.disclaimer")}
          </p>
        </div>
        <div className="lx-overview-card__right">
          <div className="lx-overview-card__unit--light">
            {t("overview.unit")}
          </div>
          <div className="lx-overview-card__value lx-overview-card__value--light">
            <span className="lx-overview-card__currency lx-overview-card__currency--light">
              $
            </span>
            8,420,680.24
          </div>
          <div className="lx-overview-card__side lx-overview-card__side--light">
            <strong>USD</strong>
          </div>
        </div>
      </div>

      {/* ===== 法币账户 Module ===== */}
      <Module
        icon="$"
        iconClass="lx-icon-tile--blue"
        title={t("fiat.title")}
        desc={t("fiat.subtitle")}
        action={
          <button className="lx-cta" type="button">
            {t("fiat.create")}
          </button>
        }
        cards={
          <div className="lx-balance-row--3 lx-module__cards">
            {FIAT_CARDS.map((c) => (
              <article key={c.network} className="lx-balance-card lx-panel">
                <div className="lx-balance-card__sub">{c.network}</div>
                <div className="lx-balance-card__amount">{c.amount}</div>
                <div className="lx-balance-account__status">
                  <span className="lx-led-dot lx-led-dot--ok" />
                  <span>{c.meta}</span>
                </div>
              </article>
            ))}
          </div>
        }
      >
        <div className="lx-table-card">
          <div className="">{t("fiatList.title")}</div>
          <div className="lx-table">
            <div className="lx-table__head lx-table__head--4">
              <span>{t("fiatList.col.currency")}</span>
              <span>{t("fiatList.col.account")}</span>
              <span>{t("fiatList.col.balance")}</span>
              <span>{t("fiatList.col.status")}</span>
            </div>
            {FIAT_ROWS.map((r) => (
              <div key={r.cur} className="lx-table__row lx-table__row--4">
                <span style={{ fontWeight: 600 }}>{r.cur}</span>
                <span>{r.account}</span>
                <span style={{ fontWeight: 600 }}>{r.balance}</span>
                <span>
                  <span className="lx-pill lx-pill--ok">
                    <span className="lx-led-dot lx-led-dot--ok" />
                    Active
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Module>

      {/* ===== 虚拟币账户 Module ===== */}
      <Module
        icon="₮"
        iconClass="lx-icon-tile--gold"
        title={t("virtual.title")}
        desc={t("virtual.subtitle")}
        action={
          <button className="lx-cta" type="button">
            {t("virtual.create")}
          </button>
        }
        cards={
          <>
            <div className="lx-warning-banner">{t("virtual.notice")}</div>
            <div className="lx-balance-row--2 lx-module__cards">
              {CRYPTO_CARDS.map((c) => (
                <article key={c.network} className="lx-balance-card lx-panel">
                  <div className="lx-balance-card__sub">{c.network}</div>
                  <div className="lx-balance-card__amount">{c.amount}</div>
                  <div className="lx-balance-card__status">
                    <span className="lx-led-dot lx-led-dot--ok" />
                    <span>{c.meta}</span>
                  </div>
                </article>
              ))}
            </div>
          </>
        }
      >
        <div className="lx-table-card">
          <div className="">{t("virtualList.title")}</div>
          <div className="lx-table">
            <div className="lx-table__head lx-table__head--5">
              <span>{t("virtualList.col.asset")}</span>
              <span>{t("virtualList.col.wallet")}</span>
              <span>{t("virtualList.col.network")}</span>
              <span>{t("virtualList.col.balance")}</span>
              <span>{t("virtualList.col.status")}</span>
            </div>
            {CRYPTO_ROWS.map((r) => (
              <div key={r.asset} className="lx-table__row lx-table__row--5">
                <span style={{ fontWeight: 600 }}>{r.asset}</span>
                <span
                  style={{
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, monospace",
                  }}
                >
                  {r.wallet}
                </span>
                <span>{r.network}</span>
                <span style={{ fontWeight: 600 }}>{r.balance}</span>
                <span>
                  <span
                    className={`lx-pill ${r.statusKey === "ok" ? "lx-pill--ok" : "lx-pill--warn"}`}
                  >
                    <span
                      className={`lx-led-dot ${r.statusKey === "ok" ? "lx-led-dot--ok" : "lx-led-dot--warn"}`}
                    />
                    {r.status}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Module>
    </DashboardShell>
  );
}
