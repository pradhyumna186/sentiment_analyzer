#!/bin/bash

echo "🚀 Starting Multi-Language Sentiment Analyzer..."

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Python is installed
if ! command_exists python3; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if Node.js is installed
if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check if npm is installed
if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Start backend
echo "🔧 Starting Flask backend..."
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate

# Install backend dependencies
echo "📥 Installing backend dependencies..."
pip install -r requirements.txt

# Download spaCy model if not already downloaded
echo "🤖 Downloading spaCy model..."
python -m spacy download en_core_web_sm

# Start backend server in background
echo "🚀 Starting backend server on http://localhost:5000..."
python app.py &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🎨 Starting React frontend..."
cd ../frontend

# Install frontend dependencies
echo "📥 Installing frontend dependencies..."
npm install

# Start frontend server
echo "🚀 Starting frontend server on http://localhost:5173..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "🎉 Multi-Language Sentiment Analyzer is starting up!"
echo ""
echo "📊 Backend API: http://localhost:5000"
echo "🎨 Frontend UI: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped. Goodbye!"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait 