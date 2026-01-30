@echo off
TITLE BookStore Frontend - Dev Server
SETLOCAL EnableDelayedExpansion

:: --- CONFIGURATION ---
:: Tự động nhận diện thư mục: nếu đang ở root hoặc đang ở trong frontend
IF EXIST "frontend\" (
    SET "FRONTEND_DIR=frontend"
) ELSE IF EXIST "app\" (
    SET "FRONTEND_DIR=."
) ELSE (
    SET "FRONTEND_DIR=frontend"
)
SET "PORT=3000"

:: --- VISUALS ---
echo.
echo   [94m==================================================== [0m
echo   [94m   BOOKSTORE PROJECT - FRONTEND RUNNER (Fast) [0m
echo   [94m==================================================== [0m
echo.

:: Check if Node is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo   [91m[ERROR] Node.js is not installed. Please install it from nodejs.org [0m
    pause
    exit /b
)

:: Chuyển vào thư mục frontend nếu cần
if "%FRONTEND_DIR%"=="frontend" (
    if exist "frontend\" (
        cd frontend
    ) else (
        echo   [91m[ERROR] Khong tim thay thu muc frontend. Hay chay tu thu muc goc BookStore. [0m
        pause
        exit /b
    )
)

:: Install dependencies if missing
if not exist "node_modules\" (
    echo   [93m[INFO] node_modules not found. Installing dependencies... [0m
    call npm install
    if !ERRORLEVEL! neq 0 (
        echo   [91m[ERROR] npm install failed. [0m
        pause
        exit /b
    )
    echo   [92m[SUCCESS] Dependencies installed. [0m
)

:: Run the dev server
echo.
echo   [92m[INFO] Starting Next.js on http://localhost:%PORT%... [0m
echo   [90m(Press Ctrl+C to stop) [0m
echo.

call npm run dev

pause
