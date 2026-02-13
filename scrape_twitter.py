#!/usr/bin/env python3
"""
Re-scrape Twitter links from DexScreener Base token pages.
Find actual token-specific Twitter links (not DexScreener's footer link).
"""

import json
import time
import re
from playwright.sync_api import sync_playwright

# Read the current tokens file
with open('/Users/bawsbarbie/clawd/base-tokens-socials.json', 'r') as f:
    tokens = json.load(f)

print(f"Found {len(tokens)} tokens to process")
print("=" * 60)

def extract_twitter_from_page(page, token_name):
    """Extract token-specific Twitter link from page."""
    twitter_links = []
    
    # Wait for the page to load
    page.wait_for_load_state('networkidle', timeout=10000)
    time.sleep(2)  # Extra wait for dynamic content
    
    # Get all links on the page
    links = page.query_selector_all('a[href*="twitter.com"], a[href*="x.com"]')
    
    for link in links:
        href = link.get_attribute('href') or ''
        # Skip DexScreener's own Twitter
        if 'dexscreener' in href.lower():
            continue
        # Check if it's a token-specific Twitter link
        if 'twitter.com/' in href or 'x.com/' in href:
            # Get nearby text/context to verify it's the token's social
            text = link.inner_text().strip().lower()
            # Keep links that look like token socials
            twitter_links.append(href)
    
    return twitter_links

def get_token_twitter(token):
    """Get Twitter link for a single token."""
    dex_url = token['dexUrl']
    token_name = token['name']
    
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            
            print(f"Loading: {dex_url}")
            page.goto(dex_url, wait_until='networkidle', timeout=30000)
            
            # Give extra time for any dynamic content to load
            time.sleep(3)
            
            # Look for social links section
            # DexScreener typically has social links near the token info
            
            # Method 1: Look for social icons/links with specific selectors
            twitter_links = page.query_selector_all('a[href*="twitter.com/"]:not([href*="dexscreener"])')
            x_links = page.query_selector_all('a[href*="x.com/"]:not([href*="dexscreener"])')
            
            all_links = twitter_links + x_links
            
            for link in all_links:
                href = link.get_attribute('href')
                if href:
                    print(f"  Found: {href}")
                    browser.close()
                    return href
            
            # Method 2: Search page content for Twitter URLs
            page_content = page.content()
            
            # Find all Twitter/X URLs that are NOT DexScreener's
            twitter_pattern = r'https?://(?:twitter\.com|x\.com)/([a-zA-Z0-9_]+)'
            matches = re.findall(twitter_pattern, page_content)
            
            for match in set(matches):
                if match.lower() not in ['dexscreener', 'home', 'search']:
                    url = f"https://twitter.com/{match}"
                    print(f"  Found (from content): {url}")
                    browser.close()
                    return url
            
            browser.close()
            print(f"  No Twitter link found")
            return None
            
    except Exception as e:
        print(f"  Error: {e}")
        return None

# Process first 3 tokens as a sample
print("\nSAMPLE - Processing first 3 tokens:\n")
sample_results = {}

for token in tokens[:3]:
    name = token['name']
    print(f"\n{name} ({token['symbol']}):")
    print(f"  Current: {token.get('twitter')}")
    print(f"  Website: {token.get('website')}")
    
    twitter = get_token_twitter(token)
    sample_results[name] = {
        'old': token.get('twitter'),
        'new': twitter
    }
    
    # Rate limit: 1 second delay
    time.sleep(1)

print("\n" + "=" * 60)
print("SAMPLE RESULTS:")
print("=" * 60)
for name, result in sample_results.items():
    print(f"\n{name}:")
    print(f"  Old: {result['old']}")
    print(f"  New: {result['new']}")
