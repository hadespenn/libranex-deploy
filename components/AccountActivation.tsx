"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import enMessages from "../messages/en.json";
import zhCnMessages from "../messages/zh-CN.json";
import zhTwMessages from "../messages/zh-TW.json";

type View =
  | "company"
  | "address"
  | "business"
  | "operations"
  | "owner"
  | "identity"
  | "review"
  | "submitted";

const views: { id: View; labelKey: keyof typeof zhCnMessages.activation; stage: number }[] = [
  { id: "company", labelKey: "companyProfile", stage: 1 },
  { id: "address", labelKey: "companyAddress", stage: 1 },
  { id: "business", labelKey: "businessDetails", stage: 1 },
  { id: "operations", labelKey: "businessOperations", stage: 1 },
  { id: "owner", labelKey: "beneficialOwner", stage: 2 },
  { id: "identity", labelKey: "identityVerification", stage: 2 },
  { id: "review", labelKey: "reviewSubmit", stage: 3 },
];

function Field({
  label,
  children,
  full = false,
  optional = false,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
  optional?: boolean;
}) {
  return (
    <div
      className={`field ${full ? "full" : ""} ${optional ? "optional" : ""}`}
    >
      <label>{label}</label>
      {children}
    </div>
  );
}

function FileUpload({
  title,
  note,
  required = false,
  buttonLabel,
  emptyLabel,
}: {
  title: string;
  note?: string;
  required?: boolean;
  buttonLabel: string;
  emptyLabel: string;
}) {
  return (
    <div className="kyc-evidence-card">
      <div className="evidence-title">
        <b>
          {title}
          {required ? " *" : ""}
        </b>
        {note && <small>{note}</small>}
      </div>
      <label className="file-picker">
        <input type="file" hidden />
        <span className="file-picker-button">{buttonLabel}</span>
        <em className="file-picker-name">{emptyLabel}</em>
      </label>
    </div>
  );
}

function KycBlock({
  title,
  children,
  level = "h2",
}: {
  title?: string;
  children: React.ReactNode;
  level?: "h2" | "h3";
}) {
  return (
    <div className={level === "h2" ? "activation-card" : "kyc-block"}>
      {title && (level === "h2" ? <h2>{title}</h2> : <h3>{title}</h3>)}
      {children}
    </div>
  );
}

export default function AccountActivation({
  onClose,
}: {
  onClose: () => void;
}) {
  const [view, setView] = useState<View>("company");
  const [savedKey, setSavedKey] = useState<"draftSaved" | "autosaved">("draftSaved");
  const [shareholders, setShareholders] = useState<number[]>([]);
  const [nextShareholderId, setNextShareholderId] = useState(1);
  const params = useParams<{ locale: string }>();
  const [locale, setLocale] = useState(params.locale || "zh-CN");
  const activationMessages =
    locale === "en"
      ? enMessages.activation
      : locale === "zh-TW"
        ? zhTwMessages.activation
        : zhCnMessages.activation;
  const current = views.find((item) => item.id === view);
  const go = (next: View) => {
    setView(next);
    setSavedKey("autosaved");
    window.scrollTo(0, 0);
  };
  const next: Record<string, View> = {
    company: "address",
    address: "business",
    business: "operations",
    operations: "owner",
    owner: "identity",
    identity: "review",
  };

  const stageViews: Record<number, View> = {
    1: "company",
    2: "owner",
    3: "review",
  };

  const t = (key: keyof typeof activationMessages) => activationMessages[key];

  return (
    <div
      key={locale}
      className="activation-shell"
      onChange={() => setSavedKey("autosaved")}
    >
      <header className="activation-top">
        <div>
          <button
            type="button"
            className="close"
            onClick={onClose}
            aria-label="关闭"
          >
            ×
          </button>
          <b>{t("activateYourAccount")}</b>
        </div>
        <div className="activation-lan">
          <LanguageSwitcher value={locale} onLocaleChange={setLocale} />
          <span className="status warn">{t(savedKey)}</span>
        </div>
      </header>

      <div className="activation-layout">
        <aside className="activation-nav">
          {[1, 2, 3].map((stage) => (
            <div
              key={stage}
              className={`activation-stage ${current?.stage === stage ? "active" : ""} ${(current?.stage || 4) > stage ? "done" : ""}`}
              data-stage={stage}
            >
              <button
                type="button"
                data-number={stage}
                onClick={() => go(stageViews[stage])}
              >
                Step {stage}:{" "}
                {stage === 1
                  ? "设置企业资料"
                  : stage === 2
                    ? "核验所有权"
                    : t("reviewAndSubmit")}
              </button>
              <ul>
                {views
                  .filter((v) => v.stage === stage)
                  .map((v) => (
                    <li key={v.id}>
                      <button
                        type="button"
                        className={`${view === v.id ? "active" : ""} ${views.findIndex((item) => item.id === v.id) <= views.findIndex((item) => item.id === view) ? "done" : ""}`}
                        onClick={() => go(v.id)}
                      >
                        {t(v.labelKey)}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </aside>

        <main className="activation-content">
          <div className="activation-form">
            {view !== "submitted" && (
              <div className="activation-hero">
                <h1>{t("activateYourBusinessAccount")}</h1>
                <p>
                  {t("completeTheInformationBelowToApplyForMultiCurrencyAccountsCollectionsPay")}
                </p>
              </div>
            )}

            {view === "company" && (
              <section className="activation-view active" id="act-company">
                <KycBlock title={t("companyProfile")}>
                  <div className="form-grid">
                    <Field label={t("legalBusinessName")}>
                      <input defaultValue="Unity Centre Investment Ltd." />
                    </Field>
                    <Field label={t("legalBusinessForm")}>
                      <select>
                        <option>{t("limitedCompanyIncorporatedEntity")}</option>
                        <option>{t("partnership")}</option>
                        <option>{t("ngoCharity")}</option>
                        <option>{t("regulatedFinancialInstitution")}</option>
                      </select>
                    </Field>
                    <Field label={t("registrationNumber")}>
                      <input defaultValue="BC-2026-184920" />
                    </Field>
                    <Field label={t("jurisdictionOfIncorporation")}>
                      <select>
                        <option>Canada</option>
                        <option>Singapore</option>
                        <option>Hong Kong, China</option>
                        <option>BVI</option>
                      </select>
                    </Field>
                    <Field label={t("incorporationDate")}>
                      <input type="date" defaultValue="2020-09-18" />
                    </Field>
                    <Field label={t("companyWebsite")} optional>
                      <input defaultValue="https://www.unitycentre.com" />
                    </Field>
                  </div>
                </KycBlock>

                <KycBlock title={t("contactInformation")} level="h3">
                  <div className="form-grid">
                    <Field label={t("contactName")}>
                      <input defaultValue="Aline Chen" />
                    </Field>
                    <Field label={t("contactPhone")}>
                      <input defaultValue="+86 138 5342 4910" />
                    </Field>
                    <Field label={t("contactEmail")}>
                      <input type="email" defaultValue="aline@libranex.com" />
                    </Field>
                  </div>
                </KycBlock>

                <KycBlock title={t("businessRegistrationAndCoreEvidence")} level="h3">
                  <div className="kyc-evidence-grid">
                    <FileUpload
                      buttonLabel={t("chooseFile")}
                      emptyLabel={t("noFileChosen")}
                      title={t("businessLicenceCertificateOfIncorporation")}
                      note={t("requiredCurrentValidVersion")}
                      required
                    />
                    <FileUpload
                      buttonLabel={t("chooseFile")}
                      emptyLabel={t("noFileChosen")}
                      title={t("articlesConstitution")}
                      note={t("requiredArticlesConstitution")}
                      required
                    />
                    <FileUpload
                      buttonLabel={t("chooseFile")}
                      emptyLabel={t("noFileChosen")}
                      title={t("ownershipStructureChart")}
                      note="必填 · 展示最终受益所有人"
                      required
                    />
                    <FileUpload
                      buttonLabel={t("chooseFile")}
                      emptyLabel={t("noFileChosen")}
                      title={t("businessPremisesPhotos")}
                      note="选填"
                    />
                  </div>
                </KycBlock>
              </section>
            )}

            {view === "address" && (
              <section className="activation-view active" id="act-address">
                <KycBlock title={t("registeredAndOperatingAddress")}>
                  <div className="form-grid">
                    <Field label={t("countryRegionOfIncorporation")}>
                      <select>
                        <option>Canada</option>
                        <option>Singapore</option>
                        <option>Hong Kong, China</option>
                      </select>
                    </Field>
                    <Field label={t("primaryOperatingCountryRegion")}>
                      <input defaultValue="Canada, Singapore, Hong Kong" />
                    </Field>
                    <Field label="省 / 州">
                      <input defaultValue="British Columbia" />
                    </Field>
                    <Field label={t("city")}>
                      <input defaultValue="Vancouver" />
                    </Field>
                    <Field label={t("streetAddress")} full>
                      <input defaultValue="1055 W Georgia Street" />
                    </Field>
                    <Field label={t("apartmentSuiteOrFloor")} optional>
                      <input placeholder="如适用" />
                    </Field>
                    <Field label="邮政编码">
                      <input defaultValue="V6C 1T2" />
                    </Field>
                  </div>
                </KycBlock>

                <KycBlock title={t("proofOfAddress")} level="h3">
                  <div className="kyc-evidence-grid">
                    <FileUpload
                      buttonLabel={t("chooseFile")}
                      emptyLabel={t("noFileChosen")}
                      title="注册地址证明"
                      note="三个月内的银行账单或公共事业账单"
                    />
                    <FileUpload
                      buttonLabel={t("chooseFile")}
                      emptyLabel={t("noFileChosen")}
                      title="经营场所证明"
                      note="租赁合同、产权证明或有效账单"
                    />
                  </div>
                </KycBlock>

                <KycBlock title={t("withdrawalAccountIfApplicable")} level="h3">
                  <div className="form-grid">
                    <Field label={t("bankAccountName")}>
                      <input defaultValue="Unity Centre Investment Ltd." />
                    </Field>
                    <Field label={t("bankAccountNumber")}>
                      <input defaultValue="SG00 1234 5678 9012" />
                    </Field>
                    <Field label={t("bankAccountCountryRegion")}>
                      <select>
                        <option>Singapore</option>
                        <option>Canada</option>
                        <option>Hong Kong, China</option>
                      </select>
                    </Field>
                    <Field label={t("accountCurrencies")}>
                      <input defaultValue="USD, EUR, SGD" />
                    </Field>
                    <Field label="SWIFT CODE">
                      <input defaultValue="DBSSSGSG" />
                    </Field>
                    <Field label={t("bankName")}>
                      <input defaultValue="DBS Bank" />
                    </Field>
                    <Field label={t("bankCodeRoutingNumber")}>
                      <input defaultValue="7171" />
                    </Field>
                    <Field label={t("bankBranchAddress")}>
                      <input defaultValue="12 Marina Boulevard, Singapore" />
                    </Field>
                  </div>
                  <div className="kyc-evidence-grid" style={{ marginTop: 12 }}>
                    <FileUpload
                      buttonLabel={t("chooseFile")}
                      emptyLabel={t("noFileChosen")}
                      title={t("bankAccountProof")}
                      note="如银行对账单或开户确认函"
                      required
                    />
                  </div>
                </KycBlock>
              </section>
            )}

            {view === "business" && (
              <section className="activation-view active" id="act-business">
                <KycBlock title={t("businessDetails")}>
                  <div className="form-grid">
                    <Field label={t("industry")}>
                      <select>
                        <option>Investment & Asset Management</option>
                        <option>Technology</option>
                        <option>International Trade</option>
                      </select>
                    </Field>
                    <Field label={t("expectedAnnualProcessingVolume")}>
                      <select>
                        <option>USD 1M – 5M</option>
                        <option>USD 5M – 10M</option>
                        <option>USD 10M+</option>
                      </select>
                    </Field>
                    <Field label={t("primarySourceOfFunds")}>
                      <select>
                        <option>{t("corporateFunds")}</option>
                        <option>营业收入</option>
                        <option>股东投资</option>
                        <option>贷款/融资</option>
                      </select>
                    </Field>
                    <Field label={t("expectedCurrencies")}>
                      <input defaultValue="USD, EUR, SGD, HKD" />
                    </Field>
                    <Field label={t("businessModelAndIntendedUse")} full>
                      <textarea defaultValue="跨境投资、企业咨询及资产管理服务。" />
                    </Field>
                  </div>
                </KycBlock>
              </section>
            )}

            {view === "operations" && (
              <section className="activation-view active" id="act-operations">
                <KycBlock title={t("businessOperations")}>
                  <div className="form-grid">
                    <Field label={t("primaryCollectionMarkets")}>
                      <input defaultValue="Canada, Singapore, United Kingdom" />
                    </Field>
                    <Field label={t("primaryPayoutMarkets")}>
                      <input defaultValue="Singapore, China, United States" />
                    </Field>
                    <Field label={t("expectedTransactionSize")}>
                      <input defaultValue="USD 500 – 50,000" />
                    </Field>
                    <Field label={t("expectedMonthlyTransactionCount")}>
                      <input defaultValue="200 – 500" />
                    </Field>
                    <Field label={t("willThirdPartyPaymentsBeInvolved")}>
                      <select>
                        <option>{t("no")}</option>
                        <option>是</option>
                      </select>
                    </Field>
                    <Field label={t("willAgentMerchantChannelsBeUsed")}>
                      <select>
                        <option>{t("no")}</option>
                        <option>是</option>
                      </select>
                    </Field>
                    <Field label="买家/服务所在国">
                      <input defaultValue="Canada, Singapore, United Kingdom" />
                    </Field>
                    <Field label={t("partnerCountries")}>
                      <input defaultValue="Singapore, China, United States" />
                    </Field>
                    <Field label={t("inboundCurrencies")}>
                      <input defaultValue="USD, EUR, SGD, HKD" />
                    </Field>
                    <Field label={t("outboundCurrencies")}>
                      <input defaultValue="USD, EUR, SGD, HKD" />
                    </Field>
                    <Field label={t("natureOfTransactionFunds")}>
                      <select>
                        <option>{t("corporateFunds")}</option>
                        <option>贸易货款</option>
                        <option>服务收入</option>
                      </select>
                    </Field>
                    <Field label={t("paymentPurpose")}>
                      <select>
                        <option>供应商结算、跨境贸易付款</option>
                        <option>服务采购</option>
                        <option>投资出资</option>
                      </select>
                    </Field>
                    <Field label={t("natureOfBusiness")}>
                      <input defaultValue="跨境贸易及企业服务" />
                    </Field>
                    <Field label={t("monthlyTransactionCount")}>
                      <input defaultValue="200 – 500" />
                    </Field>
                    <Field label={t("monthlyTransactionVolume")} full>
                      <input defaultValue="USD 1M – 5M" />
                    </Field>
                  </div>
                </KycBlock>
                <div className="kyc-hint">
                  <p>
                    系统将于该些信息建立初始客户画像；显著偏离画像的交易会触发持续监控和人工复核。
                  </p>
                </div>
              </section>
            )}

            {view === "owner" && (
              <section className="activation-view active" id="act-owner">
                <KycBlock title={t("beneficialOwnersAndAuthorizedRepresentatives")}>
                  <div className="form-grid">
                    <Field label={t("firstName")}>
                      <input defaultValue="Aline" />
                    </Field>
                    <Field label={t("lastName")}>
                      <input defaultValue="Chen" />
                    </Field>
                    <Field label={t("localName")} optional>
                      <input placeholder="如适用" />
                    </Field>
                    <Field label={t("email")}>
                      <input type="email" defaultValue="aline@libranex.com" />
                    </Field>
                    <Field label={t("ownerType")}>
                      <select>
                        <option>最终受益所有人 (UBO)</option>
                        <option>董事</option>
                        <option>{t("authorizedRepresentative")}</option>
                      </select>
                    </Field>
                    <Field label={t("ownership")}>
                      <input defaultValue="62%" />
                    </Field>
                    <Field label={t("nationality")}>
                      <select>
                        <option>Canada</option>
                        <option>China</option>
                        <option>Singapore</option>
                      </select>
                    </Field>
                    <Field label={t("dateOfBirth")}>
                      <input type="date" defaultValue="1986-05-22" />
                    </Field>
                    <Field label={t("phoneNumber")}>
                      <input defaultValue="+86 138 5342 4910" />
                    </Field>
                    <Field label="税号 / ID号">
                      <input defaultValue="**********" />
                    </Field>
                  </div>

                  <KycBlock title={t("residentialAddress")} level="h3">
                    <div className="form-grid">
                      <Field label={t("countryTerritory")}>
                        <select>
                          <option>Canada</option>
                          <option>China</option>
                          <option>Singapore</option>
                        </select>
                      </Field>
                      <Field label={t("city")}>
                        <input defaultValue="Vancouver" />
                      </Field>
                      <Field label={t("streetAddress")} full>
                        <input defaultValue="1055 W Georgia Street" />
                      </Field>
                      <Field label={t("apartmentSuiteOrFloor2")} optional>
                        <input placeholder="可选" />
                      </Field>
                      <Field label={t("stateProvince")}>
                        <input defaultValue="British Columbia" />
                      </Field>
                      <Field label="邮政编码">
                        <input defaultValue="V6C 1T2" />
                      </Field>
                    </div>
                  </KycBlock>

                  <KycBlock title={t("uboSupportingDocuments")} level="h3">
                    <div className="kyc-evidence-grid">
                      <FileUpload
                      buttonLabel={t("chooseFile")}
                      emptyLabel={t("noFileChosen")}
                        title={t("identityDocumentsForUbosOver25")}
                        note="必需 · 所有持股或控制权超过 25% 的自然人"
                        required
                      />
                      <FileUpload
                      buttonLabel={t("chooseFile")}
                      emptyLabel={t("noFileChosen")}
                        title={t("uboPersonalProofOfAddress")}
                        note="如注册地址为 PO，则需提供水电缴费单等地址证明"
                      />
                    </div>
                  </KycBlock>
                </KycBlock>

                <KycBlock title={t("otherShareholdersAndOwnershipStructure")} level="h3">
                  <div className="kyc-repeater">
                    <div className="kyc-repeater-row">
                      <b>{t("individualShareholder")}</b>
                      <div className="form-grid">
                        <Field label={t("name")}>
                          <input defaultValue="Chunhua Xu" />
                        </Field>
                        <Field label={t("nationality")}>
                          <select>
                            <option>China</option>
                            <option>Canada</option>
                            <option>Singapore</option>
                          </select>
                        </Field>
                        <Field label={t("documentType")}>
                          <select>
                            <option>{t("passport")}</option>
                            <option>{t("nationalIdCard")}</option>
                          </select>
                        </Field>
                        <Field label={t("documentNumber")}>
                          <input defaultValue="P******82" />
                        </Field>
                        <Field label={t("validityPeriod")}>
                          <input defaultValue="2022-05-01 至 2032-04-30" />
                        </Field>
                        <Field label={t("gender")}>
                          <select>
                            <option>{t("female")}</option>
                            <option>{t("male")}</option>
                          </select>
                        </Field>
                        <Field label={t("dateOfBirth")}>
                          <input type="date" defaultValue="1982-05-11" />
                        </Field>
                        <Field label={t("telephoneNumber")}>
                          <input defaultValue="+86 138 5342 4910" />
                        </Field>
                      </div>
                    </div>
                    <div className="kyc-repeater-row">
                      <b>{t("corporateShareholder")}</b>
                      <div className="form-grid">
                        <Field label={t("companyName")}>
                          <input defaultValue="示例控股有限公司" />
                        </Field>
                        <Field label={t("countryOfIncorporation")}>
                          <select>
                            <option>Hong Kong, China</option>
                            <option>Singapore</option>
                            <option>Canada</option>
                          </select>
                        </Field>
                        <Field label={t("companyIncorporationDate")}>
                          <input type="date" defaultValue="2016-03-21" />
                        </Field>
                        <Field label={t("certificateInformation")}>
                          <input defaultValue="ROC-EXAMPLE-2016" />
                        </Field>
                      </div>
                    </div>
                    {shareholders.map((shareholderId) => (
                      <div className="kyc-repeater-row" key={shareholderId}>
                        <b>新增股东</b>
                        <div className="form-grid">
                          <Field label="股东类型">
                            <select>
                              <option>{t("individualShareholder")}</option>
                              <option>{t("corporateShareholder")}</option>
                            </select>
                          </Field>
                          <Field label="姓名 / 企业名称">
                            <input />
                          </Field>
                          <Field label={t("ownership")}>
                            <input placeholder="例如 10%" />
                          </Field>
                        </div>
                        <div className="kyc-repeater-actions">
                          <button
                            className="secondary"
                            type="button"
                            onClick={() =>
                              setShareholders((items) =>
                                items.filter((id) => id !== shareholderId),
                              )
                            }
                          >
                            移除
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      className="secondary"
                      type="button"
                      onClick={() => {
                        setShareholders((items) => [
                          ...items,
                          nextShareholderId,
                        ]);
                        setNextShareholderId((id) => id + 1);
                      }}
                    >
                      ＋ 添加股东
                    </button>
                  </div>
                </KycBlock>
                <div className="kyc-hint">
                  <p>
                    持股或控制权达到 25%
                    及以上的自然人必须纳入受益所有人；信息缺口会自动提高风险等级。
                  </p>
                </div>
                <div className="activation-actions">
                  <button
                    className="secondary"
                    type="button"
                    onClick={() => go("operations")}
                  >
                    {t("back")}
                  </button>
                  <button
                    className="primary"
                    type="button"
                    onClick={() => go("identity")}
                  >
                    {t("saveAndContinue")}
                  </button>
                </div>
              </section>
            )}

            {view === "identity" && (
              <section className="activation-view active" id="act-identity">
                <KycBlock title={t("identityVerificationAndAuthorizationEvidence")}>
                  <div className="form-grid">
                    <Field label={t("documentType")}>
                      <select>
                        <option>{t("passport")}</option>
                        <option>{t("nationalIdCard")}</option>
                        <option>驾驶证</option>
                      </select>
                    </Field>
                    <Field label={t("verificationMethod")}>
                      <select>
                        <option>{t("documentAuthenticityCheckLivenessMatch")}</option>
                        <option>{t("creditFile")}</option>
                        <option>{t("relianceOnATrustedThirdParty")}</option>
                      </select>
                    </Field>
                    <Field label={t("identityDocument")}>
                      <FileUpload
                      buttonLabel={t("chooseFile")}
                      emptyLabel={t("noFileChosen")}
                        title={t("identityDocument")}
                        note="护照、身份证或政府签发证件"
                        required
                      />
                    </Field>
                    <Field label={t("livenessMatch")}>
                      <button className="secondary" type="button">
                        {t("startSecureVerification")}
                      </button>
                    </Field>
                    <Field label={t("ownershipStructureChart")}>
                      <FileUpload
                      buttonLabel={t("chooseFile")}
                      emptyLabel={t("noFileChosen")}
                        title={t("ownershipStructureChart")}
                        note="最新版本，显示持股比例与实际控制人"
                        required
                      />
                    </Field>
                    <Field label={t("authorizationEvidence")}>
                      <FileUpload
                      buttonLabel={t("chooseFile")}
                      emptyLabel={t("noFileChosen")}
                        title={t("authorizationEvidence")}
                        note="董事会决议、授权书或同等文件"
                        required
                      />
                    </Field>
                    <Field label={t("directorAndLegalRepresentativeIdentityDocuments")} full>
                      <FileUpload
                      buttonLabel={t("chooseFile")}
                      emptyLabel={t("noFileChosen")}
                        title={t("directorAndLegalRepresentativeIdentityDocuments")}
                        note="所有董事及法定代表人的有效证件"
                        required
                      />
                    </Field>
                  </div>
                </KycBlock>

                <KycBlock title={t("bviSpecificDocumentsIfApplicable")} level="h3">
                  <div className="kyc-evidence-grid">
                    <FileUpload
                      buttonLabel={t("chooseFile")}
                      emptyLabel={t("noFileChosen")}
                      title={t("cogsCertificateOfGoodStanding")}
                      note={t("forBviRegisteredEntitiesOnly")}
                    />
                    <FileUpload
                      buttonLabel={t("chooseFile")}
                      emptyLabel={t("noFileChosen")}
                      title={t("coiCertificateOfIncumbency")}
                      note="Certificate of Incumbency"
                    />
                    <FileUpload
                      buttonLabel={t("chooseFile")}
                      emptyLabel={t("noFileChosen")}
                      title="ROM / ROD"
                      note="Register of Members / Register of Directors"
                    />
                  </div>
                </KycBlock>

                <KycBlock title={t("sanctionsPepAdverseMediaScreening")} level="h3">
                  <p>
                    {t("afterSubmissionWeScreenTheBusinessAuthorizedRepresentativesUbosControlle")}
                  </p>
                  <div className="check-row">
                    <div className="check-title">
                      <span className="check-icon">⊘</span>
                      <div className="check-content">
                        <b>制裁筛查</b>
                        <small>
                          将企业、董事、受益所有人与主要制裁名单进行实时比对。
                        </small>
                      </div>
                    </div>
                    <span className="status warn">待筛查</span>
                  </div>
                  <div className="check-row">
                    <div className="check-title">
                      <span className="check-icon">♟</span>
                      <div className="check-content">
                        <b>政治公众人物（PEP）</b>
                        <small>
                          识别董事、受益所有人及授权代表的政治公众身份。
                        </small>
                      </div>
                    </div>
                    <span className="status warn">待筛查</span>
                  </div>
                  <div className="check-row">
                    <div className="check-title">
                      <span className="check-icon">⚠</span>
                      <div className="check-content">
                        <b>负面媒体报道与欺诈警示</b>
                        <small>基于公开信息的风险信号扫描与人工复核。</small>
                      </div>
                    </div>
                    <span className="status warn">待筛查</span>
                  </div>
                </KycBlock>
              </section>
            )}

            {view === "review" && (
              <section className="activation-view active" id="act-review">
                <KycBlock title={t("reviewAndSubmit")}>
                  <div className="activation-review">
                    <div className="review-item">
                      <b>{t("businessProfile")}</b>
                      <span>Unity Centre Investment Ltd. · Canada</span>
                      <button
                        className="secondary"
                        type="button"
                        onClick={() => go("company")}
                      >
                        {t("edit")}
                      </button>
                    </div>
                    <div className="review-item">
                      <b>{t("businessAndTransactionProfile")}</b>
                      <span>Investment & Asset Management · B2B</span>
                      <button
                        className="secondary"
                        type="button"
                        onClick={() => go("business")}
                      >
                        {t("edit")}
                      </button>
                    </div>
                    <div className="review-item">
                      <b>{t("beneficialOwnership")}</b>
                      <span>1 位受益所有人 · Aline Chen 62%</span>
                      <button
                        className="secondary"
                        type="button"
                        onClick={() => go("owner")}
                      >
                        {t("edit")}
                      </button>
                    </div>
                    <div className="review-item">
                      <b>{t("identityAndDocuments")}</b>
                      <span>身份证明文件待提交 · 授权证明待提交</span>
                      <button
                        className="secondary"
                        type="button"
                        onClick={() => go("identity")}
                      >
                        {t("edit")}
                      </button>
                    </div>
                  </div>
                  <label className="activation-consent">
                    <input type="checkbox" defaultChecked />
                    <span>
                      我确认以上信息准确完整，并授权 Libranex
                      按适用法律完成企业核验、身份核验、制裁/PEP
                      筛查与持续监控。
                    </span>
                  </label>
                </KycBlock>
              </section>
            )}

            {view === "submitted" ? (
              <section className="activation-view active" id="act-submitted">
                <div className="auth-status warn">
                  <div className="status-orb">⌛</div>
                  <h2>{t("activationApplicationSubmitted")}</h2>
                  <p>
                    我们将在 1–3
                    个工作日内审核。你可以使用基础控制台功能；收款、付款、兑换与虚拟账户将在审核通过后开放。
                  </p>
                  <aside>
                    {t("theSystemRetainsReviewRecordsDocumentSourcesScreeningResultsAndDecisionT")}
                  </aside>
                </div>
                <div className="activation-actions">
                  <button className="secondary" type="button" onClick={onClose}>
                    {t("back")}
                  </button>
                  <button className="lx-cta" type="button" onClick={onClose}>
                    {t("enterLimitedConsole")}
                  </button>
                </div>
              </section>
            ) : (
              <div className="activation-actions">
                <button type="button" className="secondary" onClick={onClose}>
                  {t("back")}
                </button>
                <button
                  type="button"
                  className="lx-cta"
                  onClick={() =>
                    view === "review" ? go("submitted") : go(next[view])
                  }
                >
                  {view === "review" ? t("submitActivationApplication") : t("saveAndContinue")}
                </button>
                <span className="activation-progress">
                  {views.findIndex((v) => v.id === view) + 1} / {views.length} ·
                  自动保存
                </span>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
