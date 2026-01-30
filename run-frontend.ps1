# BookStore Frontend Runner (Fast)
# Usage: .\run-frontend.ps1

$Port = 3000

Clear-Host
Write-Host "`n====================================================" -ForegroundColor Cyan
Write-Host "   BOOKSTORE PROJECT - FRONTEND RUNNER (Fast)" -ForegroundColor Cyan
Write-Host "====================================================`n" -ForegroundColor Cyan

# Check Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Node.js is not installed. Please install it from nodejs.org" -ForegroundColor Red
    return
}

# Tự động nhận diện thư mục
if (Test-Path "frontend") {
    Set-Location "frontend"
} elseif (Test-Path "app") {
    # Đang ở trong frontend rồi, không cần cd
} else {
    Write-Host "[ERROR] Khong tim thay thu muc frontend. Hay chay tu thu muc goc BookStore." -ForegroundColor Red
    return
}

# Install dependencies if missing
if (-not (Test-Path "node_modules")) {
    Write-Host "[INFO] node_modules not found. Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] npm install failed." -ForegroundColor Red
        return
    }
    Write-Host "[SUCCESS] Dependencies installed." -ForegroundColor Green
}

# Run dev server
Write-Host "`n[INFO] Starting Next.js on http://localhost:$Port..." -ForegroundColor Green
Write-Host "(Press Ctrl+C to stop)`n" -ForegroundColor DarkGray

npm run dev
