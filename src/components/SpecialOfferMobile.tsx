import { useState } from 'react';
import Icon from '@/components/ui/icon';
import ScrollIndicator from '@/components/ScrollIndicator';

const offers = [
  {
    id: 1,
    icon: 'Map',
    title: 'Российские карты',
    description: 'Смена навигации за 1 час. Настройка и активация включены.',
    oldPrice: '35 000 ₽',
    newPrice: '25 000 ₽',
    discount: '-29%',
    image: 'https://cdn.poehali.dev/files/mgu1.jpg',
    features: [
      { icon: 'Clock', text: '1 час' },
      { icon: 'Shield', text: 'Гарантия' },
      { icon: 'Gift', text: 'CarPlay' }
    ]
  },
  {
    id: 2,
    icon: 'AlertTriangle',
    title: 'Удаление ошибки вызова',
    description: 'Программное удаление без замены блока',
    oldPrice: '20 000 ₽',
    newPrice: '5 000 ₽',
    discount: '-75%',
    image: 'https://cdn.poehali.dev/files/KOnOQJrG2OG-A3IbwfD2C7UUxm4-1920.jpg',
    features: [
      { icon: 'Clock', text: '30 мин' },
      { icon: 'Shield', text: 'Гарантия' },
      { icon: 'Check', text: 'Без ремонта' }
    ]
  },
  {
    id: 3,
    icon: 'Cpu',
    title: 'Unlock блока двигателя',
    description: 'Разблокировка DME/DDE для BMW 2020+. Прямая логистика собственным курьером.',
    oldPrice: '',
    newPrice: '',
    discount: '',
    image: 'https://cdn.poehali.dev/files/MDG1.jpg',
    features: [
      { icon: 'Clock', text: '3-5 дней' },
      { icon: 'Shield', text: 'Гарантия' },
      { icon: 'Truck', text: 'Курьер' }
    ],
    hasButton: true,
    buttonText: 'Записаться',
    buttonLink: 'https://t.me/Bocha_reborn'
  },
  {
    id: 4,
    icon: 'Key',
    title: 'Новый ключ BMW за 25 000 ₽',
    description: 'За 30 минут без разбора авто. Полноценная копия для G-серии',
    oldPrice: '40 000 ₽',
    newPrice: '25 000 ₽',
    discount: '-37%',
    image: 'https://cdn.poehali.dev/files/key.jpg',
    features: [
      { icon: 'Clock', text: '30 минут' },
      { icon: 'Shield', text: 'Без разбора' },
      { icon: 'Key', text: 'Копия' }
    ],
    hasButton: true,
    buttonText: 'Калькулятор',
    buttonLink: '#key-calculator'
  }
];

export default function SpecialOfferMobile() {
  const [currentOffer] = useState(0);

  return (
    <div className="mb-12">
      <div className="overflow-x-auto scrollbar-hide -mx-4 snap-x snap-mandatory" id="offers-scroll">
        <div className="flex gap-4 px-4 pb-2">
          {offers.map((offer) => (
            <div 
              key={offer.id}
              className="flex-shrink-0 snap-center rounded-2xl overflow-hidden"
              style={{
                minWidth: '300px',
                width: '300px',
                border: '1px solid rgba(231, 34, 46, 0.25)',
                boxShadow: '0 20px 50px -20px rgba(231, 34, 46, 0.4)',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.005))'
              }}
            >
              <div 
                className="h-0.5"
                style={{
                  background: 'linear-gradient(90deg, #81C4FF 0%, #16588E 50%, #E7222E 100%)',
                  boxShadow: '0 0 20px rgba(231, 34, 46, 0.6)'
                }}
              />
              
              <div className="relative h-40 overflow-hidden bg-black">
                <img 
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                  style={{
                    filter: 'brightness(1.2) contrast(1.2)',
                    objectPosition: 'center'
                  }}
                />
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 30%, rgba(0, 0, 0, 0.6) 100%)'
                  }}
                />
              </div>
              
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name={offer.icon as any} className="w-5 h-5 text-[#E7222E]" />
                  <h3 className="font-light text-white text-base">{offer.title}</h3>
                </div>
                
                <p className="text-white/70 text-xs font-light mb-4 leading-relaxed">
                  {offer.description}
                </p>
                
                {!offer.hasButton && (
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-white/40 text-xs line-through">{offer.oldPrice}</span>
                      <span className="font-light text-[#E7222E] text-lg">{offer.newPrice}</span>
                    </div>
                    {offer.discount && (
                      <div 
                        className="px-3 py-1 rounded-lg"
                        style={{
                          background: 'linear-gradient(135deg, rgba(231, 34, 46, 0.9), rgba(231, 34, 46, 0.7))',
                          boxShadow: '0 4px 20px rgba(231, 34, 46, 0.3)'
                        }}
                      >
                        <span className="text-white text-sm font-medium">{offer.discount}</span>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex items-center gap-3 text-xs mb-4">
                  {offer.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <Icon 
                        name={feature.icon as any} 
                        className="w-3 h-3 text-white/60"
                      />
                      <span className="text-white/60">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {offer.hasButton && (
                  <a 
                    href={offer.buttonLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg font-medium text-white text-sm transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(231, 34, 46, 0.9), rgba(231, 34, 46, 0.7))',
                      boxShadow: '0 8px 24px rgba(231, 34, 46, 0.4)'
                    }}
                  >
                    <Icon name="Send" className="w-4 h-4" />
                    <span>{offer.buttonText}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 mt-4">
        <ScrollIndicator totalItems={offers.length} color="#E7222E" />
        <div className="flex items-center gap-2 text-white/50 text-xs animate-pulse">
          <Icon name="ChevronsRight" className="w-4 h-4" />
          <span>Листайте для просмотра всех акций</span>
        </div>
      </div>
    </div>
  );
}