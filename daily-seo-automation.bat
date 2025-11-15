@echo off
title SABO Arena Daily SEO Monitoring

echo Starting daily SEO monitoring...
node enhanced-daily-monitor.mjs

echo.
echo Checking URL status...
node url-status-checker.mjs

echo.
echo Running weekly analysis...
node advanced-seo-monitor.mjs weekly

echo.
echo Daily monitoring complete!
echo Check daily-seo-log.json for results
pause