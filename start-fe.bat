@echo off
title BookStore Frontend Starter
echo ==========================================
echo    🚀 STARTING BOOKSTORE FRONTEND...
echo ==========================================

:: Navigate to frontend directory
cd /d "%~dp0bookstore-frontend"

:: Open browser automatically in a separate process
start http://localhost:3000

:: Run Next.js with Turbopack for maximum dev speed
echo [*] Launching with Turbopack engine...
npm run dev -- --turbo

pause
