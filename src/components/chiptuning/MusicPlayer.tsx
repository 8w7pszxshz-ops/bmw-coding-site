import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

interface MusicPlayerProps {
  isOpen: boolean;
}

const playlist = [
  '/music/1.mp3',
  '/music/track2.mp3',
  '/music/track3.mp3'
];

export default function MusicPlayer({ isOpen }: MusicPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.5);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(playlist[0]);
      audioRef.current.volume = musicVolume;
    }

    const audio = audioRef.current;

    const handleTrackEnd = () => {
      const nextIndex = (currentTrackIndex + 1) % playlist.length;
      setCurrentTrackIndex(nextIndex);
      audio.src = playlist[nextIndex];
      audio.play().catch(err => console.log('Play error:', err));
    };

    audio.addEventListener('ended', handleTrackEnd);

    const handleVisibilityChange = () => {
      if (document.hidden && audio) {
        audio.pause();
        setIsMusicPlaying(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      audio.removeEventListener('ended', handleTrackEnd);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = musicVolume;
  }, [musicVolume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isOpen) {
      setCurrentTrackIndex(0);
      audio.src = playlist[0];
      audio.currentTime = 0;
      setIsMusicPlaying(false);
    } else {
      audio.pause();
      audio.currentTime = 0;
      setIsMusicPlaying(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.src !== playlist[currentTrackIndex]) {
      audio.src = playlist[currentTrackIndex];
      if (isMusicPlaying) {
        audio.play().catch(err => console.log('Play error:', err));
      }
    }
  }, [currentTrackIndex, isMusicPlaying]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMusicPlaying) {
      audio.pause();
      setIsMusicPlaying(false);
    } else {
      audio.play().then(() => {
        setIsMusicPlaying(true);
      }).catch(err => {
        console.log('Play error:', err);
        setIsMusicPlaying(false);
      });
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setMusicVolume(newVolume);
  };

  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
  };

  const prevTrack = () => {
    const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(prevIndex);
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
      
      {/* Previous track button */}
      <button
        onClick={prevTrack}
        className="w-7 h-7 flex items-center justify-center transition-all hover:scale-110"
        style={{
          background: 'rgba(255, 0, 0, 0.1)',
          border: '1px solid rgba(255, 0, 0, 0.5)'
        }}
      >
        <Icon name="ChevronLeft" className="w-4 h-4 text-red-400" />
      </button>
      
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
      
      {/* Next track button */}
      <button
        onClick={nextTrack}
        className="w-7 h-7 flex items-center justify-center transition-all hover:scale-110"
        style={{
          background: 'rgba(255, 0, 0, 0.1)',
          border: '1px solid rgba(255, 0, 0, 0.5)'
        }}
      >
        <Icon name="ChevronRight" className="w-4 h-4 text-red-400" />
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