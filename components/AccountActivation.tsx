"use client";

import { useState } from "react";

type View = "company" | "address" | "business" | "operations" | "owner" | "identity" | "review" | "submitted";

const views: { id: View; label: string; stage: number }[] = [
  { id: "company", label: "企业档案", stage: 1 },
  { id: "address", label: "企业地址", stage: 1 },
  { id: "business", label: "业务信息", stage: 1 },
  { id: "operations", label: "经营情况", stage: 1 },
  { id: "owner", label: "受益所有人", stage: 2 },
  { id: "identity", label: "身份核验", stage: 2 },
  { id: "review", label: "复核与提交", stage: 3 },
];

function Field({ label, children, full = false, optional = false }: { label: string; children: React.ReactNode; full?: boolean; optional?: boolean }) {
  return (
    <div className={`field ${full ? "full" : ""} ${optional ? "optional" : ""}`}>
      <label>{label}</label>
      {children}
    </div>
  );
}

function FileUpload({ title, note, required = false }: { title: string; note?: string; required?: boolean }) {
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
        <span className="file-picker-button">选择文件</span>
        <em className="file-picker-name">未选择文件</em>
      </label>
    </div>
  );
}

function KycBlock({ title, children, level = "h2" }: { title?: string; children: React.ReactNode; level?: "h2" | "h3" }) {
  return (
    <div className={level === "h2" ? "activation-card" : "kyc-block"}>
      {title && (level === "h2" ? <h2>{title}</h2> : <h3>{title}</h3>)}
      {children}
    </div>
  );
}

export default function AccountActivation({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<View>("company");
  const [saved, setSaved] = useState("草稿已保存");
  const current = views.find((item) => item.id === view);
  const go = (next: View) => {
    setView(next);
    setSaved("草稿已自动保存");
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

  const stageViews: Record<number, View> = { 1: "company", 2: "owner", 3: "review" };

  return (
    <div className="activation-shell" onChange={() => setSaved("草稿已自动保存")}>
      <header className="activation-top">
        <button type="button" className="close" onClick={onClose} aria-label="关闭">
          ×
        </button>
        <b>激活你的账户</b>
        <label className="pill lang">
          🌐{" "}
          <select defaultValue="zh-CN">
            <option value="zh-CN">中文</option>
            <option value="zh-TW">繁體中文</option>
            <option value="en">English</option>
          </select>
        </label>
        <span className="status warn">{saved}</span>
      </header>

      <div className="activation-layout">
        <aside className="activation-nav">
          {[1, 2, 3].map((stage) => (
            <div
              key={stage}
              className={`activation-stage ${current?.stage === stage ? "active" : ""} ${(current?.stage || 4) > stage ? "done" : ""}`}
              data-stage={stage}
            >
        <button type="button" data-number={stage} onClick={() => go(stageViews[stage])}>
                Step {stage}: {stage === 1 ? "设置企业资料" : stage === 2 ? "核验所有权" : "复核并提交"}
              </button>
              <ul>
                {views
                  .filter((v) => v.stage === stage)
                  .map((v) => (
                    <li key={v.id}>
                      <button type="button" className={`${view === v.id ? "active" : ""} ${views.findIndex((item) => item.id === v.id) <= views.findIndex((item) => item.id === view) ? "done" : ""}`} onClick={() => go(v.id)}>
                        {v.label}
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
                <h1>激活企业账户</h1>
                <p>完成以下信息后，即可申请开通多币种账户、收付款、兑换和结算能力。</p>
              </div>
            )}

            {view === "company" && (
              <section className="activation-view active" id="act-company">
                <KycBlock title="企业档案">
                  <div className="form-grid">
                    <Field label="法定企业名称"><input defaultValue="Unity Centre Investment Ltd." /></Field>
                    <Field label="企业法律形式">
                      <select>
                        <option>有限公司 / 公司制法人</option>
                        <option>合伙企业</option>
                        <option>NGO / 慈善机构</option>
                        <option>受监管金融机构</option>
                      </select>
                    </Field>
                    <Field label="注册号"><input defaultValue="BC-2026-184920" /></Field>
                    <Field label="注册辖区">
                      <select>
                        <option>Canada</option>
                        <option>Singapore</option>
                        <option>Hong Kong, China</option>
                        <option>BVI</option>
                      </select>
                    </Field>
                    <Field label="成立日期"><input type="date" defaultValue="2020-09-18" /></Field>
                    <Field label="企业官网" optional><input defaultValue="https://www.unitycentre.com" /></Field>
                  </div>
                </KycBlock>

                <KycBlock title="联系人信息" level="h3">
                  <div className="form-grid">
                    <Field label="联系人姓名"><input defaultValue="Aline Chen" /></Field>
                    <Field label="联系人电话"><input defaultValue="+86 138 5342 4910" /></Field>
                    <Field label="联系人邮箱"><input type="email" defaultValue="aline@libranex.com" /></Field>
                  </div>
                </KycBlock>

                <KycBlock title="企业注册与基础佐证材料" level="h3">
                  <div className="kyc-evidence-grid">
                    <FileUpload title="营业执照 / 注册证书" note="必填 · 需为当前有效版本" required />
                    <FileUpload title="公司章程" note="必填 · Articles / Constitution" required />
                    <FileUpload title="股权架构图" note="必填 · 展示最终受益所有人" required />
                    <FileUpload title="企业经营场所照片" note="选填" />
                  </div>
                </KycBlock>
              </section>
            )}

            {view === "address" && (
              <section className="activation-view active" id="act-address">
                <KycBlock title="企业注册地址与实际经营地">
                  <div className="form-grid">
                    <Field label="注册国家/地区">
                      <select>
                        <option>Canada</option>
                        <option>Singapore</option>
                        <option>Hong Kong, China</option>
                      </select>
                    </Field>
                    <Field label="主要经营国家/地区"><input defaultValue="Canada, Singapore, Hong Kong" /></Field>
                    <Field label="省 / 州"><input defaultValue="British Columbia" /></Field>
                    <Field label="城市"><input defaultValue="Vancouver" /></Field>
                    <Field label="街道地址" full><input defaultValue="1055 W Georgia Street" /></Field>
                    <Field label="楼层 / 单元" optional><input placeholder="如适用" /></Field>
                    <Field label="邮政编码"><input defaultValue="V6C 1T2" /></Field>
                  </div>
                </KycBlock>

                <KycBlock title="地址证明" level="h3">
                  <div className="kyc-evidence-grid">
                    <FileUpload title="注册地址证明" note="三个月内的银行账单或公共事业账单" />
                    <FileUpload title="经营场所证明" note="租赁合同、产权证明或有效账单" />
                  </div>
                </KycBlock>

                <KycBlock title="提现账户（如适用）" level="h3">
                  <div className="form-grid">
                    <Field label="银行账户名称"><input defaultValue="Unity Centre Investment Ltd." /></Field>
                    <Field label="银行账号"><input defaultValue="SG00 1234 5678 9012" /></Field>
                    <Field label="银行账户所在地">
                      <select>
                        <option>Singapore</option>
                        <option>Canada</option>
                        <option>Hong Kong, China</option>
                      </select>
                    </Field>
                    <Field label="账户币种"><input defaultValue="USD, EUR, SGD" /></Field>
                    <Field label="SWIFT CODE"><input defaultValue="DBSSSGSG" /></Field>
                    <Field label="银行名称"><input defaultValue="DBS Bank" /></Field>
                    <Field label="银行编码 / Routing number"><input defaultValue="7171" /></Field>
                    <Field label="开户银行地址"><input defaultValue="12 Marina Boulevard, Singapore" /></Field>
                  </div>
                  <div className="kyc-evidence-grid" style={{ marginTop: 12 }}>
                    <FileUpload title="银行开户凭证" note="如银行对账单或开户确认函" required />
                  </div>
                </KycBlock>
              </section>
            )}

            {view === "business" && (
              <section className="activation-view active" id="act-business">
                <KycBlock title="业务信息">
                  <div className="form-grid">
                    <Field label="所属行业">
                      <select>
                        <option>Investment & Asset Management</option>
                        <option>Technology</option>
                        <option>International Trade</option>
                      </select>
                    </Field>
                    <Field label="预计年处理金额">
                      <select>
                        <option>USD 1M – 5M</option>
                        <option>USD 5M – 10M</option>
                        <option>USD 10M+</option>
                      </select>
                    </Field>
                    <Field label="主要资金来源">
                      <select>
                        <option>企业自有资金</option>
                        <option>营业收入</option>
                        <option>股东投资</option>
                        <option>贷款/融资</option>
                      </select>
                    </Field>
                    <Field label="预计使用的币种"><input defaultValue="USD, EUR, SGD, HKD" /></Field>
                    <Field label="业务模式与使用目的" full>
                      <textarea defaultValue="跨境投资、企业咨询及资产管理服务。" />
                    </Field>
                  </div>
                </KycBlock>
              </section>
            )}

            {view === "operations" && (
              <section className="activation-view active" id="act-operations">
                <KycBlock title="经营情况">
                  <div className="form-grid">
                    <Field label="主要收款市场"><input defaultValue="Canada, Singapore, United Kingdom" /></Field>
                    <Field label="主要付款市场"><input defaultValue="Singapore, China, United States" /></Field>
                    <Field label="单笔预计金额"><input defaultValue="USD 500 – 50,000" /></Field>
                    <Field label="预计月交易笔数"><input defaultValue="200 – 500" /></Field>
                    <Field label="是否涉及第三方付款">
                      <select>
                        <option>否</option>
                        <option>是</option>
                      </select>
                    </Field>
                    <Field label="是否使用代理/商户渠道">
                      <select>
                        <option>否</option>
                        <option>是</option>
                      </select>
                    </Field>
                    <Field label="买家/服务所在国"><input defaultValue="Canada, Singapore, United Kingdom" /></Field>
                    <Field label="合作伙伴所在国"><input defaultValue="Singapore, China, United States" /></Field>
                    <Field label="汇入货币"><input defaultValue="USD, EUR, SGD, HKD" /></Field>
                    <Field label="汇出货币"><input defaultValue="USD, EUR, SGD, HKD" /></Field>
                    <Field label="交易资金属性">
                      <select>
                        <option>企业自有资金</option>
                        <option>贸易货款</option>
                        <option>服务收入</option>
                      </select>
                    </Field>
                    <Field label="付款目的">
                      <select>
                        <option>供应商结算、跨境贸易付款</option>
                        <option>服务采购</option>
                        <option>投资出资</option>
                      </select>
                    </Field>
                    <Field label="业务性质"><input defaultValue="跨境贸易及企业服务" /></Field>
                    <Field label="月交易笔数"><input defaultValue="200 – 500" /></Field>
                    <Field label="月总金额" full><input defaultValue="USD 1M – 5M" /></Field>
                  </div>
                </KycBlock>
                <div className="kyc-hint">
                  <p>系统将于该些信息建立初始客户画像；显著偏离画像的交易会触发持续监控和人工复核。</p>
                </div>
              </section>
            )}

            {view === "owner" && (
              <section className="activation-view active" id="act-owner">
                <KycBlock title="受益所有人和授权代表">
                  <div className="form-grid">
                    <Field label="名"><input defaultValue="Aline" /></Field>
                    <Field label="姓"><input defaultValue="Chen" /></Field>
                    <Field label="本地姓名" optional><input placeholder="如适用" /></Field>
                    <Field label="电子邮箱"><input type="email" defaultValue="aline@libranex.com" /></Field>
                    <Field label="所有人类型">
                      <select>
                        <option>最终受益所有人 (UBO)</option>
                        <option>董事</option>
                        <option>授权代表</option>
                      </select>
                    </Field>
                    <Field label="持股比例"><input defaultValue="62%" /></Field>
                    <Field label="国籍">
                      <select>
                        <option>Canada</option>
                        <option>China</option>
                        <option>Singapore</option>
                      </select>
                    </Field>
                    <Field label="出生日期"><input type="date" defaultValue="1986-05-22" /></Field>
                    <Field label="手机号"><input defaultValue="+86 138 5342 4910" /></Field>
                    <Field label="税号 / ID号"><input defaultValue="**********" /></Field>
                  </div>

                  <KycBlock title="居住地址" level="h3">
                    <div className="form-grid">
                      <Field label="国家/地区">
                        <select>
                          <option>Canada</option>
                          <option>China</option>
                          <option>Singapore</option>
                        </select>
                      </Field>
                      <Field label="城市"><input defaultValue="Vancouver" /></Field>
                      <Field label="街道地址" full><input defaultValue="1055 W Georgia Street" /></Field>
                      <Field label="房间 / 楼层" optional><input placeholder="可选" /></Field>
                      <Field label="省/州"><input defaultValue="British Columbia" /></Field>
                      <Field label="邮政编码"><input defaultValue="V6C 1T2" /></Field>
                    </div>
                  </KycBlock>

                  <KycBlock title="受益所有人专项材料" level="h3">
                    <div className="kyc-evidence-grid">
                      <FileUpload title="超过 25% 最终受益人身份证件" note="必需 · 所有持股或控制权超过 25% 的自然人" required />
                      <FileUpload title="最终受益人个人地址证明" note="如注册地址为 PO，则需提供水电缴费单等地址证明" />
                    </div>
                  </KycBlock>
                </KycBlock>

                <div className="kyc-repeater">
                  <KycBlock title="其他股东与股权结构" level="h3">
                    <div className="repeater-row"><b>自然人股东</b><span>—</span></div>
                    <div className="repeater-row"><b>机构股东</b><span>—</span></div>
                    <div className="repeater-row"><b>总持股比例</b><span>100%</span></div>
                  </KycBlock>
                  <button className="secondary" type="button">＋ 添加股东</button>
                </div>
              </section>
            )}

            {view === "identity" && (
              <section className="activation-view active" id="act-identity">
                <KycBlock title="身份核验与授权证明">
                  <div className="form-grid">
                    <Field label="证件类型">
                      <select>
                        <option>护照</option>
                        <option>身份证</option>
                        <option>驾驶证</option>
                      </select>
                    </Field>
                    <Field label="核验方式">
                      <select>
                        <option>证件真伪校验 + 人证比对</option>
                        <option>仅证件上传</option>
                      </select>
                    </Field>
                    <Field label="身份证明文件">
                      <FileUpload title="身份证明文件" note="护照、身份证或政府签发证件" required />
                    </Field>
                    <Field label="人证比对">
                      <button className="secondary" type="button">开始安全验证</button>
                    </Field>
                    <Field label="股权架构图">
                      <FileUpload title="股权架构图" note="最新版本，显示持股比例与实际控制人" required />
                    </Field>
                    <Field label="授权证明">
                      <FileUpload title="授权证明" note="董事会决议、授权书或同等文件" required />
                    </Field>
                    <Field label="董事及法人身份证件" full>
                      <FileUpload title="董事及法人身份证件" note="所有董事及法定代表人的有效证件" required />
                    </Field>
                  </div>
                </KycBlock>

                <KycBlock title="BVI 特殊材料（如适用）" level="h3">
                  <div className="kyc-evidence-grid">
                    <FileUpload title="COGS 良好声誉证明" note="仅 BVI 注册企业适用" />
                    <FileUpload title="COI 在职证明" note="Certificate of Incumbency" />
                    <FileUpload title="ROM / ROD" note="Register of Members / Register of Directors" />
                  </div>
                </KycBlock>

                <KycBlock title="制裁、PEP 与负面信息筛查" level="h3">
                  <div className="check-row">
                    <span className="check-icon">⊘</span>
                    <div>
                      <b>制裁筛查</b>
                      <small>将企业、董事、受益所有人与主要制裁名单进行实时比对。</small>
                    </div>
                    <span className="status warn">待筛查</span>
                  </div>
                  <div className="check-row">
                    <span className="check-icon">♟</span>
                    <div>
                      <b>政治公众人物（PEP）</b>
                      <small>识别董事、受益所有人及授权代表的政治公众身份。</small>
                    </div>
                    <span className="status warn">待筛查</span>
                  </div>
                  <div className="check-row">
                    <span className="check-icon">⚠</span>
                    <div>
                      <b>负面媒体报道与欺诈警示</b>
                      <small>基于公开信息的风险信号扫描与人工复核。</small>
                    </div>
                    <span className="status warn">待筛查</span>
                  </div>
                </KycBlock>
              </section>
            )}

            {view === "review" && (
              <section className="activation-view active" id="act-review">
                <KycBlock title="复核并提交">
                  <div className="activation-review">
                    <div className="review-item">
                      <b>企业资料</b>
                      <span>Unity Centre Investment Ltd. · Canada</span>
                      <button className="secondary" type="button" onClick={() => go("company")}>编辑</button>
                    </div>
                    <div className="review-item">
                      <b>业务与交易画像</b>
                      <span>Investment & Asset Management · B2B</span>
                      <button className="secondary" type="button" onClick={() => go("business")}>编辑</button>
                    </div>
                    <div className="review-item">
                      <b>受益所有权</b>
                      <span>1 位受益所有人 · Aline Chen 62%</span>
                      <button className="secondary" type="button" onClick={() => go("owner")}>编辑</button>
                    </div>
                    <div className="review-item">
                      <b>身份与文件</b>
                      <span>身份证明文件待提交 · 授权证明待提交</span>
                      <button className="secondary" type="button" onClick={() => go("identity")}>编辑</button>
                    </div>
                  </div>
                  <label className="activation-consent">
                    <input type="checkbox" defaultChecked />
                    <span>我确认以上信息准确完整，并授权 Libranex 按适用法律完成企业核验、身份核验、制裁/PEP 筛查与持续监控。</span>
                  </label>
                </KycBlock>
              </section>
            )}

            {view === "submitted" ? (
              <section className="activation-view active" id="act-submitted">
                <div className="auth-status warn">
                  <div className="status-orb">⌛</div>
                  <h2>激活申请已提交</h2>
                  <p>我们将在 1–3 个工作日内审核。你可以使用基础控制台功能；收款、付款、兑换与虚拟账户将在审核通过后开放。</p>
                  <aside>系统会保留审核记录、材料来源、筛查结果和决策轨迹，满足审计与监管留存要求。</aside>
                </div>
                <div className="activation-actions">
                  <button className="secondary" type="button" onClick={onClose}>返回</button>
                  <button className="primary" type="button" onClick={onClose}>进入受限控制台</button>
                </div>
              </section>
            ) : (
              <div className="activation-actions">
                <button type="button" className="secondary" onClick={onClose}>返回</button>
                <button type="button" className="primary" onClick={() => (view === "review" ? go("submitted") : go(next[view]))}>
                  {view === "review" ? "提交激活申请" : "保存并继续"}
                </button>
                <span className="activation-progress">{views.findIndex((v) => v.id === view) + 1} / {views.length} · 自动保存</span>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
