#!/bin/bash

# Marc's Portfolio Deployment Helper Script

echo "🚀 Marc's Portfolio Deployment Helper"
echo "======================================"

# Check if we're in the right directory
if [ ! -f "DEPLOYMENT.md" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo ""
echo "📋 Pre-deployment Checklist:"
echo "1. ✅ Code pushed to GitHub"
echo "2. ✅ Gmail App Password generated"
echo "3. ✅ Render account ready"
echo "4. ✅ Vercel account ready"

echo ""
echo "🔧 Deployment Steps:"
echo ""

echo "📦 BACKEND (Render):"
echo "1. Go to: https://dashboard.render.com/"
echo "2. New Web Service → Connect GitHub repo"
echo "3. Root Directory: backend"
echo "4. Build Command: npm install"
echo "5. Start Command: npm start"
echo ""
echo "Environment Variables to set:"
echo "EMAIL_USER=your_gmail@gmail.com"
echo "EMAIL_PASS=your_app_password"
echo "RECIPIENT_EMAIL=marcdelacruzesteban@gmail.com"
echo "FRONTEND_URL=https://your-vercel-app.vercel.app"
echo "NODE_ENV=production"

echo ""
echo "🌐 FRONTEND (Vercel):"
echo "1. Go to: https://vercel.com/dashboard"
echo "2. New Project → Import GitHub repo"
echo "3. Root Directory: frontend"
echo "4. Framework: Astro"
echo ""
echo "Environment Variables to set:"
echo "PUBLIC_API_URL=https://your-render-app.onrender.com"

echo ""
echo "🔗 After deployment:"
echo "1. Update backend FRONTEND_URL with your Vercel URL"
echo "2. Test the contact form"
echo "3. Check email delivery"

echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo "✨ Happy deploying!"
