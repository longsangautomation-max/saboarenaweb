# SABO Arena - Daily SEO Automation (PowerShell Version)
# ========================================
# Run this with: powershell -ExecutionPolicy Bypass -File daily-seo-automation.ps1
# ========================================

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "SABO ARENA - DAILY SEO AUTOMATION" -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Started: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Green
Write-Host ""

# Change to project directory
Set-Location "D:\sabo-arena-playbook"

# Create logs directory if not exists
if (-not (Test-Path "logs")) {
    New-Item -ItemType Directory -Path "logs" | Out-Null
}

$logFile = "logs\seo-daily-$(Get-Date -Format 'yyyyMMdd').log"

# Function to run command and log
function Run-SEOTask {
    param(
        [string]$TaskName,
        [string]$Command
    )
    
    Write-Host "[$TaskName] Starting..." -ForegroundColor Yellow
    $output = & node $Command 2>&1
    $output | Out-File -Append -FilePath $logFile
    Write-Host "[$TaskName] Completed ✓" -ForegroundColor Green
    Write-Host ""
}

# 1. Check URL Status
Run-SEOTask "1/5 URL Status" "url-status-checker.mjs"

# 2. SEO Dashboard
Run-SEOTask "2/5 SEO Dashboard" "seo-monitoring-dashboard.mjs"

# 3. Google Search Console
Run-SEOTask "3/5 Search Console" "check-search-console-status.mjs"

# 4. Advanced Monitor
Run-SEOTask "4/5 Advanced Monitor" "advanced-seo-monitor.mjs daily"

# 5. Auto-index
Run-SEOTask "5/5 Auto Index" "auto-index-new-posts.mjs"

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "COMPLETED: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Log saved to: $logFile" -ForegroundColor Yellow
Write-Host ""

# Optional: Send summary email or notification here
# Example: Send-MailMessage -To "admin@saboarena.com" -Subject "SEO Daily Report" -Body "Check $logFile"

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
