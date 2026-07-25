# 🎬 Home Page Video Backgrounds

Enhanced home page with cinematic video backgrounds on all interactive cards.

## ✨ Features

### Video Backgrounds on Cards
- **Portal Cards** - Each route card has a unique video background
- **Content Cards** - Poems, Scenarios, Reel sections with videos
- **Glassmorphism Effect** - Videos with gradient overlay for text readability
- **Smooth Looping** - All videos play continuously with muted audio
- **Responsive** - Videos adapt to different screen sizes

### Video Integration
- Videos auto-play (muted)
- Continuous loop
- 65% opacity overlay for text contrast
- Cinematic gradient overlays
- Touch/mobile friendly

## 📹 Available Videos

### Current Video Library
```
Portal Cards (6 videos, cycling):
├── AZy1-JCYnKGsXdc1XeCVuQ-AZy1-JCYy6-h2FYvnSl5qw.mp4
├── AZy1_Sh3tELL66iCf8ZEag-AZy1_Sh31hTbAfnFFGjvzw.mp4
├── Cinematic_wide_shot__1880s_cobblestone_street_at_night__A_panicked_crowd_of_silhouettes___men__women.mp4
├── Extreme_close_up__slow_motion__A_worn_piece_of_parchment_paper_burns_on_a_wooden_table_in_a_dark_188.mp4
├── Extreme_close_up_of_a_handwritten_1880s_wanted_poster_nailed_to_a_dark_wooden_post_at_night__swingin.mp4
└── Génération_Vidéo_Script_Elihpoehtnsauvé.mp4

Content Cards (3 videos):
├── Poems: videoSources[0]
├── Scenarios: videoSources[1]
└── Reel: videoSources[2]

Additional Videos Available:
├── L_Ombre_Court_Dans_La_Forêt.mp4
├── Ombres_Accusatrices_Reflet_Indéfini.mp4
├── Script_Vidéo_L_Homme_Universel.mp4
├── Vidéo_Générée_à_Partir_d_un_Script.mp4
├── canvas.mp4
└── cinema.mp4
```

## 🏗️ Architecture

### Files Modified

**`src/components/HomeViewI18n.vue`**
- Added `VideoBackground` component import
- Added `videoSources` array with 6 video file names
- Added `getVideoForIndex(index)` helper function
- Updated portal cards to use `VideoBackground`
- Updated content cards (poems, scenarios, reel) to use `VideoBackground`
- Added CSS for positioning video backgrounds

### Files Created

**`src/components/ui/VideoBackground.vue`**
- Reusable video background component
- Props:
  - `src` - Video file path (string)
  - `overlay` - Show gradient overlay (boolean, default: true)
  - `overlayOpacity` - Overlay opacity 0-1 (number, default: 0.6)
- Features:
  - Auto-play muted video
  - Infinite loop
  - Cinematic gradient overlay
  - Slot for content over video
  - Responsive object-fit: cover

## 🎯 Usage

### Basic Usage in Component

```vue
<template>
  <div class="card">
    <VideoBackground src="path/to/video.mp4" :overlay-opacity="0.65">
      <div class="content">
        <h3>Card Title</h3>
        <p>Card content here</p>
      </div>
    </VideoBackground>
  </div>
</template>

<script setup>
import VideoBackground from '@/components/ui/VideoBackground.vue'
</script>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
  min-height: 200px;
}

.card :deep(.video-background) {
  position: absolute;
  inset: 0;
}

.content {
  position: relative;
  z-index: 1;
  padding: 18px;
}
</style>
```

### Portal Card Example (from HomeViewI18n)

```vue
<RouterLink
  v-for="(item, index) in featuredRoutes"
  :key="item.path"
  :to="item.path"
  class="portal-card glass-card"
>
  <VideoBackground :src="getVideoForIndex(index)" :overlay-opacity="0.65">
    <div class="portal-content">
      <h3>{{ item.label }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </VideoBackground>
</RouterLink>
```

## 🎨 Customization

### Change Video Library

Edit `HomeViewI18n.vue`:

```typescript
const videoSources = [
  'your-video-1.mp4',
  'your-video-2.mp4',
  'your-video-3.mp4',
  // ... add more
]
```

### Adjust Overlay Opacity

```vue
<!-- More transparent overlay -->
<VideoBackground src="path" :overlay-opacity="0.4" />

<!-- Darker overlay -->
<VideoBackground src="path" :overlay-opacity="0.8" />
```

### Change Overlay Color

Edit `VideoBackground.vue`:

```vue
<div class="video-overlay" style="background: linear-gradient(135deg, rgba(255,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)" />
```

### Disable Overlay

```vue
<VideoBackground src="path" :overlay="false" />
```

### Customize Video Properties

Edit `VideoBackground.vue`:

```vue
<video
  :src="videoSrc"
  autoplay
  muted
  loop
  playsinline
  class="video-element"
  poster="path-to-poster.jpg"  <!-- Add poster image -->
/>
```

## 🔄 Video Cycling Logic

### getVideoForIndex(index)

```typescript
const getVideoForIndex = (index: number): string => {
  return videoSources[index % videoSources.length]
}

// Examples:
getVideoForIndex(0) // videoSources[0]
getVideoForIndex(1) // videoSources[1]
getVideoForIndex(6) // videoSources[0] (cycles)
getVideoForIndex(7) // videoSources[1] (cycles)
```

This ensures:
- If 6 videos, 6+ cards will cycle through the list
- More cards than videos? They loop
- Unique video per card (within the cycle)

## 📊 Performance Considerations

### Video Size Best Practices
- Keep videos under 10MB for web
- Use H.264 codec (MP4 format)
- Resolution: 1920x1080 or lower
- Frame rate: 24-30fps

### Optimization
- Videos are muted (no audio overhead)
- Loop attribute is browser-optimized
- Lazy loading recommended for many videos
- CSS containment improves rendering

### Browser Compatibility
- All modern browsers support `<video>` tag
- `playsinline` for mobile Safari
- Fallback: add `<source>` tags for format variations

## 🚀 Adding Videos to Other Sections

### Steps to Add Video Backgrounds to New Sections

1. **Import VideoBackground**
   ```vue
   import VideoBackground from '@/components/ui/VideoBackground.vue'
   ```

2. **Wrap Card Content**
   ```vue
   <div class="card">
     <VideoBackground :src="videoPath" :overlay-opacity="0.65">
       <div class="card-content">
         <!-- Your content here -->
       </div>
     </VideoBackground>
   </div>
   ```

3. **Add CSS**
   ```css
   .card {
     position: relative;
     overflow: hidden;
   }

   .card :deep(.video-background) {
     position: absolute;
     inset: 0;
   }

   .card-content {
     position: relative;
     z-index: 1;
     padding: 18px;
   }
   ```

## 🎬 Demo Videos in Public

Browse available videos:
- `/public/*.mp4` - Root level videos
- `/public/videos/` - Video subfolder
- `/public/coming-soon/` - Coming soon section videos

## 💡 Tips

### For Best Results
- Match video content to card purpose
- Use darker videos with light text overlays
- Test on mobile for performance
- Use short, looping video clips
- Maintain 16:9 or 4:3 aspect ratio

### Troubleshooting
- Video not playing? Check file path is correct
- Video too bright? Increase `overlayOpacity`
- Text hard to read? Adjust overlay color/opacity
- Performance issues? Reduce video resolution
- No video showing? Check browser DevTools console

---

**Status:** ✅ Video backgrounds integrated
**Cards with Videos:** Portal cards + Content cards
**Total Videos Used:** 6 (cycling)
**Video Format:** MP4
**Audio:** Muted (no audio)
**Loop:** Continuous
