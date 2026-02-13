const fs = require('fs');

// Read and parse CSV
const csvContent = fs.readFileSync('/Users/bawsbarbie/.openclaw/media/inbound/file_239---07e733ba-3530-43a2-b6e8-cd9014b59aff.csv', 'utf8');
const lines = csvContent.trim().split('\n');
const headers = lines[0].replace(/^﻿/, '').split(',').map(h => h.replace(/^"|"$/g, ''));

// Parse CSV rows
const tokens = [];
for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const values = line.split(',').map(v => v.replace(/^"|"$/g, ''));
    const token = {};
    headers.forEach((h, idx) => {
        token[h] = values[idx];
    });
    tokens.push({
        name: token['baseToken.name'],
        symbol: token['baseToken.symbol'],
        url: token['url']
    });
}

console.log(`Found ${tokens.length} tokens to process`);

// Delay function
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Extract social links from page content using the browser snapshot
async function extractSocialLinksFromSnapshot(snapshot) {
    const result = {
        twitter: null,
        telegram: null,
        website: null
    };
    
    // The snapshot should contain aria labels and links
    // Look for Twitter/X links in the snapshot
    const twitterPatterns = [
        /https?:\/\/twitter\.com\/[^"\s<>]+/gi,
        /https?:\/\/x\.com\/[^"\s<>]+/gi
    ];
    
    for (const pattern of twitterPatterns) {
        const matches = snapshot.match(pattern);
        if (matches) {
            // Filter out generic/dexscreener twitter URLs
            const validTwitter = matches.find(m => 
                !m.includes('twitter.com/dexscreener') && 
                !m.includes('x.com/dexscreener') &&
                !m.includes('twitter.com/home') && 
                !m.includes('twitter.com/search') &&
                !m.includes('twitter.com/intent') &&
                m.split('/').length > 3
            );
            if (validTwitter) {
                result.twitter = validTwitter.split('"')[0].split(' ')[0];
                break;
            }
        }
    }
    
    // Look for Telegram links
    const telegramPattern = /https?:\/\/t\.me\/[^"\s<>]+/gi;
    const telegramMatches = snapshot.match(telegramPattern);
    if (telegramMatches) {
        result.telegram = telegramMatches[0].split('"')[0].split(' ')[0];
    }
    
    // Look for Website links
    const allUrls = snapshot.match(/href="(https?:\/\/[^"]+)"/gi) || [];
    for (const urlMatch of allUrls) {
        const url = urlMatch.replace('href="', '').replace('"', '');
        if (!url.includes('dexscreener.com') && 
            !url.includes('twitter.com') && 
            !url.includes('x.com') && 
            !url.includes('t.me') &&
            !url.includes('coingecko.com') &&
            !url.includes('coinmarketcap.com') &&
            !url.includes('etherscan.io') &&
            !url.includes('basescan.org') &&
            !url.includes('uniswap.org') &&
            !url.includes('google.com')) {
            if (!result.website) {
                result.website = url;
                break;
            }
        }
    }
    
    return result;
}

async function processTokens() {
    const results = [];
    const errors = [];
    
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        console.log(`[${i + 1}/${tokens.length}] Processing: ${token.name} (${token.symbol})`);
        console.log(`  URL: ${token.url}`);
        
        try {
            // Use browser action via CLI
            const { execSync } = require('child_process');
            
            // Navigate to the page
            const navigateCmd = `openclaw browser open "${token.url}" --profile openclaw 2>&1`;
            execSync(navigateCmd, { timeout: 15000 });
            
            // Wait for page to load
            await delay(3000);
            
            // Get snapshot
            const snapshotCmd = `openclaw browser snapshot --profile openclaw --limit 200 2>&1`;
            const snapshot = execSync(snapshotCmd, { encoding: 'utf8', timeout: 10000 });
            
            const socials = await extractSocialLinksFromSnapshot(snapshot);
            
            results.push({
                name: token.name,
                symbol: token.symbol,
                dexUrl: token.url,
                twitter: socials.twitter,
                telegram: socials.telegram,
                website: socials.website
            });
            
            console.log(`  ✓ Twitter: ${socials.twitter || 'N/A'}, Telegram: ${socials.telegram || 'N/A'}, Website: ${socials.website || 'N/A'}`);
            
        } catch (error) {
            console.log(`  ✗ Error: ${error.message}`);
            errors.push({
                name: token.name,
                symbol: token.symbol,
                dexUrl: token.url,
                error: error.message
            });
            results.push({
                name: token.name,
                symbol: token.symbol,
                dexUrl: token.url,
                twitter: null,
                telegram: null,
                website: null
            });
        }
        
        // Rate limiting: 1000ms delay between requests
        if (i < tokens.length - 1) {
            await delay(1000);
        }
    }
    
    // Save results
    fs.writeFileSync('/Users/bawsbarbie/clawd/base-tokens-socials.json', JSON.stringify(results, null, 2));
    
    console.log(`\n=== Summary ===`);
    console.log(`Total tokens: ${tokens.length}`);
    console.log(`Successful: ${tokens.length - errors.length}`);
    console.log(`Errors: ${errors.length}`);
    console.log(`Results saved to /Users/bawsbarbie/clawd/base-tokens-socials.json`);
}

processTokens();
