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

export default function SeriesSelector({ onSelectSeries }: SeriesSelectorProps) {
  return (
    <div className="relative">
      {/* Police lights behind buttons - always on */}
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
      {seriesList.map((series, index) => {
        const colIndex = index % 4;
        
        let borderGradient, glowColor;
        
        if (colIndex < 2) {
          // Columns 1-2: Red
          borderGradient = 'linear-gradient(135deg, rgba(255, 0, 0, 0.7), rgba(255, 0, 51, 0.7))';
          glowColor = 'rgba(255, 0, 0, 0.5)';
        } else if (colIndex === 2) {
          // Column 3: Apple CarPlay gradient
          borderGradient = 'linear-gradient(135deg, rgba(255, 0, 64, 0.7), rgba(255, 20, 147, 0.6))';
          glowColor = 'rgba(255, 0, 64, 0.5)';
        } else {
          // Column 4: NFS cyan
          borderGradient = 'linear-gradient(135deg, rgba(0, 212, 255, 0.7), rgba(56, 189, 248, 0.7))';
          glowColor = 'rgba(0, 212, 255, 0.5)';
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
              boxShadow: `0 0 30px ${glowColor}, inset 0 0 40px rgba(0, 0, 0, 0.6)`,
              minHeight: '140px',
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
              animation: 'breathePulse 3s ease-in-out infinite'
            }}
          >
          {/* Content */}
          <div className="relative z-10 p-6 flex flex-col items-center justify-center h-full">
            <div 
              className="text-white text-xl font-bold tracking-widest text-center uppercase transition-colors"
              style={{ 
                fontFamily: '"Reborn Technologies", sans-serif'
              }}
            >
              {series}
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