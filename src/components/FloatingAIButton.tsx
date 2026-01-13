import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

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
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="AI Консультант"
    >
      <div className="relative">
        {/* Пульсирующий эффект */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/40 to-cyan-400/40 rounded-full animate-pulse opacity-60 blur-xl" />
        
        {/* Основная кнопка - стиль как у сайта */}
        <div className="relative flex items-center gap-3 bg-gradient-to-br from-blue-600/90 to-cyan-600/90 backdrop-blur-xl text-white rounded-full shadow-[0_0_25px_rgba(59,130,246,0.3)] border border-blue-400/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] hover:scale-105 hover:border-blue-400/50">
          <div className="w-16 h-16 flex items-center justify-center">
            <Icon name="Bot" className="w-8 h-8" />
          </div>
          
          {/* Текст при наведении */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isHovered ? 'max-w-[200px] pr-6' : 'max-w-0'
            }`}
          >
            <span className="whitespace-nowrap text-sm font-light tracking-wide">
              AI Консультант BMW
            </span>
          </div>
        </div>

        {/* Индикатор "online" */}
        <div className="absolute top-0 right-0 flex items-center justify-center">
          <div className="absolute w-5 h-5 bg-green-400/40 rounded-full animate-ping" />
          <div className="relative w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-black/80 shadow-[0_0_10px_rgba(74,222,128,0.6)]" />
        </div>
      </div>
    </button>
  );
}