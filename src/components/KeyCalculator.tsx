import { useState } from 'react';
import Icon from '@/components/ui/icon';

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

export default function KeyCalculator() {
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
        className="rounded-3xl p-12"
        style={{
          background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.95) 0%, rgba(10, 10, 15, 0.98) 100%)',
          border: '1px solid rgba(231, 34, 46, 0.25)',
          boxShadow: '0 30px 90px -20px rgba(231, 34, 46, 0.5)',
        }}
      >
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
                className="flex-1 py-4 px-6 rounded-xl font-medium transition-all duration-300"
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
                <div className="text-2xl font-light">Серия {s}</div>
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
                  <div className="text-xs mb-1 opacity-70">Позиция {key.position}</div>
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
                className="py-6 px-6 rounded-xl transition-all duration-300"
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
                <div className="flex items-center justify-between mb-2">
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
                className="py-6 px-6 rounded-xl transition-all duration-300"
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
                <div className="flex items-center justify-between mb-2">
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
          className="rounded-2xl p-8 mt-8"
          style={{
            background: 'linear-gradient(135deg, rgba(231, 34, 46, 0.15), rgba(231, 34, 46, 0.05))',
            border: '1px solid rgba(231, 34, 46, 0.3)',
          }}
        >
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
              href="https://t.me/Bocha_reborn"
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