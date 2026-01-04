import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const vibrate = (pattern: number | number[] = 10) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

interface Service {
  service_code: string;
  category: string;
  service_name: string;
  description: string;
  price: number;
  duration_minutes: number;
  complexity: string;
  is_popular: boolean;
  is_available: boolean;
  missing_blocks?: string[];
}

interface Category {
  name: string;
  services: Service[];
  total_services: number;
}

interface CalculatorProps {
  vinData: any;
}

const categoryIcons: Record<string, string> = {
  engine: 'Zap',
  transmission: 'Settings',
  multimedia: 'Tv',
  lighting: 'Lightbulb',
  dashboard: 'Gauge',
  comfort: 'Home',
  safety: 'Shield'
};

const serviceVisuals: Record<string, { before: string; after: string; description: string }> = {
  // Мультимедиа
  'MM01': {
    before: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1617886903355-9354bb57751f?w=600&q=80',
    description: 'Беспроводной Apple CarPlay и Android Auto появится в меню iDrive'
  },
  'MM02': {
    before: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&q=80',
    description: 'Возможность смотреть видео на экране во время движения (только для пассажира)'
  },
  'MM03': {
    before: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=600&q=80',
    description: 'Камера заднего вида растянется на весь экран для лучшего обзора'
  },
  'MM04': {
    before: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80',
    description: 'G-meter, давление турбины, температура масла на экране'
  },
  
  // Освещение
  'LIGHT01': {
    before: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80',
    description: 'Подсветка под дверями создаст эффект ковровой дорожки'
  },
  'LIGHT02': {
    before: 'https://images.unsplash.com/photo-1514866726862-0f081731e0ce?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600&q=80',
    description: 'Дневные ходовые огни будут работать как в скандинавских странах'
  },
  'LIGHT03': {
    before: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=600&q=80',
    description: 'Поворотники будут бежать волной вместо обычного мигания'
  },
  'LIGHT04': {
    before: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80',
    description: 'Ангельские глазки станут ярче и заметнее'
  },
  'LIGHT05': {
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1562224840-3c0b8de69b60?w=600&q=80',
    description: 'Противотуманки будут работать как дневные ходовые огни'
  },
  
  // Приборная панель
  'DASH01': {
    before: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80',
    description: 'Цифровой спидометр всегда будет виден на дисплее'
  },
  'DASH02': {
    before: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1617128034254-61a3b0befc19?w=600&q=80',
    description: 'Стрелки приборов эффектно пробегут полный круг при запуске'
  },
  'DASH03': {
    before: 'https://images.unsplash.com/photo-1563249278-1b0e9f0c2d67?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=600&q=80',
    description: 'Температура масла двигателя появится на дисплее постоянно'
  },
  'DASH04': {
    before: 'https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6b9?w=600&q=80',
    description: 'Спортивные M-дисплеи с доп. информацией для трека'
  },
  
  // Комфорт
  'COMF01': {
    before: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80',
    description: 'Багажник откроется от движения ноги, зеркала складываются автоматически'
  },
  'COMF02': {
    before: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80',
    description: 'Все окна закроются удержанием кнопки закрытия на ключе'
  },
  'COMF03': {
    before: 'https://images.unsplash.com/photo-1569748130764-3fed0c102c59?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1620125501033-c285373a6e88?w=600&q=80',
    description: 'Система Start/Stop будет автоматически выключена при каждом запуске'
  },
  'COMF04': {
    before: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=600&q=80',
    description: 'Зеркала можно будет сложить даже во время движения'
  },
  'COMF05': {
    before: 'https://images.unsplash.com/photo-1607057873073-e8f3250e46c5?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?w=600&q=80',
    description: 'Климат-контроль продолжит обогрев салона после выключения двигателя'
  },
  
  // Двигатель
  'ENG01': {
    before: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80',
    description: 'B48 320i: прибавка +40 л.с. до 224 л.с. и +80 Нм крутящего момента'
  },
  'ENG02': {
    before: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80',
    description: 'B58 340i: прирост +60 л.с. до 386 л.с. и +100 Нм момента'
  },
  'ENG03': {
    before: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=600&q=80',
    description: 'B58 Stage 2: экстремальные +100 л.с. с даунпайпом до 426 л.с.'
  },
  'ENG04': {
    before: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80',
    description: 'Выхлоп будет стрелять и хлопать при сбросе газа как на спорткарах'
  },
  'ENG05': {
    before: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    description: 'Launch Control для максимально быстрого старта с места'
  },
  'ENG06': {
    before: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&q=80',
    description: 'Снятие ограничения максимальной скорости 250 км/ч'
  },
  
  // Трансмиссия
  'TRANS01': {
    before: 'https://images.unsplash.com/photo-1617886903355-9354bb57751f?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80',
    description: 'XHP Stage 1: переключения на 30% быстрее, отклик улучшен'
  },
  'TRANS02': {
    before: 'https://images.unsplash.com/photo-1553267751-1c148a7280a1?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80',
    description: 'XHP Stage 2: агрессивные переключения +50%, жесткие удары'
  },
  'TRANS03': {
    before: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80',
    description: 'XHP Stage 3: максимум +70% скорость, Launch до 5000 rpm'
  },
  'TRANS04': {
    before: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80',
    description: 'Kickdown сработает уже при 50% нажатия педали газа'
  },
  
  // Безопасность
  'SAFE01': {
    before: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80',
    description: 'MDM режим (спортивная стабилизация) будет включен по умолчанию'
  },
  'SAFE02': {
    before: 'https://images.unsplash.com/photo-1588489357406-4d9d914d9a5c?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=600&q=80',
    description: 'Отключение назойливого звукового сигнала непристегнутого ремня'
  },
  'SAFE03': {
    before: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=600&q=80',
    after: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80',
    description: 'Отключение подушки пассажира для безопасной установки детского кресла'
  }
};

export default function ServicesCalculator({ vinData }: CalculatorProps) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Record<string, Category>>({});
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [totalPrice, setTotalPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [previewService, setPreviewService] = useState<Service | null>(null);

  const loadServices = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/9fe99b4b-14d3-46f7-821e-c6d3b183abbf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'get_services',
          vinData: vinData
        })
      });

      const data = await response.json();
      if (response.ok) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = async () => {
    if (selectedServices.size === 0) return;

    try {
      const response = await fetch('https://functions.poehali.dev/9fe99b4b-14d3-46f7-821e-c6d3b183abbf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'calculate_order',
          vinData: vinData,
          selectedServices: Array.from(selectedServices)
        })
      });

      const data = await response.json();
      if (response.ok) {
        setTotalPrice(data.total_price);
        setFinalPrice(data.final_price);
        setDiscount(data.discount_percent);
        setTotalDuration(data.total_duration);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleService = (serviceCode: string) => {
    vibrate(10);
    const newSelected = new Set(selectedServices);
    if (newSelected.has(serviceCode)) {
      newSelected.delete(serviceCode);
    } else {
      newSelected.add(serviceCode);
    }
    setSelectedServices(newSelected);
  };

  // Автозагрузка услуг при монтировании
  useEffect(() => {
    if (vinData) {
      loadServices();
    }
  }, [vinData]);

  // Пересчет при изменении выбранных услуг
  useEffect(() => {
    if (selectedServices.size > 0) {
      calculateTotal();
    } else {
      setTotalPrice(0);
      setFinalPrice(0);
      setDiscount(0);
      setTotalDuration(0);
    }
  }, [selectedServices]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (Object.keys(categories).length === 0) {
    return null;
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* 3D Визуализация автомобиля */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 lg:sticky lg:top-4 h-fit">
          <h3 className="text-white text-lg font-semibold mb-4">Визуализация опций</h3>
          <div className="relative w-full aspect-[16/9] bg-black/30 rounded-xl overflow-hidden">
            {/* SVG автомобиль сбоку */}
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
        
        {/* Список услуг */}
      <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <Icon name="ShoppingCart" className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white text-xl font-semibold">Выберите услуги</h3>
            <p className="text-gray-400 text-sm">Скидка 10% от 3 услуг, 15% от 5 услуг</p>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(categories).map(([catKey, category]) => (
            <div key={catKey} className="bg-white/5 rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <Icon name={categoryIcons[catKey] || 'Box'} className="w-5 h-5 text-blue-400" />
                <h4 className="text-white font-medium">{category.name}</h4>
                <span className="text-gray-400 text-sm">({category.total_services})</span>
              </div>

              <div className="space-y-2">
                {category.services.map((service) => (
                  <div key={service.service_code} className="relative">
                    <label
                      onMouseEnter={() => setHoveredService(service.service_name)}
                      onMouseLeave={() => setHoveredService(null)}
                      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                        selectedServices.has(service.service_code)
                          ? 'bg-blue-500/20 border-blue-500/50'
                          : 'bg-white/5 border-white/5 hover:bg-white/10'
                      } border`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedServices.has(service.service_code)}
                        onChange={() => toggleService(service.service_code)}
                        className="mt-1 w-5 h-5 rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-white font-medium text-sm">{service.service_name}</span>
                          {service.is_popular && (
                            <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-0.5 rounded-full">
                              Популярно
                            </span>
                          )}
                          {serviceVisuals[service.service_code] && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                vibrate(10);
                                setPreviewService(service);
                              }}
                              className="flex items-center gap-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-xs px-2 py-1 rounded-full transition-all"
                            >
                              <Icon name="Image" className="w-3 h-3" />
                              <span>Фото</span>
                            </button>
                          )}
                        </div>
                        <p className="text-gray-400 text-xs mb-2">{service.description}</p>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-green-400 font-semibold">{service.price.toLocaleString()} ₽</span>
                          <span className="text-gray-500">{service.duration_minutes} мин</span>
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

      {selectedServices.size > 0 && (
        <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-xl rounded-2xl border border-green-500/20 p-6 sticky bottom-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-white font-semibold mb-1">Итого услуг: {selectedServices.size}</div>
              <div className="text-gray-400 text-sm">Время работы: ~{Math.round(totalDuration / 60)} ч</div>
            </div>
            <div className="text-right">
              {discount > 0 && (
                <div className="text-gray-400 text-sm line-through mb-1">
                  {totalPrice.toLocaleString()} ₽
                </div>
              )}
              <div className="text-3xl font-bold text-green-400">
                {finalPrice.toLocaleString()} ₽
              </div>
              {discount > 0 && (
                <div className="text-green-400 text-sm mt-1">
                  Скидка {discount}%: -{(totalPrice - finalPrice).toLocaleString()} ₽
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => { vibrate(15); setShowContact(true); }}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
            >
              <Icon name="CheckCircle" className="w-5 h-5" />
              <span>Форма заказа</span>
            </button>
            <button
              onClick={() => {
                vibrate(15);
                const services = Array.from(selectedServices)
                  .map(code => {
                    for (const cat of Object.values(categories)) {
                      const service = cat.services.find(s => s.service_code === code);
                      if (service) return `${service.service_name} (${service.price.toLocaleString()} ₽)`;
                    }
                    return '';
                  })
                  .filter(Boolean)
                  .join('\n');
                
                const message = `🚗 *Заказ с VIN Decoder*\n\n*VIN:* ${vinData.vin}\n*Авто:* ${vinData.vehicle.manufacturer} ${vinData.vehicle.series} (${vinData.vehicle.year})\n\n*Выбранные услуги:*\n${services}\n\n*Итого:* ${finalPrice.toLocaleString()} ₽${discount > 0 ? ` (скидка ${discount}%)` : ''}\n*Время работы:* ~${Math.round(totalDuration / 60)} ч`;
                
                const encodedMessage = encodeURIComponent(message);
                window.open(`https://t.me/bochaservice?text=${encodedMessage}`, '_blank');
              }}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
            >
              <Icon name="Send" className="w-5 h-5" />
              <span>В Telegram</span>
            </button>
          </div>
        </div>
      )}

      {previewService && serviceVisuals[previewService.service_code] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setPreviewService(null)}>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 p-6 max-w-4xl w-full animate-in slide-in-from-bottom-4 duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white text-2xl font-semibold mb-1">{previewService.service_name}</h3>
                <p className="text-gray-400 text-sm">{serviceVisuals[previewService.service_code].description}</p>
              </div>
              <button
                onClick={() => { vibrate(5); setPreviewService(null); }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Icon name="X" className="w-6 h-6" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <div className="text-red-400 text-sm font-medium flex items-center gap-2">
                  <Icon name="X" className="w-4 h-4" />
                  <span>До кодирования</span>
                </div>
                <div className="aspect-video rounded-lg overflow-hidden border-2 border-red-500/30">
                  <img 
                    src={serviceVisuals[previewService.service_code].before} 
                    alt="До"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-green-400 text-sm font-medium flex items-center gap-2">
                  <Icon name="Check" className="w-4 h-4" />
                  <span>После кодирования</span>
                </div>
                <div className="aspect-video rounded-lg overflow-hidden border-2 border-green-500/30">
                  <img 
                    src={serviceVisuals[previewService.service_code].after} 
                    alt="После"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <Icon name="Info" className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-300">{previewService.description}</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-gray-400 text-sm">
                <span className="text-white font-semibold text-lg">{previewService.price.toLocaleString()} ₽</span> • {previewService.duration_minutes} минут
              </div>
              <button
                onClick={() => {
                  vibrate(15);
                  toggleService(previewService.service_code);
                  setPreviewService(null);
                }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95 ${
                  selectedServices.has(previewService.service_code)
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                }`}
              >
                {selectedServices.has(previewService.service_code) ? 'Убрать из заказа' : 'Добавить в заказ'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 p-6 max-w-md w-full animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-xl font-semibold">Оформление заказа</h3>
              <button
                onClick={() => { vibrate(5); setShowContact(false); }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Icon name="X" className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Имя</label>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full bg-white/10 text-white placeholder:text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Телефон</label>
                <input
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  className="w-full bg-white/10 text-white placeholder:text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Email (опционально)</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-white/10 text-white placeholder:text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1 block">Комментарий</label>
                <textarea
                  placeholder="Дополнительные пожелания..."
                  rows={3}
                  className="w-full bg-white/10 text-white placeholder:text-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                />
              </div>
            </div>

            <button
              onClick={() => vibrate(15)}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-95"
            >
              Отправить заявку
            </button>
          </div>
        </div>
      )}
    </div>
  );
}