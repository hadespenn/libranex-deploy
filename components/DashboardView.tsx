"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import DashboardShell from "./DashboardShell";

type Currency = {
  key: "usd" | "eur" | "sgd" | "usdt" | "usdc";
  letter: string;
  letterBg: string;
  letterColor: string;
  pending?: boolean;
};

const CURRENCIES: readonly Currency[] = [
  { key: "usd", letter: "$", letterBg: "#2a5fe0", letterColor: "#fff" },
  { key: "eur", letter: "€", letterBg: "#0a2540", letterColor: "#fff" },
  { key: "sgd", letter: "S$", letterBg: "#7a4fff", letterColor: "#fff" },
  { key: "usdt", letter: "₮", letterBg: "#26a17b", letterColor: "#fff" },
  {
    key: "usdc",
    letter: "$",
    letterBg: "#2775ca",
    letterColor: "#fff",
    pending: true,
  },
];

type QuickIcon = "plus" | "upload" | "swap" | "link" | "users" | "pin";

const QUICK: { icon: QuickIcon; titleKey: string; descKey: string }[] = [
  { icon: "plus", titleKey: "topup", descKey: "topupDesc" },
  { icon: "upload", titleKey: "batch", descKey: "batchDesc" },
  { icon: "swap", titleKey: "swap", descKey: "swapDesc" },
  { icon: "link", titleKey: "link", descKey: "linkDesc" },
  { icon: "users", titleKey: "payee", descKey: "payeeDesc" },
  { icon: "pin", titleKey: "address", descKey: "addressDesc" },
];

function QuickIconSvg({ name }: { name: QuickIcon }) {
  const sw = 1.8;
  switch (name) {
    case "plus":
      return (
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth={sw}
          strokeLinecap="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "upload":
      return (
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth={sw}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 16V4M7 9l5-5 5 5" />
          <path d="M5 20h14" />
        </svg>
      );
    case "swap":
      return (
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth={sw}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 7h13l-3-3" />
          <path d="M20 17H7l3 3" />
        </svg>
      );
    case "link":
      return (
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth={sw}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 15a4 4 0 005.6 0l3-3a4 4 0 10-5.6-5.6l-1 1" />
          <path d="M15 9a4 4 0 00-5.6 0l-3 3a4 4 0 105.6 5.6l1-1" />
        </svg>
      );
    case "users":
      return (
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth={sw}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M16 20c0-2 1.5-3.5 4-3.5" />
        </svg>
      );
    case "pin":
      return (
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth={sw}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
  }
}

export default function DashboardView() {
  const tDash = useTranslations("dashboard");
  const params = useParams<{ locale: string }>();
  const locale = params.locale;

  return (
    <DashboardShell
      active="dashboard"
      headerTitle={tDash("header.title")}
      headerSubtitle={tDash("header.subtitle")}
    >
      {/* ===== 资金概览 ===== */}
      <div className="lx-section-header">
        <div>
          <h2 className="lx-section-label">{tDash("fundOverview.label")}</h2>
          <h2 className="lx-section-title">{tDash("fundOverview.title")}</h2>
          <p className="lx-section-sub">{tDash("fundOverview.subtitle")}</p>
        </div>
        <div className="lx-overview-card__side">
          <span className="lx-status-pill lx-status-pill--ok">
            <span className="lx-led-dot lx-led-dot--ok" />
            {tDash("fundOverview.updated")}
          </span>
        </div>
      </div>
      <div className="lx-overview-card lx-panel">
        <div className="lx-overview-card__main">
          <div className="lx-overview-card__label">
            {tDash("fundOverview.balance")}
          </div>
          <div className="lx-overview-card__value">
            <span className="lx-overview-card__currency">$</span>8,420,680.24
          </div>
          <p className="lx-overview-card__disclaimer">
            {tDash("fundOverview.disclaimer")}
          </p>
        </div>
        <div className="lx-overview-card__side">
          <span>{tDash("fundOverview.unit")}</span>
          <strong>{tDash("fundOverview.assetTypes")}</strong>
        </div>
      </div>

      {/* ===== 各币种余额 ===== */}
      <div className="lx-section-row">
        <div>
          <h2 className="lx-section-title">{tDash("balances.title")}</h2>
          <p className="lx-section-sub">{tDash("balances.subtitle")}</p>
        </div>
        <Link href={`/${locale}/accounts`} className="lx-link">
          {tDash("balances.viewAll")}
        </Link>
      </div>

      <div className="lx-currency-grid">
        {CURRENCIES.map((c) => (
          <article key={c.key} className="lx-currency-card">
            <div className="lx-currency-content">
              <div className="lx-currency-card__head">
                <div
                  className="lx-currency-card__icon"
                  style={{ background: c.letterBg, color: c.letterColor }}
                >
                  {c.letter}
                </div>
                <div className="lx-currency-title">
                  <span className="lx-currency-card__name">
                    {tDash(`balances.currencies.${c.key}.name`)}
                  </span>
                  <span className="lx-currency-card__fullName">
                    {tDash(`balances.currencies.${c.key}.fullName`)}
                  </span>
                </div>
              </div>
              <div className="lx-currency-card__row">
                <span
                  className={`lx-currency-card__status ${
                    c.pending ? "lx-currency-card__status--warn" : ""
                  }`}
                >
                  <span
                    className={`lx-led-dot ${
                      c.pending ? "lx-led-dot--warn" : "lx-led-dot--ok"
                    }`}
                  />
                  {c.pending
                    ? tDash("balances.pending")
                    : tDash("balances.available")}
                </span>
              </div>
            </div>
            <div className="lx-currency-card__amount">
              {tDash(`balances.amount.${c.key}`)}
            </div>
            <div className="lx-currency-card__equiv">
              {tDash(`balances.equiv.${c.key}`)}
            </div>

            <Link href={`/${locale}/accounts`} className="lx-btn-outline">
              {c.pending
                ? tDash("balances.viewCrypto")
                : tDash("balances.viewLedger")}
            </Link>
          </article>
        ))}
      </div>

      {/* ===== 常用功能 ===== */}
      <div className="lx-quick-content">
        <h2 className="lx-section-title">{tDash("quickSection.title")}</h2>
        <p className="lx-section-sub">{tDash("quickSection.subtitle")}</p>

        <div className="lx-quick-grid">
          {QUICK.map((q) => (
            <article key={q.icon} className="lx-quick-card">
              <span className="lx-quick-card__icon">
                <QuickIconSvg name={q.icon} />
              </span>
              <strong>{tDash(`quick.${q.titleKey}`)}</strong>
              <span>{tDash(`quick.${q.descKey}`)}</span>
            </article>
          ))}
        </div>
      </div>
      <footer className="lx-dashboard-footer">{tDash("footer")}</footer>
    </DashboardShell>
  );
}
