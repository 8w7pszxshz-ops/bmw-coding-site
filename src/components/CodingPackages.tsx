import { useState } from 'react';
import Icon from '@/components/ui/icon';

const packages = [
  { 
    id: 'comfort', 
    name: 'Comfort', 
    price: '4 000 ₽',
    description: 'Базовые настройки комфорта',
    icon: 'Settings',
    features: [
      'Отключение автостопа',
      'Сворачивание зеркал по брелку',
      'Активация видео в движении',
      'Настройка ремней безопасности',
      'Отключение экономичного режима'
    ]
  },
  { 
    id: 'multimedia', 
    name: 'Multimedia', 
    price: '6 000 ₽',
    description: 'Расширенные функции мультимедиа',
    icon: 'Monitor',
    features: [
      'Все функции пакета Comfort',
      'Apple CarPlay / Android Auto',
      'Активация Spotify и YouTube',
      'Расширенная навигация',
      'Улучшенное аудио'
    ]
  },
  { 
    id: 'full', 
    name: 'Full Unlock', 
    price: '10 000 ₽',
    description: 'Полная разблокировка функций',
    icon: 'Unlock',
    features: [
      'Все функции пакетов Comfort + Multimedia',
      'Активация скрытых меню',
      'Полная кастомизация дисплеев',
      'Разблокировка заводских ограничений',
      'Индивидуальная настройка под запрос'
    ]
  }
];

export default function CodingPackages() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Icon name="Code" className="w-8 h-8 text-[#81C4FF]" />
          <h2 className="font-light text-white text-3xl">Кодировки BMW G-серии</h2>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => setSelectedPackage(pkg.id)}
            className="relative p-8 rounded-2xl transition-all duration-300 group text-left"
            style={{
              background: selectedPackage === pkg.id
                ? 'linear-gradient(135deg, rgba(129, 196, 255, 0.15), rgba(22, 88, 142, 0.15))'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
              border: selectedPackage === pkg.id
                ? '2px solid rgba(129, 196, 255, 0.5)'
                : '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: selectedPackage === pkg.id
                ? '0 20px 60px rgba(129, 196, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                : '0 8px 24px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div 
              className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-opacity duration-300"
              style={{
                background: 'linear-gradient(90deg, #81C4FF, #16588E)',
                opacity: selectedPackage === pkg.id ? 1 : 0
              }}
            />

            <div className="flex items-center gap-4 mb-6">
              <div 
                className="p-3 rounded-xl"
                style={{
                  background: selectedPackage === pkg.id
                    ? 'linear-gradient(135deg, rgba(129, 196, 255, 0.3), rgba(22, 88, 142, 0.2))'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                  border: '1px solid rgba(129, 196, 255, 0.2)'
                }}
              >
                <Icon 
                  name={pkg.icon as any} 
                  className="w-6 h-6"
                  style={{ color: selectedPackage === pkg.id ? '#81C4FF' : 'rgba(255, 255, 255, 0.6)' }}
                />
              </div>
              <div>
                <h3 
                  className="text-xl font-medium mb-1"
                  style={{ color: selectedPackage === pkg.id ? '#81C4FF' : '#fff' }}
                >
                  {pkg.name}
                </h3>
                <p className="text-white/50 text-sm">{pkg.description}</p>
              </div>
            </div>

            <div className="mb-6">
              <div 
                className="text-3xl font-light mb-6"
                style={{ color: selectedPackage === pkg.id ? '#81C4FF' : 'rgba(255, 255, 255, 0.9)' }}
              >
                {pkg.price}
              </div>

              <div className="space-y-2">
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-white/60">
                    <Icon 
                      name="Check" 
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: selectedPackage === pkg.id ? '#81C4FF' : 'rgba(255, 255, 255, 0.4)' }}
                    />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedPackage === pkg.id && (
              <div 
                className="flex items-center gap-2 text-sm mt-4"
                style={{ color: '#81C4FF' }}
              >
                <Icon name="CheckCircle" className="w-5 h-5" />
                <span className="font-medium">Выбрано</span>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          disabled={!selectedPackage}
          className="px-8 py-4 rounded-xl font-medium text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: selectedPackage 
              ? 'linear-gradient(135deg, #81C4FF, #16588E)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
            boxShadow: selectedPackage 
              ? '0 10px 40px rgba(129, 196, 255, 0.4)'
              : 'none',
            border: '1px solid rgba(129, 196, 255, 0.3)'
          }}
        >
          Записаться на кодировку
        </button>
      </div>
    </div>
  );
}