#!/bin/bash

# Test the API for first 3 tokens to verify we're getting correct data

echo "=== Testing DexScreener API for sample tokens ==="

echo -e "\n1. Based Penguin (PENGUIN):"
curl -s "https://api.dexscreener.com/latest/dex/search?q=PENGUIN" | grep -o '"twitter":"[^"]*"' | head -5

echo -e "\n2. based fric (FRIC):"
curl -s "https://api.dexscreener.com/latest/dex/search?q=FRIC" | grep -o '"twitter":"[^"]*"' | head -5

echo -e "\n3. dexcheckai:"
curl -s "https://api.dexscreener.com/latest/dex/search?q=dexcheckai" | grep -o '"twitter":"[^"]*"' | head -5
