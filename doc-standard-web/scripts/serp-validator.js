#!/usr/bin/env node

/**
 * SERP Intent Validator
 * Analyzes search results to identify 'Intent Mismatches' (SaaS ranking for Service keywords).
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const BRAVE_API_KEY = process.env.BRAVE_SEARCH_API_KEY || process.env.BRAVE_API_KEY;
const BRAVE_SEARCH_URL = 'https://api.search.brave.com/res/v1/web/search';

/**
 * Fetch SERP results from Brave Search API
 */
async function fetchSERP(keyword) {
  if (!BRAVE_API_KEY) {
    throw new Error('BRAVE_SEARCH_API_KEY environment variable is not set');
  }

  const url = new URL(BRAVE_SEARCH_URL);
  url.searchParams.append('q', keyword);
  url.searchParams.append('count', '10');

  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Subscription-Token': BRAVE_API_KEY
      }
    };

    https.get(url.toString(), options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`Brave API returned status ${res.statusCode}: ${data}`));
          return;
        }
        try {
          const json = JSON.parse(data);
          resolve(json.web?.results || []);
        } catch (error) {
          reject(new Error(`Failed to parse API response: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });
  });
}

/**
 * Classify a search result as SaaS/Tool or Service
 */
function classifyResult(result) {
  const text = (result.title + ' ' + (result.description || '')).toLowerCase();
  
  const softwareKeywords = [
    'software', 'app', 'platform', 'saas', 'api', 'tool', 
    'automation', 'integration', 'cloud', 'dashboard', 'extension'
  ];

  const hasSoftwareKeyword = softwareKeywords.some(kw => text.includes(kw));
  
  return hasSoftwareKeyword ? 'SAAS' : 'SERVICE';
}

/**
 * Analyze a single keyword
 */
async function validateKeyword(keyword) {
  console.log(`\n🔍 Validating Intent for: "${keyword}"`);
  
  try {
    const results = await fetchSERP(keyword);
    if (results.length === 0) return null;

    const classifications = results.map(r => classifyResult(r));
    const saasCount = classifications.filter(c => c === 'SAAS').length;
    const serviceCount = classifications.length - saasCount;
    const saasRatio = (saasCount / results.length) * 100;

    let status = 'MEDIUM COMPETITION';
    if (saasRatio >= 70) status = 'HIGH OPPORTUNITY (Intent Mismatch)';
    if (serviceCount > 5) status = 'HIGH COMPETITION (Service Heavy)';

    const result = {
      keyword,
      saasRatio: saasRatio.toFixed(1) + '%',
      saasCount,
      serviceCount,
      status,
      topResult: results[0].title
    };

    console.table([result]);
    return result;

  } catch (error) {
    console.error(`❌ Error validating "${keyword}":`, error.message);
    return null;
  }
}

/**
 * Main Execution
 */
async function main() {
  const inputPath = path.join(__dirname, '../data/keyword-opportunities.json');
  let keywords = [];

  if (process.argv[2]) {
    keywords = [process.argv[2]];
  } else if (fs.existsSync(inputPath)) {
    keywords = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  } else {
    console.error('Usage: node serp-validator.js "keyword" OR provide data/keyword-opportunities.json');
    process.exit(1);
  }

  const reportsDir = path.join(__dirname, '../reports');
  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir);

  const finalResults = [];
  for (const kw of keywords) {
    const res = await validateKeyword(kw);
    if (res) finalResults.push(res);
    // Sleep to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  const reportPath = path.join(reportsDir, `serp-analysis-${Date.now()}.csv`);
  const csvHeaders = 'Keyword,SaaS Ratio,SaaS Count,Service Count,Status,Top Result\n';
  const csvRows = finalResults.map(r => 
    `"${r.keyword}","${r.saasRatio}",${r.saasCount},${r.serviceCount},"${r.status}","${r.topResult.replace(/"/g, '""')}"`
  ).join('\n');

  fs.writeFileSync(reportPath, csvHeaders + csvRows);
  console.log(`\n✅ Report saved to: ${reportPath}`);
}

main();
