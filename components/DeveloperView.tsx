"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import DashboardShell from "./DashboardShell";

export default function DeveloperView() {
  const t = useTranslations("developer");
  const [apiKeyOpen, setApiKeyOpen] = useState(false);
  return (
    <DashboardShell
      active="developer"
      headerTitle={t("header.title")}
      headerSubtitle={t("header.subtitle")}
    >
      <div className="lx-management-hero">
        <div>
          <h2 className="lx-section-title">{t("hero.title")}</h2>
          <p className="lx-section-sub">{t("hero.subtitle")}</p>
        </div>
        <button
          className="lx-cta"
          type="button"
          onClick={() => setApiKeyOpen(true)}
        >
          {t("cta")}
        </button>
      </div>
      <div className="lx-dev-grid">
        <section className="lx-panel lx-dev-panel">
          <h2>{t("explorer.title")}</h2>
          <pre className="lx-api-code">
            <code>
              <span className="method">POST</span> /v1/settlement_routes{`\n`}
              &#123;{`\n`} "source": "USD",{`\n`} "destination": "USDC",{`\n`}{" "}
              "amount": 25000,{`\n`} "strategy": "balanced"{`\n`}&#125;{`\n\n`}
              <span className="success">→ 200 OK</span> settlement route created
            </code>
          </pre>
          <div className="lx-dev-actions">
            <button className="lx-cta" type="button">
              {t("explorer.run")}
            </button>
            <button className="lx-outline-btn" type="button">
              {t("explorer.copy")}
            </button>
          </div>
        </section>
        <section className="lx-panel lx-dev-panel">
          <h2>{t("capabilities.title")}</h2>
          <div className="lx-feature-matrix">
            {(["balance", "transfer", "collection", "webhook"] as const).map(
              (k) => (
                <div className="lx-feature" key={k}>
                  <b>{t(`capabilities.${k}.title`)}</b>
                  <small>{t(`capabilities.${k}.path`)}</small>
                </div>
              ),
            )}
          </div>
          <table className="lx-native-table" style={{ marginTop: 24 }}>
            <thead>
              <tr>
                <th>{t("logs.table.time")}</th>
                <th>{t("logs.table.endpoint")}</th>
                <th>{t("logs.table.status")}</th>
                <th>{t("logs.table.actor")}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { time: "09:22", method: "POST", endpoint: "/v1/transfers", status: 200, actor: "svc_erp" },
                { time: "09:14", method: "GET", endpoint: "/v1/accounts", status: 200, actor: "svc_treasury" },
                { time: "08:41", method: "POST", endpoint: "/v1/payment_links", status: 201, actor: "ops_user" },
              ].map((log, i) => (
                <tr key={`${log.time}-${log.endpoint}-${i}`}>
                  <td>{log.time}</td>
                  <td>{log.method} {log.endpoint}</td>
                  <td>{log.status}</td>
                  <td>{log.actor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
      {apiKeyOpen && (
        <div
          className="lx-api-key-modal"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.target === e.currentTarget && setApiKeyOpen(false)}
        >
          <div className="lx-api-key-modal__panel">
            <div className="lx-api-key-modal__head">
              <h2>{t("apiKeyModal.title")}</h2>
              <button
                type="button"
                aria-label={t("apiKeyModal.close")}
                onClick={() => setApiKeyOpen(false)}
              >
                ×
              </button>
            </div>
            <p className="lx-section-sub">{t("apiKeyModal.note")}</p>
            <pre className="lx-api-code">
              <code>
                <span>{t("apiKeyModal.prefix")}</span>••••••••••••••••
              </code>
            </pre>
            <button
              className="lx-cta"
              type="button"
              onClick={() => setApiKeyOpen(false)}
            >
              {t("apiKeyModal.generate")}
            </button>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
