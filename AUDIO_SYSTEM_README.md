# 🎵 Retailstar Mall Audio System

## Overview

The Retailstar Mall Audio System provides zone-specific ambient audio that automatically plays when users navigate to different areas of the mall. Each zone has its own curated audio tracks that enhance the immersive experience.

## 🏗️ Architecture

### Core Components

1. **`AudioZone.tsx`** - Main audio controller component
2. **`AudioToggle.tsx`** - User-facing audio control toggle
3. **Zone Configuration** - Zone-to-audio mapping system

### Zone Audio Mapping

| Zone | Audio Tracks | Mood |
|------|-------------|------|
| `/vault` | Ghosts - 2_50pct_loop, Starlight_75pct_loop | Haunting + ambient |
| `/directory` | Symphony of Chaos_25pct_loop, 90s VGs_25pct_loop | Glitchy + deep system feel |
| `/marketplace` | My Night_75pct_loop, Ghosts - 2_50pct_loop | Experimental + slightly eerie |
| `/scavrack` | 90s VGs_25pct_loop | High-energy retro gaming |
| `/wiki-directory` | Ghosts - 2_50pct_loop | Mysterious lore atmosphere |

## 🎯 Features

### Automatic Zone Detection
- Detects current route and plays appropriate audio
- Smooth fade transitions between zones
- Graceful handling of route changes

### Volume Control
- Individual track volume settings per zone
- Smooth fade in/out transitions (1-2 seconds)
- Respects browser autoplay policies

### User Controls
- Persistent audio preference storage
- Toggle button in bottom-left corner
- Hover to reveal controls

### Cross-Tab Synchronization
- Audio state syncs across browser tabs
- localStorage-based preference management
- Real-time toggle updates

## 🎵 Audio Files

### Required Files (in `/src/assets/`)
```
Ghosts - 2_50pct_loop.ogg
Ghosts - 2_50pct_loop.mp3
90s VGs_25pct_loop.ogg
90s VGs_25pct_loop.mp3
My Night_75pct_loop.ogg
My Night_75pct_loop.mp3
Starlight_75pct_loop.ogg
Starlight_75pct_loop.mp3
Symphony of Chaos_25pct_loop.ogg
Symphony of Chaos_25pct_loop.mp3
```

### Audio Specifications
- **Format**: OGG (primary) + MP3 (fallback)
- **Loop**: All tracks loop seamlessly
- **Volume**: 0.2-0.6 range per track
- **Duration**: 30-60 seconds per loop

## 🛠️ Implementation

### Basic Usage

```tsx
// In App.jsx
import AudioZone from './components/AudioZone';
import AudioToggle from './components/AudioToggle';

function App() {
  return (
    <Router>
      <AudioZone />
      <AudioToggle />
      {/* ... rest of app */}
    </Router>
  );
}
```

### Zone Configuration

```tsx
const zoneAudioConfig: ZoneAudio[] = [
  {
    zone: '/vault',
    tracks: [
      {
        name: 'Ghosts - 2_50pct_loop',
        ogg: '/src/assets/Ghosts - 2_50pct_loop.ogg',
        mp3: '/src/assets/Ghosts - 2_50pct_loop.mp3',
        volume: 0.3
      }
    ]
  }
];
```

### Adding New Zones

1. Add zone configuration to `zoneAudioConfig`
2. Place audio files in `/src/assets/`
3. Update zone mapping logic if needed

## 🎨 User Experience

### Visual Design
- Subtle toggle button (bottom-left)
- Hover to reveal controls
- Consistent with mall aesthetic
- Non-intrusive placement

### Audio Behavior
- Automatic zone detection
- Smooth transitions
- Respects user preferences
- Graceful fallbacks

### Accessibility
- Screen reader friendly
- Keyboard navigation support
- Clear visual indicators
- Persistent preferences

## 🔧 Technical Details

### Browser Compatibility
- Modern browsers with Web Audio API
- Graceful fallback for older browsers
- Autoplay policy handling
- Mobile device considerations

### Performance
- Lazy loading of audio files
- Efficient memory management
- Minimal CPU usage
- Optimized file sizes

### Storage
```javascript
// localStorage keys
'retailstar_audio_enabled' // boolean
```

## 🚀 Future Enhancements

### Planned Features
- **Random Track Selection** - Multiple tracks per zone
- **Volume Slider** - Fine-tuned volume control
- **Audio Visualizer** - Visual audio feedback
- **Custom Playlists** - User-defined zone audio
- **Mobile Optimization** - Better mobile audio handling

### Integration Ideas
- **Retailrunner Integration** - AI-controlled audio
- **Event-Based Audio** - Special events trigger unique audio
- **User-Generated Content** - Community audio submissions
- **Dynamic Mixing** - Real-time audio composition

## 🐛 Troubleshooting

### Common Issues

1. **Audio not playing**
   - Check browser autoplay settings
   - Verify audio files exist
   - Check console for errors

2. **Volume too loud/quiet**
   - Adjust volume in zone configuration
   - Check system volume
   - Verify audio file quality

3. **Audio cutting out**
   - Check network connectivity
   - Verify file loading
   - Check browser memory usage

### Debug Mode

```javascript
// Enable debug logging
localStorage.setItem('retailstar_audio_debug', 'true');
```

## 📝 Notes

- Audio files should be optimized for web (compressed, reasonable file sizes)
- Consider bandwidth usage for mobile users
- Test across different browsers and devices
- Monitor user feedback for volume adjustments
- Respect user privacy and accessibility preferences

---

**🎵 The Retailstar Mall Audio System** - Enhancing the digital mall experience with curated ambient audio for each zone. 