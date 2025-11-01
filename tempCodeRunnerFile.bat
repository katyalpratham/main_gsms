@echo off
title Grocery Store Management System - Starting...
color 0A

echo.
echo ================================================
echo    🚀 GROCERY STORE MANAGEMENT SYSTEM 🚀
echo ================================================
echo.
echo Starting both backend and frontend servers...
echo.
REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed or not in PATH
    echo Please install Python from https://python.org
    pause
    exit /b 1
)
 
REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Python and Node.js are installed
echo.

REM Install Python dependencies
echo 📦 Installing Python dependencies...
cd BACKEND
pip install -r requirements.txt --quiet
if %errorlevel% neq 0 (
    echo ❌ Failed to install Python dependencies
    pause
    exit /b 1
)
echo ✅ Python dependencies installed

REM Start Backend Server
echo.
echo 🌐 Starting Backend Server...
start "Backend Server" powershell -NoExit -Command "cd '%CD%'; Write-Host '🚀 Backend Server Starting...' -ForegroundColor Green; python server.py"

REM Wait a moment
timeout /t 2 /nobreak > nul

REM Install Node.js dependencies
echo 📦 Installing Node.js dependencies...
cd ..\FRONTEND
npm install --silent
if %errorlevel% neq 0 (
    echo ❌ Failed to install Node.js dependencies
    pause
    exit /b 1
)
echo ✅ Node.js dependencies installed

REM Start Frontend Server
echo.
echo 🎨 Starting Frontend Development Server...
start "Frontend Server" powershell -NoExit -Command "cd '%CD%'; Write-Host '🚀 Frontend Server Starting...' -ForegroundColor Green; npm run dev"

echo.
echo ================================================
echo ✅ BOTH SERVERS ARE STARTING!
echo ================================================
echo.
echo 🌐 Backend API: http://127.0.0.1:5000
echo 🎨 Frontend App: http://localhost:5173
echo.
echo 📝 The servers will open in separate windows.
echo    Keep those windows open while using the app.
echo.
echo Press any key to close this window...
pause > nul