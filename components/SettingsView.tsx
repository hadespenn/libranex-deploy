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
    object: "Object",
    actor: "Actor",
    result: "Result",
    time: "Time",
    approved: "Payment approved",
    created: "Beneficiary approval created",
    mfa: "MFA failed",
    success: "Success",
    blocked: "Blocked",
    note: "Event records cannot be deleted directly. Exports, retention and alert-rule changes are written to the audit log.",
    memberCount: "Members",
    actions: "Actions",
    edit: "Edit",
    details: "Details",
    administrator: "Administrator",
    financeApprover: "Finance approver",
    auditor: "Read-only auditor",
    adminScope: "All modules · user management",
    financeScope: "Payouts · refunds · beneficiaries",
    auditorScope: "Global read-only · audit export",
    noApproval: "No approval",
    mfaLabel: "MFA",
    lastActive: "Last active",
    enabled: "Enabled",
    notSet: "Not set",
    justNow: "Just now",
    minutesAgo: "8 minutes ago",
    suspended: "Suspended",
    resend: "Resend invite",
    suspend: "Suspend",
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
    object: "对象",
    actor: "操作人",
    result: "结果",
    time: "时间",
    approved: "付款审批通过",
    created: "收款人审批已创建",
    mfa: "MFA 验证失败",
    success: "成功",
    blocked: "已阻止",
    note: "事件记录不可直接删除；导出、保留期限和告警规则变更会写入审计日志。",
    memberCount: "成员数",
    actions: "操作",
    edit: "编辑",
    details: "详情",
    administrator: "管理员",
    financeApprover: "财务审批人",
    auditor: "只读审计员",
    mfaLabel: "MFA",
    lastActive: "最近活动",
    enabled: "已启用",
    notSet: "未设置",
    justNow: "刚刚",
    minutesAgo: "8 分钟前",
    suspended: "已停用",
    resend: "重发邀请",
    suspend: "停用",
    adminScope: "全部模块 · 用户管理",
    financeScope: "付款 · 退款 · 收款人",
    auditorScope: "全局只读 · 导出审计",
    noApproval: "不可审批",
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
    object: "對象",
    actor: "操作人",
    result: "結果",
    time: "時間",
    approved: "付款審批通過",
    created: "收款人審批已建立",
    mfa: "MFA 驗證失敗",
    success: "成功",
    blocked: "已阻止",
    note: "事件記錄不可直接刪除；匯出、保留期限和告警規則變更會寫入稽核日誌。",
    memberCount: "成員數",
    actions: "操作",
    edit: "編輯",
    details: "詳情",
    administrator: "管理員",
    financeApprover: "財務審批人",
    auditor: "唯讀稽核員",
    mfaLabel: "MFA",
    lastActive: "最近活動",
    enabled: "已啟用",
    notSet: "未設定",
    justNow: "剛剛",
    minutesAgo: "8 分鐘前",
    suspended: "已停用",
    resend: "重發邀請",
    suspend: "停用",
    adminScope: "全部模組 · 使用者管理",
    financeScope: "付款 · 退款 · 收款人",
    auditorScope: "全域唯讀 · 匯出稽核",
    noApproval: "不可審批",
  },
} as const;

type Tab = "roles" | "users" | "events";
export default function SettingsView() {
  const t = useTranslations("settings");
  const { locale } = useParams<{ locale: string }>();
  const c = copy[(locale in copy ? locale : "en") as keyof typeof copy];
  const [tab, setTab] = useState<Tab>("roles");
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [changeModalOpen, setChangeModalOpen] = useState(false);
  const [eventRuleModalOpen, setEventRuleModalOpen] = useState(false);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<
    "finance" | "auditor" | null
  >(null);
  const [editingRole, setEditingRole] = useState<
    "admin" | "finance" | "auditor" | null
  >(null);
  const [viewingRole, setViewingRole] = useState<
    "admin" | "finance" | "auditor" | null
  >(null);
  const [editingUser, setEditingUser] = useState<
    "lin" | "chen" | "alex" | null
  >(null);
  const [userConfirmation, setUserConfirmation] = useState<
    "mfa" | "suspend" | null
  >(null);
  const [userConfirmationChecked, setUserConfirmationChecked] = useState(false);
  const [viewingApprovalEvent, setViewingApprovalEvent] = useState<
    "EV-1009" | "EV-1008" | null
  >(null);
  const exportApprovalEvents = () => {
    const rows = [
      [c.time, c.event, c.object, c.actor, c.result],
      ["09:42", c.approved, "PAY-03281", c.manager, c.success],
      [
        "09:18",
        locale === "en"
          ? "Approval rejected"
          : locale === "zh-TW"
            ? "審批駁回"
            : "审批驳回",
        "BEN-021",
        "Alex Morgan",
        c.success,
      ],
    ];
    const csv = rows
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(","),
      )
      .join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(
      new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }),
    );
    link.download = "libranex-approval-events.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };
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
          <button
            className="lx-settings-ghost"
            type="button"
            onClick={() => setChangeModalOpen(true)}
          >
            {c.change}
          </button>
        </section>
      </div>
      <section className="lx-panel lx-settings-access">
        <div className="lx-section-header">
          <div>
            <h2 className="">{c.access}</h2>
            <p className="lx-section-sub">{c.accessDesc}</p>
          </div>
          <div className="lx-settings-actions">
            <button
              className="lx-settings-ghost"
              type="button"
              onClick={() => setRoleModalOpen(true)}
            >
              {c.addRole}
            </button>
            <button
              className="lx-cta"
              type="button"
              onClick={() => setInviteModalOpen(true)}
            >
              {c.invite}
            </button>
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
              onAction={() => {
                setSelectedTemplate(null);
                setTemplateModalOpen(true);
              }}
            />
            <div className="lx-native-table-wrap">
              <table className="lx-native-table lx-settings-role-table">
                <thead>
                  <tr>
                    <th>{c.role}</th>
                    <th>{c.memberCount}</th>
                    <th>{c.limit}</th>
                    <th>{c.scope}</th>
                    <th>{c.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [c.administrator, "2", c.unlimited, c.adminScope],
                    [c.financeApprover, "3", "USD 1,000,000", c.financeScope],
                    [c.auditor, "1", c.noApproval, c.auditorScope],
                  ].map((role, index) => {
                    const roleId =
                      index === 0
                        ? "admin"
                        : index === 1
                          ? "finance"
                          : "auditor";
                    return (
                      <tr key={role[0]}>
                        <td>
                          <strong>{role[0]}</strong>
                        </td>
                        <td>{role[1]}</td>
                        <td>{role[2]}</td>
                        <td>{role[3]}</td>
                        <td>
                          <div className="lx-role-actions">
                            <button
                              type="button"
                              onClick={() => setEditingRole(roleId)}
                            >
                              {c.edit}
                            </button>
                            <button
                              type="button"
                              onClick={() => setViewingRole(roleId)}
                            >
                              {c.details}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
        {tab === "users" && (
          <>
            <SettingsHead
              title={c.team}
              desc={c.teamDesc}
              action={c.invite}
              onAction={() => setInviteModalOpen(true)}
            />
            <div className="lx-section-header">
              <div
                className="lx-settings-filter
                "
                style={{ width: "90%", marginTop: "12px" }}
              >
                <input placeholder={c.search} />
                <select>
                  <option>{c.all}</option>
                  <option>{c.active}</option>
                  <option>{c.pending}</option>
                  <option>{c.suspended}</option>
                </select>
              </div>
              <button className="lx-settings-ghost" type="button">
                {c.filter}
              </button>
            </div>
            <div className="lx-native-table-wrap">
              <table className="lx-native-table lx-settings-user-table">
                <thead>
                  <tr>
                    <th>{c.user}</th>
                    <th>{c.role}</th>
                    <th>{c.status}</th>
                    <th>{c.mfaLabel}</th>
                    <th>{c.lastActive}</th>
                    <th>{c.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Lin Manager</strong>
                    </td>
                    <td>{c.administrator}</td>
                    <td>
                      <span className="lx-status-pill">{c.active}</span>
                    </td>
                    <td>
                      <span className="lx-status-pill">{c.enabled}</span>
                    </td>
                    <td>{c.justNow}</td>
                    <td>
                      <div className="lx-role-actions">
                        <button
                          type="button"
                          onClick={() => setEditingUser("lin")}
                        >
                          {c.edit}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setUserConfirmationChecked(false);
                            setUserConfirmation("mfa");
                          }}
                        >
                          MFA
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Chen Accountant</strong>
                    </td>
                    <td>{c.financeApprover}</td>
                    <td>
                      <span className="lx-status-pill">{c.active}</span>
                    </td>
                    <td>
                      <span className="lx-status-pill">{c.enabled}</span>
                    </td>
                    <td>{c.minutesAgo}</td>
                    <td>
                      <div className="lx-role-actions">
                        <button
                          type="button"
                          onClick={() => setEditingUser("chen")}
                        >
                          {c.edit}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setUserConfirmationChecked(false);
                            setUserConfirmation("suspend");
                          }}
                        >
                          {c.suspend}
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Alex Morgan</strong>
                    </td>
                    <td>{c.compliance}</td>
                    <td>
                      <span className="lx-status-pill warn">{c.pending}</span>
                    </td>
                    <td>
                      <span className="lx-status-pill neutral">{c.notSet}</span>
                    </td>
                    <td>—</td>
                    <td>
                      <div className="lx-role-actions">
                        <button type="button">{c.resend}</button>
                        <button
                          type="button"
                          onClick={() => setEditingUser("alex")}
                        >
                          {c.edit}
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
        {tab === "events" && (
          <>
            <SettingsHead
              title={c.eventList}
              desc={c.eventDesc}
              action={c.addRule}
              onAction={() => setEventRuleModalOpen(true)}
              secondaryAction={c.export}
              onSecondaryAction={exportApprovalEvents}
            />
            <div className="lx-section-header">
              <div
                className="lx-settings-filter"
                style={{ width: "90%", marginTop: "12px" }}
              >
                <select>
                  <option>
                    {locale === "en" ? "All event types" : "全部事件"}
                  </option>
                  <option>{c.approved}</option>
                  <option>
                    {locale === "en" ? "Approval rejected" : "审批驳回"}
                  </option>
                  <option>{c.mfa}</option>
                </select>
                <select>
                  <option>
                    {locale === "en" ? "All results" : "全部结果"}
                  </option>
                  <option>{c.success}</option>
                  <option>{c.blocked}</option>
                </select>
              </div>
              <button className="lx-settings-ghost" type="button">
                {c.filter}
              </button>
            </div>
            <div className="lx-native-table-wrap">
              <table className="lx-native-table">
                <thead>
                  <tr>
                    {[
                      c.time,
                      c.event,
                      c.object,
                      c.actor,
                      c.result,
                      c.actions,
                    ].map((head) => (
                      <th key={head}>{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>09:42</td>
                    <td>{c.approved}</td>
                    <td>PAY-03281</td>
                    <td>{c.manager}</td>
                    <td>
                      <span className="lx-status-pill">{c.success}</span>
                    </td>
                    <td>
                      <div className="lx-role-actions">
                        <button
                          type="button"
                          onClick={() => setViewingApprovalEvent("EV-1009")}
                        >
                          {c.details}
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>09:18</td>
                    <td>
                      {locale === "en"
                        ? "Approval rejected"
                        : locale === "zh-TW"
                          ? "審批駁回"
                          : "审批驳回"}
                    </td>
                    <td>BEN-021</td>
                    <td>Alex Morgan</td>
                    <td>
                      <span className="lx-status-pill">{c.success}</span>
                    </td>
                    <td>
                      <div className="lx-role-actions">
                        <button
                          type="button"
                          onClick={() => setViewingApprovalEvent("EV-1008")}
                        >
                          {c.details}
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="lx-settings-note">{c.note}</p>
          </>
        )}
      </section>
      {roleModalOpen && (
        <div
          className="lx-settings-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setRoleModalOpen(false);
          }}
        >
          <div
            className="lx-settings-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-role-title"
          >
            <div className="lx-settings-modal__head">
              <h2 id="add-role-title">{c.addRole}</h2>
              <button
                type="button"
                onClick={() => setRoleModalOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="lx-settings-role-form">
              <label>
                {locale === "en" ? "Role name" : "角色名称"}
                <input
                  value={roleName}
                  onChange={(event) => setRoleName(event.target.value)}
                  placeholder={
                    locale === "en"
                      ? "For example: Regional finance approver"
                      : "例如：区域财务审批人"
                  }
                  autoFocus
                />
              </label>
              <label>
                {c.limit}
                <select defaultValue="USD 100,000">
                  <option>USD 100,000</option>
                  <option>USD 1,000,000</option>
                  <option>
                    {locale === "en" ? "No approval" : "不可审批"}
                  </option>
                </select>
              </label>
              <label className="full">
                {locale === "en" ? "Permission scope" : "权限范围"}
                <select defaultValue="payouts">
                  <option value="payouts">
                    {locale === "en" ? "Payouts and refunds" : "付款与退款"}
                  </option>
                  <option>
                    {locale === "en"
                      ? "Beneficiaries and accounts"
                      : "收款人与账户"}
                  </option>
                  <option>
                    {locale === "en" ? "Read-only audit" : "只读审计"}
                  </option>
                </select>
              </label>
              <label className="lx-settings-role-check">
                <input type="checkbox" />
                {locale === "en"
                  ? "Enforce segregation of duties"
                  : "启用职责分离限制"}
              </label>
            </div>
            <div className="lx-settings-modal__actions">
              <button
                className="lx-settings-ghost"
                type="button"
                onClick={() => setRoleModalOpen(false)}
              >
                {locale === "en" ? "Cancel" : "取消"}
              </button>
              <button
                className="lx-cta"
                type="button"
                disabled={!roleName.trim()}
                onClick={() => setRoleModalOpen(false)}
              >
                {locale === "en" ? "Create role" : "创建角色"}
              </button>
            </div>
          </div>
        </div>
      )}
      {inviteModalOpen && (
        <div
          className="lx-settings-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setInviteModalOpen(false);
          }}
        >
          <div
            className="lx-settings-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="invite-user-title"
          >
            <div className="lx-settings-modal__head">
              <h2 id="invite-user-title">
                {locale === "en"
                  ? "Invite team user"
                  : locale === "zh-TW"
                    ? "邀請團隊使用者"
                    : "邀请团队用户"}
              </h2>
              <button
                type="button"
                onClick={() => setInviteModalOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <form
              className="lx-settings-role-form"
              onSubmit={(event) => {
                event.preventDefault();
                setInviteModalOpen(false);
              }}
            >
              <label>
                {locale === "en" ? "Name" : "姓名"}
                <input
                  value={inviteName}
                  onChange={(event) => setInviteName(event.target.value)}
                  placeholder={locale === "en" ? "User name" : "用户姓名"}
                  autoComplete="name"
                  autoFocus
                  required
                />
              </label>
              <label>
                {locale === "en"
                  ? "Business email"
                  : locale === "zh-TW"
                    ? "企業電郵"
                    : "企业邮箱"}
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(event) => setInviteEmail(event.target.value)}
                  placeholder="user@company.com"
                  autoComplete="email"
                  required
                />
              </label>
              <label>
                {c.role}
                <select defaultValue="finance">
                  <option value="finance">
                    {locale === "en" ? "Finance approver" : "财务审批人"}
                  </option>
                  <option>
                    {locale === "en" ? "Read-only auditor" : "只读审计员"}
                  </option>
                  <option>
                    {locale === "en" ? "Administrator" : "管理员"}
                  </option>
                </select>
              </label>
              <label>
                {locale === "en" ? "Approval scope" : "审批范围"}
                <select defaultValue="Payments">
                  <option>Payments</option>
                  <option>Refunds</option>
                  <option>Beneficiaries</option>
                </select>
              </label>
              <label className="lx-settings-role-check">
                <input type="checkbox" />
                {locale === "en"
                  ? "Require MFA at first sign-in"
                  : locale === "zh-TW"
                    ? "要求首次登入完成 MFA"
                    : "要求首次登录完成 MFA"}
              </label>
              <div className="lx-settings-modal__actions full">
                <button
                  className="lx-settings-ghost"
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                >
                  {locale === "en" ? "Cancel" : "取消"}
                </button>
                <button
                  className="lx-cta"
                  type="submit"
                  disabled={!inviteName.trim() || !inviteEmail.trim()}
                >
                  {locale === "en"
                    ? "Send invite"
                    : locale === "zh-TW"
                      ? "傳送邀請"
                      : "发送邀请"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {changeModalOpen && (
        <div
          className="lx-settings-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setChangeModalOpen(false);
          }}
        >
          <div
            className="lx-settings-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="change-param-title"
          >
            <div className="lx-settings-modal__head">
              <h2 id="change-param-title">
                {locale === "en"
                  ? "Controlled parameter change"
                  : locale === "zh-TW"
                    ? "受控參數變更"
                    : "受控参数变更"}
              </h2>
              <button
                type="button"
                onClick={() => setChangeModalOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <p className="lx-settings-modal__description">
              {locale === "en"
                ? "Changes to thresholds, reports, retention, regions or permissions require impact assessment, dual review, an effective time and rollback support."
                : locale === "zh-TW"
                  ? "涉及閾值、報告、保留期限、地區或權限的參數變更必須進行影響評估、雙人覆核、設定生效時間，並支援回滾。"
                  : "涉及阈值、报告、留存、地区或权限的参数变更必须进行影响评估、双人复核、设定生效时间，并支持回滚。"}
            </p>
            <form
              className="lx-settings-role-form"
              onSubmit={(event) => {
                event.preventDefault();
                setChangeModalOpen(false);
              }}
            >
              <label>
                {locale === "en" ? "Parameter category" : "参数类别"}
                <select defaultValue="threshold">
                  <option value="threshold">
                    {locale === "en" ? "Threshold" : "阈值"}
                  </option>
                  <option>{locale === "en" ? "Reports" : "报告"}</option>
                  <option>{locale === "en" ? "Retention" : "留存"}</option>
                  <option>
                    {locale === "en" ? "Restricted regions" : "受限地区"}
                  </option>
                </select>
              </label>
              <label>
                {locale === "en" ? "Effective time" : "生效时间"}
                <select defaultValue="review">
                  <option value="review">
                    {locale === "en" ? "After dual review" : "双人复核后"}
                  </option>
                  <option>{locale === "en" ? "Scheduled" : "定时生效"}</option>
                </select>
              </label>
              <label className="full">
                {locale === "en" ? "Change rationale" : "变更说明"}
                <textarea
                  className="lx-settings-textarea"
                  placeholder={
                    locale === "en"
                      ? "Background, impact assessment and rollback conditions"
                      : "填写背景、影响评估和回滚条件"
                  }
                />
              </label>
              <label className="lx-settings-role-check">
                <input type="checkbox" required />
                {locale === "en"
                  ? "Impact assessment and rollback drill completed"
                  : "已完成影响评估与回滚演练"}
              </label>
              <div className="lx-settings-modal__actions full">
                <button
                  className="lx-settings-ghost"
                  type="button"
                  onClick={() => setChangeModalOpen(false)}
                >
                  {locale === "en" ? "Cancel" : "取消"}
                </button>
                <button className="lx-cta" type="submit">
                  {locale === "en" ? "Submit change request" : "提交变更申请"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {eventRuleModalOpen && (
        <div
          className="lx-settings-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget)
              setEventRuleModalOpen(false);
          }}
        >
          <div
            className="lx-settings-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-rule-title"
          >
            <div className="lx-settings-modal__head">
              <h2 id="event-rule-title">
                {locale === "en"
                  ? "Add approval event rule"
                  : locale === "zh-TW"
                    ? "新增審批事件規則"
                    : "新增审批事件规则"}
              </h2>
              <button
                type="button"
                onClick={() => setEventRuleModalOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <form
              className="lx-settings-role-form"
              onSubmit={(event) => {
                event.preventDefault();
                setEventRuleModalOpen(false);
              }}
            >
              <label>
                {locale === "en"
                  ? "Event type"
                  : locale === "zh-TW"
                    ? "事件類型"
                    : "事件类型"}
                <select defaultValue="rejected">
                  <option value="rejected">Approval rejected</option>
                  <option value="mfa">MFA failed</option>
                  <option value="approved">Approval approved</option>
                </select>
              </label>
              <label>
                {locale === "en"
                  ? "Notify via"
                  : locale === "zh-TW"
                    ? "通知方式"
                    : "通知方式"}
                <select defaultValue="email">
                  <option value="email">Email</option>
                  <option value="in-app">In-app</option>
                  <option value="webhook">Webhook</option>
                </select>
              </label>
              <label className="full">
                {locale === "en"
                  ? "Recipients"
                  : locale === "zh-TW"
                    ? "觸發對象"
                    : "触发对象"}
                <input
                  type="email"
                  defaultValue="finance@unitycentre.com"
                  required
                />
              </label>
              <label className="lx-settings-role-check full">
                <input type="checkbox" defaultChecked />
                {locale === "en"
                  ? "Enable this rule"
                  : locale === "zh-TW"
                    ? "啟用此規則"
                    : "启用此规则"}
              </label>
              <div className="lx-settings-modal__actions full">
                <button
                  className="lx-settings-ghost"
                  type="button"
                  onClick={() => setEventRuleModalOpen(false)}
                >
                  {locale === "en" ? "Cancel" : "取消"}
                </button>
                <button className="lx-cta" type="submit">
                  {locale === "en"
                    ? "Save rule"
                    : locale === "zh-TW"
                      ? "儲存規則"
                      : "保存规则"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {templateModalOpen && (
        <div
          className="lx-settings-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget)
              setTemplateModalOpen(false);
          }}
        >
          <div
            className="lx-settings-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="role-template-title"
          >
            <div className="lx-settings-modal__head">
              <h2 id="role-template-title">
                {selectedTemplate
                  ? locale === "en"
                    ? "Confirm template"
                    : locale === "zh-TW"
                      ? "確認套用範本"
                      : "确认应用模板"
                  : locale === "en"
                    ? "Role templates"
                    : locale === "zh-TW"
                      ? "角色範本"
                      : "角色模板"}
              </h2>
              <button
                type="button"
                onClick={() => setTemplateModalOpen(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            {selectedTemplate ? (
              <>
                <p className="lx-template-description">
                  {locale === "en"
                    ? "The template will create a role configuration pending review."
                    : locale === "zh-TW"
                      ? "範本將建立一條待覆核的角色設定。"
                      : "模板将创建一条待复核的角色配置。"}
                </p>
                <button
                  className="lx-cta"
                  type="button"
                  onClick={() => setTemplateModalOpen(false)}
                >
                  {locale === "en"
                    ? "Create pending role"
                    : locale === "zh-TW"
                      ? "已建立待覆核角色"
                      : "已创建待复核角色"}
                </button>
              </>
            ) : (
              <>
                <p className="lx-template-description">
                  {locale === "en"
                    ? "Use a template to create a role with segregation-of-duties defaults. Applying a template still requires dual review."
                    : locale === "zh-TW"
                      ? "選擇範本可快速建立符合職責分離要求的角色。套用範本前仍需雙人覆核。"
                      : "选择模板可快速创建符合职责分离要求的角色。模板应用前仍需双人复核。"}
                </p>
                <div className="lx-role-template-grid">
                  <button
                    type="button"
                    onClick={() => setSelectedTemplate("finance")}
                  >
                    <strong>{c.financeApprover}</strong>
                    <small>Payments · refunds · batch approval</small>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTemplate("auditor")}
                  >
                    <strong>{c.auditor}</strong>
                    <small>Read-only · audit export</small>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {editingRole && (
        <div
          className="lx-settings-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setEditingRole(null);
          }}
        >
          <div
            className="lx-settings-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-role-title"
          >
            <div className="lx-settings-modal__head">
              <h2 id="edit-role-title">
                {locale === "en"
                  ? "Edit role"
                  : locale === "zh-TW"
                    ? "編輯角色"
                    : "编辑角色"}{" "}
                ·{" "}
                {editingRole === "admin"
                  ? c.administrator
                  : editingRole === "finance"
                    ? c.financeApprover
                    : c.auditor}
              </h2>
              <button
                type="button"
                onClick={() => setEditingRole(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="lx-settings-role-form">
              <label>
                {locale === "en" ? "Role name" : "角色名称"}
                <input
                  defaultValue={
                    editingRole === "admin"
                      ? c.administrator
                      : editingRole === "finance"
                        ? c.financeApprover
                        : c.auditor
                  }
                />
              </label>
              <label>
                {c.limit}
                <input
                  defaultValue={
                    editingRole === "admin"
                      ? c.unlimited
                      : editingRole === "finance"
                        ? "USD 1,000,000"
                        : c.noApproval
                  }
                />
              </label>
              <label className="full">
                {locale === "en" ? "Permission scope" : "权限范围"}
                <input
                  defaultValue={
                    editingRole === "admin"
                      ? c.adminScope
                      : editingRole === "finance"
                        ? c.financeScope
                        : c.auditorScope
                  }
                />
              </label>
            </div>
            <p className="lx-settings-modal__description">
              {locale === "en"
                ? "Changes to limits or funds permissions require dual review."
                : locale === "zh-TW"
                  ? "修改審批額度或資金權限後，將觸發雙人覆核。"
                  : "修改审批额度或资金权限后，将触发双人复核。"}
            </p>
            <div className="lx-settings-modal__actions">
              <button
                className="lx-settings-ghost"
                type="button"
                onClick={() => setEditingRole(null)}
              >
                {locale === "en" ? "Cancel" : "取消"}
              </button>
              <button
                className="lx-cta"
                type="button"
                onClick={() => setEditingRole(null)}
              >
                {locale === "en"
                  ? "Submit change"
                  : locale === "zh-TW"
                    ? "提交變更"
                    : "提交变更"}
              </button>
            </div>
          </div>
        </div>
      )}
      {viewingRole && (
        <div
          className="lx-settings-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setViewingRole(null);
          }}
        >
          <div
            className="lx-settings-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="role-details-title"
          >
            <div className="lx-settings-modal__head">
              <h2 id="role-details-title">
                {locale === "en"
                  ? "Role details"
                  : locale === "zh-TW"
                    ? "角色詳情"
                    : "角色详情"}{" "}
                ·{" "}
                {viewingRole === "admin"
                  ? c.administrator
                  : viewingRole === "finance"
                    ? c.financeApprover
                    : c.auditor}
              </h2>
              <button
                type="button"
                onClick={() => setViewingRole(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="lx-role-detail-list">
              <div>
                <small>{c.role}</small>
                <strong>
                  {viewingRole === "admin"
                    ? c.administrator
                    : viewingRole === "finance"
                      ? c.financeApprover
                      : c.auditor}
                </strong>
              </div>
              <div>
                <small>{c.scope}</small>
                <strong>
                  {viewingRole === "admin"
                    ? c.adminScope
                    : viewingRole === "finance"
                      ? c.financeScope
                      : c.auditorScope}
                </strong>
              </div>
              <div>
                <small>{c.limit}</small>
                <strong>
                  {viewingRole === "admin"
                    ? c.unlimited
                    : viewingRole === "finance"
                      ? "USD 1,000,000"
                      : c.noApproval}
                </strong>
              </div>
            </div>
            <div className="lx-settings-modal__actions">
              <button
                className="lx-settings-ghost"
                type="button"
                onClick={() => {
                  setEditingRole(viewingRole);
                  setViewingRole(null);
                }}
              >
                {c.edit}
              </button>
              <button
                className="lx-cta"
                type="button"
                onClick={() => setViewingRole(null)}
              >
                {locale === "en" ? "Close" : "关闭"}
              </button>
            </div>
          </div>
        </div>
      )}
      {editingUser && (
        <div
          className="lx-settings-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setEditingUser(null);
          }}
        >
          <div
            className="lx-settings-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-user-title"
          >
            <div className="lx-settings-modal__head">
              <h2 id="edit-user-title">
                {locale === "en"
                  ? "Edit user"
                  : locale === "zh-TW"
                    ? "編輯使用者"
                    : "编辑用户"}
              </h2>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setEditingUser(null);
              }}
            >
              <div className="lx-settings-role-form">
                <label>
                  {c.role}
                  <select
                    defaultValue={
                      editingUser === "lin"
                        ? "administrator"
                        : editingUser === "chen"
                          ? "finance"
                          : "compliance"
                    }
                  >
                    <option value="administrator">{c.administrator}</option>
                    <option value="finance">{c.financeApprover}</option>
                    <option value="compliance">{c.compliance}</option>
                  </select>
                </label>
                <label>
                  {locale === "en"
                    ? "Approval scope"
                    : locale === "zh-TW"
                      ? "審批範圍"
                      : "审批范围"}
                  <input required defaultValue="Payments, refunds" />
                </label>
              </div>
              <p className="lx-settings-modal__description">
                {locale === "en"
                  ? "Role or approval-scope changes notify the user and create an audit record."
                  : locale === "zh-TW"
                    ? "角色或審批範圍變更會觸發使用者通知和稽核記錄。"
                    : "角色或审批范围变更会触发用户通知和审计记录。"}
              </p>
              <div className="lx-settings-modal__actions">
                <button
                  className="lx-settings-ghost"
                  type="button"
                  onClick={() => setEditingUser(null)}
                >
                  {locale === "en" ? "Cancel" : "取消"}
                </button>
                <button className="lx-cta" type="submit">
                  {locale === "en"
                    ? "Save changes"
                    : locale === "zh-TW"
                      ? "儲存變更"
                      : "保存变更"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {userConfirmation && (
        <div
          className="lx-settings-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setUserConfirmation(null);
          }}
        >
          <div
            className="lx-settings-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-confirmation-title"
          >
            <div className="lx-settings-modal__head">
              <h2 id="user-confirmation-title">
                {userConfirmation === "mfa"
                  ? locale === "en"
                    ? "Reset user MFA"
                    : locale === "zh-TW"
                      ? "重設使用者 MFA"
                      : "重置用户 MFA"
                  : locale === "en"
                    ? "Suspend user"
                    : locale === "zh-TW"
                      ? "停用使用者"
                      : "停用用户"}
              </h2>
              <button
                type="button"
                onClick={() => setUserConfirmation(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <p className="lx-template-description">
              {userConfirmation === "mfa"
                ? locale === "en"
                  ? "The user must enroll a new authenticator at next sign-in."
                  : locale === "zh-TW"
                    ? "重設後使用者下次登入必須重新綁定驗證器。"
                    : "重置后用户下次登录必须重新绑定验证器。"
                : locale === "en"
                  ? "Suspending removes sign-in, payout and approval access immediately. Existing audit records remain."
                  : locale === "zh-TW"
                    ? "停用後使用者將立即失去登入、付款和審批權限，已有稽核記錄不會被刪除。"
                    : "停用后用户将立即失去登录、付款和审批权限，已有审计记录不会被删除。"}
            </p>
            <label className="lx-user-confirm-check">
              <input
                type="checkbox"
                checked={userConfirmationChecked}
                onChange={(event) =>
                  setUserConfirmationChecked(event.target.checked)
                }
              />
              {userConfirmation === "mfa"
                ? locale === "en"
                  ? "I confirm resetting MFA"
                  : locale === "zh-TW"
                    ? "我確認重設 MFA"
                    : "我确认重置 MFA"
                : locale === "en"
                  ? "I confirm suspending this user"
                  : locale === "zh-TW"
                    ? "我確認停用該使用者"
                    : "我确认停用该用户"}
            </label>
            <div className="lx-settings-modal__actions">
              <button
                className="lx-settings-ghost"
                type="button"
                onClick={() => setUserConfirmation(null)}
              >
                {locale === "en" ? "Cancel" : "取消"}
              </button>
              <button
                className={
                  userConfirmation === "suspend" ? "lx-danger-button" : "lx-cta"
                }
                type="button"
                disabled={!userConfirmationChecked}
                onClick={() => setUserConfirmation(null)}
              >
                {userConfirmation === "mfa"
                  ? locale === "en"
                    ? "Confirm reset"
                    : locale === "zh-TW"
                      ? "確認重設"
                      : "确认重置"
                  : locale === "en"
                    ? "Confirm suspend"
                    : locale === "zh-TW"
                      ? "確認停用"
                      : "确认停用"}
              </button>
            </div>
          </div>
        </div>
      )}
      {viewingApprovalEvent && (
        <div
          className="lx-settings-modal"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget)
              setViewingApprovalEvent(null);
          }}
        >
          <div
            className="lx-settings-modal__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="approval-event-title"
          >
            <div className="lx-settings-modal__head">
              <h2 id="approval-event-title">
                {locale === "en"
                  ? "Approval event"
                  : locale === "zh-TW"
                    ? "審批事件詳情"
                    : "审批事件详情"}{" "}
                · {viewingApprovalEvent}
              </h2>
              <button
                type="button"
                onClick={() => setViewingApprovalEvent(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="lx-role-detail-list">
              <div>
                <small>
                  {locale === "en"
                    ? "Event ID"
                    : locale === "zh-TW"
                      ? "事件編號"
                      : "事件编号"}
                </small>
                <strong>{viewingApprovalEvent}</strong>
              </div>
              <div>
                <small>
                  {locale === "en"
                    ? "Type"
                    : locale === "zh-TW"
                      ? "事件類型"
                      : "事件类型"}
                </small>
                <strong>
                  {locale === "en"
                    ? "Approval state change"
                    : locale === "zh-TW"
                      ? "審批狀態變更"
                      : "审批状态变更"}
                </strong>
              </div>
              <div>
                <small>
                  {locale === "en"
                    ? "Immutable audit record"
                    : locale === "zh-TW"
                      ? "不可變稽核記錄"
                      : "不可变审计记录"}
                </small>
                <strong>IP 203.0.113.8 · MFA verified</strong>
              </div>
            </div>
            <div className="lx-settings-modal__actions">
              <button
                className="lx-settings-ghost"
                type="button"
                onClick={() => setViewingApprovalEvent(null)}
              >
                {locale === "en" ? "Close" : "关闭"}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
function SettingsHead({
  title,
  desc,
  action,
  onAction,
  secondaryAction,
  onSecondaryAction,
}: {
  title: string;
  desc: string;
  action?: string;
  onAction?: () => void;
  secondaryAction?: string;
  onSecondaryAction?: () => void;
}) {
  return (
    <div className="lx-settings-subhead">
      <div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      {(secondaryAction || action) && (
        <div className="lx-settings-head-actions">
          {secondaryAction && (
            <button
              className="lx-settings-ghost"
              type="button"
              onClick={onSecondaryAction}
            >
              {secondaryAction}
            </button>
          )}
          {action && (
            <button className="lx-settings-ghost" type="button" onClick={onAction}>
              {action}
            </button>
          )}
        </div>
      )}
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
