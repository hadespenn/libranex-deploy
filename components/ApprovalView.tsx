"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardShell from "./DashboardShell";

type Tab = "pending" | "history" | "policy";
type ApprovalAction = "approve" | "reject" | "details";
export default function ApprovalView() {
  const t = useTranslations("approval");
  const c = t.raw("ui") as Record<string, string>;
  const [tab, setTab] = useState<Tab>("pending");
  const [notice, setNotice] = useState("");
  const [dialog, setDialog] = useState<"policy" | "delegation" | null>(null);
  const [requestDialog, setRequestDialog] = useState<{
    action: ApprovalAction;
    row: string[];
  } | null>(null);
  const act = () => {
    setNotice(c.done);
    window.setTimeout(() => setNotice(""), 2200);
  };
  const rows = [
    [c.payment, c.supplier, c.newPayee, c.single, "18m"],
    [c.batch, c.chen, c.medium, c.batchRule, "2h"],
    [c.limit, c.lin, c.high, c.dual, c.today],
  ];
  return (
    <DashboardShell
      active="approval"
      headerTitle={t("header.title")}
      headerSubtitle={t("header.subtitle")}
    >
      <div className="lx-management-hero">
        <div>
          <h2 className="lx-section-title">{t("hero.title")}</h2>
          <p className="lx-section-sub">
            {c.evidenceText}
          </p>
        </div>
        <button
          className="lx-outline-btn"
          onClick={() => setDialog("delegation")}
        >
          {c.delegate}
        </button>
      </div>
      <div className="lx-management-stats">
        {(["pending", "today", "approved", "rejected"] as const).map((k) => (
          <article className="lx-panel lx-management-stat" key={k}>
            <span>{t(`stats.${k}.label`)}</span>
            <strong>{t(`stats.${k}.value`)}</strong>
            <small>{t(`stats.${k}.hint`)}</small>
          </article>
        ))}
      </div>
      <div className="lx-approval-tabs">
        {(["pending", "history", "policy"] as Tab[]).map((k) => (
          <button
            className={tab === k ? "active" : ""}
            onClick={() => setTab(k)}
            key={k}
          >
            {c[k]}
          </button>
        ))}
      </div>
      {tab === "pending" && (
        <section className="lx-panel lx-approval-panel">
          <div className="lx-section-header">
            <div>
              <h2 className="lx-section-title">{t("section.title")}</h2>
              <p className="lx-section-sub">{t("section.subtitle")}</p>
            </div>
          </div>
          <ApprovalTable
            rows={rows}
            c={c}
            onAction={(action, row) => setRequestDialog({ action, row })}
          />
        </section>
      )}
      {tab === "history" && (
        <section className="lx-panel lx-approval-panel">
          <h2 className="lx-section-title">{c.history}</h2>
          <ApprovalHistory c={c} />
        </section>
      )}
      {tab === "policy" && (
        <div className="lx-approval-grid">
          <section className="lx-panel lx-approval-panel">
            <h2 className="lx-section-title">{c.policyTitle}</h2>
            <div className="lx-approval-form">
              {[
                [c.external, c.threshold],
                [c.bulk, c.always],
                [c.changes, c.mfa],
                [c.timeout, c.auto],
              ].map(([l, v]) => (
                <label key={l}>
                  {l}
                  <select defaultValue={v}>
                    <option>{v}</option>
                  </select>
                </label>
              ))}
            </div>
            <button className="lx-cta" onClick={() => setDialog("policy")}>
              {c.save}
            </button>
          </section>
          <section className="lx-panel lx-approval-panel">
            <h2 className="lx-section-title">{c.separation}</h2>
            <p className="lx-section-sub">{c.separationDesc}</p>
            <button className="lx-outline-btn" onClick={act}>
              {c.manage}
            </button>
          </section>
        </div>
      )}
      {notice && <div className="lx-toast">{notice}</div>}
      {dialog && (
        <div
          className="lx-approval-modal"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.target === e.currentTarget && setDialog(null)}
        >
          <div className="lx-approval-modal__panel">
            <div className="lx-approval-modal__head">
              <h2>
                {dialog === "policy" ? c.policyDialogTitle : c.delegationTitle}
              </h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setDialog(null)}
              >
                ×
              </button>
            </div>
            <p className="lx-section-sub">
              {dialog === "policy" ? c.policyDialogNote : c.delegationNote}
            </p>
            {dialog === "policy" ? (
              <div className="lx-approval-modal__rules">
                {[
                  [c.external, c.threshold],
                  [c.bulk, c.always],
                  [c.changes, c.mfa],
                  [c.timeout, c.auto],
                ].map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <b>{value}</b>
                  </div>
                ))}
              </div>
            ) : (
              <div className="lx-approval-form lx-approval-modal__form">
                <label>
                  {c.delegateTo}
                  <select defaultValue="lin">
                    <option value="lin">{c.lin}</option>
                    <option value="chen">{c.chen}</option>
                  </select>
                </label>
                <label>
                  {c.startDate}
                  <input type="date" defaultValue="2026-08-28" />
                </label>
                <label>
                  {c.endDate}
                  <input type="date" defaultValue="2026-09-04" />
                </label>
                <label>
                  {c.reason}
                  <input defaultValue={c.reasonValue} />
                </label>
              </div>
            )}
            <div className="lx-approval-modal__actions">
              <button
                className="lx-outline-btn"
                type="button"
                onClick={() => setDialog(null)}
              >
                {c.cancel}
              </button>
              <button
                className="lx-cta"
                type="button"
                onClick={() => {
                  setDialog(null);
                  act();
                }}
              >
                {c.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
      {requestDialog && (
        <div
          className="lx-approval-modal"
          role="dialog"
          aria-modal="true"
          onClick={(e) =>
            e.target === e.currentTarget && setRequestDialog(null)
          }
        >
          <div className="lx-approval-modal__panel">
            <div className="lx-approval-modal__head">
              <h2>
                {c[`${requestDialog.action}Title`] || requestDialog.action} ·{" "}
                {requestDialog.row[0].split("·").pop()?.trim()}
              </h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setRequestDialog(null)}
              >
                ×
              </button>
            </div>
            {requestDialog.action === "details" ? (
              <>
                <div className="lx-approval-modal__rules">
                  {[
                    [c.request, requestDialog.row[0]],
                    [c.requester, requestDialog.row[1]],
                    [c.rule, requestDialog.row[3]],
                    [c.amount, requestDialog.row[2]],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <span>{label}</span>
                      <b>{value}</b>
                    </div>
                  ))}
                </div>
                <div className="lx-approval-detail-tabs">
                  <b>{c.detailSummary}</b>
                  <span>{c.detailEvidence}</span>
                  <span>{c.detailAudit}</span>
                </div>
                <p>{c.detailSummaryText}</p>
                <div className="lx-approval-timeline">
                  <div className="lx-approval-row">
                    <b>1</b><div className="lx-approval-content"><h4> {c.submitted}</h4><span> {c.submittedText}</span></div>
                  </div>
                  <div className="lx-approval-row">
                    <b>2</b><div className="lx-approval-content"><h4> {c.automated}</h4><span>{c.automatedText}</span></div>
                  </div>
                  <div className="lx-approval-row">
                    <b>3</b> <div className="lx-approval-content"><h4>{c.awaiting}</h4><span>{c.awaitingText}</span></div>
                  </div>
                </div>
                {/* <div className="lx-approval-evidence">{c.evidenceText}</div>
                <div className="lx-approval-audit">
                  <b>{c.created}</b>
                  <span>2026-07-31 09:12</span>
                  <b>{c.lastAction}</b>
                  <span>{c.detailStatus}</span>
                </div> */}
              </>
            ) : (
              <>
                <p className="lx-section-sub">
                  {requestDialog.action === "approve"
                    ? c.approveNote.replace("{request}", requestDialog.row[0])
                    : c.rejectNote.replace("{request}", requestDialog.row[0])}
                </p>
                {requestDialog.action === "approve" ? (
                  <>
                    <label className="lx-approval-reason">
                      {c.approvalNote}
                      <textarea placeholder={c.approvalNotePlaceholder} />
                    </label>
                    <label className="lx-approval-check">
                      <input type="checkbox" /> {c.mfaConfirm}
                    </label>
                  </>
                ) : (
                  <label className="lx-approval-reason">
                    {c.rejectionReason}
                    <textarea placeholder={c.rejectionPlaceholder} />
                  </label>
                )}
              </>
            )}
            <div className="lx-approval-modal__actions">
              <button
                  style={{ display: requestDialog.action === "details" ? 'block' : 'none'}}
                  className="lx-approval-success"
                  type="button"
                  onClick={() => {
                    setRequestDialog(null);
                    act();
                  }}
                >
                  {c.approveApply}
                </button>
                  <button
                  style={{ display: requestDialog.action === "details" ? 'block' : 'none'}}
                  className="lx-approval-danger"
                  type="button"
                  onClick={() => {
                    setRequestDialog(null);
                    act();
                  }}
                >
                  {c.rejectApply}
                </button>
              <button
                className="lx-outline-btn"
                type="button"
                onClick={() => setRequestDialog(null)}
              >
                {requestDialog.action === "details"
                  ? c.close || c.cancel
                  : c.cancel}
              </button>
              {requestDialog.action !== "details" && (
                <button
                  className={
                    requestDialog.action === "approve"
                      ? "lx-approval-success"
                      : "lx-approval-danger"
                  }
                  type="button"
                  onClick={() => {
                    setRequestDialog(null);
                    act();
                  }}
                >
                  {requestDialog.action === "approve"
                    ? c.confirmApprove
                    : c.confirmReject}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
function ApprovalTable({
  rows,
  c,
  onAction,
}: {
  rows: string[][];
  c: Record<string, string>;
  onAction: (action: ApprovalAction, row: string[]) => void;
}) {
  return (
    <div className="lx-native-table-wrap">
      <table className="lx-native-table">
        <thead>
          <tr>
            {[c.request, c.requester, c.amount, c.rule, c.expiry, c.action].map(
              (x) => (
                <th key={x}>{x}</th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              <td>
                {r[0]}
                <small>
                  {r[0] === c.payment
                    ? c.supplier
                    : r[0] === c.batch
                      ? c.thousand
                      : c.daily}
                </small>
              </td>
              {r.slice(1).map((x, i) => (
                <td key={i}>{x}</td>
              ))}
              <td>
                <button
                  className="lx-approval-success"
                  onClick={() => onAction("approve", r)}
                >
                  {c.approve}
                </button>{" "}
                <button
                  className="lx-approval-danger"
                  onClick={() => onAction("reject", r)}
                >
                  {c.reject}
                </button>{" "}
                <button
                  className="lx-settings-ghost"
                  onClick={() => onAction("details", r)}
                >
                  {c.details}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function ApprovalHistory({ c }: { c: Record<string, string> }) {
  return (
    <div className="lx-native-table-wrap">
      <table className="lx-native-table">
        <thead>
          <tr>
            {[c.object, c.result, c.approver, c.time, c.action].map((x) => (
              <th key={x}>{x}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{c.refund}</td>
            <td>
              <span className="lx-status lx-status--success">{c.approved}</span>
            </td>
            <td>{c.lin}</td>
            <td>Yesterday 16:42</td>
            <td>
              <button className="lx-settings-ghost">{c.review}</button>
            </td>
          </tr>
          <tr>
            <td>BEN-021 · {c.beneficiary}</td>
            <td>
              <span className="lx-status lx-status--danger">{c.rejected}</span>
            </td>
            <td>Alex Morgan</td>
            <td>Yesterday 10:18</td>
            <td>
              <button className="lx-settings-ghost">{c.review}</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
