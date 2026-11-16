const base = process.env.SELECTION_SITE_URL || "https://app-selection-hub.xiaojie-april.chatgpt.site";
const claim = await fetch(`${base}/api/selection-requests/claim`, { method: "POST" });
if (!claim.ok) throw new Error(`claim failed: ${claim.status}`);
const result = await claim.json();
if (!result.task) { console.log("No queued selection task."); process.exit(0); }
console.log(`Claimed ${result.task.id}. Research execution must be provided by the configured research adapter.`);
console.log("Set SELECTION_RESEARCH_ADAPTER_URL to connect the live evidence worker.");
