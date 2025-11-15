@echo off
REM ========================================
REM SABO ARENA - DAILY SEO AUTOMATION
REM ========================================
REM 
REM This batch file runs daily SEO monitoring
REM Schedule with Windows Task Scheduler:
REM   - Time: 9:00 AM every day
REM   - Action: Start a program
REM   - Program: This batch file
REM ========================================

echo ==========================================
echo SABO ARENA - DAILY SEO AUTOMATION
echo ==========================================
echo.
echo Started: %date% %time%
echo.

cd /d "D:\sabo-arena-playbook"

REM 1. Check URL Status
echo [1/5] Checking URL status...
node url-status-checker.mjs >> logs\seo-daily-%date:~-4,4%%date:~-10,2%%date:~-7,2%.log 2>&1

REM 2. Monitor SEO Dashboard
echo [2/5] Generating SEO dashboard...
node seo-monitoring-dashboard.mjs >> logs\seo-daily-%date:~-4,4%%date:~-10,2%%date:~-7,2%.log 2>&1

REM 3. Check Search Console Status
echo [3/5] Checking Google Search Console...
node check-search-console-status.mjs >> logs\seo-daily-%date:~-4,4%%date:~-10,2%%date:~-7,2%.log 2>&1

REM 4. Advanced SEO Monitor (Daily)
echo [4/5] Running advanced SEO monitor...
node advanced-seo-monitor.mjs daily >> logs\seo-daily-%date:~-4,4%%date:~-10,2%%date:~-7,2%.log 2>&1

REM 5. Auto-index new posts
echo [5/5] Auto-indexing new posts...
node auto-index-new-posts.mjs >> logs\seo-daily-%date:~-4,4%%date:~-10,2%%date:~-7,2%.log 2>&1

echo.
echo ==========================================
echo COMPLETED: %date% %time%
echo ==========================================
echo.
echo Log saved to: logs\seo-daily-%date:~-4,4%%date:~-10,2%%date:~-7,2%.log
echo.

REM Keep window open for 5 seconds
timeout /t 5

exit
