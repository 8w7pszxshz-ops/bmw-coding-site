import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Adaptive } from '@/components/ui/responsive';
import ScrollIndicator from '@/components/ScrollIndicator';
import { City } from '@/components/CitySelector';
import { getTelegramLink } from '@/utils/cityConfig';

const offers = [
  {
    id: 1,
    icon: 'Map',
    label: 'Специальное предложение',
    title: 'Российские карты навигации',
    description: 'Смена навигации на российские карты за 1 час. Настройка и активация включены в стоимость. Гарантия на установку.',
    oldPrice: '35 000 ₽',
    newPrice: '25 000 ₽',
    discount: '-29%',
    image: 'https://cdn.poehali.dev/files/mgu1.jpg',
    imageStyle: {
      filter: 'brightness(1.35) contrast(1.5) saturate(1.4)',
      objectPosition: 'center 35%',
      transform: 'scale(1.5)',
    },
    features: [
      { icon: 'Clock', text: 'Установка 1 час' },
      { icon: 'Shield', text: 'Гарантия' },
      { icon: 'Gift', text: 'Apple CarPlay бесплатно', highlight: true }
    ],
    hasButton: true,
    buttonText: 'Оформить',
    buttonService: 'Российские карты навигации'
  },
  {
    id: 2,
    icon: 'AlertTriangle',
    label: 'Специальное предложение',
    title: 'Удаление ошибки экстренного вызова',
    description: 'Программное удаление ошибки "Система экстренного вызова недоступна" вместо дорогостоящего ремонта блока.',
    oldPrice: '20 000 ₽',
    newPrice: '5 000 ₽',
    discount: '-75%',
    image: 'https://cdn.poehali.dev/files/KOnOQJrG2OG-A3IbwfD2C7UUxm4-1920.jpg',
    imageStyle: {
      filter: 'brightness(1.2) contrast(1.3) saturate(1.1)',
      objectPosition: 'center center',
    },
    features: [
      { icon: 'Clock', text: 'Работа 30 минут' },
      { icon: 'Shield', text: 'Гарантия' },
      { icon: 'Check', text: 'Без замены блока' }
    ],
    hasButton: true,
    buttonText: 'Оформить',
    buttonService: 'Удаление ошибки экстренного вызова'
  },
  {
    id: 3,
    icon: 'Cpu',
    label: 'Специальное предложение',
    title: 'Unlock блока двигателя за 3-5 дней',
    description: 'Разблокировка блоков управления двигателем (DME/DDE) для моделей BMW 2020+ года выпуска под последующий чип-тюнинг. Мы обеспечиваем прямую логистику собственным курьером, что гарантирует 100% сохранность и конфиденциальность вашего оборудования.',
    oldPrice: '',
    newPrice: '',
    discount: '',
    image: 'https://cdn.poehali.dev/files/MDG1.jpg',
    imageStyle: {
      filter: 'brightness(1) contrast(1.1) saturate(1)',
      objectPosition: 'center center',
      transform: 'scale(1)',
    },
    features: [
      { icon: 'Clock', text: 'Срок 3-5 дней' },
      { icon: 'Shield', text: 'Гарантия сохранности' },
      { icon: 'Truck', text: 'Прямой курьер' }
    ],
    hasButton: true,
    buttonText: 'Сделать Unlock',
    buttonService: 'Unlock блока двигателя'
  },
  {
    id: 4,
    icon: 'Key',
    label: 'Специальное предложение',
    title: 'Почему 25 000 ₽ вместо 40 000 ₽?',
    description: 'Секрет в технологиях: ваш новый ключ BMW за 30 минут без разбора автомобиля. Мы ломаем стереотипы, предлагая полноценную копию на совершенно ином уровне.',
    oldPrice: '40 000 ₽',
    newPrice: '25 000 ₽',
    discount: '-37%',
    image: 'https://cdn.poehali.dev/files/key.jpg',
    imageStyle: {
      filter: 'brightness(1.1) contrast(1.2) saturate(1.05)',
      objectPosition: 'center center',
      transform: 'scale(1.3)',
    },
    features: [
      { icon: 'Clock', text: 'Готово за 30 минут' },
      { icon: 'Shield', text: 'Без разбора авто' },
      { icon: 'Key', text: 'Полноценная копия', highlight: true }
    ],
    hasButton: true,
    buttonText: 'Купить',
    buttonLink: '#key-calculator'
  }
];

import SpecialOfferMobile from './SpecialOfferMobile';

interface SpecialOfferDesktopProps {
  selectedCity: City;
}

function SpecialOfferDesktop({ selectedCity }: SpecialOfferDesktopProps) {
  const [currentOffer, setCurrentOffer] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const offer = offers[currentOffer];

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const handlePrev = () => {
    setAutoPlay(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentOffer((prev) => (prev === 0 ? offers.length - 1 : prev - 1));
      setIsTransitioning(false);
    }, 300);
  };

  const handleNext = () => {
    setAutoPlay(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length);
      setIsTransitioning(false);
    }, 300);
  };

  const handleDotClick = (idx: number) => {
    if (idx === currentOffer) return;
    setAutoPlay(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentOffer(idx);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="mb-16 relative">
      <div 
        className="relative rounded-3xl overflow-hidden group"
        style={{
          border: '1px solid rgba(231, 34, 46, 0.25)',
          boxShadow: '0 30px 90px -20px rgba(231, 34, 46, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.005))',
          height: '500px'
        }}
      >
        <div 
          className="absolute top-0 left-0 right-0 h-1 z-20"
          style={{
            background: 'linear-gradient(90deg, #81C4FF 0%, #81C4FF 33.33%, #16588E 33.33%, #16588E 66.66%, #E7222E 66.66%, #E7222E 100%)',
            boxShadow: '0 0 30px rgba(231, 34, 46, 0.8)'
          }}
        />
        
        <div className="flex flex-col lg:flex-row" style={{ height: '500px' }}>
          <div className="lg:w-1/2 relative overflow-hidden bg-black" style={{ height: '500px' }}>
            <img 
              src={offer.image}
              alt={offer.title}
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-500"
              style={{
                ...offer.imageStyle,
                imageRendering: 'crisp-edges',
                opacity: isTransitioning ? 0.3 : 1
              }}
            />
            
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.08) 30%, transparent 60%),
                  linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 40%),
                  linear-gradient(to bottom, transparent 70%, rgba(0, 0, 0, 0.5) 90%, rgba(0, 0, 0, 0.9) 100%)
                `,
                mixBlendMode: 'normal'
              }}
            />
            
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(ellipse 600px 200px at 30% 20%, rgba(255, 255, 255, 0.3), transparent 50%),
                  radial-gradient(ellipse 400px 150px at 70% 30%, rgba(255, 255, 255, 0.2), transparent 50%)
                `,
                mixBlendMode: 'overlay'
              }}
            />
            
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(ellipse at 50% 40%, rgba(231, 34, 46, 0.15), transparent 60%),
                  radial-gradient(ellipse at 30% 60%, rgba(255, 120, 80, 0.1), transparent 50%)
                `,
                mixBlendMode: 'screen',
                opacity: 0.7
              }}
            />
          </div>
          
          <div 
            className="lg:w-1/2 relative p-12 flex flex-col justify-center transition-all duration-500 overflow-y-auto"
            style={{
              height: '500px',
              background: `
                radial-gradient(ellipse at right, rgba(231, 34, 46, 0.15) 0%, transparent 70%),
                radial-gradient(ellipse at center, rgba(231, 34, 46, 0.1) 0%, transparent 60%),
                linear-gradient(135deg, rgba(20, 20, 30, 0.92) 0%, rgba(10, 10, 15, 0.96) 100%)
              `,
              backdropFilter: 'blur(24px) saturate(180%)',
              opacity: isTransitioning ? 0.3 : 1
            }}
          >
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 30%),
                  radial-gradient(circle at 80% 50%, rgba(231, 34, 46, 0.2), transparent 50%)
                `,
                mixBlendMode: 'overlay'
              }}
            />
            
            <div 
              className="absolute inset-0 opacity-50 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 70% 40%, rgba(255, 80, 90, 0.15), transparent 60%)',
                mixBlendMode: 'screen',
                filter: 'blur(40px)'
              }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Icon name={offer.icon as any} className="w-6 h-6 text-[#E7222E]" />
                <span className="text-[#E7222E] text-sm font-light tracking-widest uppercase">{offer.label}</span>
              </div>
              
              <h2 className={offer.id === 4 ? "font-light text-white mb-2 leading-tight text-xl" : "font-light text-white mb-4 leading-tight text-2xl"}>
                {offer.title}
              </h2>
              
              <p className={offer.id === 4 ? "text-white/80 text-base font-light mb-5 leading-relaxed max-w-xl" : "text-white/80 text-lg font-light mb-8 leading-relaxed max-w-xl"}>
                {offer.description}
              </p>
              
              {(offer.oldPrice || offer.newPrice) && (
                <div className={offer.id === 4 ? "flex items-center gap-4 mb-5" : "flex items-center gap-8 mb-8"}>
                  {(offer.oldPrice || offer.newPrice) && (
                    <div>
                      {offer.oldPrice && <span className={offer.id === 4 ? "text-white/40 text-xs line-through block mb-1" : "text-white/40 text-sm line-through block mb-2"}>{offer.oldPrice}</span>}
                      {offer.newPrice && <span className={offer.id === 4 ? "font-light text-[#E7222E] text-xl" : "font-light text-[#E7222E] text-2xl"}>{offer.newPrice}</span>}
                    </div>
                  )}
                  {offer.discount && (
                    <div 
                      className={offer.id === 4 ? "py-2 rounded-xl px-3" : "py-4 rounded-2xl px-[11px]"}
                      style={{
                        background: 'linear-gradient(135deg, rgba(231, 34, 46, 0.9), rgba(231, 34, 46, 0.7))',
                        border: '1px solid rgba(231, 34, 46, 0.5)',
                        boxShadow: '0 10px 40px rgba(231, 34, 46, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <span className={offer.id === 4 ? "text-white text-lg font-medium" : "text-white text-2xl font-medium"}>{offer.discount}</span>
                    </div>
                  )}
                </div>
              )}
              
              <div className={offer.id === 4 ? "flex items-center gap-4 text-xs flex-wrap mb-5" : "flex items-center gap-6 text-sm flex-wrap mb-8"}>
                {offer.features.map((feature, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-2"
                    style={feature.highlight ? {
                      padding: '8px 16px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, rgba(231, 34, 46, 0.2), rgba(231, 34, 46, 0.1))',
                      border: '1px solid rgba(231, 34, 46, 0.4)',
                      boxShadow: '0 4px 20px rgba(231, 34, 46, 0.3)'
                    } : {}}
                  >
                    <Icon 
                      name={feature.icon as any} 
                      className="w-4 h-4"
                      style={{ color: feature.highlight ? '#E7222E' : 'rgba(255, 255, 255, 0.6)' }}
                    />
                    <span style={{ 
                      color: feature.highlight ? '#E7222E' : 'rgba(255, 255, 255, 0.6)',
                      fontWeight: feature.highlight ? '500' : 'normal'
                    }}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {offer.hasButton && (
                <a 
                  href={getTelegramLink(selectedCity, (offer as any).buttonService)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-medium text-white transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, rgba(231, 34, 46, 0.9), rgba(231, 34, 46, 0.7))',
                    border: '1px solid rgba(231, 34, 46, 0.5)',
                    boxShadow: '0 10px 40px rgba(231, 34, 46, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <Icon name={offer.id === 4 ? "Calculator" : "Send"} className="w-5 h-5" />
                  <span>{offer.buttonText}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(231, 34, 46, 0.9), rgba(231, 34, 46, 0.7))',
            border: '1px solid rgba(231, 34, 46, 0.5)',
            boxShadow: '0 10px 30px rgba(231, 34, 46, 0.4)'
          }}
        >
          <Icon name="ChevronLeft" className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(231, 34, 46, 0.9), rgba(231, 34, 46, 0.7))',
            border: '1px solid rgba(231, 34, 46, 0.5)',
            boxShadow: '0 10px 30px rgba(231, 34, 46, 0.4)'
          }}
        >
          <Icon name="ChevronRight" className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex flex-col items-center gap-3 mt-6">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <Icon name="Layers" className="w-4 h-4" />
            <span>{currentOffer + 1} / {offers.length}</span>
          </div>

          <div className="flex gap-3">
            {offers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className="transition-all duration-300"
                style={{
                  width: currentOffer === idx ? '32px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: currentOffer === idx 
                    ? 'linear-gradient(90deg, #E7222E, #FF4444)' 
                    : 'rgba(255, 255, 255, 0.2)',
                  boxShadow: currentOffer === idx ? '0 0 12px rgba(231, 34, 46, 0.6)' : 'none'
                }}
              />
            ))}
          </div>

          {!autoPlay && (
            <button
              onClick={() => setAutoPlay(true)}
              className="flex items-center gap-1.5 text-white/40 text-xs hover:text-white/60 transition-colors"
            >
              <Icon name="Play" className="w-3.5 h-3.5" />
              <span>Авто</span>
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-white/40 text-xs animate-pulse">
          <Icon name="ChevronsRight" className="w-4 h-4" />
          <span>Листайте стрелками для просмотра всех акций</span>
        </div>
      </div>
    </div>
  );
}

interface SpecialOfferProps {
  selectedCity?: City;
}

export default function SpecialOffer({ selectedCity = 'saratov' }: SpecialOfferProps) {
  return (
    <Adaptive
      mobile={<SpecialOfferMobile selectedCity={selectedCity} />}
      desktop={<SpecialOfferDesktop selectedCity={selectedCity} />}
    />
  );
}