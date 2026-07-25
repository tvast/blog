# 🚀 Guide Démarrage Rapide — Serveur Reverse Proxy

Tout ce dont vous avez besoin pour accéder à votre application via une seule URL.

## ✨ Le Plus Simple (Express)

### Option 1: Express (Recommandé pour le développement)

```bash
# Terminal 1: Démarrer la shell
yarn shell

# Terminal 2: Démarrer le proxy
yarn proxy

# Browser: Accédez à
http://localhost:3000
```

**C'est tout!** Tout votre système est maintenant accessible sur http://localhost:3000

## 🔧 Configuration du Proxy Express

**Fichier:** `proxy-server.js`

Configuration simple:
```javascript
proxyTargets = {
  shell: 'http://localhost:2702',  // Mappe tout vers la shell
}
```

Pour ajouter d'autres ports:
```javascript
proxyTargets = {
  shell: 'http://localhost:2702',
  api: 'http://localhost:5000',
  cdn: 'http://localhost:8000',
}

// Puis ajouter les routes
app.use('/api', createProxyMiddleware({ target: proxyTargets.api }));
app.use('/cdn', createProxyMiddleware({ target: proxyTargets.cdn }));
```

## 🌐 Alternatives de Port

```bash
# Port 3000 (défaut)
yarn proxy

# Port 8080
yarn proxy:8080

# Port personnalisé
PORT=9000 yarn proxy
```

## 🏗️ Architecture du Système

```
┌─────────────────────────────────────────┐
│     Client Browser                      │
│  http://localhost:3000                  │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Express Reverse Proxy (proxy-server.js)│
│  Port 3000                              │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Unified Shell (Vite)                   │
│  Port 2702                              │
│  • Dashboard                            │
│  • Auth (/auth/*)                       │
│  • Catalog (/catalog/*)                 │
│  • Marketing (/marketing/*)             │
│  • Launch (/launch/*)                   │
│  • Commerce (/commerce/*)               │
│  • Admin (/admin/*)                     │
│  • Legal (/legal/*)                     │
└─────────────────────────────────────────┘
```

## 📋 Workflow Complet

### Démarrage

```bash
# Terminal 1 - Shell
yarn shell
# Affiche: "Vite dev server running at ..."
# Port: 2702

# Terminal 2 - Proxy
yarn proxy
# Affiche: "Reverse Proxy Server Started"
# Port: 3000

# Terminal 3 (optionnel) - Développer les MFEs
yarn dev --app admin
```

### Accès

```
http://localhost:3000/               → Dashboard
http://localhost:3000/auth/login     → Auth
http://localhost:3000/catalog/*      → Catalog
http://localhost:3000/marketing/*    → Marketing
http://localhost:3000/launch         → Launch
http://localhost:3000/commerce/*     → Commerce
http://localhost:3000/admin/*        → Admin
http://localhost:3000/legal/*        → Legal
```

## 🔌 Endpoints Spéciaux

### Health Check
```bash
curl http://localhost:3000/_health
```

Response:
```json
{
  "status": "ok",
  "port": 3000
}
```

## 🆖 Alternative: Nginx (Production)

Si vous préférez Nginx pour la production:

```bash
# Copier la config
cp nginx.conf /etc/nginx/sites-available/default

# Tester
sudo nginx -t

# Redémarrer
sudo systemctl restart nginx

# Accédez à http://localhost:3000
```

Voir `PROXY-NGINX.md` pour plus de détails.

## 🛠️ Dépannage Rapide

### "Cannot proxy to undefined"
```bash
# Vérifiez que la shell est démarrée sur 2702
yarn shell
```

### Port déjà utilisé
```bash
# Utiliser un autre port
PORT=8080 yarn proxy

# Ou terminer le processus existant
lsof -ti:3000 | xargs kill -9
```

### WebSocket ne fonctionne pas
- Express a le support WebSocket activé par défaut ✅
- Vérifiez que la shell est accessible sur http://localhost:2702

## 💾 Installation des Dépendances

Si nécessaire, installez les dépendances:

```bash
yarn install
# ou
npm install
```

Dépendances nécessaires:
- `express` - Serveur HTTP
- `http-proxy-middleware` - Reverse proxy

## 🎯 Commandes Rapides

```bash
# Démarrer tout en développement
Terminal 1: yarn shell
Terminal 2: yarn proxy

# Commande unique pour la production
yarn proxy  # Après que la shell soit prête

# Vérifier que tout fonctionne
curl http://localhost:3000/_health
```

## 📊 Vue d'Ensemble des Ports

| Service | Port | Commande | État |
|---------|------|----------|------|
| Shell | 2702 | `yarn shell` | ✅ Requis |
| Proxy | 3000 | `yarn proxy` | ✅ Requis |
| DevServer | 5173+ | `yarn dev` | ⚠️ Optionnel |

## 🎨 Accès au Système

Avant le proxy:
```
Shell:    http://localhost:2702
Admin:    http://localhost:5001
API:      http://localhost:5000
```

Après le proxy:
```
Tout:     http://localhost:3000
```

## ✅ Checklist Démarrage

- [ ] `yarn install` - Installer les dépendances
- [ ] Terminal 1: `yarn shell` - Shell prête sur 2702
- [ ] Terminal 2: `yarn proxy` - Proxy prêt sur 3000
- [ ] Browser: `http://localhost:3000` - Accès ✅
- [ ] Navigation fonctionne ✅
- [ ] Dashboard affiche ✅

## 🚀 Vous êtes Prêt!

Une fois que le proxy démarre:

1. Ouvrez `http://localhost:3000` dans le navigateur
2. Tout le système est accessible depuis une seule URL
3. Vous pouvez naviguer entre les 7 modules
4. Hot reload fonctionne automatiquement
5. WebSocket est supporté pour les connexions en temps réel

## 📚 Documentation Complète

- `PROXY-SERVER.md` - Documentation Express détaillée
- `PROXY-NGINX.md` - Documentation Nginx détaillée
- `SHELL-2702.md` - Documentation de la Shell
- `CLI.md` - Outils CLI disponibles

## 🆘 Besoin d'aide?

Problème? Consultez:
1. `PROXY-SERVER.md` - Section "Dépannage"
2. `PROXY-NGINX.md` - Section "Dépannage"
3. Vérifiez que la shell s'exécute sur 2702

**C'est du reverse proxying simple! Rien de compliqué.** 🎯
