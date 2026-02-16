import Icon from '@/components/ui/icon';
import { Adaptive } from '@/components/ui/responsive';

function BannerMobile() {
  return (
    <div className="px-4 mb-6">
      <div className="relative overflow-hidden" style={{
        background: 'linear-gradient(160deg, rgba(26, 8, 8, 0.85) 0%, rgba(10, 10, 15, 0.85) 100%)',
        border: '2px solid',
        borderImage: 'linear-gradient(160deg, rgba(255, 0, 0, 0.6) 0%, rgba(0, 212, 255, 0.6) 100%) 1',
        boxShadow: '0 0 25px rgba(127, 106, 127, 0.4), inset 0 0 40px rgba(0, 0, 0, 0.4)',
        clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
        padding: '14px 16px'
      }}>
        <div className="absolute top-0 left-0 right-0" style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 0, 0, 0.5) 20%, rgba(127, 106, 127, 0.8) 50%, rgba(0, 212, 255, 0.5) 80%, transparent 100%)',
          boxShadow: '0 0 20px rgba(127, 106, 127, 0.6)'
        }} />
        <div className="absolute bottom-0 left-0 right-0" style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 0, 0, 0.3) 30%, rgba(0, 212, 255, 0.3) 70%, transparent 100%)',
          boxShadow: '0 0 10px rgba(127, 106, 127, 0.3)'
        }} />
        <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none" style={{
          background: 'linear-gradient(to bottom right, rgba(255, 0, 0, 0.2), rgba(0, 212, 255, 0.15))',
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)'
        }} />
        <div className="absolute bottom-0 left-0 w-10 h-10 pointer-events-none" style={{
          background: 'linear-gradient(to top left, rgba(0, 212, 255, 0.15), rgba(255, 0, 0, 0.1))',
          clipPath: 'polygon(0 100%, 100% 100%, 0 0)'
        }} />
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-9 h-9 flex items-center justify-center flex-shrink-0" style={{
            background: '#000000',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)',
            clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))'
          }}>
            <Icon name="ShieldCheck" className="w-4.5 h-4.5" style={{ color: '#00d4ff' }} />
          </div>
          <div>
            <div className="text-white font-medium text-sm tracking-wide">Без экспериментов</div>
            <div className="text-white/50 text-[11px] font-light leading-relaxed">
              Только проверенные решения для вашего BMW
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BannerDesktop() {
  return (
    <div className="mb-10">
      <div className="relative overflow-hidden" style={{
        background: 'linear-gradient(160deg, rgba(26, 8, 8, 0.85) 0%, rgba(10, 10, 15, 0.85) 100%)',
        border: '2px solid',
        borderImage: 'linear-gradient(160deg, rgba(255, 0, 0, 0.6) 0%, rgba(0, 212, 255, 0.6) 100%) 1',
        boxShadow: '0 0 35px rgba(127, 106, 127, 0.4), inset 0 0 50px rgba(0, 0, 0, 0.4)',
        clipPath: 'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))',
        padding: '20px 28px'
      }}>
        <div className="absolute top-0 left-0 right-0" style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 0, 0, 0.5) 20%, rgba(127, 106, 127, 0.8) 50%, rgba(0, 212, 255, 0.5) 80%, transparent 100%)',
          boxShadow: '0 0 25px rgba(127, 106, 127, 0.6)'
        }} />
        <div className="absolute bottom-0 left-0 right-0" style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 0, 0, 0.3) 30%, rgba(0, 212, 255, 0.3) 70%, transparent 100%)',
          boxShadow: '0 0 12px rgba(127, 106, 127, 0.3)'
        }} />
        <div className="absolute top-0 right-0 w-14 h-14 pointer-events-none" style={{
          background: 'linear-gradient(to bottom right, rgba(255, 0, 0, 0.25), rgba(0, 212, 255, 0.15))',
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)'
        }} />
        <div className="absolute bottom-0 left-0 w-14 h-14 pointer-events-none" style={{
          background: 'linear-gradient(to top left, rgba(0, 212, 255, 0.15), rgba(255, 0, 0, 0.1))',
          clipPath: 'polygon(0 100%, 100% 100%, 0 0)'
        }} />
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0" style={{
            background: '#000000',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
            clipPath: 'polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))'
          }}>
            <Icon name="ShieldCheck" className="w-6 h-6" style={{ color: '#00d4ff' }} />
          </div>
          <div>
            <div className="text-white font-medium text-lg tracking-wide mb-0.5">Без экспериментов</div>
            <div className="text-white/50 text-sm font-light leading-relaxed">
              Применяем только проверенные решения для вашего BMW. Без тестов на вашем автомобиле.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrustBanner() {
  return (
    <Adaptive
      mobile={<BannerMobile />}
      desktop={<BannerDesktop />}
    />
  );
}
