#!/bin/bash

# ArtiMindArt - Quick Start Script

echo "🎨 ArtiMindArt - Iniciando servidores..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Kill any existing processes on ports 3000 and 8000
echo "🛑 Limpiando puertos 3000 y 8000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:8000 | xargs kill -9 2>/dev/null || true
sleep 1

# Start backend
echo -e "${BLUE}📦 Iniciando Backend Next.js (puerto 3000)...${NC}"
cd "C:\Users\javie\Web Artimindart/artimindart-platform"
npm run dev > /tmp/backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

# Wait for backend to start
sleep 4

# Start frontend
echo -e "${BLUE}📄 Iniciando Frontend (puerto 8000)...${NC}"
cd "C:\Users\javie\Web Artimindart"
node server-frontend.js > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

sleep 2

# Verify servers
echo ""
echo -e "${BLUE}🔍 Verificando servidores...${NC}"

if curl -s http://localhost:3000 > /dev/null; then
  echo -e "${GREEN}✅ Backend (3000) - OK${NC}"
else
  echo "❌ Backend (3000) - FAILED"
  echo "Log:"
  cat /tmp/backend.log
fi

if curl -s http://localhost:8000 > /dev/null; then
  echo -e "${GREEN}✅ Frontend (8000) - OK${NC}"
else
  echo "❌ Frontend (8000) - FAILED"
  echo "Log:"
  cat /tmp/frontend.log
fi

echo ""
echo -e "${GREEN}🚀 Servidores iniciados!${NC}"
echo ""
echo "📍 Accede a:"
echo "   Frontend:  http://localhost:8000"
echo "   Backend:   http://localhost:3000"
echo ""
echo "📋 Para ver logs en tiempo real:"
echo "   Backend:   tail -f /tmp/backend.log"
echo "   Frontend:  tail -f /tmp/frontend.log"
echo ""
echo "🛑 Para detener los servidores:"
echo "   kill $BACKEND_PID"
echo "   kill $FRONTEND_PID"
echo ""
echo "📚 Ver QUICK_ACCESS.md para más información"
