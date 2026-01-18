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
        
        // Column 0-1: Apple Services pink-magenta gradient (static)
        // Column 2: NFS cyan-teal (static)
        // Column 3: Custom orange-purple gradient
        
        let borderGradient, boxShadowColor;
        
        if (colIndex < 2) {
          // Columns 1-2: Apple Services magenta-pink
          borderGradient = 'linear-gradient(135deg, rgba(219, 39, 119, 0.7), rgba(244, 63, 94, 0.7), rgba(251, 113, 133, 0.6))';
          boxShadowColor = 'rgba(219, 39, 119, 0.5)';
        } else if (colIndex === 2) {
          // Column 3: NFS cyan-teal blue
          borderGradient = 'linear-gradient(135deg, rgba(56, 189, 248, 0.7), rgba(34, 211, 238, 0.7), rgba(20, 184, 166, 0.6))';
          boxShadowColor = 'rgba(34, 211, 238, 0.5)';
        } else {
          // Column 4: Custom orange-purple
          borderGradient = 'linear-gradient(135deg, rgba(251, 146, 60, 0.7), rgba(249, 115, 22, 0.7), rgba(168, 85, 247, 0.6))';
          boxShadowColor = 'rgba(251, 146, 60, 0.5)';
        }
        
        return (
        <div key={series} className="relative">
          {/* Black backdrop */}
          <div 
            className="absolute inset-0 bg-black rounded-lg"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
            }}
          />
          
          <button
            onClick={() => onSelectSeries(series)}
            className="group relative transition-all duration-300 hover:scale-105 active:scale-95 w-full"
            style={{
              background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.95) 0%, rgba(26, 8, 8, 0.95) 100%)',
              backdropFilter: 'blur(10px)',
              border: '2px solid transparent',
              backgroundImage: `linear-gradient(135deg, rgba(10, 10, 15, 0.95) 0%, rgba(26, 8, 8, 0.95) 100%), ${borderGradient}`,
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              boxShadow: `0 0 30px ${boxShadowColor}, inset 0 0 40px rgba(0, 0, 0, 0.6)`,
              minHeight: '140px',
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
              animation: 'breathePulse 3s ease-in-out infinite'
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
            {/* Color accent corner based on column */}
            {colIndex < 2 ? (
              // Columns 1-2: Pink-Magenta
              <>
                <div 
                  className="absolute top-2 left-2 w-8 h-0.5 group-hover:w-12 transition-all"
                  style={{ 
                    background: 'linear-gradient(90deg, rgba(219, 39, 119, 0.8), rgba(244, 63, 94, 0.8))',
                    boxShadow: '0 0 10px rgba(219, 39, 119, 0.6)' 
                  }}
                />
                <div 
                  className="absolute top-2 left-2 w-0.5 h-8 group-hover:h-12 transition-all"
                  style={{ 
                    background: 'linear-gradient(180deg, rgba(219, 39, 119, 0.8), rgba(251, 113, 133, 0.8))',
                    boxShadow: '0 0 10px rgba(219, 39, 119, 0.6)' 
                  }}
                />
              </>
            ) : colIndex === 2 ? (
              // Column 3: Cyan-Teal
              <>
                <div 
                  className="absolute top-2 left-2 w-8 h-0.5 group-hover:w-12 transition-all"
                  style={{ 
                    background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.8), rgba(34, 211, 238, 0.8))',
                    boxShadow: '0 0 10px rgba(56, 189, 248, 0.6)' 
                  }}
                />
                <div 
                  className="absolute top-2 left-2 w-0.5 h-8 group-hover:h-12 transition-all"
                  style={{ 
                    background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.8), rgba(20, 184, 166, 0.8))',
                    boxShadow: '0 0 10px rgba(56, 189, 248, 0.6)' 
                  }}
                />
              </>
            ) : (
              // Column 4: Orange-Purple
              <>
                <div 
                  className="absolute top-2 left-2 w-8 h-0.5 group-hover:w-12 transition-all"
                  style={{ 
                    background: 'linear-gradient(90deg, rgba(251, 146, 60, 0.8), rgba(249, 115, 22, 0.8))',
                    boxShadow: '0 0 10px rgba(251, 146, 60, 0.6)' 
                  }}
                />
                <div 
                  className="absolute top-2 left-2 w-0.5 h-8 group-hover:h-12 transition-all"
                  style={{ 
                    background: 'linear-gradient(180deg, rgba(251, 146, 60, 0.8), rgba(168, 85, 247, 0.8))',
                    boxShadow: '0 0 10px rgba(251, 146, 60, 0.6)' 
                  }}
                />
              </>
            )}
            
            <div 
              className="text-white text-xl font-bold tracking-widest text-center uppercase transition-colors"
              style={{ 
                fontFamily: '"Reborn Technologies", sans-serif',
                textShadow: colIndex < 2 
                  ? '2px 2px 0 rgba(219, 39, 119, 0.3), 0 0 20px rgba(219, 39, 119, 0.5), 0 2px 4px rgba(0, 0, 0, 0.8)'
                  : colIndex === 2
                  ? '2px 2px 0 rgba(56, 189, 248, 0.3), 0 0 20px rgba(56, 189, 248, 0.5), 0 2px 4px rgba(0, 0, 0, 0.8)'
                  : '2px 2px 0 rgba(251, 146, 60, 0.3), 0 0 20px rgba(251, 146, 60, 0.5), 0 2px 4px rgba(0, 0, 0, 0.8)'
              }}
            >
              {series}
            </div>
            
            {/* Bottom tech detail */}
            <div className="absolute bottom-2 right-2 flex gap-1">
              {colIndex < 2 ? (
                // Pink-Magenta dots
                <>
                  <div className="w-1 h-1 opacity-50" style={{ background: 'rgba(219, 39, 119, 0.8)' }} />
                  <div className="w-1 h-1 opacity-70" style={{ background: 'rgba(244, 63, 94, 0.8)' }} />
                  <div className="w-1 h-1" style={{ background: 'rgba(251, 113, 133, 0.9)', boxShadow: '0 0 5px rgba(219, 39, 119, 0.8)' }} />
                </>
              ) : colIndex === 2 ? (
                // Cyan-Teal dots
                <>
                  <div className="w-1 h-1 opacity-50" style={{ background: 'rgba(56, 189, 248, 0.8)' }} />
                  <div className="w-1 h-1 opacity-70" style={{ background: 'rgba(34, 211, 238, 0.8)' }} />
                  <div className="w-1 h-1" style={{ background: 'rgba(20, 184, 166, 0.9)', boxShadow: '0 0 5px rgba(56, 189, 248, 0.8)' }} />
                </>
              ) : (
                // Orange-Purple dots
                <>
                  <div className="w-1 h-1 opacity-50" style={{ background: 'rgba(251, 146, 60, 0.8)' }} />
                  <div className="w-1 h-1 opacity-70" style={{ background: 'rgba(249, 115, 22, 0.8)' }} />
                  <div className="w-1 h-1" style={{ background: 'rgba(168, 85, 247, 0.9)', boxShadow: '0 0 5px rgba(251, 146, 60, 0.8)' }} />
                </>
              )}
            </div>
          </div>
        </button>
        </div>
        );
      })}
      </div>
    </div>
  );
}

export type { Series };