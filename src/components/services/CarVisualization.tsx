interface CarVisualizationProps {
  hoveredService: string | null;
}

export default function CarVisualization({ hoveredService }: CarVisualizationProps) {
  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 lg:sticky lg:top-4 h-fit">
      <h3 className="text-white text-lg font-semibold mb-4">Визуализация опций</h3>
      <div className="relative w-full aspect-[16/9] bg-black/30 rounded-xl overflow-hidden">
        <svg viewBox="0 0 800 400" className="w-full h-full">
          {/* Корпус автомобиля */}
          <g id="body" className="transition-all duration-300">
            <path d="M100,250 L150,180 L200,160 L500,160 L550,180 L650,250 L700,250 L700,280 L100,280 Z" fill="#1a1a2e" stroke="#3a3a5e" strokeWidth="2"/>
          </g>
          
          {/* Двигатель */}
          <g id="engine" className={`transition-all duration-300 ${hoveredService?.includes('engine') || hoveredService?.includes('ENG') ? 'opacity-100' : 'opacity-30'}`}>
            <rect x="120" y="220" width="80" height="40" rx="5" fill="#ff6b35" opacity="0.7"/>
            <text x="160" y="245" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">ENGINE</text>
          </g>
          
          {/* Трансмиссия */}
          <g id="transmission" className={`transition-all duration-300 ${hoveredService?.includes('transmission') || hoveredService?.includes('TRANS') ? 'opacity-100' : 'opacity-30'}`}>
            <rect x="220" y="230" width="80" height="30" rx="5" fill="#4ecdc4" opacity="0.7"/>
            <text x="260" y="248" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">TRANS</text>
          </g>
          
          {/* Мультимедиа */}
          <g id="multimedia" className={`transition-all duration-300 ${hoveredService?.includes('multimedia') || hoveredService?.includes('MM') ? 'opacity-100' : 'opacity-30'}`}>
            <rect x="380" y="180" width="60" height="50" rx="5" fill="#a55eea" opacity="0.7"/>
            <text x="410" y="208" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">SCREEN</text>
          </g>
          
          {/* Фары */}
          <g id="lighting" className={`transition-all duration-300 ${hoveredService?.includes('lighting') || hoveredService?.includes('LIGHT') ? 'opacity-100' : 'opacity-30'}`}>
            <ellipse cx="630" cy="200" rx="30" ry="20" fill="#ffd93d" opacity="0.8"/>
            <text x="630" y="205" textAnchor="middle" fill="#333" fontSize="10" fontWeight="bold">LED</text>
          </g>
          
          {/* Приборная панель */}
          <g id="dashboard" className={`transition-all duration-300 ${hoveredService?.includes('dashboard') || hoveredService?.includes('DASH') ? 'opacity-100' : 'opacity-30'}`}>
            <circle cx="320" cy="200" r="25" fill="#00d2ff" opacity="0.7"/>
            <text x="320" y="205" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">DASH</text>
          </g>
          
          {/* Комфорт (двери) */}
          <g id="comfort" className={`transition-all duration-300 ${hoveredService?.includes('comfort') || hoveredService?.includes('COMFORT') ? 'opacity-100' : 'opacity-30'}`}>
            <rect x="420" y="200" width="80" height="60" rx="3" fill="#6c5ce7" opacity="0.6"/>
            <text x="460" y="233" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">COMFORT</text>
          </g>
          
          {/* Безопасность (система) */}
          <g id="safety" className={`transition-all duration-300 ${hoveredService?.includes('safety') || hoveredService?.includes('SAFE') ? 'opacity-100' : 'opacity-30'}`}>
            <circle cx="400" cy="150" r="20" fill="#ff6348" opacity="0.7"/>
            <text x="400" y="155" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">SAFE</text>
          </g>
          
          {/* Колеса */}
          <circle cx="180" cy="280" r="40" fill="#2d2d44" stroke="#3a3a5e" strokeWidth="3"/>
          <circle cx="180" cy="280" r="25" fill="#1a1a2e" stroke="#555" strokeWidth="2"/>
          <circle cx="600" cy="280" r="40" fill="#2d2d44" stroke="#3a3a5e" strokeWidth="3"/>
          <circle cx="600" cy="280" r="25" fill="#1a1a2e" stroke="#555" strokeWidth="2"/>
        </svg>
        
        {hoveredService && (
          <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-3">
            <div className="text-blue-400 text-xs font-medium mb-1">Активная зона</div>
            <div className="text-white text-sm font-semibold">{hoveredService}</div>
          </div>
        )}
      </div>
    </div>
  );
}
