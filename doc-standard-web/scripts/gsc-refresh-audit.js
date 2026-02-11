#!/usr/bin/env node
/**
 * GSC Refresh Audit Script - Fixed
 * Queries Google Search Console API for comprehensive audit data
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'sc-domain:docstandard.co';
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

    const auditData = {
      timestamp: new Date().toISOString(),
      site: SITE_URL,
      summary: {},
      sitemaps: [],
      searchAnalytics: {},
      topQueries: [],
      topPages: [],
      errors: []
    };

    // 1. Get sitemap information
    console.log('📋 Fetching sitemap data...');
    try {
      const sitemaps = await webmasters.sitemaps.list({ siteUrl: SITE_URL });
      auditData.sitemaps = sitemaps.data.sitemap || [];
      
      // Calculate totals
      let totalUrls = 0;
      let indexedUrls = 0;
      
      auditData.sitemaps.forEach(sitemap => {
        const urls = parseInt(sitemap.contents?.[0]?.submitted || 0);
        const idx = parseInt(sitemap.contents?.[0]?.indexed || 0);
        totalUrls += urls;
        indexedUrls += idx;
      });
      
      auditData.summary = {
        totalSitemaps: auditData.sitemaps.length,
        totalUrls,
        indexedUrls,
        indexRate: totalUrls > 0 ? ((indexedUrls / totalUrls) * 100).toFixed(1) + '%' : '0%'
      };
      
      console.log(`  ✓ Found ${auditData.sitemaps.length} sitemaps`);
      console.log(`  ✓ Total URLs: ${totalUrls}`);
      console.log(`  ✓ Indexed: ${indexedUrls} (${auditData.summary.indexRate})\n`);
    } catch (err) {
      console.error('  ❌ Sitemap fetch failed:', err.message);
      auditData.errors.push({ source: 'sitemaps', error: err.message });
    }

    // 2. Get search analytics (last 7 days)
    console.log('📊 Fetching search analytics...');
    try {
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const searchAnalytics = await webmasters.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate,
          endDate,
          dimensions: ['query', 'page'],
          rowLimit: 100
        }
      });

      const rows = searchAnalytics.data.rows || [];
      
      // Calculate totals
      let totalClicks = 0;
      let totalImpressions = 0;
      
      rows.forEach(r => {
        totalClicks += r.clicks || 0;
        totalImpressions += r.impressions || 0;
      });

      auditData.searchAnalytics = {
        period: { startDate, endDate },
        totalClicks,
        totalImpressions,
        avgCtr: totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) + '%' : '0%',
        totalQueries: rows.length
      };

      // Get top queries
      const queryData = {};
      rows.forEach(r => {
        const query = r.keys[0];
        if (!queryData[query]) {
          queryData[query] = { clicks: 0, impressions: 0 };
        }
        queryData[query].clicks += r.clicks || 0;
        queryData[query].impressions += r.impressions || 0;
      });

      auditData.topQueries = Object.entries(queryData)
        .sort((a, b) => b[1].impressions - a[1].impressions)
        .slice(0, 20)
        .map(([query, data]) => ({
          query,
          clicks: data.clicks,
          impressions: data.impressions,
          ctr: data.impressions > 0 ? ((data.clicks / data.impressions) * 100).toFixed(1) + '%' : '0%'
        }));

      // Get top pages
      const pageData = {};
      rows.forEach(r => {
        const page = r.keys[1];
        if (!pageData[page]) {
          pageData[page] = { clicks: 0, impressions: 0 };
        }
        pageData[page].clicks += r.clicks || 0;
        pageData[page].impressions += r.impressions || 0;
      });

      auditData.topPages = Object.entries(pageData)
        .sort((a, b) => b[1].impressions - a[1].impressions)
        .slice(0, 20)
        .map(([page, data]) => ({
          page,
          clicks: data.clicks,
          impressions: data.impressions,
          ctr: data.impressions > 0 ? ((data.clicks / data.impressions) * 100).toFixed(1) + '%' : '0%'
        }));

      console.log(`  ✓ Queries with data: ${rows.length}`);
      console.log(`  ✓ Total clicks: ${totalClicks}`);
      console.log(`  ✓ Total impressions: ${totalImpressions}`);
      console.log(`  ✓ Avg CTR: ${auditData.searchAnalytics.avgCtr}\n`);
    } catch (err) {
      console.error('  ❌ Search analytics failed:', err.message);
      auditData.errors.push({ source: 'searchAnalytics', error: err.message });
    }

    // Save audit results
    fs.writeFileSync(AUDIT_PATH, JSON.stringify(auditData, null, 2));

    console.log('✅ Audit Complete!');
    console.log(`\n📈 Summary:`);
    console.log(`  • ${auditData.summary.totalSitemaps || 0} sitemaps`);
    console.log(`  • ${auditData.summary.totalUrls || 0} total URLs`);
    console.log(`  • ${auditData.summary.indexedUrls || 0} indexed (${auditData.summary.indexRate || '0%'})`);
    console.log(`  • ${auditData.searchAnalytics.totalQueries || 0} active queries`);
    console.log(`  • ${auditData.searchAnalytics.totalClicks || 0} clicks (7 days)`);
    console.log(`\n💾 Full report saved to: ${AUDIT_PATH}`);

    if (auditData.errors.length > 0) {
      console.log(`\n⚠️  ${auditData.errors.length} errors encountered`);
    }

  } catch (err) {
    console.error('❌ Audit failed:', err.message);
    process.exit(1);
  }
}

refreshAudit();
