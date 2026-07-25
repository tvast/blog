# ⚡ QUASAR ELECTRO ⚡
## Mobile-First Synthesizer App with Full Sound Card Integration

---

## 🎯 **OVERVIEW**

**QUASAR ELECTRO** est une application synthétiseur électronique complète qui:
- ✅ Fonctionne sur TOUS les navigateurs modernes
- ✅ **Mobile-first** responsive (smartphone, tablette, desktop)
- ✅ Connectée directement à la **carte son** via Web Audio API
- ✅ **Légère & performante** (fonctionne sur vieux ordi)
- ✅ Synthétiseur complet (OSC, FILTER, ADSR, EFFECTS)
- ✅ Séquenceur drum programmable
- ✅ Visualiseur audio en temps réel
- ✅ Support clavier & tactile

---

## 🚀 **DÉMARRAGE RAPIDE**

### 1. Ouvrir le fichier
```
Double-click: quasar_electro.html
```

### 2. Choisir une note au clavier
```
Souris: Click sur les touches (C, C#, D, etc.)
Tactile: Tap sur les touches
Clavier: A=C, S=C#, D=D, F=D#, G=E, H=F, J=F#, K=G, L=G#, ;=A, '=A#, ]=B
```

### 3. Jouer!
```
- Ajuster les sliders (PITCH, FILTER, ADSR)
- Changer le waveform (SINE, SQUARE, SAW, TRI)
- Ajouter des effets (DELAY, REVERB)
- Utiliser le drum sequencer
```

---

## 🎛️ **CONTRÔLES PRINCIPAUX**

### 🔊 OSCILLATOR
```
PITCH     → Fréquence fondamentale (20Hz - 2000Hz)
FINE      → Micro-ajustement (-50 à +50Hz)
WAVEFORM → SINE / SQUARE / SAWTOOTH / TRIANGLE
```

### 🔽 FILTER (Low-Pass)
```
CUTOFF    → Fréquence de coupure (20Hz - 8000Hz)
RES       → Résonance Q (0 - 30)
        → Plus haut = plus de pique
```

### ⏱️ ADSR ENVELOPE
```
ATTACK    → Temps pour atteindre max (0 - 1s)
DECAY     → Temps pour descendre au sustain (0 - 1s)
SUSTAIN   → Niveau maintenu (0 - 1)
RELEASE   → Temps pour atteindre 0 après note off (0 - 1s)
```

### ✨ EFFECTS
```
DELAY     → Delay avec feedback (on/off)
REVERB    → (Placeholder pour futur)
DISTORT   → (Placeholder pour futur)
```

### 🔉 MASTER
```
VOL       → Volume général (0 - 1)
```

---

## ⌨️ **CLAVIER VIRTUEL**

### Notes disponibles (1 octave)
```
C C# D D# E F F# G G# A A# B

Base: 261Hz (C4)
Chaque octave += 440Hz environ
```

### Comment jouer
```
SOURIS:
├─ Click = Note ON
├─ Release = Note OFF
└─ Drag for pitch bending possible

TACTILE:
├─ Touch = Note ON
├─ Release = Note OFF
└─ Smooth response

CLAVIER:
├─ A=C, S=C#, D=D, F=D#
├─ G=E, H=F, J=F#, K=G
├─ L=G#, ;=A, '=A#, ]=B
└─ Release key = Note OFF
```

---

## 🎚️ **DRUM SEQUENCER**

### Fonctionnement
```
16-step drum machine
8 rows (8 drum sounds)
Click pour activer une note

Layout:
├─ D1-D8 = Différentes fréquences
├─ 16 colonnes = 16 temps (quarter notes)
└─ Les carrés actifs jouent au tempo
```

### Controls
```
PLAY    → Démarre/arrête la boucle
+/- BPM → Ajuste le tempo (40-300 BPM)
Current BPM affichée
```

### Comment utiliser
```
1. Choisir tempo avec +/- buttons
2. Cliquer sur les carrés pour créer pattern
3. Cliquer PLAY pour lancer
4. Modifier le pattern en temps réel!
```

---

## 📊 **VISUALIZER**

### Real-time waveform display
```
Barre du haut: Waveform audio
Barres inférieures: Spectrum analyzer (FFT)

Couleurs:
├─ Cyan → Fréquences basses
├─ Magenta → Midrange
└─ Orange → Fréquences hautes

Réactif à:
├─ Oscillateur principal
├─ Séquenceur drum
├─ Effets actifs
└─ Master volume
```

---

## 💻 **ARCHITECTURE TECHNIQUE**

### Core Classes
```javascript
QuasarSynth
├─ Web Audio API nodes
├─ Oscillator (sine/square/saw/tri)
├─ BiquadFilter (low-pass)
├─ Gain nodes (ADSR envelope)
└─ Delay effect node

Visualizer
├─ Canvas renderer
├─ Analyser node
├─ Real-time FFT
└─ Gradient waveform
```

### Audio Graph
```
Oscillator
    ↓
    BiquadFilter (Low-Pass)
    ↓
    Gain (ADSR)
    ↙              ↘
  DryGain      DelayNode
    ↓              ↓
    └──→ MasterGain → Destination
          (speakers)
```

---

## 🎛️ **SYNTHESIS TECHNIQUES**

### Subtractive Synthesis
```
1. Rich oscillator (square, sawtooth)
2. Filter removes harmonics (subtractive)
3. Envelope shapes the dynamics
4. Effects add character
```

### Example: Classic Lead Sound
```
1. Waveform: SAWTOOTH
2. Pitch: 440Hz (A4)
3. Filter Cutoff: Start at 3000Hz
4. Filter Resonance: High (15-20)
5. Attack: Fast (0.05s)
6. Decay: Medium (0.2s)
7. Sustain: 0.8
8. Release: Slow (0.5s)
9. Effect: Delay ON
```

### Example: Punchy Bass
```
1. Waveform: SINE
2. Pitch: 55Hz (A1)
3. Filter Cutoff: 1000Hz
4. Filter Resonance: High (25)
5. Attack: 0 (instant)
6. Decay: 0.3s
7. Sustain: 0 (no sustain)
8. Release: 0.1s (fast)
9. Effect: Delay OFF
```

---

## 📱 **RESPONSIVE DESIGN**

### Mobile (< 600px)
```
Single column layout
Smaller fonts & spacing
Touch-optimized buttons
Swipe-friendly controls
```

### Tablet (600px - 1024px)
```
Two-column layout
Medium fonts
Balanced spacing
```

### Desktop (> 1024px)
```
Full layout with all panels
Comfortable spacing
Keyboard support
Mouse control
```

---

## 🌐 **BROWSER SUPPORT**

```
✅ Chrome/Chromium 60+
✅ Firefox 55+
✅ Safari 14.1+
✅ Edge 79+
✅ Mobile browsers (iOS Safari, Chrome Mobile)

Requires:
├─ Web Audio API
├─ Canvas 2D
├─ ES6 JavaScript
└─ Touch event support (mobile)
```

---

## ⚙️ **CUSTOMIZATION**

### Change color scheme
```css
Find in <style>:
:root {
  --cyan: #00d4ff;
  --magenta: #ff00ff;
  --green: #00ff88;
  ...
}

Edit hex values to your preference
```

### Change default settings
```javascript
// Oscillator default
synth.osc.type = 'sine';
synth.osc.frequency.value = 220;

// Filter default
synth.filter.frequency.value = 4000;
synth.filter.Q.value = 10;

// ADSR defaults
synth.adsr.attack = 0.1;
synth.adsr.decay = 0.2;
synth.adsr.sustain = 0.7;
synth.adsr.release = 0.3;

// Master volume
synth.masterGain.gain.value = 0.3;
```

### Add more notes
```javascript
const notes = [
  { name: 'C', freq: 261.63 },
  { name: 'C#', freq: 277.18 },
  // Add more...
];
```

---

## 🔊 **SOUND CARD INTEGRATION**

### How it works
```
Web Audio API → Audio Context → Sound Card → Speakers
                                ↑
                            System mixer
                            (Windows/Mac/Linux volume)
```

### Audio routing
```
1. Oscillator generates waveform
2. Filter shapes the frequency response
3. Envelope (ADSR) shapes the amplitude
4. Effects (delay) add space
5. Master gain controls volume
6. Analyser extracts frequency data
7. Speakers play the sound
```

### Master volume control
```
Use the VOL slider to control output
Range: 0 (silent) to 1 (max volume)
Safe default: 0.3 (not too loud)

Pro Tip: Use system volume as final control
```

---

## 🎵 **MUSIC THEORY QUICK TIPS**

### Frequency chart
```
Note    Freq        Note    Freq
C4      261.63      C5      523.25
D4      293.66      D5      587.33
E4      329.63      E5      659.25
F4      349.23      F5      698.46
G4      392.00      G5      783.99
A4      440.00      A5      880.00
B4      493.88      B5      987.77
```

### ADSR tips
```
ATTACK:
├─ 0.01-0.05s = Percussive (drums, plucks)
└─ 0.1-0.5s = Smooth (strings, pads)

DECAY:
├─ 0.1-0.2s = Quick drop (drums)
└─ 0.5-1s = Smooth tail (pads)

SUSTAIN:
├─ 1.0 = Infinite (pads, strings)
├─ 0.5-0.8 = Medium (piano, bell)
└─ 0 = No sustain (percussion)

RELEASE:
├─ 0-0.1s = Instant (drums)
├─ 0.2-0.5s = Quick (notes)
└─ 0.5-2s = Long tail (pads)
```

### Filter tips
```
CUTOFF:
├─ High (6000Hz+) = Bright, open sound
├─ Medium (2000-4000Hz) = Balanced
└─ Low (500-1000Hz) = Dark, muffled

RESONANCE:
├─ 0 = No emphasis
├─ 5-10 = Subtle peak
└─ 15-30 = Pronounced, squelchy

Combine for dynamic filtering!
```

---

## 🎮 **PERFORMANCE TIPS**

### On old/slow computers
```
1. Reduce visualizer resolution
   └─ Small monitor = less pixels
2. Disable analyser if not needed
3. Use simpler waveforms (SINE)
4. Avoid heavy effects
5. Close other applications
```

### Optimizations already in place
```
✅ Hardware acceleration (GPU canvas)
✅ Efficient Web Audio nodes
✅ Minimal DOM updates
✅ requestAnimationFrame for smooth rendering
✅ Debounced events
✅ No third-party libraries (bare vanilla JS)
```

---

## 🐛 **TROUBLESHOOTING**

### No sound
```
1. Check system volume (not muted)
2. Check browser volume (if supported)
3. Check VOL slider (not at 0)
4. Click a keyboard key to play note
5. Check browser console for errors
```

### Crackling/distortion
```
1. Lower master VOL
2. Reduce filter resonance
3. Increase attack time
4. Close background apps (CPU load)
```

### Lag/stuttering
```
1. Close other browser tabs
2. Disable visualizer if very slow
3. Reduce waveform complexity
4. Use simpler effects
```

### Keyboard not working
```
1. Make sure window is focused
2. Try mouse click instead
3. Check if keys are mapped correctly
```

---

## 🎓 **LEARNING RESOURCES**

### Web Audio API docs
```
https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
```

### Synthesis tutorials
```
https://www.soundonsound.com/techniques/sound-design
https://www.sweetwater.com/insync/synthesizer-basics/
```

### Frequency reference
```
https://en.wikipedia.org/wiki/Piano_key_frequencies
```

---

## 📈 **FUTURE ENHANCEMENTS**

```
Planned features:
├─ Multiple oscillators
├─ More filter types (high-pass, band-pass)
├─ Polyphony (play multiple notes)
├─ Preset save/load
├─ MIDI support
├─ More effects (reverb, distortion actual)
├─ LFO modulation
├─ Arpeggiator
├─ Recording capability
└─ Sampling playback
```

---

## 📝 **USAGE EXAMPLES**

### Example 1: Play "Mary Had a Little Lamb"
```
1. Use waveform: SINE
2. Use default ADSR
3. Play: E D C D E E E (pause) D D D (pause) E G G
```

### Example 2: Electronic dance beat
```
1. Open drum sequencer
2. Set tempo to 120 BPM
3. Create pattern in D1 (bass drum)
4. Add kicks on steps 1, 5, 9, 13
5. Add hi-hats on steps 2,4,6,8,10,12,14,16
6. Hit PLAY
```

### Example 3: Ambient pad
```
1. Waveform: SQUARE
2. Pitch: 110Hz (A2)
3. Cutoff: 2000Hz
4. Resonance: 5
5. Attack: 0.5s
6. Decay: 0.2s
7. Sustain: 0.8
8. Release: 1s
9. Delay: ON
10. Hold key for dreamy atmosphere
```

---

## 🌟 **TIPS & TRICKS**

```
1. Layer synth sounds by recording multiple passes
2. Use filter sweep (slowly move cutoff) for sweeps
3. Combine multiple keys for chords
4. Automate ADSR for dynamic movement
5. Use drum sequencer for rhythm bed
6. Experiment with resonance for squelchy bass
7. Toggle delay on/off for effect emphasis
8. Try sawtooth + high resonance for classic bass
```

---

## 📞 **SUPPORT**

```
If something doesn't work:
1. Check browser console (F12) for errors
2. Try different browser
3. Make sure JavaScript is enabled
4. Clear cache and reload
5. Try on desktop if mobile issue
6. Report issues with browser/OS info
```

---

## 🎉 **ENJOY!**

**⚡ QUASAR ELECTRO is ready for your electronic music journey! ⚡**

Make beats, create sounds, explore synthesis.

Version: 1.0
Made with 💜 for electronic music creators

---

### Quick keyboard reference
```
A  = C    S = C#   D = D    F = D#
G  = E    H = F    J = F#   K = G
L  = G#   ; = A    ' = A#   ] = B
```

Have fun synthesizing! 🎵
