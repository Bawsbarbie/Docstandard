#!/usr/bin/env node

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const CSV_PATH = '/Users/bawsbarbie/.openclaw/media/inbound/file_239---07e733ba-3530-43a2-b6e8-cd9014b59aff.csv';
const OUTPUT_PATH = '/Users/bawsbarbie/clawd/base-twitter-links.json';

// Parse CSV content
function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = parseCSVLine(lines[0]);
  
  const records = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const record = {};
    headers.forEach((header, index) => {
      record[header] = values[index] || '';
    });
    records.push(record);
  }
  return records;
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++; // skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// Extract Twitter/X URL from page
async function extractTwitterUrl(page, dexUrl) {
  try {
    // Navigate with shorter timeout and domcontentloaded first
    await page.goto(dexUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
    
    // Wait for any social link or anchor to appear
    try {
      await page.waitForSelector('a[href]', { timeout: 10000 });
    } catch (e) {
      // Continue anyway
    }
    
    // Additional wait for JavaScript rendering
    await page.waitForTimeout(3000);
    
    // Look for all links on the page
    const links = await page.locator('a[href]').all();
    
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (!href) continue;
      
      // Skip DexScreener's own links
      if (href.includes('dexscreener.com')) continue;
      if (href.includes('twitter.com/dexscreener')) continue;
      if (href.includes('x.com/dexscreener')) continue;
      
      // Check if it's a valid Twitter/X URL for the token
      if (href.match(/https?:\/\/(www\.)?(twitter|x)\.com\/[^\/\s]+/i)) {
        // Normalize to x.com format
        const match = href.match(/(https?:\/\/(www\.)?(twitter|x)\.com\/[^\/\s?]+)/i);
        if (match) {
          return match[1].replace('twitter.com', 'x.com').replace('www.', '');
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error(`    Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('Reading CSV file...');
  const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
  const records = parseCSV(csvContent);
  
  console.log(`Found ${records.length} tokens to process\n`);
  
  // Launch browser
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process']
  });
  
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  
  const results = [];
  
  for (let i = 0; i < records.length; i++) {
    const record = records[i];
    const name = record['baseToken.name'];
    const symbol = record['baseToken.symbol'];
    const url = record['url'];
    
    process.stdout.write(`[${String(i + 1).padStart(2)}/${records.length}] ${name} (${symbol})... `);
    
    const page = await context.newPage();
    const twitter = await extractTwitterUrl(page, url);
    await page.close();
    
    results.push({
      name: name,
      symbol: symbol,
      twitter: twitter
    });
    
    console.log(twitter ? `✓ ${twitter}` : '✗ Not found');
    
    // Add 2 second delay between pages to avoid rate limiting
    if (i < records.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  await browser.close();
  
  // Save results
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2));
  console.log(`\n✅ Results saved to ${OUTPUT_PATH}`);
  console.log(`Total tokens: ${results.length}`);
  console.log(`Twitter links found: ${results.filter(r => r.twitter).length}`);
}

main().catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});
