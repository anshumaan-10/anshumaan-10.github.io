#!/bin/bash
# Performance Verification Script
# Run this after deployment to verify all optimizations are working

echo "================================================"
echo "  Website Performance Verification Script"
echo "================================================"
echo ""

URL="https://www.devsecopswithanshu.com/"

echo "🔍 Checking website accessibility..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
if [ "$HTTP_CODE" -eq 200 ]; then
  echo "✅ Website is accessible (HTTP $HTTP_CODE)"
else
  echo "❌ Website returned HTTP $HTTP_CODE"
  exit 1
fi
echo ""

echo "🗜️  Checking GZIP compression..."
GZIP_CHECK=$(curl -s -I -H "Accept-Encoding: gzip" "$URL" | grep -i "content-encoding: gzip")
if [ -n "$GZIP_CHECK" ]; then
  echo "✅ GZIP compression is enabled"
else
  echo "⚠️  GZIP compression not detected (may need .htaccess support)"
fi
echo ""

echo "📦 Checking cache headers..."
CACHE_CHECK=$(curl -s -I "${URL}styles.css" | grep -i "cache-control")
if [ -n "$CACHE_CHECK" ]; then
  echo "✅ Cache headers present: $CACHE_CHECK"
else
  echo "⚠️  Cache headers not detected"
fi
echo ""

echo "🔧 Checking Service Worker..."
SW_CHECK=$(curl -s "${URL}sw.js" | head -5)
if [[ "$SW_CHECK" == *"Service Worker"* ]]; then
  echo "✅ Service Worker file is accessible"
else
  echo "❌ Service Worker file not found"
fi
echo ""

echo "📱 Checking PWA Manifest..."
MANIFEST_CHECK=$(curl -s "${URL}manifest.json" | head -5)
if [[ "$MANIFEST_CHECK" == *"name"* ]]; then
  echo "✅ PWA Manifest is accessible"
else
  echo "❌ PWA Manifest not found"
fi
echo ""

echo "⚡ Checking resource hints in HTML..."
HTML=$(curl -s "$URL")
PRECONNECT_COUNT=$(echo "$HTML" | grep -c "preconnect")
PRELOAD_COUNT=$(echo "$HTML" | grep -c "preload")
echo "✅ Found $PRECONNECT_COUNT preconnect hints"
echo "✅ Found $PRELOAD_COUNT preload hints"
echo ""

echo "================================================"
echo "  Manual Verification Steps"
echo "================================================"
echo ""
echo "1. Open Chrome DevTools (F12)"
echo "2. Go to Application > Service Workers"
echo "   → Should show 'Activated and running'"
echo ""
echo "3. Go to Application > Cache Storage"
echo "   → Should show 'portfolio-cache-v1.0.0'"
echo ""
echo "4. Go to Lighthouse tab"
echo "   → Run audit"
echo "   → Target: Performance 98-100"
echo ""
echo "5. Check Network tab"
echo "   → First load: ~800KB"
echo "   → Refresh: < 100KB (from cache)"
echo ""
echo "6. Test offline mode"
echo "   → DevTools > Network > Offline"
echo "   → Refresh page"
echo "   → Should still work!"
echo ""
echo "================================================"
echo "  Performance Testing URLs"
echo "================================================"
echo ""
echo "Google PageSpeed Insights:"
echo "https://pagespeed.web.dev/analysis?url=$URL"
echo ""
echo "WebPageTest:"
echo "https://www.webpagetest.org/"
echo ""
echo "GTmetrix:"
echo "https://gtmetrix.com/"
echo ""
echo "================================================"
echo "  All automated checks complete!"
echo "================================================"
