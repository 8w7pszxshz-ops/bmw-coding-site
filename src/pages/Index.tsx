import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const services = [
  {
    id: 'chiptuning',
    title: 'Чип-тюнинг',
    description: 'Увеличение мощности',
    icon: 'Zap',
    price: 'от 25 000 ₽',
    color: '#FF0040'
  },
  {
    id: 'coding',
    title: 'Кодирование',
    description: 'Активация функций',
    icon: 'Code2',
    price: 'от 8 000 ₽',
    color: '#00D4FF'
  },
  {
    id: 'equipment',
    title: 'Дооснащение',
    description: 'Установка оборудования',
    icon: 'Settings',
    price: 'от 15 000 ₽',
    color: '#B4FF00'
  },
  {
    id: 'russian',
    title: 'Русификация',
    description: 'Локализация интерфейса',
    icon: 'Languages',
    price: 'от 12 000 ₽',
    color: '#FF00E5'
  },
  {
    id: 'maps',
    title: 'Навигация',
    description: 'Обновление карт',
    icon: 'MapPin',
    price: 'от 5 000 ₽',
    color: '#00FFB3'
  },
  {
    id: 'keys',
    title: 'Ключи',
    description: 'Изготовление ключей',
    icon: 'KeyRound',
    price: 'от 18 000 ₽',
    color: '#FFD700'
  }
];

const quickActions = [
  { id: 'call', icon: 'Phone', label: 'Позвонить' },
  { id: 'whatsapp', icon: 'MessageCircle', label: 'WhatsApp' },
  { id: 'location', icon: 'MapPin', label: 'Адрес' },
  { id: 'time', icon: 'Clock', label: 'Режим' }
];

export default function Index() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [currentTime] = useState(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      
      {/* iDrive 9.0 Background with animated gradient mesh */}
      <div 
        className="min-h-screen relative"
        style={{
          background: `
            radial-gradient(ellipse 800px 600px at 20% 30%, rgba(0, 150, 255, 0.15), transparent),
            radial-gradient(ellipse 600px 800px at 80% 70%, rgba(100, 200, 255, 0.12), transparent),
            radial-gradient(ellipse 400px 400px at 50% 50%, rgba(50, 180, 255, 0.08), transparent),
            linear-gradient(135deg, #000000 0%, #0a0d15 50%, #000509 100%)
          `,
        }}
      >
        
        {/* Animated ambient particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(0, 150, 255, 0.2), transparent)',
              top: '10%',
              left: '15%',
              animationDuration: '4s'
            }}
          />
          <div 
            className="absolute w-80 h-80 rounded-full blur-3xl animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(100, 200, 255, 0.15), transparent)',
              bottom: '15%',
              right: '20%',
              animationDuration: '5s',
              animationDelay: '1s'
            }}
          />
          <div 
            className="absolute w-64 h-64 rounded-full blur-3xl animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(50, 180, 255, 0.18), transparent)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animationDuration: '6s',
              animationDelay: '2s'
            }}
          />
        </div>
        
        {/* Status Bar - как в iDrive 8 */}
        <div className="fixed top-0 left-0 right-0 z-50 px-8 py-4 flex items-center justify-between backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-3">
            <img 
              src="https://cdn.poehali.dev/files/reborn.jpg" 
              alt="Logo" 
              className="h-10 w-auto opacity-90"
            />
            <div className="h-6 w-px bg-white/20" />
            <span className="text-white/60 text-sm font-light tracking-wider" style={{ fontFamily: 'BMW Helvetica, sans-serif' }}>REBORN BMW</span>
          </div>
          
          <div className="flex items-center gap-6 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <Icon name="Wifi" className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Signal" className="w-4 h-4" />
            </div>
            <div className="font-light tracking-wide">{currentTime}</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 pt-24 pb-32">
          
          {/* Hero Section - крупный заголовок как в iDrive */}
          <div className="mb-16 mt-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
              <span className="text-white/40 text-xs tracking-[0.3em] uppercase font-light">Чип-тюнинг • Кодирование • Дооснащение</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-extralight text-white tracking-tight leading-none mb-4" style={{ fontFamily: 'BMW Helvetica, sans-serif' }}>
              REBORN
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                BMW
              </span>
            </h1>
            
            <p className="text-xl text-white/50 font-light max-w-2xl mb-12">
              Профессиональное программирование и активация скрытых функций
            </p>
          </div>

          {/* Специальное предложение - Full Width */}
          <div 
            className="relative rounded-3xl overflow-hidden mb-16 group cursor-pointer"
            style={{
              border: '2px solid rgba(231, 34, 46, 0.3)',
              boxShadow: '0 25px 80px -15px rgba(231, 34, 46, 0.6), 0 0 60px rgba(231, 34, 46, 0.3)'
            }}
          >
            {/* BMW M триколор - тонкая полоска сверху */}
            <div 
              className="absolute top-0 left-0 right-0 h-1 z-20"
              style={{
                background: 'linear-gradient(90deg, #81C4FF 0%, #81C4FF 33.33%, #16588E 33.33%, #16588E 66.66%, #E7222E 66.66%, #E7222E 100%)',
                boxShadow: '0 0 30px rgba(231, 34, 46, 0.8)'
              }}
            />
            
            <div className="flex flex-col lg:flex-row">
              {/* Левая часть - Изображение */}
              <div className="lg:w-1/2 relative overflow-hidden bg-black">
                <img 
                  src="https://cdn.poehali.dev/files/-O880h2Gy2CrXb3pJUh9Zc1ZnLY-1920.jpg" 
                  alt="BMW Live Cockpit Professional - Российские карты навигации" 
                  className="w-full h-full object-contain"
                  style={{
                    filter: 'brightness(0.85) contrast(1.4) saturate(1.3) blur(0px)'
                  }}
                />
                
                {/* Оверлей для уменьшения засветов */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `
                      radial-gradient(ellipse at 30% 40%, rgba(0, 0, 0, 0.4) 0%, transparent 50%),
                      radial-gradient(ellipse at 70% 50%, rgba(0, 0, 0, 0.3) 0%, transparent 40%),
                      linear-gradient(to bottom, rgba(0, 0, 0, 0.25) 0%, transparent 30%, transparent 70%, rgba(0, 0, 0, 0.2) 100%)
                    `,
                    mixBlendMode: 'multiply'
                  }}
                />
              </div>
              
              {/* Правая часть - Контент с красной подсветкой */}
              <div 
                className="lg:w-1/2 relative p-12 flex flex-col justify-center"
                style={{
                  background: `
                    radial-gradient(ellipse at right, rgba(231, 34, 46, 0.2) 0%, transparent 70%),
                    radial-gradient(ellipse at center, rgba(231, 34, 46, 0.15) 0%, transparent 60%),
                    linear-gradient(135deg, rgba(20, 20, 30, 0.95) 0%, rgba(10, 10, 15, 0.98) 100%)
                  `,
                  backdropFilter: 'blur(20px)'
                }}
              >
                {/* Красное свечение по краям */}
                <div 
                  className="absolute inset-0 opacity-60 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 80% 50%, rgba(231, 34, 46, 0.3), transparent 50%)',
                    mixBlendMode: 'screen'
                  }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon name="Map" className="w-6 h-6 text-[#E7222E]" />
                    <span className="text-[#E7222E] text-sm font-light tracking-widest uppercase">Специальное предложение</span>
                  </div>
                  
                  <h2 className="text-5xl font-light text-white mb-4 leading-tight">
                    Российские карты навигации
                  </h2>
                  
                  <p className="text-white/80 text-lg font-light mb-8 leading-relaxed max-w-xl">
                    Смена навигации на российские карты за 1 час. Настройка и активация включены в стоимость. Гарантия на установку.
                  </p>
                  
                  <div className="flex items-center gap-8 mb-8">
                    <div>
                      <span className="text-white/40 text-sm line-through block mb-2">35 000 ₽</span>
                      <span className="text-6xl font-light text-[#E7222E]">25 000 ₽</span>
                    </div>
                    <div 
                      className="px-8 py-4 rounded-2xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(231, 34, 46, 0.9), rgba(231, 34, 46, 0.7))',
                        border: '1px solid rgba(231, 34, 46, 0.5)',
                        boxShadow: '0 10px 40px rgba(231, 34, 46, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <span className="text-white text-2xl font-medium">-29%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-white/60 text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" className="w-4 h-4" />
                      <span>Установка 1 час</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Shield" className="w-4 h-4" />
                      <span>Гарантия</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Check" className="w-4 h-4" />
                      <span>Настройка бесплатно</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hover эффект - красный блик */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(231, 34, 46, 0.15), transparent 70%)'
              }}
            />
          </div>

          {/* Services Grid - плавающие карточки как в iDrive 8 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {services.map((service, index) => (
              <Card
                key={service.id}
                className="group relative overflow-hidden cursor-pointer border-0 transition-all duration-500 hover:scale-[1.02]"
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* BMW M Tricolor на hover - правильные цвета */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: 'linear-gradient(90deg, #81C4FF 0%, #81C4FF 33.33%, #16588E 33.33%, #16588E 66.66%, #E7222E 66.66%, #E7222E 100%)',
                    boxShadow: '0 0 40px rgba(129, 196, 255, 0.8), 0 0 20px rgba(231, 34, 46, 0.6)'
                  }}
                />
                
                {/* Подсветка glassmorphism при hover - увеличенная */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                  style={{
                    background: `
                      radial-gradient(circle at 50% 50%, rgba(129, 196, 255, 0.25), transparent 60%),
                      radial-gradient(circle at 80% 20%, rgba(22, 88, 142, 0.2), transparent 50%),
                      radial-gradient(circle at 20% 80%, rgba(231, 34, 46, 0.15), transparent 50%)
                    `,
                    backdropFilter: 'blur(40px)'
                  }}
                />
                {/* Accent Line */}
                <div 
                  className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500"
                  style={{
                    background: selectedService === service.id 
                      ? `linear-gradient(90deg, ${service.color}, transparent)`
                      : 'linear-gradient(90deg, rgba(255, 255, 255, 0.1), transparent)',
                    boxShadow: selectedService === service.id ? `0 0 20px ${service.color}` : 'none'
                  }}
                />
                
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${service.color}20, ${service.color}05)`,
                        boxShadow: selectedService === service.id ? `0 0 30px ${service.color}30` : 'none'
                      }}
                    >
                      <Icon 
                        name={service.icon as any} 
                        className="w-7 h-7 transition-all duration-500" 
                        style={{ color: service.color }}
                      />
                    </div>
                    
                    {selectedService === service.id && (
                      <div 
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: service.color }}
                      />
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-light text-white mb-2 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/40 mb-4 font-light">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="text-lg font-light tracking-wide"
                      style={{ color: service.color }}
                    >
                      {service.price}
                    </span>
                    <Icon 
                      name="ChevronRight" 
                      className="w-5 h-5 text-white/30 transition-all duration-300 group-hover:translate-x-1"
                    />
                  </div>
                  
                  {/* Кнопка связаться в Telegram */}
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

          {/* Info Card */}
          <Card
            className="border-0 overflow-hidden max-w-4xl mx-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02))',
              backdropFilter: 'blur(30px)',
              boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
            }}
          >
            <CardContent className="p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-16 bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent rounded-full" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extralight text-white mb-6 tracking-tight">
                Модернизация BMW
              </h2>
              
              <p className="text-lg text-white/50 font-light mb-8 leading-relaxed">
                Активация скрытых функций • Увеличение мощности • Обновление программного обеспечения • Русификация интерфейса
              </p>
              
              <div className="flex flex-wrap gap-4">
                {quickActions.map((action) => (
                  <Button
                    key={action.id}
                    className="flex-1 min-w-[140px] py-6 px-6 rounded-2xl font-light text-base transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <Icon name={action.icon as any} className="w-5 h-5 mr-2" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Navigation - QuickSelect как в iDrive 8 */}
        <div 
          className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl border-t"
          style={{
            background: 'linear-gradient(180deg, rgba(10, 10, 15, 0.85), rgba(5, 5, 8, 0.95))',
            borderColor: 'rgba(255, 255, 255, 0.08)'
          }}
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <button className="flex flex-col items-center gap-1 transition-all duration-300 hover:scale-105">
                  <Icon name="Home" className="w-6 h-6 text-white/60" />
                  <span className="text-xs text-white/40 font-light">Главная</span>
                </button>
                <button className="flex flex-col items-center gap-1 transition-all duration-300 hover:scale-105">
                  <Icon name="Grid3x3" className="w-6 h-6 text-white/60" />
                  <span className="text-xs text-white/40 font-light">Услуги</span>
                </button>
                <button className="flex flex-col items-center gap-1 transition-all duration-300 hover:scale-105">
                  <Icon name="Info" className="w-6 h-6 text-white/60" />
                  <span className="text-xs text-white/40 font-light">О нас</span>
                </button>
              </div>
              
              <div className="flex items-center gap-3 text-white/40 text-xs">
                <span className="font-light tracking-wide" style={{ fontFamily: 'BMW Helvetica, sans-serif' }}>© 2024 REBORN BMW</span>
                <div className="h-4 w-px bg-white/20" />
                <span className="font-light">Premium Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}