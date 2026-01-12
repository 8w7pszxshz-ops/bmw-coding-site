import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { MobileOnly } from '@/components/ui/responsive';

const menuItems = [
  { id: 'services', label: 'Услуги', icon: 'Wrench' },
  { id: 'chiptuning', label: 'Чип-тюнинг', icon: 'Zap' },
  { id: 'tips', label: 'Рекомендации', icon: 'Lightbulb' },
  { id: 'offers', label: 'Акции', icon: 'Tag' },
  { id: 'reviews', label: 'Отзывы', icon: 'Star' },
  { id: 'packages', label: 'Пакеты', icon: 'Package' },
  { id: 'api', label: 'API Интеграция', icon: 'Code' },
  { id: 'contact', label: 'Контакты', icon: 'MapPin' },
];

const vibrate = (pattern: number | number[] = 10) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    vibrate(15);
    setIsOpen(!isOpen);
  };

  const scrollToSection = (id: string) => {
    vibrate(10);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <MobileOnly>
      <button
        onClick={handleToggle}
        className="fixed top-4 right-4 z-[60] w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/90 to-cyan-500/90 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg"
        aria-label="Меню"
      >
        {isOpen ? (
          <Icon name="X" className="w-5 h-5 text-white" />
        ) : (
          <Icon name="Menu" className="w-5 h-5 text-white" />
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55]"
            onClick={() => { vibrate(5); setIsOpen(false); }}
          />
          
          <div className="fixed top-20 right-4 z-[58] bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="p-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-xl transition-all active:scale-95 min-h-[44px]"
                >
                  <Icon name={item.icon} className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-light text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </MobileOnly>
  );
}