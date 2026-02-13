#!/usr/bin/env python3
"""
Re-scrape Twitter links from DexScreener using their API.
Find actual token-specific Twitter links (not DexScreener's footer link).
"""

import json
import time
import subprocess
import re

# Read the current tokens file
with open('/Users/bawsbarbie/clawd/base-tokens-socials.json', 'r') as f:
    tokens = json.load(f)

print(f"Found {len(tokens)} tokens to process")
print("=" * 60)

def get_token_socials_from_api(token):
    """Get socials from DexScreener API using token symbol search."""
    symbol = token['symbol']
    name = token['name']
    
    # Try searching by symbol
    url = f'https://api.dexscreener.com/latest/dex/search?q={symbol}'
    
    try:
        result = subprocess.run(
            ['curl', '-s', url],
            capture_output=True,
            text=True,
            timeout=30
        )
        
        if result.returncode != 0:
            return None, None
        
        data = json.loads(result.stdout)
        
        if not data.get('pairs'):
            return None, None
        
        # Find the pair that matches our Base chain token
        for pair in data['pairs']:
            # Check if it's on Base chain
            if pair.get('chainId') != 'base':
                continue
            
            # Check if token symbol matches
            base_token = pair.get('baseToken', {})
            if base_token.get('symbol', '').lower() != symbol.lower():
                continue
            
            # Get socials
            info = pair.get('info', {})
            socials = info.get('socials', [])
            websites = info.get('websites', [])
            
            twitter_url = None
            website_url = None
            
            for social in socials:
                if social.get('type') == 'twitter':
                    twitter_url = social.get('url')
                    break
            
            for site in websites:
                if site.get('label', '').lower() in ['website', 'official']:
                    website_url = site.get('url')
                    break
            
            return twitter_url, website_url
        
        return None, None
        
    except Exception as e:
        print(f"  API error: {e}")
        return None, None

# Process all tokens
updated_count = 0
sample_results = []

for i, token in enumerate(tokens):
    name = token['name']
    symbol = token['symbol']
    old_twitter = token.get('twitter')
    old_website = token.get('website')
    
    print(f"\n[{i+1}/{len(tokens)}] {name} ({symbol}):")
    print(f"  Current Twitter: {old_twitter}")
    
    new_twitter, new_website = get_token_socials_from_api(token)
    
    # Update token data
    if new_twitter:
        token['twitter'] = new_twitter
        print(f"  NEW Twitter: {new_twitter}")
        if old_twitter != new_twitter:
            updated_count += 1
    else:
        # Keep existing if we found one before, otherwise null
        if old_twitter and 'dexscreener' in str(old_twitter).lower():
            token['twitter'] = None
            print(f"  Setting Twitter to None (was dexscreener)")
            updated_count += 1
        else:
            print(f"  No Twitter found, keeping: {old_twitter}")
    
    if new_website:
        token['website'] = new_website
        print(f"  Website: {new_website}")
    
    # Save first 3 as samples
    if i < 3:
        sample_results.append({
            'name': name,
            'symbol': symbol,
            'old_twitter': old_twitter,
            'new_twitter': new_twitter or token.get('twitter'),
            'old_website': old_website,
            'new_website': new_website or token.get('website')
        })
    
    # Rate limit: 1 second delay
    time.sleep(1)

print("\n" + "=" * 60)
print("SAMPLE RESULTS (First 3 tokens):")
print("=" * 60)
for result in sample_results:
    print(f"\n{result['name']} ({result['symbol']}):")
    print(f"  Twitter: {result['old_twitter']} -> {result['new_twitter']}")
    print(f"  Website: {result['old_website']} -> {result['new_website']}")

print(f"\n{'=' * 60}")
print(f"Total tokens updated: {updated_count}")

# Write updated file
with open('/Users/bawsbarbie/clawd/base-tokens-socials.json', 'w') as f:
    json.dump(tokens, f, indent=2)

print("Updated file saved!")
