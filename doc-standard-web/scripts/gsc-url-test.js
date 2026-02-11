#!/usr/bin/env node
/**
 * GSC URL Test - Try different URL formats
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const KEY_PATH = path.join(__dirname, '../config/gsc-service-account.json');
const key = JSON.parse(fs.readFileSync(KEY_PATH, 'utf8'));

const auth = new google.auth.GoogleAuth({
  credentials: key,
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly']
});

const webmasters = google.webmasters({ version: 'v3', auth });

// Try different URL formats
const urlsToTry = [
  'https://docstandard.co',
  'https://docstandard.co/',
  'sc-domain:docstandard.co'
];

async function testUrls() {
  console.log('Testing different URL formats...\n');
  
  for (const url of urlsToTry) {
    try {
      console.log(`Trying: ${url}`);
      const response = await webmasters.sites.get({ siteUrl: url });
      console.log('✅ SUCCESS!', JSON.stringify(response.data, null, 2));
      return;
    } catch (err) {
      console.log(`❌ Failed: ${err.message}\n`);
    }
  }
  
  console.log('All URL formats failed. Checking site list...');
  try {
    const sites = await webmasters.sites.list();
    console.log('Available sites:', JSON.stringify(sites.data, null, 2));
  } catch (err) {
    console.log('Could not list sites:', err.message);
  }
}

testUrls();
