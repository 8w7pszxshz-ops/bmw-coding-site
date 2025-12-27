import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const tips = [
  {
    id: 1,
    icon: 'Zap',
    title: 'Система Start/Stop и стартер-генератор',
    description: 'Современные BMW G-серии — это «мягкие гибриды». У них нет классического стартера в привычном понимании; его роль выполняет мощный 48-вольтовый стартер-генератор. С системой Start/Stop данное устройство быстро выходит из строя. Поэтому рекомендуем отключать эту систему.',
    tips: [
      'Отключайте Start/Stop через меню',
      '48V стартер-генератор служит дольше',
      'Экономия на замене дорогого оборудования'
    ]
  },
  {
    id: 2,
    icon: 'Battery',
    title: 'Критическая просадка аккумулятора',
    description: 'Электроника BMW G-серии крайне чувствительна к качеству питания. Просадка аккумулятора ниже критической отметки может привести к следующим последствиям:',
    issues: [
      {
        title: 'Синхронизация ключей',
        text: 'Может нарушиться связь между блоком BDC (кузовная электроника) и DME (двигатель). Машина «забудет» ключи и откажется заводиться, даже когда вы зарядите АКБ.'
      },
      {
        title: 'Сброс инициализации',
        text: '«Слетают» крайние положения люка, стеклоподъемников, рулевой колонки и датчика угла поворота руля. Потребуется сервисная адаптация через диагностику.'
      }
    ]
  }
];

export default function ExpertTips() {
  const [currentTip, setCurrentTip] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const tip = tips[currentTip];

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const handlePrev = () => {
    setAutoPlay(false);
    setCurrentTip((prev) => (prev === 0 ? tips.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setAutoPlay(false);
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const handleDotClick = (idx: number) => {
    setAutoPlay(false);
    setCurrentTip(idx);
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Icon name="Lightbulb" className="w-8 h-8 text-[#FFD700]" />
          <h2 className="font-light text-white text-3xl">Советы бывалых</h2>
        </div>
      </div>

      <div className="relative">
        <div 
          className="relative rounded-3xl overflow-hidden p-12"
          style={{
            border: '1px solid rgba(255, 215, 0, 0.2)',
            boxShadow: '0 30px 90px -20px rgba(255, 215, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.05), rgba(255, 215, 0, 0.02))',
            minHeight: '400px'
          }}
        >
          <div 
            className="absolute top-0 left-0 right-0 h-1 z-20"
            style={{
              background: 'linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)'
            }}
          />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div 
                className="p-4 rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.1))',
                  border: '1px solid rgba(255, 215, 0, 0.3)'
                }}
              >
                <Icon name={tip.icon as any} className="w-8 h-8 text-[#FFD700]" />
              </div>
              <h3 className="font-light text-white text-2xl">{tip.title}</h3>
            </div>

            <p className="text-white/80 text-lg font-light mb-8 leading-relaxed">
              {tip.description}
            </p>

            {tip.tips && (
              <div className="space-y-3">
                {tip.tips.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Icon name="Check" className="w-5 h-5 text-[#FFD700] mt-0.5 flex-shrink-0" />
                    <span className="text-white/70 text-base">{item}</span>
                  </div>
                ))}
              </div>
            )}

            {tip.issues && (
              <div className="space-y-6 mt-6">
                {tip.issues.map((issue, idx) => (
                  <div 
                    key={idx}
                    className="p-6 rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))',
                      border: '1px solid rgba(255, 215, 0, 0.2)'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="AlertTriangle" className="w-5 h-5 text-[#FFD700]" />
                      <h4 className="text-[#FFD700] font-medium">{issue.title}</h4>
                    </div>
                    <p className="text-white/70 text-base leading-relaxed">{issue.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-30"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.15))',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            boxShadow: '0 8px 32px rgba(255, 215, 0, 0.3)'
          }}
        >
          <Icon name="ChevronLeft" className="w-6 h-6 text-[#FFD700]" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-30"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.15))',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            boxShadow: '0 8px 32px rgba(255, 215, 0, 0.3)'
          }}
        >
          <Icon name="ChevronRight" className="w-6 h-6 text-[#FFD700]" />
        </button>

        <div className="flex items-center justify-center gap-3 mt-8">
          {tips.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className="transition-all duration-300"
              style={{
                width: currentTip === idx ? '32px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: currentTip === idx 
                  ? 'linear-gradient(90deg, #FFD700, #FFA500)'
                  : 'rgba(255, 215, 0, 0.3)',
                boxShadow: currentTip === idx ? '0 0 20px rgba(255, 215, 0, 0.5)' : 'none'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
