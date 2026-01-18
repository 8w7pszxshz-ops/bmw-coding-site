import { useState, useEffect, memo } from 'react';
import Icon from '@/components/ui/icon';
import { City } from '@/components/CitySelector';
import { getTelegramLink } from '@/utils/cityConfig';

interface ChipTuningProps {
  selectedCity: City;
  isOpen: boolean;
  onClose: () => void;
}

type Series = '1 SERIES' | '2 SERIES' | '3 SERIES' | '4 SERIES' | '5 SERIES' | '6 SERIES' | '7 SERIES' | 'X1' | 'X3' | 'X4' | 'X5' | 'X6' | 'M2' | 'M3' | 'M4' | 'M5' | 'Z4';

const seriesList: Series[] = [
  '1 SERIES', '2 SERIES', '3 SERIES', '4 SERIES', 
  '5 SERIES', '6 SERIES', '7 SERIES', 'M2',
  'M3', 'M4', 'M5', 'M6',
  'X1', 'X3', 'X4', 'X5', 'X6', 'Z4'
];

const stages = [
  { 
    id: 'stage1',
    name: 'STAGE 1',
    description: 'БАЗОВАЯ ПРОШИВКА ЭБУ',
    priceBase: 25000,
    gains: '+20-30% МОЩНОСТИ'
  },
  { 
    id: 'stage2',
    name: 'STAGE 2',
    description: 'ПРОДВИНУТАЯ ПРОШИВКА + ДАУНПАЙП',
    priceBase: 45000,
    gains: '+30-40% МОЩНОСТИ'
  }
];

export default function ChipTuning({ selectedCity, isOpen, onClose }: ChipTuningProps) {
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [showLights, setShowLights] = useState(false);
  const [audio] = useState(() => new Audio('/reborn-sound.mp3'));

  useEffect(() => {
    if (isOpen) {
      setShowLights(true);
      audio.play();
      
      const timer = setTimeout(() => {
        setShowLights(false);
      }, 20000);

      return () => {
        clearTimeout(timer);
        audio.pause();
        audio.currentTime = 0;
      };
    } else {
      audio.pause();
      audio.currentTime = 0;
      setShowLights(false);
      setSelectedSeries(null);
      setSelectedStage(null);
    }
  }, [isOpen, audio]);

  const handleReset = () => {
    setSelectedSeries(null);
    setSelectedStage(null);
  };

  const handleOrder = () => {
    if (!selectedSeries || !selectedStage) return;
    
    const stage = stages.find(s => s.id === selectedStage);
    if (!stage) return;

    const price = selectedCity.value === 'moscow' ? stage.priceBase : Math.round(stage.priceBase * 0.9);
    
    const message = `ЧИП-ТЮНИНГ BMW ${selectedSeries}\n\n${stage.name}\n${stage.description}\n${stage.gains}\n\nСТОИМОСТЬ: ${price.toLocaleString('ru-RU')} ₽`;
    
    const url = getTelegramLink(selectedCity, `чип-тюнинг BMW ${selectedSeries}`);
    const separator = url.includes('?') ? '&' : '?';
    window.open(`${url}${separator}text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-0" />

      {/* Modal content */}
      <div 
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto z-20"
        style={{
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1108 50%, #0a0a0f 100%)',
          border: '3px solid',
          borderImage: 'linear-gradient(135deg, #ff8c00 0%, #ff6b00 50%, #ff8c00 100%) 1',
          boxShadow: '0 0 40px rgba(255, 140, 0, 0.3), inset 0 0 80px rgba(0, 0, 0, 0.8), 0 40px 100px rgba(0, 0, 0, 0.8)',
          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Diagonal corner cuts - NFS MW style */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-600/40 to-transparent pointer-events-none" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-orange-600/40 to-transparent pointer-events-none" style={{ clipPath: 'polygon(0 100%, 100% 100%, 0 0)' }} />
        
        {/* Grunge scratches overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255, 140, 0, 0.1) 2px, rgba(255, 140, 0, 0.1) 4px), repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(255, 140, 0, 0.05) 3px, rgba(255, 140, 0, 0.05) 6px)',
            mixBlendMode: 'overlay'
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center transition-all z-10 group"
          style={{
            background: 'linear-gradient(135deg, #ff8c00 0%, #ff6b00 100%)',
            clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
            boxShadow: '0 0 20px rgba(255, 140, 0, 0.5), inset 0 0 10px rgba(0, 0, 0, 0.5)'
          }}
        >
          <Icon name="X" className="w-5 h-5 text-black group-hover:text-white transition-colors" />
        </button>

        <div className="p-8">
          {/* Header - NFS MW style */}
          <div className="relative mb-8">
            {/* Orange accent bar */}
            <div 
              className="h-1 mb-6"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #ff8c00 20%, #ff6b00 50%, #ff8c00 80%, transparent 100%)',
                boxShadow: '0 0 20px rgba(255, 140, 0, 0.6)'
              }}
            />
            
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-4">
                <img 
                  src="https://cdn.poehali.dev/projects/LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUF6c1NlZ2w0STVnZmtRdDgxMWF0YgppYWhVQ0dkVEhyeGZ0aWp6Y25tK0svQlM3Z3VEa01Kd0EwNjJoZTlMQUxuY1NGVGJiMmNnSXB0M3FzdzRsUmhKCjBPNmdTTDRyUzJVZWVsb25pZnBCdW9oQjVMd2RDRGUzcU9SL3RKZDlmYzhYMkRDQ2FGczRVVSt2ZThCa0xRVzYKbjNNdWRZZThuRlVEWmtScFZuN3BnNU43T2Q1L3ZIOVByL09QamJ3ZnMvQk9hZjlnTktneC9WMDEvc2l1eGN5egpxbjJzQW9yU1gzR1Eyb2dCZ2xVUnVyb1pGWS9oeEp1OGR2aCtHNnczRFpGU2RjZUtzN1FCQllyeGhoTng0NUIzCkpLVGRJZTVyRXYrVCtxcDlDOGZsSzlMNlN5TFFaSHA5ekhWRWhzb3ZtNGxKdUh1cXd4S0QwWEhtVm1TRC8xSzAKU3dJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==/bucket/reborn_logo.png" 
                  alt="Reborn Technologies" 
                  className="h-10"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(255, 140, 0, 0.5))' }}
                />
                <div>
                  <h2 
                    className="text-2xl md:text-3xl text-white uppercase tracking-widest"
                    style={{ 
                      fontFamily: '"Reborn Technologies", sans-serif',
                      textShadow: '2px 2px 0 #ff8c00, 4px 4px 10px rgba(255, 140, 0, 0.5), 0 0 30px rgba(255, 140, 0, 0.3)'
                    }}
                  >
                    CHIP TUNING
                  </h2>
                  <p className="text-orange-500 text-sm uppercase tracking-wider" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
                    /// ВЫБЕРИТЕ СЕРИЮ BMW
                  </p>
                </div>
              </div>
              
              {/* Decorative tech element */}
              <div className="hidden md:flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 animate-pulse" style={{ boxShadow: '0 0 10px #ff8c00' }} />
                <div className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-transparent" />
              </div>
            </div>
            
            {/* Bottom accent bar */}
            <div 
              className="h-0.5 mt-6"
              style={{
                background: 'linear-gradient(90deg, #ff8c00 0%, transparent 50%, #ff8c00 100%)',
                boxShadow: '0 0 10px rgba(255, 140, 0, 0.4)'
              }}
            />
          </div>

          {!selectedSeries ? (
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
                  onClick={() => setSelectedSeries(series)}
                  className="group relative transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.8) 0%, rgba(26, 17, 8, 0.8) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid',
                    borderImage: 'linear-gradient(135deg, rgba(255, 140, 0, 0.3), rgba(255, 107, 0, 0.6), rgba(255, 140, 0, 0.3)) 1',
                    boxShadow: '0 0 20px rgba(255, 140, 0, 0.2), inset 0 0 40px rgba(0, 0, 0, 0.6)',
                    minHeight: '140px',
                    clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                  }}
                >
                  {/* Corner cuts */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-orange-600/30 to-transparent pointer-events-none" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
                  <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-orange-600/30 to-transparent pointer-events-none" style={{ clipPath: 'polygon(0 100%, 100% 100%, 0 0)' }} />
                  
                  {/* Orange glow on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(255, 140, 0, 0.2), transparent 70%)',
                      boxShadow: 'inset 0 0 60px rgba(255, 140, 0, 0.3)'
                    }}
                  />
                  
                  {/* Grunge texture overlay */}
                  <div 
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(255, 140, 0, 0.1) 1px, rgba(255, 140, 0, 0.1) 2px)',
                      mixBlendMode: 'overlay'
                    }}
                  />
                  
                  {/* Tech scanlines */}
                  <div 
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 140, 0, 0.3) 2px, rgba(255, 140, 0, 0.3) 4px)'
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-10 p-6 flex flex-col items-center justify-center h-full">
                    {/* Orange accent corner */}
                    <div 
                      className="absolute top-2 left-2 w-8 h-0.5 bg-orange-500 group-hover:w-12 transition-all"
                      style={{ boxShadow: '0 0 10px rgba(255, 140, 0, 0.6)' }}
                    />
                    <div 
                      className="absolute top-2 left-2 w-0.5 h-8 bg-orange-500 group-hover:h-12 transition-all"
                      style={{ boxShadow: '0 0 10px rgba(255, 140, 0, 0.6)' }}
                    />
                    
                    <div 
                      className="text-white text-xl font-bold tracking-widest text-center uppercase group-hover:text-orange-400 transition-colors"
                      style={{ 
                        fontFamily: '"Reborn Technologies", sans-serif',
                        textShadow: '2px 2px 0 rgba(255, 140, 0, 0.3), 0 0 20px rgba(255, 140, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.8)'
                      }}
                    >
                      {series}
                    </div>
                    
                    {/* Bottom tech detail */}
                    <div className="absolute bottom-2 right-2 flex gap-1">
                      <div className="w-1 h-1 bg-orange-500 opacity-50" />
                      <div className="w-1 h-1 bg-orange-500 opacity-70" />
                      <div className="w-1 h-1 bg-orange-500" style={{ boxShadow: '0 0 5px #ff8c00' }} />
                    </div>
                  </div>
                </button>
              ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 140, 0, 0.2), rgba(255, 107, 0, 0.3))',
                  border: '2px solid rgba(255, 140, 0, 0.4)',
                  clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                  boxShadow: '0 0 15px rgba(255, 140, 0, 0.3)'
                }}
              >
                <Icon name="ChevronLeft" className="w-5 h-5 text-orange-400" />
                <span 
                  className="tracking-wider text-orange-400 uppercase"
                  style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                >
                  /// НАЗАД
                </span>
              </button>

              <div 
                className="p-5 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.9) 0%, rgba(26, 17, 8, 0.9) 100%)',
                  border: '2px solid',
                  borderImage: 'linear-gradient(135deg, rgba(255, 140, 0, 0.4), rgba(255, 107, 0, 0.6)) 1',
                  boxShadow: '0 0 30px rgba(255, 140, 0, 0.2), inset 0 0 40px rgba(0, 0, 0, 0.5)',
                  clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)'
                }}
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-600/20 to-transparent pointer-events-none" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
                <p 
                  className="text-orange-500 text-xs mb-2 tracking-widest uppercase"
                  style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                >
                  /// ВЫБРАНА СЕРИЯ
                </p>
                <p 
                  className="text-white text-2xl tracking-widest font-bold uppercase"
                  style={{ 
                    fontFamily: '"Reborn Technologies", sans-serif',
                    textShadow: '2px 2px 0 rgba(255, 140, 0, 0.3), 0 0 20px rgba(255, 140, 0, 0.4)'
                  }}
                >
                  {selectedSeries}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-orange-500" style={{ boxShadow: '0 0 10px #ff8c00' }} />
                <p 
                  className="text-orange-400 text-lg tracking-widest uppercase"
                  style={{ 
                    fontFamily: '"Reborn Technologies", sans-serif',
                    textShadow: '0 0 10px rgba(255, 140, 0, 0.5)'
                  }}
                >
                  /// ВЫБЕРИТЕ STAGE
                </p>
              </div>

              <div className="space-y-4">
                {stages.map((stage) => {
                  const price = selectedCity.value === 'moscow' ? stage.priceBase : Math.round(stage.priceBase * 0.9);
                  const isSelected = selectedStage === stage.id;

                  return (
                    <button
                      key={stage.id}
                      onClick={() => setSelectedStage(stage.id)}
                      className="w-full p-6 text-left transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                      style={{
                        background: isSelected
                          ? 'linear-gradient(135deg, rgba(26, 17, 8, 0.9) 0%, rgba(10, 10, 15, 0.9) 100%)'
                          : 'linear-gradient(135deg, rgba(10, 10, 15, 0.7) 0%, rgba(26, 17, 8, 0.7) 100%)',
                        border: '2px solid',
                        borderImage: isSelected
                          ? 'linear-gradient(135deg, #ff8c00, #ff6b00, #ff8c00) 1'
                          : 'linear-gradient(135deg, rgba(255, 140, 0, 0.2), rgba(255, 107, 0, 0.4), rgba(255, 140, 0, 0.2)) 1',
                        boxShadow: isSelected 
                          ? '0 0 40px rgba(255, 140, 0, 0.5), inset 0 0 60px rgba(255, 140, 0, 0.1)'
                          : '0 0 20px rgba(255, 140, 0, 0.2), inset 0 0 40px rgba(0, 0, 0, 0.5)',
                        clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)'
                      }}
                    >
                      {/* Corner cuts */}
                      <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none" style={{ 
                        background: isSelected ? 'linear-gradient(to bottom right, rgba(255, 140, 0, 0.3), transparent)' : 'linear-gradient(to bottom right, rgba(255, 140, 0, 0.1), transparent)',
                        clipPath: 'polygon(100% 0, 100% 100%, 0 0)' 
                      }} />
                      
                      {/* Scanlines */}
                      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 140, 0, 0.2) 2px, rgba(255, 140, 0, 0.2) 4px)'
                      }} />
                      
                      <div className="flex items-start justify-between mb-4 relative z-10">
                        <div>
                          <h3 
                            className="text-white text-2xl md:text-3xl mb-2 tracking-widest uppercase font-bold"
                            style={{ 
                              fontFamily: '"Reborn Technologies", sans-serif',
                              textShadow: isSelected ? '2px 2px 0 #ff8c00, 0 0 30px rgba(255, 140, 0, 0.6)' : '2px 2px 0 rgba(255, 140, 0, 0.2), 0 0 10px rgba(255, 140, 0, 0.3)'
                            }}
                          >
                            {stage.name}
                          </h3>
                          <p 
                            className="text-orange-400/80 text-sm tracking-wider uppercase"
                            style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                          >
                            /// {stage.description}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-500 animate-pulse" style={{ boxShadow: '0 0 10px #ff8c00' }} />
                            <Icon name="Check" className="w-6 h-6 text-orange-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-6 bg-orange-500" style={{ boxShadow: '0 0 8px #ff8c00' }} />
                          <span 
                            className="text-orange-400 tracking-widest uppercase text-sm"
                            style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                          >
                            {stage.gains}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-orange-500/60 text-xs uppercase tracking-wider mb-1" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>СТОИМОСТЬ</div>
                          <span 
                            className="text-white text-2xl md:text-3xl tracking-wider font-bold"
                            style={{ 
                              fontFamily: '"Reborn Technologies", sans-serif',
                              textShadow: '0 0 20px rgba(255, 140, 0, 0.4)'
                            }}
                          >
                            {price.toLocaleString('ru-RU')} ₽
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedStage && (
                <button
                  onClick={handleOrder}
                  className="w-full p-6 text-white transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, #ff8c00 0%, #ff6b00 50%, #ff8c00 100%)',
                    border: '3px solid #ff8c00',
                    boxShadow: '0 0 40px rgba(255, 140, 0, 0.6), inset 0 0 60px rgba(0, 0, 0, 0.3)',
                    clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'
                  }}
                >
                  {/* Animated glow */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.3), transparent 70%)'
                    }}
                  />
                  
                  <Icon name="MessageCircle" className="w-7 h-7 relative z-10" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))' }} />
                  <span 
                    className="text-xl tracking-widest uppercase font-bold relative z-10"
                    style={{ 
                      fontFamily: '"Reborn Technologies", sans-serif',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    ЗАКАЗАТЬ В TELEGRAM
                  </span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}