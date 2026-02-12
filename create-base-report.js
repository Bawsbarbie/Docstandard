const fs = require('fs');
const path = require('path');

// Read CSV
const csvPath = '/Users/bawsbarbie/.openclaw/media/inbound/file_239---07e733ba-3530-43a2-b6e8-cd9014b59aff.csv';
const csvContent = fs.readFileSync(csvPath, 'utf8');

// Parse CSV
const lines = csvContent.split('\n');
const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());

const tokens = [];
for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    // Simple CSV parsing (handles quoted fields)
    const row = {};
    let col = 0;
    let inQuotes = false;
    let current = '';
    
    for (let j = 0; j < lines[i].length; j++) {
        const char = lines[i][j];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            row[headers[col]] = current.trim();
            current = '';
            col++;
        } else {
            current += char;
        }
    }
    row[headers[col]] = current.trim();
    
    if (row['baseToken.name']) {
        tokens.push(row);
    }
}

// Calculate vetting score
function calculateScore(token) {
    let score = 0;
    
    // Has image (20 pts)
    if (token['info.imageUrl'] && token['info.imageUrl'].length > 10) score += 20;
    
    // Has socials (check info.socials for twitter/telegram/website)
    const socials = token['info.socials'] || '';
    if (socials.includes('twitter') || socials.includes('x.com')) score += 20;
    if (socials.includes('telegram')) score += 15;
    if (socials.includes('website')) score += 15;
    
    // High liquidity > $50K (15 pts)
    const liquidity = parseFloat(token['liquidity.usd']) || 0;
    if (liquidity > 50000) score += 15;
    
    // Age > 7 days (15 pts)
    const createdAt = parseInt(token['pairCreatedAt']) || 0;
    const ageDays = (Date.now() - createdAt) / (1000 * 60 * 60 * 24);
    if (ageDays > 7) score += 15;
    
    return Math.min(100, score);
}

// Calculate age
function getAge(createdAt) {
    const ageDays = (Date.now() - parseInt(createdAt)) / (1000 * 60 * 60 * 24);
    if (ageDays < 1) return '< 1 day';
    if (ageDays < 7) return Math.floor(ageDays) + ' days';
    if (ageDays < 30) return Math.floor(ageDays / 7) + ' weeks';
    return Math.floor(ageDays / 30) + ' months';
}

// Format currency
function formatCurrency(value) {
    const num = parseFloat(value) || 0;
    if (num >= 1000000) return '$' + (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return '$' + (num / 1000).toFixed(1) + 'K';
    return '$' + num.toFixed(2);
}

// Parse socials
function getSocials(token) {
    const socials = [];
    const socialData = token['info.socials'] || '';
    
    if (socialData.includes('twitter') || socialData.includes('x.com')) {
        socials.push('🐦');
    }
    if (socialData.includes('telegram')) {
        socials.push('✈️');
    }
    if (socialData.includes('website')) {
        socials.push('🌐');
    }
    
    return socials.join(' ') || '—';
}

// Process all tokens
const processedTokens = tokens.map((token, idx) => ({
    rank: idx + 1,
    name: token['baseToken.name'],
    symbol: token['baseToken.symbol'],
    mcap: formatCurrency(token['marketCap']),
    volume: formatCurrency(token['volume.h24']),
    liquidity: formatCurrency(token['liquidity.usd']),
    age: getAge(token['pairCreatedAt']),
    score: calculateScore(token),
    hasImage: token['info.imageUrl'] && token['info.imageUrl'].length > 10 ? '✅' : '❌',
    socials: getSocials(token),
    dexUrl: token['url'],
    imageUrl: token['info.imageUrl'] || ''
}));

// Sort by score
processedTokens.sort((a, b) => b.score - a.score);

// Generate HTML
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Base Chain Memecoin Vetting - 100 Tokens</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #0a0a0f;
            color: #fff;
            padding: 20px;
        }
        .container { max-width: 1400px; margin: 0 auto; }
        header {
            text-align: center;
            padding: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 15px;
            margin-bottom: 30px;
        }
        h1 { font-size: 2.5em; margin-bottom: 10px; }
        .subtitle { opacity: 0.9; }
        .stats {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-top: 20px;
            flex-wrap: wrap;
        }
        .stat-box {
            background: rgba(255,255,255,0.2);
            padding: 15px 25px;
            border-radius: 10px;
        }
        .stat-value { font-size: 1.8em; font-weight: bold; }
        .stat-label { font-size: 0.9em; opacity: 0.8; }
        .filters {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }
        .filter-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 20px;
            background: rgba(102,126,234,0.3);
            color: #fff;
            cursor: pointer;
        }
        .filter-btn.active { background: #667eea; }
        table {
            width: 100%;
            border-collapse: collapse;
            background: #1a1a25;
            border-radius: 10px;
            overflow: hidden;
        }
        th {
            background: rgba(102,126,234,0.2);
            padding: 15px;
            text-align: left;
            font-weight: 600;
            cursor: pointer;
        }
        th:hover { background: rgba(102,126,234,0.3); }
        td {
            padding: 12px 15px;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        tr:hover { background: rgba(255,255,255,0.05); }
        .token-cell {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .token-img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
        }
        .token-info { display: flex; flex-direction: column; }
        .token-name { font-weight: 600; }
        .token-symbol { color: #888; font-size: 0.85em; }
        .score {
            padding: 5px 12px;
            border-radius: 15px;
            font-weight: bold;
            text-align: center;
        }
        .score-high { background: #28a745; }
        .score-medium { background: #ffc107; color: #000; }
        .score-low { background: #dc3545; }
        .dex-link {
            color: #667eea;
            text-decoration: none;
        }
        .dex-link:hover { text-decoration: underline; }
        .hidden { display: none; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🚀 Base Chain Memecoin Vetting Report</h1>
            <p class="subtitle">100 Tokens Analyzed | February 12, 2026</p>
            <div class="stats">
                <div class="stat-box">
                    <div class="stat-value">100</div>
                    <div class="stat-label">Tokens</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">$15M+</div>
                    <div class="stat-label">Total Mcap</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">$6M+</div>
                    <div class="stat-label">24h Volume</div>
                </div>
            </div>
        </header>

        <div class="filters">
            <button class="filter-btn active" onclick="filter('all')">All (100)</button>
            <button class="filter-btn" onclick="filter('high')">Top Picks 70+</button>
            <button class="filter-btn" onclick="filter('new')">New <7 Days</button>
            <button class="filter-btn" onclick="filter('liquid')">High Liquidity >$50K</button>
        </div>

        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Token</th>
                    <th>Score</th>
                    <th>Market Cap</th>
                    <th>24h Volume</th>
                    <th>Liquidity</th>
                    <th>Age</th>
                    <th>Image</th>
                    <th>Socials</th>
                    <th>DexScreener</th>
                </tr>
            </thead>
            <tbody id="tokenTable">
${processedTokens.map(t => `                <tr data-score="${t.score}" data-age="${t.age}" data-liquidity="${parseFloat(t.liquidity.replace(/[$KM]/g, '')) * (t.liquidity.includes('M') ? 1000000 : t.liquidity.includes('K') ? 1000 : 1)}">
                    <td>${t.rank}</td>
                    <td>
                        <div class="token-cell">
                            <img src="${t.imageUrl || 'https://via.placeholder.com/40'}" class="token-img" alt="${t.symbol}" onerror="this.src='https://via.placeholder.com/40'">
                            <div class="token-info">
                                <span class="token-name">${t.name}</span>
                                <span class="token-symbol">${t.symbol}</span>
                            </div>
                        </div>
                    </td>
                    <td><span class="score ${t.score >= 70 ? 'score-high' : t.score >= 40 ? 'score-medium' : 'score-low'}">${t.score}</span></td>
                    <td>${t.mcap}</td>
                    <td>${t.volume}</td>
                    <td>${t.liquidity}</td>
                    <td>${t.age}</td>
                    <td>${t.hasImage}</td>
                    <td>${t.socials}</td>
                    <td><a href="${t.dexUrl}" target="_blank" class="dex-link">View →</a></td>
                </tr>`).join('\n')}
            </tbody>
        </table>
    </div>

    <script>
        function filter(type) {
            const rows = document.querySelectorAll('tbody tr');
            const buttons = document.querySelectorAll('.filter-btn');
            
            buttons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            rows.forEach(row => {
                const score = parseInt(row.dataset.score);
                const age = row.dataset.age;
                const liquidity = parseFloat(row.dataset.liquidity);
                
                let show = false;
                if (type === 'all') show = true;
                else if (type === 'high' && score >= 70) show = true;
                else if (type === 'new' && (age.includes('day') && parseInt(age) < 7)) show = true;
                else if (type === 'liquid' && liquidity > 50000) show = true;
                
                row.style.display = show ? '' : 'none';
            });
        }
    </script>
</body>
</html>`;

// Write file
const outputPath = '/Users/bawsbarbie/clawd/reports/base-memecoin-vetting-list.html';
fs.writeFileSync(outputPath, html);

console.log(`✅ Created report with ${processedTokens.length} tokens`);
console.log(`📁 File: ${outputPath}`);
