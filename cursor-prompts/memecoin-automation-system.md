# Memecoin Outreach Automation System

## Architecture Overview

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Dexscreener    │────▶│  X Profile Check │────▶│  Spaces Filter  │
│  Scraper        │     │  (Apify)         │     │  (SocialData)   │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
   Get token data          Check activity         Find Spaces hosts
   + X usernames           (last 14 days)         (Gem signal)
```

## Phase 1: Dexscreener Scraper (Existing)

Input: CSV export from Dexscreener
Output: JSON with token data + X usernames

```javascript
// scrape_dexscreener.js (your existing script)
const tokens = [
  {
    name: "Based Penguin",
    symbol: "PENGUIN",
    chain: "base",
    marketCap: 123171,
    liquidity: 185519,
    xUsername: "BasedPenguinX", // Extracted from socials
    dexUrl: "https://dexscreener.com/base/0x..."
  }
];
```

## Phase 2: X Activity Check (Apify)

Use Apify actor: **"twitter-profile-scraper"**

Cost: ~$0.005 per profile = $5 for 1000 accounts

```javascript
// check_x_activity.js
const { ApifyClient } = require('apify-client');

const client = new ApifyClient({ token: 'YOUR_API_TOKEN' });

async function checkXActivity(usernames) {
  const input = {
    usernames: usernames, // Array of X usernames (no @)
    maxItems: usernames.length,
    includeUnavailableUsers: false
  };

  const run = await client.actor("quacker/twitter-profile-scraper").call(input);
  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  
  return items.map(profile => ({
    username: profile.userName,
    displayName: profile.name,
    followers: profile.followers,
    following: profile.following,
    tweetsCount: profile.statusesCount,
    lastTweetDate: profile.status?.createdAt, // KEY FIELD
    isActive: isActiveInLast14Days(profile.status?.createdAt),
    bio: profile.description
  }));
}

function isActiveInLast14Days(lastTweetDate) {
  if (!lastTweetDate) return false;
  const lastTweet = new Date(lastTweetDate);
  const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
  return lastTweet >= fourteenDaysAgo;
}
```

**Filter Criteria:**
- Posted in last 14 days: ✅
- Followers > 500: ✅
- Account age > 7 days: ✅ (avoid rug pulls)

## Phase 3: Spaces Detection (SocialData API)

This is your GEM filter. Use **SocialData.tools**

```javascript
// check_spaces.js
const axios = require('axios');

const SOCIALDATA_API_KEY = 'YOUR_API_KEY';

async function checkSpacesHosted(username) {
  try {
    const response = await axios.get(
      `https://api.socialdata.tools/twitter/user/${username}/spaces`,
      {
        headers: { 'Authorization': `Bearer ${SOCIALDATA_API_KEY}` }
      }
    );
    
    const spaces = response.data;
    const recentSpaces = spaces.filter(space => {
      const spaceDate = new Date(space.created_at);
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      return spaceDate >= thirtyDaysAgo;
    });
    
    return {
      username,
      totalSpaces: spaces.length,
      recentSpaces: recentSpaces.length,
      hostedRecently: recentSpaces.length > 0,
      isGem: recentSpaces.length > 0 // KEY SIGNAL
    };
  } catch (error) {
    return { username, hostedRecently: false, isGem: false };
  }
}
```

**Pricing:**
- SocialData: $29/month for 10k requests
- 1000 memecoins = ~$3 worth of credits

## Complete Pipeline

```javascript
// memecoin_pipeline.js
const fs = require('fs');

async function runPipeline() {
  // Step 1: Load Dexscreener data
  const dexData = JSON.parse(fs.readFileSync('base-tokens-socials.json'));
  
  // Step 2: Filter tokens with X accounts
  const withX = dexData.filter(t => t.xUsername);
  console.log(`${withX.length} tokens have X accounts`);
  
  // Step 3: Check X activity
  const usernames = withX.map(t => t.xUsername);
  const xProfiles = await checkXActivity(usernames);
  
  // Step 4: Filter active accounts
  const activeProfiles = xProfiles.filter(p => p.isActive);
  console.log(`${activeProfiles.length} are active in last 14 days`);
  
  // Step 5: Check Spaces (only for active ones - saves credits)
  const gemProfiles = [];
  for (const profile of activeProfiles.slice(0, 100)) { // Test with 100 first
    const spaces = await checkSpacesHosted(profile.username);
    if (spaces.isGem) {
      gemProfiles.push({ ...profile, ...spaces });
    }
  }
  
  console.log(`${gemProfiles.length} GEM profiles (hosted Spaces)`);
  
  // Step 6: Save outreach list
  fs.writeFileSync('outreach-gems.json', JSON.stringify(gemProfiles, null, 2));
  
  return gemProfiles;
}

runPipeline();
```

## Output Format

```json
{
  "name": "Based Penguin",
  "symbol": "PENGUIN",
  "chain": "base",
  "marketCap": 123171,
  "xUsername": "BasedPenguinX",
  "followers": 2450,
  "isActive": true,
  "lastTweetDate": "2026-02-13T18:30:00Z",
  "hostedRecently": true,
  "recentSpaces": 3,
  "isGem": true,
  "outreachPriority": "TIER_A"
}
```

## Tier System for Outreach

| Tier | Criteria | Action |
|------|----------|--------|
| **TIER_A (Gem)** | Hosted Spaces + Active + >1000 followers | Priority outreach |
| **TIER_B** | Active + >500 followers | Standard outreach |
| **TIER_C** | Active but <500 followers | Low priority |
| **SKIP** | Inactive / No X / Dead | Ignore |

## Costs Breakdown (1000 memecoins)

| Service | Cost | Purpose |
|---------|------|---------|
| Apify Twitter Scraper | ~$5 | X activity check |
| SocialData API | ~$3 | Spaces detection |
| **Total** | **~$8** | Full automation |

## Next Steps

1. **Get Apify token:** https://console.apify.com
2. **Get SocialData API key:** https://socialdata.tools
3. **Test with 10-20 accounts** first
4. **Scale to full 1000**

## Alternative: Free Option (No Spaces)

If you only need X activity (not Spaces), use **Nitter**:
- Free, no API key needed
- Gets last tweet date, follower count
- But: No Spaces data
- Less reliable (Nitter instances go down)

```javascript
// Using Nitter (free)
async function checkNitter(username) {
  const nitterUrl = `https://nitter.net/${username}`;
  // Scrape last tweet date from HTML
  // ...implementation
}
```
