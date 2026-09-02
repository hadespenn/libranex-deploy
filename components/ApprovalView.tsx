"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardShell from "./DashboardShell";

type Tab = "pending" | "history" | "policy";
type ApprovalAction = "approve" | "reject" | "details";
type DetailTab = "summary" | "evidence" | "audit";
type DialogKind = "policy" | "delegation" | "approvers" | "invite";
export default function ApprovalView() {
  const t = useTranslations("approval");
  const c = t.raw("ui") as Record<string, string>;
  const [tab, setTab] = useState<Tab>("pending");
  const [notice, setNotice] = useState("");
  const [dialog, setDialog] = useState<DialogKind | null>(null);
  const [detailTab, setDetailTab] = useState<DetailTab>("summary");
  const [policyMfa, setPolicyMfa] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [requestDialog, setRequestDialog] = useState<{
    action: ApprovalAction;
    id: string;
    row: string[];
  } | null>(null);
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  };
  const act = () => notify(c.done);
  const openDetails = (id: string, row: string[]) => {
    setDetailTab("summary");
    setRequestDialog({ action: "details", id, row });
  };
  const openRequest = (action: ApprovalAction, row: string[]) => {
    const id = row[0].split("·").pop()?.trim() ?? "";
    if (action === "details") openDetails(id, row);
    else setRequestDialog({ action, id, row });
  };
  const rows = [
    [c.payment, c.supplier, c.newPayee, c.single, "18m"],
    [c.batch, c.chen, c.medium, c.batchRule, "2h"],
    [c.limit, c.lin, c.high, c.dual, c.today],
  ];
  const historyRows = [
    { id: "REF-202607-112", row: [c.refund, c.chen, c.refundRisk, c.single] },
    { id: "BEN-021", row: [c.beneficiaryRequest, c.lin, c.beneficiaryRisk, c.mfa] },
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
      {/* <div className="lx-management-stats">
        {(["pending", "today", "approved", "rejected"] as const).map((k) => (
          <article className="lx-panel lx-management-stat" key={k}>
            <span>{t(`stats.${k}.label`)}</span>
            <strong>{t(`stats.${k}.value`)}</strong>
            <small>{t(`stats.${k}.hint`)}</small>
          </article>
        ))}
      </div> */}
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
              <h2 className="">{t("section.title")}</h2>
              <p className="lx-section-sub">{t("section.subtitle")}</p>
            </div>
          </div>
          <ApprovalTable rows={rows} c={c} onAction={openRequest} />
        </section>
      )}
      {tab === "history" && (
        <section className="lx-panel lx-approval-panel">
          <h2 className="">{c.history}</h2>
          <ApprovalHistory c={c} rows={historyRows} onReview={openDetails} />
        </section>
      )}
      {tab === "policy" && (
        <div className="lx-approval-grid">
          <section className="lx-panel lx-approval-panel">
            <h2 className="">{c.policyTitle}</h2>
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
            <button
              className="lx-cta"
              onClick={() => {
                setPolicyMfa(false);
                setDialog("policy");
              }}
            >
              {c.save}
            </button>
          </section>
          <section className="lx-panel lx-approval-panel">
            <h2 className="">{c.separation}</h2>
            <p className="lx-section-sublx-section-tit">{c.separationDesc}</p>
            <button
              className="lx-outline-btn"
              onClick={() => setDialog("approvers")}
            >
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
                {dialog === "policy"
                  ? c.policyDialogTitle
                  : dialog === "delegation"
                    ? c.delegationTitle
                    : dialog === "approvers"
                      ? c.approversTitle
                      : c.inviteTitle}
              </h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setDialog(null)}
              >
                ×
              </button>
            </div>
            {dialog === "policy" && (
              <>
                <p className="lx-section-sub">{c.policyDialogNote}</p>
                <label className="lx-approval-check">
                  <input
                    type="checkbox"
                    checked={policyMfa}
                    onChange={(e) => setPolicyMfa(e.target.checked)}
                  />
                  {c.policyMfaConfirm}
                </label>
              </>
            )}
            {dialog === "delegation" && (
              <>
                <p className="lx-section-sub">{c.delegationNote}</p>
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
              </>
            )}
            {dialog === "approvers" && (
              <>
                <p className="lx-section-sub">{c.approversNote}</p>
                <div className="ops-data-list lx-approval-approvers">
                  <div className="ops-data">
                    <small>Finance</small>
                    <b>{c.lin}</b>
                    <span>{c.financeScope}</span>
                  </div>
                  <div className="ops-data">
                    <small>Compliance</small>
                    <b>Alex Morgan</b>
                    <span>{c.complianceScope}</span>
                  </div>
                </div>
              </>
            )}
            {dialog === "invite" && (
              <div className="lx-approval-form lx-approval-modal__form">
                <label>
                  {c.approverName}
                  <input
                    value={inviteName}
                    placeholder={c.approverNamePlaceholder}
                    onChange={(e) => setInviteName(e.target.value)}
                  />
                </label>
                <label>
                  {c.approverEmail}
                  <input
                    type="email"
                    value={inviteEmail}
                    placeholder="approver@company.com"
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </label>
              </div>
            )}
            <div className="lx-approval-modal__actions">
              {dialog === "approvers" ? (
                <button
                  className="lx-outline-btn"
                  type="button"
                  onClick={() => setDialog("invite")}
                >
                  {c.inviteApprover}
                </button>
              ) : (
                <button
                  className="lx-outline-btn"
                  type="button"
                  onClick={() => setDialog(null)}
                >
                  {c.cancel}
                </button>
              )}
              <button
                className="lx-cta"
                type="button"
                onClick={() => {
                  if (dialog === "policy" && !policyMfa) {
                    notify(c.policyMfaRequired);
                    return;
                  }
                  if (
                    dialog === "invite" &&
                    (!inviteName.trim() || !inviteEmail.trim())
                  ) {
                    notify(c.inviteRequired);
                    return;
                  }
                  setDialog(null);
                  if (dialog === "policy") {
                    setPolicyMfa(false);
                    notify(c.policySaved);
                  } else if (dialog === "invite") {
                    setInviteName("");
                    setInviteEmail("");
                    notify(c.inviteSent);
                  } else if (dialog === "delegation") {
                    act();
                  }
                }}
              >
                {dialog === "policy"
                  ? c.confirmSave
                  : dialog === "invite"
                    ? c.sendInvite
                    : dialog === "approvers"
                      ? c.doneBtn
                      : c.confirm}
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
                {requestDialog.id}
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
                  {(["summary", "evidence", "audit"] as DetailTab[]).map((k) => (
                    <div
                      key={k}
                      className={detailTab === k ? "active" : ""}
                      onClick={() => setDetailTab(k)}
                    >
                      {c[`detail${k.charAt(0).toUpperCase()}${k.slice(1)}`]}
                    </div>
                  ))}
                </div>
                {detailTab === "summary" && (
                  <>
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
                  </>
                )}
                {detailTab === "evidence" && (
                  <>
                    <div className="lx-approval-evidence">{c.evidenceText}</div>
                    <button
                      className="lx-outline-btn"
                      type="button"
                      onClick={() => notify(c.evidenceDownloaded)}
                    >
                      {c.downloadEvidence}
                    </button>
                  </>
                )}
                {detailTab === "audit" && (
                  <div className="lx-approval-audit">
                    <b>{c.created}</b>
                    <span>2026-07-31 09:12</span>
                    <b>{c.lastAction}</b>
                    <span>{c.detailStatus}</span>
                  </div>
                )}
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
const historyApprovers = ["lin", "alex"];
const historyTimes = ["Yesterday 16:42", "Yesterday 10:18"];
const historyResults = ["approved", "rejected"] as const;
function ApprovalHistory({
  c,
  rows,
  onReview,
}: {
  c: Record<string, string>;
  rows: { id: string; row: string[] }[];
  onReview: (id: string, row: string[]) => void;
}) {
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
          {rows.map((r, i) => (
            <tr key={r.id}>
              <td>{r.row[0]}</td>
              <td>
                <span
                  className={`lx-status ${
                    historyResults[i] === "approved"
                      ? "lx-status--success"
                      : "lx-status--danger"
                  }`}
                >
                  {historyResults[i] === "approved" ? c.approved : c.rejected}
                </span>
              </td>
              <td>
                {historyApprovers[i] === "lin" ? c.lin : "Alex Morgan"}
              </td>
              <td>{historyTimes[i]}</td>
              <td>
                <button
                  className="lx-settings-ghost mini"
                  type="button"
                  onClick={() => onReview(r.id, r.row)}
                >
                  {c.review}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
