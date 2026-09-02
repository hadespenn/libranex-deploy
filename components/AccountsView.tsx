"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
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

const SUBPAGE: Record<string, string> = {
  accounts: "acct-overview",
  topup: "acct-topup",
  internal: "acct-transfer",
  external: "acct-bind",
  limit: "acct-limits",
  va: "acct-va",
  settlement: "acct-settlement",
  safeguard: "acct-safeguarding",
  wealth: "acct-investment",
};

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
    status: "statusScreened",
    statusKey: "ok" as const,
  },
  {
    asset: "USDC",
    wallet: "0x4A90…19C2",
    network: "Ethereum · ERC20",
    balance: "600,000.00 USDC",
    status: "statusOslReview",
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
  const [createOpen, setCreateOpen] = useState(false);
  const [accountType, setAccountType] = useState<"fiat" | "crypto">("fiat");
  const [notice, setNotice] = useState("");
  const [activeTab, setActiveTab] = useState<string>("accounts");
  const [topupMethod, setTopupMethod] = useState<"fiat" | "crypto">("fiat");

  const openCreate = (type: "fiat" | "crypto" = "fiat") => {
    setAccountType(type);
    setCreateOpen(true);
  };

  const submitCreate = () => {
    setCreateOpen(false);
    setNotice(
      t(
        accountType === "fiat"
          ? "createModal.fiat.success"
          : "createModal.crypto.success",
      ),
    );
  };

  return (
    <DashboardShell
      active="accounts"
      headerTitle={t("header.title")}
      headerSubtitle={t("header.subtitle")}
      toast={notice}
    >
      {/* hero（隐藏：DashboardShell header 已显示标题） */}
      <div className="lx-section-header">
        <div>
      <h2 className="lx-section-title">
        {t("hero.title")}
      </h2>
      <p className="lx-section-sub">
        {t("hero.subtitle")}
      </p>
      </div>
       <button className="lx-cta" type="button" onClick={() => openCreate()}>
          {t("cta.create")}
        </button>
</div>
      {/* tabs row */}
      <div className="lx-tabs-row">
        <div className="lx-tabs">
          {TABS.map((k) => (
            <button
              key={k}
              type="button"
              className={`lx-pill ${k === activeTab ? "lx-pill--active" : ""}`}
              onClick={() => setActiveTab(k)}
            >
              {t(`tabs.${k}`)}
            </button>
          ))}
        </div>
       
      </div>

      {/* ===== 账户总览（accounts）===== */}
      <div
        className={`subpage ${activeTab === "accounts" ? "active" : ""}`}
        id="acct-overview"
      >
        {/* 资产总额估算概览卡 */}
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

        {/* 法币账户 Module */}
        <Module
          icon="$"
          iconClass="lx-icon-tile--blue"
          title={t("fiat.title")}
          desc={t("fiat.subtitle")}
          action={
            <button
              className="lx-cta"
              type="button"
              onClick={() => openCreate("fiat")}
            >
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
            <h3 className="">{t("fiatList.title")}</h3>
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

        {/* 虚拟币账户 Module */}
        <Module
          icon="₮"
          iconClass="lx-icon-tile--gold"
          title={t("virtual.title")}
          desc={t("virtual.subtitle")}
          action={
            <button
              className="lx-cta"
              type="button"
              onClick={() => openCreate("crypto")}
            >
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
                      {/* <span className="lx-led-dot lx-led-dot--ok" /> */}
                      <span>{c.meta}</span>
                    </div>
                  </article>
                ))}
              </div>
            </>
          }
        >
          <div className="lx-table-card">
            <h3 className="">{t("virtualList.title")}</h3>
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
                      {t(`i18n.${r.status}`)}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Module>
      </div>

      {/* ===== 充值 / 入金（topup）===== */}
      <div
        className={`subpage ${activeTab === "topup" ? "active" : ""}`}
        id="acct-topup"
      >
        <div className="panel">
          <div className="section-head">
            <div>
              <h2>{t("i18n.topupTab")}</h2>
              <p>{t("i18n.topupDesc")}</p>
            </div>
            <span className="status ok">{t("i18n.topupSecure")}</span>
          </div>
          <div className="topup-choice">
            <button
              type="button"
              className={`topup-choice-btn ${topupMethod === "fiat" ? "active" : ""}`}
              onClick={() => setTopupMethod("fiat")}
            >
              <span className="topup-choice-icon">¥</span>
              <b>{t("i18n.fiatTopup")}</b>
              <small>{t("i18n.fiatTopupDesc")}</small>
            </button>
            <button
              type="button"
              className={`topup-choice-btn ${topupMethod === "crypto" ? "active" : ""}`}
              onClick={() => setTopupMethod("crypto")}
            >
              <span className="topup-choice-icon">₿</span>
              <b>{t("i18n.cryptoTopup")}</b>
              <small>{t("i18n.cryptoTopupDesc")}</small>
            </button>
          </div>

          {/* 法币充值表单 */}
          <div
            className={`topup-form ${topupMethod === "fiat" ? "active" : ""}`}
          >
            <div className="form-grid">
              <div className="field">
                <label>{t("i18n.creditAccount")}</label>
                <select defaultValue="USD · 8301 2245 6677">
                  <option>USD · 8301 2245 6677</option>
                  <option>EUR · 7301 9921 4421</option>
                  <option>SGD · 4200 0100 9900</option>
                </select>
              </div>
              <div className="field">
                <label>{t("i18n.topupAmount")}</label>
                <input defaultValue="25,000" />
              </div>
              <div className="field">
                <label>{t("i18n.topupCurrency")}</label>
                <select defaultValue="USD">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>SGD</option>
                  <option>HKD</option>
                </select>
              </div>
              <div className="field">
                <label>{t("i18n.sourceBank")}</label>
                <input defaultValue="DBS Bank · ****2291" />
              </div>
              <div className="field">
                <label>{t("i18n.senderName")}</label>
                <input defaultValue="Unity Centre Investment Ltd." />
              </div>
              <div className="field">
                <label>{t("i18n.fiatReference")}</label>
                <input defaultValue="LNX-TOPUP-20260731" />
              </div>
            </div>
            <div className="topup-instructions">
              <b>{t("i18n.fiatInstructionsTitle")}</b>
              <p>
                <span>{t("i18n.beneficiaryBank")}</span> · Libranex Treasury /
                DBS Singapore
              </p>
              <p>
                <span>{t("i18n.beneficiaryAccount")}</span> · 8301 2245 6677
              </p>
              <p>
                <span>{t("i18n.bankReference")}</span> · LNX-TOPUP-20260731
              </p>
              <button className="ghost mini" type="button">
                {t("i18n.copyInstructions")}
              </button>
            </div>
            <div className="actions">
              <button className="lx-cta" type="button">
                {t("i18n.submitTopup")}
              </button>
              <button className="ghost" type="button">
                {t("i18n.viewTopupRecords")}
              </button>
            </div>
          </div>

          {/* Crypto 充值表单 */}
          <div
            className={`topup-form ${topupMethod === "crypto" ? "active" : ""}`}
          >
            <div className="form-grid">
              <div className="field">
                <label>{t("i18n.creditAccount")}</label>
                <select defaultValue="USDT · 0x82F1...AA91">
                  <option>USDT · 0x82F1...AA91</option>
                  <option>USDC · 0x4A90...19C2</option>
                </select>
              </div>
              <div className="field">
                <label>{t("i18n.cryptoAsset")}</label>
                <select defaultValue="USDT">
                  <option>USDT</option>
                  <option>USDC</option>
                </select>
              </div>
              <div className="field">
                <label>{t("i18n.cryptoNetwork")}</label>
                <select defaultValue="TRON · TRC20">
                  <option>TRON · TRC20</option>
                  <option>Ethereum · ERC20</option>
                  <option>Polygon</option>
                </select>
              </div>
              <div className="field">
                <label>{t("i18n.topupAmount")}</label>
                <input defaultValue="10,000" />
              </div>
            </div>
            <div className="crypto-deposit-notice">
              <b>{t("i18n.cryptoDepositWarning")}</b>
              <p>{t("i18n.cryptoDepositWarningDesc")}</p>
            </div>
            <div className="crypto-address-box crypto-topup-address">
              <span className="lock">▣</span>
              <b>{t("i18n.cryptoGenerateAddress")}</b>
            </div>
            <div className="actions">
              <button className="lx-cta" type="button">
                {t("i18n.generateTopupAddress")}
              </button>
              <button className="ghost" type="button">
                {t("i18n.viewTopupRecords")}
              </button>
            </div>
          </div>

          <div className="panel" style={{ marginTop: 16 }}>
            <div className="section-head">
              <div>
                <h2>{t("i18n.topupHistory")}</h2>
                <p>{t("i18n.topupHistoryDesc")}</p>
              </div>
              <span className="status warn">{t("i18n.topupStatus")}</span>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>{t("i18n.vaRef")}</th>
                  <th>{t("i18n.colCurrencyAmount")}</th>
                  <th>{t("i18n.colChannel")}</th>
                  <th>{t("i18n.vaStatus")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>TOPUP-20260731-01</td>
                  <td>USD 25,000</td>
                  <td>DBS Bank</td>
                  <td>
                    <span className="status ok">
                      {t("i18n.statusCredited")}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>TOPUP-20260730-14</td>
                  <td>USDT 10,000</td>
                  <td>TRON · TRC20</td>
                  <td>
                    <span className="status warn">
                      {t("i18n.topupConfirming")}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ===== 内部划转（internal）===== */}
      <div
        className={`subpage ${activeTab === "internal" ? "active" : ""}`}
        id="acct-transfer"
      >
        <div className="grid two">
          <div className="panel">
            <h2>{t("i18n.internalTransfer")}</h2>
            <div className="form-grid">
              <div className="field">
                <label>{t("i18n.fromAccount")}</label>
                <select defaultValue="USD · 8301 2245 6677">
                  <option>USD · 8301 2245 6677</option>
                  <option>EUR · 7301 9921 4421</option>
                </select>
              </div>
              <div className="field">
                <label>{t("i18n.toAccount")}</label>
                <select defaultValue="SGD · 4200 0100 9900">
                  <option>SGD · 4200 0100 9900</option>
                  <option>HKD · 6210 8821 0033</option>
                </select>
              </div>
              <div className="field">
                <label>{t("i18n.amount")}</label>
                <input defaultValue="25000" />
              </div>
              <div className="field">
                <label>{t("i18n.purpose")}</label>
                <input placeholder={t("i18n.transferPurposePh")} />
              </div>
            </div>
            <div className="actions">
              <button className="lx-cta" type="button">
                {t("i18n.confirmTransfer")}
              </button>
              <button className="ghost" type="button">
                {t("i18n.saveBeneficiary")}
              </button>
            </div>
          </div>
          <div className="panel">
            <h2>{t("i18n.ledgerSync")}</h2>
            <div className="timeline">
              <div className="step done">
                <b>1</b>
                <div>
                  <h4>{t("i18n.verifyBalance")}</h4>
                  <p>Passed · 0.13s</p>
                </div>
              </div>
              <div className="step done">
                <b>2</b>
                <div>
                  <h4>{t("i18n.riskCheck")}</h4>
                  <p>2FA required for high risk actions</p>
                </div>
              </div>
              <div className="step">
                <b>3</b>
                <div>
                  <h4>{t("i18n.syncLedger")}</h4>
                  <p>Pending confirmation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 外部账户绑定（external）===== */}
      <div
        className={`subpage ${activeTab === "external" ? "active" : ""}`}
        id="acct-bind"
      >
        <div className="grid three">
          <div className="card">
            <h3>{t("i18n.bankBinding")}</h3>
            <p>{t("i18n.bankBindingDesc")}</p>
            <span className="status ok">{t("i18n.verified")}</span>
            <div className="actions">
              <button className="ghost mini" type="button">
                {t("i18n.bindNew")}
              </button>
            </div>
          </div>
          <div className="card">
            <h3>{t("i18n.walletBinding")}</h3>
            <p>{t("i18n.walletBindingDesc")}</p>
            <span className="status warn">{t("i18n.pendingAuth")}</span>
            <div className="actions">
              <button className="ghost mini" type="button">
                OAuth
              </button>
            </div>
          </div>
          <div className="card">
            <h3>{t("i18n.cryptoBinding")}</h3>
            <p>{t("i18n.cryptoBindingDesc")}</p>
            <span className="status gray">Phase 3</span>
            <div className="actions">
              <button className="ghost mini" type="button">
                {t("i18n.riskScan")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 交易限额（limit）===== */}
      <div
        className={`subpage ${activeTab === "limit" ? "active" : ""}`}
        id="acct-limits"
      >
        <div className="panel">
          <h2>{t("i18n.limitSettings")}</h2>
          <div className="form-grid">
            <div className="field">
              <label>{t("i18n.singleLimit")}</label>
              <input defaultValue="100,000 USD" />
            </div>
            <div className="field">
              <label>{t("i18n.dailyLimit")}</label>
              <input defaultValue="500,000 USD" />
            </div>
            <div className="field">
              <label>{t("i18n.monthlyLimit")}</label>
              <input defaultValue="5,000,000 USD" />
            </div>
            <div className="field">
              <label>{t("i18n.approvalRule")}</label>
              <select defaultValue="rule">
                <option value="rule">
                  ≥ 50,000 USD requires admin approval
                </option>
              </select>
            </div>
          </div>
          <div className="actions">
            <button className="lx-cta" type="button">
              {t("i18n.saveLimits")}
            </button>
          </div>
        </div>
      </div>

      {/* ===== VA / Collection（va）===== */}
      <div
        className={`subpage ${activeTab === "va" ? "active" : ""}`}
        id="acct-va"
      >
        <div className="account-board-summary panel">
          <div>
            <p className="eyebrow">{t("i18n.acctVa")}</p>
            <h2>{t("i18n.vaTitle")}</h2>
            <p>{t("i18n.vaDesc")}</p>
          </div>
          <div className="account-board-total">
            <small>{t("i18n.vaCount")}</small>
            <b>6</b>
            <span>{t("i18n.vaActive")}</span>
          </div>
        </div>

        <div className="account-board-section">
          <div className="account-board-section-head">
            <div>
              <h2>{t("i18n.vaList")}</h2>
              <p>{t("i18n.vaListDesc")}</p>
            </div>
            <button className="primary mini" type="button">
              {t("i18n.applyVa")}
            </button>
          </div>
          <div className="panel">
            <table className="table">
              <thead>
                <tr>
                  <th>{t("i18n.vaNo")}</th>
                  <th>{t("i18n.vaCur")}</th>
                  <th>{t("i18n.vaRegion")}</th>
                  <th>{t("i18n.vaNet")}</th>
                  <th>{t("i18n.purpose")}</th>
                  <th>{t("i18n.vaProviderName")}</th>
                  <th>{t("i18n.vaStatus")}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>VA-USD-8821</td>
                  <td>USD</td>
                  <td>Singapore</td>
                  <td>Local</td>
                  <td>{t("i18n.vaUseCollection")}</td>
                  <td>VA-PRO-01</td>
                  <td>
                    <span className="status ok">{t("i18n.statusActive")}</span>
                  </td>
                  <td>
                    <button className="ghost mini" type="button">
                      {t("i18n.vaManage")}
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>VA-EUR-4410</td>
                  <td>EUR</td>
                  <td>Germany</td>
                  <td>SEPA</td>
                  <td>{t("i18n.vaUseSettle")}</td>
                  <td>VA-PRO-02</td>
                  <td>
                    <span className="status ok">{t("i18n.statusActive")}</span>
                  </td>
                  <td>
                    <button className="ghost mini" type="button">
                      {t("i18n.vaManage")}
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>VA-SGD-1193</td>
                  <td>SGD</td>
                  <td>Singapore</td>
                  <td>Local</td>
                  <td>{t("i18n.vaUseCollection")}</td>
                  <td>VA-PRO-01</td>
                  <td>
                    <span className="status warn">
                      {t("i18n.statusPaused")}
                    </span>
                  </td>
                  <td>
                    <button className="ghost mini" type="button">
                      {t("i18n.vaManage")}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid two">
          <div className="panel">
            <div className="section-head">
              <div>
                <h2>{t("i18n.vaInbound")}</h2>
                <p>{t("i18n.vaInboundDesc")}</p>
              </div>
              <span className="status warn">{t("i18n.vaPending")}</span>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>{t("i18n.vaRef")}</th>
                  <th>{t("i18n.amount")}</th>
                  <th>{t("i18n.vaPayer")}</th>
                  <th>{t("i18n.vaMatch")}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>INV-2041</td>
                  <td>USD 12,800</td>
                  <td>Acme Trading</td>
                  <td>
                    <span className="status warn">
                      {t("i18n.statusPending")}
                    </span>
                  </td>
                  <td>
                    <button className="ghost mini" type="button">
                      {t("i18n.vaManualMatch")}
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>INV-2042</td>
                  <td>EUR 9,400</td>
                  <td>Berlin GmbH</td>
                  <td>
                    <span className="status bad">
                      {t("i18n.statusUnmatched")}
                    </span>
                  </td>
                  <td>
                    <button className="ghost mini" type="button">
                      {t("i18n.vaReturn")}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="actions">
              <button className="ghost" type="button">
                {t("i18n.vaManualMatch")}
              </button>
              <button className="ghost" type="button">
                {t("i18n.vaReturn")}
              </button>
            </div>
          </div>
          <div className="panel">
            <div className="section-head">
              <div>
                <h2>{t("i18n.vaLifecycle")}</h2>
                <p>{t("i18n.vaLifecycleDesc")}</p>
              </div>
            </div>
            <div className="timeline">
              <div className="step done">
                <b>1</b>
                <div>
                  <h4>{t("i18n.vaStepApply")}</h4>
                  <p>{t("i18n.vaStepApplyDesc")}</p>
                </div>
              </div>
              <div className="step done">
                <b>2</b>
                <div>
                  <h4>{t("i18n.vaStepOpen")}</h4>
                  <p>{t("i18n.vaStepOpenDesc")}</p>
                </div>
              </div>
              <div className="step warn">
                <b>3</b>
                <div>
                  <h4>{t("i18n.vaActive")}</h4>
                  <p>{t("i18n.vaStepActiveDesc")}</p>
                </div>
              </div>
            </div>
            <div className="auth-note">{t("i18n.vaNote")}</div>
          </div>
        </div>

        <div className="account-board-section">
          <div className="account-board-section-head">
            <div>
              <h2>{t("i18n.vaManaged")}</h2>
              <p>{t("i18n.vaManagedDesc")}</p>
            </div>
            <button className="primary mini" type="button">
              {t("i18n.vaManagedCreate")}
            </button>
          </div>
          <div className="panel">
            <table className="table">
              <thead>
                <tr>
                  <th>{t("i18n.vaCustomer")}</th>
                  <th>{t("i18n.vaNo")}</th>
                  <th>{t("i18n.vaCur")}</th>
                  <th>{t("i18n.vaOwnership")}</th>
                  <th>{t("i18n.vaStatus")}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Shop A Pte.</td>
                  <td>VA-USD-5512</td>
                  <td>USD</td>
                  <td>{t("i18n.vaOwnDown")}</td>
                  <td>
                    <span className="status ok">{t("i18n.statusActive")}</span>
                  </td>
                  <td>
                    <button className="ghost mini" type="button">
                      {t("i18n.vaManage")}
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Supplier B</td>
                  <td>VA-EUR-7730</td>
                  <td>EUR</td>
                  <td>{t("i18n.vaOwnDown")}</td>
                  <td>
                    <span className="status ok">{t("i18n.statusActive")}</span>
                  </td>
                  <td>
                    <button className="ghost mini" type="button">
                      {t("i18n.vaManage")}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <div className="section-head">
            <div>
              <h2>{t("i18n.vaProvider")}</h2>
              <p>{t("i18n.vaProviderDesc")}</p>
            </div>
            <span className="status ok">{t("i18n.vaHealthy")}</span>
          </div>
          <div className="feature-matrix">
            <div className="feature">
              <b>{t("i18n.vaRoute")}</b>
              <small>VA-PRO-01 · 98.7% SLA</small>
            </div>
            <div className="feature">
              <b>{t("i18n.vaWebhook")}</b>
              <small>{t("i18n.vaWebhookDesc")}</small>
            </div>
            <div className="feature">
              <b>{t("i18n.vaRecon")}</b>
              <small>{t("i18n.vaReconDesc")}</small>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Settlement（settlement）===== */}
      <div
        className={`subpage ${activeTab === "settlement" ? "active" : ""}`}
        id="acct-settlement"
      >
        <div className="account-board-summary panel">
          <div>
            <p className="eyebrow">{t("i18n.stEyebrow")}</p>
            <h2>{t("i18n.stTitle")}</h2>
            <p>{t("i18n.stDesc")}</p>
          </div>
          <div className="account-board-total">
            <small>{t("i18n.stSummary")}</small>
            <b>$1,280,400.00</b>
            <span>USD</span>
          </div>
        </div>

        <div className="account-board-section">
          <div className="account-board-section-head">
            <div>
              <h2>{t("i18n.stBatch")}</h2>
              <p>{t("i18n.stBatchDesc")}</p>
            </div>
            <div className="auth-note">{t("i18n.merchantReleaseNote")}</div>
          </div>
          <div className="panel">
            <table className="table">
              <thead>
                <tr>
                  <th>{t("i18n.stBatchId")}</th>
                  <th>{t("i18n.stSource")}</th>
                  <th>{t("i18n.amount")}</th>
                  <th>{t("i18n.stDate")}</th>
                  <th>{t("i18n.vaStatus")}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>STL-20260811-01</td>
                  <td>VA Collection</td>
                  <td>USD 420,000</td>
                  <td>2026-08-11</td>
                  <td>
                    <span className="status ok">{t("i18n.statusSettled")}</span>
                  </td>
                  <td>
                    <button className="ghost mini" type="button">
                      {t("i18n.stViewBatch")}
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>STL-20260810-07</td>
                  <td>OSL Crypto</td>
                  <td>USD 180,500</td>
                  <td>2026-08-10</td>
                  <td>
                    <span className="status warn">
                      {t("i18n.statusPendingRelease")}
                    </span>
                  </td>
                  <td>
                    <button className="ghost mini" type="button">
                      {t("i18n.stViewBatch")}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid two">
          <div className="panel">
            <div className="section-head">
              <div>
                <h2>{t("i18n.stAllocate")}</h2>
                <p>{t("i18n.stAllocateDesc")}</p>
              </div>
            </div>
            <div className="feature-matrix">
              <div className="feature">
                <b>{t("i18n.stToPayment")}</b>
                <small>USD 260,000</small>
              </div>
              <div className="feature">
                <b>{t("i18n.stToSafe")}</b>
                <small>USD 80,000</small>
              </div>
              <div className="feature">
                <b>{t("i18n.stToDown")}</b>
                <small>USD 60,000</small>
              </div>
              <div className="feature">
                <b>{t("i18n.stToBank")}</b>
                <small>USD 120,000</small>
              </div>
            </div>
          </div>
          <div className="panel">
            <div className="section-head">
              <div>
                <h2>{t("i18n.stRecon")}</h2>
                <p>{t("i18n.stReconDesc")}</p>
              </div>
              <span className="status bad">1</span>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>{t("i18n.stDiffId")}</th>
                  <th>{t("i18n.amount")}</th>
                  <th>{t("i18n.vaStatus")}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>BRK-0092</td>
                  <td>USD 1,200</td>
                  <td>
                    <span className="status bad">{t("i18n.statusOpen")}</span>
                  </td>
                  <td>
                    <button className="ghost mini" type="button">
                      {t("i18n.stDiff")}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="auth-note">{t("i18n.stAudit")}</div>
          </div>
        </div>
      </div>

      {/* ===== Safeguarding（safeguard）===== */}
      <div
        className={`subpage ${activeTab === "safeguard" ? "active" : ""}`}
        id="acct-safeguarding"
      >
        <div className="account-board-summary panel">
          <div>
            <p className="eyebrow">{t("i18n.sgEyebrow")}</p>
            <h2>{t("i18n.sgTitle")}</h2>
            <p>{t("i18n.sgDesc")}</p>
          </div>
          <div className="account-board-total">
            <small>{t("i18n.sgIsolated")}</small>
            <b>$320,000.00</b>
            <span>USD</span>
          </div>
        </div>

        <div className="grid two">
          <div className="panel">
            <div className="section-head">
              <div>
                <h2>{t("i18n.sgInfo")}</h2>
                <p>{t("i18n.sgInfoDesc")}</p>
              </div>
              <span className="status ok">{t("i18n.sgLocked")}</span>
            </div>
            <div className="ops-data-list">
              <div className="ops-data">
                <small>{t("i18n.sgOwner")}</small>
                <b>Unity Centre Investment Ltd.</b>
              </div>
              <div className="ops-data">
                <small>{t("i18n.sgReason")}</small>
                <b>{t("i18n.sgReasonText")}</b>
              </div>
              <div className="ops-data">
                <small>{t("i18n.sgReleaseCond")}</small>
                <b>{t("i18n.sgReleaseCondText")}</b>
              </div>
            </div>
            <div className="actions">
              <div className="auth-note">{t("i18n.safeguardOpsNote")}</div>
              <button className="ghost" type="button">
                {t("i18n.sgControlledIn")}
              </button>
            </div>
          </div>
          <div className="panel">
            <div className="section-head">
              <div>
                <h2>{t("i18n.sgAuditLog")}</h2>
                <p>{t("i18n.sgAuditDesc")}</p>
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>{t("i18n.sgEvent")}</th>
                  <th>{t("i18n.sgActor")}</th>
                  <th>{t("i18n.stDate")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t("i18n.sgControlledIn")}</td>
                  <td>{t("i18n.systemActor")}</td>
                  <td>2026-08-09</td>
                </tr>
                <tr>
                  <td>{t("i18n.sgEvFreeze")}</td>
                  <td>Lin Manager</td>
                  <td>2026-08-09</td>
                </tr>
              </tbody>
            </table>
            <div className="auth-note">{t("i18n.sgNote")}</div>
          </div>
        </div>
      </div>

      {/* ===== 法币理财（wealth）===== */}
      <div
        className={`subpage ${activeTab === "wealth" ? "active" : ""}`}
        id="acct-investment"
      >
        <div className="account-board-summary panel">
          <div>
            <p className="eyebrow">{t("i18n.acctInvestment")}</p>
            <h2>{t("i18n.acctInvestment")}</h2>
            <p>{t("i18n.invDesc")}</p>
          </div>
          <div className="account-board-total">
            <small>{t("i18n.invInvested")}</small>
            <b>$540,000.00</b>
            <span>USD</span>
          </div>
        </div>

        <div className="grid two">
          <div className="panel">
            <div className="section-head">
              <div>
                <h2>{t("i18n.invFiat")}</h2>
                <p>{t("i18n.invFiatDesc")}</p>
              </div>
              <button className="primary mini" type="button">
                {t("i18n.invSubscribe")}
              </button>
            </div>
            <div className="ops-data-list">
              <div className="ops-data">
                <small>{t("i18n.invApr")}</small>
                <b>3.20%</b>
              </div>
              <div className="ops-data">
                <small>{t("i18n.invPrincipal")}</small>
                <b>$300,000</b>
              </div>
              <div className="ops-data">
                <small>{t("i18n.invEarn")}</small>
                <b>$2,400 / 30d</b>
              </div>
            </div>
          </div>
          <div className="panel">
            <div className="section-head">
              <div>
                <h2>{t("i18n.invFixed")}</h2>
                <p>{t("i18n.invFixedDesc")}</p>
              </div>
              <button className="primary mini" type="button">
                {t("i18n.invSubscribe")}
              </button>
            </div>
            <div className="ops-data-list">
              <div className="ops-data">
                <small>{t("i18n.invApr")}</small>
                <b>5.10%</b>
              </div>
              <div className="ops-data">
                <small>{t("i18n.invPrincipal")}</small>
                <b>$240,000</b>
              </div>
              <div className="ops-data">
                <small>{t("i18n.invTerm")}</small>
                <b>{t("i18n.ninetyDays")}</b>
              </div>
              <div className="ops-data">
                <small>{t("i18n.invMaturity")}</small>
                <b>2026-11-09</b>
              </div>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="section-head">
            <div>
              <h2>{t("i18n.invHoldings")}</h2>
              <p>{t("i18n.invHoldingsDesc")}</p>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>{t("i18n.invProduct")}</th>
                <th>{t("i18n.invPrincipal")}</th>
                <th>{t("i18n.invApr")}</th>
                <th>{t("i18n.invTerm")}</th>
                <th>{t("i18n.invMaturity")}</th>
                <th>{t("i18n.vaStatus")}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t("i18n.invFiat")}</td>
                <td>$300,000</td>
                <td>3.20%</td>
                <td>-</td>
                <td>-</td>
                <td>
                  <span className="status ok">{t("i18n.statusHolding")}</span>
                </td>
                <td>
                  <button className="ghost mini" type="button">
                    {t("i18n.invRedeemEarly")}
                  </button>
                </td>
              </tr>
              <tr>
                <td>{t("i18n.invFixed")}</td>
                <td>$240,000</td>
                <td>5.10%</td>
                <td>90d</td>
                <td>2026-11-09</td>
                <td>
                  <span className="status ok">{t("i18n.statusHolding")}</span>
                </td>
                <td>
                  <button className="ghost mini" type="button">
                    {t("i18n.invRedeemEarly")}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="auth-note">{t("i18n.invNote")}</div>
        </div>
      </div>

      {createOpen && (
        <div
          className="lx-checkout-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="account-create-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setCreateOpen(false);
          }}
        >
          <div className="lx-checkout-modal__panel lx-account-create-modal">
            <div className="lx-checkout-modal__head">
              <div>
                {/* <span className="lx-modal-eyebrow">ACCOUNT</span> */}
                <h2 id="account-create-title">{t("createModal.title")}</h2>
              </div>
              <button
                className="lx-checkout-modal__close"
                type="button"
                aria-label={t("createModal.close")}
                onClick={() => setCreateOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="lx-account-type-choice">
              {(["fiat", "crypto"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`lx-account-type ${accountType === type ? "lx-account-type--active" : ""}`}
                  onClick={() => setAccountType(type)}
                >
                  <strong>{t(`createModal.${type}.type`)}</strong>
                  <small>{t(`createModal.${type}.typeDesc`)}</small>
                </button>
              ))}
            </div>

            {accountType === "fiat" ? (
              <div className="lx-account-create-form">
                <div className="lx-checkout-form">
                  <label>
                    {t("createModal.currency")}
                    <select defaultValue="USD">
                      <option>USD</option>
                      <option>EUR</option>
                      <option>SGD</option>
                      <option>HKD</option>
                    </select>
                  </label>
                  <label>
                    {t("createModal.purpose")}
                    <input
                      defaultValue="Supplier settlement"
                      placeholder={t("createModal.purposePlaceholder")}
                    />
                  </label>
                </div>
                <div className="lx-account-create-note">
                  {t("createModal.fiat.notice")}
                </div>
                <label className="check-row">
                  <input type="checkbox" defaultChecked />
                  {t("createModal.fiat.consent")}
                </label>
                <div className="lx-checkout-modal__actions">
                  <button
                    className="lx-cta"
                    type="button"
                    onClick={submitCreate}
                  >
                    {t("fiat.create")}
                  </button>
                  <button
                    className="ghost"
                    type="button"
                    onClick={() => setCreateOpen(false)}
                  >
                    {t("createModal.cancel")}
                  </button>
                </div>
              </div>
            ) : (
              <div className="lx-account-create-form">
                <div className="lx-checkout-form">
                  <label>
                    {t("createModal.crypto.asset")}
                    <select defaultValue="USDT">
                      <option>USDT</option>
                      <option>USDC</option>
                    </select>
                  </label>
                  <label>
                    {t("createModal.crypto.network")}
                    <select defaultValue="TRON · TRC20">
                      <option>TRON · TRC20</option>
                      <option>Ethereum · ERC20</option>
                      <option>Polygon</option>
                    </select>
                  </label>
                  <label style={{ gridColumn: "1 / -1" }}>
                    {t("createModal.purpose")}
                    <input
                      placeholder={t("createModal.crypto.purposePlaceholder")}
                    />
                  </label>
                </div>
                <div className="lx-account-create-note">
                  <strong>{t("createModal.crypto.responsibilityTitle")}</strong>
                  <br />
                  {t("createModal.crypto.responsibility")}
                </div>
                <div className="lx-account-create-note">
                  <strong>{t("createModal.crypto.dataTitle")}</strong>
                  <br />
                  {t("createModal.crypto.dataConsent")}
                </div>
                <label className="check-row">
                  <input type="checkbox" />
                  {t("createModal.crypto.consent")}
                </label>
                <label className="check-row">
                  <input type="checkbox" />
                  {t("createModal.crypto.riskConsent")}
                </label>
                <div className="lx-checkout-modal__actions">
                  <button
                    className="lx-cta"
                    type="button"
                    onClick={submitCreate}
                  >
                    {t("createModal.crypto.submit")}
                  </button>
                  <button
                    className="ghost"
                    type="button"
                    onClick={() => setCreateOpen(false)}
                  >
                    {t("createModal.cancel")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
