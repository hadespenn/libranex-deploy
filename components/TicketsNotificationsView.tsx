"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import DashboardShell from "./DashboardShell";

export default function TicketsNotificationsView({
  kind,
}: {
  kind: "tickets" | "notifications";
}) {
  const tickets = useTranslations("tickets");
  const notifications = useTranslations("notifications");
  const current = kind === "tickets" ? tickets : notifications;
  const [ticketOpen, setTicketOpen] = useState(false);
  const keys = ["first", "second", "third"] as const;
  return (
    <DashboardShell
      active="tickets"
      headerTitle={current("header.title")}
      headerSubtitle={current("header.subtitle")}
    >
      <div className="lx-management-hero">
        <div>
          <h2 className="lx-section-title">
            {tickets("hero.title")} &amp; {notifications("hero.title")}
          </h2>
          <p className="lx-section-sub">
            {tickets("hero.subtitle")} {notifications("hero.subtitle")}
          </p>
        </div>
        <button className="lx-cta" type="button" onClick={() => setTicketOpen(true)}>
          {tickets("cta")}
        </button>
      </div>
      {ticketOpen && <div className="lx-ticket-modal" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && setTicketOpen(false)}>
        <div className="lx-ticket-modal__panel">
          <div className="lx-ticket-modal__head"><h2>{tickets("modal.title")}</h2><button type="button" aria-label={tickets("modal.close")} onClick={() => setTicketOpen(false)}>×</button></div>
          <div className="form-grid lx-ticket-modal__form">
            <div className="field"><label>{tickets("modal.category")}</label><select><option>{tickets("modal.settlement")}</option><option>{tickets("modal.kyc")}</option><option>{tickets("modal.payment")}</option></select></div>
            <div className="field"><label>{tickets("modal.priority")}</label><select><option>{tickets("modal.normal")}</option><option>{tickets("modal.urgent")}</option></select></div>
            <div className="field lx-full"><label>{tickets("modal.description")}</label><textarea defaultValue={tickets("modal.descriptionValue")} /></div>
          </div>
          <button className="lx-cta" type="button" onClick={() => setTicketOpen(false)}>{tickets("modal.submit")}</button>
        </div>
      </div>}
      <div className="lx-support-grid">
        <section
          className={`lx-panel lx-ticket-panel ${kind === "notifications" ? "is-secondary" : ""}`}
        >
          <div className="lx-section-header">
            <h2 className="lx-section-title">
              {notifications("header.title")}
            </h2>
          </div>
          <div className="lx-native-table-wrap">
            <table className="lx-native-table">
              <thead>
                <tr>
                  <th>{notifications("table.priority")}</th>
                  <th>{notifications("table.message")}</th>
                  <th>{notifications("table.status")}</th>
                </tr>
              </thead>
              <tbody>
                {keys.map((key, index) => (
                  <tr key={key}>
                    <td>
                      <span
                        className={`lx-status lx-status--${index === 0 ? "danger" : index === 1 ? "warning" : "success"}`}
                      >
                        {notifications(`items.${key}.meta`)}
                      </span>
                    </td>
                    <td>{notifications(`items.${key}.description`)}</td>
                    <td>{notifications(`items.${key}.action`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section
          className={`lx-panel lx-ticket-panel ${kind === "notifications" ? "is-highlighted" : ""}`}
          id="tickets"
        >
          <div className="lx-section-header">
            <h2 className="lx-section-title">{tickets("hero.title")}</h2>
          </div>
          <div className="lx-native-table-wrap">
            <table className="lx-native-table">
              <thead>
                <tr>
                  <th>{tickets("table.ticket")}</th>
                  <th>{tickets("table.category")}</th>
                  <th>{tickets("table.sla")}</th>
                  <th>{tickets("table.status")}</th>
                </tr>
              </thead>
              <tbody>
                {keys.map((key) => (
                  <tr key={key}>
                    <td>{tickets(`items.${key}.title`)}</td>
                    <td>{tickets(`items.${key}.meta`)}</td>
                    <td>{tickets(`items.${key}.time`)}</td>
                    <td>
                      <span className="lx-status lx-status--warning">
                        {tickets(`items.${key}.action`)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
