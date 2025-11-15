#!/usr/bin/env node
import 'dotenv/config';
import { readFileSync } from 'node:fs';

// Google Indexing API setup
let GOOGLE_CREDENTIALS;

// Try to get from .env.google first, then fallback to main .env
if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
  GOOGLE_CREDENTIALS = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
} else {
  // Load .env.google if not in main .env
  const { config } = await import('dotenv');
  config({ path: '.env.google' });
  GOOGLE_CREDENTIALS = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
}
const SCOPES = ['https://www.googleapis.com/auth/indexing'];

class MassIndexer {
  constructor() {
    this.accessToken = null;
    this.tokenExpires = null;
    this.requestCount = 0;
    this.successCount = 0;
    this.errorCount = 0;
  }

  async getAccessToken() {
    if (this.accessToken && this.tokenExpires > Date.now()) {
      return this.accessToken;
    }

    const { GoogleAuth } = await import('google-auth-library');
    const auth = new GoogleAuth({
      credentials: GOOGLE_CREDENTIALS,
      scopes: SCOPES,
    });

    const authClient = await auth.getClient();
    const token = await authClient.getAccessToken();
    
    this.accessToken = token.token;
    this.tokenExpires = Date.now() + (50 * 60 * 1000); // 50 minutes
    
    return this.accessToken;
  }

  async indexURL(url, type = 'URL_UPDATED') {
    try {
      const accessToken = await this.getAccessToken();
      
      const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url,
          type: type
        })
      });

      this.requestCount++;

      if (response.ok) {
        this.successCount++;
        return { success: true, url, status: response.status };
      } else {
        this.errorCount++;
        const errorText = await response.text();
        return { success: false, url, status: response.status, error: errorText };
      }
    } catch (error) {
      this.errorCount++;
      return { success: false, url, error: error.message };
    }
  }

  async massIndex(urls, batchSize = 10, delayMs = 1000) {
    console.log(`🚀 STARTING MASS INDEXING: ${urls.length} URLs`);
    console.log(`📦 Batch size: ${batchSize}, Delay: ${delayMs}ms`);
    console.log('='.repeat(60));

    const results = [];
    const batches = [];
    
    // Split into batches
    for (let i = 0; i < urls.length; i += batchSize) {
      batches.push(urls.slice(i, i + batchSize));
    }

    console.log(`📊 Processing ${batches.length} batches...\n`);

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      const batchStart = Date.now();
      
      console.log(`🔄 Batch ${i + 1}/${batches.length} (${batch.length} URLs):`);
      
      // Process batch in parallel
      const batchPromises = batch.map(url => this.indexURL(url));
      const batchResults = await Promise.all(batchPromises);
      
      results.push(...batchResults);
      
      // Print batch results
      const batchSuccess = batchResults.filter(r => r.success).length;
      const batchErrors = batchResults.filter(r => !r.success).length;
      const batchTime = Date.now() - batchStart;
      
      console.log(`   ✅ Success: ${batchSuccess}, ❌ Errors: ${batchErrors}, ⏱️ Time: ${batchTime}ms`);
      
      // Show progress
      const progress = ((i + 1) / batches.length * 100).toFixed(1);
      console.log(`   📈 Progress: ${progress}% (${this.successCount}/${urls.length} total)\n`);
      
      // Rate limiting delay (except for last batch)
      if (i < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }

    this.printFinalReport(results);
    return results;
  }

  printFinalReport(results) {
    console.log('\n🎉 MASS INDEXING COMPLETED!');
    console.log('='.repeat(60));
    console.log(`📊 Total URLs processed: ${results.length}`);
    console.log(`✅ Successful: ${this.successCount} (${(this.successCount/results.length*100).toFixed(1)}%)`);
    console.log(`❌ Errors: ${this.errorCount} (${(this.errorCount/results.length*100).toFixed(1)}%)`);
    
    // Group errors by type
    const errors = results.filter(r => !r.success);
    if (errors.length > 0) {
      console.log('\n📋 ERROR BREAKDOWN:');
      const errorTypes = {};
      errors.forEach(error => {
        const key = error.status || 'Network Error';
        errorTypes[key] = (errorTypes[key] || 0) + 1;
      });
      
      Object.entries(errorTypes).forEach(([type, count]) => {
        console.log(`   ${type}: ${count} URLs`);
      });
    }
    
    console.log('\n🎯 EXPECTED RESULTS:');
    console.log('   ⏱️ Crawling starts: Within 24 hours');
    console.log('   🔍 Indexing complete: 3-7 days');
    console.log('   📈 Search traffic: 7-14 days');
    console.log('\n💎 MASSIVE SEO BOOST INCOMING!');
  }
}

async function runMassIndexing() {
  try {
    // Read URLs from file
    const urlsText = readFileSync('./mega-index-urls.txt', 'utf-8');
    const urls = urlsText.trim().split('\n').filter(url => url.length > 0);
    
    console.log('🎯 SABO ARENA - MASS SEO INDEXING');
    console.log('='.repeat(50));
    console.log(`📋 Loaded ${urls.length} URLs from mega-index-urls.txt\n`);
    
    const indexer = new MassIndexer();
    
    // Configure based on Google API limits
    const BATCH_SIZE = 10;  // Conservative to avoid rate limits
    const DELAY_MS = 1500;  // 1.5 seconds between batches
    
    await indexer.massIndex(urls, BATCH_SIZE, DELAY_MS);
    
  } catch (error) {
    console.error('❌ Mass indexing failed:', error.message);
  }
}

// Command line interface
const command = process.argv[2];

if (command === 'test') {
  console.log('🧪 Testing with 5 URLs only...');
  const testUrls = [
    'https://saboarena.com/',
    'https://saboarena.com/rankings',
    'https://saboarena.com/live-matches',
    'https://saboarena.com/clubs',
    'https://saboarena.com/blog'
  ];
  
  const indexer = new MassIndexer();
  indexer.massIndex(testUrls, 2, 1000);
  
} else if (command === 'full') {
  console.log('🔥 FULL MASS INDEXING - ALL 310 URLs');
  runMassIndexing();
  
} else {
  console.log('🎯 SABO ARENA Mass Indexer');
  console.log('Usage:');
  console.log('  node mass-indexer.mjs test   - Test with 5 URLs');
  console.log('  node mass-indexer.mjs full   - Index all 310 URLs');
}