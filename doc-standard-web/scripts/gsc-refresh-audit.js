#!/usr/bin/env node
/**
 * GSC Refresh Audit Script
 * Queries Google Search Console API and updates local audit cache
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://docstandard.co/';
const AUDIT_PATH = path.join(__dirname, '../reports/gsc-audit-log.json');

// Ensure reports directory exists
const reportsDir = path.dirname(AUDIT_PATH);
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

async function refreshAudit() {
  try {
    // Load service account credentials
    const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || 
                    path.join(__dirname, '../config/gsc-service-account.json');
    
    if (!fs.existsSync(keyPath)) {
      console.error('❌ Service account key not found:', keyPath);
      console.log('Set GOOGLE_APPLICATION_CREDENTIALS env var or place key at:', keyPath);
      process.exit(1);
    }

    const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    
    // Authenticate
    const auth = new google.auth.GoogleAuth({
      credentials: key,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly']
    });

    const webmasters = google.webmasters({ version: 'v3', auth });

    console.log('🔍 Querying GSC API for:', SITE_URL);
    console.log('⏳ This may take a minute...\n');

    // Get all URLs from sitemaps
    const sitemapUrls = [
      ...getUrlsFromSitemap('../public/sitemap-index.xml'),
      ...getUrlsFromSitemap('../public/sitemaps/sitemap-batch-01.xml')
    ];

    // Query index status for each URL
    const auditData = [];
    let indexed = 0;
    let neutral = 0;

    for (const url of sitemapUrls) {
      try {
        const res = await webmasters.urlInspection.index.inspect({
          siteUrl: SITE_URL,
          inspectionUrl: url
        });

        const verdict = res.data?.inspectionResult?.indexStatusResult?.verdict || 'NEUTRAL';
        const coverage = res.data?.inspectionResult?.indexStatusResult?.coverageState || 'Unknown';
        
        auditData.push({
          url,
          verdict,
          coverage,
          lastCrawl: res.data?.inspectionResult?.indexStatusResult?.lastCrawlTime
        });

        if (verdict === 'PASS') indexed++;
        else neutral++;

        // Rate limiting - 1 req/sec
        await new Promise(r => setTimeout(r, 1000));
      } catch (err) {
        console.log(`⚠️  Failed to inspect ${url}: ${err.message}`);
        auditData.push({
          url,
          verdict: 'NEUTRAL',
          coverage: 'API Error'
        });
        neutral++;
      }
    }

    // Save audit results
    const auditLog = {
      timestamp: new Date().toISOString(),
      site: SITE_URL,
      indexed,
      neutral,
      total: auditData.length,
      auditData
    };

    fs.writeFileSync(AUDIT_PATH, JSON.stringify(auditLog, null, 2));

    console.log('\n✅ Audit Complete!');
    console.log(`📊 Indexed: ${indexed}`);
    console.log(`⏳ Neutral: ${neutral}`);
    console.log(`🔗 Total: ${auditData.length}`);
    console.log(`\n💾 Saved to: ${AUDIT_PATH}`);

  } catch (err) {
    console.error('❌ Audit failed:', err.message);
    process.exit(1);
  }
}

function getUrlsFromSitemap(sitemapPath) {
  // Handle both direct paths and sitemap folder paths
  const fullPath = path.join(__dirname, sitemapPath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Sitemap not found: ${fullPath}`);
    return [];
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  const urls = [];
  const matches = content.match(/<loc>(.*?)<\/loc>/g);
  
  if (matches) {
    matches.forEach(match => {
      const url = match.replace(/<\/?loc>/g, '');
      urls.push(url);
    });
  }

  return urls;
}

refreshAudit();
