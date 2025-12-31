import { useState } from 'react';
import Icon from '@/components/ui/icon';
import ServicesCalculator from './ServicesCalculator';

const vibrate = (pattern: number | number[] = 10) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

interface VehicleInfo {
  vin: string;
  manufacturer: string;
  series: string;
  year: number;
  engine: string;
}

interface HwelBlock {
  hwel_code: string;
  block_name: string;
  description: string;
  features: Record<string, boolean>;
}

interface CodingOption {
  feature: string;
  description: string;
  status?: string;
  required_blocks?: string[];
  missing_blocks?: string[];
  upgrade_needed?: boolean;
}

interface AnalysisResult {
  current_capabilities: CodingOption[];
  available_upgrades: CodingOption[];
  recommendations: string[];
}

interface VinResult {
  vin: string;
  vehicle: VehicleInfo;
  blocks: HwelBlock[];
  analysis: AnalysisResult;
}

export default function VinDecoder() {
  const [vin, setVin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VinResult | null>(null);
  const [error, setError] = useState('');

  const handleDecode = async () => {
    if (!vin.trim() || vin.length !== 17) {
      vibrate([50, 100, 50]);
      setError('VIN должен содержать 17 символов');
      return;
    }

    vibrate(15);
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('https://functions.poehali.dev/a8553178-4bba-4e17-8afc-74f4cfde5882', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vin: vin.toUpperCase() })
      });

      const data = await response.json();

      if (response.ok) {
        vibrate([10, 50, 10]);
        setResult(data);
        
        // Сохраняем контекст VIN для AI чата
        localStorage.setItem('vinContext', JSON.stringify(data));
      } else {
        throw new Error(data.error || 'Ошибка декодирования');
      }
    } catch (err) {
      vibrate([50, 100, 50]);
      setError('Не удалось декодировать VIN. Попробуйте позже.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleDecode();
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-full mb-4">
              <Icon name="Car" className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">VIN Decoder</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Узнай возможности своего BMW
            </h2>
            <p className="text-gray-400 text-lg mb-4">
              Введи VIN и получи полный анализ HWEL блоков и доступных опций кодирования
            </p>
            <button
              onClick={() => {
                vibrate(15);
                setVin('WBATX71070LB47317');
                setTimeout(() => {
                  handleDecode();
                }, 100);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-all text-sm"
            >
              <Icon name="Play" className="w-4 h-4" />
              <span>Попробовать демо BMW 340i</span>
            </button>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={vin}
                  onChange={(e) => setVin(e.target.value.toUpperCase())}
                  onKeyPress={handleKeyPress}
                  placeholder="WBATX71070LB47317"
                  maxLength={17}
                  disabled={isLoading}
                  className="w-full bg-white/10 text-white placeholder:text-gray-500 rounded-xl px-4 py-3 text-lg font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50"
                />
                <div className="flex items-center justify-between mt-2 text-xs">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Icon name="Info" className="w-4 h-4" />
                    <span>17 символов VIN автомобиля</span>
                  </div>
                  <button
                    onClick={() => {
                      vibrate(10);
                      setVin('WBATX71070LB47317');
                    }}
                    className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
                  >
                    <Icon name="Sparkles" className="w-3 h-3" />
                    <span>Вставить демо</span>
                  </button>
                </div>
              </div>
              <button
                onClick={handleDecode}
                disabled={isLoading || vin.length !== 17}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Анализ...</span>
                  </>
                ) : (
                  <>
                    <Icon name="Search" className="w-5 h-5" />
                    <span>Декодировать</span>
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
                <Icon name="AlertCircle" className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
          </div>

          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Информация об автомобиле */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Icon name="Car" className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-white text-xl font-semibold">Информация об автомобиле</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Производитель</div>
                    <div className="text-white font-medium">{result.vehicle.manufacturer}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Серия</div>
                    <div className="text-white font-medium">{result.vehicle.series}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Год выпуска</div>
                    <div className="text-white font-medium">{result.vehicle.year}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">VIN</div>
                    <div className="text-white font-mono text-sm">{result.vin}</div>
                  </div>
                  {result.equipment?.engine?.type && (
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Двигатель</div>
                      <div className="text-white font-medium">{result.equipment.engine.type} ({result.equipment.engine.power} л.с.)</div>
                    </div>
                  )}
                  {result.equipment?.transmission?.name && (
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Коробка передач</div>
                      <div className="text-white font-medium">{result.equipment.transmission.name}</div>
                    </div>
                  )}
                </div>
                
                {result.vehicle.mock_data && (
                  <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-center gap-2 text-yellow-400 text-sm">
                      <Icon name="Info" className="w-4 h-4" />
                      <span>Демо-режим: показаны примерные данные для BMW 340i 2017</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Чип-тюнинг двигателя */}
              {result.analysis.engine_tuning?.length > 0 && (
                <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 backdrop-blur-xl rounded-2xl border border-orange-500/20 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <Icon name="Zap" className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-white text-xl font-semibold">Чип-тюнинг двигателя</h3>
                  </div>
                  {result.analysis.engine_tuning.map((tune: any, idx: number) => (
                    <div key={idx} className="bg-white/5 rounded-lg p-4 border border-orange-500/10">
                      <div className="text-white font-medium mb-3">{tune.engine}</div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-gray-400 text-xs mb-1">Stock</div>
                          <div className="text-white text-2xl font-bold">{tune.stock_hp}</div>
                          <div className="text-gray-500 text-xs">л.с.</div>
                        </div>
                        <div className="text-center">
                          <div className="text-orange-400 text-xs mb-1">Stage 1</div>
                          <div className="text-orange-400 text-2xl font-bold">{tune.stage1_hp}</div>
                          <div className="text-gray-500 text-xs">л.с.</div>
                          <div className="text-green-400 text-xs mt-1">+{tune.stage1_hp - tune.stock_hp} л.с.</div>
                        </div>
                        <div className="text-center">
                          <div className="text-red-400 text-xs mb-1">Stage 2</div>
                          <div className="text-red-400 text-2xl font-bold">{tune.stage2_hp}</div>
                          <div className="text-gray-500 text-xs">л.с.</div>
                          <div className="text-green-400 text-xs mt-1">+{tune.stage2_hp - tune.stock_hp} л.с.</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Прошивка коробки передач */}
              {result.analysis.transmission_tuning?.length > 0 && (
                <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-xl rounded-2xl border border-cyan-500/20 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                      <Icon name="Settings" className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-white text-xl font-semibold">Прошивка коробки XHP</h3>
                  </div>
                  {result.analysis.transmission_tuning.map((tune: any, idx: number) => (
                    <div key={idx} className="space-y-3">
                      <div className="text-gray-400 text-sm mb-3">{tune.transmission}</div>
                      <div className="grid gap-2">
                        <div className="bg-white/5 rounded-lg p-3 border border-cyan-500/10">
                          <div className="text-cyan-400 font-medium text-sm mb-1">XHP Stage 1</div>
                          <div className="text-gray-300 text-xs">{tune.xhp_stage1}</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-cyan-500/10">
                          <div className="text-cyan-400 font-medium text-sm mb-1">XHP Stage 2</div>
                          <div className="text-gray-300 text-xs">{tune.xhp_stage2}</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-cyan-500/10">
                          <div className="text-cyan-400 font-medium text-sm mb-1">XHP Stage 3</div>
                          <div className="text-gray-300 text-xs">{tune.xhp_stage3}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Доступные кодировки */}
              {Array.isArray(result.analysis.available_coding) && result.analysis.available_coding.length > 0 && (
                <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-xl rounded-2xl border border-green-500/20 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <Icon name="Code" className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white text-xl font-semibold">Доступные кодировки для вашего авто</h3>
                      <p className="text-gray-400 text-sm">Определено на основе установленного оборудования</p>
                    </div>
                  </div>
                  
                  {/* Группировка по категориям */}
                  {Object.entries(
                    result.analysis.available_coding.reduce((acc: any, coding: any) => {
                      const cat = coding.category;
                      if (!acc[cat]) acc[cat] = [];
                      acc[cat].push(coding);
                      return acc;
                    }, {})
                  ).map(([category, codings]: [string, any]) => (
                    <div key={category} className="mb-6 last:mb-0">
                      <div className="text-blue-400 font-medium text-sm mb-3 flex items-center gap-2">
                        <Icon name="ChevronRight" className="w-4 h-4" />
                        {category}
                      </div>
                      <div className="space-y-2">
                        {codings.map((coding: any, idx: number) => (
                          <div key={idx} className="bg-white/5 rounded-lg p-4 border border-green-500/10 hover:bg-white/10 transition-colors">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="text-white font-medium mb-1">{coding.name}</div>
                                <div className="text-gray-400 text-sm">{coding.description}</div>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <div className="text-green-400 font-semibold">{coding.price.toLocaleString()} ₽</div>
                                <div className="text-gray-500 text-xs">{coding.duration} мин</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Рекомендации */}
              {result.analysis.recommendations.length > 0 && (
                <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Icon name="Lightbulb" className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-white text-xl font-semibold">Рекомендации</h3>
                  </div>
                  <div className="space-y-2">
                    {result.analysis.recommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-gray-300 text-sm">
                        <Icon name="ChevronRight" className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}



              {/* Калькулятор услуг */}
              <ServicesCalculator vinData={result} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}