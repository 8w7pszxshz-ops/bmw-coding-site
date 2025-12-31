import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { MobileOnly } from '@/components/ui/responsive';

const vibrate = (pattern: number | number[] = 10) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

export default function StickyContactButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside as any);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside as any);
    };
  }, [isExpanded]);

  const handleToggle = () => {
    vibrate(15);
    setIsExpanded(!isExpanded);
  };

  const handleLinkClick = () => {
    vibrate(10);
  };

  return (
    <MobileOnly>
      <div ref={containerRef} className="fixed bottom-6 right-4 z-50">
        {isExpanded && (
          <div className="absolute bottom-16 right-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-2xl p-3 mb-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
            <a 
              href="tel:+79873573338"
              onClick={handleLinkClick}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl transition-all active:scale-95 min-h-[44px]"
            >
              <Icon name="Phone" className="w-5 h-5 text-white" />
              <span className="text-white font-light text-sm whitespace-nowrap">+7 (987) 357-33-38</span>
            </a>
            
            <a 
              href="https://t.me/Bocha_reborn"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl transition-all active:scale-95 min-h-[44px] mt-1"
            >
              <Icon name="Send" className="w-5 h-5 text-white" />
              <span className="text-white font-light text-sm whitespace-nowrap">Telegram</span>
            </a>
          </div>
        )}
        
        <button
          onClick={handleToggle}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 animate-pulse"
          style={{
            boxShadow: '0 8px 32px rgba(59, 130, 246, 0.5)',
            animation: isExpanded ? 'none' : 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        >
          {isExpanded ? (
            <Icon name="X" className="w-6 h-6 text-white" />
          ) : (
            <Icon name="MessageCircle" className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
    </MobileOnly>
  );
}