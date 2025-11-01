# Grocery Store Management System - Startup Script
# This script will start both the backend and frontend servers 

Write-Host ""
Write-Host '================================================' -ForegroundColor Cyan
Write-Host '   🚀 GROCERY STORE MANAGEMENT SYSTEM 🚀' -ForegroundColor Cyan  
Write-Host '================================================' -ForegroundColor Cyan
Write-Host ""
Write-Host 'Starting both backend and frontend servers...' -ForegroundColor Yellow
Write-Host ""

# Check if Python is installed
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host '❌ Python is not installed or not in PATH' -ForegroundColor Red
    Write-Host 'Please install Python from https://python.org' -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if Node.js is installed
try {
    $nodeVersion = node --version 2>&1
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host '❌ Node.js is not installed or not in PATH' -ForegroundColor Red
    Write-Host 'Please install Node.js from https://nodejs.org' -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Install Python dependencies
Write-Host '📦 Installing Python dependencies...' -ForegroundColor Yellow
Set-Location "BACKEND"
pip install -r requirements.txt --quiet
if ($LASTEXITCODE -ne 0) {
    Write-Host '❌ Failed to install Python dependencies' -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host '✅ Python dependencies installed' -ForegroundColor Green

# Start Backend Server
Write-Host ""
Write-Host '🌐 Starting Backend Server...' -ForegroundColor Yellow
$backendCommand = "cd '$PWD'; Write-Host '🚀 Backend Server Starting...' -ForegroundColor Green; python server.py"
Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendCommand -WindowStyle Normal
 
# Wait a moment
Start-Sleep -Seconds 2

# Wait for backend to be ready (port 5000)
Write-Host "⏳ Waiting for backend to become available on http://127.0.0.1:5000 ..." -ForegroundColor Yellow
$maxAttempts = 20
for ($i = 1; $i -le $maxAttempts; $i++) {
    try {
        $response = Invoke-WebRequest -Uri "http://127.0.0.1:5000" -UseBasicParsing -TimeoutSec 2
        if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
            Write-Host "✅ Backend is up (attempt $i)" -ForegroundColor Green
            break
        }
    } catch {
        # ignore until available
    }
    Start-Sleep -Milliseconds 500
    if ($i -eq $maxAttempts) {
        Write-Host "⚠️ Backend did not respond after $maxAttempts attempts; starting frontend anyway." -ForegroundColor Yellow
    }
}

# Install Node.js dependencies
Write-Host '📦 Installing Node.js dependencies...' -ForegroundColor Yellow
Set-Location "..\FRONTEND"
npm install --silent
if ($LASTEXITCODE -ne 0) {
    Write-Host '❌ Failed to install Node.js dependencies' -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host '✅ Node.js dependencies installed' -ForegroundColor Green

# Start Frontend Server
Write-Host ""
Write-Host '🎨 Starting Frontend Development Server...' -ForegroundColor Yellow
$frontendCommand = "cd '$PWD'; Write-Host '🚀 Frontend Server Starting...' -ForegroundColor Green; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendCommand -WindowStyle Normal

Write-Host ""
Write-Host '================================================' -ForegroundColor Cyan
Write-Host '✅ BOTH SERVERS ARE STARTING!' -ForegroundColor Green
Write-Host '================================================' -ForegroundColor Cyan 
Write-Host ""
Write-Host '🌐 Backend API: http://127.0.0.1:5000' -ForegroundColor Cyan
Write-Host '🎨 Frontend App: http://localhost:5173' -ForegroundColor Cyan
Write-Host ""
Write-Host '📝 The servers will open in separate windows.' -ForegroundColor Yellow
Write-Host '   Keep those windows open while using the app.' -ForegroundColor Yellow
Write-Host ""
Read-Host 'Press Enter to close this window' 