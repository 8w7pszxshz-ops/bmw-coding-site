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
      {seriesList.map((series, index) => (
        <button
          key={series}
          onClick={() => onSelectSeries(series)}
          className="group relative transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.8) 0%, rgba(26, 8, 8, 0.8) 100%)',
            backdropFilter: 'blur(10px)',
            border: '2px solid',
            borderImage: 'linear-gradient(135deg, rgba(255, 0, 0, 0.4), rgba(255, 0, 51, 0.7), rgba(255, 0, 0, 0.4)) 1',
            boxShadow: '0 0 20px rgba(255, 0, 0, 0.3), inset 0 0 40px rgba(0, 0, 0, 0.6)',
            minHeight: '140px',
            clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
          }}
        >
          {/* Corner cuts */}
          <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-red-600/40 to-transparent pointer-events-none" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
          <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-red-600/40 to-transparent pointer-events-none" style={{ clipPath: 'polygon(0 100%, 100% 100%, 0 0)' }} />
          
          {/* Orange glow on hover */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(255, 0, 0, 0.3), transparent 70%)',
              boxShadow: 'inset 0 0 60px rgba(255, 0, 0, 0.4)'
            }}
          />
          
          {/* Grunge texture overlay */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(255, 0, 0, 0.15) 1px, rgba(255, 0, 0, 0.15) 2px)',
              mixBlendMode: 'overlay'
            }}
          />
          
          {/* Tech scanlines */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 0, 0, 0.4) 2px, rgba(255, 0, 0, 0.4) 4px)'
            }}
          />
          
          {/* Content */}
          <div className="relative z-10 p-6 flex flex-col items-center justify-center h-full">
            {/* Orange accent corner */}
            <div 
              className="absolute top-2 left-2 w-8 h-0.5 bg-red-500 group-hover:w-12 transition-all"
              style={{ boxShadow: '0 0 10px rgba(255, 0, 0, 0.8)' }}
            />
            <div 
              className="absolute top-2 left-2 w-0.5 h-8 bg-red-500 group-hover:h-12 transition-all"
              style={{ boxShadow: '0 0 10px rgba(255, 0, 0, 0.8)' }}
            />
            
            <div 
              className="text-white text-xl font-bold tracking-widest text-center uppercase group-hover:text-red-400 transition-colors"
              style={{ 
                fontFamily: '"Reborn Technologies", sans-serif',
                textShadow: '2px 2px 0 rgba(255, 0, 0, 0.4), 0 0 20px rgba(255, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.8)'
              }}
            >
              {series}
            </div>
            
            {/* Bottom tech detail */}
            <div className="absolute bottom-2 right-2 flex gap-1">
              <div className="w-1 h-1 bg-red-500 opacity-50" />
              <div className="w-1 h-1 bg-red-500 opacity-70" />
              <div className="w-1 h-1 bg-red-500" style={{ boxShadow: '0 0 5px #ff0000' }} />
            </div>
          </div>
        </button>
      ))}
      </div>
    </div>
  );
}

export type { Series };
