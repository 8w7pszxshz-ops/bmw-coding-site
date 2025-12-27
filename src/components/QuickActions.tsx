import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const quickActions = [
  { id: 'call', icon: 'Phone', label: 'Позвонить' },
  { id: 'whatsapp', icon: 'MessageCircle', label: 'WhatsApp' },
  { id: 'location', icon: 'MapPin', label: 'Адрес' },
  { id: 'time', icon: 'Clock', label: 'Режим' }
];

export default function QuickActions() {
  return (
    <>
      <Card
        className="border-0 overflow-hidden max-w-4xl mx-auto"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02))',
          backdropFilter: 'blur(30px)',
          boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
        }}
      >
        <CardContent className="p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => (
              <button
                key={action.id}
                className="group flex flex-col items-center gap-4 p-6 rounded-2xl transition-all duration-300 hover:scale-[1.05]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, rgba(100, 200, 255, 0.2), rgba(0, 150, 255, 0.1))',
                    boxShadow: '0 10px 30px -10px rgba(100, 200, 255, 0.3)'
                  }}
                >
                  <Icon 
                    name={action.icon as any}
                    className="w-7 h-7 text-blue-400"
                  />
                </div>
                <span className="text-sm text-white/60 font-light">{action.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="max-w-4xl mx-auto mt-12 text-center">
        <p className="text-white/30 text-sm font-light mb-6">
          © 2024 REBORN BMW. Профессиональное программирование автомобилей BMW
        </p>
        
        <div className="flex items-center justify-center gap-6">
          <a 
            href="https://t.me/Bocha_reborn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-blue-400 transition-colors duration-300"
          >
            <Icon name="Send" className="w-5 h-5" />
          </a>
          <a 
            href="tel:+79999999999"
            className="text-white/40 hover:text-blue-400 transition-colors duration-300"
          >
            <Icon name="Phone" className="w-5 h-5" />
          </a>
          <a 
            href="https://wa.me/79999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-blue-400 transition-colors duration-300"
          >
            <Icon name="MessageCircle" className="w-5 h-5" />
          </a>
        </div>
      </div>
    </>
  );
}
