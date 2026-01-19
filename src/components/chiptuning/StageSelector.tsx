import React from 'react';
import Icon from '@/components/ui/icon';
import { City } from '@/components/CitySelector';
import { getTelegramLink } from '@/utils/cityConfig';
import type { Series } from './SeriesSelector';

interface ChiptuningData {
  model_name: string;
  series: string;
  body_type: string;
  engine_code: string;
  stock: {
    power: number;
    torque: number;
  };
  stage1: {
    power: number;
    torque: number;
    price: number;
  };
  stage2?: {
    power: number;
    torque: number;
  } | null;
  stage_type: string;
}

interface StageSelectorProps {
  selectedSeries: Series;
  selectedCity: City;
  onReset: () => void;
}

const API_URL = 'https://functions.poehali.dev/1465efc7-1ef5-4210-8079-7bbd027f47a0';

// Преобразование из фронтенд-формата в API-формат
function convertSeriesForAPI(series: Series): string {
  const mapping: Record<string, string> = {
    '1 SERIES': '1-series',
    '2 SERIES': '2-series',
    '2 SERIES M': 'M2',
    '3 SERIES': '3-series',
    '3 SERIES M': 'M3',
    '4 SERIES': '4-series',
    '4 SERIES M': 'M4',
    '5 SERIES': '5-series',
    '5 SERIES M': 'M5',
    '6 SERIES': '6-series',
    '7 SERIES': '7-series',
    '8 SERIES': '8-series',
    '8 SERIES M': 'M8',
    'X1': 'X1',
    'X2': 'X2',
    'X3': 'X3',
    'X3 M': 'X3M',
    'X4': 'X4',
    'X4 M': 'X4M',
    'X5': 'X5',
    'X5 M': 'X5M',
    'X6': 'X6',
    'X6 M': 'X6M',
    'X7': 'X7',
    'XM': 'XM',
    'Z4': 'Z4'
  };
  return mapping[series] || series;
}

export default function StageSelector({ selectedSeries, selectedCity, onReset }: StageSelectorProps) {
  const [step, setStep] = React.useState<'body' | 'engine' | 'stage'>('body');
  const [bodyTypes, setBodyTypes] = React.useState<string[]>([]);
  const [selectedBody, setSelectedBody] = React.useState<string | null>(null);
  const [engines, setEngines] = React.useState<ChiptuningData[]>([]);
  const [selectedEngine, setSelectedEngine] = React.useState<ChiptuningData | null>(null);
  const [selectedStage, setSelectedStage] = React.useState<'stage1' | 'stage2' | null>(null);
  const [loading, setLoading] = React.useState(true);

  const apiSeries = convertSeriesForAPI(selectedSeries);

  // Шаг 1: Загружаем типы кузовов
  React.useEffect(() => {
    const loadBodyTypes = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}?action=bodies&series=${encodeURIComponent(apiSeries)}`);
        const data = await response.json();
        setBodyTypes(data);
      } catch (error) {
        console.error('Failed to load body types:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBodyTypes();
  }, [apiSeries]);

  // Шаг 2: Загружаем двигатели при выборе кузова
  const handleBodySelect = async (body: string) => {
    setSelectedBody(body);
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?action=engines&series=${encodeURIComponent(apiSeries)}&body_type=${encodeURIComponent(body)}`);
      const data = await response.json();
      setEngines(data);
      setStep('engine');
    } catch (error) {
      console.error('Failed to load engines:', error);
    } finally {
      setLoading(false);
    }
  };

  // Шаг 3: Выбор двигателя
  const handleEngineSelect = (engine: ChiptuningData) => {
    setSelectedEngine(engine);
    setStep('stage');
  };

  // Заказ
  const handleOrder = () => {
    if (!selectedStage || !selectedEngine) return;

    const stageData = selectedStage === 'stage1' ? selectedEngine.stage1 : selectedEngine.stage2;
    if (!stageData) return;

    const price = selectedCity.value === 'moscow' ? stageData.price : Math.round(stageData.price * 0.9);
    const gains = `${selectedEngine.stock.power} → ${stageData.power} л.с. | ${selectedEngine.stock.torque} → ${stageData.torque} Нм`;
    
    const message = `ЧИП-ТЮНИНГ BMW ${selectedSeries}\n\n${selectedEngine.engine_code} (${selectedEngine.body_type})\n${selectedStage.toUpperCase()}\n\n${gains}\n\nСТОИМОСТЬ: ${price.toLocaleString('ru-RU')} ₽`;
    
    const url = getTelegramLink(selectedCity, `чип-тюнинг BMW ${selectedSeries}`);
    const separator = url.includes('?') ? '&' : '?';
    window.open(`${url}${separator}text=${encodeURIComponent(message)}`, '_blank');
  };

  const stages = selectedEngine ? [
    { id: 'stage1', name: 'STAGE 1', data: selectedEngine.stage1 },
    ...(selectedEngine.stage2 ? [{ id: 'stage2', name: 'STAGE 2', data: selectedEngine.stage2 }] : [])
  ] : [];

  return (
    <div className="space-y-2">
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-3 py-1.5 transition-all hover:scale-105"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.3), rgba(255, 0, 51, 0.4))',
          border: '2px solid rgba(255, 0, 0, 0.5)',
          clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
          boxShadow: '0 0 15px rgba(255, 0, 0, 0.4)'
        }}
      >
        <Icon name="ChevronLeft" className="w-5 h-5 text-red-400" />
        <span 
          className="tracking-wider text-red-400 uppercase"
          style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
        >
          /// НАЗАД
        </span>
      </button>

      <div 
        className="p-2 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.9) 0%, rgba(26, 8, 8, 0.9) 100%)',
          border: '2px solid',
          borderImage: 'linear-gradient(135deg, rgba(255, 0, 0, 0.7) 0%, rgba(255, 0, 51, 0.7) 50%, rgba(0, 212, 255, 0.7) 50%, rgba(56, 189, 248, 0.7) 100%) 1',
          boxShadow: '0 0 30px rgba(127, 106, 127, 0.5), inset 0 0 40px rgba(0, 0, 0, 0.5)',
          clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)'
        }}
      >
        <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none" style={{ background: 'linear-gradient(to bottom right, rgba(255, 0, 0, 0.3), rgba(0, 212, 255, 0.3))', clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
        <p 
          className="text-white text-[10px] mb-0.5 tracking-widest uppercase"
          style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
        >
          /// ВЫБРАНА СЕРИЯ
        </p>
        <p 
          className="text-white text-lg tracking-widest font-bold uppercase"
          style={{ 
            fontFamily: '"Reborn Technologies", sans-serif',
            textShadow: '2px 2px 0 rgba(127, 106, 127, 0.4), 0 0 20px rgba(127, 106, 127, 0.5)'
          }}
        >
          {selectedSeries}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-white/60 text-sm tracking-wider" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
            /// ЗАГРУЗКА ДАННЫХ...
          </p>
        </div>
      ) : (
        <>
          {/* ШАГ 1: Выбор кузова */}
          {step === 'body' && (
            <>
              <div className="flex items-center gap-1.5">
                <div className="w-0.5 h-4" style={{ background: 'linear-gradient(180deg, rgba(255, 0, 0, 0.9), rgba(0, 212, 255, 0.9))', boxShadow: '0 0 10px rgba(127, 106, 127, 0.7)' }} />
                <p 
                  className="text-white text-xs tracking-widest uppercase"
                  style={{ 
                    fontFamily: '"Reborn Technologies", sans-serif',
                    textShadow: '0 0 10px rgba(127, 106, 127, 0.6)'
                  }}
                >
                  /// ШАГ 1: ВЫБЕРИТЕ КУЗОВ
                </p>
              </div>

              {bodyTypes.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-white/60 text-sm tracking-wider" style={{ fontFamily: '"Reborn Technologies", sans-serif' }}>
                    /// НЕТ ДАННЫХ ДЛЯ ЭТОЙ СЕРИИ
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {bodyTypes.map((body) => (
                    <button
                      key={body}
                      onClick={() => handleBodySelect(body)}
                      className="w-full p-3 text-left transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.7) 0%, rgba(26, 8, 8, 0.7) 100%)',
                        border: '2px solid',
                        borderImage: 'linear-gradient(135deg, rgba(255, 0, 0, 0.5) 0%, rgba(0, 212, 255, 0.5) 100%) 1',
                        boxShadow: '0 0 20px rgba(127, 106, 127, 0.4)',
                        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)'
                      }}
                    >
                      <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none" style={{ 
                        background: 'linear-gradient(to bottom right, rgba(255, 0, 0, 0.3), transparent)',
                        clipPath: 'polygon(100% 0, 100% 100%, 0 0)' 
                      }} />
                      
                      <div className="relative z-10">
                        <p 
                          className="text-white text-base tracking-widest font-bold uppercase"
                          style={{ 
                            fontFamily: '"Reborn Technologies", sans-serif',
                            textShadow: '2px 2px 0 rgba(127, 106, 127, 0.3), 0 0 10px rgba(127, 106, 127, 0.4)'
                          }}
                        >
                          {body}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ШАГ 2: Выбор двигателя */}
          {step === 'engine' && (
            <>
              <button
                onClick={() => {
                  setStep('body');
                  setSelectedBody(null);
                }}
                className="flex items-center gap-2 px-3 py-1.5 transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(255, 0, 51, 0.3))',
                  border: '1px solid rgba(255, 0, 0, 0.4)',
                  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                  boxShadow: '0 0 10px rgba(255, 0, 0, 0.3)'
                }}
              >
                <Icon name="ChevronLeft" className="w-4 h-4 text-red-400" />
                <span 
                  className="tracking-wider text-red-400 uppercase text-xs"
                  style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                >
                  /// НАЗАД К КУЗОВУ
                </span>
              </button>

              <div 
                className="p-2 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.8) 0%, rgba(26, 8, 8, 0.8) 100%)',
                  border: '2px solid',
                  borderImage: 'linear-gradient(135deg, rgba(255, 0, 0, 0.6) 0%, rgba(0, 212, 255, 0.6) 100%) 1',
                  boxShadow: '0 0 20px rgba(127, 106, 127, 0.4)',
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)'
                }}
              >
                <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none" style={{ 
                  background: 'linear-gradient(to bottom right, rgba(255, 0, 0, 0.3), rgba(0, 212, 255, 0.2))',
                  clipPath: 'polygon(100% 0, 100% 100%, 0 0)' 
                }} />
                <p 
                  className="text-white/80 text-[10px] mb-1 tracking-widest uppercase"
                  style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                >
                  /// КУЗОВ
                </p>
                <p 
                  className="text-white text-sm tracking-wider font-bold"
                  style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                >
                  {selectedBody}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="w-0.5 h-4" style={{ background: 'linear-gradient(180deg, rgba(255, 0, 0, 0.9), rgba(0, 212, 255, 0.9))', boxShadow: '0 0 10px rgba(127, 106, 127, 0.7)' }} />
                <p 
                  className="text-white text-xs tracking-widest uppercase"
                  style={{ 
                    fontFamily: '"Reborn Technologies", sans-serif',
                    textShadow: '0 0 10px rgba(127, 106, 127, 0.6)'
                  }}
                >
                  /// ШАГ 2: ВЫБЕРИТЕ ДВИГАТЕЛЬ
                </p>
              </div>

              <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1" style={{ 
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255, 0, 0, 0.5) rgba(0, 0, 0, 0.3)'
              }}>
                {engines.map((engine, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleEngineSelect(engine)}
                    className="w-full p-2 text-left transition-all duration-300 hover:scale-[1.01] relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.7) 0%, rgba(26, 8, 8, 0.7) 100%)',
                      border: '1px solid',
                      borderImage: 'linear-gradient(135deg, rgba(255, 0, 0, 0.4) 0%, rgba(0, 212, 255, 0.4) 100%) 1',
                      boxShadow: '0 0 15px rgba(127, 106, 127, 0.3)',
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)'
                    }}
                  >
                    <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none" style={{ 
                      background: 'linear-gradient(to bottom right, rgba(255, 0, 0, 0.2), transparent)',
                      clipPath: 'polygon(100% 0, 100% 100%, 0 0)' 
                    }} />
                    
                    <div className="relative z-10">
                      <p 
                        className="text-white text-xs mb-1 tracking-wider font-medium"
                        style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                      >
                        {engine.engine_code}
                      </p>
                      <p 
                        className="text-white/70 text-[10px] tracking-wide"
                        style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                      >
                        СТОК: {engine.stock.power} л.с. / {engine.stock.torque} Нм
                      </p>
                      <p 
                        className="text-white/70 text-[10px] tracking-wide"
                        style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                      >
                        STAGE 1: {engine.stage1.power} л.с. / {engine.stage1.torque} Нм
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ШАГ 3: Выбор Stage */}
          {step === 'stage' && selectedEngine && (
            <>
              <button
                onClick={() => {
                  setStep('engine');
                  setSelectedEngine(null);
                  setSelectedStage(null);
                }}
                className="flex items-center gap-2 px-3 py-1.5 transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(255, 0, 51, 0.3))',
                  border: '1px solid rgba(255, 0, 0, 0.4)',
                  clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                  boxShadow: '0 0 10px rgba(255, 0, 0, 0.3)'
                }}
              >
                <Icon name="ChevronLeft" className="w-4 h-4 text-red-400" />
                <span 
                  className="tracking-wider text-red-400 uppercase text-xs"
                  style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                >
                  /// ДРУГОЙ ДВИГАТЕЛЬ
                </span>
              </button>

              <div 
                className="p-2 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.8) 0%, rgba(26, 8, 8, 0.8) 100%)',
                  border: '2px solid',
                  borderImage: 'linear-gradient(135deg, rgba(255, 0, 0, 0.6) 0%, rgba(0, 212, 255, 0.6) 100%) 1',
                  boxShadow: '0 0 20px rgba(127, 106, 127, 0.4)',
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)'
                }}
              >
                <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none" style={{ 
                  background: 'linear-gradient(to bottom right, rgba(255, 0, 0, 0.3), rgba(0, 212, 255, 0.2))',
                  clipPath: 'polygon(100% 0, 100% 100%, 0 0)' 
                }} />
                <p 
                  className="text-white/80 text-[10px] mb-1 tracking-widest uppercase"
                  style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                >
                  /// {selectedEngine.engine_code} • {selectedEngine.body_type}
                </p>
                <p 
                  className="text-white text-sm tracking-wider"
                  style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                >
                  СТОК: {selectedEngine.stock.power} л.с. / {selectedEngine.stock.torque} Нм
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="w-0.5 h-4" style={{ background: 'linear-gradient(180deg, rgba(255, 0, 0, 0.9), rgba(0, 212, 255, 0.9))', boxShadow: '0 0 10px rgba(127, 106, 127, 0.7)' }} />
                <p 
                  className="text-white text-xs tracking-widest uppercase"
                  style={{ 
                    fontFamily: '"Reborn Technologies", sans-serif',
                    textShadow: '0 0 10px rgba(127, 106, 127, 0.6)'
                  }}
                >
                  /// ШАГ 3: ВЫБЕРИТЕ STAGE
                </p>
              </div>

              <div className="space-y-2">
                {stages.map((stage) => {
                  const price = selectedCity.value === 'moscow' ? stage.data.price : Math.round(stage.data.price * 0.9);
                  const isSelected = selectedStage === stage.id;

                  return (
                    <button
                      key={stage.id}
                      onClick={() => setSelectedStage(stage.id as 'stage1' | 'stage2')}
                      className="w-full p-3 text-left transition-all duration-300 hover:scale-[1.02] relative overflow-hidden"
                      style={{
                        background: stage.id === 'stage1'
                          ? (isSelected ? 'linear-gradient(135deg, rgba(0, 255, 0, 0.25) 0%, rgba(0, 255, 0, 0.35) 100%)' : 'linear-gradient(135deg, rgba(0, 255, 0, 0.1) 0%, rgba(0, 255, 0, 0.15) 100%)')
                          : (isSelected ? 'linear-gradient(135deg, rgba(26, 8, 8, 0.9) 0%, rgba(10, 10, 15, 0.9) 100%)' : 'linear-gradient(135deg, rgba(10, 10, 15, 0.7) 0%, rgba(26, 8, 8, 0.7) 100%)'),
                        border: '2px solid',
                        borderImage: stage.id === 'stage1'
                          ? (isSelected ? 'linear-gradient(135deg, rgba(0, 255, 0, 1) 0%, rgba(0, 255, 0, 0.8) 50%, rgba(0, 255, 0, 1) 100%) 1' : 'linear-gradient(135deg, rgba(0, 255, 0, 0.6) 0%, rgba(0, 255, 0, 0.5) 50%, rgba(0, 255, 0, 0.6) 100%) 1')
                          : (isSelected ? 'linear-gradient(135deg, rgba(255, 0, 0, 0.9) 0%, rgba(255, 0, 51, 0.9) 50%, rgba(0, 212, 255, 0.9) 50%, rgba(56, 189, 248, 0.9) 100%) 1' : 'linear-gradient(135deg, rgba(255, 0, 0, 0.5) 0%, rgba(255, 0, 51, 0.5) 50%, rgba(0, 212, 255, 0.5) 50%, rgba(56, 189, 248, 0.5) 100%) 1'),
                        boxShadow: stage.id === 'stage1'
                          ? (isSelected ? '0 0 60px rgba(0, 255, 0, 0.8), inset 0 0 80px rgba(0, 255, 0, 0.25)' : '0 0 30px rgba(0, 255, 0, 0.5), inset 0 0 50px rgba(0, 255, 0, 0.15)')
                          : (isSelected ? '0 0 40px rgba(127, 106, 127, 0.7), inset 0 0 60px rgba(127, 106, 127, 0.15)' : '0 0 20px rgba(127, 106, 127, 0.4), inset 0 0 40px rgba(0, 0, 0, 0.5)'),
                        clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)'
                      }}
                    >
                      <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none" style={{ 
                        background: stage.id === 'stage1'
                          ? (isSelected ? 'linear-gradient(to bottom right, rgba(0, 255, 0, 0.6), transparent)' : 'linear-gradient(to bottom right, rgba(0, 255, 0, 0.3), transparent)')
                          : (isSelected ? 'linear-gradient(to bottom right, rgba(255, 0, 0, 0.4), rgba(0, 212, 255, 0.2))' : 'linear-gradient(to bottom right, rgba(255, 0, 0, 0.15), rgba(0, 212, 255, 0.1))'),
                        clipPath: 'polygon(100% 0, 100% 100%, 0 0)' 
                      }} />
                      
                      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(127, 106, 127, 0.3) 2px, rgba(127, 106, 127, 0.3) 4px)'
                      }} />
                      
                      <div className="flex items-start justify-between mb-1 relative z-10">
                        <div>
                          <h3 
                            className="text-white text-base mb-0.5 tracking-widest uppercase font-bold"
                            style={{ 
                              fontFamily: '"Reborn Technologies", sans-serif',
                              textShadow: isSelected ? '2px 2px 0 rgba(127, 106, 127, 0.7), 0 0 30px rgba(127, 106, 127, 0.7)' : '2px 2px 0 rgba(127, 106, 127, 0.3), 0 0 10px rgba(127, 106, 127, 0.4)'
                            }}
                          >
                            {stage.name}
                          </h3>
                          <p 
                            className="text-white/80 text-[10px] tracking-wider uppercase"
                            style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                          >
                            /// {stage.data.power} Л.С. / {stage.data.torque} НМ
                          </p>
                        </div>
                        {isSelected && (
                          <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 animate-pulse" style={{ background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.9), rgba(0, 212, 255, 0.9))', boxShadow: '0 0 10px rgba(127, 106, 127, 0.7)' }} />
                            <Icon name="Check" className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-1.5">
                          <div className="w-0.5 h-3" style={{ background: 'linear-gradient(180deg, rgba(255, 0, 0, 0.8), rgba(0, 212, 255, 0.8))' }} />
                          <p 
                            className="text-white text-lg font-bold tracking-wider"
                            style={{ fontFamily: '"Reborn Technologies", sans-serif' }}
                          >
                            {price.toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedStage && (
                <button
                  onClick={handleOrder}
                  className="w-full py-3 px-4 transition-all hover:scale-[1.02] relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 0, 0, 0.4) 0%, rgba(255, 0, 51, 0.5) 50%, rgba(0, 212, 255, 0.4) 100%)',
                    border: '2px solid',
                    borderImage: 'linear-gradient(135deg, rgba(255, 0, 0, 0.9) 0%, rgba(0, 212, 255, 0.9) 100%) 1',
                    boxShadow: '0 0 40px rgba(127, 106, 127, 0.6), inset 0 0 40px rgba(127, 106, 127, 0.2)',
                    clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 0 100%)'
                  }}
                >
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.1) 10px, rgba(255, 255, 255, 0.1) 20px)'
                  }} />
                  <div className="flex items-center justify-center gap-2 relative z-10">
                    <Icon name="Send" className="w-5 h-5 text-white" />
                    <span 
                      className="text-white text-sm tracking-widest uppercase font-bold"
                      style={{ 
                        fontFamily: '"Reborn Technologies", sans-serif',
                        textShadow: '2px 2px 0 rgba(0, 0, 0, 0.5), 0 0 20px rgba(127, 106, 127, 0.7)'
                      }}
                    >
                      /// ЗАКАЗАТЬ
                    </span>
                  </div>
                </button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}