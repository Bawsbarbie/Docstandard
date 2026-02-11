#!/usr/bin/env node
/**
 * Detailed GSC Indexation Checker
 * Checks specific URLs for indexation status
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'sc-domain:docstandard.co';
const REPORT_PATH = path.join(__dirname, '../reports/gsc-indexation-report.json');

// URLs to check (prioritized)
const PRIORITY_URLS = [
  'https://docstandard.co/',
  'https://docstandard.co/about',
  'https://docstandard.co/blog/commercial-invoice-processing',
  'https://docstandard.co/blog/bill-of-lading-processing',
  'https://docstandard.co/integration/cargowise-to-netsuite-data-bridge',
  'https://docstandard.co/finance/freight-bill-audit-data-preparation',
  'https://docstandard.co/customs/customs-entry-document-processing'
];

async function checkIndexation() {
  try {
    const keyPath = path.join(__dirname, '../config/gsc-service-account.json');
    const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    
    const auth = new google.auth.GoogleAuth({
      credentials: key,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly']
    });

    const webmasters = google.webmasters({ version: 'v3', auth });

    console.log('🔍 Checking indexation status for priority URLs...\n');

    const results = {
      timestamp: new Date().toISOString(),
      checked: [],
      indexed: [],
      notIndexed: [],
      errors: []
    };

    // Check each URL
    for (const url of PRIORITY_URLS) {
      try {
        console.log(`Checking: ${url}`);
        
        // Use search appearance to check if URL has data
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        const response = await webmasters.searchanalytics.query({
          siteUrl: SITE_URL,
          requestBody: {
            startDate,
            endDate,
            dimensions: ['page'],
            dimensionFilterGroups: [{
              filters: [{
                dimension: 'page',
                operator: 'equals',
                expression: url
              }]
            }],
            rowLimit: 1
          }
        });

        const rows = response.data.rows || [];
        const hasData = rows.length > 0;
        
        const result = {
          url,
          status: hasData ? 'INDEXED' : 'NO_DATA',
          impressions: hasData ? rows[0].impressions : 0,
          clicks: hasData ? rows[0].clicks : 0,
          position: hasData ? rows[0].position : null
        };

        results.checked.push(result);
        
        if (hasData) {
          results.indexed.push(result);
          console.log(`  ✅ Indexed (${result.impressions} impressions)`);
        } else {
          results.notIndexed.push(result);
          console.log(`  ⚠️  No search data (may not be indexed)`);
        }
      } catch (err) {
        console.log(`  ❌ Error: ${err.message}`);
        results.errors.push({ url, error: err.message });
      }
      
      // Rate limit
      await new Promise(r => setTimeout(r, 500));
    }

    // Save report
    fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
    fs.writeFileSync(REPORT_PATH, JSON.stringify(results, null, 2));

    console.log('\n✅ Indexation check complete!');
    console.log(`📊 Results:`);
    console.log(`  • Indexed: ${results.indexed.length}`);
    console.log(`  • No data: ${results.notIndexed.length}`);
    console.log(`  • Errors: ${results.errors.length}`);
    console.log(`\n💾 Report saved to: ${REPORT_PATH}`);

    // Show indexed URLs
    if (results.indexed.length > 0) {
      console.log('\n✅ Indexed URLs:');
      results.indexed.forEach(r => {
        console.log(`  • ${r.url} (${r.impressions} imp, ${r.clicks} clicks)`);
      });
    }

  } catch (err) {
    console.error('❌ Check failed:', err.message);
    process.exit(1);
  }
}

checkIndexation();
