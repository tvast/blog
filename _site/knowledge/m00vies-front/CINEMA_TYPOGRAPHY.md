# 🎬 Cinema Typography — L'Errance dans la Nuit

Un système typographique qui traduit l'errance dans la nuit avec le cinéma — une atmosphère de film noir, de dramatisme cinématographique et de mystère nocturne.

## 🌙 L'Univers Typographique

### Concept
Cette typographie crée une narratif cinématique où:
- **Les titres** deviennent des plans d'ouverture (opening shots)
- **Les textes** chuchotent à travers l'obscurité
- **Les accents** illuminent comme des projecteurs (spotlights)
- **Les ombres** ajoutent de la profondeur et du mystère

### Polices Sélectionnées

#### 🎭 Logo: **Cinzel**
- Serif dramatique et énigmatique
- Comme les vieilles enseignes de cinémas (marquees)
- Poids: 400-900
- Usage: Marque, titres monumentaux

#### 🎬 Titres: **Crimson Text**
- Serif élégant avec âme de film noir
- Balance entre classicisme et modernité
- Poids: 400-600
- Usage: Tous les titres (h1-h6)

#### 💻 Corps: **IBM Plex Mono**
- Monospace pour précision technique
- Dualité: poétique + technique
- Poids: 400-600
- Usage: Body text, code, détails

## ✨ Effets Visuels: La Nuit Cinématique

### Text Glows — Les Lumières Nocturnes

```css
/* Hero: Lumière perçant l'obscurité */
--text-glow-hero: 0 0 20px rgba(138, 233, 255, 0.3),
                   0 0 40px rgba(138, 233, 255, 0.15);

/* Heading: Profondeur dans l'obscurité */
--text-glow-heading: 0 0 12px rgba(138, 233, 255, 0.2);

/* Body: Lumière de lecture nocturne */
--text-glow-body: 0 0 8px rgba(138, 233, 255, 0.08);
```

### Text Shadows — L'Atmosphère

Tous les textes ont des ombres qui:
- Ajoutent de la profondeur (cinéma 3D)
- Créent une lecture confortable dans l'obscurité
- Maintiennent le contraste avec le fond noir

## 🎨 Hiérarchie Typographique

### h1 / Hero Title
```css
Font: Crimson Text Bold
Size: clamp(2.5rem, 7vw, 5rem)
Letter-spacing: -0.02em
Line-height: 0.95
Glow: Double couche (brillant + couleur)
```
**Usage**: Titre principal, déclarations dramatiques
**Effet**: Gradient dégradé + glow cyan

### h2 / Display Heading
```css
Font: Crimson Text Semibold
Letter-spacing: -0.01em
Line-height: 1.1
Glow: Glow cyan subtle
```
**Usage**: Section headings, chapitres
**Effet**: Déclaration dramatique

### h3 / Section Subheading
```css
Font: Crimson Text Semibold
Letter-spacing: -0.01em
Glow: Glow très subtle
```
**Usage**: Sous-titres, sous-sections
**Effet**: Accompagnement élégant

### Body / Paragraphe
```css
Font: IBM Plex Mono Regular
Letter-spacing: 0.02em
Line-height: 1.75
Glow: Très subtile (0.05)
```
**Usage**: Texte principal, narration
**Effet**: Lecture confortable et lisible

## 🎯 Classes Utilitaires — Les Outils du Cinéaste

### `.text-dramatic` — Dramatisme Maximal
```html
<h1 class="text-dramatic">Titre Dramatique</h1>
```
- Font-weight: 900
- Letter-spacing: -0.02em
- Triple glow effect
- Pour les déclarations les plus puissantes

### `.text-spotlight` — Le Projecteur
```html
<p class="text-spotlight">Moment crucial</p>
```
- Glow cyan intense
- Ombre profonde
- Pour attirer l'attention sur un passage
- Comme un spotlight sur un acteur

### `.text-noir` — Film Noir Classique
```html
<p class="text-noir">La nuit enveloppa la ville...</p>
```
- Font: Serif italic
- Couleur: Beige chaleureux
- Ombre de film noir
- Pour la narration atmosphérique

### `.text-nocturne` — La Nuit
```html
<span class="text-nocturne">Voix de la nuit</span>
```
- Couleur: Gris chaud
- Ombre profonde
- Letter-spacing: 0.08em
- Pour le texte qui s'efface dans l'obscurité

### `.text-accent` — L'Accent Lumineux
```html
<span class="accent">IMPORTANT</span>
```
- Couleur: Cyan lumineux
- Text-transform: uppercase
- Glow intense
- Pour les éléments clés

### `.text-subtitle` — Sous-titre Cinématique
```html
<p class="text-subtitle">Bande-annonce</p>
```
- Monospace, uppercase
- Letter-spacing: 0.04em
- Style documentaire
- Pour les descriptifs

### `.text-credits` — Générique
```html
<p class="text-credits">Production</p>
```
- Font: Cinzel
- Letter-spacing: 0.08em
- Couleur: Beige tamisé
- Comme le générique d'un film

### `.text-fade` — La Dernière Image
```html
<p class="text-fade">Fin...</p>
```
- Couleur très foncée
- Font-weight: 300
- Ombre profonde
- Pour les finales, conclusions

## 🎬 Animations — Le Mouvement du Film

### `cinema-glow` — Respiration Lumineuse
```css
animation: cinema-glow 2s ease-in-out infinite;
```
- Glow qui pulse doucement
- Appliqué au hover sur h1, h2
- Simule la respiration d'une scène

### `night-flicker` — Scintillement Nocturne
```css
animation: night-flicker 4s linear infinite;
```
- Comme un projecteur défaillant
- Très subtil (ne distrait pas)
- Pour `.text-emphasis`

## 📐 Espacements Typographiques

### Letter-spacing (--ls-*)
```
--ls-hero: -0.02em      ← Serré, dramatique
--ls-heading: -0.01em   ← Élégant
--ls-body: 0.02em       ← Lisible, aéré
--ls-mono: 0.03em       ← Code, précision
```

### Line-height (--lh-*)
```
--lh-hero: 0.95         ← Compact, puissant
--lh-heading: 1.1       ← Dramatique
--lh-body: 1.75         ← Confortable
--lh-mono: 1.65         ← Code
```

### Font-weight (--fw-*)
```
--fw-light: 300
--fw-regular: 400
--fw-medium: 500
--fw-semibold: 600
--fw-bold: 700
--fw-black: 900
```

## 🌍 Responsivité — Le Reframe Cinématique

La typographie s'adapte comme le cadrage d'une caméra:

### Desktop (> 1200px)
- Tailles complètes
- Glows pleins
- Espacements maximaux

### Tablet (768px - 1200px)
- Tailles réduites (clamp)
- Glows adaptés
- Espacements normaux

### Mobile (< 768px)
- Tailles très réduites mais lisibles
- Glows subtils
- Line-height resserrée

## 💡 Guide d'Utilisation

### Pour une Page de Démarrage
```html
<h1 class="text-dramatic">Bienvenue</h1>
<p class="text-noir">
  La nuit enveloppe votre voyage cinématique...
</p>
<button class="cta">
  <span class="accent">COMMENCER</span>
</button>
```

### Pour une Section de Contenu
```html
<h2>Chapitre I: L'Aube</h2>
<p>Texte standard avec glow subtile...</p>
<p class="text-spotlight">
  Un moment crucial illuminé comme un projecteur.
</p>
```

### Pour du Code / Terminal
```html
<pre><code class="mono">$ cinema night-mode</code></pre>
```

### Pour les Éléments Interactifs
```html
<a href="#">
  <span class="text-subtitle">Explore</span>
  <span class="accent">→</span>
</a>
```

## 🎓 Principes de Design

### 1. **Hiérarchie Visuelle Cinématique**
- Les titres illuminent comme des projecteurs
- Le corps du texte chuchote dans l'obscurité
- Les accents coupent l'obscurité comme une lumière

### 2. **Lisibilité Nocturne**
- Contraste élevé (blanc sur noir)
- Glows subtils (pas envahissants)
- Line-height généreux pour la lecture

### 3. **Atmosphère Cohérente**
- Toutes les couleurs dans la palette cyan/blue
- Ombres pour la profondeur
- Polices serif pour l'élégance

### 4. **Performance**
- Glows CSS natifs (pas d'images)
- Animations optimisées (transform/opacity)
- Fonts Google (chargement asynchrone)

## 🎭 Inspirations Cinématiques

### Film Noir (1940s-1950s)
- Ombres dramatiques
- Contraste élevé
- Typographie élégante

### Cinéma Moderne (2000s-2020s)
- Minimalisme
- Espacements généreux
- Interactions subtiles

### Bande-Annonces (Trailers)
- Impact immédiat
- Lectures rapides
- Dramatisme maximal

## 📚 Ressources Typographiques

### Polices Utilisées
- **Cinzel** - Google Fonts (dramatic serif)
- **Crimson Text** - Google Fonts (elegant serif)
- **IBM Plex Mono** - Google Fonts (technical mono)

### Fallbacks
- Si Cinzel échoue → Kilo → serif
- Si Crimson échoue → Playfair Display → serif
- Si IBM Plex échoue → monospace

## 🔍 Vérifier la Typographie

Tous les éléments suivants doivent afficher la typographie correcte:

- [ ] h1 avec glow double couche
- [ ] h2-h6 avec glow cyan
- [ ] Body text lisible et avec glow subtile
- [ ] Code/mono avec glow terminal
- [ ] Accents avec glow intense
- [ ] Hover animations sur titres
- [ ] Responsive sur mobile

## 🚀 Intégration

La typographie est importée dans `main.ts`:

```typescript
import './css/cinema-typography.css'
```

Elle s'applique globalement à toute l'application via:
- Variables CSS (--font-*, --text-glow-*, --ls-*, --lh-*)
- Sélecteurs d'éléments (h1-h6, body, code, etc.)
- Classes utilitaires (.text-*, .accent, .cta)

---

**Status:** ✅ Système complet
**Polices:** 3 (Cinzel, Crimson Text, IBM Plex Mono)
**Animations:** 2 (cinema-glow, night-flicker)
**Classes Utilitaires:** 8
**Glows:** 3 niveaux
**Responsive:** Mobile-first

**Ambiance:** 🌙 Nocturne, dramatique, cinématique
