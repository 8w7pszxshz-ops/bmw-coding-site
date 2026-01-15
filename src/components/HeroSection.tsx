import Icon from '@/components/ui/icon';
import { Adaptive } from '@/components/ui/responsive';

function HeroMobile() {
  return (
    <div className="mb-6 mt-3 px-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-0.5 w-5 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
        <span className="text-[8px] tracking-[0.15em] uppercase font-light">
          <span className="text-[#81C4FF]">Чип-тюнинг</span> <span className="text-white/40">•</span> <span className="text-[#81C4FF]">Кодирование</span>
        </span>
      </div>
      
      <h1 className="text-3xl font-extralight text-white tracking-tight leading-none mb-1.5" style={{ fontFamily: 'BMW Helvetica, sans-serif' }}>
        REBORN
        <br />
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          BMW
        </span>
      </h1>
      
      <p className="text-xs text-white/70 font-light mb-3">
        Профессиональное программирование
      </p>

      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 rounded-lg p-3 backdrop-blur-sm">
        <div className="flex items-start gap-2">
          <Icon name="ShieldCheck" className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-white/90 font-light text-xs mb-0.5">Без экспериментов</div>
            <div className="text-white/75 text-[10px] font-light leading-relaxed">
              Только рабочие решения
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
        <span className="text-[10px] tracking-[0.25em] uppercase font-light">
          <span className="text-[#81C4FF]">Чип-тюнинг</span> <span className="text-white/40">•</span> <span className="text-[#81C4FF]">Кодирование</span> <span className="text-white/40">•</span> <span className="text-[#81C4FF]">Дооснащение</span>
        </span>
      </div>
      
      <div className="flex items-start justify-between gap-10">
        <div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-extralight text-white tracking-tight leading-none mb-3" style={{ fontFamily: 'BMW Helvetica, sans-serif' }}>
            REBORN
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              BMW
            </span>
          </h1>
          
          <p className="text-base text-white/70 font-light max-w-xl mb-8">
            Профессиональное программирование и активация скрытых функций
          </p>
        </div>

        <div className="flex-shrink-0 mt-3 -ml-24">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 rounded-lg p-5 backdrop-blur-sm max-w-[280px]">
            <div className="flex items-start gap-3">
              <Icon name="ShieldCheck" className="w-7 h-7 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white/90 font-light text-sm mb-1.5">Без экспериментов</div>
                <div className="text-white/75 text-xs font-light leading-relaxed">
                  Применяем только рабочие решения
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