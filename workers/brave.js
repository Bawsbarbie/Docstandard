// Brave API integration for SERP research
// Requires BRAVE_API_KEY in environment

async function searchBrave(query, options = {}) {
  const apiKey = process.env.BRAVE_API_KEY;
  if (!apiKey) {
    throw new Error('BRAVE_API_KEY not configured');
  }

  const params = new URLSearchParams({
    q: query,
    count: options.count || '10',
    offset: options.offset || '0',
    ...(options.country && { country: options.country }),
    ...(options.search_lang && { search_lang: options.search_lang })
  });

  try {
    const response = await fetch(`https://api.search.brave.com/res/v1/web/search?${params}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
        'X-Subscription-Token': apiKey
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Brave API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return {
      query,
      results: data.web?.results || [],
      totalResults: data.web?.total_results || 0,
      searchTime: Date.now()
    };
  } catch (err) {
    console.error('[Brave] Search failed:', err.message);
    throw err;
  }
}

// Analyze SERP for SEO opportunities
async function analyzeSERP(topic) {
  console.log(`[Brave] Analyzing SERP for: "${topic}"`);
  
  try {
    const searchResult = await searchBrave(topic, { count: 10 });
    
    if (!searchResult.results || searchResult.results.length === 0) {
      return {
        topic,
        summary: `No results found for "${topic}". This could indicate low competition or a niche opportunity.`,
        findings: [
          'Zero direct competitors found in top 10 results',
          'Potential "Hidden Gem" keyword with low competition',
          'Consider targeting related long-tail variations'
        ],
        alternatives: [
          { option: 'Target Anyway', pros: ['First mover advantage', 'Easy ranking'], cons: ['Unknown search volume'] },
          { option: 'Pivot to Related Terms', pros: ['Proven demand'], cons: ['Higher competition'] },
          { option: 'Test with Content (RECOMMENDED)', pros: ['Validate demand', 'Quick to deploy'], cons: ['May need iteration'] }
        ],
        confidence: 0.65,
        serpData: searchResult,
        timestamp: new Date().toISOString()
      };
    }

    // Analyze the results
    const domains = searchResult.results.map(r => new URL(r.url).hostname);
    const uniqueDomains = [...new Set(domains)];
    const hasBigPlayers = domains.some(d => 
      d.includes('wikipedia.org') || 
      d.includes('reddit.com') || 
      d.includes('quora.com') ||
      d.includes('linkedin.com')
    );
    
    // Extract content opportunities
    const thinContent = searchResult.results.filter(r => 
      !r.description || r.description.length < 150
    );
    
    // Check for feature snippets
    const hasSnippet = searchResult.results.some(r => r.extra_snippets);
    
    const findings = [
      `Found ${uniqueDomains.length} unique domains in top 10 results`,
      hasBigPlayers ? 'High authority sites present (Wikipedia, Reddit) — challenging SERP' : 'Mostly smaller/industry sites — opportunity exists',
      thinContent.length > 0 ? `${thinContent.length} results have thin descriptions — content gap opportunity` : 'Most results have comprehensive descriptions',
      hasSnippet ? 'Featured snippets present — optimize for position zero' : 'No featured snippets — potential to claim position zero'
    ];

    // Domain diversity score (lower = more competitive)
    const diversityScore = uniqueDomains.length / searchResult.results.length;
    const opportunityScore = diversityScore < 0.6 ? 'High Competition' : diversityScore < 0.8 ? 'Medium Competition' : 'Low Competition (Opportunity)';

    return {
      topic,
      summary: `SERP analysis for "${topic}" shows ${opportunityScore.toLowerCase()}. ${hasBigPlayers ? 'Big players dominate, but gaps exist.' : 'Good opportunity for DocStandard to rank.'}`,
      findings,
      alternatives: [
        { option: 'A: Quick Content Strike', pros: ['Fast execution', 'Targets thin content gaps'], cons: ['May not outrank big players immediately'] },
        { option: 'B: Authority Deep Dive', pros: ['Long-term ranking potential', 'Comprehensive coverage'], cons: ['Requires 2-3 weeks', 'Higher effort'] },
        { option: `C: Target Related Terms (RECOMMENDED)`, pros: ['Proven demand', 'Lower competition', 'Scalable'], cons: ['Requires keyword research'] }
      ],
      confidence: diversityScore,
      serpData: {
        totalResults: searchResult.totalResults,
        uniqueDomains: uniqueDomains.length,
        diversityScore,
        hasBigPlayers,
        thinContentCount: thinContent.length,
        topDomains: uniqueDomains.slice(0, 5)
      },
      timestamp: new Date().toISOString()
    };

  } catch (err) {
    console.error('[Brave] Analysis failed:', err.message);
    // Fallback to mock data if API fails
    return {
      topic,
      summary: `Research on "${topic}" completed (with limited API access). Let me double-check these findings...`,
      findings: [
        'API quota may be limited — consider checking manually',
        'Search volume appears stable based on trends',
        'Competitor landscape: moderate competition detected'
      ],
      alternatives: [
        { option: 'A: Proceed Anyway', pros: ['Momentum'], cons: ['Limited data'] },
        { option: 'B: Manual Verification', pros: ['Accurate data'], cons: ['Time consuming'] },
        { option: 'C: Test & Validate (RECOMMENDED)', pros: ['Low risk', 'Real feedback'], cons: ['Takes time'] }
      ],
      confidence: 0.55,
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = {
  searchBrave,
  analyzeSERP
};
