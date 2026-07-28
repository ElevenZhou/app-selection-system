import Link from "next/link";

type Active = "overview" | "reports" | "research" | "candidates" | "packages" | "schedule" | "ingest";

const nav = [
  { id: "overview", label: "总览", href: "/" },
  { id: "reports", label: "选品报告", href: "/reports" },
  { id: "research", label: "调查报告", href: "/research" },
  { id: "candidates", label: "选品总表", href: "/candidates" },
  { id: "packages", label: "资料包", href: "/packages" },
  { id: "schedule", label: "开发排期", href: "/schedule" },
  { id: "ingest", label: "结果入库", href: "/ingest" },
] as const;

export function AppShell({ active, children }: { active: Active; children: React.ReactNode }) {
  return (
    <div className="app-frame">
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <aside className="sidebar">
        <Link className="brand" href="/">
          <span className="brand-monogram" aria-hidden="true">AX</span>
          <span>
            <strong>APP 选品</strong>
            <small>PORTFOLIO INTELLIGENCE</small>
          </span>
        </Link>
        <nav aria-label="主导航">
          {nav.map((item) => (
            <Link
              aria-current={active === item.id ? "page" : undefined}
              className={active === item.id ? "active" : ""}
              href={item.href}
              key={item.id}
            >
              <span>{item.label}</span>
              <i aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <div className="sidebar-foot">
          <span className="status-line"><i aria-hidden="true" /> SYSTEM READY</span>
          <p>三条路线独立评选<br />统一存档，持续积累</p>
        </div>
      </aside>
      <main className="content" id="main-content">
        <header className="topbar">
          <div><span>APP PORTFOLIO</span><b>/</b><strong>{nav.find((item) => item.id === active)?.label}</strong></div>
          <time>{new Intl.DateTimeFormat("zh-CN", { dateStyle: "long" }).format(new Date())}</time>
        </header>
        {children}
      </main>
    </div>
  );
}
