"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import DashboardShell from "./DashboardShell";

const TABS = ["bulk", "link", "reconcile", "payee", "refund"] as const;

export default function PaymentsView() {
  const t = useTranslations("payments");
  const [tab, setTab] = useState<(typeof TABS)[number]>("bulk");
  const [uploaded, setUploaded] = useState(false);
  const [notice, setNotice] = useState("");
  const action = (message: string) => setNotice(message);
  return (
    <DashboardShell
      active="payments"
      headerTitle={t("header.title")}
      headerSubtitle={t("header.subtitle")}
    >
      <div className="section-head payments-head">
        <div>
          <h1>{t("hero.title")}</h1>
          <p>{t("hero.subtitle")}</p>
        </div>
        <button
          className="primary lx-cta"
          type="button"
          onClick={() => {
            setTab("link");
            action("Payment link workspace is ready.");
          }}
        >
          {t("cta.generate")}
        </button>
      </div>

      {notice && <div className="payment-notice">{notice}</div>}
      <div className="tabs payment-tabs">
        {TABS.map((k, i) => (
          <button
            key={k}
            type="button"
            className={`tab ${tab === k ? "active" : ""}`}
            onClick={() => setTab(k)}
          >
            {t(`tabs.${k}`)}
          </button>
        ))}
      </div>

      {tab === "bulk" && (
        <div className="panel payment-stack">
          <h2>{t("purpose.title")}</h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <p className="lx-section-sub" style={{ margin: 0 }}>
              {t("purpose.subtitle")}
            </p>
            <span className="status warn">{t("purpose.submit")}</span>
          </div>
          <div className="lx-balance-row">
            {(["required", "tracking", "amount", "invoice"] as const).map(
              (k) => (
                <article key={k} className="metric">
                  <small>{t(`purpose.fields.${k}.label`)}</small>
                  <strong>{t(`purpose.fields.${k}.value`)}</strong>
                  <span>{t(`purpose.fields.${k}.desc`)}</span>
                </article>
              ),
            )}
          </div>
          <button
            className="primary lx-cta"
            type="button"
            onClick={() => action("Purpose and evidence form opened.")}
          >
            {t(`purpose.fields.required.cta`)}
          </button>
        </div>
      )}

      {tab === "bulk" && (
        <div className="grid two payment-lower">
          <article className="panel">
            <h2>{t("upload.title")}</h2>
            <div className="upload">
              <b>{t("upload.hint")}</b>
              <p>{t("upload.empty")}</p>
              <label className="file-picker">
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  hidden
                  onChange={() => setUploaded(true)}
                />
                <span className="file-picker-button">选择文件</span>
                <span className="file-picker-name">
                  {uploaded ? "payments.csv" : "未选择文件"}
                </span>
              </label>
              <button
                className="ghost"
                onClick={() => {
                  setUploaded(true);
                  action("文件解析完成：128 条有效记录，2 条异常记录。");
                }}
              >
                模拟上传并解析
              </button>
            </div>
            <div className="grid three payment-metrics">
              <div className="metric">
                <small>有效记录</small>
                <strong>{uploaded ? "128" : "0"}</strong>
              </div>
              <div className="metric">
                <small>异常记录</small>
                <strong>{uploaded ? "2" : "0"}</strong>
              </div>
              <div className="metric">
                <small>总金额</small>
                <strong>{uploaded ? "USD 248,600" : "--"}</strong>
              </div>
            </div>
            <div className="actions">
              <button
                className="primary lx-cta"
                onClick={() => action("批次已提交，等待合规审核。")}
              >
                提交批次
              </button>
              <button className="ghost">保存为模板</button>
              <button className="ghost">定时付款</button>
            </div>
          </article>
          <article className="panel">
            <h2>{t("progress.title")}</h2>
            <div className="progress-track">
              <span style={{ width: "64%" }} />
            </div>
            <p className="progress-label">{t("progress.label")}</p>
            <div className="payment-list">
              <b>BULK-20260802-017</b>
              <span>81 / 2 · 预计 T+1</span>
              <span className="status warn">处理中</span>
            </div>
            <div className="payment-list">
              <b>最近更新</b>
              <span>刚刚</span>
            </div>
          </article>
        </div>
      )}
      {tab !== "bulk" && (
        <div className="panel payment-placeholder">
          <h2>{t(`tabs.${tab}`)}</h2>
          <p>
            {tab === "link"
              ? "创建收款链接、二维码并实时查看付款状态。"
              : tab === "reconcile"
                ? "自动匹配银行回执、订单与付款记录，异常项进入人工核对。"
                : tab === "payee"
                  ? "集中管理已验证的企业、银行账户和钱包地址。"
                  : "发起退款并对失败付款进行选择性重试。"}
          </p>
          <div className="form-grid">
            <div className="field">
              <label>搜索 / 交易编号</label>
              <input placeholder="请输入关键词" />
            </div>
            <div className="field">
              <label>状态</label>
              <select>
                <option>全部状态</option>
                <option>处理中</option>
                <option>已完成</option>
              </select>
            </div>
          </div>
          <div className="actions">
            <button
              className="primary lx-cta"
              onClick={() => action("操作已提交，请在列表中查看最新状态。")}
            >
              {tab === "link"
                ? "生成链接 / 二维码"
                : tab === "refund"
                  ? "发起退款"
                  : "运行自动匹配"}
            </button>
            <button className="ghost">查看详情</button>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
