import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Adaptive } from '@/components/ui/responsive';
import ScrollIndicator from '@/components/ScrollIndicator';

const services = [
  {
    id: 'carplay',
    title: 'Apple CarPlay',
    description: 'Установка и интеграция',
    icon: 'Smartphone',
    price: 'от 15 000 ₽',
    color: '#FF0040',
    details: 'Полная интеграция Apple CarPlay в ваш BMW. Подключение к штатной мультимедийной системе с сохранением всех функций. Беспроводное подключение iPhone. Гарантия на установку.'
  },
  {
    id: 'startstop',
    title: 'Отключение старт-стоп авто 2023+',
    description: 'Программное отключение',
    icon: 'Power',
    price: 'от 1 500 ₽',
    color: '#00D4FF',
    details: 'Программное отключение системы Start-Stop для автомобилей 2023+ года выпуска. Постоянное отключение, без необходимости ручного отключения при каждом запуске.'
  },
  {
    id: 'awd',
    title: 'Отключение переднего привода с кнопки',
    description: 'Дооснащение системой',
    icon: 'Settings',
    price: 'от 15 000 ₽',
    color: '#B4FF00',
    details: 'Дооснащение системой управления полным приводом. Установка кнопки для переключения между полным и задним приводом. Интеграция в штатную электропроводку с возможностью переключения режимов.'
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
    id: 'strobes',
    title: 'Установка стробоскопов',
    description: 'Импульсные спецсигналы',
    icon: 'Zap',
    price: 'от 15 000 ₽',
    color: '#FFD700',
    details: 'Профессиональная установка импульсных световых спецсигналов (стробоскопов) с полной интеграцией в штатную электропроводку. Гарантия на установку.'
  }
];

function ServiceCardMobile({ service, index, isSelected, onToggle }: any) {
  return (
    <Card
      className="group relative overflow-hidden border-0 transition-all duration-500 flex-shrink-0"
      style={{
        background: `
          linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02)),
          linear-gradient(135deg, ${service.color}08, ${service.color}03)
        `,
        backdropFilter: 'blur(40px)',
        boxShadow: `
          0 20px 50px -15px rgba(0, 0, 0, 0.5), 
          inset 0 1px 0 rgba(255, 255, 255, 0.1),
          0 0 0 1px ${service.color}15
        `,
        animationDelay: `${index * 50}ms`,
        minWidth: '280px',
        width: '280px'
      }}
    >
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${service.color}40, transparent)`,
          boxShadow: `0 0 20px ${service.color}30`
        }}
      />
      
      <CardContent className="p-5 relative z-10">
        <div className="mb-4">
          <Icon 
            name={service.icon} 
            className="w-9 h-9 transition-all duration-300"
            style={{ color: service.color }}
          />
        </div>
        
        <h3 className="text-xl font-light text-white mb-2 tracking-tight">
          {service.title}
        </h3>
        <p className="text-xs text-white/70 mb-3 font-light">
          {service.description}
        </p>
        
        <div 
          className="overflow-hidden transition-all duration-500"
          style={{
            maxHeight: isSelected ? '500px' : '0',
            opacity: isSelected ? 1 : 0
          }}
        >
          <div 
            className="mb-3 p-3 rounded-lg space-y-2"
            style={{
              background: `linear-gradient(135deg, ${service.color}10, ${service.color}05)`,
              border: `1px solid ${service.color}20`
            }}
          >
            {Array.isArray(service.details) ? (
              service.details.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <div className="flex-shrink-0 w-1 h-1 rounded-full mt-1.5" style={{ backgroundColor: service.color }} />
                  <div className="flex-1">
                    <div className="text-xs font-medium text-white/90 mb-0.5">{item.title}</div>
                    <div className="text-[10px] text-white/60 font-light leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-white/70 font-light leading-relaxed">
                {service.details}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <span 
            className="text-base font-light tracking-wide"
            style={{ color: service.color }}
          >
            {service.price}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className="transition-all duration-300"
          >
            <Icon 
              name="ChevronDown" 
              className="w-4 h-4 text-white/30 transition-all duration-300"
              style={{
                transform: isSelected ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>
        </div>
        
        <a
          href="https://t.me/Bocha_reborn"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${service.color}20, ${service.color}10)`,
            border: `1px solid ${service.color}30`,
            color: service.color
          }}
        >
          <span className="text-sm font-light">Записаться</span>
          <Icon name="ArrowRight" className="w-4 h-4" />
        </a>
      </CardContent>
    </Card>
  );
}

function ServiceCardDesktop({ service, index, isSelected, onToggle }: any) {
  return (
    <Card
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
          <Icon 
            name={service.icon} 
            className="w-12 h-12 transition-all duration-300 group-hover:scale-110"
            style={{ color: service.color }}
          />
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
            maxHeight: isSelected ? '500px' : '0',
            opacity: isSelected ? 1 : 0
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
              onToggle();
            }}
            className="transition-all duration-300"
          >
            <Icon 
              name="ChevronDown" 
              className="w-5 h-5 text-white/30 transition-all duration-300 hover:text-white/60"
              style={{
                transform: isSelected ? 'rotate(180deg)' : 'rotate(0deg)'
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
            color: service.color
          }}
        >
          <span className="text-sm font-light">Записаться</span>
          <Icon name="ArrowRight" className="w-5 h-5" />
        </a>
      </CardContent>
    </Card>
  );
}

export default function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <Adaptive
      mobile={
        <div className="mb-12">
          <div className="overflow-x-auto scrollbar-hide -mx-4 snap-x snap-mandatory">
            <div className="flex gap-4 px-4 pb-2">
              {services.map((service, index) => (
                <div key={service.id} className="snap-center">
                  <ServiceCardMobile
                    service={service}
                    index={index}
                    isSelected={selectedService === service.id}
                    onToggle={() => setSelectedService(selectedService === service.id ? null : service.id)}
                  />
                </div>
              ))}
            </div>
          </div>
          <ScrollIndicator totalItems={services.length} color="#00D4FF" />
        </div>
      }
      desktop={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {services.map((service, index) => (
            <ServiceCardDesktop
              key={service.id}
              service={service}
              index={index}
              isSelected={selectedService === service.id}
              onToggle={() => setSelectedService(selectedService === service.id ? null : service.id)}
            />
          ))}
        </div>
      }
    />
  );
}