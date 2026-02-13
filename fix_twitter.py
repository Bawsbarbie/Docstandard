#!/usr/bin/env python3
import json
import time
import urllib.request
import urllib.error

# Read tokens
with open('/Users/bawsbarbie/clawd/base-tokens-socials.json', 'r') as f:
    tokens = json.load(f)

print(f"Processing {len(tokens)} tokens...")
print("=" * 60)

def fetch_api(symbol):
    """Fetch data from DexScreener API."""
    url = f'https://api.dexscreener.com/latest/dex/search?q={urllib.parse.quote(symbol)}'
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=30) as response:
            return json.loads(response.read().decode('utf-8'))
    except Exception as e:
        print(f"    API error: {e}")
        return None

updated = 0
samples = []

for i, token in enumerate(tokens):
    name = token['name']
    symbol = token['symbol']
    old_tw = token.get('twitter')
    old_web = token.get('website')
    
    print(f"\n[{i+1}] {name} ({symbol})")
    
    # Fetch from API
    data = fetch_api(symbol)
    new_tw = None
    new_web = None
    
    if data and data.get('pairs'):
        # Find Base chain pair with matching symbol
        for pair in data['pairs']:
            if pair.get('chainId') != 'base':
                continue
            base = pair.get('baseToken', {})
            if base.get('symbol', '').lower() == symbol.lower():
                info = pair.get('info', {})
                # Get Twitter
                for social in info.get('socials', []):
                    if social.get('type') == 'twitter':
                        new_tw = social.get('url')
                        break
                # Get Website
                for site in info.get('websites', []):
                    if site.get('label', '').lower() in ['website', 'official']:
                        new_web = site.get('url')
                        break
                break
    
    # Update token
    if new_tw:
        if old_tw != new_tw:
            print(f"    Twitter: {old_tw} -> {new_tw}")
            token['twitter'] = new_tw
            updated += 1
        else:
            print(f"    Twitter: {new_tw} (unchanged)")
    else:
        # Remove dexscreener link if that's what we had
        if old_tw and 'dexscreener' in str(old_tw).lower():
            print(f"    Twitter: {old_tw} -> None")
            token['twitter'] = None
            updated += 1
        else:
            print(f"    Twitter: {old_tw} (no change)")
    
    if new_web and old_web != new_web:
        print(f"    Website: {old_web} -> {new_web}")
        token['website'] = new_web
    
    # Track first 3 as samples
    if i < 3:
        samples.append({
            'name': name, 'old': old_tw, 'new': new_tw or token.get('twitter')
        })
    
    time.sleep(1.1)  # Rate limit

# Print samples
print("\n" + "=" * 60)
print("SAMPLE RESULTS (First 3 tokens):")
for s in samples:
    print(f"\n{s['name']}:")
    print(f"  Old: {s['old']}")
    print(f"  New: {s['new']}")

print(f"\n{'=' * 60}")
print(f"Updated {updated} tokens")

# Save
with open('/Users/bawsbarbie/clawd/base-tokens-socials.json', 'w') as f:
    json.dump(tokens, f, indent=2)

print("File saved!")
