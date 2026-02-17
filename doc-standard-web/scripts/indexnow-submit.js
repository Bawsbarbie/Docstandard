#!/usr/bin/env node
/**
 * IndexNow URL Submission Script
 * Usage: node indexnow-submit.js <url1> [url2] [url3] ...
 * 
 * Example:
 *   node indexnow-submit.js https://docstandard.co/new-page
 *   node indexnow-submit.js https://docstandard.co/page-1 https://docstandard.co/page-2
 */

const INDEXNOW_KEY = "328930295657049f4ad8b19fa783c3f3"
const HOST = "docstandard.co"
const ENDPOINT = "https://api.indexnow.org/IndexNow"

async function submitUrls(urls) {
  if (!urls || urls.length === 0) {
    console.error("❌ Error: No URLs provided")
    console.log("Usage: node indexnow-submit.js <url1> [url2] [url3] ...")
    process.exit(1)
  }

  // Validate URLs
  const validUrls = urls.filter(url => {
    try {
      const parsed = new URL(url)
      return parsed.hostname === HOST || parsed.hostname === `www.${HOST}`
    } catch {
      return false
    }
  })

  if (validUrls.length === 0) {
    console.error(`❌ Error: No valid URLs for ${HOST}`)
    process.exit(1)
  }

  if (validUrls.length !== urls.length) {
    console.warn(`⚠️  Warning: ${urls.length - validUrls.length} invalid URLs skipped`)
  }

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: validUrls
  }

  console.log(`📤 Submitting ${validUrls.length} URL(s) to IndexNow...`)
  console.log("URLs:")
  validUrls.forEach(url => console.log(`  - ${url}`))
  console.log("")

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })

    if (response.status === 200) {
      console.log("✅ Success! URLs submitted and will be indexed within minutes.")
      console.log("📊 Check Bing Webmaster Tools for indexing status.")
    } else if (response.status === 202) {
      console.log("✅ Accepted! URLs are being processed.")
    } else if (response.status === 403) {
      console.error("❌ Error: Invalid key. Check that the key file is accessible.")
      console.log(`   Key file: https://${HOST}/${INDEXNOW_KEY}.txt`)
    } else if (response.status === 422) {
      console.error("❌ Error: Invalid URL format.")
    } else {
      const text = await response.text()
      console.error(`❌ Error ${response.status}: ${text}`)
    }
  } catch (error) {
    console.error("❌ Network error:", error.message)
    process.exit(1)
  }
}

// Get URLs from command line arguments
const urls = process.argv.slice(2)
submitUrls(urls)
