# Express Reverse Proxy Server

Un serveur reverse proxy simple qui mappe tous les ports vers une URL principale unique.

## 🚀 Utilisation Rapide

```bash
# Démarrer le proxy (port 3000 par défaut)
yarn proxy

# Ou avec un port personnalisé
PORT=8080 node proxy-server.js

# Raccourcis disponibles
yarn proxy:3000    # Sur port 3000
yarn proxy:8080    # Sur port 8080
```

## 🎯 Architecture

```
Client Browser
    ↓
http://localhost:3000 (ou 8080)
    ↓
Express Reverse Proxy
    ↓
http://localhost:2702 (Shell/MFEs)
```

## 📋 Configuration

Le serveur mappe actuellement:

```javascript
proxyTargets: {
  shell: 'http://localhost:2702',  // Main shell avec toutes les routes
}
```

### Ajouter d'autres ports

Éditez `proxy-server.js` et ajoutez dans `proxyTargets`:

```javascript
proxyTargets = {
  shell: 'http://localhost:2702',
  mfe1: 'http://localhost:5001',
  mfe2: 'http://localhost:5002',
}
```

Puis ajoutez les routes:

```javascript
// Route pour /mfe1/*
app.use('/mfe1', createProxyMiddleware({
  target: proxyTargets.mfe1,
  changeOrigin: true,
  ws: true,
  logLevel: 'warn',
}));

// Route pour /mfe2/*
app.use('/mfe2', createProxyMiddleware({
  target: proxyTargets.mfe2,
  changeOrigin: true,
  ws: true,
  logLevel: 'warn',
}));
```

## 🔄 Workflow Recommandé

**Terminal 1:** Démarrer la shell sur port 2702
```bash
yarn shell
```

**Terminal 2:** Démarrer le proxy sur port 3000
```bash
yarn proxy
```

**Browser:** Accédez à `http://localhost:3000`

## ✨ Caractéristiques

✅ Reverse proxy simple et léger  
✅ Support WebSocket (pour hot reload)  
✅ Configuration facile  
✅ Health check endpoint  
✅ Port configurable via variable d'environnement  
✅ Gestion des erreurs gracieuse  

## 🛠️ Endpoints Spéciaux

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

## 🔧 Options Avancées

### Port personnalisé
```bash
PORT=9000 yarn proxy
```

### Port via variable d'environnement
```bash
export PORT=8080
yarn proxy
```

### Avec npm start
```bash
npm start  # Lance yarn proxy (configuré dans package.json)
```

## 📊 Ports par défaut du système

| Service | Port | Commande |
|---------|------|----------|
| Proxy | 3000 | `yarn proxy:3000` |
| Proxy | 8080 | `yarn proxy:8080` |
| Shell | 2702 | `yarn shell` |
| Dev MFEs | 5173+ | `yarn dev` |

## 🚦 Workflow Complet

```bash
# Terminal 1: Shell sur port 2702
yarn shell

# Terminal 2: Proxy sur port 3000
yarn proxy:3000

# Browser: Accédez à
open http://localhost:3000

# Tout le traffic est forwarded à la shell sur 2702
# Aucune configuration CORS nécessaire
# WebSocket marche (pour hot reload)
```

## 🔐 Production

Pour la production, utilisez Nginx à la place (plus performant):

Voir `PROXY-NGINX.md` pour la configuration Nginx.

## 📝 Notes

- Le proxy supporte WebSocket pour les connexions en temps réel
- Les erreurs de connexion sont gérées gracieusement
- Changement d'origine (CORS) activé par défaut
- Compatible avec tous les ports backend

## 🆘 Dépannage

### "Cannot proxy to undefined"
Vérifiez que la shell est démarrée sur le port 2702:
```bash
# Terminal 1
yarn shell

# Terminal 2
yarn proxy
```

### Port déjà utilisé
```bash
# Utiliser un autre port
PORT=8080 yarn proxy

# Ou tuer le processus existant
lsof -ti:3000 | xargs kill -9
```

### WebSocket ne marche pas
Assurez-vous que `ws: true` est défini dans la configuration du proxy.

## 📚 Fichiers Connexes

- `proxy-server.js` - Le serveur Express
- `package.json` - Scripts npm et dépendances
- `PROXY-NGINX.md` - Configuration Nginx alternative
