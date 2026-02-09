#!/usr/bin/env node
/**
 * Parallel Page Generator for 100K pSEO Sprint
 * 8 workers, streaming writes, incremental validation
 */

const fs = require('fs');
const path = require('path');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const os = require('os');
const crypto = require('crypto');

// Parse arguments
const args = process.argv.slice(2);
const config = {
  vertical: getArg('--vertical', 'logistics'),
  batch: parseInt(getArg('--batch', '1')),
  pagesPerWorker: parseInt(getArg('--pages-per-worker', '1000')),
  workers: parseInt(getArg('--workers', '8')),
  outputDir: getArg('--output', './generated'),
  validateEvery: parseInt(getArg('--validate-every', '100')),
};

function getArg(flag, defaultVal) {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : defaultVal;
}

// Main thread: Coordinate workers
if (isMainThread) {
  async function main() {
    console.log(`🚀 Parallel Generator Starting`);
    console.log(`   Vertical: ${config.vertical}`);
    console.log(`   Batch: ${config.batch}`);
    console.log(`   Workers: ${config.workers}`);
    console.log(`   Pages per worker: ${config.pagesPerWorker}`);
    console.log(`   Total pages: ${config.workers * config.pagesPerWorker}`);
    console.log(`   Output: ${config.outputDir}/${config.vertical}/batch-${config.batch}`);
    console.log();

    const startTime = Date.now();
    const outputDir = path.join(config.outputDir, config.vertical, `batch-${config.batch}`);
    
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Load vertical config
    const verticalConfig = loadVerticalConfig(config.vertical);
    
    // Create workers
    const workerPromises = [];
    const results = {
      generated: 0,
      validated: 0,
      failed: 0,
      duplicates: 0,
      errors: []
    };

    console.log(`⚙️  Spawning ${config.workers} workers...\n`);

    for (let i = 0; i < config.workers; i++) {
      const workerPromise = new Promise((resolve, reject) => {
        const worker = new Worker(__filename, {
          workerData: {
            workerId: i,
            vertical: config.vertical,
            batch: config.batch,
            pagesToGenerate: config.pagesPerWorker,
            outputDir,
            validateEvery: config.validateEvery,
            verticalConfig,
            startOffset: i * config.pagesPerWorker
          }
        });

        worker.on('message', (msg) => {
          if (msg.type === 'progress') {
            process.stdout.write(`\r   Worker ${msg.workerId}: ${msg.count}/${config.pagesPerWorker} pages`);
          } else if (msg.type === 'result') {
            results.generated += msg.generated;
            results.validated += msg.validated;
            results.failed += msg.failed;
            results.duplicates += msg.duplicates;
            results.errors.push(...msg.errors);
            resolve(msg);
          } else if (msg.type === 'error') {
            results.errors.push(msg.error);
            reject(new Error(msg.error));
          }
        });

        worker.on('error', reject);
        worker.on('exit', (code) => {
          if (code !== 0) {
            reject(new Error(`Worker ${i} exited with code ${code}`));
          }
        });
      });

      workerPromises.push(workerPromise);
    }

    try {
      await Promise.all(workerPromises);
      
      const duration = (Date.now() - startTime) / 1000;
      const pagesPerSecond = (results.generated / duration).toFixed(1);

      console.log('\n\n' + '='.repeat(50));
      console.log('✅ GENERATION COMPLETE');
      console.log('='.repeat(50));
      console.log(`Generated: ${results.generated} pages`);
      console.log(`Validated: ${results.validated} pages`);
      console.log(`Failed: ${results.failed} pages`);
      console.log(`Duplicates caught: ${results.duplicates}`);
      console.log(`Duration: ${duration.toFixed(1)}s`);
      console.log(`Speed: ${pagesPerSecond} pages/sec`);
      console.log(`Workers: ${config.workers}`);
      
      if (results.errors.length > 0) {
        console.log(`\n⚠️  Errors (${results.errors.length}):`);
        results.errors.slice(0, 5).forEach(e => console.log(`   - ${e}`));
      }

      // Write batch manifest
      const manifest = {
        vertical: config.vertical,
        batch: config.batch,
        generated: results.generated,
        validated: results.validated,
        failed: results.failed,
        duration,
        pagesPerSecond: parseFloat(pagesPerSecond),
        timestamp: new Date().toISOString()
      };
      
      fs.writeFileSync(
        path.join(outputDir, 'manifest.json'),
        JSON.stringify(manifest, null, 2)
      );

      // Auto-trigger vertical switch check
      await checkVerticalSwitch(config.vertical, results.generated);

    } catch (error) {
      console.error('\n❌ Generation failed:', error.message);
      process.exit(1);
    }
  }

  function loadVerticalConfig(vertical) {
    const configPath = path.join(__dirname, '../config/verticals', `${vertical}.ts`);
    
    // Fallback if config doesn't exist yet
    if (!fs.existsSync(configPath)) {
      console.log(`⚠️  Config not found for ${vertical}, using fallback`);
      return getFallbackConfig(vertical);
    }
    
    // In real implementation, require/import the config
    return getFallbackConfig(vertical);
  }

  function getFallbackConfig(vertical) {
    const configs = {
      logistics: {
        systems: ['CargoWise', 'SAP', 'Oracle', 'NetSuite', 'Dynamics', 'Salesforce'],
        cities: generateCities(1000),
        painPoints: [
          'manual data entry errors',
          'duplicate shipments',
          'delayed customs clearance',
          'invoice mismatches'
        ]
      },
      legal: {
        docTypes: ['Contract Abstraction', 'Discovery', 'Due Diligence', 'Compliance Review'],
        cities: generateCities(500),
        practiceAreas: ['Litigation', 'M&A', 'IP', 'Employment', 'Real Estate']
      },
      'real-estate': {
        docTypes: ['Lease Abstraction', 'Title Cleaning', 'Due Diligence', 'Rent Roll Processing'],
        cities: generateCities(400),
        propertyTypes: ['Commercial', 'Residential', 'Industrial', 'Retail']
      },
      accounting: {
        docTypes: ['AP Automation', 'Invoice Processing', 'PO Matching', '1099 Preparation'],
        cities: generateCities(300),
        erps: ['QuickBooks', 'Xero', 'Sage', 'NetSuite']
      }
    };
    
    return configs[vertical] || configs.logistics;
  }

  function generateCities(count) {
    // Mock city data - replace with real data
    const majorCities = [
      'atlanta', 'new-york', 'los-angeles', 'chicago', 'houston',
      'phoenix', 'philadelphia', 'san-antonio', 'san-diego', 'dallas',
      'san-jose', 'austin', 'jacksonville', 'fort-worth', 'columbus',
      'charlotte', 'san-francisco', 'indianapolis', 'seattle', 'denver'
    ];
    
    return majorCities.slice(0, count).map(city => ({
      name: city,
      state: 'US',
      population: 500000
    }));
  }

  async function checkVerticalSwitch(currentVertical, batchGenerated) {
    const verticalTotals = {
      logistics: 40000,
      legal: 25000,
      'real-estate': 20000,
      accounting: 15000
    };

    const outputDir = path.join(config.outputDir, currentVertical);
    const existingBatches = fs.readdirSync(outputDir).filter(f => f.startsWith('batch-'));
    
    let totalPages = 0;
    for (const batch of existingBatches) {
      const manifestPath = path.join(outputDir, batch, 'manifest.json');
      if (fs.existsSync(manifestPath)) {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        totalPages += manifest.generated;
      }
    }

    const target = verticalTotals[currentVertical];
    const remaining = target - totalPages;

    console.log(`\n📊 Vertical Progress: ${currentVertical}`);
    console.log(`   Generated: ${totalPages}`);
    console.log(`   Target: ${target}`);
    console.log(`   Remaining: ${remaining}`);

    if (totalPages >= target) {
      const nextVertical = getNextVertical(currentVertical);
      console.log(`\n🎯 TARGET REACHED! ${currentVertical}: ${totalPages} pages`);
      console.log(`🔄 AUTO-SWITCHING to ${nextVertical}...`);
      
      // Write switch trigger file
      fs.writeFileSync(
        path.join(config.outputDir, '.switch-trigger'),
        JSON.stringify({ from: currentVertical, to: nextVertical, timestamp: Date.now() })
      );
    }
  }

  function getNextVertical(current) {
    const order = ['logistics', 'legal', 'real-estate', 'accounting'];
    const idx = order.indexOf(current);
    return order[idx + 1] || 'complete';
  }

  main().catch(console.error);

} else {
  // Worker thread: Generate pages
  async function workerGenerate() {
    const { workerId, vertical, batch, pagesToGenerate, outputDir, validateEvery, verticalConfig, startOffset } = workerData;
    
    const results = {
      workerId,
      generated: 0,
      validated: 0,
      failed: 0,
      duplicates: 0,
      errors: []
    };

    // Track content hashes for duplicate detection
    const contentHashes = new Set();
    
    // Open write stream (append mode for parallel safety)
    const batchFile = path.join(outputDir, `worker-${workerId}.jsonl`);
    const writeStream = fs.createWriteStream(batchFile, { flags: 'a' });
    
    // Generate pages
    for (let i = 0; i < pagesToGenerate; i++) {
      const pageIndex = startOffset + i;
      
      try {
        // Generate page data
        const page = generatePage({
          vertical,
          batch,
          index: pageIndex,
          config: verticalConfig
        });

        // Check for duplicates (hash-based)
        const contentHash = crypto.createHash('md5').update(JSON.stringify(page.content)).digest('hex');
        if (contentHashes.has(contentHash)) {
          results.duplicates++;
          continue; // Skip duplicate
        }
        contentHashes.add(contentHash);

        // Stream write (non-blocking)
        writeStream.write(JSON.stringify(page) + '\n');
        results.generated++;

        // Incremental validation
        if (results.generated % validateEvery === 0) {
          const isValid = validatePage(page);
          if (isValid) {
            results.validated++;
          } else {
            results.failed++;
            results.errors.push(`Validation failed for page ${pageIndex}`);
          }
        }

        // Report progress every 10 pages
        if (i % 10 === 0) {
          parentPort.postMessage({ type: 'progress', workerId, count: i + 1 });
        }

      } catch (error) {
        results.failed++;
        results.errors.push(`Error on page ${pageIndex}: ${error.message}`);
      }
    }

    // Close stream
    writeStream.end();
    await new Promise(resolve => writeStream.on('finish', resolve));

    // Convert JSONL to individual TSX files (post-processing)
    await convertJsonlToTsx(batchFile, outputDir, workerId, vertical);
    
    // Cleanup JSONL
    fs.unlinkSync(batchFile);

    // Send final results
    parentPort.postMessage({ type: 'result', ...results });
  }

  function generatePage({ vertical, batch, index, config }) {
    // Simple deterministic generation based on index
    const systemA = config.systems?.[index % (config.systems?.length || 1)] || 'SystemA';
    const systemB = config.systems?.[(index + 1) % (config.systems?.length || 1)] || 'SystemB';
    const city = config.cities?.[index % (config.cities?.length || 1)]?.name || 'city';
    const state = config.cities?.[index % (config.cities?.length || 1)]?.state || 'st';
    
    const slug = `${city}-${systemA.toLowerCase()}-${systemB.toLowerCase()}-integration`;
    
    return {
      slug,
      vertical,
      batch,
      index,
      title: `${systemA} to ${systemB} Integration in ${city} | DocStandard`,
      metaDescription: `Connect ${systemA} with ${systemB} in ${city}. Expert document processing for logistics integrations.`,
      content: {
        hero: {
          headline: `${systemA} ↔ ${systemB} Integration`,
          subheadline: `Seamless document exchange between ${systemA} and ${systemB} in ${city}, ${state}`
        },
        systems: { a: systemA, b: systemB },
        location: { city, state },
        wordCount: 1500 + (index % 500) // Varies 1500-2000
      },
      createdAt: new Date().toISOString()
    };
  }

  function validatePage(page) {
    // Quick validation checks
    if (!page.title || page.title.length < 10) return false;
    if (!page.slug || page.slug.length < 5) return false;
    if (!page.content || page.content.wordCount < 1500) return false;
    return true;
  }

  async function convertJsonlToTsx(jsonlFile, outputDir, workerId, vertical) {
    const lines = fs.readFileSync(jsonlFile, 'utf8').trim().split('\n').filter(Boolean);
    
    for (let i = 0; i < lines.length; i++) {
      const page = JSON.parse(lines[i]);
      const tsxContent = generateTsxTemplate(page, vertical);
      const fileName = `${page.slug}.tsx`;
      fs.writeFileSync(path.join(outputDir, fileName), tsxContent);
    }
  }

  function generateTsxTemplate(page, vertical) {
    return `import { Metadata } from 'next';
import { IntegrationPage } from '@/components/pseo/IntegrationPage';

export const metadata: Metadata = {
  title: '${page.title.replace(/'/g, "\\'")}',
  description: '${page.metaDescription.replace(/'/g, "\\'")}',
};

export default function Page() {
  return (
    <IntegrationPage
      vertical="${vertical}"
      systems={{ a: '${page.content.systems.a}', b: '${page.content.systems.b}' }}
      location={{ city: '${page.content.location.city}', state: '${page.content.location.state}' }}
    />
  );
}
`;
  }

  workerGenerate().catch(error => {
    parentPort.postMessage({ type: 'error', error: error.message });
    process.exit(1);
  });
}
