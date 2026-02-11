#!/usr/bin/env node
/**
 * Accurate Index Count from GSC
 * Gets real indexation numbers
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const SITE_URL = 'sc-domain:docstandard.co';
const REPORT_PATH = path.join(__dirname, '../reports/gsc-index-count.json');

async function getIndexCount() {
  try {
    const keyPath = path.join(__dirname, '../config/gsc-service-account.json');
    const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    
    const auth = new google.auth.GoogleAuth({
      credentials: key,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly']
    });

    const webmasters = google.webmasters({ version: 'v3', auth });

    console.log('🔍 Getting accurate index count from GSC...\n');

    const report = {
      timestamp: new Date().toISOString(),
      site: SITE_URL
    };

    // Method 1: Get all pages with search data (definitely indexed)
    console.log('Method 1: Pages with search impressions (definitely indexed)...');
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    let pageCount = 0;
    let pagesWithData = [];
    let startRow = 0;
    
    // Paginate through all pages
    while (true) {
      const response = await webmasters.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate,
          endDate,
          dimensions: ['page'],
          rowLimit: 25000,
          startRow
        }
      });

      const rows = response.data.rows || [];
      if (rows.length === 0) break;
      
      pagesWithData.push(...rows.map(r => ({
        url: r.keys[0],
        clicks: r.clicks || 0,
        impressions: r.impressions || 0,
        position: r.position || 0
      })));
      
      pageCount += rows.length;
      startRow += 25000;
      
      if (rows.length < 25000) break;
    }

    report.pagesWithSearchData = {
      count: pageCount,
      pages: pagesWithData
    };

    console.log(`  ✅ ${pageCount} pages have search impressions (indexed)\n`);

    // Method 2: Check sitemap index status
    console.log('Method 2: Sitemap coverage report...');
    try {
      const sitemaps = await webmasters.sitemaps.list({ siteUrl: SITE_URL });
      const sitemapData = sitemaps.data.sitemap || [];
      
      let totalSubmitted = 0;
      let totalIndexed = 0;
      
      sitemapData.forEach(sitemap => {
        const contents = sitemap.contents?.[0] || {};
        const submitted = parseInt(contents.submitted || 0);
        const indexed = parseInt(contents.indexed || 0);
        
        totalSubmitted += submitted;
        totalIndexed += indexed;
        
        // Show individual sitemap stats
        if (submitted > 0) {
          console.log(`  • ${path.basename(sitemap.path)}: ${indexed}/${submitted} indexed (${submitted > 0 ? ((indexed/submitted)*100).toFixed(1) : 0}%)`);
        }
      });

      report.sitemapCoverage = {
        totalSitemaps: sitemapData.length,
        totalSubmitted,
        totalIndexed,
        indexRate: totalSubmitted > 0 ? ((totalIndexed / totalSubmitted) * 100).toFixed(1) + '%' : '0%'
      };

      console.log(`\n  📊 Total: ${totalIndexed}/${totalSubmitted} indexed (${report.sitemapCoverage.indexRate})\n`);
    } catch (err) {
      console.log(`  ❌ Sitemap error: ${err.message}\n`);
      report.sitemapCoverage = { error: err.message };
    }

    // Save report
    fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
    fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));

    // Summary
    console.log('═'.repeat(60));
    console.log('📈 INDEXATION SUMMARY');
    console.log('═'.repeat(60));
    console.log(`Site: ${SITE_URL}`);
    console.log(`Timestamp: ${new Date().toLocaleString()}`);
    console.log('');
    console.log(`🟢 Pages with search data: ${pageCount}`);
    if (report.sitemapCoverage?.totalIndexed !== undefined) {
      console.log(`📋 URLs reported as indexed (sitemaps): ${report.sitemapCoverage.totalIndexed}`);
    }
    console.log('');
    console.log('Note: "Pages with search data" is the most accurate count');
    console.log('      These are URLs Google has indexed and shown in search results.');
    console.log('');
    console.log(`💾 Detailed report: ${REPORT_PATH}`);
    console.log('═'.repeat(60));

    // Show top performers
    if (pagesWithData.length > 0) {
      console.log('\n🏆 Top 10 Pages by Impressions:');
      pagesWithData
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, 10)
        .forEach((p, i) => {
          console.log(`  ${i + 1}. ${p.url.split('/').pop() || 'Home'}`);
          console.log(`     ${p.impressions} imp, ${p.clicks} clicks, pos ${p.position.toFixed(1)}`);
        });
    }

  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

getIndexCount();
