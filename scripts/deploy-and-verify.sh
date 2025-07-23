#!/bin/bash

echo "🚀 Vercel Deployment and CSS Verification Script"
echo "================================================"

# Check if Vercel CLI is available
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Install with: npm i -g vercel"
    exit 1
fi

# Build and deploy
echo "📦 Building and deploying to Vercel..."
vercel deploy --prebuilt=false --yes | tee /tmp/vercel-deploy.log

# Extract URLs
PREVIEW_URL=$(grep -o 'https://[^[:space:]]*\.vercel\.app' /tmp/vercel-deploy.log | tail -1)

if [ -n "$PREVIEW_URL" ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo "🔗 Preview URL: $PREVIEW_URL"
    echo ""
    echo "🎨 CSS Verification Checklist:"
    echo "   • Check font rendering (JetBrains Mono, Space Grotesk)"
    echo "   • Verify Tailwind styles are applied correctly"
    echo "   • Test responsive design on mobile"
    echo "   • Confirm modal/dialog positioning"
    echo "   • Validate Persona 3 theme colors"
    echo "   • Test Soul Bubbles icon on mobile"
    echo ""
    echo "🔍 Compare with local development:"
    echo "   Local:   http://localhost:3000"
    echo "   Preview: $PREVIEW_URL"
    echo ""
    
    # Ask if user wants to open URLs
    read -p "🌐 Open both URLs for comparison? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🌍 Opening local and preview URLs..."
        open "http://localhost:3000" 2>/dev/null || true
        sleep 2
        open "$PREVIEW_URL" 2>/dev/null || true
    fi
    
    echo ""
    echo "💡 If CSS issues are found:"
    echo "   1. Check if classes are being purged incorrectly"
    echo "   2. Verify Tailwind v4 configuration"
    echo "   3. Ensure all imports are present in production build"
    echo "   4. Check for any console errors in browser dev tools"
    
else
    echo "❌ Could not extract preview URL from deployment output"
    echo "📋 Full deployment log:"
    cat /tmp/vercel-deploy.log
fi

# Clean up
rm -f /tmp/vercel-deploy.log

echo ""
echo "✨ Deployment verification complete!"