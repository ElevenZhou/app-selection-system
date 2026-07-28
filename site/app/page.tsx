import Link from "next/link";
import { AppShell } from "./components/AppShell";
import { ProductFormBadge, ProductIcon, ReferenceLinks } from "./components/ProductVisual";
import { RouteMark } from "./components/RouteMark";
import { bilingualName } from "../lib/localization";
import { getDashboard } from "../lib/reports";

export const metadata = {
  title: "总览 · APP 选品驾驶舱",
};

export default async function Home() {
  const { reports, latest, candidates } = await getDashboard();
  const selected = candidates.filter((item) => item.decision === "ROUTE_SELECTED");
  const routeCounts = (["A", "B", "C"] as const).map((route) => ({
    route,
    count: selected.filter((item) => item.route === route).length,
  }));

  return (
    <AppShell active="overview">
      <section className="page-intro">
        <div>
          <p className="eyebrow">Portfolio intelligence / 统一档案</p>
          <h1>每一次选品，<br />都留在同一个系统里。</h1>
        </div>
        <div className="intro-note">
          <span className="live-dot" />
          <p>网站只建设一次。Loop 后续只新增报告、候选、资料包与排期记录。</p>
        </div>
      </section>

      <section className="metric-ribbon" aria-label="最新报告指标">
        <div>
          <span>报告总数</span>
          <strong>{reports.length.toString().padStart(2, "0")}</strong>
        </div>
        <div>
          <span>最新入选</span>
          <strong>{latest?.totalSelected ?? 0}</strong>
        </div>
        <div>
          <span>资料包就绪</span>
          <strong>{latest?.totalPackages ?? 0}</strong>
        </div>
        <div>
          <span>当前方法</span>
          <strong className="metric-word">{latest?.methodologyVersion ?? "—"}</strong>
        </div>
      </section>

      <section className="dashboard-grid">
        <article className="latest-report panel">
          <div className="section-heading">
            <div>
              <span className="section-index">LATEST REPORT</span>
              <h2>{latest?.title ?? "等待首份报告"}</h2>
            </div>
            {latest && (
              <Link className="text-link" href={`/reports/${latest.id}`}>
                查看完整报告 →
              </Link>
            )}
          </div>
          <p className="report-summary">
            {latest?.summary ?? "运行 App Selection Loop 后，报告会自动出现在这里。"}
          </p>
          <div className="route-strip">
            {routeCounts.map(({ route, count }) => (
              <div className={`route-cell route-${route.toLowerCase()}`} key={route}>
                <RouteMark route={route} />
                <div>
                  <strong>{count}</strong>
                  <span>最终入选</span>
                </div>
              </div>
            ))}
          </div>
          {latest && (
            <div className="report-meta">
              <span>{latest.periodLabel}</span>
              <span>{formatDate(latest.publishedAt)}</span>
              <span>{latest.status === "published" ? "已发布" : latest.status}</span>
            </div>
          )}
        </article>

        <article className="pipeline-card panel dark-panel">
          <span className="section-index">PIPELINE</span>
          <h2>选品负责把项目交到开发台门口。</h2>
          <ol className="pipeline-list">
            <li><span>01</span>三路线独立完成选品</li>
            <li><span>02</span>每个入选生成完整资料包</li>
            <li><span>03</span>开发排期单独领取项目</li>
            <li><span>04</span>开发 Loop 才开始写产品代码</li>
          </ol>
          <Link className="light-link" href="/packages">资料包里有什么 →</Link>
        </article>
      </section>

      <section className="selection-section">
        <div className="section-heading">
          <div>
            <span className="section-index">SELECTED / BY ROUTE</span>
            <h2>最新一批入选项目</h2>
          </div>
          <Link className="text-link" href="/reports">按时间查看全部报告 →</Link>
        </div>
        <div className="candidate-columns">
          {(["A", "B", "C"] as const).map((route) => (
            <div className={`candidate-column route-${route.toLowerCase()}`} key={route}>
              <div className="column-title">
                <RouteMark route={route} />
                <span>{routeName(route)}</span>
              </div>
              {selected.filter((item) => item.route === route).slice(0, 5).map((item) => (
                <article className="candidate-row" key={item.id}>
                  <span className="rank">{String(item.routeRank).padStart(2, "0")}</span>
                  <ProductIcon compact iconUrl={item.iconUrl} route={item.route} title={item.title} />
                  <span className="candidate-row-copy">
                    <Link className="candidate-primary-link" href={`/reports/${item.reportId}#${item.id}`}>{bilingualName(item.title, item.titleZh)}</Link>
                    <ProductFormBadge compact form={item.productForm} />
                    <small>{item.category} · {item.market}</small>
                    <ReferenceLinks compact references={item.references} />
                  </span>
                  <b>{item.routeScore}</b>
                </article>
              ))}
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function formatDate(value?: string) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "long", day: "numeric" }).format(new Date(value));
}

function routeName(route: "A" | "B" | "C") {
  return {
    A: "竞品验证",
    B: "缺口重构",
    C: "新需求",
  }[route];
}
