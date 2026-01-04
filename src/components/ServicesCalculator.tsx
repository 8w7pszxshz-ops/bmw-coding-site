import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import CarVisualization from './services/CarVisualization';
import ServicePreviewModal from './services/ServicePreviewModal';
import { categoryIcons, serviceVisuals } from './services/ServiceVisualData';

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

  useEffect(() => {
    if (vinData) {
      loadServices();
    }
  }, [vinData]);

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
        <CarVisualization hoveredService={hoveredService} />
        
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

      {previewService && (
        <ServicePreviewModal
          service={previewService}
          isSelected={selectedServices.has(previewService.service_code)}
          onToggle={() => toggleService(previewService.service_code)}
          onClose={() => setPreviewService(null)}
        />
      )}

      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowContact(false)}>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-white/10 p-8 max-w-md w-full animate-in slide-in-from-bottom-4 duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <Icon name="CheckCircle" className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white text-2xl font-semibold mb-2">Форма заказа</h3>
              <p className="text-gray-400">Скоро здесь появится форма для оформления заказа</p>
            </div>
            <button
              onClick={() => { vibrate(10); setShowContact(false); }}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
