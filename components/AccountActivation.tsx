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

function Field({ label, children, optional = false }: { label: string; children: React.ReactNode; optional?: boolean }) {
  return <div className={`activation-field ${optional ? "optional" : ""}`}><label>{label}</label>{children}</div>;
}

function Upload({ title, note }: { title: string; note: string }) {
  return <div className="activation-upload"><b>{title}</b><small>{note}</small><label><input type="file" hidden /><span>选择文件</span><em>未选择文件</em></label></div>;
}

export default function AccountActivation({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<View>("company");
  const [saved, setSaved] = useState("草稿已保存");
  const current = views.find((item) => item.id === view);
  const go = (next: View) => { setView(next); setSaved("草稿已自动保存"); window.scrollTo(0, 0); };
  const next: Record<string, View> = { company: "address", address: "business", business: "operations", operations: "owner", owner: "identity", identity: "review" };

  return <div className="activation-shell" onChange={() => setSaved("草稿已自动保存")}>
    <header className="activation-top">
      <button type="button" onClick={onClose} aria-label="关闭">×</button><b>激活你的账户</b>
      <label className="activation-language">🌐 <select defaultValue="zh"><option value="zh">中文</option><option value="zh-Hant">繁體中文</option><option value="en">English</option></select></label>
      <span className="activation-saved">{saved}</span>
    </header>
    <div className="activation-layout">
      <aside className="activation-nav">
        {[1, 2, 3].map(stage => <div key={stage} className={`activation-stage ${current?.stage === stage ? "active" : ""} ${(current?.stage || 4) > stage ? "done" : ""}`}>
          <button type="button" onClick={() => go(stage === 1 ? "company" : stage === 2 ? "owner" : "review")}><i>{(current?.stage || 4) > stage ? "✓" : stage}</i>Step {stage}: {stage === 1 ? "设置企业资料" : stage === 2 ? "核验所有权" : "复核并提交"}</button>
          <ul>{views.filter(v => v.stage === stage).map(v => <li key={v.id}><button type="button" className={view === v.id ? "active" : ""} onClick={() => go(v.id)}>{v.label}</button></li>)}</ul>
        </div>)}
      </aside>
      <main className="activation-content"><div className="activation-form">
        {view !== "submitted" && <div className="activation-hero"><h1>激活企业账户</h1><p>完成以下信息后，即可申请开通多币种账户、收付款、兑换和结算能力。</p></div>}

        {view === "company" && <section className="activation-card"><h2>企业档案</h2><div className="activation-grid">
          <Field label="法定企业名称"><input defaultValue="Unity Centre Investment Ltd." /></Field><Field label="企业法律形式"><select><option>有限公司 / 公司制法人</option><option>合伙企业</option><option>NGO / 慈善机构</option><option>受监管金融机构</option></select></Field>
          <Field label="注册号"><input defaultValue="BC-2026-184920" /></Field><Field label="注册辖区"><select><option>Canada</option><option>Singapore</option><option>Hong Kong, China</option><option>BVI</option></select></Field>
          <Field label="成立日期"><input type="date" defaultValue="2020-09-18" /></Field><Field label="企业官网"><input defaultValue="https://www.unitycentre.com" /></Field>
        </div><div className="activation-block"><h3>联系人信息</h3><div className="activation-grid"><Field label="联系人姓名"><input defaultValue="Aline Chen" /></Field><Field label="联系人电话"><input defaultValue="+86 138 5342 4910" /></Field><Field label="联系人邮箱"><input type="email" defaultValue="aline@libranex.com" /></Field></div></div>
        <div className="activation-block"><h3>企业注册与基础佐证材料</h3><div className="activation-upload-grid"><Upload title="营业执照 / 注册证书" note="必填 · 需为当前有效版本" /><Upload title="公司章程" note="必填 · Articles / Constitution" /><Upload title="股权架构图" note="必填 · 展示最终受益所有人" /></div></div></section>}

        {view === "address" && <section className="activation-card"><h2>企业注册地址与实际经营地</h2><div className="activation-grid"><Field label="注册国家/地区"><select><option>Canada</option><option>Singapore</option><option>Hong Kong, China</option></select></Field><Field label="省 / 州"><input defaultValue="British Columbia" /></Field><Field label="城市"><input defaultValue="Vancouver" /></Field><Field label="邮政编码"><input defaultValue="V6C 1T2" /></Field><Field label="注册地址"><input defaultValue="1055 W Georgia Street" /></Field><Field label="实际经营地址"><input defaultValue="1055 W Georgia Street, Vancouver" /></Field></div><div className="activation-block"><h3>地址证明</h3><div className="activation-upload-grid"><Upload title="注册地址证明" note="三个月内的银行账单或公共事业账单" /><Upload title="经营场所证明" note="租赁合同、产权证明或有效账单" /></div></div></section>}

        {view === "business" && <section className="activation-card"><h2>业务信息</h2><div className="activation-grid"><Field label="主要行业"><select><option>Investment & Asset Management</option><option>Technology</option><option>International Trade</option></select></Field><Field label="业务模式"><select><option>B2B</option><option>B2C</option><option>Marketplace</option></select></Field><Field label="主要服务地区"><input defaultValue="Canada, Singapore, Hong Kong" /></Field><Field label="预计年营业额"><select><option>USD 5M – 10M</option><option>USD 1M – 5M</option><option>USD 10M+</option></select></Field><Field label="业务描述"><textarea defaultValue="跨境投资、企业咨询及资产管理服务。" /></Field><Field label="资金来源"><textarea defaultValue="企业经营收入及股东投资。" /></Field></div></section>}

        {view === "operations" && <section className="activation-card"><h2>经营情况与账户用途</h2><div className="activation-grid"><Field label="账户主要用途"><select><option>跨境收付款与资金管理</option><option>供应商付款</option><option>数字资产结算</option></select></Field><Field label="预计月交易金额"><select><option>USD 500K – 1M</option><option>USD 100K – 500K</option><option>USD 1M+</option></select></Field><Field label="预计月交易笔数"><input defaultValue="80" /></Field><Field label="主要交易币种"><input defaultValue="USD, CAD, EUR, SGD" /></Field><Field label="主要付款国家/地区"><input defaultValue="Canada, United States, Singapore" /></Field><Field label="主要收款国家/地区"><input defaultValue="Canada, Hong Kong, Singapore" /></Field></div><div className="activation-notice">Libranex 将根据行业、地区、交易规模与账户用途开展风险评估，部分产品可能需要额外材料。</div></section>}

        {view === "owner" && <section className="activation-card"><h2>受益所有人</h2><p className="activation-help">请申报直接或间接持有 25% 或以上股份、投票权或实际控制企业的自然人。</p><div className="activation-owner"><b>Aline Chen</b><span>持股 62% · Ultimate Beneficial Owner</span><div className="activation-grid"><Field label="国籍"><select><option>Canada</option></select></Field><Field label="出生日期"><input type="date" defaultValue="1986-05-22" /></Field><Field label="居住国家/地区"><select><option>Canada</option></select></Field><Field label="职位"><input defaultValue="Director" /></Field></div></div><button className="activation-ghost" type="button">＋ 添加受益所有人</button></section>}

        {view === "identity" && <section className="activation-card"><h2>身份核验</h2><div className="activation-notice">受益所有人和授权操作人均需完成身份证件、人脸活体、制裁与 PEP 筛查。</div><div className="activation-upload-grid"><Upload title="身份证明文件" note="护照、身份证或政府签发证件" /><Upload title="居住地址证明" note="三个月内银行或公共事业账单" /><Upload title="授权书 / 董事会决议" note="证明账户操作与签署权限" /></div><div className="activation-check"><b>Aline Chen</b><span>身份资料待提交</span><button type="button">开始身份核验</button></div></section>}

        {view === "review" && <section className="activation-card"><h2>复核并提交</h2><div className="activation-review"><div><b>企业资料</b><span>Unity Centre Investment Ltd. · Canada</span><button onClick={() => go("company")}>编辑</button></div><div><b>业务与经营情况</b><span>Investment & Asset Management · B2B</span><button onClick={() => go("business")}>编辑</button></div><div><b>所有权与身份</b><span>1 位受益所有人 · 身份核验材料待审核</span><button onClick={() => go("owner")}>编辑</button></div></div><label className="activation-consent"><input type="checkbox" defaultChecked />我确认以上信息准确完整，并授权 Libranex 按适用法律完成企业核验、身份核验、制裁/PEP 筛查与持续监控。</label></section>}

        {view === "submitted" ? <section className="activation-submitted"><div>⌛</div><h2>激活申请已提交</h2><p>我们将在 1–3 个工作日内审核。你可以使用基础控制台功能；收款、付款、兑换与虚拟账户将在审核通过后开放。</p><aside>系统会保留审核记录、材料来源、筛查结果和决策轨迹，满足审计与监管留存要求。</aside><button onClick={onClose}>进入受限控制台</button></section> : <div className="activation-actions"><button type="button" className="secondary" onClick={onClose}>保存并退出</button><button type="button" onClick={() => view === "review" ? go("submitted") : go(next[view])}>{view === "review" ? "提交激活申请" : "保存并继续"}</button></div>}
      </div></main>
    </div>
  </div>;
}