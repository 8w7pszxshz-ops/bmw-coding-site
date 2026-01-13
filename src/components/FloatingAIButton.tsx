import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function FloatingAIButton() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={() => navigate('/chatgpt')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-40 group"
      aria-label="AI Консультант"
    >
      <div className="relative">
        {/* Пульсирующий эффект */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse opacity-75 blur-lg" />
        
        {/* Основная кнопка */}
        <div className="relative flex items-center gap-3 bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-full shadow-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-110">
          <div className="w-14 h-14 flex items-center justify-center">
            <Icon name="Bot" className="w-7 h-7" />
          </div>
          
          {/* Текст при наведении */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isHovered ? 'max-w-[200px] pr-5' : 'max-w-0'
            }`}
          >
            <span className="whitespace-nowrap text-sm font-medium">
              AI Консультант BMW
            </span>
          </div>
        </div>

        {/* Индикатор "online" */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse" />
      </div>
    </button>
  );
}
