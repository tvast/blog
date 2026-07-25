# THORUS CYBERPUNK - SNIPPETS & CODE EXAMPLES
## Copier-coller pour créer vos propres variantes

---

## 📦 SNIPPET 1: Equalizer Circulaire Basique

```xml
<!-- Tore circulaire simple avec métadonnées -->
<group name="torus_basic" x="960" y="540">
	<!-- Cercles concentriques décor -->
	<circle color="transparent" radius="350" visibility="10%" 
	        border="1" border_color="main_color">
		<pos x="0" y="0"/>
		<size width="700" height="700"/>
	</circle>
	
	<!-- Equalizer 256 barres -->
	<equalizer nb="256" type="circle" color="main_color" 
	          width="0.8" slow="true" bass="middle" mirror="false">
		<pos x="0" y="0"/>
		<size width="700" height="700"/>
	</equalizer>
	
	<!-- Cercle intérieur sombre -->
	<circle color="#000000" radius="250" visibility="70%" 
	        border="2" border_color="main_color">
		<pos x="0" y="0"/>
		<size width="500" height="500"/>
	</circle>
	
	<!-- Titre centré -->
	<textzone align="center" deck="master">
		<pos x="-200" y="-30"/>
		<size width="400" height="60"/>
		<text size="28" color="main_color" weight="bold" 
		      action="get_title_before_remix"/>
	</textzone>
</group>
```

---

## 📦 SNIPPET 2: City Lights / Skyline Equalizer

```xml
<!-- Barres verticales style skyline urbain -->
<group name="city_lights_panel" x="100" y="800">
	<!-- Fond subtle -->
	<square color="main_color" visibility="5%">
		<pos x="0" y="0"/>
		<size width="1720" height="280"/>
	</square>
	
	<!-- Ligne supérieure -->
	<square color="main_color" visibility="50%">
		<pos x="0" y="0"/>
		<size width="1720" height="3"/>
	</square>
	
	<!-- Equalizer barres (inégales = skyline) -->
	<equalizer nb="128" type="bar" color="main_color" 
	          width="0.9" slow="true" bass="left" mirror="false">
		<pos x="0" y="+10"/>
		<size width="1720" height="250"/>
	</equalizer>
	
	<!-- Accent magenta bas -->
	<square color="secondary" visibility="30%">
		<pos x="0" y="+280"/>
		<size width="1720" height="2"/>
	</square>
</group>
```

---

## 📦 SNIPPET 3: Spectrum Analyzer Horizontal

```xml
<!-- Spectrum mirrored haute résolution -->
<group name="spectrum_hires" x="200" y="500">
	<!-- Cadre -->
	<square border="2" border_color="main_color" color="transparent">
		<pos x="0" y="0"/>
		<size width="1520" height="150"/>
	</square>
	
	<!-- Glow background -->
	<square color="main_color" visibility="8%">
		<pos x="0" y="0"/>
		<size width="1520" height="150"/>
	</square>
	
	<!-- Spectrum 512 barres mirrored -->
	<equalizer nb="512" type="bar" color="tertiary" 
	          width="0.3" slow="false" bass="middle" mirror="true">
		<pos x="5" y="5"/>
		<size width="1510" height="140"/>
	</equalizer>
	
	<!-- Label -->
	<textzone align="center">
		<pos x="0" y="-35"/>
		<size width="1520" height="25"/>
		<text size="14" color="main_color" weight="bold" 
		      format="SPECTRUM ANALYZER"/>
	</textzone>
</group>
```

---

## 📦 SNIPPET 4: Waveform Panel (Deck Monitoring)

```xml
<!-- Panneaux waveform gauche/droite -->
<group name="left_waveform" x="20" y="200">
	<!-- Cadre extérieur -->
	<square color="main_color" visibility="8%">
		<pos x="0" y="0"/>
		<size width="240" height="500"/>
	</square>
	<square border="2" border_color="main_color" color="transparent">
		<pos x="0" y="0"/>
		<size width="240" height="500"/>
	</square>
	
	<!-- Waveform -->
	<waveform source="left" color="main_color" color2="secondary" 
	         visibility="80%">
		<pos x="5" y="5"/>
		<size width="230" height="490"/>
	</waveform>
	
	<!-- Label -->
	<textzone align="center">
		<pos x="0" y="-35"/>
		<size width="240" height="25"/>
		<text size="12" color="main_color" weight="bold" format="DECK 1"/>
	</textzone>
</group>

<!-- Droite (remplacer "left" par "right") -->
<group name="right_waveform" x="1660" y="200">
	<!-- Identique au-dessus mais avec secondary color -->
	<!-- ... -->
</group>
```

---

## 📦 SNIPPET 5: Header Avec Métadonnées Complètes

```xml
<!-- En-tête avec titre, artiste, remix, BPM -->
<group name="header_full" x="80" y="30">
	<!-- Ligne supérieure -->
	<square color="main_color" visibility="60%">
		<pos x="0" y="0"/>
		<size width="1760" height="3"/>
	</square>
	
	<!-- Titre principal GRAND -->
	<textzone align="left" deck="master" scroll="yes">
		<pos x="0" y="+20"/>
		<size width="1000" height="50"/>
		<text size="48" color="main_color" weight="bold" 
		      action="get_title_before_remix"/>
	</textzone>
	
	<!-- Artiste + featuring -->
	<textzone align="left" deck="master">
		<pos x="0" y="+75"/>
		<size width="1000" height="35"/>
		<text size="28" color="secondary" weight="regular" 
		      action="get_artist_before_feat"/>
		<text size="22" color="tertiary" weight="regular" 
		      action="get_featuring_after_artist"/>
	</textzone>
	
	<!-- Remix info -->
	<textzone align="left" deck="master">
		<pos x="0" y="+115"/>
		<size width="1000" height="25"/>
		<text size="18" color="tertiary" weight="regular" 
		      action="get_remix_after_title"/>
	</textzone>
	
	<!-- Côté droit: Stats -->
	<textzone align="right" deck="master">
		<pos x="1200" y="+20"/>
		<size width="560" height="35"/>
		<text size="24" color="main_color" weight="bold" 
		      action="get_bpm"/>
		<text size="18" color="secondary" weight="regular" format=" BPM"/>
	</textzone>
	
	<textzone align="right" deck="master">
		<pos x="1200" y="+60"/>
		<size width="560" height="25"/>
		<text size="14" color="tertiary" weight="regular" 
		      action="get_duration"/>
	</textzone>
</group>
```

---

## 📦 SNIPPET 6: VU Meters (Niveaux audio)

```xml
<!-- Paire de VU meters gauche/droite -->
<group name="vumeter_left" x="40" y="100">
	<!-- Cadre -->
	<square border="1" border_color="main_color" color="dark_bg" 
	        visibility="60%">
		<pos x="0" y="0"/>
		<size width="120" height="400"/>
	</square>
	
	<!-- VU Meter -->
	<vumeter color="main_color" color2="secondary" 
	        visibility="deck master">
		<pos x="10" y="10"/>
		<size width="100" height="380"/>
	</vumeter>
	
	<!-- Label -->
	<textzone align="center">
		<pos x="0" y="-30"/>
		<size width="120" height="25"/>
		<text size="10" color="main_color" weight="bold" format="L"/>
	</textzone>
</group>

<group name="vumeter_right" x="1760" y="100">
	<!-- Identique côté droit (remplacer label en "R") -->
</group>
```

---

## 📦 SNIPPET 7: Beat Indicator (Pulse avec musique)

```xml
<!-- Indicateur beat qui pulse au rythme -->
<group name="beat_pulse" x="960" y="100">
	<!-- Cercle qui pulse -->
	<circle color="main_color" radius="30" 
	       visibility="deck master motion 'beat'">
		<pos x="0" y="0"/>
		<size width="60" height="60"/>
	</circle>
	
	<!-- Cercle outline permanent -->
	<circle color="main_color" radius="30" visibility="40%" 
	       border="2" border_color="main_color">
		<pos x="0" y="0"/>
		<size width="60" height="60"/>
	</circle>
	
	<!-- Text "BEAT" -->
	<textzone align="center">
		<pos x="-25" y="-8"/>
		<size width="50" height="20"/>
		<text size="12" color="main_color" weight="bold" format="●"/>
	</textzone>
</group>
```

---

## 📦 SNIPPET 8: Status Indicators (Play, Cue, Sync)

```xml
<!-- Indicateurs d'état deck -->
<group name="deck_status" x="1700" y="50">
	<!-- Playing indicator -->
	<textzone deck="master" 
	         visibility="deck master motion 'playing'">
		<pos x="0" y="0"/>
		<size width="100" height="30"/>
		<text size="14" color="tertiary" weight="bold" format="▶ PLAY"/>
	</textzone>
	
	<!-- Sync active -->
	<textzone deck="master" 
	         visibility="deck master button_pressed 'sync'">
		<pos x="0" y="+35"/>
		<size width="100" height="30"/>
		<text size="14" color="glow_green" weight="bold" format="♪ SYNC"/>
	</textzone>
	
	<!-- Cue indicator -->
	<textzone deck="master" 
	         visibility="deck master button_pressed 'cue_point'">
		<pos x="0" y="+70"/>
		<size width="100" height="30"/>
		<text size="14" color="secondary" weight="bold" format="⚑ CUE"/>
	</textzone>
</group>
```

---

## 📦 SNIPPET 9: Custom Color Themes (Drop-in)

```xml
<!-- THÈME 1: Synthwave Magenta -->
<define color="theme_primary" value="#ff00ff"/>
<define color="theme_secondary" value="#00ffff"/>
<define color="theme_tertiary" value="#ff0080"/>
<define color="theme_dark" value="#1a0033"/>

<!-- THÈME 2: Matrix Green -->
<define color="theme_primary" value="#00ff00"/>
<define color="theme_secondary" value="#00aa00"/>
<define color="theme_tertiary" value="#00ff00"/>
<define color="theme_dark" value="#001100"/>

<!-- THÈME 3: Vaporwave Sunset -->
<define color="theme_primary" value="#ff1493"/>
<define color="theme_secondary" value="#00d9ff"/>
<define color="theme_tertiary" value="#ff69b4"/>
<define color="theme_dark" value="#2a0845"/>

<!-- THÈME 4: Minimal Blue -->
<define color="theme_primary" value="#0066ff"/>
<define color="theme_secondary" value="#6699ff"/>
<define color="theme_tertiary" value="#0099ff"/>
<define color="theme_dark" value="#000033"/>
```

---

## 📦 SNIPPET 10: Animation Loop (Gradient rotating)

```xml
<!-- Fond animé avec gradient rotatif (avancé) -->
<visual animation="rotate_360" speed="5">
	<pos x="960" y="540"/>
	<size width="1920" height="1080"/>
	<off color="main_color" color2="secondary" 
	    gradient="radial" shape="square" />
</visual>

<!-- Alternative: Pulse opacity -->
<visual animation="pulse" speed="2" 
       visibility="cycle 30%">
	<pos x="960" y="540"/>
	<size width="1920" height="1080"/>
	<off color="main_color" color2="transparent" 
	    gradient="radial" shape="square" />
</visual>
```

---

## 🎨 COMPLETE MINIMAL SKIN TEMPLATE

```xml
<?xml version="1.0" encoding="utf-8"?>
<skin name="Thorus Ultra Minimal" version="8" 
      width="1920" height="1080">

<video source="master">
	<pos x="0" y="0"/>
	<size width="1920" height="1080"/>
</video>

<!-- Noir pur -->
<visual>
	<pos x="0" y="0"/>
	<size width="1920" height="1080"/>
	<off color="#000000" color2="#000000"/>
</visual>

<!-- Définition couleurs -->
<define color="c1" value="#00d9ff"/>
<define color="c2" value="#ff00ff"/>

<!-- JUSTE: Tore + Title + Spectrum -->
<group x="960" y="400">
	<!-- Tore 128 barres (ultra light) -->
	<equalizer nb="128" type="circle" color="c1" 
	          width="0.6" slow="true">
		<pos x="0" y="0"/>
		<size width="600" height="600"/>
	</equalizer>
	
	<!-- Title -->
	<textzone align="center" deck="master">
		<pos x="-150" y="-50"/>
		<size width="300" height="60"/>
		<text size="28" color="c1" weight="bold" 
		      action="get_title_before_remix"/>
	</textzone>
</group>

<!-- Spectrum bas -->
<group x="200" y="900">
	<equalizer nb="256" type="bar" color="c1" 
	          width="0.5" slow="true">
		<pos x="0" y="0"/>
		<size width="1520" height="120"/>
	</equalizer>
</group>

</skin>
```

---

## 🔧 CONVERSION: XML → JSON pour scripting avancé

```javascript
// Si vous voulez générer des skins via code

const skinTemplate = {
  name: "Generated Thorus",
  version: "8",
  width: 1920,
  height: 1080,
  elements: [
    {
      type: "video",
      source: "master",
      x: 0, y: 0,
      width: 1920, height: 1080
    },
    {
      type: "equalizer",
      nb: 256,
      shape: "circle",
      color: "#00d9ff",
      x: 960, y: 540,
      width: 700, height: 700
    }
    // ... etc
  ]
};
```

---

## 📋 CHECKLIST: Création d'une nouvelle variante

- [ ] Copier un snippet existant
- [ ] Renommer les groupes (`name="custom_name"`)
- [ ] Ajuster positions (`x`, `y`)
- [ ] Modifier tailles (`width`, `height`)
- [ ] Changer couleurs (color="...")
- [ ] Valider XML (https://www.xmlvalidation.com)
- [ ] Tester dans VDJ
- [ ] Évaluer performance (CPU %)
- [ ] Optimiser si laggy
- [ ] Partager!

---

**Tous les snippets sont prêts à utiliser avec copy-paste!**
**Version**: 1.0  
**Dernière mise à jour**: Juin 2026
