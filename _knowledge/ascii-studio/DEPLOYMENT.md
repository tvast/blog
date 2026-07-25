# Deployment Guide for π DJ

Complete guide to deploy **π DJ** to production environments.

## Table of Contents

1. [GitHub Pages](#github-pages)
2. [Vercel](#vercel)
3. [Netlify](#netlify)
4. [Docker](#docker)
5. [Custom Domain](#custom-domain)
6. [Troubleshooting](#troubleshooting)

---

## GitHub Pages

The easiest and fastest way to host **π DJ** for free.

### Automated (GitHub Actions)

**Recommended approach** — deploys automatically on every push to `main`.

1. **Enable Pages**:
   - Go to repository **Settings → Pages**
   - Source: **GitHub Actions**
   - Save

2. **Workflow ready**: `.github/workflows/deploy.yml` is pre-configured

3. **Deploy**: Push to `main`:
   ```bash
   git add .
   git commit -m "Deploy π DJ to GitHub Pages"
   git push origin main
   ```

4. **Wait**: GitHub Actions builds and deploys (typically 1-2 minutes)

5. **Access**: Visit `https://YOUR_USERNAME.github.io/π-dj`

### Manual Deployment

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Move output**:
   ```bash
   # Option A: Copy to docs folder
   mkdir docs
   cp -r dist/spa/* docs/
   git add docs/
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Configure Pages**:
   - Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main`
   - Folder: `/docs`

### Custom Domain

1. **Register domain** (GoDaddy, Namecheap, etc.)

2. **Add CNAME record**:
   ```
   Type: CNAME
   Name: π-dj
   Value: YOUR_USERNAME.github.io
   ```

3. **Update GitHub**:
   - Settings → Pages
   - Custom domain: `π-dj.example.com`
   - Save (GitHub creates `CNAME` file automatically)

4. **Wait**: DNS propagation (5-48 hours)

---

## Vercel

Professional hosting with automatic deployments and optimizations.

### Deploy with CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Or production deploy
vercel --prod
```

### Deploy via GitHub

1. **Connect GitHub**:
   - Visit [vercel.com](https://vercel.com)
   - Sign up or log in
   - "Import Project"
   - Select your repository

2. **Configure**:
   - Framework Preset: **Quasar / Vue**
   - Build Command: `npm run build`
   - Output Directory: `dist/spa`

3. **Deploy**: Click "Deploy"

4. **Access**: `https://π-dj.vercel.app`

### Custom Domain

1. **Add domain**:
   - Project Settings → Domains
   - Enter your domain
   - Follow DNS instructions

2. **Update DNS**:
   ```
   Type: CNAME
   Name: π-dj
   Value: cname.vercel-dns.com
   ```

---

## Netlify

Simple deployment with automatic builds and instant rollbacks.

### Deploy with CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --dir=dist/spa

# Production deploy
netlify deploy --prod --dir=dist/spa
```

### Deploy via GitHub

1. **Connect GitHub**:
   - Visit [netlify.com](https://netlify.com)
   - Sign up or log in
   - "Add new site" → "Import an existing project"
   - Select your repository

2. **Configure**:
   - Build command: `npm run build`
   - Publish directory: `dist/spa`
   - Deploy

3. **Access**: `https://π-dj.netlify.app`

### Continuous Deployment

Netlify auto-deploys on push to `main`:

1. **Settings → Build & Deploy**
2. **Branches and deploy contexts**
3. **Production branch**: `main`
4. Done! ✨

---

## Docker

Self-hosted container deployment.

### Create Image

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Create `Dockerfile`**:
   ```dockerfile
   FROM node:18-alpine

   WORKDIR /app

   # Copy built app
   COPY dist/spa ./dist/spa
   COPY package.json ./

   # Install http-server
   RUN npm install -g http-server

   EXPOSE 3000

   CMD ["http-server", "dist/spa", "-p", "3000", "--cors"]
   ```

3. **Build image**:
   ```bash
   docker build -t π-dj:latest .
   ```

4. **Run container**:
   ```bash
   docker run -p 3000:3000 π-dj:latest
   ```

5. **Access**: `http://localhost:3000`

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  π-dj:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

Run:
```bash
docker-compose up -d
```

### Deploy to Docker Hub

```bash
# Tag image
docker tag π-dj:latest YOUR_USERNAME/π-dj:latest

# Login to Docker Hub
docker login

# Push
docker push YOUR_USERNAME/π-dj:latest
```

Others can run:
```bash
docker run -p 3000:3000 YOUR_USERNAME/π-dj
```

---

## Custom Domain

### DNS Configuration

#### For GitHub Pages
```
Type    | Name           | Value
--------|----------------|------------------
CNAME   | π-dj           | YOUR_USERNAME.github.io
A       | @              | 185.199.108.153
A       | @              | 185.199.109.153
A       | @              | 185.199.110.153
A       | @              | 185.199.111.153
```

#### For Vercel
```
Type    | Name           | Value
--------|----------------|------------------
CNAME   | π-dj           | cname.vercel-dns.com
```

#### For Netlify
```
Type    | Name           | Value
--------|----------------|------------------
CNAME   | π-dj           | your-site.netlify.app
```

### SSL/HTTPS

Most platforms auto-provide SSL:
- ✅ GitHub Pages: Automatic
- ✅ Vercel: Automatic
- ✅ Netlify: Automatic
- 🔧 Docker: Use Caddy or Nginx reverse proxy

---

## Environment Variables

### For Web Deployment

Create `.env.production`:
```
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=π DJ
VITE_GA_ID=UA-XXXXX-X  # Optional: Google Analytics
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
const appTitle = import.meta.env.VITE_APP_TITLE
```

### For Docker

```bash
docker run \
  -e API_URL=https://api.example.com \
  -p 3000:3000 \
  π-dj:latest
```

---

## Performance Optimization

### CDN Configuration

Most platforms include CDN automatically. For custom setup:

```javascript
// Enable Service Worker for offline support
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}
```

### Compression

Quasar builds with gzip compression. Verify in Network tab:
- Response headers should include `Content-Encoding: gzip`
- Files should be < 50% of original size

### Image Optimization

The logo is already optimized. For custom images:
```bash
# Use ImageOptim or online tools
```

---

## Monitoring & Analytics

### Google Analytics

1. **Create property** at [analytics.google.com](https://analytics.google.com)

2. **Get tracking ID**: `UA-XXXXX-X`

3. **Add to `.env.production`**:
   ```
   VITE_GA_ID=UA-XXXXX-X
   ```

4. **Install package**:
   ```bash
   npm install vue-gtag
   ```

5. **Register in Vue** (if needed)

### Status Monitoring

- **GitHub Pages**: No monitoring needed (99.99% uptime)
- **Vercel**: Built-in analytics
- **Netlify**: Built-in analytics
- **Docker**: Use Prometheus + Grafana

---

## Rollback & Recovery

### GitHub Pages

1. **Revert commit**:
   ```bash
   git revert COMMIT_HASH
   git push origin main
   ```

2. **Or force specific version**:
   ```bash
   git checkout OLD_COMMIT -- .
   git commit -m "Rollback to previous version"
   git push origin main
   ```

### Vercel / Netlify

1. **Go to Deployments**
2. **Click previous version**
3. **Promote to Production**

### Docker

```bash
# Pull previous image
docker pull YOUR_USERNAME/π-dj:v1.0.0

# Run previous version
docker run -p 3000:3000 YOUR_USERNAME/π-dj:v1.0.0
```

---

## Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf node_modules dist .quasar
npm install
npm run build
```

### Page Blank

- Check browser console (F12) for errors
- Verify MIME types in Network tab
- Clear browser cache (Ctrl+Shift+Del)

### Microphone Not Working

- HTTPS required (GitHub Pages, Vercel, Netlify all provide it)
- Check browser permissions
- Use audio file upload instead

### Slow Loads

- Check Lighthouse score (DevTools)
- Enable gzip compression
- Use CDN (all platforms provide)
- Optimize images

### DNS Issues

- Wait 24-48 hours for propagation
- Verify DNS records on your registrar
- Use [whatsmydns.net](https://whatsmydns.net) to check global propagation

---

## Support

Need help? Check:
- [Quasar Deployment Docs](https://quasar.dev/deployment/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)

---

**Happy deploying!** 🚀🍅✨
