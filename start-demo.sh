#!/bin/bash

# Shopir Transportation Platform - Demo Setup & Run Guide

echo "======================================"
echo "🚗 Shopir Transportation Platform Demo"
echo "======================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🚀 Starting development server..."
echo ""
echo "The app will open at: http://localhost:5173"
echo ""
echo "DEMO FEATURES:"
echo "  • Admin Panel - Manage users, drivers, orders, and revenue"
echo "  • Driver Panel - Accept rides, track earnings, manage profile"
echo "  • User Panel - Book rides, view history, rate trips"
echo ""
echo "All features are fully functional with mock data!"
echo ""

npm run dev
