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
        <button className="lx-cta" type="button" onClick={() => setApiKeyOpen(true)}>
          {t("cta")}
        </button>
      </div>
      <div className="lx-dev-grid">
        <section className="lx-panel lx-dev-panel">
          <div className="lx-dev-panel-head">
            <div>
              <h2>{t("explorer.title")}</h2>
              <p>{t("explorer.subtitle")}</p>
            </div>
            <span className="lx-pill lx-pill--active">POST</span>
          </div>
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
          <p className="lx-section-sub">{t("capabilities.subtitle")}</p>
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
        </section>
      </div>
      <section className="lx-panel lx-dev-panel lx-dev-log">
        <div className="lx-section-header">
          <div>
            <h2>{t("logs.title")}</h2>
            <p className="lx-section-sub">{t("logs.subtitle")}</p>
          </div>
          <button className="lx-outline-btn" type="button">
            {t("logs.view")}
          </button>
        </div>
        <div className="lx-dev-log-table">
          <div>
            <span>POST</span>
            <b>/v1/settlement_routes</b>
            <i className="ok">200</i>
            <small>142 ms</small>
          </div>
          <div>
            <span>GET</span>
            <b>/v1/accounts</b>
            <i className="ok">200</i>
            <small>86 ms</small>
          </div>
          <div>
            <span>POST</span>
            <b>/v1/payment_links</b>
            <i className="warn">401</i>
            <small>104 ms</small>
          </div>
        </div>
      </section>
      {apiKeyOpen && <div className="lx-api-key-modal" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && setApiKeyOpen(false)}>
        <div className="lx-api-key-modal__panel">
          <div className="lx-api-key-modal__head"><h2>{t("apiKeyModal.title")}</h2><button type="button" aria-label={t("apiKeyModal.close")} onClick={() => setApiKeyOpen(false)}>×</button></div>
          <p className="lx-section-sub">{t("apiKeyModal.note")}</p>
          <pre className="lx-api-code"><code><span>{t("apiKeyModal.prefix")}</span>••••••••••••••••</code></pre>
          <button className="lx-cta" type="button" onClick={() => setApiKeyOpen(false)}>{t("apiKeyModal.generate")}</button>
        </div>
      </div>}
    </DashboardShell>
  );
}
