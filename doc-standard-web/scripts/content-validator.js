#!/usr/bin/env node
/**
 * Content Validator for pSEO
 * Checks for duplicates, thin content, and quality issues
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Parse arguments
const args = process.argv.slice(2);
let folder = 'generated/batch2';
let threshold = 30; // 30% similarity threshold
let minWords = 1500;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--folder' && args[i + 1]) {
    folder = args[i + 1];
    i++; // Skip next arg
  }
  if (args[i] === '--threshold' && args[i + 1]) {
    threshold = parseInt(args[i + 1]);
    i++;
  }
  if (args[i] === '--minWords' && args[i + 1]) {
    minWords = parseInt(args[i + 1]);
    i++;
  }
}

const folderPath = path.join(__dirname, '../', folder);

if (!fs.existsSync(folderPath)) {
  console.error(`❌ Folder not found: ${folderPath}`);
  process.exit(1);
}

console.log(`🔍 Validating content in: ${folder}`);
console.log(`📊 Similarity threshold: ${threshold}%`);
console.log(`📝 Minimum word count: ${minWords}\n`);

// Get all files
const files = fs.readdirSync(folderPath)
  .filter(f => f.endsWith('.tsx') || f.endsWith('.md'))
  .map(f => ({
    name: f,
    path: path.join(folderPath, f),
    content: fs.readFileSync(path.join(folderPath, f), 'utf8')
  }));

console.log(`📁 Files found: ${files.length}\n`);

// Check 1: Word count
console.log('📝 Checking word counts...');
const thinPages = [];
files.forEach(file => {
  // Extract text content (rough estimate)
  const textOnly = file.content
    .replace(/\u003c[^\u003e]*>/g, ' ') // Remove HTML/JSX tags
    .replace(/[{}();]/g, ' ') // Remove code syntax
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  const wordCount = textOnly.split(/\s+/).length;
  
  if (wordCount < minWords) {
    thinPages.push({ name: file.name, words: wordCount });
  }
});

if (thinPages.length > 0) {
  console.log(`⚠️  THIN CONTENT (${thinPages.length} pages < ${minWords} words):`);
  thinPages.forEach(p => console.log(`   - ${p.name}: ${p.words} words`));
} else {
  console.log(`✅ All pages meet minimum word count (${minWords}+ words)`);
}

// Check 2: Duplicate detection (simple hash-based)
console.log('\n🔍 Checking for duplicates...');
const hashes = new Map();
const duplicates = [];

files.forEach(file => {
  // Create hash of normalized content
  const normalized = file.content
    .replace(/\s+/g, ' ')
    .replace(/[{}();]/g, '')
    .toLowerCase()
    .trim();
  
  const hash = crypto.createHash('md5').update(normalized).digest('hex');
  
  if (hashes.has(hash)) {
    duplicates.push({
      file1: hashes.get(hash),
      file2: file.name
    });
  } else {
    hashes.set(hash, file.name);
  }
});

if (duplicates.length > 0) {
  console.log(`❌ EXACT DUPLICATES FOUND (${duplicates.length} pairs):`);
  duplicates.forEach(d => console.log(`   - ${d.file1} <-> ${d.file2}`));
} else {
  console.log('✅ No exact duplicates found');
}

// Check 3: Template similarity (common content ratio)
console.log('\n📐 Checking template similarity...');
const boilerplateWarnings = [];

files.forEach(file => {
  // Extract JSX/HTML content between tags
  const contentMatches = file.content.match(/>([^\u003c]+)</g) || [];
  const textContent = contentMatches
    .map(m => m.replace(/[><]/g, '').trim())
    .filter(m => m.length > 20)
    .join(' ');
  
  // Check for common boilerplate phrases
  const boilerplatePhrases = [
    'docstandard transforms messy business documents',
    'expert document processing services',
    'clean structured system-ready files',
    'flat fee of $799'
  ];
  
  let boilerplateCount = 0;
  boilerplatePhrases.forEach(phrase => {
    if (textContent.toLowerCase().includes(phrase)) boilerplateCount++;
  });
  
  const totalPhrases = textContent.split(/[.!?]/).filter(s => s.trim().length > 20).length;
  const similarityRatio = totalPhrases > 0 ? (boilerplateCount / totalPhrases) * 100 : 0;
  
  if (similarityRatio > 60) {
    boilerplateWarnings.push({
      name: file.name,
      ratio: similarityRatio.toFixed(1)
    });
  }
});

if (boilerplateWarnings.length > 0) {
  console.log(`⚠️  HIGH TEMPLATE SIMILARITY (${boilerplateWarnings.length} pages >60% boilerplate):`);
  boilerplateWarnings.forEach(w => console.log(`   - ${w.name}: ${w.ratio}% boilerplate`));
} else {
  console.log('✅ Template similarity acceptable (<60% boilerplate)');
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 VALIDATION SUMMARY');
console.log('='.repeat(50));
console.log(`Total files checked: ${files.length}`);
console.log(`Thin content (<${minWords} words): ${thinPages.length}`);
console.log(`Exact duplicates: ${duplicates.length}`);
console.log(`High template similarity: ${boilerplateWarnings.length}`);

const hasIssues = thinPages.length > 0 || duplicates.length > 0 || boilerplateWarnings.length > 0;

if (hasIssues) {
  console.log('\n❌ VALIDATION FAILED — Fix issues before deploy');
  process.exit(1);
} else {
  console.log('\n✅ VALIDATION PASSED — All quality checks passed');
  process.exit(0);
}
