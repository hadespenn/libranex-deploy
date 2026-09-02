"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardShell from "./DashboardShell";

const SUMMARY = [
  ["HKD", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00"],
  ["USD", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00", "0.00"],
];
const CRYPTO = [
  ["BTC", "0.00004456", "0.00", "0.00", "0.00004456", "0.00004456"],
  ["ETH", "0.00004805", "0.00", "0.00", "0.00004805", "0.00004805"],
  [
    "LINK",
    "1,568.36694247",
    "0.00",
    "0.00",
    "1,568.36694247",
    "1,568.36694247",
  ],
  ["USDC", "0.00", "0.00", "0.00", "0.00", "0.00"],
  ["USDT", "0.00", "41,068.25", "41,068.25", "0.00", "0.00"],
];
const TRANSACTIONS = [
  [
    "2026-06-30",
    "FIP20260630000003",
    "subscription",
    "USDT",
    "0.00",
    "41,068.25",
  ],
  [
    "2026-06-29",
    "FIP20260628000001",
    "redemption",
    "USDT",
    "41,068.25",
    "0.00",
  ],
];

function DataTable({
  heads,
  rows,
  action,
  actionLabel,
}: {
  heads: string[];
  rows: string[][];
  action?: (id: string) => void;
  actionLabel?: string;
}) {
  return (
    <div className="statement-table-scroll">
      <table className="statement-table">
        <thead>
          <tr>
            {heads.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
              {action && (
                <td>
                  <button
                    className="ghost mini"
                    type="button"
                    onClick={() => action(row[1])}
                  >
                    {actionLabel ?? "↗"}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function StatementsView() {
  const t = useTranslations("statements");
  const [asset, setAsset] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [modalAsset, setModalAsset] = useState("all");
  const [notice, setNotice] = useState("");
  const [detailId, setDetailId] = useState<string | null>(null);
  const detail = TRANSACTIONS.find((row) => row[1] === detailId);
  const exportCsv = () => {
    const csv = TRANSACTIONS.map((r) => r.join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "statement-2026-08-02.csv";
    a.click();
    URL.revokeObjectURL(a.href);
    setNotice(t("notices.exported"));
  };
  const heads = (key: string, list: string[]) =>
    list.map((k) => t(`${key}.${k}`));
  const filtered = asset === "all" || asset === "fiat";
  return (
    <DashboardShell
      active="statements"
      headerTitle={t("header.title")}
      headerSubtitle={t("header.subtitle")}
    >
      <div className="section-head statement-page-head">
        <div>
          <p className="statement-eyebrow">{t("hero.label")}</p>
          <h1>{t("hero.title")}</h1>
          <p>{t("hero.subtitle")}</p>
        </div>
        <button className="lx-cta" type="button" onClick={exportCsv}>
          {t("cta.export")}
        </button>
      </div>
      {notice && (
        <div className="statement-notice" role="status">
          {notice}
        </div>
      )}
      <section className="panel statement-toolbar lx-panel">
        <div className="form-grid statement-filter-grid">
          <div className="field">
            <label>{t("form.period")}</label>
            <select>
              <option>04 May 2026 - 02 August 2026</option>
            </select>
          </div>
          <div className="field">
            <label>{t("form.account")}</label>
            <select>
              <option>WELLKO TRADE LIMITED · B0001267</option>
            </select>
          </div>
          <div className="field">
            <label>{t("form.assetType")}</label>
            <select value={asset} onChange={(e) => setAsset(e.target.value)}>
              <option value="all">{t("form.allAssets")}</option>
              <option value="fiat">{t("form.fiat")}</option>
              <option value="crypto">Crypto</option>
              <option value="investment">{t("form.investment")}</option>
            </select>
          </div>
        </div>
      </section>
      {filtered && (
        <section className="panel statement-panel lx-panel">
          <div className="section-head">
            <div>
              <h2>{t("summary.title")}</h2>
              <p>{t("summary.entity")}</p>
            </div>
            <span className="status ok statement-date">02 August 2026</span>
          </div>
          <DataTable
            heads={heads("summary.columns", [
              "currency",
              "opening",
              "openingPending",
              "openingAvailable",
              "credit",
              "debit",
              "closingPending",
              "closingAvailable",
              "closing",
            ])}
            rows={SUMMARY}
          />
        </section>
      )}
      <div className="grid two statement-split">
        <section className="panel statement-panel lx-panel">
          <h2>{t("crypto.title")}</h2>
          <p>{t("crypto.subtitle")}</p>
          <DataTable
            heads={heads("crypto.columns", [
              "asset",
              "opening",
              "credit",
              "debit",
              "available",
              "closing",
            ])}
            rows={CRYPTO}
          />
        </section>
        <section className="panel statement-panel lx-panel">
          <h2>{t("investment.title")}</h2>
          <p>{t("investment.subtitle")}</p>
          <DataTable
            heads={heads("investment.columns", [
              "product",
              "holding",
              "term",
              "maturity",
              "return",
              "settlement",
            ])}
            rows={[
              [t("investment.fiat"), "0.00", "—", "—", "—", "—"],
              [
                t("investment.fixed"),
                "41,068.25",
                "6.00% · 90 days",
                "2026-09-28",
                "607.59",
                "41,675.84",
              ],
            ]}
          />
        </section>
      </div>
      <section className="panel statement-panel lx-panel">
        <div className="section-head">
          <div>
            <h2>{t("transactions.title")}</h2>
            <p>{t("transactions.subtitle")}</p>
          </div>
          <button
            className="ghost mini"
            type="button"
            onClick={() => {
              setModalAsset(asset);
              setFilterOpen(true);
            }}
          >
            {t("transactions.filter")}
          </button>
        </div>
        <DataTable
          heads={heads("transactions.columns", [
            "date",
            "event",
            "type",
            "currency",
            "credit",
            "debit",
            "action",
          ])}
          rows={TRANSACTIONS.map((r) => [
            ...r.slice(0, 2),
            t(`transactions.types.${r[2]}`),
            ...r.slice(3),
          ])}
          actionLabel={t("transactions.viewDetails")}
          action={(id) => setDetailId(id)}
        />
      </section>
      <div className="grid two statement-notes">
        <aside className="auth-note lx-panel">
          <b>{t("notes.balanceTitle")}</b>
          <p>{t("notes.balance")}</p>
        </aside>
        <aside className="auth-note lx-panel">
          <b>{t("notes.providerTitle")}</b>
          <p>{t("notes.provider")}</p>
          <a href="mailto:client_services@mce.sg">client_services@mce.sg</a>
        </aside>
      </div>
      {filterOpen && (
        <div
          className="statement-filter-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="statement-filter-title"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setFilterOpen(false);
          }}
        >
          <div className="statement-filter-modal__panel">
            <div className="statement-filter-modal__head">
              <div>
                <h2 id="statement-filter-title">{t("filterModal.title")}</h2>
                
              </div>
              <button
                className="statement-filter-modal__close"
                type="button"
                aria-label="Close"
                onClick={() => setFilterOpen(false)}
              >
                ×
              </button>
            </div>
            <p>{t("filterModal.description")}</p>
            <div className="statement-filter-modal__field">
              <label htmlFor="statement-modal-asset">
                {t("form.assetType")}
              </label>
              <select
                id="statement-modal-asset"
                value={modalAsset}
                onChange={(e) => setModalAsset(e.target.value)}
              >
                <option value="all">{t("form.allAssets")}</option>
                <option value="crypto">Crypto</option>
              </select>
            </div>
            <div className="statement-filter-modal__actions">
              <button
                className="mini ghost"
                type="button"
                onClick={() => {
                  setAsset("all");
                  setFilterOpen(false);
                  setNotice(t("filterModal.reset"));
                }}
              >
                {t("filterModal.resetButton")}
              </button>
              <button
                className="lx-cta"
                type="button"
                onClick={() => {
                  setAsset(modalAsset);
                  setFilterOpen(false);
                  setNotice(t("filterModal.applied"));
                }}
              >
                {t("filterModal.apply")}
              </button>
            </div>
          </div>
        </div>
      )}
      {detail && (
        <div
          className="statement-filter-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="statement-detail-title"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setDetailId(null);
          }}
        >
          <div className="statement-filter-modal__panel statement-detail-modal__panel">
            <div className="statement-filter-modal__head">
              <div>
                <h2 id="statement-detail-title">{t("detailModal.title")}</h2>
                <p>{t("detailModal.description")}</p>
              </div>
              <button className="statement-filter-modal__close" type="button" aria-label={t("detailModal.close")} onClick={() => setDetailId(null)}>×</button>
            </div>
            <div className="statement-detail-grid">
              <div><small>{t("transactions.columns.event")}</small><b>{detail[1]}</b></div>
              <div><small>{t("detailModal.type")}</small><b>{t(`transactions.types.${detail[2]}`)}</b></div>
              <div><small>{t("detailModal.date")}</small><b>{detail[0]}</b></div>
              <div><small>{t("detailModal.amount")}</small><b>{detail[4] !== "0.00" ? `${detail[4]} ${detail[3]} · ${t("detailModal.credit")}` : `${detail[5]} ${detail[3]} · ${t("detailModal.debit")}`}</b></div>
            </div>
            <div className="statement-detail-tip">
              <div>此交易详情来自用户提供的 Statement 结构化演示数据，实际系统应从账务或投资系统实时读取。</div>
            </div>
            <div className="statement-filter-modal__actions">
              {/* <button className="ghost" type="button" onClick={() => setDetailId(null)}>{t("detailModal.close")}</button> */}
              <button className="lx-cta" type="button" onClick={exportCsv}>{t("detailModal.export")}</button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
