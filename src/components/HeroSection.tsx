import Icon from '@/components/ui/icon';
import { Adaptive } from '@/components/ui/responsive';

function HeroMobile() {
  return (
    <div className="mb-6 mt-3 px-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-0.5 w-5 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
        <span className="text-[9px] tracking-[0.15em] uppercase font-light">
          <span className="text-[#81C4FF]">Чип-тюнинг</span> <span className="text-white/40">•</span> <span className="text-[#81C4FF]">Кодирование</span>
        </span>
      </div>
      
      <h1 className="text-3xl font-extralight text-white tracking-tight leading-none mb-3" style={{ fontFamily: 'BMW Helvetica, sans-serif' }}>
        REBORN <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">BMW</span>
      </h1>

      <div className="relative overflow-hidden" style={{
        background: 'linear-gradient(160deg, rgba(26, 8, 8, 0.85) 0%, rgba(10, 10, 15, 0.85) 100%)',
        border: '2px solid',
        borderImage: 'linear-gradient(160deg, rgba(255, 0, 0, 0.6) 0%, rgba(0, 212, 255, 0.6) 100%) 1',
        boxShadow: '0 0 25px rgba(127, 106, 127, 0.4), inset 0 0 40px rgba(0, 0, 0, 0.4)',
        clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
        padding: '12px'
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
        <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none" style={{
          background: 'linear-gradient(to bottom right, rgba(255, 0, 0, 0.2), rgba(0, 212, 255, 0.15))',
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)'
        }} />
        <div className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none" style={{
          background: 'linear-gradient(to top left, rgba(0, 212, 255, 0.15), rgba(255, 0, 0, 0.1))',
          clipPath: 'polygon(0 100%, 100% 100%, 0 0)'
        }} />
        <div className="flex items-start gap-2.5 relative z-10">
          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{
            background: '#000000',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)',
            clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))'
          }}>
            <Icon name="ShieldCheck" className="w-4 h-4" style={{ color: '#00d4ff' }} />
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

function HeroDesktop() {
  return (
    <div className="mb-10 mt-6">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="h-0.5 w-8 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
        <span className="text-xs tracking-[0.25em] uppercase font-light">
          <span className="text-[#81C4FF]">Чип-тюнинг</span> <span className="text-white/40">•</span> <span className="text-[#81C4FF]">Кодирование</span> <span className="text-white/40">•</span> <span className="text-[#81C4FF]">Дооснащение</span>
        </span>
      </div>
      
      <div className="flex items-start justify-between gap-10">
        <div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-extralight text-white tracking-tight leading-none mb-8" style={{ fontFamily: 'BMW Helvetica, sans-serif' }}>
            REBORN <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">BMW</span>
          </h1>
        </div>

        <div className="flex-shrink-0 mt-3 -ml-24">
          <div className="relative max-w-[320px] overflow-hidden" style={{
            background: 'linear-gradient(160deg, rgba(26, 8, 8, 0.85) 0%, rgba(10, 10, 15, 0.85) 100%)',
            border: '2px solid',
            borderImage: 'linear-gradient(160deg, rgba(255, 0, 0, 0.6) 0%, rgba(0, 212, 255, 0.6) 100%) 1',
            boxShadow: '0 0 35px rgba(127, 106, 127, 0.4), inset 0 0 50px rgba(0, 0, 0, 0.4)',
            clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
            padding: '20px'
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
            <div className="absolute top-0 right-0 w-12 h-12 pointer-events-none" style={{
              background: 'linear-gradient(to bottom right, rgba(255, 0, 0, 0.25), rgba(0, 212, 255, 0.15))',
              clipPath: 'polygon(100% 0, 100% 100%, 0 0)'
            }} />
            <div className="absolute bottom-0 left-0 w-12 h-12 pointer-events-none" style={{
              background: 'linear-gradient(to top left, rgba(0, 212, 255, 0.15), rgba(255, 0, 0, 0.1))',
              clipPath: 'polygon(0 100%, 100% 100%, 0 0)'
            }} />
            <div className="flex items-start gap-3.5 relative z-10">
              <div className="w-11 h-11 flex items-center justify-center flex-shrink-0" style={{
                background: '#000000',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
                clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
              }}>
                <Icon name="ShieldCheck" className="w-5 h-5" style={{ color: '#00d4ff' }} />
              </div>
              <div>
                <div className="text-white font-medium text-base mb-1 tracking-wide">Без экспериментов</div>
                <div className="text-white/50 text-xs font-light leading-relaxed">
                  Применяем только проверенные решения для вашего BMW
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <Adaptive 
      mobile={<HeroMobile />}
      desktop={<HeroDesktop />}
    />
  );
}