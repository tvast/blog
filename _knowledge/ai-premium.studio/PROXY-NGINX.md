# Nginx Reverse Proxy Configuration

Configuration Nginx pour mapper tous les ports vers une URL principale.

## 🚀 Installation et Utilisation

### 1. Installer Nginx

```bash
# macOS
brew install nginx

# Linux (Ubuntu/Debian)
sudo apt-get install nginx

# Linux (CentOS/RHEL)
sudo yum install nginx
```

### 2. Utiliser la Configuration Fournie

```bash
# Copier la configuration
sudo cp nginx.conf /etc/nginx/nginx.conf

# Ou pour un environnement de développement local
cp nginx.conf ~/nginx.conf

# Tester la configuration
sudo nginx -t
# ou
nginx -t -c ~/nginx.conf
```

### 3. Démarrer Nginx

```bash
# macOS
brew services start nginx

# Linux
sudo systemctl start nginx

# Ou avec la config locale
nginx -c ~/nginx.conf
```

### 4. Tester

```bash
# Health check
curl http://localhost:3000/_health

# Accéder à la shell via proxy
open http://localhost:3000
```

## 🔄 Configuration Rapide (Développement)

Pour une config locale simple en développement:

```bash
# Terminal 1: Shell
yarn shell

# Terminal 2: Nginx avec config locale
nginx -g "daemon off;" -c ~/nginx.conf
```

## ⚙️ Configuration Personnalisée

### Ajouter un nouveau backend

Éditez `nginx.conf`:

1. **Définir l'upstream:**
```nginx
upstream mfe1_backend {
  server localhost:5001;
  keepalive 32;
}
```

2. **Ajouter la route:**
```nginx
location /mfe1/ {
  proxy_pass http://mfe1_backend/;
  proxy_http_version 1.1;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection $connection_upgrade;
}
```

### Changer le port

Éditez le `listen` dans `nginx.conf`:

```nginx
server {
  listen 8080;        # Changez ici
  listen [::]:8080;
  server_name localhost;
  # ...
}
```

## 🔒 SSL/HTTPS (Production)

Pour activer HTTPS en production:

```nginx
server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name example.com;

  ssl_certificate /path/to/cert.pem;
  ssl_certificate_key /path/to/key.pem;

  # SSL config
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers HIGH:!aNULL:!MD5;
  ssl_prefer_server_ciphers on;

  # Reste de la config...
}

# Redirection HTTP → HTTPS
server {
  listen 80;
  listen [::]:80;
  server_name example.com;
  return 301 https://$server_name$request_uri;
}
```

## 📊 Ports Disponibles

| Service | Port | Utilisation |
|---------|------|-------------|
| **Nginx** | 3000 | Reverse proxy principal |
| **Shell** | 2702 | MFEs + routes |
| **Dev MFEs** | 5173+ | Vite dev servers |

## 🛠️ Commandes Utiles

```bash
# Test de configuration
nginx -t

# Recharger la configuration (sans redémarrage)
sudo nginx -s reload

# Arrêter Nginx
sudo nginx -s stop

# Redémarrer
sudo systemctl restart nginx

# Vérifier le statut
sudo systemctl status nginx

# Afficher les logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## 📝 Configuration Minimale

Si vous voulez une config simple:

```nginx
http {
  upstream backend {
    server localhost:2702;
  }

  server {
    listen 3000;
    server_name localhost;

    location / {
      proxy_pass http://backend;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
  }
}
```

## 🔄 Comparaison: Express vs Nginx

| Aspect | Express | Nginx |
|--------|---------|-------|
| **Installation** | `yarn install` | Système |
| **Configuration** | JavaScript | Fichier texte |
| **Performance** | Moyenne | Haute |
| **Mémoire** | ~50MB | ~10MB |
| **WebSocket** | ✅ | ✅ |
| **Développement** | ✅ | ✅ |
| **Production** | ⚠️ | ✅ |

## 💡 Recommandations

- **Développement**: Utilisez Express (`yarn proxy`)
- **Production**: Utilisez Nginx (`nginx.conf`)

## 🆘 Dépannage

### Nginx ne démarre pas
```bash
# Vérifier la config
sudo nginx -t

# Voir l'erreur
sudo journalctl -u nginx -n 20
```

### Port déjà utilisé
```bash
# Voir quel processus utilise le port
lsof -i :3000

# Tuer le processus
kill -9 <PID>
```

### CORS ou WebSocket ne fonctionne pas
Vérifiez que les headers sont correctement définis:
- `X-Forwarded-For`
- `Upgrade`
- `Connection`

Voir la config dans `nginx.conf` pour les exemples.

## 📚 Ressources

- [Documentation Nginx](https://nginx.org/en/docs/)
- [Nginx Reverse Proxy](https://nginx.org/en/docs/http/ngx_http_proxy_module.html)
- [WebSocket avec Nginx](https://nginx.org/en/docs/http/websocket.html)
