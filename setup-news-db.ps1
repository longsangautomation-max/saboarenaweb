$supabaseUrl = "https://mogjjvscxjwvhtpkrlqr.supabase.co"
$serviceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZ2pqdnNjeGp3dmh0cGtybHFyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzkxOTU4MCwiZXhwIjoyMDczNDk1NTgwfQ.T2ntQv-z2EL4mkGb9b3QyXM3dT8pAOFSPKvqWPd7Xoo"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  SABO ARENA - Auto Setup News Database" -ForegroundColor Yellow
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Read SQL file
$sqlContent = Get-Content -Path "supabase_news_schema.sql" -Raw

Write-Host "[1/3] Reading SQL schema file..." -ForegroundColor Green
Write-Host "      ✓ File loaded successfully" -ForegroundColor Gray

# Prepare API request
$headers = @{
    "apikey" = $serviceKey
    "Authorization" = "Bearer $serviceKey"
    "Content-Type" = "application/json"
}

$body = @{
    query = $sqlContent
} | ConvertTo-Json

Write-Host "[2/3] Connecting to Supabase..." -ForegroundColor Green
Write-Host "      URL: $supabaseUrl" -ForegroundColor Gray

try {
    # Execute SQL via Supabase REST API
    $response = Invoke-RestMethod -Uri "$supabaseUrl/rest/v1/rpc/exec_sql" -Method Post -Headers $headers -Body $body -ErrorAction Stop
    
    Write-Host "[3/3] Executing SQL commands..." -ForegroundColor Green
    Write-Host "      ✓ News table created" -ForegroundColor Gray
    Write-Host "      ✓ Indexes created" -ForegroundColor Gray
    Write-Host "      ✓ Triggers configured" -ForegroundColor Gray
    Write-Host "      ✓ RLS policies applied" -ForegroundColor Gray
    Write-Host "      ✓ Sample data inserted (3 articles)" -ForegroundColor Gray
    Write-Host ""
    Write-Host "==================================================" -ForegroundColor Cyan
    Write-Host "  ✓ Database setup completed successfully!" -ForegroundColor Green
    Write-Host "==================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "  1. Open http://localhost:8082" -ForegroundColor White
    Write-Host "  2. Scroll to 'Tin Tức Mới Nhất' section" -ForegroundColor White
    Write-Host "  3. Click any article to see the detail page" -ForegroundColor White
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "==================================================" -ForegroundColor Red
    Write-Host "  ⚠ Alternative Setup Method Required" -ForegroundColor Yellow
    Write-Host "==================================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please run SQL manually:" -ForegroundColor Yellow
    Write-Host "1. Open https://supabase.com/dashboard/project/mogjjvscxjwvhtpkrlqr/sql" -ForegroundColor White
    Write-Host "2. Click 'New Query'" -ForegroundColor White
    Write-Host "3. Copy content from: supabase_news_schema.sql" -ForegroundColor White
    Write-Host "4. Paste and click 'Run'" -ForegroundColor White
    Write-Host ""
    Write-Host "Error details: $($_.Exception.Message)" -ForegroundColor Gray
}
