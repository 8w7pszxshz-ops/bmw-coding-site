import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const services = [
  {
    id: 'chiptuning',
    title: 'Чип-тюнинг',
    description: 'Увеличение мощности',
    icon: 'Zap',
    price: 'от 15 000 ₽',
    color: '#FF0040',
    details: [
      { title: 'Stage 1, Stage 2', desc: 'Увеличение мощности до +40%, улучшение динамики разгона' },
      { title: 'EGR, DPF OFF', desc: 'Отключение клапана рециркуляции и сажевого фильтра' },
      { title: 'Adblue OFF', desc: 'Отключение впрыска мочевины' }
    ]
  },
  {
    id: 'coding',
    title: 'Кодирование',
    description: 'Активация функций',
    icon: 'Code2',
    price: 'от 1 500 ₽',
    color: '#00D4FF',
    details: 'Активация скрытых функций: видео в движении, складывание зеркал, изменение приветствия, активация камер, отключение Start-Stop и многое другое.'
  },
  {
    id: 'equipment',
    title: 'Дооснащение',
    description: 'Установка оборудования',
    icon: 'Settings',
    price: 'от 15 000 ₽',
    color: '#B4FF00',
    details: 'Установка камер заднего вида, систем NBTEVO, замена панели приборов, привязка б/у блоков'
  },
  {
    id: 'russian',
    title: 'Русификация',
    description: 'Локализация интерфейса',
    icon: 'Languages',
    price: 'от 10 000 ₽',
    color: '#FF00E5',
    details: 'Полная русификация меню iDrive, приборной панели, голосовых команд. Замена языковых пакетов на русский язык.'
  },
  {
    id: 'maps',
    title: 'Навигация',
    description: 'Обновление карт',
    icon: 'MapPin',
    price: 'от 5 000 ₽',
    color: '#00FFB3',
    details: 'Установка последних карт России, Европы, Азии. Обновление навигационного ПО. Настройка голосового помощника на русском языке.'
  },
  {
    id: 'keys',
    title: 'Изготовление ключей',
    description: 'Изготовление ключей',
    icon: 'KeyRound',
    price: 'от 15 000 ₽',
    color: '#FFD700',
    details: 'Изготовление дубликатов ключей BMW с чипом. Программирование новых ключей. Восстановление утерянных ключей.'
  }
];

export default function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
      {services.map((service, index) => (
        <Card
          key={service.id}
          className="group relative overflow-hidden border-0 transition-all duration-500 hover:scale-[1.02]"
          style={{
            background: `
              linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02)),
              linear-gradient(135deg, ${service.color}08, ${service.color}03)
            `,
            backdropFilter: 'blur(40px)',
            boxShadow: `
              0 30px 80px -20px rgba(0, 0, 0, 0.6), 
              inset 0 1px 0 rgba(255, 255, 255, 0.1),
              0 0 0 1px ${service.color}15
            `,
            animationDelay: `${index * 50}ms`
          }}
        >
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${service.color}15, transparent 70%)`,
              mixBlendMode: 'screen'
            }}
          />

          <div 
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${service.color}40, transparent)`,
              boxShadow: `0 0 20px ${service.color}30`
            }}
          />
          
          <CardContent className="p-8 relative z-10">
            <div className="mb-6">
              {service.icon === 'Zap' && (
                <Icon 
                  name="Zap" 
                  className="w-12 h-12 transition-all duration-300 group-hover:scale-110"
                  style={{ color: service.color }}
                />
              )}
              {service.icon === 'Code2' && (
                <Icon 
                  name="Code2" 
                  className="w-12 h-12 transition-all duration-300 group-hover:scale-110"
                  style={{ color: service.color }}
                />
              )}
              {service.icon === 'Settings' && (
                <Icon 
                  name="Settings" 
                  className="w-12 h-12 transition-all duration-300 group-hover:scale-110"
                  style={{ color: service.color }}
                />
              )}
              {service.icon === 'Languages' && (
                <Icon 
                  name="Languages" 
                  className="w-12 h-12 transition-all duration-300 group-hover:scale-110"
                  style={{ color: service.color }}
                />
              )}
              {service.icon === 'MapPin' && (
                <Icon 
                  name="MapPin" 
                  className="w-12 h-12 transition-all duration-300 group-hover:scale-110"
                  style={{ color: service.color }}
                />
              )}
              {service.icon === 'KeyRound' && (
                <Icon 
                  name="KeyRound" 
                  className="w-12 h-12 transition-all duration-300 group-hover:scale-110"
                  style={{ color: service.color }}
                />
              )}
            </div>
            
            <h3 className="text-2xl font-light text-white mb-2 tracking-tight">
              {service.title}
            </h3>
            <p className="text-sm text-white/40 mb-4 font-light">
              {service.description}
            </p>
            
            <div 
              className="overflow-hidden transition-all duration-500"
              style={{
                maxHeight: selectedService === service.id ? '500px' : '0',
                opacity: selectedService === service.id ? 1 : 0
              }}
            >
              <div 
                className="mb-4 p-4 rounded-xl space-y-3"
                style={{
                  background: `linear-gradient(135deg, ${service.color}10, ${service.color}05)`,
                  border: `1px solid ${service.color}20`
                }}
              >
                {Array.isArray(service.details) ? (
                  service.details.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: service.color }} />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white/90 mb-1">{item.title}</div>
                        <div className="text-xs text-white/60 font-light leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    {service.details}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <span 
                className="text-lg font-light tracking-wide"
                style={{ color: service.color }}
              >
                {service.price}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedService(selectedService === service.id ? null : service.id);
                }}
                className="transition-all duration-300"
              >
                <Icon 
                  name="ChevronDown" 
                  className="w-5 h-5 text-white/30 transition-all duration-300 hover:text-white/60"
                  style={{
                    transform: selectedService === service.id ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                />
              </button>
            </div>
            
            <a
              href="https://t.me/Bocha_reborn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, ${service.color}20, ${service.color}10)`,
                border: `1px solid ${service.color}30`,
                boxShadow: `0 4px 12px ${service.color}10`
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Icon name="Send" className="w-4 h-4" style={{ color: service.color }} />
              <span className="text-sm font-light text-white/80">Связаться</span>
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}