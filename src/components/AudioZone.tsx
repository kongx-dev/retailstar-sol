import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface AudioTrack {
  name: string;
  ogg: string;
  mp3: string;
  volume?: number;
}

interface ZoneAudio {
  zone: string;
  tracks: AudioTrack[];
}

const zoneAudioConfig: ZoneAudio[] = [
  {
    zone: '/vault',
    tracks: [
      {
        name: 'Ghosts - 2_50pct_loop',
        ogg: '/src/assets/Ghosts - 2_50pct_loop.ogg',
        mp3: '/src/assets/Ghosts - 2_50pct_loop.mp3',
        volume: 0.3
      },
      {
        name: 'Starlight_75pct_loop',
        ogg: '/src/assets/Starlight_75pct_loop.ogg',
        mp3: '/src/assets/Starlight_75pct_loop.mp3',
        volume: 0.4
      }
    ]
  },
  {
    zone: '/directory',
    tracks: [
      {
        name: 'Symphony of Chaos_25pct_loop',
        ogg: '/src/assets/Symphony of Chaos_25pct_loop.ogg',
        mp3: '/src/assets/Symphony of Chaos_25pct_loop.mp3',
        volume: 0.5
      },
      {
        name: '90s VGs_75pct_loop',
        ogg: '/src/assets/90s VGs_25pct_loop.ogg',
        mp3: '/src/assets/90s VGs_25pct_loop.mp3',
        volume: 0.4
      }
    ]
  },
  {
    zone: '/marketplace',
    tracks: [
      {
        name: 'My Night_25pct_loop',
        ogg: '/src/assets/My Night_75pct_loop.ogg',
        mp3: '/src/assets/My Night_75pct_loop.mp3',
        volume: 0.3
      },
      {
        name: 'Ghosts - 2_25pct_loop',
        ogg: '/src/assets/Ghosts - 2_50pct_loop.ogg',
        mp3: '/src/assets/Ghosts - 2_50pct_loop.mp3',
        volume: 0.2
      }
    ]
  },
  {
    zone: '/scavrack',
    tracks: [
      {
        name: '90s VGs_25pct_loop',
        ogg: '/src/assets/90s VGs_25pct_loop.ogg',
        mp3: '/src/assets/90s VGs_25pct_loop.mp3',
        volume: 0.6
      }
    ]
  },
  {
    zone: '/wiki-directory',
    tracks: [
      {
        name: 'Ghosts - 2_50pct_loop',
        ogg: '/src/assets/Ghosts - 2_50pct_loop.ogg',
        mp3: '/src/assets/Ghosts - 2_50pct_loop.mp3',
        volume: 0.4
      }
    ]
  }
];

const AudioZone: React.FC = () => {
  const location = useLocation();
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const [isAudioEnabled, setIsAudioEnabled] = useState(() => {
    const saved = localStorage.getItem('retailstar_audio_enabled');
    return saved === null ? true : saved === 'true';
  });
  const [currentZone, setCurrentZone] = useState<string | null>(null);

  // Find the current zone based on pathname
  const getCurrentZone = (pathname: string): ZoneAudio | null => {
    return zoneAudioConfig.find(zone => pathname.startsWith(zone.zone)) || null;
  };

  // Fade out all audio
  const fadeOutAudio = (duration: number = 1000) => {
    audioRefs.current.forEach(audio => {
      if (audio && !audio.paused) {
        const startVolume = audio.volume;
        const steps = 20;
        const stepDuration = duration / steps;
        const volumeStep = startVolume / steps;

        const fadeInterval = setInterval(() => {
          if (audio.volume > volumeStep) {
            audio.volume -= volumeStep;
          } else {
            audio.pause();
            audio.volume = startVolume;
            clearInterval(fadeInterval);
          }
        }, stepDuration);
      }
    });
  };

  // Fade in audio for current zone
  const fadeInAudio = (zone: ZoneAudio, duration: number = 2000) => {
    zone.tracks.forEach((track, index) => {
      const audio = audioRefs.current[index];
      if (audio) {
        audio.volume = 0;
        audio.play().then(() => {
          const startVolume = track.volume || 0.3;
          const steps = 40;
          const stepDuration = duration / steps;
          const volumeStep = startVolume / steps;

          const fadeInterval = setInterval(() => {
            if (audio.volume < startVolume - volumeStep) {
              audio.volume += volumeStep;
            } else {
              audio.volume = startVolume;
              clearInterval(fadeInterval);
            }
          }, stepDuration);
        }).catch(err => {
          console.log('Audio autoplay blocked:', err);
        });
      }
    });
  };

  // Handle zone changes
  useEffect(() => {
    const zone = getCurrentZone(location.pathname);
    
    if (zone && zone.zone !== currentZone) {
      // Fade out current audio
      fadeOutAudio(1000);
      
      // Wait for fade out, then start new zone audio
      setTimeout(() => {
        if (isAudioEnabled) {
          setCurrentZone(zone.zone);
          fadeInAudio(zone, 2000);
        }
      }, 1000);
    } else if (!zone && currentZone) {
      // No zone found, fade out all audio
      fadeOutAudio(1000);
      setCurrentZone(null);
    }
  }, [location.pathname, isAudioEnabled]);

  // Listen for localStorage changes (from AudioToggle)
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('retailstar_audio_enabled');
      const newState = saved === null ? true : saved === 'true';
      setIsAudioEnabled(newState);
      
      if (!newState) {
        fadeOutAudio(1000);
        setCurrentZone(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      audioRefs.current.forEach(audio => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      });
    };
  }, []);

  const currentZoneConfig = getCurrentZone(location.pathname);

  if (!currentZoneConfig || !isAudioEnabled) {
    return null;
  }

  return (
    <div className="audio-zone-container">
      {currentZoneConfig.tracks.map((track, index) => (
        <audio
          key={`${currentZoneConfig.zone}-${track.name}`}
          ref={el => {
            if (el) audioRefs.current[index] = el;
          }}
          loop
          preload="auto"
          style={{ display: 'none' }}
        >
          <source src={track.ogg} type="audio/ogg" />
          <source src={track.mp3} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      ))}
      
      {/* Audio Controls (Optional - can be hidden) */}
      <div className="fixed bottom-4 left-4 z-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => {
            const newState = !isAudioEnabled;
            setIsAudioEnabled(newState);
            localStorage.setItem('retailstar_audio_enabled', newState.toString());
          }}
          className="bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg px-3 py-2 text-xs text-cyan-300 hover:text-cyan-200 transition-colors"
        >
          {isAudioEnabled ? '🔊' : '🔇'} Zone Audio
        </button>
      </div>
    </div>
  );
};

export default AudioZone; 