"use client";

import { useState } from "react";
import { AppShell } from "../components/AppShell";

export default function IngestPage() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    setStatus("");
    try {
      const parsed = JSON.parse(value);
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "入库失败");
      setStatus(`已保存报告 ${result.id}。前往“选品报告”即可查看。`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "无法读取这份JSON");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AppShell active="ingest">
      <section className="page-title-row">
        <div>
          <p className="eyebrow">REPORT INGEST</p>
          <h1>把 Loop 结果存进来</h1>
          <p>网站不再重复建设。每次运行只提交一份标准报告 JSON，系统按时间永久保存。</p>
        </div>
      </section>
      <section className="ingest-layout">
        <div className="ingest-guide">
          <span className="section-index">HOW IT WORKS</span>
          <ol>
            <li><b>01</b><span>Selection Loop完成三路线结果</span></li>
            <li><b>02</b><span>Publisher生成统一报告JSON</span></li>
            <li><b>03</b><span>提交到本页或POST /api/reports</span></li>
            <li><b>04</b><span>网站立即出现在报告时间线</span></li>
          </ol>
          <p>相同报告ID不会覆盖；需要修订时使用新的版本ID，保留历史可追溯性。</p>
        </div>
        <div className="json-editor">
          <label htmlFor="report-json">报告 JSON</label>
          <textarea
            id="report-json"
            spellCheck={false}
            placeholder="粘贴 Selection Loop 生成的标准报告 JSON"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <div>
            <button disabled={busy} onClick={submit}>{busy ? "正在保存…" : "验证并保存"}</button>
            {status && <p role="status">{status}</p>}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
