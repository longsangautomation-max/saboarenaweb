import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

async function createDeleteFunction() {
  const client = new Client({
    connectionString: process.env.SUPABASE_DB_TRANSACTION_URL
  });

  try {
    console.log('🔌 Connecting to Supabase database...\n');
    await client.connect();
    console.log('✅ Connected!\n');

    console.log('🔧 Creating delete function with SECURITY DEFINER...\n');
    
    const sql = `
      -- Create function to delete news (bypass RLS)
      CREATE OR REPLACE FUNCTION delete_news_article(article_id UUID)
      RETURNS void AS $$
      BEGIN
          DELETE FROM public.news WHERE id = article_id;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `;

    await client.query(sql);
    console.log('✅ Function delete_news_article created!\n');

    console.log('🔐 Granting execute permissions...\n');
    
    await client.query(`
      GRANT EXECUTE ON FUNCTION delete_news_article(UUID) TO service_role;
    `);
    console.log('✅ Granted to service_role');

    await client.query(`
      GRANT EXECUTE ON FUNCTION delete_news_article(UUID) TO authenticated;
    `);
    console.log('✅ Granted to authenticated');

    console.log('\n🎉 SUCCESS! Function created and permissions granted!');
    console.log('\n📋 Now you can delete articles from UI!');
    console.log('   The function will bypass RLS completely.');

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.end();
    console.log('\n🔌 Database connection closed.');
  }
}

createDeleteFunction();
