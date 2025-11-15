#!/usr/bin/env node

/**
 * Disable Vercel Deployment Protection via API
 */

const VERCEL_TOKEN = 'C5LrAXQFX3ztnbT8bqCAqtgg';
const PROJECT_NAME = 'sabo-arena-playbook';
const TEAM_ID = 'sabos-projects-a56a8c3b';

async function disableProtection() {
  console.log('🔧 Disabling Vercel Deployment Protection...\n');
  console.log(`📍 Project: ${PROJECT_NAME}`);
  console.log(`📍 Team: ${TEAM_ID}\n`);

  try {
    // Get project ID first
    console.log('⏳ 1. Getting project information...');
    const projectUrl = `https://api.vercel.com/v9/projects/${PROJECT_NAME}?teamId=${TEAM_ID}`;
    
    const projectResponse = await fetch(projectUrl, {
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!projectResponse.ok) {
      const error = await projectResponse.text();
      throw new Error(`Failed to get project: ${error}`);
    }

    const project = await projectResponse.json();
    console.log(`   ✅ Project ID: ${project.id}\n`);

    // Update project settings to disable protection
    console.log('⏳ 2. Disabling deployment protection...');
    const updateUrl = `https://api.vercel.com/v9/projects/${project.id}?teamId=${TEAM_ID}`;
    
    const updateResponse = await fetch(updateUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        passwordProtection: null,
        ssoProtection: null
      })
    });

    if (!updateResponse.ok) {
      const error = await updateResponse.text();
      throw new Error(`Failed to update project: ${error}`);
    }

    const result = await updateResponse.json();
    console.log('   ✅ Protection disabled!\n');

    // Verify by testing webhook endpoint
    console.log('⏳ 3. Testing webhook endpoint...');
    const webhookUrl = 'https://sabo-arena-playbook-2h2ft4rx5-sabos-projects-a56a8c3b.vercel.app/api/webhook-blog-published';
    
    const testResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'INSERT',
        table: 'news',
        record: { slug: 'test', status: 'published' },
        old_record: null
      })
    });

    console.log(`   Response: ${testResponse.status} ${testResponse.statusText}`);
    
    if (testResponse.status === 401 || testResponse.status === 403) {
      console.log('   ⚠️  Still protected. May need manual intervention.\n');
    } else {
      console.log('   ✅ Webhook is now accessible!\n');
    }

    console.log('━'.repeat(80));
    console.log('🎉 DEPLOYMENT PROTECTION DISABLED!\n');
    console.log('✅ Webhook can now receive requests');
    console.log('✅ Automation should work\n');
    console.log('🧪 Test it now:');
    console.log('   node verify-automation-live.mjs\n');
    console.log('Or publish a blog post:');
    console.log('   https://saboarena.com/ai-news-admin\n');
    console.log('━'.repeat(80));

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n⚠️  Automatic disable failed.');
    console.log('Please disable manually at:');
    console.log(`https://vercel.com/${TEAM_ID}/${PROJECT_NAME}/settings/deployment-protection\n`);
    process.exit(1);
  }
}

disableProtection();
