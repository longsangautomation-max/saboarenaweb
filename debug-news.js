/**
 * Debug News Component
 * Thêm vào console để xem data từ API
 */

// Open browser console (F12) và paste đoạn code này:

console.log('🔍 Debugging News Component...');

// Check if news articles exist in database
fetch('https://mogjjvscxjwvhtpkrlqr.supabase.co/rest/v1/news?select=*&status=eq.published&order=published_at.desc&limit=6', {
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MTk1ODAsImV4cCI6MjA3MzQ5NTU4MH0.u1urXd3uiT0fuqWlJ1Nhp7uJhgdiyOdLSdSWJWczHoQ',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5MTk1ODAsImV4cCI6MjA3MzQ5NTU4MH0.u1urXd3uiT0fuqWlJ1Nhp7uJhgdiyOdLSdSWJWczHoQ'
  }
})
.then(res => res.json())
.then(data => {
  console.log(`✅ Found ${data.length} published news articles:`);
  data.forEach((article, i) => {
    console.log(`${i + 1}. ${article.title}`);
    console.log(`   Status: ${article.status}, Published: ${article.published_at}`);
  });
  
  if (data.length === 0) {
    console.warn('⚠️ No published news found! Check:');
    console.warn('   1. Articles have status="published"');
    console.warn('   2. Articles have published_at timestamp');
  }
})
.catch(err => {
  console.error('❌ Error fetching news:', err);
});
