# Street View Mode - Immersive Street Level Experience

Experience the game at street level with an immersive first-person perspective, similar to the Mapbox Street View homepage feature.

## Features

### Immersive Street Experience
- **3D perspective view** with buildings on both sides
- **Neon-lit windows** with flickering effects
- **Street ground** with yellow lane markings and puddles
- **NPCs walking** the streets (workers, customers, security)
- **Rain effect** with atmospheric drops
- **Dynamic lighting** simulating night in a cyberpunk city

### Navigation & Controls

**Keyboard:**
```
W or ↑    : Move forward / Zoom in
S or ↓    : Move backward / Zoom out
A or ←    : Look left / Rotate view
D or →    : Look right / Rotate view
E         : Interact with surroundings
M         : Return to map view
```

**Mouse:**
- Click **movement arrows** to navigate
- Click **Map View** button to return to map
- Click **Interact** button to engage with the location

### User Interface

**Top Section:**
- Location name and street information
- Safety status indicator (🟢 Safe / 🟡 Moderate / 🔴 Dangerous)
- Real-time stats (Money, Happiness, Reputation)

**Right Side:**
- Movement directional pad (▲ forward, ◄ left, ► right, ▼ back)
- Compass showing cardinal direction
- Map View, Interact, and Dashboard buttons

**Bottom:**
- Compass with directional indicator
- Interaction prompt (when available)
- Keyboard shortcuts guide

## View Modes

### Map View
- See the entire map with locations
- Zoom in/out to explore
- Click locations to navigate
- **Enter Street View**: Click 👁️ button or press **S**

### Street View
- First-person perspective on the streets
- Immersive night city atmosphere
- Dynamic NPCs and activities
- **Exit to Map**: Click 🗺️ button or press **M**

## Interaction System

When you're close to points of interest or NPCs:
- Interaction prompt appears at bottom: "Press E or click Interact"
- Click the **Interact** button or press **E** to engage
- Interact with:
  - NPCs (talk, trade)
  - Locations (enter buildings)
  - Items on street

## Safety System

The street is affected by your reputation:

**High Reputation (>80%)**: 🟢 Safe
- No threats
- NPCs are friendly
- Faster movement

**Medium Reputation (50-80%)**: 🟡 Moderate
- Occasional challenges
- Mixed NPC reactions
- Normal movement speed

**Low Reputation (<50%)**: 🔴 Dangerous
- Threats on the street
- Hostile NPCs
- Slower movement
- Risk of losing money/items

## Atmosphere

### Visual Design
- **Dark theme** with cyberpunk neon colors
- **Neon signs** in magenta (#ff00ff), green (#00ff88), blue (#0080ff)
- **3D perspective** rotation based on look direction
- **Rain effect** creating wet street atmosphere
- **Flickering windows** simulating activity in buildings

### Immersion Features
- **Compass**: Shows your current cardinal direction
- **Street signs**: Display location name and coordinates
- **NPCs**: Animated figures walking the streets
- **Sound** (future): Ambient city sounds, footsteps, dialogue

## NPCs & Activities

### NPC Types
- **Workers** (👤): Gray colored, regular foot traffic
- **Customers** (🚶): Magenta colored, looking for services
- **Security** (🛡️): Green colored, maintaining order

### NPC Behavior
- Walk back and forth on the street
- React based on your reputation level
- Can be interacted with (E key)
- Some may offer missions or services

## Performance

- **Rendering**: Optimized CSS 3D transforms
- **Animation**: Smooth 60fps movement
- **Memory**: Lightweight compared to 3D engines
- **Battery**: Low power consumption (good for mobile)

## Technical Details

### Components
- **StreetView.vue**: Main street view component
- **GameView.vue**: View manager (switches between map and street)
- Uses CSS 3D transforms for perspective effect
- Keyboard + mouse input handling

### File Structure
```
src/
├── components/
│   ├── GameView.vue          # View switcher
│   ├── StreetView.vue        # Street view component
│   └── MapContainer.vue      # Map view component
└── App.vue                    # Root component
```

### Styling Approach
- Pure CSS 3D transforms (`perspective`, `rotateY`)
- CSS animations for effects (neon flicker, rain, NPC walk)
- Backdrop filter for glass morphism UI
- Responsive design

## Gameplay Integration

### Game Mechanics in Street View
- **Missions**: Accept tasks from NPCs
- **Trading**: Buy/sell with street vendors
- **Exploration**: Find hidden locations
- **Risk/Reward**: Dangerous zones have better rewards
- **Reputation**: Actions affect your street status

### Progression
- Explore new areas as reputation grows
- Unlock new NPCs and vendors
- Find secret locations
- Complete street-level objectives

## Customization

### Change Location Appearance

Edit `src/config/mapbox.ts`:
```typescript
{
  id: 'location-id',
  name: 'Location Name',
  coordinates: [longitude, latitude],
  color: '#ff00ff',
  icon: '🏢'
}
```

### Change Street Colors

In `StreetView.vue`, modify:
```typescript
const neonColors = ['#ff00ff', '#00ff88', '#0080ff', '#ffff00', '#ff0080', '#00ffff']
```

### Change NPC Types

Update `streetNPCs` array:
```typescript
const streetNPCs = ref([
  { id: 1, type: 'worker', emoji: '👤', x: 30, y: 40 },
  // Add more NPCs here
])
```

## Future Enhancements

- [ ] 3D model rendering (using Three.js)
- [ ] Audio: ambient sounds, footsteps, NPC dialogue
- [ ] More NPC types and interactions
- [ ] Dynamic weather (rain intensity, fog)
- [ ] More locations and districts
- [ ] Vehicle traffic simulation
- [ ] Real-time player cooperation in street view
- [ ] Mobile optimized controls

## Shortcuts Reference

| Key | Action |
|-----|--------|
| S | Toggle between Map and Street View |
| W/↑ | Move forward |
| S/↓ | Move backward |
| A/← | Look left |
| D/→ | Look right |
| E | Interact |
| M | Return to map |
| 📊 | Dashboard |
| 🗺️ | Map View |

## Accessibility

- **Keyboard only**: Fully playable without mouse
- **Large buttons**: Easy touch targets on mobile
- **High contrast**: Cyberpunk theme aids visibility
- **Color independent**: Icons + text, not colors alone
- **Alt text**: For visual elements

---

**Status**: ✅ Live and Interactive
**Version**: 1.0.0
**Last Updated**: 2026-06-26

Enjoy exploring the neon-lit streets of Sector 7! 🌃
