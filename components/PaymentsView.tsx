"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardShell from "./DashboardShell";

const TABS = ["bulk", "link", "reconcile", "payee", "refund"] as const;

type TabKey = (typeof TABS)[number];

export default function PaymentsView() {
  const t = useTranslations("payments");
  const [tab, setTab] = useState<TabKey>("bulk");
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [notice, setNotice] = useState("");

  const action = (message: string) => setNotice(message);

  const summaryCards = [
    {
      key: "outgoing",
      label: t("summary.metrics.outgoing.label"),
      value: t("summary.metrics.outgoing.value"),
      desc: t("summary.metrics.outgoing.desc"),
    },
    {
      key: "pending",
      label: t("summary.metrics.pending.label"),
      value: t("summary.metrics.pending.value"),
      desc: t("summary.metrics.pending.desc"),
    },
    {
      key: "success",
      label: t("summary.metrics.success.label"),
      value: t("summary.metrics.success.value"),
      desc: t("summary.metrics.success.desc"),
    },
    {
      key: "revenue",
      label: t("summary.metrics.revenue.label"),
      value: t("summary.metrics.revenue.value"),
      desc: t("summary.metrics.revenue.desc"),
    },
  ];

  const processingQueue = [
    { id: "BULK-20260802-017", status: t("status.processing"), detail: "81 / 2 · T+1" },
    { id: "BULK-20260811-042", status: t("status.review"), detail: "14 / 0 · T+0" },
    { id: "BULK-20260818-118", status: t("status.completed"), detail: "312 / 0 · T+1" },
  ];

  const payeeRows = [
    { name: "Blue Ocean Supply", account: "USD · HSBC 2020", risk: t("status.verified"), amount: "$48,200" },
    { name: "Clover Logistics", account: "SGD · DBS 7701", risk: t("status.review"), amount: "$18,660" },
    { name: "Northwind Retail", account: "EUR · DEUT 1167", risk: t("status.verified"), amount: "$24,900" },
  ];

  const reconcileRows = [
    { reference: "A-8842", side: "Bank settlement", amount: "$18,430", status: t("status.completed") },
    { reference: "A-9110", side: "Orders + invoice", amount: "$9,760", status: t("status.review") },
    { reference: "A-9154", side: "Card payout", amount: "$5,660", status: t("status.processing") },
  ];

  const refundRows = [
    { id: "RF-20260818-110", customer: "Jade & Co.", amount: "$2,380", reason: t("refund.reasonMismatch"), status: t("status.review") },
    { id: "RF-20260817-402", customer: "Quasar Labs", amount: "$8,120", reason: t("refund.reasonDuplicate"), status: t("status.processing") },
    { id: "RF-20260811-917", customer: "EverGlow", amount: "$1,940", reason: t("refund.reasonLost"), status: t("status.completed") },
  ];

  return (
    <DashboardShell
      active="payments"
      headerTitle={t("header.title")}
      headerSubtitle={t("header.subtitle")}
    >
      <div className="section-head payments-head">
        <div>
          <h1>{t("hero.title")}</h1>
          <p>{t("hero.subtitle")}</p>
        </div>
        <button
          className="primary lx-cta"
          type="button"
          onClick={() => {
            setTab("link");
            action(t("notice.linkReady"));
          }}
        >
          {t("cta.generate")}
        </button>
      </div>

      {notice && <div className="payment-notice">{notice}</div>}

      <div className="tabs payment-tabs">
        {TABS.map((k) => (
          <button
            key={k}
            type="button"
            className={`tab ${tab === k ? "active" : ""}`}
            onClick={() => setTab(k)}
          >
            {t(`tabs.${k}`)}
          </button>
        ))}
      </div>

      {tab === "bulk" && (
        <>
          <div className="panel payment-stack">
            <h2>{t("batch.title")}</h2>
            <div className="lx-balance-row" style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
              {summaryCards.map((item) => (
                <article key={item.key} className="metric">
                  <small>{item.label}</small>
                  <strong>{item.value}</strong>
                  <span>{item.desc}</span>
                </article>
              ))}
            </div>

            <div className="grid two" style={{ marginTop: 16 }}>
              <div className="field">
                <label>{t("batch.fields.purpose")}</label>
                <input defaultValue={t("batch.fields.purposeValue")} />
              </div>
              <div className="field">
                <label>{t("batch.fields.vendor")}</label>
                <input defaultValue={t("batch.fields.vendorValue")} />
              </div>
            </div>

            <div className="actions">
              <button
                className="primary lx-cta"
                type="button"
                onClick={() => action(t("notice.purposeReady"))}
              >
                {t("batch.fields.submit")}
              </button>
              <button className="ghost" type="button">
                {t("batch.fields.evidence")}
              </button>
            </div>
          </div>

          <div className="grid two payment-lower">
            <article className="panel">
              <h2>{t("batch.uploadTitle")}</h2>
              <div className="upload">
                <b>{t("batch.uploadHint")}</b>
                <p>{t("batch.empty")}</p>
                <label className="file-picker">
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    hidden
                    onChange={(event) => {
                      const nextFile = event.target.files?.[0];
                      if (nextFile) {
                        setUploaded(true);
                        setFileName(nextFile.name);
                        action(t("notice.fileParsed", { file: nextFile.name }));
                      }
                    }}
                  />
                  <span className="file-picker-button">{t("batch.chooseFile")}</span>
                  <span className={`file-picker-name ${uploaded ? "has-file" : ""}`}>
                    {uploaded ? fileName : t("batch.empty")}
                  </span>
                </label>
                <button
                  className="ghost"
                  type="button"
                  onClick={() => {
                    setUploaded(true);
                    setFileName("payments.csv");
                    action(t("notice.parseComplete"));
                  }}
                >
                  {t("batch.parse")}
                </button>
              </div>

              <div className="grid three payment-metrics">
                <div className="metric">
                  <small>{t("batch.metrics.valid.label")}</small>
                  <strong>{uploaded ? t("batch.metrics.valid.value") : "0"}</strong>
                </div>
                <div className="metric">
                  <small>{t("batch.metrics.abnormal.label")}</small>
                  <strong>{uploaded ? t("batch.metrics.abnormal.value") : "0"}</strong>
                </div>
                <div className="metric">
                  <small>{t("batch.metrics.amount.label")}</small>
                  <strong>{uploaded ? t("batch.metrics.amount.value") : "--"}</strong>
                </div>
              </div>

              <div className="actions">
                <button
                  className="primary lx-cta"
                  type="button"
                  onClick={() => action(t("notice.batchSubmitted"))}
                >
                  {t("batch.submit")}
                </button>
                <button className="ghost" type="button">
                  {t("batch.saveTemplate")}
                </button>
                <button className="ghost" type="button">
                  {t("batch.schedule")}
                </button>
              </div>
            </article>

            <article className="panel">
              <h2>{t("batch.progressTitle")}</h2>
              <div className="progress-track">
                <span style={{ width: "64%" }} />
              </div>
              <p className="progress-label">{t("batch.progressLabel")}</p>

              {processingQueue.map((item) => (
                <div key={item.id} className="payment-list">
                  <b>{item.id}</b>
                  <span>{item.detail}</span>
                  <span className={`status ${item.status === t("status.completed") ? "ok" : item.status === t("status.processing") ? "warn" : "gray"}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </article>
          </div>
        </>
      )}

      {tab === "link" && (
        <div className="grid two">
          <article className="panel">
            <h2>{t("link.title")}</h2>
            <p className="lx-section-sub">{t("link.subtitle")}</p>

            <div className="form-grid" style={{ marginTop: 18 }}>
              <div className="field">
                <label>{t("link.name")}</label>
                <input defaultValue={t("link.nameValue")} />
              </div>
              <div className="field">
                <label>{t("link.currency")}</label>
                <select defaultValue="USD">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>SGD</option>
                </select>
              </div>
              <div className="field">
                <label>{t("link.amount")}</label>
                <input defaultValue="$2,540.00" />
              </div>
              <div className="field">
                <label>{t("link.expiry")}</label>
                <select defaultValue={t("link.expiryValue")}>
                  <option>{t("link.expiryValue")}</option>
                  <option>{t("link.expiry48")}</option>
                  <option>{t("link.expiry72")}</option>
                </select>
              </div>
            </div>

            <div className="actions">
              <button
                className="primary lx-cta"
                type="button"
                onClick={() => action(t("notice.linkCreated"))}
              >
                {t("link.create")}
              </button>
              <button className="ghost" type="button">
                {t("link.preview")}
              </button>
            </div>
          </article>

          <article className="panel">
            <h2>{t("link.preview")}</h2>
            <div style={{ display: "flex", justifyContent: "center", padding: "8px 0 18px" }}>
              <div className="qr" aria-label="QR code" />
            </div>
            <div className="field">
              <label>{t("link.url")}</label>
              <input defaultValue="https://pay.libranex.io/c/LM-09612" />
            </div>
            <div className="actions">
              <button className="ghost" type="button">
                {t("link.copy")}
              </button>
              <button className="ghost" type="button">
                {t("link.share")}
              </button>
            </div>
          </article>
        </div>
      )}

      {tab === "reconcile" && (
        <div className="panel">
          <h2>{t("reconcile.title")}</h2>
          <p className="lx-section-sub">{t("reconcile.subtitle")}</p>

          <div className="form-grid" style={{ marginTop: 18 }}>
            <div className="field">
              <label>{t("reconcile.search")}</label>
              <input placeholder={t("reconcile.searchPlaceholder")} />
            </div>
            <div className="field">
              <label>{t("reconcile.status")}</label>
              <select defaultValue="all">
                <option value="all">{t("reconcile.all")}</option>
                <option value="processed">{t("status.completed")}</option>
                <option value="review">{t("status.review")}</option>
              </select>
            </div>
          </div>

          <div className="table-scroll" style={{ marginTop: 18 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>{t("reconcile.columns.reference")}</th>
                  <th>{t("reconcile.columns.match")}</th>
                  <th>{t("reconcile.columns.amount")}</th>
                  <th>{t("reconcile.columns.status")}</th>
                </tr>
              </thead>
              <tbody>
                {reconcileRows.map((row) => (
                  <tr key={row.reference}>
                    <td>{row.reference}</td>
                    <td>{row.side}</td>
                    <td>{row.amount}</td>
                    <td>
                      <span className={`status ${row.status === t("status.completed") ? "ok" : row.status === t("status.processing") ? "warn" : "gray"}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="actions">
            <button className="primary lx-cta" type="button" onClick={() => action(t("notice.reconcileRun"))}>
              {t("reconcile.run")}
            </button>
            <button className="ghost" type="button">{t("reconcile.detail")}</button>
          </div>
        </div>
      )}

      {tab === "payee" && (
        <div className="panel">
          <h2>{t("payees.title")}</h2>
          <p className="lx-section-sub">{t("payees.subtitle")}</p>

          <div className="actions" style={{ justifyContent: "space-between" }}>
            <div className="field" style={{ flex: 1, maxWidth: 320 }}>
              <label>{t("payees.search")}</label>
              <input placeholder={t("payees.searchPlaceholder")} />
            </div>
            <button className="primary lx-cta" type="button" onClick={() => action(t("notice.payeeSaved"))}>
              {t("payees.add")}
            </button>
          </div>

          <div className="table-scroll" style={{ marginTop: 18 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>{t("payees.columns.name")}</th>
                  <th>{t("payees.columns.account")}</th>
                  <th>{t("payees.columns.risk")}</th>
                  <th>{t("payees.columns.limit")}</th>
                </tr>
              </thead>
              <tbody>
                {payeeRows.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.account}</td>
                    <td>
                      <span className={`status ${row.risk === t("status.verified") ? "ok" : "gray"}`}>{row.risk}</span>
                    </td>
                    <td>{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "refund" && (
        <div className="panel">
          <h2>{t("refund.title")}</h2>
          <p className="lx-section-sub">{t("refund.subtitle")}</p>

          <div className="grid two" style={{ marginTop: 18 }}>
            <div className="field">
              <label>{t("refund.customer")}</label>
              <input defaultValue="Jade & Co." />
            </div>
            <div className="field">
              <label>{t("refund.amount")}</label>
              <input defaultValue="$2,380.00" />
            </div>
          </div>

          <div className="actions">
            <button className="primary lx-cta" type="button" onClick={() => action(t("notice.refundQueued"))}>
              {t("refund.submit")}
            </button>
            <button className="ghost" type="button">{t("refund.retry")}</button>
          </div>

          <div className="table-scroll" style={{ marginTop: 18 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>{t("refund.columns.id")}</th>
                  <th>{t("refund.columns.customer")}</th>
                  <th>{t("refund.columns.reason")}</th>
                  <th>{t("refund.columns.amount")}</th>
                  <th>{t("refund.columns.status")}</th>
                </tr>
              </thead>
              <tbody>
                {refundRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.customer}</td>
                    <td>{row.reason}</td>
                    <td>{row.amount}</td>
                    <td>
                      <span className={`status ${row.status === t("status.completed") ? "ok" : row.status === t("status.processing") ? "warn" : "gray"}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
