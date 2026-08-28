"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardShell from "./DashboardShell";

type Strategy = "balanced" | "cost" | "speed";
type Transfer = "internal" | "cross" | "payee";

export default function ExchangeView() {
  const t = useTranslations("exchange");
  const [strategy, setStrategy] = useState<Strategy>("balanced");
  const [transfer, setTransfer] = useState<Transfer>("internal");
  const [expired, setExpired] = useState(false);
  const [modal, setModal] = useState<"purpose" | "beneficiary" | null>(null);
  const rates: Record<Strategy, string> = {
    balanced: "1.36084",
    cost: "1.36210",
    speed: "1.35920",
  };
  const transferTabs: Transfer[] = ["internal", "cross", "payee"];

  return (
    <DashboardShell
      active="exchange"
      headerTitle={t("header.title")}
      headerSubtitle={t("header.subtitle")}
    >
      <div className="section-head lx-exchange-heading">
        <div>
          <h1>{t("hero.title")}</h1>
          <p>{t("hero.subtitle")}</p>
        </div>
        <button
          className="primary lx-cta"
          type="button"
          onClick={() => setExpired(false)}
        >
          {t("cta.refresh")}
        </button>
      </div>
      <div className="panel osl-notice">
        <div>
          <h2>{t("swap.title")}</h2>
          <p>{t("swap.subtitle")}</p>
        </div>
        <span className="status warn">{t("swap.badge")}</span>
      </div>
      <div className="grid two lx-exchange-grid">
        <div className="panel">
          <h2>{t("quote.title")}</h2>
          <div className="form-grid">
            <div className="field">
              <label>{t("quote.sell")}</label>
              <input defaultValue="25,000 USD" />
            </div>
            <div className="field">
              <label>{t("quote.buy")}</label>
              <input defaultValue="34,021 SGD" />
            </div>
          </div>
          <div className="quote-box">
            <small>USD → SGD</small>
            <div className="quote-rate">{rates[strategy]}</div>
            <span className="countdown">
              {expired ? t("quote.expired") : "⏱ 28s"}
            </span>
            <button className="ghost mini" type="button">
              {t("quote.fee")}
            </button>
          </div>
          <div className="grid three strategy-grid">
            {(["balanced", "cost", "speed"] as Strategy[]).map((key) => (
              <button
                type="button"
                key={key}
                className={`strategy ${strategy === key ? "active" : ""}`}
                onClick={() => {
                  setStrategy(key);
                  setExpired(false);
                }}
              >
                <b>{t(`quote.strategies.${key}`)}</b>
                <p>{t(`quote.strategyDetails.${key}`)}</p>
              </button>
            ))}
          </div>
          <div className="actions">
            <button className="primary lx-cta" type="button">
              {t("quote.lock")}
            </button>
            <button
              className="ghost"
              type="button"
              onClick={() => setExpired(true)}
            >
              {t("quote.expire")}
            </button>
          </div>
        </div>
        <div className="panel">
          <h2>{t("transfer.title")}</h2>
          <div className="tabs">
            {transferTabs.map((key) => (
              <button
                type="button"
                key={key}
                className={`tab ${transfer === key ? "active" : ""}`}
                onClick={() => setTransfer(key)}
              >
                {t(`transfer.tabs.${key}`)}
              </button>
            ))}
          </div>
          {transfer === "payee" ? (
            <div className="beneficiary-empty">
              <h3>{t("transfer.saved")}</h3>
              <p>{t("transfer.savedDesc")}</p>
              <button className="ghost mini" type="button" onClick={() => setModal("beneficiary")}>
                {t("transfer.add")}
              </button>
            </div>
          ) : (
            <>
              <div className="form-grid">
                <div className="field">
                  <label>
                    {transfer === "internal" ? t("transfer.id") : "SWIFT / BIC"}
                  </label>
                  <input
                    defaultValue={
                      transfer === "internal"
                        ? "vendor@global-supply.com"
                        : "DBSSSGSG"
                    }
                  />
                </div>
                <div className="field">
                  <label>
                    {transfer === "internal"
                      ? t("transfer.name")
                      : t("transfer.account")}
                  </label>
                  <input
                    defaultValue={
                      transfer === "internal"
                        ? "Global Supply Pte. ***"
                        : "885-901-229-1"
                    }
                    disabled={transfer === "internal"}
                  />
                </div>
                <div className="field">
                  <label>{t("transfer.amount")}</label>
                  <input defaultValue="8,800 USD" />
                </div>
                <div className="field">
                  <label>{t("transfer.tfa")}</label>
                  <input defaultValue="••••••" type="password" />
                </div>
              </div>
              <div className="actions">
                <button className="primary lx-cta" type="button">
                  {t("transfer.submit")}
                </button>
                <button className="ghost" type="button" onClick={() => setModal("purpose")}>
                  {t("transfer.purpose")}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {modal && (
        <div className="lx-exchange-modal" role="dialog" aria-modal="true" onClick={(event) => {
          if (event.target === event.currentTarget) setModal(null);
        }}>
          <div className="lx-exchange-modal__panel">
            <div className="lx-exchange-modal__head">
              <h2>{t(modal === "purpose" ? "modal.purposeTitle" : "modal.beneficiaryTitle")}</h2>
              <button className="lx-exchange-modal__close" type="button" aria-label={t("modal.close")} onClick={() => setModal(null)}>×</button>
            </div>
            {modal === "purpose" ? (
              <>
                <div className="auth-note">{t("modal.purposeNote")}</div>
                <div className="form-grid lx-exchange-modal__form">
                  <div className="field lx-full"><label>{t("modal.purposeLabel")} <b className="lx-required">{t("modal.required")}</b></label><textarea defaultValue={t("modal.purposeValue")} placeholder={t("modal.purposePlaceholder")} /></div>
                  <div className="field"><label>{t("modal.tracking")}</label><input defaultValue="DHL-7788-20260730" placeholder={t("modal.trackingPlaceholder")} /></div>
                  <div className="field"><label>{t("modal.invoice")}</label><input defaultValue="INV-2026-0729" placeholder={t("modal.invoicePlaceholder")} /></div>
                  <div className="field lx-full"><label>{t("modal.screenshot")}</label><input type="file" accept="image/*,.pdf" /><small>{t("modal.fileHint")}</small></div>
                  <div className="field lx-full"><label>{t("modal.documents")}</label><input type="file" accept="image/*,.pdf" multiple /><small>{t("modal.documentHint")}</small></div>
                </div>
                <label className="check-row"><input type="checkbox" defaultChecked />{t("modal.confirmPurpose")}</label>
                <button className="lx-cta" type="button" onClick={() => setModal(null)}>{t("modal.savePurpose")}</button>
              </>
            ) : (
              <>
                <div className="auth-note">{t("modal.beneficiaryNote")}</div>
                <div className="form-grid lx-exchange-modal__form">
                  <div className="field"><label>{t("modal.name")}</label><input defaultValue="Global Supply Pte." /></div>
                  <div className="field"><label>{t("modal.type")}</label><select defaultValue="bank"><option value="bank">{t("modal.bank")}</option><option value="wallet">{t("modal.wallet")}</option><option value="internal">{t("modal.internal")}</option></select></div>
                  <div className="field"><label>{t("modal.contact")}</label><input defaultValue="vendor@global-supply.com" /></div>
                  <div className="field"><label>{t("modal.network")}</label><input defaultValue="SWIFT · DBSSSGSG / TRC20" /></div>
                  <div className="field"><label>{t("modal.account")}</label><input defaultValue="885-901-229-1" /></div>
                  <div className="field"><label>{t("modal.defaultPurpose")}</label><input defaultValue={t("modal.purposeDefault")} /></div>
                  <div className="field lx-full"><label>{t("modal.notes")}</label><textarea defaultValue={t("modal.notesValue")} /></div>
                </div>
                <label className="check-row"><input type="checkbox" defaultChecked />{t("modal.confirmBeneficiary")}</label>
                <button className="lx-cta" type="button" onClick={() => setModal(null)}>{t("modal.saveBeneficiary")}</button>
              </>
            )}
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
