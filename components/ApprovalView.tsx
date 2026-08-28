"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardShell from "./DashboardShell";

type Tab = "pending" | "history" | "policy";
type Locale = "en" | "zh-CN" | "zh-TW";

const text: Record<Locale, Record<string, string>> = {
  en: {
    delegate: "Set temporary delegation",
    pending: "Pending approvals (4)",
    history: "Approval history",
    policy: "Approval policy",
    request: "Request",
    requester: "Requester",
    amount: "Amount / risk",
    rule: "Rule",
    expiry: "Expires",
    action: "Action",
    approve: "Approve",
    reject: "Reject",
    details: "Details",
    payment: "External payment · PAY-03281",
    supplier: "Global Supply Pte.",
    beneficiary: "New beneficiary",
    batch: "Bulk payment · BAT-0729",
    thousand: "1,000 transactions",
    limit: "Limit change · LIM-019",
    daily: "USD daily limit",
    chen: "Chen Accountant",
    lin: "Lin Manager",
    newPayee: "USD 98,500 · New beneficiary",
    medium: "USD 842,000 · Medium",
    high: "500K → 1.0M · High",
    single: "Single approval + MFA",
    batchRule: "Batch approval + item review",
    dual: "Dual control",
    today: "Today",
    review: "Review chain",
    object: "Object",
    result: "Result",
    approver: "Approver",
    time: "Time",
    approved: "Approved",
    rejected: "Rejected",
    refund: "REF-202607-112 · Partial refund",
    policyTitle: "Enterprise approval policy",
    external: "External payments",
    bulk: "Bulk payments",
    changes: "Limits / members / beneficiaries",
    timeout: "Approval timeout",
    separation: "Segregation of duties",
    separationDesc:
      "Requesters cannot approve their own requests; critical configuration and high-risk fund operations require roles, limits, MFA and a complete audit trail.",
    save: "Save policy",
    manage: "Manage approvers",
    threshold: "≥ 10,000 USD: single approval",
    always: "Always require batch-level approval",
    mfa: "Dual control + MFA",
    auto: "Auto-expire after 24h",
    done: "Approval updated",
    policyDialogTitle: "Save approval policy",
    policyDialogNote: "Review the approval rules before saving. Changes take effect for new requests and are recorded in the audit trail.",
    delegationTitle: "Set temporary delegation",
    delegationNote: "Delegate approval authority for a limited period. The original approver remains accountable and all actions are recorded.",
    delegateTo: "Delegate to",
    startDate: "Start date",
    endDate: "End date",
    reason: "Reason",
    reasonValue: "Business trip coverage",
    cancel: "Cancel",
    confirm: "Confirm",
  },
  "zh-CN": {
    delegate: "设置临时授权",
    pending: "待我审批 (4)",
    history: "审批历史",
    policy: "审批策略",
    request: "申请",
    requester: "发起人",
    amount: "金额 / 风险",
    rule: "规则",
    expiry: "到期",
    action: "操作",
    approve: "批准",
    reject: "驳回",
    details: "详情",
    payment: "外部付款 · PAY-03281",
    supplier: "Global Supply Pte.",
    beneficiary: "新增收款人",
    batch: "批量付款 · BAT-0729",
    thousand: "1,000 笔",
    limit: "限额变更 · LIM-019",
    daily: "USD daily limit",
    chen: "Chen Accountant",
    lin: "Lin Manager",
    newPayee: "USD 98,500 · 新收款人",
    medium: "USD 842,000 · Medium",
    high: "500K → 1.0M · High",
    single: "单级审批 + MFA",
    batchRule: "批次审批 + 逐笔复核",
    dual: "双人复核",
    today: "Today",
    review: "查看链路",
    object: "对象",
    result: "结果",
    approver: "审批人",
    time: "时间",
    approved: "Approved",
    rejected: "Rejected",
    refund: "REF-202607-112 · Partial refund",
    policyTitle: "企业审批策略",
    external: "外部付款",
    bulk: "批量付款",
    changes: "限额 / 成员 / 收款人",
    timeout: "审批超时",
    separation: "职责分离",
    separationDesc:
      "发起人不能审批自身申请；关键配置与高风险资金操作需满足角色、额度、MFA 和审计要求。",
    save: "保存策略",
    manage: "管理审批人",
    threshold: "≥ 10,000 USD：单级审批",
    always: "始终需要批次级审批",
    mfa: "双人复核 + MFA",
    auto: "24h 自动失效",
    done: "审批已更新",
    policyDialogTitle: "保存审批策略",
    policyDialogNote: "请确认审批规则后保存。变更将应用于新的申请，并记录在审计日志中。",
    delegationTitle: "设置临时授权",
    delegationNote: "在限定时间内委托审批权限。原审批人仍承担责任，所有操作都会记录在审计日志中。",
    delegateTo: "授权给",
    startDate: "开始日期",
    endDate: "结束日期",
    reason: "授权原因",
    reasonValue: "出差期间代审批",
    cancel: "取消",
    confirm: "确认",
  },
  "zh-TW": {
    delegate: "設定臨時授權",
    pending: "待我審批 (4)",
    history: "審批歷史",
    policy: "審批策略",
    request: "申請",
    requester: "發起人",
    amount: "金額 / 風險",
    rule: "規則",
    expiry: "到期",
    action: "操作",
    approve: "批准",
    reject: "駁回",
    details: "詳情",
    payment: "外部付款 · PAY-03281",
    supplier: "Global Supply Pte.",
    beneficiary: "新增收款人",
    batch: "批量付款 · BAT-0729",
    thousand: "1,000 筆",
    limit: "限額變更 · LIM-019",
    daily: "USD daily limit",
    chen: "Chen Accountant",
    lin: "Lin Manager",
    newPayee: "USD 98,500 · 新收款人",
    medium: "USD 842,000 · Medium",
    high: "500K → 1.0M · High",
    single: "單級審批 + MFA",
    batchRule: "批次審批 + 逐筆覆核",
    dual: "雙人覆核",
    today: "Today",
    review: "查看鏈路",
    object: "對象",
    result: "結果",
    approver: "審批人",
    time: "時間",
    approved: "Approved",
    rejected: "Rejected",
    refund: "REF-202607-112 · Partial refund",
    policyTitle: "企業審批策略",
    external: "外部付款",
    bulk: "批量付款",
    changes: "限額 / 成員 / 收款人",
    timeout: "審批逾時",
    separation: "職責分離",
    separationDesc:
      "發起人不能審批自身申請；關鍵配置與高風險資金操作需滿足角色、額度、MFA 和稽核要求。",
    save: "儲存策略",
    manage: "管理審批人",
    threshold: "≥ 10,000 USD：單級審批",
    always: "始終需要批次級審批",
    mfa: "雙人覆核 + MFA",
    auto: "24h 自動失效",
    done: "審批已更新",
  },
};

export default function ApprovalView() {
  const t = useTranslations("approval");
  const { locale } = useParams<{ locale: Locale }>();
  const c = text[locale] || text.en;
  const [tab, setTab] = useState<Tab>("pending");
  const [notice, setNotice] = useState("");
  const [dialog, setDialog] = useState<"policy" | "delegation" | null>(null);
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
            对付款、退款、新增收款人、账户绑定和限额变更执行分级审批，并保留完整审批链与
            MFA 记录。
          </p>
        </div>
        <button className="lx-outline-btn" onClick={() => setDialog("delegation")}>
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
              <h2 className="lx-section-title">审批队列</h2>
              <p className="lx-section-sub">按业务类型与风险优先级处理申请。</p>
            </div>
          </div>
          <ApprovalTable rows={rows} c={c} onAction={act} />
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
      {dialog && <div className="lx-approval-modal" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && setDialog(null)}>
        <div className="lx-approval-modal__panel">
          <div className="lx-approval-modal__head"><h2>{dialog === "policy" ? c.policyDialogTitle : c.delegationTitle}</h2><button type="button" aria-label="Close" onClick={() => setDialog(null)}>×</button></div>
          <p className="lx-section-sub">{dialog === "policy" ? c.policyDialogNote : c.delegationNote}</p>
          {dialog === "policy" ? <div className="lx-approval-modal__rules">{[[c.external,c.threshold],[c.bulk,c.always],[c.changes,c.mfa],[c.timeout,c.auto]].map(([label,value]) => <div key={label}><b>{label}</b><span>{value}</span></div>)}</div> : <div className="lx-approval-form lx-approval-modal__form">
            <label>{c.delegateTo}<select defaultValue="lin"><option value="lin">{c.lin}</option><option value="chen">{c.chen}</option></select></label>
            <label>{c.startDate}<input type="date" defaultValue="2026-08-28" /></label><label>{c.endDate}<input type="date" defaultValue="2026-09-04" /></label>
            <label>{c.reason}<input defaultValue={c.reasonValue} /></label>
          </div>}
          <div className="lx-approval-modal__actions"><button className="lx-outline-btn" type="button" onClick={() => setDialog(null)}>{c.cancel}</button><button className="lx-cta" type="button" onClick={() => { setDialog(null); act(); }}>{c.confirm}</button></div>
        </div>
      </div>}
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
  onAction: () => void;
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
                <button className="lx-approval-success" onClick={onAction}>
                  {c.approve}
                </button>{" "}
                <button className="lx-approval-danger" onClick={onAction}>
                  {c.reject}
                </button>{" "}
                <button className="lx-settings-ghost" onClick={onAction}>
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
