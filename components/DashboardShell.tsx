"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import AccountActivation from "./AccountActivation";

type IconProps = { children: React.ReactNode };
function Icon(p: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {p.children}
    </svg>
  );
}

const NAV_ITEMS = [
  {
    key: "dashboard",
    href: "dashboard",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </>
    ),
  },
  {
    key: "accounts",
    href: "accounts",
    icon: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M16 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      </>
    ),
  },
  {
    key: "statements",
    href: "statements",
    icon: (
      <>
        <path d="M6 3h9l3 3v15H6z" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </>
    ),
  },
  {
    key: "payments",
    href: "payments",
    icon: (
      <>
        <path d="M3 7h13l4 4v6H3z" />
        <path d="M3 11h17" />
      </>
    ),
  },
  {
    key: "exchange",
    href: "exchange",
    icon: (
      <>
        <path d="M4 8 12 4l8 4-8 4-8-4z" />
        <path d="M4 12 12 16l8-4M4 16 12 20l8-4" />
      </>
    ),
  },
  {
    key: "global",
    href: "global",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </>
    ),
  },
  {
    key: "crypto",
    href: "crypto",
    icon: (
      <>
        <path d="M7 8h10M7 12h10M7 16h6" />
        <circle cx="17" cy="16" r="2" />
      </>
    ),
  },
  {
    key: "tickets",
    href: "tickets",
    icon: (
      <>
        <path d="M4 5h16v12H8l-4 3z" />
        <path d="M8 9h8M8 13h5" />
      </>
    ),
  },
  {
    key: "approval",
    href: "approval",
    badge: "4",
    icon: (
      <>
        <path d="M4 7h12l4 4-4 4H4z" />
        <path d="M4 7v10" />
      </>
    ),
  },
  {
    key: "developer",
    href: "developer",
    icon: (
      <>
        <path d="M8 4l-4 8 4 8M16 4l4 8-4 8" />
      </>
    ),
  },
  {
    key: "more",
    href: "more",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12h6M12 9v6" />
      </>
    ),
  },
] as const;

export default function DashboardShell({
  children,
  active,
  headerTitle,
  headerSubtitle,
  toast,
}: {
  children: React.ReactNode;
  active: string;
  headerTitle: string;
  headerSubtitle: string;
  toast?: string;
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activationOpen, setActivationOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [operationOpen, setOperationOpen] = useState(false);
  const t = useTranslations();
  const tDash = useTranslations("dashboard");
  const params = useParams<{ locale: string }>();
  const locale = params.locale;
  const pathname = usePathname();

  useEffect(() => {
    function closeAccountMenu(event: PointerEvent) {
      const target = event.target as Node;
      if (!target.closest(".lx-account-menu")) setAccountMenuOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setAccountMenuOpen(false);
        setOperationOpen(false);
      }
    }
    document.addEventListener("pointerdown", closeAccountMenu);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeAccountMenu);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div className={`lx-dash ${mobileNavOpen ? "lx-dash--nav-open" : ""}`}>
      {mobileNavOpen && (
        <button
          className="lx-sidebar__overlay"
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileNavOpen(false)}
        />
      )}
      <aside className="lx-sidebar">
        <button
          className="lx-sidebar__close"
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileNavOpen(false)}
        >
          ×
        </button>
        <div className="lx-sidebar__brand">
          <img src="/libranex-logo.svg" alt="Libranex" />
          <div>
            <strong>Libranex</strong>
            <small>{tDash("console")}</small>
          </div>
        </div>

        <input
          className="lx-sidebar__search"
          placeholder={tDash("nav.search")}
          aria-label={tDash("nav.search")}
        />

        <div className="lx-sidebar__group-title">
          {locale === "en" ? "PRODUCTS" : "产品功能"}
        </div>

        {NAV_ITEMS.filter((n) =>
          [
            "dashboard",
            "accounts",
            "statements",
            "payments",
            "exchange",
            "global",
            "crypto",
          ].includes(n.key),
        ).map((n) => {
          const href = `/${locale}/${n.href}`;
          const isActive = active === n.key || pathname?.endsWith(`/${n.href}`);
          return (
            <Link
              key={n.key}
              href={href}
              className={`lx-sidebar__item ${isActive ? "active" : ""}`}
              onClick={() => setMobileNavOpen(false)}
            >
              <Icon>{n.icon}</Icon>
              <span>{tDash(`nav.${n.key}`)}</span>
            </Link>
          );
        })}

        <div className="lx-sidebar__group-title">
          {locale === "en" ? "OPERATIONS" : "运营与审批"}
        </div>

        {NAV_ITEMS.filter((n) => n.key === "approval").map((n) => {
          const href = `/${locale}/${n.href}`;
          const isActive = active === n.key;
          return (
            <Link
              key={n.key}
              href={href}
              className={`lx-sidebar__item ${isActive ? "active" : ""}`}
              onClick={() => setMobileNavOpen(false)}
            >
              <Icon>{n.icon}</Icon>
              <span>{tDash(`nav.${n.key}`)}</span>
              {"badge" in n && n.badge ? (
                <span className="badge">{n.badge}</span>
              ) : null}
            </Link>
          );
        })}

        <div className="lx-sidebar__group-title">
          {locale === "en" ? "DEVELOPERS" : "开发与设置"}
        </div>

        {(["developer", "tickets", "more"] as const)
          .map((key) => NAV_ITEMS.find((n) => n.key === key)!)
          .map((n) => {
            const href = `/${locale}/${n.href}`;
            const isActive = active === n.key;
            return (
              <Link
                key={n.key}
                href={href}
                className={`lx-sidebar__item ${isActive ? "active" : ""}`}
                onClick={() => setMobileNavOpen(false)}
              >
                <Icon>{n.icon}</Icon>
                <span>{tDash(`nav.${n.key}`)}</span>
              </Link>
            );
          })}
      </aside>

      <main className="lx-main">
        <header className="lx-topbar">
          <button
            className="lx-menu-btn"
            type="button"
            aria-label="Open navigation"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
          <div>
            <div className="lx-topbar__title">{headerTitle}</div>
            <div className="lx-topbar__subtitle">{headerSubtitle}</div>
          </div>
          <div className="lx-topbar__spacer" />

          <button className="lx-ai-btn" type="button">
            <span>
              ✦{" "}
              <span style={{ marginLeft: 4 }}>
                {tDash("ai")}
                <span style={{ color: "#8b97ad", marginLeft: 4 }}>
                  · {tDash("aiHint")}
                </span>
              </span>
            </span>
            <kbd>E</kbd>
          </button>

          <LanguageSwitcher />

          <Link
            className="lx-bell"
            href={`/${locale}/notifications`}
            aria-label="notifications"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8z" />
              <path d="M10 19a2 2 0 0 0 4 0" />
            </svg>
            <span className="dot">7</span>
          </Link>

          <button className="lx-user" type="button" onClick={() => setActivationOpen(true)}>
            {tDash("activate")}
          </button>
          <button className="lx-cta" type="button" onClick={() => setOperationOpen(true)}>
            {tDash("startOperation")}
          </button>

          <div className="lx-account-menu">
          <button
            className="lx-user"
            type="button"
            aria-expanded={accountMenuOpen}
            aria-haspopup="menu"
            onClick={() => setAccountMenuOpen((open) => !open)}
          >
            <span className="lx-user__avatar">LM</span>
            <span>Lin Manager</span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {accountMenuOpen && (
            <div className="lx-account-menu__panel" role="menu">
              <div className="lx-account-menu__summary">
               
                <strong>Lin Manager</strong><small>finance@unitycentre.com</small>
              </div>
              <Link href={`/${locale}/settings`} role="menuitem" onClick={() => setAccountMenuOpen(false)}>
                {locale === "en" ? "Account profile & security" : "账户资料与安全"}
              </Link>
              <Link href={`/${locale}/settings`} role="menuitem" onClick={() => setAccountMenuOpen(false)}>
                {locale === "en" ? "Team & access permissions" : "团队与访问权限"}
              </Link>
              <button className="lx-account-menu__logout" type="button" role="menuitem" onClick={() => { window.location.href = `/${locale}/login`; }}>
                {locale === "en" ? "Sign out" : "退出登录"}
              </button>
            </div>
          )}
          </div>
        </header>

        <section className="lx-content">{children}</section>
      </main>

      {toast && <div className="lx-toast">{toast}</div>}
      {activationOpen && <AccountActivation onClose={() => setActivationOpen(false)} />}
      {operationOpen && (
        <div className="lx-operation-modal" role="dialog" aria-modal="true" aria-labelledby="operation-title" onClick={(event) => {
          if (event.target === event.currentTarget) setOperationOpen(false);
        }}>
          <div className="lx-operation-modal__panel">
            <div className="lx-operation-modal__head">
              <div><span className="lx-modal-eyebrow">QUICK ACTION</span><h2 id="operation-title">{locale === "en" ? "Start an operation" : "发起操作"}</h2><p>{locale === "en" ? "Choose an action to continue securely." : "选择一项资金操作，填写信息后进入安全审核流程。"}</p></div>
              <button className="lx-operation-modal__close" type="button" aria-label="关闭" onClick={() => setOperationOpen(false)}>×</button>
            </div>
            <div className="lx-operation-modal__grid">
              {[
                ["⇄", "兑换与转账", "在法币与虚拟币之间兑换或转账"],
                ["↗", "批量付款", "上传付款清单并提交审批"],
                ["＋", "充值 / 入金", "发起法币或虚拟币入金"],
                ["⌁", "生成收款链接", "创建链接或二维码收款"],
              ].map(([icon, title, description]) => <button key={title} className="lx-operation-choice" type="button" onClick={() => setOperationOpen(false)}><span>{icon}</span><strong>{locale === "en" ? ({"兑换与转账":"Exchange & transfer","批量付款":"Batch payments","充值 / 入金":"Top up / deposit","生成收款链接":"Payment link"}[title] || title) : title}</strong><small>{description}</small><b>›</b></button>)}
            </div>
            <div className="lx-operation-note">🔒 所有操作都会经过权限校验、合规筛查及必要的双人审批。</div>
          </div>
        </div>
      )}
    </div>
  );
}
