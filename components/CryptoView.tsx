"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import DashboardShell from "./DashboardShell";
import { dir } from "console";

const ASSETS = [
  ["USDT", "Tether USD", "₮"],
  ["USDC", "USD Coin", "$"],
];
const SUBPAGES = [
  "overview",
  "orders",
  "addresses",
  "transactions",
  "investment",
  "fixedTerm",
  "safeguarding",
  "settlement",
] as const;
type Tab = "overview" | (typeof SUBPAGES)[number];

type TFunction = ReturnType<typeof useTranslations<"crypto">>;

function DataTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="crypto-subpage-table">
      <table className="table">{children}</table>
    </div>
  );
}

function CryptoSubpage({
  tab,
  t,
  action,
  onAddAddress,
  onSubscribe,
  onRedeem,
  onFixedSubscribe,
  onFixedRedeem,
  onSafeguardIn,
  onSettleAllocate,
}: {
  tab: Exclude<Tab, "overview">;
  t: TFunction;
  action: () => void;
  onAddAddress: () => void;
  onSubscribe: () => void;
  onRedeem: () => void;
  onFixedSubscribe: () => void;
  onFixedRedeem: () => void;
  onSafeguardIn: () => void;
  onSettleAllocate: () => void;
}) {
  if (tab === "orders")
    return (
      <div className="crypto-subpage-content">
        <div className="crypto-card">
          <h2>{t("pages.orders.title")}</h2>
          <p>{t("pages.orders.description")}</p>
          <DataTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>{t("pages.orders.type")}</th>
                <th>{t("pages.orders.status")}</th>
                <th>{t("pages.orders.time")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CR-0001</td>
                <td>Buy USDT</td>
                <td>
                  <span className="status gray">No orders</span>
                </td>
                <td>—</td>
              </tr>
            </tbody>
          </DataTable>
        </div>
      </div>
    );

  if (tab === "addresses")
    return (
      <div className="crypto-subpage-content">
        <div className="crypto-card">
          <div className="crypto-subpage-head">
            <div>
              <h2>{t("pages.addresses.title")}</h2>
              <p>{t("pages.addresses.description")}</p>
            </div>
            <button className="lx-cta" onClick={onAddAddress}>
              {t("pages.addresses.action")}
            </button>
          </div>
          <div className="crypto-empty">{t("pages.addresses.empty")}</div>
        </div>
      </div>
    );

  if (tab === "transactions")
    return (
      <div className="crypto-subpage-content">
        <div className="crypto-card">
          <h2>{t("pages.transactions.title")}</h2>
          <p>{t("pages.transactions.description")}</p>
          <div className="crypto-empty">{t("pages.transactions.empty")}</div>
        </div>
      </div>
    );

  if (tab === "investment")
    return (
      <div className="crypto-subpage-content">
        <div className="crypto-card">
          <div className="crypto-subpage-head">
            <div>
              <h2>{t("pages.investment.title")}</h2>
              <p>{t("pages.investment.description")}</p>
            </div>
            <div className="actions">
              <button className="lx-cta" onClick={onSubscribe}>
                {t("pages.investment.subscribe")}
              </button>
            </div>
          </div>
        </div>
        <div className="panel crypto-subpage-panel lx-panel">
          <h3>{t("pages.investment.holdings")}</h3>
          <DataTable>
            <thead>
              <tr>
                <th>{t("pages.common.asset")}</th>
                <th>{t("pages.common.network")}</th>
                <th>{t("pages.investment.principal")}</th>
                <th>{t("pages.common.apr")}</th>
                <th>{t("pages.common.status")}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>USDT</td>
                <td>TRC20</td>
                <td>50,000</td>
                <td>5.20%</td>
                <td>
                  <span className="status ok">Holding</span>
                </td>
                <td>
                  <button className="ghost mini" onClick={onRedeem}>
                    {t("pages.common.redeem")}
                  </button>
                </td>
              </tr>
            </tbody>
          </DataTable>
        </div>
        <div className="crypto-account-notice">
          {t("pages.investment.note")}
        </div>
      </div>
    );

  if (tab === "fixedTerm")
    return (
      <div className="crypto-subpage-content">
        <div className="crypto-card">
          <div className="crypto-subpage-head">
            <div>
              <h2>{t("pages.fixedTerm.title")}</h2>
              <p>{t("pages.fixedTerm.description")}</p>
            </div>
            <div className="actions">
              <button className="lx-cta" onClick={onFixedSubscribe}>
                {t("pages.fixedTerm.subscribe")}
              </button>
            </div>
          </div>
        </div>
        <div className="panel crypto-subpage-panel lx-panel">
          <h3>{t("pages.fixedTerm.holdings")}</h3>
          <DataTable>
            <thead>
              <tr>
                <th>{t("pages.common.asset")}</th>
                <th>{t("pages.common.network")}</th>
                <th>{t("pages.fixedTerm.lockedAmount")}</th>
                <th>{t("pages.common.apr")}</th>
                <th>{t("pages.fixedTerm.maturity")}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>USDC</td>
                <td>ERC20</td>
                <td>120,000</td>
                <td>6.80%</td>
                <td>2026-12-01</td>
                <td>
                  <button className="ghost mini" onClick={onFixedRedeem}>
                    {t("pages.common.redeem")}
                  </button>
                </td>
              </tr>
            </tbody>
          </DataTable>
        </div>
        <div className="crypto-account-notice">{t("pages.fixedTerm.note")}</div>
      </div>
    );

  if (tab === "safeguarding")
    return (
      <div className="crypto-subpage-content">
        <div className="crypto-subpage-card">
          <h2>{t("pages.safeguarding.title")}</h2>
          <p>{t("pages.safeguarding.description")}</p>
          <div className="actions">
            <div className="auth-note">
              {t("pages.safeguarding.releaseNote")}
            </div>
            <button className="subpage-ghost" onClick={onSafeguardIn}>
              {t("pages.safeguarding.controlledIn")}
            </button>
          </div>
        </div>
        <div className="panel crypto-subpage-panel lx-panel">
          <h3>{t("pages.safeguarding.info")}</h3>
          <div className="crypto-ops-data-list">
            <div className="crypto-ops-data">
              <small>{t("pages.safeguarding.owner")}</small>
              <b>Unity Centre Investment Ltd.</b>
            </div>
            <div className="crypto-ops-data">
              <small>{t("pages.safeguarding.reason")}</small>
              <b>{t("pages.safeguarding.reasonText")}</b>
            </div>
          </div>
          <div className="crypto-account-notice">
            {t("pages.safeguarding.note")}
          </div>
        </div>
      </div>
    );

  return (
    <div className="crypto-subpage-content">
      <div
        className="crypto-card"
        style={{ flexDirection: "column", alignItems: "flex-start" }}
      >
        <div>
          <h2>{t("pages.settlement.title")}</h2>
          <p>{t("pages.settlement.description")}</p>
        </div>
        <div className="actions">
          <div className="auth-note">{t("pages.settlement.releaseNote")}</div>
        </div>
      </div>

      <div className="panel crypto-subpage-panel lx-panel">
        <h3>{t("pages.settlement.batch")}</h3>
        <DataTable>
          <thead>
            <tr>
              <th>{t("pages.settlement.batchId")}</th>
              <th>{t("pages.common.asset")}</th>
              <th>{t("pages.settlement.amount")}</th>
              <th>{t("pages.common.status")}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CSTL-20260811-03</td>
              <td>USDT</td>
              <td>85,000</td>
              <td>
                <span className="status warn">Pending</span>
              </td>
              <td>
                <button className="ghost mini" onClick={onSettleAllocate}>
                  {t("pages.settlement.allocate")}
                </button>
              </td>
            </tr>
          </tbody>
        </DataTable>
      </div>
      <div className="crypto-account-notice">{t("pages.settlement.note")}</div>
    </div>
  );
}

export default function CryptoView() {
  const t = useTranslations("crypto");
  const router = useRouter();
  const params = useParams<{ locale: string; subpage?: string }>();
  const locale = params?.locale ?? "zh-CN";
  const subpage = Array.isArray(params?.subpage)
    ? params.subpage[0]
    : params?.subpage;
  // Tab is derived from the route so it survives language switches.
  const tab: Tab =
    subpage && (SUBPAGES as readonly string[]).includes(subpage)
      ? (subpage as Tab)
      : "overview";
  const setTab = (next: Tab) => {
    router.push(`/${locale}/crypto/${next}`);
  };
  const [mode, setMode] = useState("buy");
  const [notice, setNotice] = useState("");
  const [dialog, setDialog] = useState<
    | "asset"
    | "address"
    | "exchange"
    | "withdrawal"
    | "invest"
    | "redeem"
    | "fixedSubscribe"
    | "fixedRedeem"
    | "safeguardIn"
    | "settleAllocate"
    | null
  >(null);
  const [swapAck, setSwapAck] = useState(false);
  const closeDialog = () => setDialog(null);
  return (
    <DashboardShell
      active="crypto"
      headerTitle={t("header.title")}
      headerSubtitle={t("header.subtitle")}
      cryptoSubActive={tab}
      onCryptoSubChange={(k) => setTab(k as Tab)}
    >
      <div className="crypto-page-head">
        <div>
          <h1>{t("hero.title")}</h1>
          <p>{t("hero.subtitle")}</p>
        </div>
        <button className="lx-cta" onClick={() => setDialog("asset")}>
          {t("cta.newAsset")}
        </button>
      </div>
      {notice && (
        <div className="crypto-notice" role="status">
          {notice}
          <button onClick={() => setNotice("")}>×</button>
        </div>
      )}
      {tab === "overview" && (
        <div className="crypto-layout">
          <div className="crypto-main">
            <div className="crypto-top-grid">
              <section className="crypto-card">
                <div className="crypto-card-head">
                  <div>
                    <div className="crypto-kicker">
                      {t("portfolio.label")}
                    </div>
                    <div className="crypto-value">$0.00</div>
                  </div>
                  <span className="crypto-range">
                    {t("portfolio.rangeActive")}{" "}
                    <span style={{ color: "#a5b0ba" }}>
                      {t("portfolio.rangeRest")}
                    </span>
                  </span>
                </div>
                <div className="crypto-chart">
                  <svg
                    viewBox="0 0 760 150"
                    preserveAspectRatio="none"
                    aria-label={t("portfolio.chartLabel")}
                  >
                    <path
                      d="M0 130 L90 130 L175 130 L260 130 L350 130 L440 130 L530 130 L620 130 L760 130"
                      fill="none"
                      stroke="#20b67a"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="crypto-chart-labels">
                  <span>{t("portfolio.date1")}</span>
                  <span>{t("portfolio.date2")}</span>
                  <span>{t("portfolio.date3")}</span>
                  <span>{t("portfolio.date4")}</span>
                </div>
              </section>
              <section className="crypto-card">
                <div className="crypto-card-head">
                  <div>
                    <h3>{t("receive.title")}</h3>
                    <small>{t("receive.network")} </small>
                    <span className="crypto-network">Tron · TRC20</span>
                  </div>
                  <select>
                    <option>USDT</option>
                    <option>USDC</option>
                  </select>
                </div>
                <div className="crypto-warning">{t("receive.warning")}</div>
                <div className="crypto-address-box">▣</div>
                <input className="lx-input" placeholder={t("receive.input")} />
                <button
                  className="lx-cta crypto-full"
                  onClick={() => setDialog("address")}
                >
                  {t("receive.cta")}
                </button>
              </section>
            </div>
            <section className="crypto-card crypto-holdings">
              <div className="crypto-card-head">
                <h2>{t("top.title")}</h2>
                <div className="crypto-card-actions">
                  <button className="lx-cta" onClick={() => setDialog("asset")}>
                    {t("cta.newAsset")}
                  </button>
                  <button
                    className="ghost mini"
                    onClick={() => setTab("transactions")}
                  >
                    {t("top.allTransactions")}
                  </button>
                </div>
              </div>
              <div className="crypto-table">
                <div className="crypto-table-row head">
                  <span>{t("top.col.asset")}</span>
                  <span>{t("top.col.amount")}</span>
                  <span>{t("top.col.available")}</span>
                  <span>{t("top.col.margin")}</span>
                  <span>{t("top.col.frozen")}</span>
                </div>
                {ASSETS.map(([a, n, d]) => (
                  <div className="crypto-table-row" key={a}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span className={`asset-symbol ${a}`}>{d}</span>
                      <span>
                        <b>{a}</b>
                        <small style={{ marginTop: "6px" }}>{n}</small>
                      </span>
                    </div>
                    <span>0.00</span>
                    <span>0.00</span>
                    <span>0.00</span>
                    <span>0.00</span>
                  </div>
                ))}
              </div>
            </section>
            <section className="crypto-card">
              <h3>{t("activity.title")}</h3>
              <div className="crypto-empty">
                ▧<br />
                {t("activity.empty")}
              </div>
            </section>
          </div>
          <section className="crypto-card crypto-exchange">
            <h2>{t("exchange.title")}</h2>
            <p>{t("exchange.subtitle")}</p>

            <div className="crypto-tabs">
              {(["buy", "sell", "convert"] as const).map((k) => (
                <button
                  key={k}
                  className={mode === k ? "active" : ""}
                  onClick={() => setMode(k)}
                >
                  {t(`exchange.modes.${k}`)}
                </button>
              ))}
              <button>{t(`exchange.modes.fiatCrypto`)}</button>
            </div>

            <label className="crypto-amount-field">
              <div className="crypto-amount-label">
                <span>{t("exchange.pay")}</span>
                <span>{t("exchange.balance")}: 0 USD</span>
              </div>
              
              <div className="crypto-amount-input">
                <input defaultValue="0.00" inputMode="decimal" />
                <select
                  defaultValue="USD"
                  aria-label={`${t("exchange.pay")} currency`}
                >
                  <option value="USD">🇺🇸 USD</option>
                  <option value="EUR">🇪🇺 EUR</option>
                </select>
              </div>
            </label>
            <div className="crypto-swap">↓</div>
            <label className="crypto-amount-field">
              {t("exchange.recv")}
              <div className="crypto-amount-input">
                <input defaultValue="0.00" inputMode="decimal" />
                <select
                  defaultValue="USDT"
                  aria-label={`${t("exchange.recv")} currency`}
                >
                  <option value="USDT">₮ USDT</option>
                  <option value="USDC">$ USDC</option>
                </select>
              </div>
            </label>

            <label>
              {t("exchange.reason")}
              <input className="lx-input" />
            </label>
            <div className="auth-agree">{t("exchange.trade")}</div>
            <div className="auth-note">{t("exchange.disclaimer")}</div>
            <div className="auth-agree">
              <input id="oslAcknowledgement" type="checkbox" />
              <span>{t("exchange.agree")}</span>
            </div>
            <button
              className="lx-cta crypto-full"
              onClick={() => {
                setSwapAck(false);
                setDialog("exchange");
              }}
            >
              {t(`exchange.actions.${mode}`)}
            </button>
          </section>
        </div>
      )}
      {tab !== "overview" && (
        <CryptoSubpage
          tab={tab}
          t={t}
          action={() => setNotice(t("notices.action"))}
          onAddAddress={() => setDialog("withdrawal")}
          onSubscribe={() => setDialog("invest")}
          onRedeem={() => setDialog("redeem")}
          onFixedSubscribe={() => setDialog("fixedSubscribe")}
          onFixedRedeem={() => setDialog("fixedRedeem")}
          onSafeguardIn={() => setDialog("safeguardIn")}
          onSettleAllocate={() => setDialog("settleAllocate")}
        />
      )}
      {dialog === "asset" && (
        <div
          className="lx-operation-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="crypto-modal-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
        >
          <div className="lx-operation-modal__panel">
            <div className="lx-operation-modal__head">
              <div>
                <h2 id="crypto-modal-title">{t("modals.asset.title")}</h2>
              </div>
              <button
                className="lx-operation-modal__close"
                type="button"
                aria-label="Close"
                onClick={closeDialog}
              >
                ×
              </button>
            </div>
            <div className="form-grid lx-crypto-modal__form">
              <div className="field">
                <label>{t("modals.asset.asset")}</label>
                <select defaultValue="USDT">
                  <option>USDT</option>
                  <option>USDC</option>
                  <option>BTC</option>
                  <option>ETH</option>
                </select>
              </div>
              <div className="field">
                <label>{t("modals.asset.network")}</label>
                <select defaultValue="ERC-20">
                  <option>ERC-20</option>
                  <option>TRC-20</option>
                  <option>Solana</option>
                  <option>Arbitrum</option>
                </select>
              </div>
              <div className="field">
                <label>{t("modals.asset.decimals")}</label>
                <input placeholder="6" />
              </div>
            </div>
            <div className="auth-note">{t("modals.asset.note")}</div>
            <div className="actions">
              <button
                className="primary lx-cta"
                type="button"
                onClick={() => {
                  closeDialog();
                  setNotice(t("modals.asset.submitted"));
                }}
              >
                {t("modals.asset.submit")}
              </button>
              <button className="ghost" type="button" onClick={closeDialog}>
                {t("modals.asset.cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
      {dialog === "address" && (
        <div
          className="lx-operation-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="crypto-modal-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
        >
          <div className="lx-operation-modal__panel">
            <div className="lx-operation-modal__head">
              <div>
                <h2 id="crypto-modal-title">{t("modals.address.title")}</h2>
              </div>
              <button
                className="lx-operation-modal__close"
                type="button"
                aria-label="Close"
                onClick={closeDialog}
              >
                ×
              </button>
            </div>
            <div className="form-grid lx-crypto-modal__form">
              <div className="field">
                <label>{t("modals.address.asset")}</label>
                <select defaultValue="USDT">
                  <option>USDT</option>
                  <option>USDC</option>
                </select>
              </div>
              <div className="field">
                <label>{t("modals.address.network")}</label>
                <select defaultValue="ERC-20">
                  <option>ERC-20</option>
                  <option>TRC-20</option>
                </select>
              </div>
            </div>
            <div className="lx-crypto-address-box">
              <b>{t("modals.address.addressTitle")}</b>
              <p>{t("modals.address.addressValue")}</p>
            </div>
            <div className="auth-note">{t("modals.address.note")}</div>
            <div className="actions">
              <button className="ghost" type="button" onClick={closeDialog}>
                {t("modals.address.close")}
              </button>
            </div>
          </div>
        </div>
      )}
      {dialog === "exchange" && (
        <div
          className="lx-operation-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="crypto-modal-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
        >
          <div className="lx-operation-modal__panel">
            <div className="lx-operation-modal__head">
              <div>
                <h2 id="crypto-modal-title">{t("modals.exchange.title")}</h2>
              </div>
              <button
                className="lx-operation-modal__close"
                type="button"
                aria-label="Close"
                onClick={closeDialog}
              >
                ×
              </button>
            </div>
            <div className="form-grid lx-crypto-modal__form">
              <div className="field">
                <label>{t("modals.exchange.pay")}</label>
                <select defaultValue="USD">
                  <option value="USD">{t("modals.exchange.payFiat")}</option>
                  <option value="USDC">USDC</option>
                </select>
              </div>
              <div className="field">
                <label>{t("modals.exchange.receive")}</label>
                <select defaultValue="USDT">
                  <option>USDT</option>
                  <option>USDC</option>
                </select>
              </div>
              <div className="field">
                <label>{t("modals.exchange.amount")}</label>
                <input placeholder="1000" />
              </div>
            </div>
            <div className="lx-crypto-info-card">
              <b>{t("modals.exchange.bridgeTitle")}</b>
              <p>{t("modals.exchange.bridgeDesc")}</p>
              <b>{t("modals.exchange.executionTitle")}</b>
              <p>{t("modals.exchange.executionDesc")}</p>
            </div>
            <label className="auth-agree">
              <input
                type="checkbox"
                checked={swapAck}
                onChange={(event) => setSwapAck(event.target.checked)}
              />
              <span>{t("modals.exchange.ack")}</span>
            </label>
            <div className="auth-note">{t("modals.exchange.note")}</div>
            <div className="actions">
              <button
                className="primary lx-cta"
                type="button"
                onClick={() => {
                  if (!swapAck) {
                    setNotice(t("modals.exchange.ackRequired"));
                    return;
                  }
                  closeDialog();
                  setNotice(t("modals.exchange.submitted"));
                }}
              >
                {t("modals.exchange.confirm")}
              </button>
              <button className="ghost" type="button" onClick={closeDialog}>
                {t("modals.exchange.cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
      {dialog === "withdrawal" && (
        <div
          className="lx-operation-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="crypto-modal-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeDialog();
          }}
        >
          <div className="lx-operation-modal__panel">
            <div className="lx-operation-modal__head">
              <div>
                <h2 id="crypto-modal-title">{t("modals.withdrawal.title")}</h2>
              </div>
              <button
                className="lx-operation-modal__close"
                type="button"
                aria-label="Close"
                onClick={closeDialog}
              >
                ×
              </button>
            </div>
            <div className="form-grid lx-crypto-modal__form">
              <div className="field">
                <label>{t("modals.withdrawal.label")}</label>
                <input placeholder={t("modals.withdrawal.labelPlaceholder")} />
              </div>
              <div className="field">
                <label>{t("modals.withdrawal.network")}</label>
                <select defaultValue="ERC-20">
                  <option>ERC-20</option>
                  <option>TRC-20</option>
                </select>
              </div>
              <div className="field">
                <label>{t("modals.withdrawal.address")}</label>
                <input placeholder="0x..." />
              </div>
              <div className="field">
                <label>{t("modals.withdrawal.memo")}</label>
                <input placeholder={t("modals.withdrawal.memoPlaceholder")} />
              </div>
            </div>
            <div className="auth-note">{t("modals.withdrawal.note")}</div>
            <div className="actions">
              <button
                className="primary lx-cta"
                type="button"
                onClick={() => {
                  closeDialog();
                  setNotice(t("modals.withdrawal.submitted"));
                }}
              >
                {t("modals.withdrawal.submit")}
              </button>
              <button className="ghost" type="button" onClick={closeDialog}>
                {t("modals.withdrawal.cancel")}
              </button>
            </div>
          </div>
        </div>
      )}

      {dialog === "invest" && (
        <div
          className="lx-operation-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="crypto-invest-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeDialog();
          }}
        >
          <div className="lx-operation-modal__panel">
            <div className="lx-operation-modal__head">
              <div>
                <h2 id="crypto-invest-modal-title">
                  {t("modals.invest.title")}
                </h2>
              </div>
              <button
                className="lx-operation-modal__close"
                type="button"
                aria-label="Close"
                onClick={closeDialog}
              >
                ×
              </button>
            </div>
            <div className="form-grid lx-crypto-modal__form">
              <div className="field">
                <label>{t("modals.invest.product")}</label>
                <select defaultValue="USDT Flexible">
                  <option>USDT Flexible</option>
                  <option>USDT Fixed Term</option>
                </select>
              </div>
              <div className="field">
                <label>{t("modals.invest.principal")}</label>
                <input placeholder="50000" />
              </div>
              <div className="field">
                <label>{t("modals.invest.term")}</label>
                <select defaultValue="30d">
                  <option>30d</option>
                  <option>90d</option>
                  <option>180d</option>
                </select>
              </div>
            </div>
            <div className="auth-note">{t("modals.invest.note")}</div>
            <div className="actions">
              <button
                className="primary lx-cta"
                type="button"
                onClick={() => {
                  closeDialog();
                  setNotice(t("modals.invest.submitted"));
                }}
              >
                {t("modals.invest.submit")}
              </button>
              <button className="ghost" type="button" onClick={closeDialog}>
                {t("modals.invest.cancel")}
              </button>
            </div>
          </div>
        </div>
      )}

      {dialog === "redeem" && (
        <div
          className="lx-operation-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="crypto-redeem-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeDialog();
          }}
        >
          <div className="lx-operation-modal__panel">
            <div className="lx-operation-modal__head">
              <div>
                <h2 id="crypto-redeem-modal-title">
                  {t("modals.redeem.title")}
                </h2>
              </div>
              <button
                className="lx-operation-modal__close"
                type="button"
                aria-label="Close"
                onClick={closeDialog}
              >
                ×
              </button>
            </div>
            <div className="form-grid lx-crypto-modal__form">
              <div className="field">
                <label>{t("modals.redeem.product")}</label>
                <select defaultValue="USDT Flexible">
                  <option>USDT Flexible</option>
                  <option>USDT Fixed Term</option>
                </select>
              </div>
              <div className="field">
                <label>{t("modals.redeem.amount")}</label>
                <input placeholder="50000" />
              </div>
            </div>
            <div className="auth-note">{t("modals.redeem.note")}</div>
            <div className="actions">
              <button
                className="primary lx-cta"
                type="button"
                onClick={() => {
                  closeDialog();
                  setNotice(t("modals.redeem.submitted"));
                }}
              >
                {t("modals.redeem.submit")}
              </button>
              <button className="ghost" type="button" onClick={closeDialog}>
                {t("modals.redeem.cancel")}
              </button>
            </div>
          </div>
        </div>
      )}

      {dialog === "fixedSubscribe" && (
        <div
          className="lx-operation-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="crypto-fixed-subscribe-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeDialog();
          }}
        >
          <div className="lx-operation-modal__panel">
            <div className="lx-operation-modal__head">
              <div>
                <h2 id="crypto-fixed-subscribe-modal-title">
                  {t("modals.fixedSubscribe.title")}
                </h2>
              </div>
              <button
                className="lx-operation-modal__close"
                type="button"
                aria-label="Close"
                onClick={closeDialog}
              >
                ×
              </button>
            </div>
            <div className="form-grid lx-crypto-modal__form">
              <div className="field">
                <label>{t("modals.fixedSubscribe.product")}</label>
                <select defaultValue="USDC Fixed Term">
                  <option>USDC Fixed Term</option>
                  <option>USDT Fixed Term</option>
                </select>
              </div>
              <div className="field">
                <label>{t("modals.fixedSubscribe.amount")}</label>
                <input placeholder="120000" />
              </div>
              <div className="field">
                <label>{t("modals.fixedSubscribe.term")}</label>
                <select defaultValue="90d">
                  <option>30d</option>
                  <option>90d</option>
                  <option>180d</option>
                </select>
              </div>
            </div>
            <div className="auth-note">{t("modals.fixedSubscribe.note")}</div>
            <div className="actions">
              <button
                className="primary lx-cta"
                type="button"
                onClick={() => {
                  closeDialog();
                  setNotice(t("modals.fixedSubscribe.submitted"));
                }}
              >
                {t("modals.fixedSubscribe.submit")}
              </button>
              <button className="ghost" type="button" onClick={closeDialog}>
                {t("modals.fixedSubscribe.cancel")}
              </button>
            </div>
          </div>
        </div>
      )}

      {dialog === "fixedRedeem" && (
        <div
          className="lx-operation-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="crypto-fixed-redeem-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeDialog();
          }}
        >
          <div className="lx-operation-modal__panel">
            <div className="lx-operation-modal__head">
              <div>
                <h2 id="crypto-fixed-redeem-modal-title">
                  {t("modals.fixedRedeem.title")}
                </h2>
              </div>
              <button
                className="lx-operation-modal__close"
                type="button"
                aria-label="Close"
                onClick={closeDialog}
              >
                ×
              </button>
            </div>
            <div className="form-grid lx-crypto-modal__form">
              <div className="field">
                <label>{t("modals.fixedRedeem.product")}</label>
                <select defaultValue="USDC Fixed Term">
                  <option>USDC Fixed Term</option>
                  <option>USDT Fixed Term</option>
                </select>
              </div>
              <div className="field">
                <label>{t("modals.fixedRedeem.amount")}</label>
                <input placeholder="120000" />
              </div>
            </div>
            <div className="auth-note">{t("modals.fixedRedeem.note")}</div>
            <div className="actions">
              <button
                className="primary lx-cta"
                type="button"
                onClick={() => {
                  closeDialog();
                  setNotice(t("modals.fixedRedeem.submitted"));
                }}
              >
                {t("modals.fixedRedeem.submit")}
              </button>
              <button className="ghost" type="button" onClick={closeDialog}>
                {t("modals.fixedRedeem.cancel")}
              </button>
            </div>
          </div>
        </div>
      )}

      {dialog === "safeguardIn" && (
        <div
          className="lx-operation-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="crypto-safeguard-in-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeDialog();
          }}
        >
          <div className="lx-operation-modal__panel">
            <div className="lx-operation-modal__head">
              <div>
                <h2 id="crypto-safeguard-in-modal-title">
                  {t("modals.safeguardIn.title")}
                </h2>
              </div>
              <button
                className="lx-operation-modal__close"
                type="button"
                aria-label="Close"
                onClick={closeDialog}
              >
                ×
              </button>
            </div>
            <p>{t("modals.safeguardIn.note")}</p>
            <div className="form-grid lx-crypto-modal__form">
              <div className="field">
                <label>{t("modals.safeguardIn.asset")}</label>
                <input placeholder="USDT" />
              </div>
              <div className="field">
                <label>{t("modals.safeguardIn.network")}</label>
                <select defaultValue="ERC-20">
                  <option>ERC-20</option>
                  <option>TRC-20</option>
                </select>
              </div>
              <div className="field">
                <label>{t("modals.safeguardIn.amount")}</label>
                <input placeholder="0.00" />
              </div>
            </div>
            <div className="auth-note">{t("modals.safeguardIn.tip")}</div>

            <div className="actions">
              <button
                className="primary lx-cta"
                type="button"
                onClick={() => {
                  closeDialog();
                  setNotice(t("modals.safeguardIn.submitted"));
                }}
              >
                {t("modals.safeguardIn.submit")}
              </button>
              <button className="ghost" type="button" onClick={closeDialog}>
                {t("modals.safeguardIn.cancel")}
              </button>
            </div>
          </div>
        </div>
      )}

      {dialog === "settleAllocate" && (
        <div
          className="lx-operation-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="crypto-settle-allocate-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeDialog();
          }}
        >
          <div className="lx-operation-modal__panel">
            <div className="lx-operation-modal__head">
              <div>
                <h2 id="crypto-settle-allocate-modal-title">
                  {t("modals.settleAllocate.title")}
                </h2>
              </div>
              <button
                className="lx-operation-modal__close"
                type="button"
                aria-label="Close"
                onClick={closeDialog}
              >
                ×
              </button>
            </div>
            <div className="form-grid lx-crypto-modal__form">
              {/* <div className="field">
                <label>{t("modals.settleAllocate.batch")}</label>
                <input defaultValue="CSTL-20260811-03" readOnly />
              </div> */}
              <div className="field">
                <label>{t("modals.settleAllocate.asset")}</label>
                <span className="pending">USDT 85,000</span>
              </div>
              <div className="field">
                <label>{t("modals.settleAllocate.status")}</label>
                <span className="pending">
                  {t("modals.settleAllocate.statusValue")}
                </span>
              </div>
            </div>
            <div className="auth-note">{t("modals.settleAllocate.note")}</div>
            <div className="actions">
              <button className="ghost" type="button" onClick={closeDialog}>
                {t("modals.settleAllocate.cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
