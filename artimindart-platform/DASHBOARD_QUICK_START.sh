#!/bin/bash

# ArtiMindArt Dashboard Quick Start

echo "🚀 ArtiMindArt Dashboard Setup"
echo "================================"

# 1. Copy env template
echo "1. Creating .env.local from template..."
if [ ! -f .env.local ]; then
  cp .env.local.example .env.local
  echo "   ✓ .env.local created"
  echo "   ⚠️  Please edit .env.local with your Supabase credentials"
else
  echo "   ✓ .env.local already exists"
fi

# 2. Install dependencies
echo ""
echo "2. Installing dependencies..."
npm install
if [ $? -eq 0 ]; then
  echo "   ✓ Dependencies installed"
else
  echo "   ✗ Failed to install dependencies"
  exit 1
fi

# 3. Information
echo ""
echo "================================"
echo "✓ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure Supabase:"
echo "   - Create project at https://supabase.com"
echo "   - Run SQL from SETUP_SUPABASE.sql in Supabase SQL Editor"
echo "   - Copy URL and anon key to .env.local"
echo ""
echo "2. Start dev server:"
echo "   npm run dev"
echo ""
echo "3. Test the app:"
echo "   - Sign up: http://localhost:3000/auth/signup"
echo "   - Login: http://localhost:3000/auth/login"
echo "   - Dashboard: http://localhost:3000/dashboard"
echo ""
echo "See DASHBOARD_SETUP.md for detailed guide"
