# Nerdy Glow Torus — Advanced Animation Scene

Une scène de torus haute performance inspirée de **Epic.mp4** avec effets de glow, animations cubic-bezier nerdy et physique mathématique avancée.

## 🎨 Features

### Glow Effects
- **Multi-layer rendering** - 3 couches de torus avec décalages d'opacité
- **Elastic pulse** - Pulsation lisse basée sur easing curves
- **Neon rings** - Anneaux rotatifs animés autour du torus
- **Adaptive lighting** - Calcul de normale pour l'illumination réaliste

### Cubic-Bezier Animations
```javascript
easeInOutCubic(t) // Smooth S-curve pour les rotations fluides
easeOutElastic(t) // Bounce effect pour les pulsations
```

### Paramètres Contrôlables

| Paramètre | Plage | Description |
|-----------|-------|-------------|
| **Speed** | 0.1-2.0 | Vitesse de rotation du torus |
| **Thickness** | 0.1-0.8 | Épaisseur du tube |
| **Scale** | 0.5-3.0 | Zoom/dégoom |
| **Glow Intensity** | 0-1.5 | Intensité du glow effect |

## 🧮 Mathématiques

### Équation Paramétrique du Torus
```
x = (R + r⋅cos(v)) ⋅ cos(u + time)
y = (R + r⋅cos(v)) ⋅ sin(u + time)
z = r⋅sin(v) + pulse
```

Où:
- **R** = Major radius (rayon principal)
- **r** = Minor radius (rayon du tube)
- **u, v** = Paramètres d'angle [0, 2π]
- **pulse** = Elastic animation modulée par `elasticPulse`

### Easing Curves

**Cubic-In-Out (S-curve smooth)**
```javascript
t < 0.5 ? 4t³ : 1 - (-2t+2)³/2
```
- Démarrage lent → accélération → ralentissement final
- Parfait pour rotations fluides

**Out-Elastic (Bounce)**
```javascript
pow(2, -10t) ⋅ sin((10t - 0.75) ⋅ 2π/4.5) + 1
```
- Rebond naturaliste avec damping exponentiel
- Crée l'effet "pulsy" du glow

## 💫 Layering System

Le rendu multi-couche crée la profondeur:

```
Layer 0 (closest):  1.0x scale, full opacity
Layer 1 (middle):   1.08x scale, 65% opacity
Layer 2 (far):      1.16x scale, 30% opacity
```

Chaque couche:
- A sa propre illumination
- Est rendue indépendamment
- Contribue au glow total

## 🎯 Optimisation

### Performance Tips

1. **Reduce resolution** - Baissez cols/rows pour plus de fps
2. **Lower glow intensity** - Réduit les calculs d'éclairage
3. **Adjust thickness** - Moins de vertices si thickness < 0.3
4. **Tune speed** - Les animations rapides demandent plus d'updates

### Caractères Utilisés

- **Ramp principale** - ` .:-=+*#%@` (densité croissante)
- **Neon rings** - `*` (intensité haute) et `+` (moyenne)

## 🎬 Inspiration: Epic.mp4

Cette scène capture l'essence de l'animation dans Epic.mp4:
- ✨ Glow intensity progressive
- 🔄 Rotations fluides avec cubic-bezier
- 📊 Mathématiques visibles (torus paramétrique)
- 🎨 Color/brightness responsif

## 🎮 Usage Recommendations

### Pour un look minimaliste nerd:
```
Speed: 0.5
Thickness: 0.2
Scale: 1.2
Glow: 0.3
```

### Pour un spectacle intense:
```
Speed: 1.2
Thickness: 0.5
Scale: 2.0
Glow: 1.2
```

### Pour la musique rapide:
```
Speed: 1.5+
Thickness: 0.34 (défaut)
Scale: 1.5
Glow: 0.8
```

## 🧠 Concepts Mathématiques

### Cubic-Bezier vs Linear
- **Linear** - `t` - Motion à vitesse constante
- **Cubic-Bezier** - Interpolation polynomiale - Plus naturel et fluide
- **Elastic** - Fonction trigonométrique avec damping - Rebond physique

### Perspective Projection
```javascript
perspective = 1 / (1 + z * 0.003)
px = centerX + x * perspective * scale
```
Crée l'illusion 3D en projetant en 2D.

### Normal-based Lighting
```javascript
normal = cos(v)  // Angle de surface
lighting = (normal + 1) / 2  // Map [-1,1] → [0,1]
```
Éclairage réaliste basé sur l'orientation de la surface.

## 📚 Advanced Tweaks

### Modifier l'easing curve
```javascript
// Remplacez easeInOutCubic par:
const easeInOutQuad = (t) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t
const easeInOutQuart = (t) => t < 0.5 ? 8*t*t*t*t : 1-Math.pow(-2*t+2,4)/2
```

### Changer la formule du torus
```javascript
// Ajoutez distortion:
const x = (majorRadius + minorRadius * Math.cos(vNorm) * (1 + Math.sin(t) * 0.1)) * ...
```

### Multi-color support
```javascript
// Utilisez différents ramps par layer
const ramp0 = ' ▁▂▃▄▅▆▇█'
const ramp1 = ' ░▒▓█'
```

## ⚡ Performance Metrics

Sur une machine standard:
- **60fps** @ 110×40 grid, Speed 1.0, Glow 0.8
- **45fps** @ 150×60 grid, Speed 1.5, Glow 1.2
- **30fps** @ 240×80 grid, Speed 2.0, Glow 1.5

## 🎓 Learning Resources

Pour comprendre les concepts:
1. **Parametric curves** - Visualisez `cos(u), sin(u)` en 2D/3D
2. **Bezier functions** - Testez différentes courbes sur [desmos.com](https://www.desmos.com)
3. **Persp projection** - Simples formules 3D→2D
4. **ASCII rendering** - Mapping intensité → caractère

## 🔧 Debugging

Si la scène semble figée:
- Vérifiez que `Speed > 0`
- Augmentez `Glow Intensity`
- Réduisez `Thickness` si trop petit

Si les animations sont saccadées:
- Baissez la résolution (cols/rows)
- Réduisez `Speed`
- Déactivez d'autres sources audio

---

**Enjoy the math! 🧮✨**
