type Series = '1 SERIES' | '2 SERIES' | '3 SERIES' | '4 SERIES' | '5 SERIES' | '6 SERIES' | '7 SERIES' | 'X1' | 'X3' | 'X4' | 'X5' | 'X6' | 'M2' | 'M3' | 'M4' | 'M5' | 'Z4';

const seriesList: Series[] = [
  '1 SERIES', '2 SERIES', '3 SERIES', '4 SERIES', 
  '5 SERIES', '6 SERIES', '7 SERIES', 'M2',
  'M3', 'M4', 'M5', 'M6',
  'X1', 'X3', 'X4', 'X5', 'X6', 'Z4'
];

interface SeriesSelectorProps {
  showLights: boolean;
  onSelectSeries: (series: Series) => void;
}

export default function SeriesSelector({ showLights, onSelectSeries }: SeriesSelectorProps) {
  return (
    <div className="relative">
      {/* Police lights behind buttons - 20 seconds - same as MainLayout */}
      {showLights && (
        <>
          {/* Layer 1 - Main gradient */}
          <div 
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 0, 13, 0.6) 25%, transparent 50%, rgba(255, 0, 13, 0.6) 75%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'policeLights 2s linear infinite',
              filter: 'blur(120px)',
              borderRadius: '1rem'
            }}
          />
          {/* Layer 2 - Radial ellipses */}
          <div 
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(ellipse at 20% 50%, rgba(255, 0, 13, 0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(255, 0, 13, 0.4) 0%, transparent 50%)',
              backgroundSize: '200% 100%',
              animation: 'policeLights 2s linear infinite',
              filter: 'blur(100px)'
            }}
          />
          {/* Layer 3 - Slower gradient */}
          <div 
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 0, 13, 0.35) 20%, transparent 40%, transparent 60%, rgba(255, 0, 13, 0.35) 80%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'policeLights 2.5s linear infinite',
              filter: 'blur(150px)'
            }}
          />
          {/* Extra intensity layer */}
          <div 
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(255, 0, 13, 0.5) 0%, transparent 50%)',
              animation: 'policeLights 2s linear infinite',
              filter: 'blur(140px)'
            }}
          />
        </>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
      {seriesList.map((series, index) => {
        // Column calculation (0-3 for 4 columns)
        const colIndex = index % 4;
        
        // Column 0-1: Pure Apple style (blue → orange → purple)
        // Column 2: Apple → NFS cyan-teal transition
        // Column 3: Custom neon (green → pink → yellow)
        
        let borderGradient, boxShadowColor, animationName;
        
        if (colIndex < 2) {
          // Columns 1-2: Pure Apple colors
          borderGradient = 'linear-gradient(135deg, rgba(138, 180, 248, 0.6), rgba(251, 146, 60, 0.6), rgba(167, 139, 250, 0.6), rgba(34, 211, 238, 0.6))';
          boxShadowColor = 'rgba(138, 180, 248, 0.4)';
          animationName = 'appleGradient';
        } else if (colIndex === 2) {
          // Column 3: Apple → NFS cyan-teal
          borderGradient = 'linear-gradient(135deg, rgba(138, 180, 248, 0.6), rgba(34, 211, 238, 0.7), rgba(20, 184, 166, 0.7), rgba(6, 182, 212, 0.6))';
          boxShadowColor = 'rgba(34, 211, 238, 0.5)';
          animationName = 'appleToNFS';
        } else {
          // Column 4: Custom neon mix
          borderGradient = 'linear-gradient(135deg, rgba(74, 222, 128, 0.6), rgba(244, 114, 182, 0.6), rgba(251, 191, 36, 0.7), rgba(139, 92, 246, 0.6))';
          boxShadowColor = 'rgba(74, 222, 128, 0.4)';
          animationName = 'neonPulse';
        }
        
        return (
        <button
          key={series}
          onClick={() => onSelectSeries(series)}
          className="group relative transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.8) 0%, rgba(26, 8, 8, 0.8) 100%)',
            backdropFilter: 'blur(10px)',
            border: '2px solid transparent',
            backgroundImage: `linear-gradient(135deg, rgba(10, 10, 15, 0.8) 0%, rgba(26, 8, 8, 0.8) 100%), ${borderGradient}`,
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: `0 0 30px ${boxShadowColor}, inset 0 0 40px rgba(0, 0, 0, 0.6)`,
            minHeight: '140px',
            clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
            animation: `${animationName} 6s ease infinite`
          }}
        >
          {/* Corner cuts with Apple colors */}
          <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none" style={{ 
            background: 'linear-gradient(to bottom right, rgba(138, 180, 248, 0.4), transparent)',
            clipPath: 'polygon(100% 0, 100% 100%, 0 0)'
          }} />
          <div className="absolute bottom-0 left-0 w-12 h-12 pointer-events-none" style={{ 
            background: 'linear-gradient(to top right, rgba(251, 146, 60, 0.4), transparent)',
            clipPath: 'polygon(0 100%, 100% 100%, 0 0)'
          }} />
          
          {/* Apple rainbow glow on hover */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(138, 180, 248, 0.3), rgba(251, 146, 60, 0.2), transparent 70%)',
              boxShadow: 'inset 0 0 60px rgba(138, 180, 248, 0.3)'
            }}
          />
          
          {/* Apple gradient texture overlay */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(138, 180, 248, 0.2) 1px, rgba(138, 180, 248, 0.2) 2px)',
              mixBlendMode: 'overlay'
            }}
          />
          
          {/* Tech scanlines with Apple colors */}
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(138, 180, 248, 0.3) 2px, rgba(138, 180, 248, 0.3) 4px)'
            }}
          />
          
          {/* Content */}
          <div className="relative z-10 p-6 flex flex-col items-center justify-center h-full">
            {/* Apple color accent corner */}
            <div 
              className="absolute top-2 left-2 w-8 h-0.5 group-hover:w-12 transition-all"
              style={{ 
                background: 'linear-gradient(90deg, rgba(138, 180, 248, 0.8), rgba(251, 146, 60, 0.8))',
                boxShadow: '0 0 10px rgba(138, 180, 248, 0.6)' 
              }}
            />
            <div 
              className="absolute top-2 left-2 w-0.5 h-8 group-hover:h-12 transition-all"
              style={{ 
                background: 'linear-gradient(180deg, rgba(138, 180, 248, 0.8), rgba(167, 139, 250, 0.8))',
                boxShadow: '0 0 10px rgba(138, 180, 248, 0.6)' 
              }}
            />
            
            <div 
              className="text-white text-xl font-bold tracking-widest text-center uppercase transition-colors"
              style={{ 
                fontFamily: '"Reborn Technologies", sans-serif',
                textShadow: '2px 2px 0 rgba(138, 180, 248, 0.3), 0 0 20px rgba(138, 180, 248, 0.5), 0 2px 4px rgba(0, 0, 0, 0.8)'
              }}
            >
              {series}
            </div>
            
            {/* Bottom tech detail with Apple colors */}
            <div className="absolute bottom-2 right-2 flex gap-1">
              <div className="w-1 h-1 opacity-50" style={{ background: 'rgba(138, 180, 248, 0.8)' }} />
              <div className="w-1 h-1 opacity-70" style={{ background: 'rgba(251, 146, 60, 0.8)' }} />
              <div className="w-1 h-1" style={{ background: 'rgba(167, 139, 250, 0.9)', boxShadow: '0 0 5px rgba(138, 180, 248, 0.8)' }} />
            </div>
          </div>
        </button>
        );
      })}
      </div>
    </div>
  );
}

export type { Series };