# SABO Arena - Setup Windows Task Scheduler for Daily SEO Automation
# ========================================
# Run this script as Administrator to setup automated daily SEO monitoring
# ========================================

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "SETUP WINDOWS TASK SCHEDULER" -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "ERROR: This script must be run as Administrator!" -ForegroundColor Red
    Write-Host "Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

# Task details
$taskName = "SABO Arena Daily SEO Monitor"
$scriptPath = "D:\sabo-arena-playbook\daily-seo-automation.ps1"
$triggerTime = "09:00:00"  # 9 AM every day

Write-Host "Creating scheduled task..." -ForegroundColor Yellow
Write-Host "  Task Name: $taskName" -ForegroundColor Gray
Write-Host "  Script: $scriptPath" -ForegroundColor Gray
Write-Host "  Schedule: Daily at $triggerTime" -ForegroundColor Gray
Write-Host ""

# Create the action
$action = New-ScheduledTaskAction -Execute "powershell.exe" `
    -Argument "-ExecutionPolicy Bypass -WindowStyle Hidden -File `"$scriptPath`""

# Create the trigger (daily at 9 AM)
$trigger = New-ScheduledTaskTrigger -Daily -At $triggerTime

# Create the principal (run whether user is logged on or not)
$principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" -LogonType ServiceAccount -RunLevel Highest

# Create the settings
$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -RunOnlyIfNetworkAvailable `
    -MultipleInstances IgnoreNew

# Register the task
try {
    # Remove existing task if it exists
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue
    
    # Register new task
    Register-ScheduledTask `
        -TaskName $taskName `
        -Action $action `
        -Trigger $trigger `
        -Principal $principal `
        -Settings $settings `
        -Description "Automated daily SEO monitoring for SABO Arena - checks indexing status, generates reports, and monitors rankings" | Out-Null
    
    Write-Host "✓ Task created successfully!" -ForegroundColor Green
    Write-Host ""
    
    # Show task info
    Write-Host "Task Information:" -ForegroundColor Cyan
    Write-Host "  - Name: $taskName" -ForegroundColor White
    Write-Host "  - Next Run: $(Get-Date -Hour 9 -Minute 0 -Second 0 -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor White
    Write-Host "  - Frequency: Daily at 9:00 AM" -ForegroundColor White
    Write-Host ""
    
    Write-Host "To manage this task:" -ForegroundColor Yellow
    Write-Host "  1. Open Task Scheduler (taskschd.msc)" -ForegroundColor Gray
    Write-Host "  2. Look for '$taskName'" -ForegroundColor Gray
    Write-Host "  3. Right-click to Run, Disable, or Delete" -ForegroundColor Gray
    Write-Host ""
    
    # Ask if user wants to run the task now
    Write-Host "Would you like to run the task now to test? (Y/N): " -ForegroundColor Yellow -NoNewline
    $runNow = Read-Host
    
    if ($runNow -eq 'Y' -or $runNow -eq 'y') {
        Write-Host "Running task..." -ForegroundColor Yellow
        Start-ScheduledTask -TaskName $taskName
        Write-Host "✓ Task started!" -ForegroundColor Green
        Write-Host "Check logs\seo-daily-$(Get-Date -Format 'yyyyMMdd').log for output" -ForegroundColor Gray
    }
    
} catch {
    Write-Host "ERROR: Failed to create scheduled task!" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
