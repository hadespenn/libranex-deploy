"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
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
}: {
  tab: Exclude<Tab, "overview">;
  t: TFunction;
  action: () => void;
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
            <button className="lx-cta" onClick={action}>
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
              <button className="lx-cta" onClick={action}>
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
                  <button className="ghost mini" onClick={action}>
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
              <button className="lx-cta" onClick={action}>
                {t("pages.fixedTerm.subscribe")}
              </button>
            </div>
          </div>
        </div>
        <div className="panel crypto-subpage-panel">
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
                  <button className="ghost mini" onClick={action}>
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
            <button className="subpage-ghost" onClick={action}>
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

      <div className="panel crypto-subpage-panel">
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
                <button className="ghost mini" onClick={action}>
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
  const [tab, setTab] = useState<Tab>("overview");
  const [mode, setMode] = useState("buy");
  const [notice, setNotice] = useState("");
  return (
    <DashboardShell
      active="crypto"
      headerTitle={t("header.title")}
      headerSubtitle={t("header.subtitle")}
    >
      <div className="crypto-page-head">
        <div>
          <h1>{t("hero.title")}</h1>
          <p>{t("hero.subtitle")}</p>
        </div>
        <button
          className="lx-cta"
          onClick={() => setNotice(t("notices.newAsset"))}
        >
          {t("cta.newAsset")}
        </button>
      </div>
      <nav className="crypto-subnav" aria-label={t("subnav.label")}>
        {SUBPAGES.map((key) => (
          <button
            key={key}
            className={tab === key ? "active" : ""}
            onClick={() => setTab(key)}
          >
            {t(`subnav.${key}`)}
          </button>
        ))}
      </nav>
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
                    <small>{t("portfolio.label")}</small>
                    <strong>$0.00</strong>
                  </div>
                  <span>
                    7d <i>| 30d | 90d</i>
                  </span>
                </div>
                <div className="crypto-chart" />
                <div className="crypto-chart-labels">
                  <span>Jul 23</span>
                  <span>Jul 25</span>
                  <span>Jul 27</span>
                  <span>Jul 29</span>
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
                  onClick={() => setNotice(t("notices.address"))}
                >
                  {t("receive.cta")}
                </button>
              </section>
            </div>
            <section className="crypto-card crypto-holdings">
              <div className="crypto-card-head">
                <h2>{t("top.title")}</h2>
                <div>
                  <button
                    className="lx-cta"
                    onClick={() => setNotice(t("notices.address"))}
                  >
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
                      <small style={{marginTop: "6px"}}>{n}</small>
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
            </div>
            <p>{t(`exchange.modes.fiatCrypto`)}</p>
            <label className="crypto-amount-field">
              {t("exchange.pay")}
              <div className="crypto-amount-input">
                <input defaultValue="0.00" inputMode="decimal" />
                <select defaultValue="USD" aria-label={`${t("exchange.pay")} currency`}>
                  <option value="USD">🇺🇸 USD</option>
                  <option value="EUR">🇪🇺 EUR</option>
                </select>
              </div>
            </label>
            <label className="crypto-amount-field">
              {t("exchange.recv")}
              <div className="crypto-amount-input">
                <input defaultValue="0.00" inputMode="decimal" />
                <select defaultValue="USDT" aria-label={`${t("exchange.recv")} currency`}>
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
              onClick={() => setNotice(t("notices.exchange"))}
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
        />
      )}
    </DashboardShell>
  );
}
