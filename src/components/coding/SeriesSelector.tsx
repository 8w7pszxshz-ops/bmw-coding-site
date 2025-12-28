import Icon from '@/components/ui/icon';

interface SeriesSelectorProps {
  onSelectSeries: (series: 'F' | 'G') => void;
}

export default function SeriesSelector({ onSelectSeries }: SeriesSelectorProps) {
  return (
    <div className="max-w-2xl mx-auto mb-12 animate-fade-in">
      <h3 className="text-white text-xl font-light mb-6 text-center animate-slide-in">Выберите серию вашего BMW</h3>
      <div className="grid grid-cols-2 gap-6">
        <button
          onClick={() => onSelectSeries('F')}
          className="p-8 rounded-2xl transition-all duration-500 hover:scale-105 group animate-fade-in hover:shadow-[0_0_60px_rgba(173,255,47,0.8)]"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            animationDelay: '0.1s',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="text-6xl font-light text-white mb-4 group-hover:text-[#ADFF2F] transition-colors duration-300">F</div>
          <div className="text-white/60 text-sm">F-series</div>
          <div className="text-white/40 text-xs mt-2">2011-2019</div>
        </button>

        <button
          onClick={() => onSelectSeries('G')}
          className="p-8 rounded-2xl transition-all duration-500 hover:scale-105 group animate-fade-in hover:shadow-[0_0_60px_rgba(173,255,47,0.8)]"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            animationDelay: '0.2s',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="text-6xl font-light text-white mb-4 group-hover:text-[#ADFF2F] transition-colors duration-300">G</div>
          <div className="text-white/60 text-sm">G-series</div>
          <div className="text-white/40 text-xs mt-2">2019+</div>
        </button>
      </div>
    </div>
  );
}