# THORUS CYBERPUNK - GUIDE AVANCÉ & CUSTOMIZATION
## Tweaks, Variantes et Optimisations Professionnelles

---

## 🎨 PALETTE COULEURS PRÉDÉFINIES

### Thème A: Neon Synthwave
```xml
<define color="primary" value="#ff00ff"/>      <!-- Magenta hot -->
<define color="secondary" value="#00ffff"/>    <!-- Cyan vif -->
<define color="tertiary" value="#ff0080"/>     <!-- Rose néon -->
<define color="accent" value="#ffff00"/>       <!-- Jaune brillant -->
```

### Thème B: Voidwave (Minimaliste)
```xml
<define color="primary" value="#0066ff"/>      <!-- Bleu électrique -->
<define color="secondary" value="#00ff00"/>    <!-- Vert Matrix -->
<define color="tertiary" value="#333333"/>     <!-- Gris neutre -->
<define color="accent" value="#666666"/>       <!-- Gris accent -->
```

### Thème C: Nuclear Waste
```xml
<define color="primary" value="#00ff00"/>      <!-- Vert fluo -->
<define color="secondary" value="#ffaa00"/>    <!-- Orange radioactif -->
<define color="tertiary" value="#00ff00"/>     <!-- Lime -->
<define color="accent" value="#ff00ff"/>       <!-- Magenta -->
```

### Thème D: Deep Space (Sombre)
```xml
<define color="primary" value="#1a8cff"/>      <!-- Bleu océan -->
<define color="secondary" value="#a020f0"/>    <!-- Violet profond -->
<define color="tertiary" value="#00d9ff"/>     <!-- Cyan glacé -->
<define color="accent" value="#ff0080"/>       <!-- Rose -->
```

---

## ⚡ OPTIMISATION PERFORMANCE

### Pour faible CPU (Gaming + DJ)
```xml
<!-- Réduire barres equalizer -->
<equalizer nb="96" type="circle" ...>    <!-- Avant: 256 -->

<!-- Réduire décor -->
<visual visibility="5%">                 <!-- Avant: 15% -->

<!-- Ralentir animation -->
<equalizer ... slow="true" decay="slow"> <!-- Ajouter decay -->
```

### Pour serveur streaming haute perf
```xml
<!-- Maxer barres pour détail -->
<equalizer nb="512" type="circle" ...>   <!-- Ultra détail -->

<!-- Ajouter plus de effects -->
<!-- Doubler waveforms -->
<!-- Ajouter spectrum analyzer 2nd -->
```

### Pour broadcast/projector
```xml
<!-- Enlever éléments latéraux (sauver CPU) -->
<!-- Garder tore central + city lights -->
<!-- Réduire opacity des backgrounds -->
<!-- Augmenter borders pour clarté -->
```

---

## 🎯 MODIFICATIONS PAR CAS D'USAGE

### LIVE SET / CLUB
**Recommandation**: vdj_thorus_cyberpunk_x.xml

**Tweaks**:
```xml
<!-- Augmenter taille text -->
<text size="48" ... />        <!-- Visible de loin -->

<!-- Waveforms plus grands -->
<size width="300" height="600" />  <!-- Plus détail -->

<!-- City lights plus visibles -->
<equalizer nb="128" width="1.5" /> <!-- Barres plus épaisses -->
```

### FESTIVAL / PROJECTION GÉANTE
**Recommandation**: vdj_thorus_cyberpunk.xml avec mods

**Tweaks**:
```xml
<!-- Tore ULTRA grand -->
<size width="1200" height="1200" />  <!-- 80% écran -->

<!-- Texte très gros -->
<text size="72" color="main_color" weight="bold" />

<!-- Glow effects maximisés -->
<visual visibility="30%"> <!-- Avant: 10% -->
```

### RADIO / STREAM EN LIGNE
**Recommandation**: Variante minimaliste custom

**Setup optimal**:
- Waveforms centraux seulement
- Metadata grand et clair
- Spectrum analyzer détaillé
- Pas de décor distrayant
- Couleurs constantes (pas de transitions)

```xml
<!-- Exemple config radio -->
<group name="radio_clean" x="200" y="200">
	<equalizer nb="512" type="bar" color="main_color" 
	           width="0.5" slow="false">
		<pos x="0" y="0"/>
		<size width="1520" height="600"/>
	</equalizer>
</group>
```

### HOME STUDIO / PRODUCTION
**Recommandation**: Variante avec waveforms haute résolution

**Config**:
```xml
<!-- Waveforms énormes pour monitoring -->
<waveform source="left" ... >
	<size width="800" height="600"/>
</waveform>

<!-- Spectrum détaillé (512+ barres) -->
<equalizer nb="512" type="bar" ... />

<!-- Temps code visible -->
<textzone action="get_duration" .../>
<textzone action="get_elapsed_time" .../>
```

---

## 🔴 CUSTOMIZATION AVANCÉE

### Ajouter un VU Meter (Niveaux audio)
```xml
<!-- Insérer dans un <group> -->
<vumeter color="main_color" color2="secondary" 
          visibility="deck master">
	<pos x="1800" y="100"/>
	<size width="80" height="200"/>
</vumeter>
```

### Ajouter un Beat Meter (BPM visuel)
```xml
<!-- Pulse avec le beat -->
<circle color="main_color" radius="50" 
        visibility="deck master motion 'beat'">
	<pos x="960" y="540"/>
	<size width="100" height="100"/>
</circle>
```

### Ajouter un Scope Oscilloscope (Forme d'onde avancée)
```xml
<!-- Alternative waveform (style oscilloscope) -->
<scope source="master" color="secondary" 
       visibility="deck master">
	<pos x="600" y="600"/>
	<size width="720" height="200"/>
</scope>
```

### Ajouter des Indicateurs Deck (Playing, Cue, Sync)
```xml
<!-- Indicateur "PLAYING" -->
<textzone deck="master" visibility="deck master motion 'playing'">
	<pos x="1850" y="50"/>
	<size width="50" height="30"/>
	<text size="12" color="tertiary" weight="bold" format="●"/>
</textzone>

<!-- Indicateur Sync Active -->
<textzone deck="master" visibility="deck master button_pressed 'sync'">
	<pos x="1850" y="90"/>
	<size width="50" height="30"/>
	<text size="12" color="glow_green" weight="bold" format="SYNC"/>
</textzone>
```

---

## 🎬 EFFETS VIDÉO & SHADER

### Ajouter effet "Matrix Rain"
```xml
<video source="master" 
       visibility="deck master video_fx 'shader 
       name=matrix_rain'">
	<pos x="0" y="0"/>
	<size width="1920" height="1080"/>
</video>
```

### Ajouter effet Slideshow (Transition entre tracks)
```xml
<video source="master" 
       visibility="deck master video_fx 'slideshow'">
	<pos x="0" y="0"/>
	<size width="1920" height="1080"/>
</video>
```

### Freeze Frame (Photo du track album art)
```xml
<visual>
	<pos x="0" y="0"/>
	<size width="1920" height="1080"/>
	<off x="0" y="1080" />  <!-- Album art offset -->
</visual>
```

---

## 📊 CRÉER UNE VARIANTE MINIMALISTE

### Fichier: vdj_thorus_minimal.xml (Template)
```xml
<?xml version="1.0" encoding="utf-8"?>
<skin name="Thorus Minimal" version="8" 
      width="1920" height="1080">

<video source="master">
	<pos x="0" y="0"/>
	<size width="1920" height="1080"/>
</video>

<!-- Fond noir pur -->
<visual>
	<pos x="0" y="0"/>
	<size width="1920" height="1080"/>
	<off color="#000000" color2="#000000"/>
</visual>

<!-- Tore central MINIMALISTE -->
<group x="960" y="540">
	<!-- Juste 1 equalizer circulaire -->
	<equalizer nb="256" type="circle" 
	          color="#00d9ff" width="0.6" slow="true">
		<pos x="0" y="0"/>
		<size width="600" height="600"/>
	</equalizer>
	
	<!-- Texte minimaliste -->
	<textzone align="center" deck="master">
		<pos x="-200" y="-30"/>
		<size width="400" height="60"/>
		<text size="32" color="#00d9ff" weight="bold" 
		      action="get_title_before_remix"/>
	</textzone>
</group>

<!-- Spectrum bas (optionnel) -->
<group x="200" y="900">
	<equalizer nb="128" type="bar" color="#00d9ff" 
	          width="0.8" slow="true">
		<pos x="0" y="0"/>
		<size width="1520" height="150"/>
	</equalizer>
</group>

</skin>
```

---

## 🎛️ TWEAKS PAR GENRE MUSICAL

### Pour Techno / Industrial
```xml
<!-- Augmenter réactivité bass -->
<equalizer ... bass="left" decay="very_fast" />

<!-- Couleurs froides -->
<define color="primary" value="#0066ff"/>     <!-- Bleu -->
<define color="secondary" value="#00ffff"/>   <!-- Cyan -->

<!-- City lights très prononcées -->
<equalizer nb="256" width="1.2" />
```

### Pour House / Groove
```xml
<!-- Decay moyen pour effet groovy -->
<equalizer ... bass="middle" decay="medium" />

<!-- Couleurs warmth -->
<define color="primary" value="#ffaa00"/>     <!-- Orange -->
<define color="secondary" value="#ff6600"/>   <!-- Or-rouge -->

<!-- Spectrum mirrorred (symétrique) -->
<equalizer ... mirror="true" />
```

### Pour DnB / Breaks
```xml
<!-- Réactivité maximale -->
<equalizer ... slow="false" decay="very_fast" />

<!-- Couleurs chaudes/électriques -->
<define color="primary" value="#ff00ff"/>     <!-- Magenta -->
<define color="secondary" value="#00ff00"/>   <!-- Vert -->

<!-- Barres très fines (détail) -->
<equalizer nb="512" width="0.3" />
```

### Pour Ambient / Chill
```xml
<!-- Très lent, smooth -->
<equalizer ... slow="true" decay="very_slow" />

<!-- Couleurs douces -->
<define color="primary" value="#4488ff"/>     <!-- Bleu pastel -->
<define color="secondary" value="#88ffff"/>   <!-- Cyan clair -->

<!-- Moins de barres, effet spacieux -->
<equalizer nb="64" width="2.0" />
```

---

## 🔗 INTÉGRATIONS POSSIBLES

### Avec Teleprompter / Lyrics
```xml
<!-- Zone dédiée aux paroles en bas -->
<textzone group="lyrics" align="center">
	<pos x="200" y="950"/>
	<size width="1520" height="100"/>
	<text size="24" color="secondary" format="[Paroles synchronized]"/>
</textzone>
```

### Avec système de chat / Twitch
```xml
<!-- Chat overlay corner -->
<group name="twitch_chat" x="1600" y="100" visibility="50%">
	<square color="dark_bg" visibility="60%" border="1" 
	       border_color="main_color">
		<pos x="0" y="0"/>
		<size width="300" height="600"/>
	</square>
	<!-- Connecter via plugin MCP ou API -->
</group>
```

### Avec contrôleurs MIDI
```xml
<!-- Display state de boutons MIDI -->
<textzone>
	<pos x="100" y="100"/>
	<text format="Pad 1: [action_button_1_state]"/>
</textzone>
```

---

## 🚨 OPTIMISATION POUR STREAMERS

### OBS Integration Checklist
- [ ] Résolution fixée à 1920x1080
- [ ] 60 FPS stable dans VDJ
- [ ] CPU < 30% charge
- [ ] Pas de décalage audio-video
- [ ] Colors calibrées pour stream

### Settings OBS recommandés
```
Capture: Window Capture (VirtualDJ)
FPS: 60
Bitrate: 6000-8000 kbps
Encoding: H.264 (CPU) ou NVENC (GPU)
```

---

## 📱 RESPONSIVE DESIGN (Adaptable écrans)

### Pour écran 4:3 (1024x768)
```xml
<!-- Scaler tout par 0.5 -->
<pos x="960" y="540"/>  <!-- → 480, 270 -->
<size width="1920" .../>  <!-- → 960 ... -->
```

### Pour ultra-wide (3440x1440)
```xml
<!-- Augmenter distance entre éléments -->
<pos x="400" .../>   <!-- Plus espacé gauche -->
<pos x="1520" .../> <!-- Distant droite -->
```

---

## 🎓 DEBUGGING TIPS

### Voir l'accessibility tree
- Ouvrir Virtual DJ
- Menu: Skin > Developer Tools (si disponible)
- Inspecter les éléments avec F12

### Logs & Erreurs
```
Windows: Documents/VirtualDJ/Logs
Mac: ~/Library/Logs/VirtualDJ
Linux: ~/.VirtualDJ/Logs
```

### Validator XML
```bash
# Utiliser un validateur XML
# https://www.xmlvalidation.com/
# Copier coller le contenu du skin.xml
```

---

## 📈 BENCHMARK & PERFORMANCE

### Checker performance VDJ
- Aller à Preferences > DVS/Video
- Regarder CPU%, RAM, GPU%
- Ajuster skin settings jusqu'à < 50% CPU

### Profiling (Avancé)
```xml
<!-- Ajouter temporaire pour test -->
<textzone>
	<text format="CPU: [system_cpu_load]%"/>
</textzone>
```

---

## 🎬 EXPORTS & CONVERSIONS

### Exporter en image haute résolution
- Faire screenshot de 1920x1080
- Exporter en PNG/TIFF
- Upscaler via AI si nécessaire

### Créer animation (Looper)
- Enregistrer 30 secondes de mix
- Exporter vidéo
- Loop dans OBS/Resolume

---

## 🔗 RESSOURCES & LIENS UTILES

**Virtual DJ Skins Forums**: https://www.virtualdj.com/forum
**SkinEditor Tool**: https://www.virtualdj.com/download/skineditor.html
**Color Picker**: https://htmlcolorcodes.com
**XML Validator**: https://www.xmlvalidation.com

---

## 💡 TIPS & TRICKS FINAUX

1. **Save backups réguliers** de vos configurations
2. **Test sur 2-3 machines** avant go live
3. **Ajuster couleurs selon lighting** de votre venue
4. **Documenter vos mods** personnels
5. **Partager vos variantes** avec la communauté!

---

**Version**: 1.0 Advanced  
**Dernière mise à jour**: Juin 2026  
**Auteur**: Théophile / AI Premium Studio
