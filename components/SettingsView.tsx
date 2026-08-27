"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardShell from "./DashboardShell";

const copy = {
  en: {
    profile: "Organization profile",
    name: "Organization name",
    entity: "Operating entity",
    currency: "Default currency",
    language: "Language",
    params: "Compliance parameters",
    change: "Dual-control change",
    access: "Roles, users and approval events",
    accessDesc:
      "Manage role permissions, team members, approval scope and important approval event records.",
    addRole: "Add role",
    invite: "Invite user",
    roles: "Role permissions",
    users: "User management",
    events: "Approval events",
    roleList: "Role list",
    roleDesc:
      "Define accessible modules, approval limits and segregation-of-duties requirements.",
    templates: "Manage role templates",
    role: "Role",
    scope: "Access scope",
    limit: "Approval limit",
    members: "Members",
    status: "Status",
    admin: "Enterprise administrator",
    finance: "Finance operator",
    compliance: "Compliance reviewer",
    full: "All modules",
    payments: "Accounts, payments and exchange",
    risk: "KYC, AML and risk cases",
    unlimited: "Unlimited",
    active: "Active",
    team: "Team users",
    teamDesc:
      "Invite, edit or suspend users and reset MFA and approval permissions.",
    search: "Name or email",
    all: "All statuses",
    filter: "Filter",
    user: "User",
    lastLogin: "Last login",
    manager: "Lin Manager",
    analyst: "Chen Analyst",
    pending: "Pending invitation",
    eventList: "Approval event records",
    eventDesc:
      "Review approval creation, approval, rejection, transfer and MFA events, and configure alert rules.",
    export: "Export events",
    addRule: "Add event rule",
    event: "Event",
    actor: "Actor",
    result: "Result",
    time: "Time",
    approved: "Payment approved",
    created: "Beneficiary approval created",
    mfa: "MFA failed",
    success: "Success",
    blocked: "Blocked",
    note: "Event records cannot be deleted directly. Exports, retention and alert-rule changes are written to the audit log.",
  },
  "zh-CN": {
    profile: "企业资料",
    name: "企业名称",
    entity: "运营主体",
    currency: "默认币种",
    language: "语言",
    params: "合规参数库",
    change: "双人复核变更",
    access: "角色、用户与审批事件",
    accessDesc: "管理角色权限、团队成员、审批范围和重要审批事件留痕。",
    addRole: "新增角色",
    invite: "邀请用户",
    roles: "角色权限",
    users: "用户管理",
    events: "审批事件",
    roleList: "角色列表",
    roleDesc: "定义可访问的模块、审批额度和职责分离要求。",
    templates: "管理角色模板",
    role: "角色",
    scope: "访问范围",
    limit: "审批额度",
    members: "成员",
    status: "状态",
    admin: "企业管理员",
    finance: "财务操作员",
    compliance: "合规复核员",
    full: "全部模块",
    payments: "账户、付款与兑换",
    risk: "KYC、AML 与风险案件",
    unlimited: "无限制",
    active: "启用",
    team: "团队用户",
    teamDesc: "邀请、编辑、停用用户并重置其 MFA 和审批权限。",
    search: "姓名或邮箱",
    all: "全部状态",
    filter: "筛选",
    user: "用户",
    lastLogin: "最近登录",
    manager: "Lin Manager",
    analyst: "Chen Analyst",
    pending: "待接受",
    eventList: "审批事件记录",
    eventDesc: "查看审批创建、批准、驳回、转交和 MFA 事件，并配置提醒规则。",
    export: "导出事件",
    addRule: "新增事件规则",
    event: "事件",
    actor: "操作人",
    result: "结果",
    time: "时间",
    approved: "付款审批通过",
    created: "收款人审批已创建",
    mfa: "MFA 验证失败",
    success: "成功",
    blocked: "已阻止",
    note: "事件记录不可直接删除；导出、保留期限和告警规则变更会写入审计日志。",
  },
  "zh-TW": {
    profile: "企業資料",
    name: "企業名稱",
    entity: "營運主體",
    currency: "預設幣種",
    language: "語言",
    params: "合規參數庫",
    change: "雙人覆核變更",
    access: "角色、使用者與審批事件",
    accessDesc: "管理角色權限、團隊成員、審批範圍和重要審批事件記錄。",
    addRole: "新增角色",
    invite: "邀請使用者",
    roles: "角色權限",
    users: "使用者管理",
    events: "審批事件",
    roleList: "角色列表",
    roleDesc: "定義可存取的模組、審批額度和職責分離要求。",
    templates: "管理角色範本",
    role: "角色",
    scope: "存取範圍",
    limit: "審批額度",
    members: "成員",
    status: "狀態",
    admin: "企業管理員",
    finance: "財務操作員",
    compliance: "合規覆核員",
    full: "全部模組",
    payments: "帳戶、付款與兌換",
    risk: "KYC、AML 與風險案件",
    unlimited: "無限制",
    active: "啟用",
    team: "團隊使用者",
    teamDesc: "邀請、編輯、停用使用者並重設其 MFA 和審批權限。",
    search: "姓名或電郵",
    all: "全部狀態",
    filter: "篩選",
    user: "使用者",
    lastLogin: "最近登入",
    manager: "Lin Manager",
    analyst: "Chen Analyst",
    pending: "待接受",
    eventList: "審批事件記錄",
    eventDesc: "查看審批建立、批准、駁回、轉交和 MFA 事件，並設定提醒規則。",
    export: "匯出事件",
    addRule: "新增事件規則",
    event: "事件",
    actor: "操作人",
    result: "結果",
    time: "時間",
    approved: "付款審批通過",
    created: "收款人審批已建立",
    mfa: "MFA 驗證失敗",
    success: "成功",
    blocked: "已阻止",
    note: "事件記錄不可直接刪除；匯出、保留期限和告警規則變更會寫入稽核日誌。",
  },
} as const;

type Tab = "roles" | "users" | "events";
export default function SettingsView() {
  const t = useTranslations("settings");
  const { locale } = useParams<{ locale: string }>();
  const c = copy[(locale in copy ? locale : "en") as keyof typeof copy];
  const [tab, setTab] = useState<Tab>("roles");
  return (
    <DashboardShell
      active="more"
      headerTitle={t("header.title")}
      headerSubtitle={t("header.subtitle")}
    >
      <div className="lx-management-hero">
        <div>
          <h2 className="lx-section-title">{t("hero.title")}</h2>
          <p className="lx-section-sub">{t("hero.subtitle")}</p>
        </div>
        <button className="lx-cta">{t("cta")}</button>
      </div>
      <div className="lx-settings-grid">
        <section className="lx-panel lx-settings-panel">
          <h2>{c.profile}</h2>
          <div className="lx-settings-form">
            <label>
              {c.name}
              <input defaultValue="Unity Centre Investment Ltd." />
            </label>
            <label>
              {c.entity}
              <select defaultValue="Canada">
                <option value="Canada">Canada MSB · FINTRAC profile</option>
                <option>Hong Kong, China MSO boundary</option>
                <option>Singapore hub</option>
              </select>
            </label>
            <label>
              {c.currency}
              <select>
                <option>USD</option>
                <option>CAD</option>
                <option>HKD</option>
                <option>SGD</option>
              </select>
            </label>
            <label>
              {c.language}
              <select defaultValue={locale === "en" ? "English" : "中文"}>
                <option>中文</option>
                <option>English</option>
                <option>日本語</option>
                <option>한국어</option>
              </select>
            </label>
          </div>
        </section>
        <section className="lx-panel lx-settings-panel">
          <h2>{c.params}</h2>
          <div className="lx-parameter-grid">
            {[
              ["Threshold", "CAD 10,000 / 24h"],
              ["Reports", "STR, LCTR, EFTR, LVCTR, LPEPR"],
              ["Retention", "≥ 5 years"],
              ["Restricted regions", "Per entity config"],
            ].map((x) => (
              <div key={x[0]}>
                <strong>{x[0]}</strong>
                <small>{x[1]}</small>
              </div>
            ))}
          </div>
          <button className="lx-settings-ghost">{c.change}</button>
        </section>
      </div>
      <section className="lx-panel lx-settings-access">
        <div className="lx-section-header">
          <div>
            <h2 className="lx-section-title">{c.access}</h2>
            <p className="lx-section-sub">{c.accessDesc}</p>
          </div>
          <div className="lx-settings-actions">
            <button className="lx-settings-ghost">{c.addRole}</button>
            <button className="lx-cta">{c.invite}</button>
          </div>
        </div>
        <div className="lx-settings-tabs">
          {(["roles", "users", "events"] as Tab[]).map((k) => (
            <button
              className={tab === k ? "active" : ""}
              onClick={() => setTab(k)}
              key={k}
            >
              {c[k]}
            </button>
          ))}
        </div>
        {tab === "roles" && (
          <>
            <SettingsHead
              title={c.roleList}
              desc={c.roleDesc}
              action={c.templates}
            />
            <Table
              heads={[c.role, c.scope, c.limit, c.members, c.status]}
              rows={[
                [c.admin, c.full, c.unlimited, "2", c.active],
                [c.finance, c.payments, "USD 100,000", "8", c.active],
                [c.compliance, c.risk, "—", "4", c.active],
              ]}
            />
          </>
        )}
        {tab === "users" && (
          <>
            <SettingsHead title={c.team} desc={c.teamDesc} />
            <div className="lx-settings-filter">
              <input placeholder={c.search} />
              <select>
                <option>{c.all}</option>
                <option>{c.active}</option>
                <option>{c.pending}</option>
              </select>
              <button className="lx-settings-ghost">{c.filter}</button>
            </div>
            <Table
              heads={[c.user, c.role, c.status, c.lastLogin]}
              rows={[
                [c.manager, c.admin, c.active, "2026-08-26 09:42"],
                [c.analyst, c.compliance, c.active, "2026-08-25 18:16"],
                ["finance@unitycentre.com", c.finance, c.pending, "—"],
              ]}
            />
          </>
        )}
        {tab === "events" && (
          <>
            <SettingsHead
              title={c.eventList}
              desc={c.eventDesc}
              action={c.addRule}
            />
            <Table
              heads={[c.event, c.actor, c.result, c.time]}
              rows={[
                [c.approved, c.manager, c.success, "2026-08-26 10:14"],
                [c.created, c.analyst, c.success, "2026-08-26 09:31"],
                [
                  c.mfa,
                  "finance@unitycentre.com",
                  c.blocked,
                  "2026-08-25 22:08",
                ],
              ]}
            />
            <p className="lx-settings-note">{c.note}</p>
          </>
        )}
      </section>
    </DashboardShell>
  );
}
function SettingsHead({
  title,
  desc,
  action,
}: {
  title: string;
  desc: string;
  action?: string;
}) {
  return (
    <div className="lx-settings-subhead">
      <div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      {action && <button className="lx-settings-ghost">{action}</button>}
    </div>
  );
}
function Table({ heads, rows }: { heads: string[]; rows: string[][] }) {
  return (
    <div className="lx-native-table-wrap">
      <table className="lx-native-table">
        <thead>
          <tr>
            {heads.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((v, j) => (
                <td key={j}>
                  {j === r.length - 1 ? (
                    <span className="lx-status lx-status--success">{v}</span>
                  ) : (
                    v
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
