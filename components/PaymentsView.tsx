"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardShell from "./DashboardShell";

const TABS = ["bulk", "link", "reconcile", "payee", "refund"] as const;

type TabKey = (typeof TABS)[number];
type ModalType =
  | "evidence"
  | "schedule"
  | "link"
  | "manualReview"
  | "beneficiary"
  | null;

export default function PaymentsView() {
  const t = useTranslations("payments");
  const [tab, setTab] = useState<TabKey>("bulk");
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [notice, setNotice] = useState("");
  const [modal, setModal] = useState<ModalType>(null);

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
    {
      id: "BULK-20260802-017",
      status: t("status.processing"),
      detail: "81 / 2 · T+1",
    },
    {
      id: "BULK-20260811-042",
      status: t("status.review"),
      detail: "14 / 0 · T+0",
    },
    {
      id: "BULK-20260818-118",
      status: t("status.completed"),
      detail: "312 / 0 · T+1",
    },
  ];

  const payeeRows = [
    {
      key: "globalSupply",
      name: t("payees.rows.globalSupply.name"),
      type: t("payees.rows.globalSupply.type"),
      purpose: t("payees.rows.globalSupply.purpose"),
      status: t("payees.verified"),
      lastUsedLabel: t("payees.lastUsedToday"),
      canUse: true,
    },
    {
      key: "dbsVendor",
      name: t("payees.rows.dbsVendor.name"),
      type: t("payees.rows.dbsVendor.type"),
      purpose: t("payees.rows.dbsVendor.purpose"),
      status: t("payees.verified"),
      lastUsedLabel: t("payees.lastUsedYesterday"),
      canUse: true,
    },
    {
      key: "orbit",
      name: t("payees.rows.orbit.name"),
      type: t("payees.rows.orbit.type"),
      purpose: t("payees.rows.orbit.purpose"),
      status: t("payees.pending"),
      lastUsedLabel: "Jul 28",
      canUse: false,
    },
  ];

  const reconcileRows = [
    {
      reference: "A-8842",
      side: "Bank settlement",
      amount: "$18,430",
      status: t("status.completed"),
    },
    {
      reference: "A-9110",
      side: "Orders + invoice",
      amount: "$9,760",
      status: t("status.review"),
    },
    {
      reference: "A-9154",
      side: "Card payout",
      amount: "$5,660",
      status: t("status.processing"),
    },
  ];

  const refundRows = [
    {
      id: "RF-20260818-110",
      customer: "Jade & Co.",
      amount: "$2,380",
      reason: t("refund.reasonMismatch"),
      status: t("status.review"),
    },
    {
      id: "RF-20260817-402",
      customer: "Quasar Labs",
      amount: "$8,120",
      reason: t("refund.reasonDuplicate"),
      status: t("status.processing"),
    },
    {
      id: "RF-20260811-917",
      customer: "EverGlow",
      amount: "$1,940",
      reason: t("refund.reasonLost"),
      status: t("status.completed"),
    },
  ];

  const uploadChecklist = [
    {
      label: t("batch.checklist.columns.label"),
      value: t("batch.checklist.columns.value"),
    },
    {
      label: t("batch.checklist.mapping.label"),
      value: t("batch.checklist.mapping.value"),
    },
    {
      label: t("batch.checklist.compliance.label"),
      value: t("batch.checklist.compliance.value"),
    },
  ];

  const progressPipeline = [
    {
      title: t("batch.pipeline.parse"),
      detail: "12:48 · " + t("batch.pipeline.parseDetail"),
      state: "ok",
    },
    {
      title: t("batch.pipeline.review"),
      detail: "12:56 · " + t("batch.pipeline.reviewDetail"),
      state: "warn",
    },
    {
      title: t("batch.pipeline.settle"),
      detail: "13:05 · " + t("batch.pipeline.settleDetail"),
      state: "gray",
    },
  ];

  const batchProgressStats = [
    { label: t("batch.metrics.success.label"), value: "624" },
    { label: t("batch.metrics.failed.label"), value: "12" },
    { label: t("batch.metrics.processing.label"), value: "364" },
  ];

  const batchRows = [
    {
      id: "PAY-000624",
      result: t("batch.progress.results.success"),
      amount: "USD 18,430",
      status: t("status.completed"),
    },
    {
      id: "PAY-000626",
      result: t("batch.progress.results.processing"),
      amount: "USD 5,660",
      status: t("status.processing"),
    },
    {
      id: "PAY-000625",
      result: t("batch.progress.results.review"),
      amount: "USD 9,760",
      status: t("status.review"),
    },
  ];

  const statusClass = (status: string) => {
    if (status === t("status.completed")) return "ok";
    if (status === t("status.processing")) return "warn";
    return "red";
  };

  const evidenceNote = t("batch.modal.evidenceNote");
  const cancelLabel = t("batch.modal.cancel");
  const evidencePurpose = t("batch.modal.purpose");
  const purposeRequired = t("batch.modal.required");
  const trackingLabel = t("batch.modal.logistics");
  const invoiceLabel = t("batch.modal.invoice");
  const screenshotLabel = t("batch.modal.screenshot");
  const docsLabel = t("batch.modal.documents");
  const docsHint = t("batch.modal.documentHint");
  const consentLabel = t("batch.modal.confirm");
  const scheduleRecipient = t("batch.modal.recipient");
  const scheduleCycle = t("batch.modal.cycle");
  const scheduleAmount = t("batch.modal.amount");
  const successScheduleText = t("batch.modal.scheduleSuccess");

  const renderBatchProgressTable = () => (
    <table className="table" style={{ marginTop: 14 }}>
      <thead>
        <tr>
          <th>{t("batch.progress.table.id")}</th>
          <th>{t("batch.progress.table.result")}</th>
          <th>{t("batch.progress.table.amount")}</th>
          <th>{t("batch.progress.table.status")}</th>
        </tr>
      </thead>
      <tbody>
        {batchRows.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.result}</td>
            <td>{row.amount}</td>
            <td>
              <span className={`status ${statusClass(row.status)}`}>
                {row.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderProgressPanel = () => (
    <div className="batch-progress">
      <div className="batch-progress__head">
        <div>
          {/* <span className="batch-progress__eyebrow">{t("batch.progress.eyebrow")}</span> */}
          <h2>{t("batch.progressTitle")}</h2>
          {/* <p>
            {t("batch.progress.batchId")}: <b>BULK-20260828-126</b>
          </p> */}
        </div>
      </div>
      {/* <div className="batch-progress__summary">
        <div><small>{t("batch.progress.total")}</small><strong>1,000</strong></div>
        <div><small>{t("batch.progress.started")}</small><strong>12:48</strong></div>
        <div><small>{t("batch.progress.estimated")}</small><strong>13:18</strong></div>
      </div> */}
      {/* <div className="batch-progress__bar-label">
        <b>{t("batch.progressLabel")}</b>
        <span>636 / 1,000</span>
      </div> */}
      <div className="progress-track">
        <span style={{ width: "64%" }} />
      </div>
      <div className="grid three batch-progress__metrics">
        {batchProgressStats.map((item) => (
          <div key={item.label} className="metric lx-panel">
            <small>{item.label}</small>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
      {/* <div className="batch-progress__stages">
        {progressPipeline.map((item, index) => (
          <div key={item.title} className={`batch-progress__stage ${item.state}`}>
            <span>{item.state === "ok" ? "✓" : index + 1}</span>
            <div><strong>{item.title}</strong><small>{item.detail}</small></div>
          </div>
        ))}
      </div> */}
      <div className="batch-progress__table-head">
        <h3>{t("batch.progress.recent")}</h3>
        <button className="ghost mini" type="button">
          {t("batch.export")}
        </button>
      </div>
      <div className="table-scroll">{renderBatchProgressTable()}</div>
    </div>
  );

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
          className="lx-cta"
          type="button"
          onClick={() => {
            setModal("link");
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
          <div className="panel payment-evidence-panel lx-panel">
            <div className="section-head">
              <div>
                <h2>{t("batch.title")}</h2>
                <p>{t("batch.evidenceDescription")}</p>
              </div>
              <span className="status warn">{t("batch.evidenceRequired")}</span>
            </div>
            <div className="grid four">
              {[
                ["purpose", "purposeExample"],
                ["logistics", "logisticsExample"],
                ["screenshot", "screenshotExample"],
                ["invoice", "invoiceExample"],
              ].map(([label, example], index) => (
                <div className="metric lx-panel" key={label}>
                  <small>{t(`batch.evidence.${label}`)}</small>
                  <strong>
                    {index === 0
                      ? t("batch.evidence.required")
                      : t("batch.evidence.optional")}
                  </strong>
                  <span className="metric-tip">
                    {t(`batch.evidence.${example}`)}
                  </span>
                </div>
              ))}
            </div>
            <div className="actions">
              <button
                className="primary lx-cta"
                type="button"
                onClick={() => {
                  setModal("evidence");
                  action(t("notice.purposeReady"));
                }}
              >
                {t("batch.addEvidence")}
              </button>
              <button
                className="ghost"
                type="button"
                onClick={() => action(t("batch.evidencePolicyNotice"))}
              >
                {t("batch.viewEvidencePolicy")}
              </button>
            </div>
          </div>

          <div className="grid two payment-lower">
            <article className="panel lx-panel">
              <h2>{t("batch.uploadTitle")}</h2>
              <div className="upload">
                <b>{t("batch.uploadHint")}</b>
                <p>{t("batch.tips")}</p>
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
                  <span className="file-picker-button">
                    {t("batch.chooseFile")}
                  </span>
                  <span
                    className={`file-picker-name ${uploaded ? "has-file" : ""}`}
                  >
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
                <div className="metric lx-panel">
                  <small>{t("batch.metrics.valid.label")}</small>
                  <strong>
                    {uploaded ? t("batch.metrics.valid.value") : "0"}
                  </strong>
                </div>
                <div className="metric lx-panel">
                  <small>{t("batch.metrics.abnormal.label")}</small>
                  <strong>
                    {uploaded ? t("batch.metrics.abnormal.value") : "0"}
                  </strong>
                </div>
                <div className="metric lx-panel">
                  <small>{t("batch.metrics.amount.label")}</small>
                  <strong>
                    {uploaded ? t("batch.metrics.amount.value") : "--"}
                  </strong>
                </div>
              </div>

              <div className="actions">
                <button
                  className="lx-cta"
                  type="button"
                  onClick={() => action(t("notice.batchSubmitted"))}
                >
                  {t("batch.submit")}
                </button>
                <button
                  className="ghost"
                  type="button"
                  onClick={() => setModal("evidence")}
                >
                  {t("batch.addEvidence")}
                </button>
                <button
                  className="ghost"
                  type="button"
                  onClick={() => action(t("notice.correctionMerged"))}
                >
                  {t("batch.mergeCorrection")}
                </button>
                <button className="ghost" type="button">
                  {t("batch.saveTemplate")}
                </button>
                <button
                  className="ghost"
                  type="button"
                  onClick={() => setModal("schedule")}
                >
                  {t("batch.schedule")}
                </button>
              </div>
            </article>

            <article className="panel lx-panel">
              {renderProgressPanel()}
            </article>
          </div>

          {/* <div className="panel" style={{ marginTop: 24 }}>
            <h2>{t("batch.checklist.title")}</h2>
            <div className="checklist">
              {uploadChecklist.map((item) => (
                <div key={item.label} className="checklist-item">
                  <span className="checklist-label">{item.label}</span>
                  <span className="checklist-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel" style={{ marginTop: 24 }}>
            <h2>{t("batch.pipeline.title")}</h2>
            <div className="pipeline">
              {progressPipeline.map((item) => (
                <div key={item.title} className="pipeline-item">
                  <div className="pipeline-dot" style={{ backgroundColor: item.state === "ok" ? "#4caf50" : item.state === "warn" ? "#ff9800" : "#e0e0e0" }} />
                  <div className="pipeline-content">
                    <strong>{item.title}</strong>
                    <span>{item.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </>
      )}

      {tab === "link" && (
        <div className="grid two">
          <article className="panel lx-panel">
            <h2>{t("link.title")}</h2>
            <div className="form-grid payment-link-form">
              <div className="field">
                <label>{t("link.amount")}</label>
                <input defaultValue="125.50" />
              </div>
              <div className="field">
                <label>{t("link.currency")}</label>
                <select defaultValue="USD">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>HKD</option>
                  <option>SGD</option>
                  <option>USDC</option>
                </select>
              </div>
              <div className="field">
                <label>{t("link.expiry")}</label>
                <select defaultValue="7 days">
                  <option>7 days</option>
                  <option>24 hours</option>
                  <option>30 days</option>
                </select>
              </div>
              <div className="field">
                <label>{t("link.orderId")}</label>
                <input defaultValue="PL_MOCK_ACTIVE" />
              </div>
            </div>

            <div className="actions">
              <button
                className="lx-cta"
                type="button"
                onClick={() => action(t("notice.linkCreated"))}
              >
                {t("link.generate")}
              </button>
              <button
                className="ghost"
                type="button"
                onClick={() => action(t("notice.linkCopied"))}
              >
                {t("link.copy")}
              </button>
            </div>
          </article>

          <article className="panel payment-checkout-card lx-panel">
            <h2>{t("link.checkout")}</h2>
            <div className="payment-checkout-content">
              <div className="qr" aria-label={t("link.qrLabel")} />
              <div>
                <p className="status ok">{t("link.awaiting")}</p>
                <h3>125.50 USD</h3>
                <p>{t("link.methods")}</p>
                <button
                  className="mini lx-cta"
                  type="button"
                  onClick={() => action(t("notice.paymentMarked"))}
                >
                  {t("link.simulatePaid")}
                </button>
              </div>
            </div>
          </article>
        </div>
      )}

      {tab === "reconcile" && (
        <div className="panel lx-panel">
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
                      <span
                        className={`status ${row.status === t("status.completed") ? "ok" : row.status === t("status.processing") ? "warn" : "gray"}`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="actions">
            <button
              className="lx-cta"
              type="button"
              onClick={() => action(t("notice.reconcileRun"))}
            >
              {t("reconcile.run")}
            </button>
            <button
              className="ghost"
              type="button"
              onClick={() => setModal("manualReview")}
            >
              {t("reconcile.detail")}
            </button>
          </div>
        </div>
      )}

      {tab === "payee" && (
        <div className="panel lx-panel">
          <div className="section-head">
            <div>
              <h2>{t("payees.title")}</h2>
              <p>{t("payees.subtitle")}</p>
            </div>
            <button
              className="lx-cta"
              type="button"
              onClick={() => setModal("beneficiary")}
            >
              {t("payees.add")}
            </button>
          </div>

          <div className="form-grid beneficiary-filters">
            <div className="field">
              <label>{t("payees.search")}</label>
              <input placeholder={t("payees.searchPlaceholder")} />
            </div>
            <div className="field">
              <label>{t("payees.type")}</label>
              <select defaultValue="all">
                <option value="all">{t("payees.allTypes")}</option>
                <option value="bank">{t("payees.bank")}</option>
                <option value="wallet">{t("payees.wallet")}</option>
                <option value="swift">{t("payees.swift")}</option>
                <option value="internal">{t("payees.internal")}</option>
              </select>
            </div>
            <div className="field">
              <label>{t("payees.filterStatusLabel")}</label>
              <select defaultValue="verified">
                <option value="verified">{t("payees.filterDefault")}</option>
                <option value="pending">{t("payees.pending")}</option>
                <option value="blocked">{t("payees.blocked")}</option>
              </select>
            </div>
          </div>

          <div className="table-scroll" style={{ marginTop: 18 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>{t("payees.columns.name")}</th>
                  <th>{t("payees.columns.type")}</th>
                  <th>{t("payees.columns.defaultPurpose")}</th>
                  <th>{t("payees.columns.status")}</th>
                  <th>{t("payees.columns.lastUsed")}</th>
                  <th>{t("payees.columns.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {payeeRows.map((row) => {
                  const isVerified = row.status === t("payees.verified");
                  const statusClass = isVerified
                    ? "ok"
                    : row.status === t("payees.pending")
                      ? "warn"
                      : "gray";
                  return (
                    <tr key={row.key}>
                      <td>{row.name}</td>
                      <td>{row.type}</td>
                      <td>{row.purpose}</td>
                      <td>
                        <span className={`status ${statusClass}`}>
                          {row.status}
                        </span>
                      </td>
                      <td>{row.lastUsedLabel}</td>
                      <td>
                        {row.canUse ? (
                          <button
                            className="ghost mini"
                            type="button"
                            onClick={() =>
                              action(t("notice.payeeUsed", { name: row.name }))
                            }
                          >
                            {t("payees.actions.use")}
                          </button>
                        ) : (
                          <button
                            className="ghost mini"
                            type="button"
                            onClick={() => setModal("beneficiary")}
                          >
                            {t("payees.actions.verify")}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "refund" && (
        <div className="grid two">
          <div className="panel lx-panel">
            <h2>{t("refund.requestTitle")}</h2>
            <div className="form-grid" style={{ marginTop: 18 }}>
              <div className="field">
                <label>{t("refund.orderId")}</label>
                <input defaultValue="ORD-202607-0821" />
              </div>
              <div className="field">
                <label>{t("refund.amount")}</label>
                <input defaultValue="$88.00 USD" />
              </div>
              <div className="field">
                <label>{t("refund.reason")}</label>
                <select defaultValue="customer">
                  <option value="customer">{t("refund.reasonCustomer")}</option>
                  <option value="duplicate">
                    {t("refund.reasonDuplicate")}
                  </option>
                  <option value="chargeback">
                    {t("refund.reasonChargeback")}
                  </option>
                </select>
              </div>
              <div className="field">
                <label>{t("refund.approval")}</label>
                <select defaultValue="required">
                  <option value="required">{t("refund.approvalValue")}</option>
                </select>
              </div>
            </div>
            <div className="actions">
              <button
                className="lx-cta"
                type="button"
                onClick={() => action(t("notice.refundQueued"))}
              >
                {t("refund.submit")}
              </button>
            </div>
          </div>
          <div className="panel lx-panel">
            <h2>{t("refund.title")}</h2>
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
                        <span
                          className={`status ${row.status === t("status.completed") ? "ok" : row.status === t("status.processing") ? "warn" : "gray"}`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="ghost"
              type="button"
              onClick={() => action(t("refund.retryNotice"))}
            >
              {t("refund.retry")}
            </button>
          </div>
        </div>
      )}

      {modal && (
        <div
          className="lx-checkout-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setModal(null);
            }
          }}
        >
          <section
            className="lx-checkout-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="payments-modal-title"
          >
            <div className="lx-checkout-modal__head">
              <h2 id="payments-modal-title">
                {modal === "manualReview"
                  ? t("reconcile.reviewTitle")
                  : modal === "beneficiary"
                    ? t("payees.form.title")
                    : modal === "evidence"
                      ? t("batch.modal.evidenceTitle")
                      : modal === "schedule"
                        ? t("batch.modal.scheduleTitle")
                        : t("link.title")}
              </h2>
              <button
                className="lx-checkout-modal__close"
                type="button"
                aria-label={t("batch.modal.close")}
                onClick={() => setModal(null)}
              >
                ×
              </button>
            </div>

            {modal === "beneficiary" ? (
              <>
                <div className="auth-note" style={{ gridColumn: "1 / -1" }}>
                  {t("payees.form.note")}
                </div>
                <div
                  className="lx-checkout-form"
                  style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
                >
                  <label>
                    <span>{t("payees.form.name")}</span>
                    <input defaultValue={t("payees.form.name")} />
                  </label>
                  <label>
                    <span>{t("payees.form.type")}</span>
                    <select defaultValue="bank">
                      <option value="bank">{t("payees.form.bank")}</option>
                      <option value="wallet">{t("payees.form.wallet")}</option>
                      <option value="internal">
                        {t("payees.form.internal")}
                      </option>
                    </select>
                  </label>
                  <label>
                    <span>{t("payees.form.contact")}</span>
                    <input defaultValue="vendor@global-supply.com" />
                  </label>
                  <label>
                    <span>{t("payees.form.network")}</span>
                    <input defaultValue="SWIFT · DBSSSGSG / TRC20" />
                  </label>
                  <label>
                    <span>{t("payees.form.account")}</span>
                    <input defaultValue="885-901-229-1" />
                  </label>
                  <label>
                    <span>{t("payees.form.purpose")}</span>
                    <input defaultValue={t("payees.form.purposeValue")} />
                  </label>
                  <label style={{ gridColumn: "1 / -1" }}>
                    <span>{t("payees.form.notes")}</span>
                    <textarea
                      rows={3}
                      defaultValue={t("payees.form.notesValue")}
                    />
                  </label>

                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontWeight: 600,
                      color: "#34435e",
                    }}
                  >
                    <input type="checkbox" defaultChecked />
                    <span style={{ whiteSpace: "nowrap", marginBottom: "0" }}>
                      {t("payees.form.confirm")}
                    </span>
                  </label>

                  <div
                    className="lx-checkout-modal__actions"
                    style={{ gridColumn: "1 / -1" }}
                  >
                    <button
                      className="lx-cta"
                      type="button"
                      onClick={() => {
                        setModal(null);
                        action(t("notice.payeeSaved"));
                      }}
                    >
                      {t("payees.form.submit")}
                    </button>
                    <button
                      className="ghost"
                      type="button"
                      onClick={() => setModal(null)}
                    >
                      {cancelLabel}
                    </button>
                  </div>
                </div>
              </>
            ) : modal === "manualReview" ? (
              <div
                className="lx-checkout-form"
                style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
              >
                <div className="auth-note" style={{ gridColumn: "1 / -1" }}>
                  {t("reconcile.reviewNote")}
                </div>
                <label>
                  <span>{t("reconcile.reviewReference")}</span>
                  <input defaultValue="A-9110" />
                </label>
                <label>
                  <span>{t("reconcile.reviewSource")}</span>
                  <select defaultValue="invoice">
                    <option value="invoice">
                      {t("reconcile.reviewInvoice")}
                    </option>
                    <option value="bank">{t("reconcile.reviewBank")}</option>
                  </select>
                </label>
                <label style={{ gridColumn: "1 / -1" }}>
                  <span>{t("reconcile.reviewComment")}</span>
                  <textarea
                    rows={4}
                    defaultValue={t("reconcile.reviewCommentValue")}
                  />
                </label>
                <div
                  className="lx-checkout-modal__actions"
                  style={{ gridColumn: "1 / -1" }}
                >
                  <button
                    className="lx-cta"
                    type="button"
                    onClick={() => {
                      setModal(null);
                      action(t("notice.reviewSubmitted"));
                    }}
                  >
                    {t("reconcile.submitReview")}
                  </button>
                  <button
                    className="ghost"
                    type="button"
                    onClick={() => setModal(null)}
                  >
                    {cancelLabel}
                  </button>
                </div>
              </div>
            ) : modal === "evidence" ? (
              <>
                <div className="auth-note">{evidenceNote}</div>
                <div
                  className="lx-checkout-form"
                  style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
                >
                  <label style={{ gridColumn: "1 / -1" }}>
                    <div>
                      <span>{evidencePurpose}</span>
                      <b style={{ color: "#d92d20", marginLeft: "8px" }}>
                        {purposeRequired}
                      </b>
                    </div>
                    <textarea
                      defaultValue={t("batch.modal.purposeValue")}
                      rows={4}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #d9e1ed",
                        borderRadius: "9px",
                        resize: "vertical",
                      }}
                    />
                  </label>

                  <label>
                    <span>{trackingLabel}</span>
                    <input defaultValue={t("batch.modal.logisticsValue")} />
                  </label>

                  <label>
                    <span>{invoiceLabel}</span>
                    <input defaultValue={t("batch.modal.invoiceValue")} />
                  </label>
                </div>
                <div style={{ marginTop: "16px" }}>
                  <label className="lx-checkout-row">
                    <span>{screenshotLabel}</span>
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
                            action(
                              t("notice.fileParsed", { file: nextFile.name }),
                            );
                          }
                        }}
                      />

                      <span className="file-picker-button">
                        {t("batch.chooseFile")}
                      </span>
                      <span
                        className={`file-picker-name ${uploaded ? "has-file" : ""}`}
                      >
                        {uploaded ? fileName : t("batch.empty")}
                      </span>
                    </label>
                  </label>
                  <label className="lx-checkout-row">
                    <span>{docsLabel}</span>
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
                            action(
                              t("notice.fileParsed", { file: nextFile.name }),
                            );
                          }
                        }}
                      />

                      <span className="file-picker-button">
                        {t("batch.chooseFile")}
                      </span>
                      <span
                        className={`file-picker-name ${uploaded ? "has-file" : ""}`}
                      >
                        {uploaded ? fileName : t("batch.empty")}
                      </span>
                    </label>
                    <p>{docsHint}</p>
                  </label>

                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      fontWeight: 600,
                      color: "#34435e",
                    }}
                  >
                    <input type="checkbox" defaultChecked />
                    <span style={{ whiteSpace: "nowrap" }}>{consentLabel}</span>
                  </label>
                </div>
                <div
                  className="lx-checkout-modal__actions"
                  style={{ gridColumn: "1 / -1" }}
                >
                  <button
                    className="lx-cta"
                    type="button"
                    onClick={() => {
                      setModal(null);
                      action(t("notice.purposeReady"));
                    }}
                  >
                    {t("batch.fields.submit")}
                  </button>
                  <button
                    className="ghost"
                    type="button"
                    onClick={() => setModal(null)}
                  >
                    {cancelLabel}
                  </button>
                </div>
              </>
            ) : modal === "link" ? (
              <div
                className="lx-checkout-form"
                style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
              >
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
                    <option>USDC</option>
                  </select>
                </div>
                <div className="field">
                  <label>{t("link.amount")}</label>
                  <input defaultValue="125.50" />
                </div>
                <div className="field">
                  <label>{t("link.expiry")}</label>
                  <select defaultValue={t("link.expiryValue")}>
                    <option>{t("link.expiryValue")}</option>
                    <option>{t("link.expiry48")}</option>
                    <option>{t("link.expiry72")}</option>
                  </select>
                </div>

                <div
                  className="lx-checkout-modal__actions"
                  style={{ gridColumn: "1 / -1" }}
                >
                  <button
                    className="lx-cta"
                    type="button"
                    onClick={() => {
                      setModal(null);
                      action(t("notice.linkCreated"));
                    }}
                  >
                    {t("link.create")}
                  </button>
                  <button
                    className="ghost"
                    type="button"
                    onClick={() => setModal(null)}
                  >
                    {cancelLabel}
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="lx-checkout-form"
                style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
              >
                <label>
                  <span>{scheduleRecipient}</span>
                  <input defaultValue={t("batch.modal.recipientValue")} />
                </label>

                <label>
                  <span>{scheduleCycle}</span>
                  <select defaultValue="monthly">
                    <option value="monthly">
                      {t("batch.modal.cycleMonthly")}
                    </option>
                    <option value="weekly">
                      {t("batch.modal.cycleWeekly")}
                    </option>
                    <option value="quarterly">
                      {t("batch.modal.cycleQuarterly")}
                    </option>
                  </select>
                </label>

                <label style={{ gridColumn: "1 / -1" }}>
                  <span>{scheduleAmount}</span>
                  <input defaultValue={t("batch.modal.amountValue")} />
                </label>

                <div
                  className="lx-checkout-modal__actions"
                  style={{ gridColumn: "1 / -1" }}
                >
                  <button
                    className="lx-cta"
                    type="button"
                    onClick={() => {
                      setModal(null);
                      action(successScheduleText);
                    }}
                  >
                    {t("batch.schedule")}
                  </button>
                  <button
                    className="ghost"
                    type="button"
                    onClick={() => setModal(null)}
                  >
                    {cancelLabel}
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </DashboardShell>
  );
}
