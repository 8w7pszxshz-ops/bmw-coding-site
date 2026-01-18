import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface MusicPlayerProps {
  isOpen: boolean;
}

const playlist = [
  '/music/track1.mp3',
  '/music/track2.mp3',
  '/music/track3.mp3',
  '/music/track4.mp3',
  '/music/track5.mp3'
];

export default function MusicPlayer({ isOpen }: MusicPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [bgMusic] = useState(() => new Audio(playlist[0]));
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.5);

  useEffect(() => {
    // Setup background music (no loop, auto-next track)
    bgMusic.volume = musicVolume;
    
    const handleTrackEnd = () => {
      // Go to next track
      const nextIndex = (currentTrackIndex + 1) % playlist.length;
      setCurrentTrackIndex(nextIndex);
      bgMusic.src = playlist[nextIndex];
      bgMusic.play();
    };
    
    bgMusic.addEventListener('ended', handleTrackEnd);
    
    return () => {
      bgMusic.removeEventListener('ended', handleTrackEnd);
    };
  }, [bgMusic, musicVolume, currentTrackIndex]);

  useEffect(() => {
    if (isOpen) {
      // Always start from track 1
      setCurrentTrackIndex(0);
      bgMusic.src = playlist[0];
      bgMusic.currentTime = 0;
      
      // Start background music
      bgMusic.play().then(() => {
        setIsMusicPlaying(true);
      }).catch((err) => {
        console.log('Music autoplay blocked:', err);
      });
    } else {
      bgMusic.pause();
      bgMusic.currentTime = 0;
      setIsMusicPlaying(false);
    }
  }, [isOpen, bgMusic]);

  const toggleMusic = () => {
    if (isMusicPlaying) {
      bgMusic.pause();
      setIsMusicPlaying(false);
    } else {
      bgMusic.play();
      setIsMusicPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setMusicVolume(newVolume);
    bgMusic.volume = newVolume;
  };

  return (
    <div 
      className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2 z-10"
      style={{
        background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.9) 0%, rgba(26, 8, 8, 0.9) 100%)',
        border: '2px solid rgba(255, 0, 0, 0.4)',
        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
        boxShadow: '0 0 15px rgba(255, 0, 0, 0.3)'
      }}
    >
      {/* Track info */}
      <span className="text-red-400 text-xs uppercase tracking-wider" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
        {currentTrackIndex + 1}/{playlist.length}
      </span>
      
      {/* Play/Pause button */}
      <button
        onClick={toggleMusic}
        className="w-8 h-8 flex items-center justify-center transition-all hover:scale-110"
        style={{
          background: isMusicPlaying ? 'rgba(255, 0, 0, 0.3)' : 'rgba(255, 0, 0, 0.1)',
          border: '1px solid rgba(255, 0, 0, 0.5)'
        }}
      >
        <Icon name={isMusicPlaying ? "Pause" : "Play"} className="w-4 h-4 text-red-400" />
      </button>
      
      {/* Volume slider */}
      <div className="flex items-center gap-2">
        <Icon name="Volume2" className="w-4 h-4 text-red-400" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={musicVolume}
          onChange={handleVolumeChange}
          className="w-20 h-1 bg-red-900/30 rounded-lg appearance-none cursor-pointer"
          style={{
            accentColor: '#ff0000'
          }}
        />
      </div>
    </div>
  );
}
