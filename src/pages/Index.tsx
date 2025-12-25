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
    color: '#FF6B00'
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
            <p className="text-xl text-white/50 font-light max-w-2xl">
              Профессиональное программирование и активация скрытых функций
            </p>
          </div>

          {/* Services Grid - плавающие карточки как в iDrive 8 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {services.map((service, index) => (
              <Card
                key={service.id}
                className="group relative overflow-hidden cursor-pointer border-0 transition-all duration-500 hover:scale-[1.02]"
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                style={{
                  background: selectedService === service.id 
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.01))',
                  backdropFilter: 'blur(20px)',
                  boxShadow: selectedService === service.id
                    ? `0 20px 60px -10px ${service.color}40, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
                    : '0 10px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                  animationDelay: `${index * 0.1}s`
                }}
              >
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
                  <div className="flex items-center justify-between">
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