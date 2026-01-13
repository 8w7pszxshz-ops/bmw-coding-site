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
          {/* Пульсирующий эффект */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-2xl"
            style={{
              animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}
          />
          
          {/* Основная кнопка */}
          <div className="relative flex items-center gap-3 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-full shadow-[0_8px_32px_rgba(59,130,246,0.4)] border border-blue-400/20 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(59,130,246,0.6)] hover:scale-105 hover:border-blue-400/40 active:scale-95">
            <div className="w-14 h-14 flex items-center justify-center">
              <Icon name="Bot" className="w-7 h-7" />
            </div>
            
            {/* Текст при наведении */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
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
            <div className="absolute w-4 h-4 bg-green-400/50 rounded-full animate-ping" />
            <div className="relative w-3 h-3 bg-green-400 rounded-full border-2 border-black shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
          </div>
        </div>
      </button>
    </DesktopOnly>
  );
}