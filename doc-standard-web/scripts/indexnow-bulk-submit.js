#!/usr/bin/env node
/**
 * Bulk IndexNow Submission Script
 * Submits all URLs from sitemaps to IndexNow
 */

const fs = require('fs')
const path = require('path')

const INDEXNOW_KEY = "328930295657049f4ad8b19fa783c3f3"
const HOST = "docstandard.co"
const ENDPOINT = "https://api.indexnow.org/IndexNow"
const BATCH_SIZE = 500

async function submitBatch(urls, batchNum, totalBatches) {
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urls
  }

  console.log(`📤 Submitting batch ${batchNum}/${totalBatches} (${urls.length} URLs)...`)

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })

    if (response.status === 200) {
      console.log(`✅ Batch ${batchNum}: Success!`)
      return true
    } else if (response.status === 202) {
      console.log(`✅ Batch ${batchNum}: Accepted!`)
      return true
    } else {
      const text = await response.text()
      console.error(`❌ Batch ${batchNum}: Error ${response.status} - ${text}`)
      return false
    }
  } catch (error) {
    console.error(`❌ Batch ${batchNum}: Network error - ${error.message}`)
    return false
  }
}

async function main() {
  // Read URLs from file
  const urlsFile = process.argv[2] || '/tmp/all-urls.txt'
  
  if (!fs.existsSync(urlsFile)) {
    console.error(`❌ File not found: ${urlsFile}`)
    process.exit(1)
  }

  const urls = fs.readFileSync(urlsFile, 'utf-8')
    .split('\n')
    .map(url => url.trim())
    .filter(url => url.length > 0)

  console.log(`📊 Found ${urls.length} URLs to submit\n`)

  // Split into batches
  const batches = []
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    batches.push(urls.slice(i, i + BATCH_SIZE))
  }

  const totalBatches = batches.length
  console.log(`🔄 Split into ${totalBatches} batches of max ${BATCH_SIZE} URLs\n`)

  // Submit each batch
  let successCount = 0
  let failCount = 0

  for (let i = 0; i < batches.length; i++) {
    const success = await submitBatch(batches[i], i + 1, totalBatches)
    if (success) {
      successCount++
    } else {
      failCount++
    }
    
    // Small delay between batches to be nice to the API
    if (i < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  console.log(`\n📈 Results:`)
  console.log(`   ✅ Successful: ${successCount}/${totalBatches} batches`)
  console.log(`   ❌ Failed: ${failCount}/${totalBatches} batches`)
  console.log(`   📊 Total URLs: ${urls.length}`)
  console.log(`\n⏳ Bing will process these URLs within minutes.`)
  console.log(`📊 Check Bing Webmaster Tools for indexing status.`)
}

main()
