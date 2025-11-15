#!/usr/bin/env node

/**
 * Setup Vercel Environment Variables
 * Automatically configure all required environment variables for webhook
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const VERCEL_TOKEN = 'C5LrAXQFX3ztnbT8bqCAqtgg';

// Read environment files
const envPath = join(__dirname, '.env');
const envGooglePath = join(__dirname, '.env.google');

const envContent = readFileSync(envPath, 'utf-8');
const envGoogleContent = readFileSync(envGooglePath, 'utf-8');

// Parse environment variables
function parseEnv(content) {
  const vars = {};
  const lines = content.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const match = trimmed.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        let value = match[2].trim();
        
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        
        vars[key] = value;
      }
    }
  }
  
  return vars;
}

const env = parseEnv(envContent);
const envGoogle = parseEnv(envGoogleContent);

// Required variables for webhook
const requiredVars = {
  'VITE_SUPABASE_URL': env.VITE_SUPABASE_URL,
  'VITE_SUPABASE_ANON_KEY': env.VITE_SUPABASE_ANON_KEY,
  'GOOGLE_SERVICE_ACCOUNT_JSON': envGoogle.GOOGLE_SERVICE_ACCOUNT_JSON
};

console.log('🔧 Setting up Vercel environment variables...\n');

let successCount = 0;
let errorCount = 0;

for (const [key, value] of Object.entries(requiredVars)) {
  if (!value) {
    console.log(`❌ ${key}: Not found in .env files`);
    errorCount++;
    continue;
  }
  
  try {
    console.log(`⏳ Adding ${key}...`);
    
    // Use echo to pipe value to vercel env add
    const command = process.platform === 'win32'
      ? `echo ${value} | npx vercel env add ${key} production --token ${VERCEL_TOKEN}`
      : `echo "${value}" | npx vercel env add ${key} production --token ${VERCEL_TOKEN}`;
    
    execSync(command, {
      stdio: ['pipe', 'pipe', 'pipe'],
      encoding: 'utf-8'
    });
    
    console.log(`✅ ${key}: Added successfully\n`);
    successCount++;
  } catch (error) {
    // Check if already exists
    if (error.message.includes('already exists') || error.stderr?.includes('already exists')) {
      console.log(`ℹ️  ${key}: Already exists (skipping)\n`);
      successCount++;
    } else {
      console.log(`❌ ${key}: Failed to add`);
      console.log(`   Error: ${error.message}\n`);
      errorCount++;
    }
  }
}

console.log('\n' + '='.repeat(50));
console.log(`✅ Success: ${successCount}/${Object.keys(requiredVars).length}`);
console.log(`❌ Errors: ${errorCount}`);
console.log('='.repeat(50));

if (errorCount === 0) {
  console.log('\n🎉 All environment variables configured!');
  console.log('Next step: Deploy to Vercel with `npx vercel --prod --token ${VERCEL_TOKEN}`');
} else {
  console.log('\n⚠️  Some variables failed to add. Please check errors above.');
  process.exit(1);
}
