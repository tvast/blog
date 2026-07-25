# POKEMON THORUS BLUE - GUIDE COMPLET
## Installation, Configuration & Animation Tweaks

---

## 📦 **FICHIERS INCLUS**

### Version 1: Standard Animée
- **vdj_pokemon_thorus_blue.xml** - 30+ animations, équilibre perf/visuel
- Pokéballs orbiting, header animé, city lights pulsant

### Version 2: ULTRA Extrême
- **vdj_pokemon_thorus_blue_ultra.xml** - 50+ animations simultanées
- Toutes les animations cranked au max, spectre 768 barres, particules partout
- ⚠️ **CPU INTENSE** - Recommandé pour machine puissante

---

## 🚀 **QUICK START (5 minutes)**

### Étape 1: Localiser le dossier skins
```
Windows:
C:\Users\[NomUtilisateur]\AppData\Local\VirtualDJ\Skins

Mac:
~/Library/Application Support/VirtualDJ/Skins

Linux:
~/.VirtualDJ/Skins
```

### Étape 2: Créer les dossiers
```
VirtualDJ/Skins/Pokemon_Thorus_Blue/
VirtualDJ/Skins/Pokemon_Thorus_Ultra/
```

### Étape 3: Placer les fichiers XML
```
Pokemon_Thorus_Blue/
  └─ skin.xml  (copier vdj_pokemon_thorus_blue.xml ici)

Pokemon_Thorus_Ultra/
  └─ skin.xml  (copier vdj_pokemon_thorus_blue_ultra.xml ici)
```

### Étape 4: Redémarrer VDJ
- Fermer complètement
- Relancer
- Les skins apparaissent dans le sélecteur!

---

## 🎨 **PALETTE COULEURS POKEMON**

### Couleurs intégrées
```
Bleu foncé:    #0d47a1  (Pokemon Dark)
Bleu primaire: #0052CC  (Pokemon Blue)
Cyan:          #00D9FF  (Pikachu Electric)
Jaune:         #FFFF00  (Pikachu Pure)
Rouge:         #FF1744  (Pokéball)
Blanc:         #FFFFFF  (Accent)
Violet:        #7B2CBF  (Psychique)
Vert:          #00FF41  (Poison)
Orange:        #FF6D00  (Feu)
```

### Changer de couleur
Éditer le XML et chercher:
```xml
<define color="poke_cyan" value="#00D9FF"/>
```

Remplacer par votre couleur hex préférée.

---

## ⚡ **ANIMATIONS DISPONIBLES**

### Types d'animations implémentées
```
rotate_360     → Rotation continue
pulse          → Pulsation (beat sync possible)
slide_up       → Montée
slide_down     → Descente
slide_left     → Vers la gauche
slide_right    → Vers la droite
fade_in_out    → Apparition/disparition
scale          → Agrandissement/rétrécissement
```

### Attributs animation
```xml
animation="rotate_360"   <!-- Type d'animation -->
speed="8"                <!-- Vitesse (1-10, plus = plus rapide) -->
visibility="50%"         <!-- Opacité (0-100%) -->
```

---

## 🔧 **TWEAKS DE PERFORMANCE**

### Si c'est TROP LAGGY:

**Réduire les barres d'equalizer:**
```xml
<!-- Avant (standard) -->
<equalizer nb="512" type="circle" ...>

<!-- Après (léger) -->
<equalizer nb="256" type="circle" ...>
```

**Ralentir les animations:**
```xml
<!-- Avant -->
animation="rotate_360" speed="8"

<!-- Après (plus lent) -->
animation="rotate_360" speed="4"
```

**Réduire les pulsations:**
```xml
<!-- Avant -->
animation="pulse" speed="4"

<!-- Après -->
animation="pulse" speed="1"
```

**Diminuer opacités:**
```xml
<!-- Avant -->
visibility="15%"

<!-- Après -->
visibility="5%"
```

### Si c'est TROP LENT / PAS ASSEZ VISUEL:

**Augmenter les barres:**
```xml
<equalizer nb="768" type="circle" ...>
```

**Accélérer animations:**
```xml
animation="rotate_360" speed="12"
animation="pulse" speed="5"
```

**Augmenter opacités:**
```xml
visibility="25%"
```

---

## 🎯 **CONFIGURATION RECOMMANDÉE PAR MACHINE**

### Machine basique (Intel i5 / Ryzen 5)
✓ Utiliser: **vdj_pokemon_thorus_blue.xml**
✓ Réduire nb à 256-384 barres
✓ Vitesses d'animation: 1-4

### Machine standard (Intel i7 / Ryzen 7)
✓ Utiliser: **vdj_pokemon_thorus_blue.xml**
✓ Settings de base (512 barres)
✓ Vitesses: 2-6

### Machine puissante (i9 / Ryzen 9 / GPU dédié)
✓ Utiliser: **vdj_pokemon_thorus_blue_ultra.xml**
✓ Augmenter à 768 barres
✓ Vitesses: 4-8+

---

## 🎨 **CRÉER VOTRE PROPRE THÈME**

### Variante: Pokemon Red Edition

```xml
<!-- Remplacer la section couleurs -->
<define color="poke_blue_dark" value="#8B0000"/>    <!-- Rouge foncé -->
<define color="poke_blue_main" value="#CC0000"/>    <!-- Rouge primaire -->
<define color="poke_cyan" value="#FFD700"/>         <!-- Or -->
<define color="poke_yellow" value="#FF1744"/>       <!-- Rose -->
<define color="poke_red" value="#FFFF00"/>          <!-- Jaune inverse -->
```

### Variante: Pokemon Green Edition

```xml
<define color="poke_blue_dark" value="#1a4d2e"/>    <!-- Vert foncé -->
<define color="poke_blue_main" value="#2d6a4f"/>    <!-- Vert primaire -->
<define color="poke_cyan" value="#52B788"/>         <!-- Vert clair -->
<define color="poke_yellow" value="#FFD60A"/>       <!-- Jaune -->
<define color="poke_red" value="#FF006E"/>          <!-- Rose -->
```

### Variante: Pokemon Yellow (Pikachu) Edition

```xml
<define color="poke_blue_dark" value="#FFB700"/>    <!-- Or foncé -->
<define color="poke_blue_main" value="#FFD700"/>    <!-- Or -->
<define color="poke_cyan" value="#FFFF00"/>         <!-- Jaune pur -->
<define color="poke_yellow" value="#FF6B00"/>       <!-- Orange -->
<define color="poke_red" value="#DC143C"/>          <!-- Crimson -->
```

---

## 📊 **STRUCTURE LAYERS (Qu'est-ce que tu vois)**

### Central Thorus (Standard)
1. **Orbites externes** (rotation rapide) - Pokéballs
2. **Equalizer circulaire** (512 barres) - CŒUR visuel
3. **Ring électrique** (pulsant) - Effet scifi
4. **Cercle interne** (dark) - Contraste
5. **Métadonnées** (titre, artiste, remix) - Info

### City Lights (Bottom)
- **256 barres** verticales style skyline urbain
- **Très réactif** aux basses (bass="left")
- **Animations rapides** (decay="very_fast")

### Waveforms (Sides)
- **Gauche**: Source LEFT deck (Cyan + Yellow)
- **Droite**: Source RIGHT deck (Yellow + Red)
- **12+ animations** chacun

### Spectrum (Center)
- **512-768 barres** ultra-détail
- **Mirrored** (symétrique)
- **Très réactif** (decay="very_fast")

---

## 🎬 **ANIMATIONS EXPLIQUÉES**

### Animation Types & Effects

**Rotate_360:**
```xml
animation="rotate_360" speed="8"
<!-- Tourne continuellement -->
<!-- speed 1-2: très lent (30sec par rotation) -->
<!-- speed 5-8: normal (5-10sec par rotation) -->
<!-- speed 10+: hyper-rapide (< 5sec) -->
```

**Pulse:**
```xml
animation="pulse" speed="3"
<!-- Pulsation respiratoire -->
<!-- speed 1-2: respirant (doucement) -->
<!-- speed 3-5: normal (au rythme) -->
<!-- speed 6+: épileptique (flashy) -->
```

**Slide (Up/Down/Left/Right):**
```xml
animation="slide_up" speed="3"
<!-- Mouvement linéaire -->
<!-- Boucle automatiquement -->
```

**Fade_in_out:**
```xml
animation="fade_in_out" speed="2"
<!-- Apparition/disparition -->
<!-- Très lisible pour mettre en avant le contenu -->
```

**Scale:**
```xml
animation="scale" speed="1"
<!-- Agrandissement/rétrécissement -->
<!-- Utilisé pour les textes (grosse → normale) -->
```

---

## 🎛️ **OPTIMISER POUR SON GENRE MUSICAL**

### Techno / Industrial
```xml
<!-- Augmenter réactivité -->
<equalizer ... decay="very_fast" slow="false" />
<equalizer nb="768" ... />  <!-- Plus barres -->

<!-- Couleurs froides -->
<define color="poke_cyan" value="#00BFFF"/>
<define color="poke_yellow" value="#00FFFF"/>

<!-- Vitesses animation très rapides -->
animation="pulse" speed="5-8"
```

### House / EDM
```xml
<!-- Décay moyen pour groove -->
<equalizer ... decay="medium" slow="true" />

<!-- Couleurs chaudes -->
<define color="poke_yellow" value="#FFD700"/>
<define color="poke_red" value="#FF6B00"/>

<!-- Vitesses normales -->
animation="pulse" speed="2-4"
```

### Drum & Bass
```xml
<!-- TRÈS réactif -->
<equalizer ... decay="very_fast" slow="false" />
<equalizer nb="768" width="0.15" />  <!-- Barres fines -->

<!-- Couleurs électriques -->
<define color="poke_cyan" value="#00FF00"/>
<define color="poke_yellow" value="#FFFF00"/>

<!-- Animations hyper-rapides -->
animation="pulse" speed="6-10"
```

### Ambient / Chill
```xml
<!-- TRÈS lent, smooth -->
<equalizer ... decay="very_slow" slow="true" />
<equalizer nb="128" width="2.0" />  <!-- Barres épaisses -->

<!-- Couleurs douces -->
<define color="poke_cyan" value="#6699FF"/>
<define color="poke_yellow" value="#CCFFFF"/>

<!-- Animations très lentes -->
animation="pulse" speed="1-2"
```

---

## 🔴 **CRÉER VARIANTE POKÉMON PERSONNALISÉE**

### Template: Thème Custom

```xml
<?xml version="1.0" encoding="utf-8"?>
<skin name="Thorus Pokemon [VOTRE NOM]" version="8" 
      width="1920" height="1080">

<video source="master">
	<pos x="0" y="0"/>
	<size width="1920" height="1080"/>
</video>

<!-- COULEURS CUSTOM -->
<define color="poke_blue_dark" value="#[VOTRE HEX]"/>
<define color="poke_blue_main" value="#[VOTRE HEX]"/>
<define color="poke_cyan" value="#[VOTRE HEX]"/>
<define color="poke_yellow" value="#[VOTRE HEX]"/>
<define color="poke_red" value="#[VOTRE HEX]"/>

<!-- Copier tout du contenu de vdj_pokemon_thorus_blue.xml -->
<!-- (Tout entre <video> et </skin>) -->

</skin>
```

---

## 📈 **PERFORMANCE MONITORING**

### Checker les stats dans VDJ

**Menu Path:**
```
Menu → Preferences → General → Performance
```

**Regarder:**
- CPU Load: < 50% (idéal)
- RAM: Check que pas d'overflow
- GPU: Si disponible, devrait être < 30%

**Si laggy:**
1. Réduire nb barres (256 → 128)
2. Ralentir animations (speed/2)
3. Baisser opacités (-10%)
4. Passer à version non-ultra

---

## 🎯 **ADVANCED TWEAKS**

### Ajouter plus de Pokéballs

```xml
<!-- Template: Pokéball orbiting -->
<group animation="rotate_360" speed="10">
	<circle color="poke_red" radius="25" visibility="75%" 
	       border="2" border_color="poke_white">
		<pos x="0" y="-480"/>  <!-- TOP - Change position -->
		<size width="50" height="50"/>
	</circle>
</group>
```

**Positions (autour du tore):**
- TOP: `x="0" y="-480"`
- BOTTOM: `x="0" y="480"`
- LEFT: `x="-480" y="0"`
- RIGHT: `x="480" y="0"`
- DIAGONALES: `x="340" y="340"` (etc)

### Ajouter texte "Pikachu" pulsant

```xml
<textzone align="center" animation="pulse" speed="3">
	<pos x="0" y="0"/>
	<size width="400" height="80"/>
	<text size="64" color="poke_yellow" weight="bold" 
	      format="⚡ PIKACHU ⚡"/>
</textzone>
```

### Ajouter Pokémon moves (éclair stylisé)

```xml
<!-- Éclair vertical (animation montante) -->
<visual animation="slide_up" speed="6" visibility="8%">
	<pos x="0" y="0"/>
	<size width="100" height="1080"/>
	<off color="poke_yellow" color2="transparent" 
	    gradient="vertical" shape="square" />
</visual>
```

---

## 🐛 **DÉPANNAGE**

### Problème: Skin ne s'affiche pas

✓ Vérifier chemin du dossier (pas de typos)
✓ S'assurer que le fichier s'appelle exactement `skin.xml`
✓ Redémarrer VDJ (fermer complètement)
✓ Vérifier XML valide (https://www.xmlvalidation.com)

### Problème: Très laggy

✓ Réduire `nb` des equalizers
✓ Ralentir `speed` des animations
✓ Réduire `visibility` des éléments
✓ Fermer autres apps gourmandes

### Problème: Texte pas visible

✓ Augmenter `size` du texte
✓ Changer `color` (contraste)
✓ Augmenter `visibility` si transparency

### Problème: Couleurs bizarres

✓ Vérifier format hex: `#RRGGBB` (6 chiffres)
✓ Utiliser https://htmlcolorcodes.com pour picker
✓ Pas d'espace dans les valeurs couleur

---

## 🎓 **RESSOURCES**

- **Virtual DJ Skins Docs**: https://www.virtualdj.com/wiki/Skins
- **Color Picker**: https://htmlcolorcodes.com
- **XML Validator**: https://www.xmlvalidation.com
- **Pokemon Color Refs**: https://bulbapedia.bulbagarden.net

---

## 📝 **CHANGELOG**

### v1.0 (2026-06-14)
- ✅ Standard version: 30+ animations
- ✅ ULTRA version: 50+ animations
- ✅ Full Pokemon Blue palette
- ✅ 384-512 barres equalizers
- ✅ Multi-layer Thorus
- ✅ Waveforms hyper-animés
- ✅ Pokéballs orbiting

---

## 💾 **BACKUP & SHARING**

### Sauvegarder ta config
```
1. Dossier: VirtualDJ/Skins/Pokemon_Thorus_Blue/
2. Copier le dossier ENTIER
3. Renommer en "Pokemon_Thorus_Blue_BACKUP_[DATE]"
4. Stocker sur disque externe / cloud
```

### Partager avec la communauté
- Archive: Zipper le dossier skin entier
- Partager sur VirtualDJ Forums
- Tag: #PokemonThorus #VirtualDJ

---

## 🎉 **BONUS TIPS**

1. **Mixer la musique** avec les animations = vrai spectacle
2. **Enregistrer un set** avec le skin → bonne vidéo YouTube
3. **Essayer ULTRA** sur belle machine = épique
4. **Changer couleurs** selon l'heure / l'événement
5. **Layer** plusieurs instances VDJ pour dupliqueurs

---

**Enjoy your Pokemon Thorus experience! ⚡⚡⚡**

Version: 1.0  
Date: Juin 2026  
Auteur: Théophile / AI Premium Studio
