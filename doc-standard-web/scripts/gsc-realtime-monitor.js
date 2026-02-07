#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const DEFAULT_INTERVAL_MIN = 15;
const DEFAULT_CONCURRENCY = 4;

function parseArgs(argv) {
  const out = {};
  for (const arg of argv) {
    if (!arg.startsWith("--")) continue;
    const [k, v] = arg.slice(2).split("=");
    out[k] = v === undefined ? true : v;
  }
  return out;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readSitemapUrls(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const xml = fs.readFileSync(filePath, "utf8");
  const matches = xml.match(/<loc>([^<]+)<\/loc>/g) || [];
  return matches
    .map((m) => m.replace(/<\/?.*?>/g, ""))
    .map((u) => u.trim())
    .filter(Boolean);
}

function parseBatchName(input) {
  if (!input) return null;
  const match = String(input).match(/batch(\d+)/i);
  if (!match) return null;
  const num = Number(match[1]);
  if (!Number.isFinite(num) || num < 1) return null;
  return num;
}

function formatLogLine({ timestamp, url, type, status, action }) {
  return `${timestamp} | ${url} | ${type} | ${status} | ${action}`;
}

function extractIssues(result) {
  const issues = [];
  if (!result) return issues;

  const coverage = result.indexStatusResult || {};
  const coverageState = coverage.coverageState || "";
  const indexingState = coverage.indexingState || "";
  const pageFetchState = coverage.pageFetchState || "";

  if (/soft 404/i.test(coverageState)) {
    issues.push({ type: "Soft 404", status: coverageState, action: "Fix content/returns" });
  }
  if (/404/i.test(coverageState) || /not found/i.test(pageFetchState)) {
    issues.push({ type: "404", status: coverageState || pageFetchState, action: "Fix route or redirect" });
  }
  if (/submitted and not indexed/i.test(coverageState) || /submitted and not indexed/i.test(indexingState)) {
    issues.push({ type: "Submitted but not indexed", status: coverageState || indexingState, action: "Improve quality/links" });
  }

  const rich = result.richResultsResult || {};
  const richVerdict = rich.verdict || "";
  const richItems = Array.isArray(rich.detectedItems) ? rich.detectedItems : [];
  const richHasErrors = richItems.some((item) => {
    const items = Array.isArray(item.items) ? item.items : [];
    return items.some((it) => Array.isArray(it.issues) && it.issues.length > 0);
  });

  if (/fail|error/i.test(richVerdict) || richHasErrors) {
    issues.push({ type: "Structured data", status: richVerdict || "Errors detected", action: "Fix schema" });
  }

  return issues;
}

async function fetchInspection(url, siteUrl, accessToken) {
  const body = JSON.stringify({ inspectionUrl: url, siteUrl });
  const res = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GSC API error ${res.status}: ${text}`);
  }
  const json = await res.json();
  return json.inspectionResult || json;
}

async function runBatch({ urls, siteUrl, accessToken, concurrency, logPath, telegram }) {
  const timestamp = new Date().toISOString();
  const errors = [];
  let index = 0;

  async function worker() {
    while (index < urls.length) {
      const current = urls[index++];
      try {
        const result = await fetchInspection(current, siteUrl, accessToken);
        const issues = extractIssues(result);
        issues.forEach((issue) => {
          errors.push({
            timestamp,
            url: current,
            type: issue.type,
            status: issue.status || "Unknown",
            action: issue.action || "Investigate",
          });
        });
      } catch (err) {
        errors.push({
          timestamp,
          url: current,
          type: "API Error",
          status: err.message || "Unknown",
          action: "Check credentials/quota",
        });
      }
      await sleep(250);
    }
  }

  const workers = Array.from({ length: Math.max(1, concurrency) }, () => worker());
  await Promise.all(workers);

  if (errors.length) {
    ensureDir(path.dirname(logPath));
    if (!fs.existsSync(logPath)) {
      fs.writeFileSync(logPath, "Timestamp | URL | Error Type | Status | Action Required\n", "utf8");
    }
    const lines = errors.map(formatLogLine).join("\n") + "\n";
    fs.appendFileSync(logPath, lines, "utf8");

    errors.forEach((row) => {
      console.log(formatLogLine(row));
    });

    if (telegram.enabled) {
      const critical = errors.filter((row) => /404|soft 404|api error/i.test(row.type));
      if (critical.length) {
        const message = critical
          .slice(0, 10)
          .map((row) => `${row.type}: ${row.url}`)
          .join("\n");
        await telegram.send(`GSC Alert (${critical.length}):\n${message}`);
      }
    }
  } else {
    console.log(`${timestamp} | OK | No new crawl/index issues detected.`);
  }
}

function buildTelegramClient() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return { enabled: false, send: async () => {} };
  return {
    enabled: true,
    send: async (text) => {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
      if (!res.ok) {
        const body = await res.text();
        console.warn(`Telegram send failed: ${res.status} ${body}`);
      }
    },
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const batchNum = parseBatchName(args.watch);
  if (!batchNum) {
    console.error("Usage: node scripts/gsc-realtime-monitor.js --watch=batch01");
    process.exit(1);
  }

  const accessToken = process.env.GSC_ACCESS_TOKEN;
  const siteUrl = process.env.GSC_SITE_URL;
  if (!accessToken || !siteUrl) {
    console.error("Missing env vars: GSC_ACCESS_TOKEN and GSC_SITE_URL are required.");
    process.exit(1);
  }

  const root = path.resolve(__dirname, "..");
  const sitemapPath = path.join(root, "public", "sitemaps", `sitemap-batch-${String(batchNum).padStart(2, "0")}.xml`);
  const logPath = path.join(root, "logs", "gsc-crawl-errors.log");
  const intervalMs = Number(args.interval || DEFAULT_INTERVAL_MIN) * 60 * 1000;
  const concurrency = Number(args.concurrency || DEFAULT_CONCURRENCY);
  const telegram = buildTelegramClient();

  if (!fs.existsSync(sitemapPath)) {
    console.error(`Missing sitemap: ${sitemapPath}`);
    process.exit(1);
  }

  console.log(`Watching ${sitemapPath} every ${intervalMs / 60000} minutes...`);

  const poll = async () => {
    const urls = readSitemapUrls(sitemapPath);
    if (!urls.length) {
      console.warn("No URLs found in sitemap.");
      return;
    }
    await runBatch({ urls, siteUrl, accessToken, concurrency, logPath, telegram });
  };

  await poll();
  setInterval(poll, intervalMs);
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
