import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { getTelegramLink } from '@/utils/cityConfig';
import { City } from '@/components/CitySelector';

type SeriesType = 'F' | 'G' | 'U';
type KeyType = 'copy' | 'dealer';

interface FSeriesKey {
  position: number;
  price: number;
}

const fSeriesKeys: FSeriesKey[] = [
  { position: 3, price: 15000 },
  { position: 3, price: 18000 },
  { position: 3, price: 20000 },
  { position: 3, price: 22000 },
];

interface KeyCalculatorProps {
  selectedCity: City;
}

export default function KeyCalculator({ selectedCity }: KeyCalculatorProps) {
  const [series, setSeries] = useState<SeriesType>('G');
  const [keyType, setKeyType] = useState<KeyType>('copy');
  const [selectedFKey, setSelectedFKey] = useState<number>(0);

  const calculatePrice = (): number => {
    if (series === 'F') {
      return fSeriesKeys[selectedFKey].price;
    }
    if (series === 'G') {
      return keyType === 'copy' ? 25000 : 40000;
    }
    if (series === 'U') {
      return 50000;
    }
    return 0;
  };

  const price = calculatePrice();

  return (
    <div id="key-calculator" className="mb-16">
      <div 
        className="relative rounded-3xl p-12 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.95) 0%, rgba(10, 10, 15, 0.98) 100%)',
          border: '1px solid rgba(231, 34, 46, 0.25)',
          boxShadow: '0 30px 90px -20px rgba(231, 34, 46, 0.5)',
        }}
      >
        <div 
          className="absolute top-0 left-0 right-0"
          style={{
            height: '3px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(231, 34, 46, 0.2) 15%, rgba(231, 34, 46, 0.9) 50%, rgba(231, 34, 46, 0.2) 85%, transparent 100%)',
            boxShadow: '0 0 30px rgba(231, 34, 46, 0.6), 0 2px 20px rgba(231, 34, 46, 0.4)'
          }}
        />
        <div 
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(231, 34, 46, 0.15) 30%, rgba(231, 34, 46, 0.5) 50%, rgba(231, 34, 46, 0.15) 70%, transparent 100%)',
            boxShadow: '0 0 15px rgba(231, 34, 46, 0.3)'
          }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" style={{ mixBlendMode: 'screen' }}>
          <defs>
            <pattern id="key-calc-bg" x="0" y="0" width="35" height="35" patternUnits="userSpaceOnUse">
              <circle cx="17.5" cy="17.5" r="1.2" fill="rgba(231, 34, 46, 0.6)">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3s" repeatCount="indefinite" />
              </circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#key-calc-bg)" />
        </svg>
        <div className="flex items-center gap-3 mb-6">
          <Icon name="Calculator" className="w-7 h-7 text-[#E7222E]" />
          <h2 className="text-3xl font-light text-white">Калькулятор стоимости ключа</h2>
        </div>

        <p className="text-white/70 text-lg mb-8 font-light">
          Рассчитайте стоимость изготовления ключа для вашего BMW
        </p>

        {/* Выбор серии */}
        <div className="mb-8">
          <label className="block text-white/80 text-sm font-light mb-3 uppercase tracking-wider">
            Серия автомобиля
          </label>
          <div className="flex gap-4">
            {(['F', 'G', 'U'] as SeriesType[]).map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSeries(s);
                  if (s === 'F') setSelectedFKey(0);
                }}
                className="relative flex-1 py-4 px-6 rounded-xl font-medium transition-all duration-300 overflow-hidden"
                style={{
                  background: series === s 
                    ? 'linear-gradient(135deg, rgba(231, 34, 46, 0.9), rgba(231, 34, 46, 0.7))'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: series === s 
                    ? '1px solid rgba(231, 34, 46, 0.5)' 
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: series === s 
                    ? '0 10px 40px rgba(231, 34, 46, 0.4)' 
                    : 'none',
                  color: series === s ? '#fff' : 'rgba(255, 255, 255, 0.6)'
                }}
              >
                {series === s && (
                  <>
                    <div 
                      className="absolute top-0 left-0 right-0"
                      style={{
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, rgba(231, 34, 46, 0.8), transparent)',
                        boxShadow: '0 0 15px rgba(231, 34, 46, 0.6)'
                      }}
                    />
                    <div 
                      className="absolute bottom-1 right-1 w-2 h-2 rounded-full"
                      style={{
                        background: 'rgba(231, 34, 46, 0.6)',
                        boxShadow: '0 0 12px rgba(231, 34, 46, 0.8)'
                      }}
                    />
                  </>
                )}
                <div className="relative text-2xl font-light">Серия {s}</div>
              </button>
            ))}
          </div>
        </div>

        {/* F серия - выбор позиции */}
        {series === 'F' && (
          <div className="mb-8">
            <label className="block text-white/80 text-sm font-light mb-3 uppercase tracking-wider">
              Выберите позицию
            </label>
            <div className="grid grid-cols-4 gap-3">
              {fSeriesKeys.map((key, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedFKey(idx)}
                  className="py-3 px-4 rounded-lg font-medium transition-all duration-300"
                  style={{
                    background: selectedFKey === idx
                      ? 'linear-gradient(135deg, rgba(231, 34, 46, 0.9), rgba(231, 34, 46, 0.7))'
                      : 'rgba(255, 255, 255, 0.05)',
                    border: selectedFKey === idx
                      ? '1px solid rgba(231, 34, 46, 0.5)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: selectedFKey === idx
                      ? '0 8px 30px rgba(231, 34, 46, 0.4)'
                      : 'none',
                    color: selectedFKey === idx ? '#fff' : 'rgba(255, 255, 255, 0.6)'
                  }}
                >
                  {selectedFKey === idx && (
                    <>
                      <div 
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(231, 34, 46, 0.8), transparent)',
                          boxShadow: '0 0 8px rgba(231, 34, 46, 0.6)'
                        }}
                      />
                      <div 
                        className="absolute top-1 left-1 w-2 h-2 rounded-full"
                        style={{
                          background: 'rgba(231, 34, 46, 0.5)',
                          boxShadow: '0 0 10px rgba(231, 34, 46, 0.8)'
                        }}
                      />
                    </>
                  )}
                  <div className="relative text-xs mb-1 opacity-70">Позиция {key.position}</div>
                  <div className="text-sm font-medium">{key.price.toLocaleString()} ₽</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* G серия - тип ключа */}
        {series === 'G' && (
          <div className="mb-8">
            <label className="block text-white/80 text-sm font-light mb-3 uppercase tracking-wider">
              Тип ключа
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setKeyType('copy')}
                className="relative py-6 px-6 rounded-xl transition-all duration-300 overflow-hidden"
                style={{
                  background: keyType === 'copy'
                    ? 'linear-gradient(135deg, rgba(231, 34, 46, 0.9), rgba(231, 34, 46, 0.7))'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: keyType === 'copy'
                    ? '1px solid rgba(231, 34, 46, 0.5)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: keyType === 'copy'
                    ? '0 10px 40px rgba(231, 34, 46, 0.4)'
                    : 'none',
                }}
              >
                {keyType === 'copy' && (
                  <>
                    <div 
                      className="absolute top-0 right-0 w-px h-full"
                      style={{
                        background: 'linear-gradient(180deg, transparent, rgba(231, 34, 46, 0.6), transparent)',
                        boxShadow: '0 0 12px rgba(231, 34, 46, 0.5)'
                      }}
                    />
                    <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none">
                      <defs>
                        <pattern id="copy-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                          <circle cx="10" cy="10" r="0.8" fill="rgba(231, 34, 46, 0.6)" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#copy-dots)" />
                    </svg>
                  </>
                )}
                <div className="relative flex items-center justify-between mb-2">
                  <span className="text-lg font-light" style={{ color: keyType === 'copy' ? '#fff' : 'rgba(255, 255, 255, 0.6)' }}>
                    Копия
                  </span>
                  <Icon name="Key" className="w-5 h-5" style={{ color: keyType === 'copy' ? '#fff' : 'rgba(255, 255, 255, 0.4)' }} />
                </div>
                <div className="text-2xl font-medium" style={{ color: keyType === 'copy' ? '#fff' : 'rgba(255, 255, 255, 0.6)' }}>
                  25 000 ₽
                </div>
              </button>

              <button
                onClick={() => setKeyType('dealer')}
                className="relative py-6 px-6 rounded-xl transition-all duration-300 overflow-hidden"
                style={{
                  background: keyType === 'dealer'
                    ? 'linear-gradient(135deg, rgba(231, 34, 46, 0.9), rgba(231, 34, 46, 0.7))'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: keyType === 'dealer'
                    ? '1px solid rgba(231, 34, 46, 0.5)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: keyType === 'dealer'
                    ? '0 10px 40px rgba(231, 34, 46, 0.4)'
                    : 'none',
                }}
              >
                {keyType === 'dealer' && (
                  <>
                    <div 
                      className="absolute top-0 right-0 w-px h-full"
                      style={{
                        background: 'linear-gradient(180deg, transparent, rgba(231, 34, 46, 0.6), transparent)',
                        boxShadow: '0 0 12px rgba(231, 34, 46, 0.5)'
                      }}
                    />
                    <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none">
                      <defs>
                        <pattern id="dealer-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                          <circle cx="10" cy="10" r="0.8" fill="rgba(231, 34, 46, 0.6)" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#dealer-dots)" />
                    </svg>
                  </>
                )}
                <div className="relative flex items-center justify-between mb-2">
                  <span className="text-lg font-light" style={{ color: keyType === 'dealer' ? '#fff' : 'rgba(255, 255, 255, 0.6)' }}>
                    Дилерский
                  </span>
                  <Icon name="Award" className="w-5 h-5" style={{ color: keyType === 'dealer' ? '#fff' : 'rgba(255, 255, 255, 0.4)' }} />
                </div>
                <div className="text-2xl font-medium" style={{ color: keyType === 'dealer' ? '#fff' : 'rgba(255, 255, 255, 0.6)' }}>
                  40 000 ₽
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Итоговая стоимость */}
        <div 
          className="relative rounded-2xl p-8 mt-8 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(231, 34, 46, 0.15), rgba(231, 34, 46, 0.05))',
            border: '1px solid rgba(231, 34, 46, 0.3)',
            boxShadow: '0 8px 32px rgba(231, 34, 46, 0.15)'
          }}
        >
          <div 
            className="absolute top-0 left-0 right-0"
            style={{
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(231, 34, 46, 0.8) 30%, rgba(231, 34, 46, 1) 50%, rgba(231, 34, 46, 0.8) 70%, transparent)',
              boxShadow: '0 0 25px rgba(231, 34, 46, 0.7)'
            }}
          />
          <div 
            className="absolute left-0 top-0 bottom-0"
            style={{
              width: '2px',
              background: 'linear-gradient(180deg, transparent, rgba(231, 34, 46, 0.6) 50%, transparent)',
              boxShadow: '0 0 15px rgba(231, 34, 46, 0.5)'
            }}
          />
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
            <defs>
              <pattern id="final-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="rgba(231, 34, 46, 0.5)">
                  <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
                </circle>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#final-grid)" />
          </svg>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white/60 text-sm font-light mb-1 uppercase tracking-wider">
                Итоговая стоимость
              </div>
              <div className="text-white text-4xl font-light">
                {price.toLocaleString()} ₽
              </div>
            </div>
            <a
              href={getTelegramLink(selectedCity, `изготовление ключа BMW`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-medium text-white transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(231, 34, 46, 0.9), rgba(231, 34, 46, 0.7))',
                border: '1px solid rgba(231, 34, 46, 0.5)',
                boxShadow: '0 10px 40px rgba(231, 34, 46, 0.4)',
              }}
            >
              <Icon name="Send" className="w-5 h-5" />
              <span>Заказать</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}