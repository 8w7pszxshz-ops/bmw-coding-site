import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { DesktopOnly } from '@/components/ui/responsive';

const vibrate = (pattern: number | number[] = 10) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

export default function FloatingAIButton() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    vibrate(15);
    navigate('/chatgpt');
  };

  return (
    <DesktopOnly>

      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-8 right-8 z-40 group"
        aria-label="AI Консультант"
      >
        <div className="relative">
          {/* Внешняя пульсирующая подсветка */}
          <div 
            className="absolute -inset-2 rounded-full blur-xl animate-pulse"
            style={{
              background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.7), rgba(6, 182, 212, 0.7))',
              animationDuration: '3s'
            }}
          />
          
          {/* Основная кнопка */}
          <div 
            className="relative flex items-center gap-3 text-white rounded-full transition-all duration-500 group-hover:scale-105 group-active:scale-95"
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(40px)',
              boxShadow: '0 20px 50px -15px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}
          >
            {/* Внутренняя пульсирующая подсветка */}
            <div 
              className="absolute inset-0 rounded-full pointer-events-none animate-pulse"
              style={{
                background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.7), transparent 60%)',
                boxShadow: 'inset 0 0 30px rgba(59, 130, 246, 0.7)',
                animationDuration: '4s',
                animationDelay: '0.5s'
              }}
            />
            
            {/* Усиленное свечение при наведении */}
            <div 
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.5), transparent 70%)',
                boxShadow: 'inset 0 0 40px rgba(59, 130, 246, 0.4)'
              }}
            />
            
            <div className="relative w-14 h-14 flex items-center justify-center">
              <Icon name="Bot" className="w-7 h-7" />
            </div>
            
            {/* Текст при наведении */}
            <div
              className={`relative overflow-hidden transition-all duration-300 ${
                isHovered ? 'max-w-[180px] pr-5' : 'max-w-0'
              }`}
            >
              <span className="whitespace-nowrap text-sm font-light tracking-wide">
                AI Консультант
              </span>
            </div>
          </div>

          {/* Индикатор "online" */}
          <div className="absolute -top-1 -right-1 flex items-center justify-center">
            <div 
              className="absolute w-3 h-3 rounded-full border-2 border-black/80 animate-ping"
              style={{
                background: 'rgb(74, 222, 128)',
                animationDuration: '2s'
              }}
            />
            <div 
              className="relative w-3 h-3 rounded-full border-2 border-black/80"
              style={{
                background: 'rgb(74, 222, 128)',
                boxShadow: '0 0 8px rgba(74, 222, 128, 0.7)'
              }}
            />
          </div>
        </div>
      </button>
    </DesktopOnly>
  );
}