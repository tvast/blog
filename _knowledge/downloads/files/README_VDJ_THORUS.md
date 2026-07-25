# Virtual DJ Pro - Thorus Cyberpunk Visualizers
## Installation & Configuration Guide

---

## 📦 FICHIERS INCLUS

### Visualiseurs
1. **vdj_thorus_cyberpunk.xml** - Visualiseur principal avec tore central et equalizers multiples
2. **vdj_thorus_cyberpunk_x.xml** - Variante "City Lights Edition" avec layout optimisé pour broadcasts

---

## 🚀 INSTALLATION

### Étape 1: Localiser le dossier des skins Virtual DJ
**Windows:**
```
C:\Users\[VotreUtilisateur]\AppData\Local\VirtualDJ\Skins
```

**Mac:**
```
~/Library/Application Support/VirtualDJ/Skins
```

**Linux:**
```
~/.VirtualDJ/Skins
```

### Étape 2: Copier les fichiers
1. Créer un dossier pour chaque visualiseur:
   - `VirtualDJ/Skins/Thorus_Cyberpunk/`
   - `VirtualDJ/Skins/Thorus_Cyberpunk_X/`

2. Placer le fichier `.xml` correspondant dans chaque dossier avec le nom `skin.xml`

### Étape 3: Ajouter les ressources (optionnel)
Si vous avez des images de background:
- `background.png` (image de fond, resolution recommandée: 1920x1080 ou plus)
- `preview.png` (thumbnail pour le sélecteur de skins, 256x192)

Placer ces fichiers dans le même dossier que `skin.xml`

### Étape 4: Redémarrer Virtual DJ
- Fermer complètement Virtual DJ
- Relancer l'application
- Les nouveaux skins apparaîtront dans le sélecteur de skins

---

## ⚙️ CONFIGURATION & VARIABLES

### Variables de personnalisation

#### Thème de couleur (colorMode / visualMode)
```xml
colorMode 0 = Cyan (défaut)
colorMode 1 = Cyan clair
colorMode 2 = Vert néon
colorMode 3 = Magenta
colorMode 4 = Orange
colorMode 5 = Rose
```

Modifier dans Virtual DJ:
- Menu: Skin Settings ou Configuration
- Chercher les variables et ajuster selon le mode

---

## 🎨 DESIGN & ÉLÉMENTS

### Éléments visuels principaux

#### Visualiseur Principal (vdj_thorus_cyberpunk.xml)
- **Central Torus**: Equalizer circulaire 256 barres avec cercles concentriques
- **City Lights**: Barres verticales 128 canaux en bas (style skyline)
- **Spectrum Analyzer**: Spectrum horizontal mirrored au centre
- **Waveforms**: Panneaux gauche/droite avec formes d'onde des decks
- **Metadata**: Titre et artiste affichés en temps réel

#### Design City Lights Edition (vdj_thorus_cyberpunk_x.xml)
- **Torus Compact**: Tore central 180 barres + orbites décoratives
- **Spectrum Band**: Bande horizontale mirrorée au centre
- **Cityscape**: Equalizer 96 barres style skyline urbain très prononcé
- **Header/Footer**: Panneaux d'information avec accents luminescents
- **Side Panels**: Waveforms détaillées des deux decks

---

## 🎛️ PALETTE COULEURS PERSONNALISABLE

### Couleurs principales
```
Cyan luminescent:   #00d9ff
Magenta accent:     #ff00ff
Vert néon:          #00ff88
Orange chaud:       #ffaa00
Noir spatial:       #0a0e27
Rose accent:        #ff3366
```

### Modifier les couleurs
Éditer le fichier `.xml` et chercher la section:
```xml
<define color="primary" value="#00d9ff"/>
<define color="secondary" value="#ff00ff"/>
```

Remplacer les valeurs hex par vos propres couleurs.

---

## 🔧 OPTIMISATION POUR BROADCASTS

### Pour flux vidéo en direct:

1. **Performance**:
   - Réduire le nombre de barres d'equalizer si lag
   - Éditer: `<equalizer nb="256"` → `<equalizer nb="128"`

2. **Overlays vidéo**:
   - Le visualiseur est conçu pour fonctionner en overlay sur video master
   - Support natif des video_fx (shader, slideshow)

3. **Résolution**:
   - Optimisé pour 1920x1080 (Full HD)
   - Adapte à d'autres résolutions mais déconseillé

---

## 📱 VARIABLES POUR LA CONFIGURATION EN DIRECT

### Variables disponibles (editables dans VDJ)
```
colorMode      = Sélection thème couleur (0-5)
visualMode     = Mode visualisation (0-3)
displayMode    = Type d'affichage (0-2)
```

Accès: Menu VDJ → Préférences → Skins → Variables

---

## 🎬 UTILISATION

### Basique
1. Ouvrir Virtual DJ
2. Sélectionner le skin dans le sélecteur (Skin dropdown)
3. Charger des morceaux et lancer la musique
4. Les visualiseurs s'animeront en temps réel

### Avancé
- Utiliser les décks pour mixer en direct
- Les waveforms montrent les pistes en temps réel
- L'equalizer réagit à la fréquence du son
- Les couleurs peuvent être changées via variables

---

## 🐛 DÉPANNAGE

### Les visualiseurs ne s'affichent pas
- ✓ Vérifier le chemin du dossier skins
- ✓ S'assurer que `skin.xml` est dans le bon dossier
- ✓ Redémarrer Virtual DJ

### Performance lente / Lag
- ✓ Réduire le nombre de barres d'equalizer
- ✓ Réduire la résolution de l'écran dans VDJ
- ✓ Fermer les applications gourmandes en CPU

### Couleurs ne changent pas
- ✓ Vérifier les variables de couleur
- ✓ Éditer manuellement le .xml
- ✓ Redémarrer VDJ après modification

---

## 📝 NOTES TECHNIQUES

### Librairies & éléments utilisés
- **Equalizer**: Circulaire (256 barres) + Barres (96-256 canaux)
- **Waveforms**: Formes d'onde deck left/right
- **Textures**: Gradients vertical/radial
- **Décor**: Cercles, carrés, lignes avec opacité variable
- **Metadata**: Actions dynamiques (titre, artiste, remix)

### Basé sur
- D0c Thorus Dracula Skin v8 (Atomix Productions)
- Esthétique sci-fi cyberpunk personnalisée
- Optimisé pour AI Premium Studio

---

## 🎵 CONFIGURATION RECOMMANDÉE POUR DJ

### Audio Setup
- Deck 1: Votre source principale
- Deck 2: Source secondaire / SFX
- Master: Sortie principale

### Visual Tweaks
- Augmenter `slow="true"` pour effet plus smoothe
- Diminuer `visibility` % pour subtilité
- Ajuster `decay` pour temps de réaction

---

## 💾 EXPORT & BACKUP

Pour sauvegarder votre configuration personnalisée:
```
1. Dossier: VirtualDJ/Skins/Thorus_Cyberpunk/
2. Copier TOUT le dossier
3. Renommer en "Thorus_Cyberpunk_BACKUP"
4. Sauvegarder sur disque externe
```

---

## 🔗 RESSOURCES

- Virtual DJ Official: https://virtualdj.com
- Skin XML Documentation: https://www.virtualdj.com/wiki
- Atomix Productions: https://www.atomixproductions.com

---

## 📜 LICENCE & CRÉDITS

**Auteur**: Théophile (AI Premium Studio)  
**Basé sur**: D0c Thorus Dracula Skin  
**Remix & Adaptation**: 2026  
**Copyright**: (c) 2026 - AI Premium Studio

---

**Version**: 1.0  
**Dernière mise à jour**: Juin 2026  
**Compatibilité**: Virtual DJ 8+
