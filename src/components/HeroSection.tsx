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

      <div className="relative rounded-xl p-3 backdrop-blur-sm overflow-hidden" style={{
        background: 'linear-gradient(160deg, rgba(220, 30, 40, 0.18) 0%, rgba(180, 20, 30, 0.12) 45%, rgba(0, 100, 255, 0.12) 55%, rgba(0, 160, 255, 0.18) 100%)',
        border: '1px solid',
        borderImage: 'linear-gradient(160deg, rgba(220, 40, 50, 0.5) 0%, rgba(120, 30, 140, 0.3) 50%, rgba(0, 150, 255, 0.5) 100%) 1',
        boxShadow: '0 0 25px rgba(220, 30, 40, 0.12), 0 0 25px rgba(0, 120, 255, 0.12), inset 0 1px 0 rgba(255,255,255,0.05)'
      }}>
        <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, rgba(220, 40, 50, 0.6), rgba(180, 80, 200, 0.4), rgba(60, 140, 255, 0.6))' }} />
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(160deg, rgba(220, 40, 50, 0.2), rgba(0, 120, 255, 0.2))', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <Icon name="ShieldCheck" className="w-4 h-4 text-white/90" />
          </div>
          <div>
            <div className="text-white font-medium text-sm tracking-wide">Без экспериментов</div>
            <div className="text-white/60 text-[11px] font-light leading-relaxed">
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
          <div className="relative rounded-xl p-5 backdrop-blur-sm max-w-[300px] overflow-hidden" style={{
            background: 'linear-gradient(160deg, rgba(220, 30, 40, 0.18) 0%, rgba(180, 20, 30, 0.12) 45%, rgba(0, 100, 255, 0.12) 55%, rgba(0, 160, 255, 0.18) 100%)',
            border: '1px solid',
            borderImage: 'linear-gradient(160deg, rgba(220, 40, 50, 0.5) 0%, rgba(120, 30, 140, 0.3) 50%, rgba(0, 150, 255, 0.5) 100%) 1',
            boxShadow: '0 0 30px rgba(220, 30, 40, 0.12), 0 0 30px rgba(0, 120, 255, 0.12), inset 0 1px 0 rgba(255,255,255,0.05)'
          }}>
            <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, rgba(220, 40, 50, 0.6), rgba(180, 80, 200, 0.4), rgba(60, 140, 255, 0.6))' }} />
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(160deg, rgba(220, 40, 50, 0.2), rgba(0, 120, 255, 0.2))', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                <Icon name="ShieldCheck" className="w-5 h-5 text-white/90" />
              </div>
              <div>
                <div className="text-white font-medium text-base mb-1 tracking-wide">Без экспериментов</div>
                <div className="text-white/60 text-xs font-light leading-relaxed">
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