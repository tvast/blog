# Local Video Catalog System

**Dynamic integration of local video files from `/public` directory into your merch catalogue**

---

## Overview

The landing page now features a **local video catalog** that automatically loads videos from `/public` and mixes them with API-backed merch items. This creates a richer, more dynamic experience without requiring database changes.

## How It Works

### 1. **Composable: `useLocalVideoCatalog`**

```typescript
import { useLocalVideoCatalog } from '@/composables/useLocalVideoCatalog';

const { featured, latest, videoCount, getByCategory } = useLocalVideoCatalog();
```

**Available methods:**
- `featured` — First 3 videos (hero candidates)
- `latest` — Last 8 videos (grid display)
- `videoCount` — Total count
- `getByCategory(category)` — Filter by category
- `getRandomVideo()` — Random video for rotation

### 2. **Local Videos Manifest**

File: `src/composables/useLocalVideoCatalog.ts`

Each video is defined with metadata:
```typescript
{
  filename: 'cinema.mp4',
  title: 'Cinema Hero Loop',
  description: 'Cinematic intro loop for splash screens',
  category: 'featured',
  price_usd: 0,  // Free downloads
}
```

### 3. **Landing Page Integration**

The landing page prioritizes local videos:

```
Hero Background: Local video #1
           ↓
Featured Hero Card: Local video #1
           ↓
Grid (8 items):
  - Local videos [featured/latest]
  - API videos [prioritize video-backed items]
  - Fallback to image-only items
```

**Key logic:**
```typescript
// Hero: Local → API → Fallback
const featuredHero = computed(() => {
  if (localFeatured.value.length > 0) return localFeatured.value[0];
  // ... then API videos, then anything
});

// Grid: Merge local + API, de-duplicate
const gridItems = computed(() => {
  const merged = [...localItems, ...apiVideoItems, ...apiImageItems];
  // Remove duplicates by URL
});
```

---

## Current Local Catalog

**12 videos loaded from `/public`:**

| Video | Category | Price | Notes |
|-------|----------|-------|-------|
| `cinema.mp4` | featured | Free | Splash screen loop |
| `AZy1_Sh3tELL66iCf8ZEag...` | digital-edition | $29.99 | AI-generated cinematic |
| `AZy1-JCYnKGsXdc1XeCVuQ...` | digital-edition | $29.99 | Motion graphics |
| `Génération_Vidéo_Script...` | short-film | $39.99 | Script-generated cinema |
| `Extreme_close_up__slow_motion...` | stock-footage | $24.99 | Burning parchment |
| `Ombres_Accusatrices...` | visual-effects | $34.99 | Atmospheric shadows |
| `Vidéo_Générée_à_Partir...` | short-film | $39.99 | Narrative generation |
| `Cinematic_wide_shot__1880s...` | stock-footage | $34.99 | Period street scene |
| `Extreme_close_up_of_a_handwritten...` | stock-footage | $24.99 | Vintage poster |
| `L_Ombre_Court_Dans_La_Forêt` | visual-effects | $34.99 | Forest shadows |
| `Script_Vidéo_L_Homme_Universel` | short-film | $39.99 | Philosophical piece |
| `cinema.gif` | featured | Free | Fallback for splash |

---

## How to Add New Videos

### Option 1: Add File to `/public` (Manual)

1. Place your video file in `/public`
   ```bash
   cp my-video.mp4 /public/my-video.mp4
   ```

2. Update `useLocalVideoCatalog.ts`:
   ```typescript
   {
     filename: 'my-video.mp4',
     title: 'My New Video',
     description: 'What this video is about',
     category: 'short-film',      // featured, short-film, stock-footage, etc.
     price_usd: 39.99,
   }
   ```

3. Video auto-loads on next page refresh

### Option 2: Dynamic Discovery (Auto-scan)

To auto-discover new videos in `/public` without manual entries, create a file manifest loader:

```typescript
// Future enhancement: scan /api/assets to list public files
async function loadFromAssetAPI() {
  const files = await fetch('/api/assets').then(r => r.json());
  // Filter for .mp4/.webm files
  // Generate metadata automatically
}
```

---

## Display Badges

Videos are marked with visual indicators:

- **Local badge** (green) — Indicates video is from local catalog
  ```vue
  <q-badge v-if="item.is_local" color="positive" text-color="dark">
    Local
  </q-badge>
  ```

- **Video indicator** (amber camera) — Shows it's a video, not image
  ```vue
  <q-icon v-if="item.video_url" name="videocam" color="amber" />
  ```

- **Stock status** — "in catalog" for local, "in stock" / "sold out" for API items

---

## Styling & Interactions

### Hover States

Videos auto-play when you hover over their card:

```typescript
<video
  :autoplay="hoveredCardId === item.id"
  preload="none"
/>
```

This creates a preview effect without loading all videos upfront.

### Play Indicator

On hover, a play button appears over video cards:

```vue
<div class="merch-card__video-badge">
  <q-icon name="play_circle" size="28px" />
</div>
```

---

## Performance Optimization

**Video loading strategy:**

1. **Hero video** — Preload metadata only (`preload="metadata"`)
2. **Grid videos** — Load only on hover (`preload="none"`, `autoplay="hoveredCardId === item.id"`)
3. **Lazy loading** — Videos don't load until scrolled into view (browser native)
4. **Format** — MP4 recommended (97% browser support); WebM as fallback
5. **Duration** — Keep videos <10s for web (fast load/play)

---

## Data Model

Local videos are synthetic items with this structure:

```typescript
interface LocalVideoItem {
  id: string;                  // 'local-video-0', 'local-video-1', etc.
  title: string;              // Display name
  video_url: string;          // '/my-video.mp4' (relative path)
  description: string;        // Long description
  category: string;           // 'featured', 'short-film', 'stock-footage', etc.
  price_usd: number;          // Price (0 = free)
  stock: number;              // 0 for free, 10 for paid items
  created_at: string;         // ISO date
  is_local: true;             // Flag to distinguish from API items
}
```

This structure is compatible with your existing merch item type, so they integrate seamlessly.

---

## API Fallback

If API catalog (from `useMerchCatalog`) fails to load:

1. **Landing page still works** — Local videos display alone
2. **Grid fills from local only** — No API items to mix
3. **Hero uses local featured** — Fallback to first local video
4. **Error banner shows** — "Could not load merch from API" (existing)

This ensures your site is **always displayable** even if the backend is down.

---

## Future Enhancements

### 1. **Dynamic Pricing**
```typescript
// Load prices from a local JSON manifest
import catalogPrices from '@/data/video-catalog.json';
```

### 2. **Search & Filter**
```typescript
function searchLocalVideos(query: string) {
  return localLatest.value.filter(v =>
    v.title.includes(query) || v.description.includes(query)
  );
}
```

### 3. **Playlist Generation**
```typescript
function createPlaylist(category: string) {
  return getByCategory(category).map(v => v.video_url);
}
```

### 4. **Analytics Tracking**
```typescript
function trackVideoView(videoId: string) {
  analytics.logEvent('video_view', { video_id: videoId, is_local: true });
}
```

### 5. **Adaptive Bitrate**
```typescript
// Serve different qualities based on connection
const videoUrl = isSlowConnection ? '/low-bitrate.mp4' : '/full.mp4';
```

---

## File Structure

```
public/
├── cinema.mp4                    # Hero loop
├── cinema.gif                    # Fallback
├── AZy1_Sh3tELL66iCf8ZEag...mp4
├── Génération_Vidéo_Script…mp4
├── Extreme_close_up__slow…mp4
└── ... [8 more videos]

src/
├── composables/
│   └── useLocalVideoCatalog.ts   # Catalog loader
├── views/
│   └── LandingPage.vue           # Landing page (updated)
└── ...
```

---

## Troubleshooting

### Videos Not Showing

1. **Check file path**:
   ```bash
   ls -lh public/*.mp4
   ```

2. **Verify browser support**:
   - MP4: Chrome, Firefox, Safari, Edge ✅
   - WebM: Chrome, Firefox, Edge (not Safari)
   - GIF: All browsers (fallback)

3. **Check Network tab** — See if videos are requested
   - 200 = Loading OK
   - 404 = File not found in `/public`
   - 0 = CORS issue

### Videos Load Slowly

- Use smaller files (<5MB for 10s video)
- Optimize with FFmpeg:
  ```bash
  ffmpeg -i input.mp4 -c:v libx264 -crf 23 -c:a aac output.mp4
  ```

### Mixed Local + API Items Look Odd

- Ensure consistent image/video sizes in CSS
- All cards use `4:5` aspect ratio (responsive)
- Adjust `landing-grid` columns in media queries if needed

---

## Summary

| Aspect | Details |
|--------|---------|
| **Source** | `/public` folder files |
| **Count** | 12 videos loaded automatically |
| **Integration** | Composable + Landing Page |
| **Priority** | Local videos featured first |
| **Fallback** | Graceful (API optional) |
| **Performance** | Lazy-load on hover |
| **Extensible** | Easy to add files + update manifest |

---

**Status**: ✅ Live & Dynamic
**Last Updated**: 2026-03-19
**Next**: Add admin panel to manage local catalog without code edits
