@echo off
echo 🚀 Starting Multi-Language Sentiment Analyzer...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8+ first.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed!

REM Start backend
echo 🔧 Starting Flask backend...
cd backend

REM Check if virtual environment exists
if not exist "venv" (
    echo 📦 Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo 🔌 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install backend dependencies
echo 📥 Installing backend dependencies...
pip install -r requirements.txt

REM Download spaCy model if not already downloaded
echo 🤖 Downloading spaCy model...
python -m spacy download en_core_web_sm

REM Start backend server in background
echo 🚀 Starting backend server on http://localhost:5000...
start "Backend Server" python app.py

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend
echo 🎨 Starting React frontend...
cd ..\frontend

REM Install frontend dependencies
echo 📥 Installing frontend dependencies...
npm install

REM Start frontend server
echo 🚀 Starting frontend server on http://localhost:5173...
start "Frontend Server" npm run dev

echo.
echo 🎉 Multi-Language Sentiment Analyzer is starting up!
echo.
echo 📊 Backend API: http://localhost:5000
echo 🎨 Frontend UI: http://localhost:5173
echo.
echo Press any key to stop the servers...
pause >nul

REM Kill the background processes
taskkill /f /im python.exe >nul 2>&1
taskkill /f /im node.exe >nul 2>&1

echo ✅ Servers stopped. Goodbye!
pause 