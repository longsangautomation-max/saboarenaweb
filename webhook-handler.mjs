#!/usr/bin/env node

/**
 * ====================================
 * 🔗 WEBHOOK HANDLER
 * ====================================
 * 
 * Express endpoint để nhận webhook từ Supabase
 * Khi publish blog post mới → Trigger automation
 * 
 * Deploy: Vercel Serverless Function hoặc local server
 */

import express from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const execAsync = promisify(exec);
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

/**
 * Webhook endpoint
 * POST /webhook/blog-published
 */
app.post('/webhook/blog-published', async (req, res) => {
  console.log('📨 Received webhook:', new Date().toISOString());
  
  const { type, table, record, old_record } = req.body;
  
  // Validate webhook
  if (table !== 'news') {
    return res.status(400).json({ error: 'Invalid table' });
  }

  // Check if article is published
  if (record.status !== 'published') {
    console.log('   ⏸️  Article not published, skipping automation');
    return res.json({ message: 'Article not published, no action taken' });
  }

  // Check if this is a new publish (not an update)
  const isNewPublish = !old_record || old_record.status !== 'published';
  
  if (!isNewPublish) {
    console.log('   ℹ️  Article already published, regenerating sitemap only');
  }

  const slug = record.slug;
  console.log(`   📝 Article slug: ${slug}`);
  console.log(`   🤖 Running automation...`);

  try {
    // Run automation script
    const command = isNewPublish 
      ? `node auto-index-new-posts.mjs ${slug}`
      : `node auto-index-new-posts.mjs`;
    
    const { stdout, stderr } = await execAsync(command, {
      cwd: __dirname
    });

    console.log(stdout);
    if (stderr) console.error(stderr);

    res.json({
      success: true,
      message: isNewPublish 
        ? `Automation completed for ${slug}` 
        : 'Sitemap regenerated',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Automation error:', error.message);
    res.status(500).json({
      error: 'Automation failed',
      message: error.message
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * Test endpoint
 */
app.post('/test', async (req, res) => {
  console.log('🧪 Test automation triggered');
  
  try {
    const { stdout } = await execAsync('node auto-index-new-posts.mjs');
    res.json({ success: true, output: stdout });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const server = app.listen(PORT, () => {
  console.log(`\n🔗 Webhook handler running on http://localhost:${PORT}`);
  console.log(`   POST /webhook/blog-published - Main webhook`);
  console.log(`   GET  /health - Health check`);
  console.log(`   POST /test - Test automation\n`);
}).on('error', (err) => {
  console.error('❌ Server error:', err.message);
  if (err.code === 'EADDRINUSE') {
    console.error(`   Port ${PORT} is already in use. Kill the process or use a different port.`);
  }
  process.exit(1);
});

// Keep process alive
process.on('SIGTERM', () => {
  console.log('\n⏸️  Received SIGTERM, closing server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n⏸️  Received SIGINT, closing server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
