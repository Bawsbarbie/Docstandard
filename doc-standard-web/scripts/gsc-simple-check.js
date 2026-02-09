#!/usr/bin/env node
/**
 * Simple GSC Status Checker
 * Uses Search Analytics API to get basic indexation data
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

async function checkGSC() {
  try {
    // Load service account credentials
    const keyPath = path.join(__dirname, '../config/gsc-service-account.json');
    
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

    console.log('🔍 Checking GSC status for:', SITE_URL);
    console.log('⏳ Fetching search analytics data...\n');

    // Get search analytics data (last 7 days)
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    try {
      const searchAnalytics = await webmasters.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate,
          endDate,
          dimensions: ['page'],
          rowLimit: 500
        }
      });

      const rows = searchAnalytics.data?.rows || [];
      
      console.log('✅ Search Analytics Data Retrieved');
      console.log(`📊 Pages with impressions: ${rows.length}`);
      
      if (rows.length > 0) {
        console.log('\n📈 Top 10 pages by impressions:');
        rows.slice(0, 10).forEach((row, i) => {
          console.log(`  ${i + 1}. ${row.keys[0]}: ${row.impressions} impressions, ${row.clicks} clicks`);
        });
      }

      // Save summary
      const auditLog = {
        timestamp: new Date().toISOString(),
        site: SITE_URL,
        pagesWithTraffic: rows.length,
        dateRange: { startDate, endDate },
        topPages: rows.slice(0, 50).map(r => ({
          url: r.keys[0],
          impressions: r.impressions,
          clicks: r.clicks,
          ctr: r.ctr,
          position: r.position
        }))
      };

      fs.writeFileSync(AUDIT_PATH, JSON.stringify(auditLog, null, 2));
      console.log(`\n💾 Saved to: ${AUDIT_PATH}`);

    } catch (apiErr) {
      console.error('❌ API Error:', apiErr.message);
      if (apiErr.response?.data?.error) {
        console.error('Details:', JSON.stringify(apiErr.response.data.error, null, 2));
      }
    }

  } catch (err) {
    console.error('❌ Audit failed:', err.message);
    process.exit(1);
  }
}

checkGSC();
