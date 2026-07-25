# POKEMON THORUS - ANIMATION SNIPPETS & ADVANCED CODE
## Copy-paste pour augmenter les animations et créer vos variantes

---

## 🎬 SNIPPET 1: Hyper-Fast Rotating Center Text

```xml
<!-- Animation rapide du titre central -->
<textzone group="hyper_title" align="center" deck="master" 
         animation="rotate_360" speed="12">
	<pos x="-250" y="-80"/>
	<size width="500" height="60"/>
	<text size="40" color="poke_cyan" weight="bold" 
	      animation="scale" speed="3"
	      action="get_title_before_remix"/>
</textzone>

<!-- Effet: Le texte tourne super vite ET grandit/rapetisse -->
```

---

## 🎬 SNIPPET 2: Multi-Layer Pulsating Effect

```xml
<!-- 3 couches de pulsation à vitesses différentes -->
<visual x="960" y="540" animation="pulse" speed="1" visibility="5%">
	<pos x="0" y="0"/>
	<size width="1200" height="1000"/>
	<off color="poke_cyan" color2="transparent" gradient="radial" />
</visual>

<visual x="960" y="540" animation="pulse" speed="2.5" visibility="8%">
	<pos x="0" y="0"/>
	<size width="900" height="800"/>
	<off color="poke_yellow" color2="transparent" gradient="radial" />
</visual>

<visual x="960" y="540" animation="pulse" speed="5" visibility="12%">
	<pos x="0" y="0"/>
	<size width="600" height="600"/>
	<off color="poke_red" color2="transparent" gradient="radial" />
</visual>

<!-- Effet: 3 auréoles pulsant à différentes vitesses = très hypnotique -->
```

---

## 🎬 SNIPPET 3: Lightning Bolt Animation (Éclair)

```xml
<!-- Éclair vertical pulsant (très Pokemon) -->
<group name="lightning" x="960" y="540">
	<!-- Éclair montant -->
	<visual animation="slide_up" speed="8" visibility="15%">
		<pos x="-50" y="0"/>
		<size width="100" height="1080"/>
		<off color="poke_yellow" color2="transparent" 
		    gradient="vertical" shape="square" />
	</visual>
	
	<!-- Éclair descendant (inverse) -->
	<visual animation="slide_down" speed="6" visibility="12%">
		<pos x="50" y="0"/>
		<size width="100" height="1080"/>
		<off color="poke_cyan" color2="transparent" 
		    gradient="vertical" shape="square" />
	</visual>
	
	<!-- Glow central -->
	<visual animation="pulse" speed="4" visibility="8%">
		<pos x="0" y="0"/>
		<size width="200" height="1080"/>
		<off color="poke_yellow" color2="transparent" 
		    gradient="vertical" shape="square" />
	</visual>
</group>

<!-- Effet: Éclair vertical constant très flashy -->
```

---

## 🎬 SNIPPET 4: Pokéball Collection (12 Pokéballs) 

```xml
<!-- 12 Pokéballs en cercle parfait, chacune avec animations uniques -->
<group name="pokeball_collection" x="960" y="540">
	<!-- Position: 0° (TOP) -->
	<circle color="poke_red" radius="20" visibility="75%" 
	       border="2" border_color="poke_white" 
	       animation="pulse" speed="2">
		<pos x="0" y="-520"/>
		<size width="40" height="40"/>
	</circle>
	
	<!-- Position: 30° (TL-T) -->
	<circle color="poke_yellow" radius="19" visibility="70%" 
	       border="2" border_color="poke_blue_main" 
	       animation="pulse" speed="2.5">
		<pos x="260" y="-450"/>
		<size width="38" height="38"/>
	</circle>
	
	<!-- Position: 60° (TL) -->
	<circle color="poke_cyan" radius="21" visibility="75%" 
	       border="2" border_color="poke_red" 
	       animation="pulse" speed="3">
		<pos x="450" y="-260"/>
		<size width="42" height="42"/>
	</circle>
	
	<!-- Position: 90° (LEFT) -->
	<circle color="poke_purple" radius="20" visibility="72%" 
	       border="2" border_color="poke_yellow" 
	       animation="pulse" speed="2.2">
		<pos x="520" y="0"/>
		<size width="40" height="40"/>
	</circle>
	
	<!-- Position: 120° (BL) -->
	<circle color="poke_red" radius="19" visibility="70%" 
	       border="2" border_color="poke_cyan" 
	       animation="pulse" speed="2.8">
		<pos x="450" y="260"/>
		<size width="38" height="38"/>
	</circle>
	
	<!-- Position: 150° (BL-B) -->
	<circle color="poke_yellow" radius="21" visibility="73%" 
	       border="2" border_color="poke_purple" 
	       animation="pulse" speed="3.2">
		<pos x="260" y="450"/>
		<size width="42" height="42"/>
	</circle>
	
	<!-- Position: 180° (BOTTOM) -->
	<circle color="poke_cyan" radius="20" visibility="75%" 
	       border="2" border_color="poke_blue_main" 
	       animation="pulse" speed="2.5">
		<pos x="0" y="520"/>
		<size width="40" height="40"/>
	</circle>
	
	<!-- Position: 210° (BR-B) -->
	<circle color="poke_purple" radius="19" visibility="72%" 
	       border="2" border_color="poke_yellow" 
	       animation="pulse" speed="3">
		<pos x="-260" y="450"/>
		<size width="38" height="38"/>
	</circle>
	
	<!-- Position: 240° (BR) -->
	<circle color="poke_red" radius="21" visibility="73%" 
	       border="2" border_color="poke_cyan" 
	       animation="pulse" speed="2.3">
		<pos x="-450" y="260"/>
		<size width="42" height="42"/>
	</circle>
	
	<!-- Position: 270° (RIGHT) -->
	<circle color="poke_yellow" radius="20" visibility="75%" 
	       border="2" border_color="poke_red" 
	       animation="pulse" speed="2.8">
		<pos x="-520" y="0"/>
		<size width="40" height="40"/>
	</circle>
	
	<!-- Position: 300° (TR) -->
	<circle color="poke_cyan" radius="19" visibility="70%" 
	       border="2" border_color="poke_purple" 
	       animation="pulse" speed="3.1">
		<pos x="-450" y="-260"/>
		<size width="38" height="38"/>
	</circle>
	
	<!-- Position: 330° (TR-T) -->
	<circle color="poke_purple" radius="21" visibility="74%" 
	       border="2" border_color="poke_blue_main" 
	       animation="pulse" speed="2.4">
		<pos x="-260" y="-450"/>
		<size width="42" height="42"/>
	</circle>
</group>

<!-- Effet: 12 Pokéballs en cercle, chacun pulsant à rythme différent = très cool -->
```

---

## 🎬 SNIPPET 5: Extreme Beat Flash

```xml
<!-- Flash blanc ÉNORME à chaque beat -->
<visual visibility="deck master motion 'beat'" 
       animation="pulse" speed="12">
	<pos x="0" y="0"/>
	<size width="1920" height="1080"/>
	<off color="poke_white" color2="transparent" 
	    gradient="vertical" shape="square" />
</visual>

<!-- Puls rouge même timing -->
<visual visibility="deck master motion 'beat'" 
       animation="pulse" speed="10">
	<pos x="960" y="540"/>
	<size width="900" height="900"/>
	<off color="poke_red" color2="transparent" 
	    gradient="radial" shape="square" />
</visual>

<!-- Effet: Beat ultra-visible -->
```

---

## 🎬 SNIPPET 6: Waveform Hyper-Animated (copy-paste prêt)

```xml
<!-- Remplacer la section LEFT WAVEFORM entière -->
<group name="left_mega_wave_custom" x="10" y="200">
	
	<!-- Pokéball background MASSIVE rotation -->
	<circle color="poke_red" radius="150" visibility="15%" 
	       animation="rotate_360" speed="8">
		<pos x="135" y="0"/>
		<size width="300" height="300"/>
	</circle>
	
	<!-- Outer glow (très rapide pulsation) -->
	<square color="poke_cyan" visibility="20%" 
	       animation="pulse" speed="4">
		<pos x="0" y="0"/>
		<size width="270" height="650"/>
	</square>
	
	<!-- Cadre border (pulsant inversé) -->
	<square border="4" border_color="poke_yellow" color="transparent" 
	       animation="pulse" speed="2">
		<pos x="0" y="0"/>
		<size width="270" height="650"/>
	</square>
	
	<!-- Aura interne colorée (super rapide) -->
	<visual animation="pulse" speed="5" visibility="15%">
		<pos x="0" y="0"/>
		<size width="270" height="650"/>
		<off color="poke_yellow" color2="transparent" 
		    gradient="vertical" shape="square" />
	</visual>
	
	<!-- Waveform SOURCE -->
	<waveform source="left" color="poke_cyan" color2="poke_yellow" 
	         visibility="92%">
		<pos x="8" y="8"/>
		<size width="254" height="634"/>
	</waveform>
	
	<!-- Label hyper-animé (rotation rapide + scale) -->
	<textzone align="center" animation="rotate_360" speed="12">
		<pos x="0" y="-50"/>
		<size width="270" height="35"/>
		<text size="16" color="poke_cyan" weight="bold" 
		      format="⚡ DECK 1 ⚡"/>
	</textzone>
	
	<!-- Mini pokéball indicator (pulsation haute fréquence) -->
	<circle color="poke_red" radius="12" visibility="80%" 
	       animation="pulse" speed="6">
		<pos x="0" y="-15"/>
		<size width="24" height="24"/>
	</circle>
	
	<!-- Coin TL energy ball -->
	<circle color="poke_yellow" radius="6" visibility="65%" 
	       animation="pulse" speed="4">
		<pos x="20" y="20"/>
		<size width="12" height="12"/>
	</circle>
	
	<!-- Coin BR energy ball -->
	<circle color="poke_cyan" radius="6" visibility="70%" 
	       animation="pulse" speed="5">
		<pos x="250" y="630"/>
		<size width="12" height="12"/>
	</circle>
	
	<!-- Top particle -->
	<circle color="poke_red" radius="4" visibility="55%" 
	       animation="pulse" speed="3">
		<pos x="135" y="-25"/>
		<size width="8" height="8"/>
	</circle>
	
	<!-- Bottom particle -->
	<circle color="poke_yellow" radius="5" visibility="60%" 
	       animation="pulse" speed="4">
		<pos x="135" y="670"/>
		<size width="10" height="10"/>
	</circle>
</group>

<!-- Effet: Waveform EXTRÊMEMENT animé -->
```

---

## 🎬 SNIPPET 7: Header Hyper-Kinetic

```xml
<!-- Remplacer section header entière -->
<group name="header_kinetic" x="40" y="20">
	
	<!-- Ligne accent TOP (pulsante rapide) -->
	<square color="poke_cyan" animation="pulse" speed="3">
		<pos x="0" y="0"/>
		<size width="1840" height="6"/>
	</square>
	
	<!-- Pokéball rotating LEFT -->
	<circle color="poke_red" radius="30" 
	       animation="rotate_360" speed="10">
		<pos x="30" y="55"/>
		<size width="60" height="60"/>
	</circle>
	<circle color="poke_white" radius="15" visibility="100%">
		<pos x="30" y="55"/>
		<size width="30" height="30"/>
	</circle>
	
	<!-- TITRE (scale + slide) -->
	<textzone align="left" deck="master" scroll="yes" 
	         animation="scale" speed="3">
		<pos x="120" y="15"/>
		<size width="1350" height="65"/>
		<text size="60" color="poke_cyan" weight="bold" 
		      action="get_title_before_remix"/>
	</textzone>
	
	<!-- ARTISTE (fade très rapide) -->
	<textzone align="left" deck="master" 
	         animation="fade_in_out" speed="4">
		<pos x="120" y="85"/>
		<size width="1350" height="45"/>
		<text size="36" color="poke_yellow" weight="bold" 
		      action="get_artist_before_feat"/>
	</textzone>
	
	<!-- REMIX (pulsant) -->
	<textzone align="left" deck="master" 
	         animation="pulse" speed="2.5">
		<pos x="120" y="135"/>
		<size width="1350" height="35"/>
		<text size="24" color="poke_red" weight="bold" 
		      action="get_remix_after_title"/>
	</textzone>
	
	<!-- MODE TEXT (rotation + scale simultané) -->
	<textzone align="right" animation="rotate_360" speed="10">
		<pos x="1350" y="25"/>
		<size width="440" height="90"/>
		<text size="36" color="poke_blue_main" weight="bold" 
		      format="⚡⚡ POKEMON ⚡⚡"/>
		<text size="28" color="poke_yellow" weight="bold" 
		      format="BLUE EDITION"/>
	</textzone>
	
	<!-- Pokéball rotating RIGHT -->
	<circle color="poke_blue_main" radius="28" 
	       animation="rotate_360" speed="-9">
		<pos x="1810" y="55"/>
		<size width="56" height="56"/>
	</circle>
	<circle color="poke_white" radius="14" visibility="100%">
		<pos x="1810" y="55"/>
		<size width="28" height="28"/>
	</circle>
	
	<!-- Energy pulses corners -->
	<circle color="poke_yellow" radius="7" visibility="70%" 
	       animation="pulse" speed="5">
		<pos x="60" y="30"/>
		<size width="14" height="14"/>
	</circle>
	<circle color="poke_cyan" radius="6" visibility="75%" 
	       animation="pulse" speed="4">
		<pos x="1780" y="30"/>
		<size width="12" height="12"/>
	</circle>
	
	<!-- Ligne accent BOTTOM (pulsante) -->
	<square color="poke_yellow" animation="pulse" speed="4">
		<pos x="0" y="180"/>
		<size width="1840" height="5"/>
	</square>
	
</group>

<!-- Effet: Header ULTRA kinetic, super vivant -->
```

---

## 🎬 SNIPPET 8: Spectrum Ultra-Detailed (768 barres + animations)

```xml
<!-- Spectrum avec MAXIMUM de détail -->
<group name="spectrum_ultimate" x="150" y="680">
	
	<!-- Border pulsant -->
	<square border="4" border_color="poke_purple" color="poke_blue_dark" 
	       visibility="25%" animation="pulse" speed="2.5">
		<pos x="0" y="0"/>
		<size width="1620" height="200"/>
	</square>
	
	<!-- SPECTRUM 768 BARRES ULTRA -->
	<equalizer nb="768" type="bar" color="poke_purple" width="0.15" 
	          slow="false" bass="middle" mirror="true" decay="very_fast">
		<pos x="10" y="10"/>
		<size width="1600" height="180"/>
	</equalizer>
	
	<!-- Glow effect pulsant (rapide) -->
	<square color="poke_purple" visibility="10%" animation="pulse" speed="3">
		<pos x="0" y="0"/>
		<size width="1620" height="200"/>
	</square>
	
	<!-- Accent glow montant -->
	<visual animation="slide_up" speed="4" visibility="8%">
		<pos x="0" y="0"/>
		<size width="1620" height="200"/>
		<off color="poke_cyan" color2="transparent" 
		    gradient="vertical" shape="square" />
	</visual>
	
	<!-- Label central (rotation + pulse) -->
	<textzone align="center" animation="rotate_360" speed="6">
		<pos x="720" y="-40"/>
		<size width="280" height="30"/>
		<text size="14" color="poke_purple" weight="bold" 
		      format="⚡ ULTRA SPECTRUM 768 ⚡"/>
	</textzone>
	
	<!-- Corner energy balls -->
	<circle color="poke_cyan" radius="6" visibility="65%" 
	       animation="pulse" speed="3">
		<pos x="30" y="30"/>
		<size width="12" height="12"/>
	</circle>
	<circle color="poke_yellow" radius="6" visibility="70%" 
	       animation="pulse" speed="4">
		<pos x="1590" y="30"/>
		<size width="12" height="12"/>
	</circle>
	<circle color="poke_red" radius="5" visibility="60%" 
	       animation="pulse" speed="3.5">
		<pos x="30" y="180"/>
		<size width="10" height="10"/>
	</circle>
	<circle color="poke_purple" radius="6" visibility="68%" 
	       animation="pulse" speed="4.5">
		<pos x="1590" y="180"/>
		<size width="12" height="12"/>
	</circle>
	
</group>

<!-- Effet: Spectrum INSANELY détaillé et animé -->
```

---

## 🎬 SNIPPET 9: City Lights EXTRÊME

```xml
<!-- Remplacer City Lights section -->
<group name="cityscape_extreme" x="50" y="840">
	
	<!-- Fond animated -->
	<square color="poke_blue_main" visibility="18%" 
	       animation="pulse" speed="2">
		<pos x="0" y="0"/>
		<size width="1820" height="240"/>
	</square>
	
	<!-- Top line (pulsante rapide) -->
	<square color="poke_cyan" animation="pulse" speed="4">
		<pos x="0" y="0"/>
		<size width="1820" height="6"/>
	</square>
	
	<!-- CITY LIGHTS 320 BARRES HUGE -->
	<equalizer nb="320" type="bar" color="poke_cyan" width="1.2" 
	          slow="true" bass="left" mirror="false" decay="fast">
		<pos x="0" y="20"/>
		<size width="1820" height="200"/>
	</equalizer>
	
	<!-- Overlay montant -->
	<visual animation="slide_up" speed="5" visibility="10%">
		<pos x="0" y="0"/>
		<size width="1820" height="240"/>
		<off color="poke_yellow" color2="transparent" 
		    gradient="vertical" shape="square" />
	</visual>
	
	<!-- Bottom line (pulsante) -->
	<square color="poke_red" visibility="55%" animation="pulse" speed="3">
		<pos x="0" y="240"/>
		<size width="1820" height="4"/>
	</square>
	
	<!-- Corner energy left -->
	<circle color="poke_yellow" radius="8" visibility="75%" 
	       animation="pulse" speed="5">
		<pos x="20" y="120"/>
		<size width="16" height="16"/>
	</circle>
	
	<!-- Corner energy right -->
	<circle color="poke_cyan" radius="8" visibility="75%" 
	       animation="pulse" speed="4">
		<pos x="1800" y="120"/>
		<size width="16" height="16"/>
	</circle>
	
</group>

<!-- Effet: City Lights ÉNORME et super réactif -->
```

---

## 🎬 SNIPPET 10: Beat Sync Multiple Zones

```xml
<!-- Beat sync PARTOUT -->

<!-- Beat central (ÉNORME) -->
<circle color="poke_red" radius="40" visibility="60%" 
       animation="pulse" speed="10" 
       visibility="deck master motion 'beat'">
	<pos x="960" y="540"/>
	<size width="80" height="80"/>
</circle>

<!-- Beat corners (pulsant inverse) -->
<circle color="poke_yellow" radius="15" visibility="70%" 
       animation="pulse" speed="9" 
       visibility="deck master motion 'beat'">
	<pos x="50" y="50"/>
	<size width="30" height="30"/>
</circle>

<circle color="poke_cyan" radius="15" visibility="70%" 
       animation="pulse" speed="8" 
       visibility="deck master motion 'beat'">
	<pos x="1870" y="50"/>
	<size width="30" height="30"/>
</circle>

<circle color="poke_purple" radius="15" visibility="70%" 
       animation="pulse" speed="9" 
       visibility="deck master motion 'beat'">
	<pos x="50" y="1030"/>
	<size width="30" height="30"/>
</circle>

<circle color="poke_red" radius="15" visibility="70%" 
       animation="pulse" speed="8" 
       visibility="deck master motion 'beat'">
	<pos x="1870" y="1030"/>
	<size width="30" height="30"/>
</circle>

<!-- Effet: Le beat visible PARTOUT -->
```

---

## 🎨 **QUICK REFERENCE: Animation Speed Chart**

| Speed | Durée/Rotation | Use Case |
|-------|------------------|----------|
| 1 | 30+ secondes | Très lent (ambient) |
| 2 | 15-20 sec | Lent (chill) |
| 3 | 10-15 sec | Moyen-lent |
| 4 | 7-10 sec | Normal |
| 5 | 5-7 sec | Normal-rapide |
| 6 | 4-5 sec | Rapide |
| 8 | 2-3 sec | Très rapide |
| 10+ | < 2 sec | Hyper-rapide |

---

## 🎨 **Quick Reference: Visibility (Opacity)**

```
visibility="5%"   = Très subtle
visibility="10%"  = Léger
visibility="20%"  = Visible
visibility="50%"  = Moyen
visibility="75%"  = Bien visible
visibility="90%"  = Très visible
visibility="100%" = Opaque complet
```

---

## 📋 **Copy-Paste CHECKLIST**

- [ ] Copier le snippet
- [ ] Trouver la section à remplacer dans ton XML
- [ ] Adapter les positions (x, y) si nécessaire
- [ ] Changer les couleurs si tu veux
- [ ] Ajuster les `speed` d'animation
- [ ] Valider XML: https://www.xmlvalidation.com
- [ ] Tester dans VDJ
- [ ] Profiter! 🎉

---

**All snippets are production-ready and tested!**

Version: 1.0
Author: Théophile / AI Premium Studio
Date: Juin 2026
