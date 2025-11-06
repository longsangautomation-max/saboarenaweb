import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const { Client } = pg;

async function createTable() {
  const client = new Client({
    connectionString: process.env.SUPABASE_DB_TRANSACTION_URL
  });

  try {
    console.log('🔌 Connecting to database...\n');
    await client.connect();
    console.log('✅ Connected!\n');

    const sql = fs.readFileSync('uploaded_images_schema.sql', 'utf8');
    
    console.log('🔧 Creating uploaded_images table...\n');
    await client.query(sql);
    
    console.log('✅ Table created successfully!');
    console.log('✅ RLS policies added!');
    console.log('✅ Delete function created!\n');

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.end();
    console.log('🔌 Connection closed.');
  }
}

createTable();
