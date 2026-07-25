# Mapbox Integration - Real Map UI

The game now uses **Mapbox GL JS** as the main user interface, replacing Phaser for the core map view.

## What Changed

### Before
- Phaser 3 scenes for visual rendering
- Simple Apartment and Street scenes
- Navigation via buttons

### After
- **Real Mapbox map** with interactive locations
- **Location markers** you can click to navigate
- **3D map visualization** with pitch and bearing controls
- **Zoom controls** for exploring the world
- **Real coordinates** (currently NYC area)

## Features

### Interactive Map
- **Dark theme** synchronized with cyberpunk aesthetic
- **3D view** with adjustable pitch (45° default)
- **Smooth animations** when navigating between locations
- **Location markers** with hover effects

### Navigation
- Click any location button to navigate
- Click location markers on the map
- Use map controls to zoom/reset view
- Search and filter locations

### Game Integration
- **Real-time stats** overlay (money, happiness, reputation)
- **Dashboard** (📊 button) accessible from anywhere
- **Location info panel** shows current location details
- **Coordinates display** for each location

### Controls
```
+ / −  : Zoom in/out
⟲     : Reset to default view
🔍    : Toggle 3D view (pitch)
```

## Configuration

### Environment Variables

Required in `.env.local`:

```bash
VITE_MAPBOX_TOKEN=pk.eyJ1IjoiZDBjIiwiYSI6ImNtb3FiaTI1MTFmNmgyc3M0dDcyaDdlZGIifQ.0IHnzIBJWVN8aeJls55hoQ
```

### Map Settings

Configured in `src/config/mapbox.ts`:

```typescript
{
  style: 'mapbox://styles/mapbox/dark-v11',
  center: [-73.9857, 40.7484],  // NYC
  zoom: 14,
  pitch: 45,
  bearing: 0,
}
```

## Location System

### Adding New Locations

Edit `src/config/mapbox.ts`:

```typescript
export const gameLocations = [
  {
    id: 'my-location',
    name: 'Location Name',
    description: 'Location description',
    coordinates: [-73.9857, 40.7484],  // [longitude, latitude]
    color: '#ff00ff',  // Marker color
    icon: '🏢',  // Marker icon
  },
]
```

### Current Locations

1. **Apartment** (🏢) - Headquarters
   - Coordinates: [-73.9857, 40.7484]
   - Color: #ff00ff (magenta)

2. **Street** (🌃) - Red Light District
   - Coordinates: [-73.9757, 40.7484]
   - Color: #00ff88 (neon green)

## File Structure

```
src/
├── components/
│   └── MapContainer.vue         # Main map component
├── config/
│   └── mapbox.ts               # Mapbox config & locations
└── App.vue                      # Now uses MapContainer
```

## Styling

### Map Appearance
- **Style**: Dark v11 (Mapbox dark theme)
- **Theme**: Cyberpunk neon aesthetic
- **Overlay opacity**: 0.85 with blur effect
- **Border colors**: #ff00ff (magenta), #00ff88 (neon green)

### Marker Design
- **Circular icons** with emoji
- **Glow effects** on active location
- **Hover expansion** animation
- **Labels** on hover

## Map Styles Available

From Mapbox (free tier):

```
mapbox://styles/mapbox/dark-v11           # Dark (default)
mapbox://styles/mapbox/light-v11          # Light
mapbox://styles/mapbox/streets-v12        # Streets
mapbox://styles/mapbox/outdoors-v12       # Outdoors
mapbox://styles/mapbox/satellite-v9       # Satellite
```

Change in `src/config/mapbox.ts`:

```typescript
style: 'mapbox://styles/mapbox/satellite-v9'
```

## Advanced Features

### Zoom & Search Tree (zstree)

Future implementation for:
- Quick location search
- Hierarchical zoom levels
- Clustering at different zoom levels
- Location filtering

### Real World Coordinates

Map uses real coordinates:
- **Longitude**: -73.9857 (East-West)
- **Latitude**: 40.7484 (North-South)
- **Zoom**: 14 (street-level detail)

To change location:

```typescript
// In mapbox.ts
center: [longitude, latitude]
```

## Performance

- **Map rendering**: Optimized by Mapbox GL
- **Marker count**: Minimal (2 locations)
- **Animation**: GPU-accelerated
- **Memory**: ~10-15MB for map library

## Troubleshooting

### Map not loading
- Check `VITE_MAPBOX_TOKEN` in `.env.local`
- Verify token has public read access
- Check browser console for errors

### Markers not clickable
- Ensure `pointer-events: auto` on `.location-btn`
- Check marker z-index

### Performance issues
- Reduce marker count (cluster at higher zoom)
- Use lighter map style
- Reduce animation duration

## API Reference

### useMapStore

```typescript
import { useMapStore } from '@/stores/mapStore'

const mapStore = useMapStore()
mapStore.setCurrentLocation(locationId)
```

### MapContainer Methods

```typescript
// Navigation
navigateTo(locationId)

// Zoom controls
zoomIn()
zoomOut()
resetView()

// View controls
togglePitch()
toggleDashboard()
```

## Next Steps

1. ✅ Mapbox integration complete
2. ⏳ Add more locations (safe houses, clubs, etc.)
3. ⏳ Implement location detail views
4. ⏳ Add mission markers
5. ⏳ Implement zstree search system
6. ⏳ Add real-world map tracking

## Resources

- [Mapbox GL JS Docs](https://docs.mapbox.com/mapbox-gl-js/)
- [Mapbox API Docs](https://docs.mapbox.com/api/)
- [Map Styles](https://docs.mapbox.com/mapbox-gl-js/style-spec/)
- [Examples](https://docs.mapbox.com/mapbox-gl-js/examples/)

---

**Status**: ✅ Live and interactive
**Version**: 1.0.0
**Last Updated**: 2026-06-26
