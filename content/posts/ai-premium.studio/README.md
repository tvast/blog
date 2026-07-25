# 🚀 Micro Frontend Architecture

Architecture complète de micro frontends avec TypeScript. Cette structure démontre comment implémenter une application modulaire où chaque feature est un module indépendant.

## 📦 Structure des projets

### **Shell** (Application hôte)
Orchestre et charge les micro frontends. Fournit :
- Gestion du cycle de vie des modules
- EventBus pour la communication inter-modules
- Interfaces communes

### **MFE-Products** (Micro Frontend Produits)
Module de gestion des produits :
- Récupération des produits
- Affichage des détails
- Émission d'événements `product:added`

### **MFE-Cart** (Micro Frontend Panier)
Module de gestion du panier :
- Ajout/suppression d'articles
- Calcul du total
- Écoute des événements `product:added`

### **MFE-Analytics** (Bonus - Micro Frontend Analytics)
Module de suivi des événements :
- Enregistrement des actions utilisateur
- Historique des événements
- Reporting

## 🎯 Démarrer

### 1. Voir l'architecture
```bash
node scripts/architecture.js
```

### 2. Lancer la démonstration
```bash
node scripts/demo.js
```

Cela affichera :
- Le chargement de chaque module
- La gestion des événements
- L'état du panier en temps réel
- Les événements trackés par Analytics

### 3. Compiler les projets
```bash
npm run build:all
```

### 4. Mode développement (watch)
```bash
npm run dev:all
```

## 🔄 Flux de communication

```
Shell (EventBus)
    ↓
    ├→ product:added
    │   └→ Écouté par: Cart, Analytics
    │
    ├→ cart:updated
    │   └→ Écouté par: Analytics, Shell
    │
    └→ ...autres événements
```

## 💡 Concept clé : Découplage

Les modules **ne connaissent pas** leurs dépendances :

```typescript
// ❌ Couplage fort (MAUVAIS)
cartModule.addProduct(productsModule.getProduct(1));

// ✅ Découplage (BON)
shell.emit('product:added', { productId: 1 });
cartModule.listen('product:added', (data) => { ... });
```

## 📊 Avantages

| Aspect | Bénéfice |
|--------|----------|
| **Scalabilité** | Ajouter des modules sans modifier le reste |
| **Maintenance** | Chaque module peut évoluer indépendamment |
| **Tests** | Tests unitaires isolés par module |
| **Équipes** | Plusieurs équipes travaillent en parallèle |
| **Déploiement** | Déployer un module sans redéployer l'app |
| **Résilience** | Une panne de module n'affecte pas les autres |

## 🛠️ Ajouter un nouveau module

1. **Créer la structure**
```bash
mkdir mfe-wishlist
cd mfe-wishlist
```

2. **Ajouter les fichiers**
```
mfe-wishlist/
├── src/index.ts
├── package.json
└── tsconfig.json
```

3. **Implémenter le module**
```typescript
export class WishlistModule {
  async init() { ... }
  async destroy() { ... }
  
  // Écouter les événements
  constructor(shell) {
    shell.on('product:added', this.handleProductAdded.bind(this));
  }
}
```

4. **Enregistrer dans le Shell**
```typescript
const wishlistModule = new WishlistModule(shell);
await shell.registerModule(wishlistModule);
```

## 📝 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run demo` | Lance la démonstration interactive |
| `npm run build:all` | Compile tous les modules TypeScript |
| `npm run dev:all` | Lance le watch mode sur tous les modules |
| `node scripts/architecture.js` | Affiche le diagramme de l'architecture |
| `node scripts/bootstrap.js` | Compile et setup les projets |

## 🔧 Configuration TypeScript

Chaque module a sa propre configuration `tsconfig.json` :
- `target: ES2020` - Syntaxe moderne
- `module: ES2020` - Modules ES
- `strict: true` - Vérification stricte des types
- `declaration: true` - Génère les .d.ts

## 🎓 Cas d'usage réels

- **E-commerce** : Shell + Products + Cart + Checkout + Reviews
- **Dashboard** : Shell + Analytics + Reports + Settings
- **SaaS** : Shell + Billing + Users + Features
- **Portail** : Shell + Widget1 + Widget2 + Widget3

## 📚 Ressources

- [Module Federation (Webpack)](https://webpack.js.org/concepts/module-federation/)
- [Single-spa](https://single-spa.js.org/)
- [Qiankun](https://qiankun.umijs.org/)
- [Bit.dev](https://bit.dev/)

## 🤝 Architecture modulaire moderne

Cette approche combine :
- ✅ TypeScript pour la sécurité des types
- ✅ Découplage pour la flexibilité
- ✅ EventBus pour la communication
- ✅ Cycle de vie managé pour la résilience

---

**Prêt à explorer ?** Lancez `npm run demo` pour voir tout ça en action ! 🚀
