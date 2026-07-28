import { AppShell } from "../components/AppShell";
import { ProductFormBadge } from "../components/ProductVisual";
import { listCandidateArchive } from "../../lib/reports";
import { bilingualName } from "../../lib/localization";

export const metadata = { title: "工作台资料包" };

const packageItems = [
  ["01", "产品说明", "用户、场景、核心任务、产品承诺、范围与非目标"],
  ["02", "证据与参考", "竞品、替代方案、领先信号、学习点、重构点与禁止复制内容"],
  ["03", "核心改进", "只保留1–3个改变，每个对应用户证据、预期结果和验证指标"],
  ["04", "品牌与UI", "品牌名、定位、图标方向、颜色、字体、组件、核心页面与状态"],
  ["05", "开发总提示词", "可直接交给独立开发台执行的目标、技术、范围、测试和交付协议"],
  ["06", "三视角验收", "用户、项目经理、推广三个视角的可观察验收标准"],
  ["07", "增长计划", "关键词、素材角度、商店资产、渠道、冷启动实验与归因"],
  ["08", "数据与停止", "埋点、成功指标、继续条件、返工条件和停止条件"],
];

export default async function PackagesPage() {
  const candidates = await listCandidateArchive({ packageStatus: "READY_FOR_BENCH" });
  const ready = candidates.filter((item) => item.packageStatus === "READY_FOR_BENCH");
  return (
    <AppShell active="packages">
      <section className="page-title-row">
        <div>
          <p className="eyebrow">WORKBENCH PACKAGES</p>
          <h1>开发台拿到什么</h1>
          <p>资料包不是一句“仿照这个 App 做一个”，而是一套可以直接开工、测试和验收的完整项目合同。</p>
        </div>
        <div className="large-count"><strong>{ready.length}</strong><span>当前就绪</span></div>
      </section>
      <section className="package-blueprint">
        {packageItems.map(([index, title, detail]) => (
          <article key={index}>
            <span>{index}</span>
            <div><h2>{title}</h2><p>{detail}</p></div>
          </article>
        ))}
      </section>
      <section className="package-boundary">
        <div>
          <span className="section-index">BOUNDARY</span>
          <h2>总控完成交接，<br />不替开发台写代码。</h2>
        </div>
        <div>
          <p><b>当前 Selection Loop 完成：</b>调研、路线决策、资料包、网站入库和开发排期。</p>
          <p><b>后续 Build Loop 完成：</b>架构、代码、测试、视觉检查、构建、QA和Release Candidate。</p>
          <p><b>更高层 Factory Loop：</b>可以继续调度多个 Build Loop，但仍保持每个项目独立开发与验收。</p>
        </div>
      </section>
      <section className="ready-list panel">
        <div className="section-heading"><div><span className="section-index">READY NOW</span><h2>全部已发布报告资料包</h2></div></div>
        <div className="compact-list">
          {ready.map((item) => (
            <div key={item.id}>
              <span>{item.route}</span>
              <strong>{bilingualName(item.title, item.titleZh)}</strong>
              <ProductFormBadge compact form={item.productForm} />
              <small>{item.packageStatus}</small>
              {item.packageUrl ? <a className="package-download-link" href={item.packageUrl} download>下载 ZIP</a> : null}
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
