import { Card, CardContent } from '@/components/ui/card';

interface SeriesSelectorProps {
  onSelectSeries: (series: 'F' | 'G') => void;
}

const seriesData = [
  { id: 'F', title: 'F-series', years: '2011-2019', color: '#00D4FF', delay: '0.1s' },
  { id: 'G', title: 'G-series', years: '2019+', color: '#B4FF00', delay: '0.2s' }
];

export default function SeriesSelector({ onSelectSeries }: SeriesSelectorProps) {
  return (
    <div className="max-w-2xl mx-auto mb-12 animate-fade-in">
      <h3 className="text-white text-xl font-light mb-6 text-center animate-slide-in">Выберите серию вашего BMW</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {seriesData.map((series) => (
          <Card
            key={series.id}
            onClick={() => onSelectSeries(series.id as 'F' | 'G')}
            className="group relative overflow-hidden border-0 transition-all duration-500 hover:scale-[1.02] cursor-pointer"
            style={{
              background: `
                linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02)),
                linear-gradient(135deg, ${series.color}08, ${series.color}03)
              `,
              backdropFilter: 'blur(40px)',
              boxShadow: `
                0 30px 80px -20px rgba(0, 0, 0, 0.6), 
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                0 0 0 1px ${series.color}15
              `,
              animationDelay: series.delay
            }}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle at center, ${series.color}25, transparent 70%)`,
                mixBlendMode: 'screen',
                boxShadow: `inset 0 0 80px ${series.color}40, 0 0 60px ${series.color}30`
              }}
            />

            <div 
              className="absolute top-0 left-0 right-0"
              style={{
                height: '2px',
                background: `linear-gradient(90deg, transparent 0%, ${series.color}40 20%, ${series.color}80 50%, ${series.color}40 80%, transparent 100%)`,
                boxShadow: `0 0 30px ${series.color}60, 0 2px 20px ${series.color}50`
              }}
            />
            <div 
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: '1px',
                background: `linear-gradient(90deg, transparent, ${series.color}40, transparent)`,
                boxShadow: `0 0 15px ${series.color}40`
              }}
            />
            <div 
              className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(90deg, transparent, ${series.color}, transparent)`,
                boxShadow: `0 0 40px ${series.color}, 0 0 60px ${series.color}`
              }}
            />
            <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none group-hover:opacity-40 transition-opacity duration-500" style={{ mixBlendMode: 'screen' }}>
              <defs>
                <pattern id={`series-${series.id}`} x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                  <circle cx="14" cy="14" r="1" fill={series.color} opacity="0.6">
                    <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
                  </circle>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#series-${series.id})`} />
            </svg>
            
            <CardContent className="p-8 relative z-10 text-center">
              <div 
                className="text-7xl font-light mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ color: series.color }}
              >
                {series.id}
              </div>
              
              <h3 className="text-2xl font-light text-white mb-2 tracking-tight">
                {series.title}
              </h3>
              <p className="text-sm text-white/40 font-light">
                {series.years}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}