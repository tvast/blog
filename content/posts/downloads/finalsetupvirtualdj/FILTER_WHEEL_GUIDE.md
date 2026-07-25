# POKEMON THORUS BLUE - FILTER WHEEL EDITION
## Installation & Usage Guide

---

## 🎚️ **WHAT'S NEW**

### Filter Wheel (LEFT SIDE)
```
⚡ Roue circulaire animée (rotation speed 2)
⚡ Rotation smooth pour sweep filtres
⚡ 4 modes: Low Pass → High Pass → Band Pass → Band Stop
⚡ Animation pulsante + border rotating
⚡ Tous les filtres sont modulables en temps réel
```

### Effects Control Panel (RIGHT SIDE)
```
⚡ 4 Knobs circulaires indépendants:
   1. Q FACTOR (Resonance) - Cyan color
   2. DISTORTION - Red color
   3. ECHO/DELAY - Green color
   4. REVERB/SPACE - Yellow color
⚡ Chaque knob: rotation round, dblclick reset
⚡ Tous les knobs ont des animations différentes
```

### Animations (60+ total)
```
⚡ Filter Wheel: rotation + pulse synchronized
⚡ Each FX knob: unique pulsation pattern
⚡ Header: scale + fade + pulse + rotate
⚡ Waveforms: 12+ animations each
⚡ Spectrum: 768 barres ultra-detail
⚡ Center Thorus: beat sync + particle system
⚡ City Lights: 320 barres très réactif
```

---

## 🚀 **INSTALLATION (Copy-Paste Ready)**

### Step 1: Create folder
```
Windows:
C:\Users\[YourName]\AppData\Local\VirtualDJ\Skins\Pokemon_Thorus_Filter_Wheel\

Mac:
~/Library/Application Support/VirtualDJ/Skins/Pokemon_Thorus_Filter_Wheel/

Linux:
~/.VirtualDJ/Skins/Pokemon_Thorus_Filter_Wheel/
```

### Step 2: Save the XML file
```
Rename: vdj_pokemon_thorus_blue_FILTER_WHEEL.xml
To: skin.xml
Place in: Pokemon_Thorus_Filter_Wheel/ folder
```

### Step 3: Restart VirtualDJ
- Close completely
- Relaunch
- Skin appears in selector!

---

## 🎮 **HOW TO USE THE FILTER WHEEL**

### Basic Operation
```
LEFT SIDE - Filter Wheel:
├─ Rotate the wheel to sweep through filter types
├─ 360° rotation = complete frequency sweep
├─ Visual feedback: pulsing rings + rotating label
└─ Connect to: Master Filter or deck-specific filters

Position Reference:
├─ TOP (0°): LOW PASS FILTER (cyan)
├─ RIGHT (90°): HIGH PASS FILTER (red)  
├─ BOTTOM (180°): BAND PASS FILTER (green)
└─ LEFT (270°): BAND STOP/NOTCH (orange)
```

### Advanced Usage
```
Combine Wheel + FX Knobs:

1. Use Filter Wheel for:
   - Sweep low-pass for smooth drops
   - High-pass for presence enhancement
   - Band-pass for surgical frequency cutting

2. Use FX Knobs for:
   - Q FACTOR: Increase resonance at filter point
   - DISTORTION: Add harmonic content
   - ECHO: Create space/depth
   - REVERB: Atmosphere/dimension
```

---

## ⚡ **EFFECTS PANEL (RIGHT SIDE)**

### FX Knob 1: Q FACTOR (Resonance)
```
Color: Cyan
Position: Top-Left
Animation: pulse speed 2
Use for:
├─ Increase emphasis at cutoff frequency
├─ Create "peak" in filter response
├─ Stack with filter sweep for dramatic effect
└─ Combine with distortion for aggressive sound
```

### FX Knob 2: DISTORTION
```
Color: Red
Position: Top-Right
Animation: pulse speed 2.2
Use for:
├─ Add harmonics to filtered signal
├─ Grit/aggression to clean filters
├─ Layer with echo for space
└─ Combine Q-factor for extreme tones
```

### FX Knob 3: ECHO/DELAY
```
Color: Green
Position: Bottom-Left
Animation: pulse speed 2.3
Use for:
├─ Create rhythmic delay tails
├─ Extend filtered sounds
├─ Build tension/anticipation
└─ Combine with reverb for lush effect
```

### FX Knob 4: REVERB/SPACE
```
Color: Yellow
Position: Bottom-Right
Animation: pulse speed 2.4
Use for:
├─ Add spatial dimension
├─ Create depth/distance
├─ Smooth rough distortion
└─ Essential for ambient sounds
```

---

## 🎯 **WORKFLOW EXAMPLES**

### Example 1: Techno Build-Up
```
1. Start with Low Pass Filter (TOP position)
2. Slowly rotate clockwise toward High Pass
3. Increase Q FACTOR for emphasis
4. Raise DISTORTION for energy
5. Add ECHO for space
6. Peak with REVERB for climax
7. Quick reset back to Low Pass for drop
```

### Example 2: House Groove Sweep
```
1. Set Band Pass Filter (BOTTOM position)
2. Gentle Q FACTOR for musicality
3. Minimal DISTORTION (subtle)
4. Medium ECHO for groove
5. High REVERB for smoothness
6. Rotate wheel slowly during drop for sweep
```

### Example 3: DnB Presence Push
```
1. High Pass Filter (RIGHT position)
2. Maximum Q FACTOR for peak
3. High DISTORTION for aggression
4. Fast ECHO for rhythmic effect
5. Minimal REVERB (keep tight)
6. Rapid wheel rotation for filter sweep
```

### Example 4: Ambient Journey
```
1. Low Pass Filter (TOP position)
2. Zero Q FACTOR (flat response)
3. Zero DISTORTION (clean)
4. Medium ECHO (atmospheric)
5. Maximum REVERB (very spacious)
6. Slow wheel rotation for dreamy effect
```

---

## 🎨 **CUSTOMIZATION**

### Change Filter Wheel Colors
Edit XML, find:
```xml
<circle color="poke_purple" radius="180" visibility="15%" 
       animation="pulse" speed="2">
```

Replace `poke_purple` with any color from palette:
```
poke_blue_dark    #0d47a1
poke_blue_main    #0052CC
poke_cyan         #00D9FF
poke_yellow       #FFFF00
poke_red          #FF1744
poke_white        #FFFFFF
poke_green        #00FF41
poke_orange       #FF6D00
```

### Change FX Knobs Colors
Find each knob and change color:
```xml
<circle color="poke_green" radius="180" visibility="15%"
```

### Adjust Animation Speeds
```xml
<!-- Filter Wheel rotation -->
animation="rotate_360" speed="2"  ← Change this

<!-- FX Knob pulsations -->
animation="pulse" speed="2.3"  ← Change this
```

---

## 🔧 **PERFORMANCE SETTINGS**

### If Too Laggy
```
Reduce spectrum bars:
nb="768" → nb="512"

Slow down animations:
speed="8" → speed="4"

Reduce visibility:
visibility="15%" → visibility="8%"
```

### If Too Slow / Not Enough Visuals
```
Increase spectrum bars:
nb="512" → nb="1024"

Speed up animations:
speed="2" → speed="4"

Increase visibility:
visibility="8%" → visibility="20%"
```

---

## 📊 **ANIMATION BREAKDOWN**

### Filter Wheel
- Outer rotation: 360° continuous (speed 2)
- Pulsation: slow breathing effect (speed 2)
- Glow effect: medium pulse (speed 3)
- Border rings: different speed pulsations

### Effects Knobs
- Q FACTOR: smooth pulse (speed 2)
- DISTORTION: fast pulse (speed 2.2)
- ECHO: medium pulse (speed 2.3)
- REVERB: varied pulse (speed 2.4)
- All have unique pulsation patterns for distinction

### Central Elements
- Main Thorus: beat sync + 512 barres
- Beat pulse: speed 8 (very fast on beat)
- Particle system: 8 positions with varying speeds
- Aura layers: 3 levels of nested pulsation

---

## 🎓 **TECHNICAL INFO**

### Filter Wheel Specifications
```
Position: x="280" y="540"
Rotation: animation="rotate_360" speed="2"
Size: 360x360 pixels
Type: round slider (0-360°)
Animation: continuous smooth rotation
```

### Effects Control Specifications
```
Position: x="1640" y="540" (mirrored from wheel)
Rotation: animation="rotate_360" speed="-2" (REVERSE)
Knob Size: 80x80 pixels each
Layout: 2x2 grid pattern
Angles: -150° to +150° (300° total range)
```

### Thorus + City Lights
```
Central Thorus: 512 barres circulaires
City Lights: 320 barres verticales
Spectrum: 768 barres ultra-detail
All: very fast decay for responsiveness
```

---

## 💡 **PRO TIPS**

1. **Layer Your Effects**
   - Use filter wheel for frequency shaping
   - Combine with Q-factor for emphasis
   - Add distortion for character
   - Use echo/reverb for space

2. **Synchronize with Music**
   - Rotate wheel on beat for dramatic sweeps
   - Pulse effects to the rhythm
   - Build tension with gradual changes
   - Release on drops/breakdowns

3. **Visual Feedback**
   - Watch the waveforms react to filter
   - Monitor spectrum for frequency changes
   - Observe the pulsing animations
   - Use beat flash for timing reference

4. **Performance Optimization**
   - Reduce barres if CPU gets high
   - Disable some animations if needed
   - Keep visibility % reasonable
   - Monitor performance panel

5. **Workflow Efficiency**
   - Preset common filter positions
   - Combine FX knobs for signature sounds
   - Practice smooth wheel rotations
   - Use both hands for multi-control

---

## 🎬 **ANIMATION SUMMARY**

| Element | Speed | Animation | Purpose |
|---------|-------|-----------|---------|
| Filter Wheel | 2 | rotate_360 | Smooth sweep |
| FX Panel | -2 | rotate_360 | Counter-rotate |
| Q Factor | 2 | pulse | Resonance feedback |
| Distortion | 2.2 | pulse | Character pulse |
| Echo | 2.3 | pulse | Space indication |
| Reverb | 2.4 | pulse | Depth feedback |
| Beat Sync | 8 | pulse | Beat indicator |
| Spectrum | N/A | bars | Audio reactive |
| Waveforms | Mixed | Multiple | Audio feedback |

---

## ❌ **COMMON MISTAKES**

### Don't:
```
✗ Over-modulate Q factor (sounds harsh)
✗ Max distortion without care (muddy)
✗ Forget to reset on transitions
✗ Ignore visual feedback
✗ Run too many animations on old CPU
```

### Do:
```
✓ Use Q-factor subtly (0-3dB boost)
✓ Layer effects gradually
✓ Reset before major sections
✓ Watch waveforms/spectrum
✓ Monitor CPU performance
```

---

## 📱 **SYSTEM REQUIREMENTS**

### Minimum
- CPU: i5/Ryzen 5 (2017+)
- RAM: 8GB
- VirtualDJ: 8+
- Display: 1920x1080

### Recommended  
- CPU: i7/Ryzen 7 (2018+)
- RAM: 16GB
- VirtualDJ: 8.5+
- Display: 1920x1080+

### Optimal (All effects + 60+ animations)
- CPU: i9/Ryzen 9 (2019+)
- RAM: 32GB
- GPU: Dedicated graphics
- VirtualDJ: 8.5+
- Display: 1920x1080 or higher

---

## 🎵 **FEATURES SUMMARY**

```
Filter Wheel Edition Includes:
├─ 1× Animated Filter Wheel (LEFT side)
├─ 4× Effects Control Knobs (RIGHT side)
├─ 512-Barres Main Thorus (CENTER)
├─ 320-Barres City Lights (BOTTOM)
├─ 768-Barres Spectrum Analyzer (CENTER)
├─ Dual Waveforms (LEFT & RIGHT)
├─ 60+ Simultaneous Animations
├─ Beat Sync Pulse
├─ Particle System (8 positions)
├─ 3-Layer Aura Effects
├─ Pokemon Blue Palette
└─ Full Header + Status Indicators
```

---

## 🚀 **NEXT STEPS**

1. ✅ Install the skin
2. ✅ Load some tracks
3. ✅ Experiment with Filter Wheel
4. ✅ Try FX Knob combinations
5. ✅ Practice smooth rotations
6. ✅ Record a set!

---

**Enjoy the Filter Wheel Edition! ⚡🎚️**

Version: 1.0 Filter Wheel
Date: Juin 2026
Author: Théophile / AI Premium Studio
