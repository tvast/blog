# Production Deployment Guide

## Overview

This guide ensures the EscortMe application is production-ready with proper configuration, error handling, and optimization.

## Pre-Deployment Checklist

### Environment Configuration ✅
- [ ] Copy `.env.production.example` to `.env.production`
- [ ] Fill in all REQUIRED environment variables
- [ ] Verify Mapbox token format: `pk_live_*` (not `pk_`)
- [ ] Verify Firebase configuration is correct
- [ ] Test Firebase connection in staging
- [ ] Verify Revolut token if payments are enabled
- [ ] Run configuration validation:

```bash
npm run validate-config
```

### Build Process
- [ ] Run full test suite: `npm run test:unit`
- [ ] Run e2e tests (if available): `npm run test:e2e`
- [ ] Build for production: `npm run build`
- [ ] Verify build output in `dist/`
- [ ] Check bundle sizes are reasonable
- [ ] Verify no console errors during build

### Security Checks
- [ ] No hardcoded secrets in code
- [ ] No sensitive data in public assets
- [ ] Verify `.env.production` is in `.gitignore`
- [ ] Check for OWASP vulnerabilities
- [ ] Run security audit: `npm audit`
- [ ] Verify API endpoints use HTTPS

### Performance Verification
- [ ] Map loads in < 2 seconds on 4G
- [ ] Markers render smoothly with 50+ locations
- [ ] No memory leaks after navigation
- [ ] Firebase functions respond < 500ms
- [ ] All images optimized

### Browser Compatibility
- [ ] Test on Chrome 90+
- [ ] Test on Firefox 88+
- [ ] Test on Safari 14+
- [ ] Test on Edge 90+
- [ ] Test on mobile browsers

## Configuration Setup

### 1. Environment Files

```bash
# Create production environment file
cp .env.production.example .env.production

# Fill in values (DO NOT commit)
# - VITE_MAPBOX_TOKEN=pk_live_xxx
# - VITE_FIREBASE_* = production Firebase config
```

### 2. Mapbox Token

Mapbox tokens are safe to expose in the browser (public `pk_*` tokens):

- Go to https://account.mapbox.com/tokens/
- Create a new public token for production
- Add restrictions:
  - **URL restrictions**: Your domain only
  - **Scope restrictions**: Maps

### 3. Firebase Configuration

Get production Firebase config:

```bash
# In Firebase Console:
# 1. Project Settings > Web App
# 2. Copy config object
# 3. Fill in .env.production
```

## Build & Deployment

### Build for Production

```bash
# Clean build
npm run build

# Output in ./dist/

# Preview build locally
npm run preview
```

### Deploy to Firebase Hosting

```bash
# Deploy web app
firebase deploy --only hosting

# Deploy with functions
firebase deploy
```

### Deploy to Other Platforms

**Vercel:**
```bash
vercel --prod
```

**Netlify:**
```bash
netlify deploy --prod --dir=dist
```

**Docker:**
```bash
docker build -t escort-me .
docker run -p 3000:80 escort-me
```

## Production Monitoring

### Error Tracking

Configure error tracking service (Sentry, Rollbar, etc.):

```typescript
// src/main.ts
app.config.errorHandler = (err, vm, info) => {
  // Send to error tracking
  trackError({ error: err, context: info })
}
```

### Performance Monitoring

Monitor key metrics:

- Page load time
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Map initialization time
- Firebase response times

### Logging

Structured logging for debugging:

```typescript
// All components log with prefix
console.log('[ComponentName] Message here')
console.error('[MapContainer] Error details')
```

## Troubleshooting

### Map Not Loading

**Issue:** Blank map container
**Solutions:**
- Verify `VITE_MAPBOX_TOKEN` is set correctly
- Check browser console for Mapbox errors
- Verify map container element exists
- Check network tab for failed requests

**Debug:**
```typescript
import { getConfigStatus } from '@/config/validation'
console.log(getConfigStatus())
```

### Firebase Not Connecting

**Issue:** Can't save/load progress
**Solutions:**
- Verify Firebase config in `.env.production`
- Check Firebase rules allow read/write
- Verify user authentication is working
- Check Firebase console for errors

### Performance Issues

**Issue:** Slow loading or frame drops
**Solutions:**
- Reduce marker count (use clustering)
- Optimize image assets
- Reduce animation duration
- Use lighter map style
- Enable browser caching

### Memory Leaks

**Issue:** App crashes after long usage
**Solutions:**
- Check MapContainer cleanup code
- Verify intervals are cleared
- Check event listeners are removed
- Profile with DevTools Memory tab

## Configuration Validation

The application includes built-in configuration validation:

```typescript
import { assertValidConfig, getConfigStatus } from '@/config/validation'

// Check configuration on startup
assertValidConfig()

// Get configuration status for debugging
console.log(getConfigStatus())
```

## Environment Variables Reference

### Required (Production)

| Variable | Format | Example |
|----------|--------|---------|
| `VITE_MAPBOX_TOKEN` | `pk_live_*` | `pk_live_abc123...` |
| `VITE_FIREBASE_API_KEY` | string | `AIzaSyD...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | domain | `project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | string | `project-123` |
| `VITE_FIREBASE_STORAGE_BUCKET` | domain | `project.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | number | `123456789` |
| `VITE_FIREBASE_APP_ID` | string | `1:123:web:abc...` |

### Optional (Production)

| Variable | Purpose |
|----------|---------|
| `VITE_MAPBOX_STYLE` | Map style (dark, light, streets) |
| `VITE_API_URL` | API endpoint URL |
| `VITE_REVOLUT_PUBLIC_TOKEN` | Payment provider token |

## Performance Optimization

### Bundle Analysis

```bash
# Analyze bundle size
npm run build -- --analyze

# Check what's included
ls -lh dist/js/
```

### Caching Strategy

- HTML: No cache (Cache-Control: no-cache)
- CSS/JS: Long-term cache with hash
- Images: Long-term cache
- API: Cache per API requirements

### CDN Configuration

- Enable gzip/brotli compression
- Set appropriate cache headers
- Enable HTTP/2
- Use edge caching for static assets

## Rollback Procedure

### If Issues Detected

```bash
# Identify current version
firebase hosting:versions:list

# Rollback to previous version
firebase hosting:clone production staging

# Redeploy previous version
firebase deploy --only hosting:production --release=VERSION_ID
```

## Monitoring Dashboard

Track these metrics:

- **Availability**: Uptime %
- **Performance**: Page load time (p50, p95, p99)
- **Errors**: Error rate, error types
- **User Experience**: CLS, LCP, FCP
- **Business**: Active users, conversion rate

## Support & Documentation

- **Mapbox Docs**: https://docs.mapbox.com/
- **Firebase Docs**: https://firebase.google.com/docs/
- **Vue 3 Guide**: https://vuejs.org/
- **Vite Guide**: https://vitejs.dev/

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-07-07 | Initial production release |

---

**Status**: 🟢 Production Ready
**Last Updated**: 2026-07-07
**Maintained By**: d0c
