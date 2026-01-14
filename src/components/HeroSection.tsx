import Icon from '@/components/ui/icon';
import { Adaptive } from '@/components/ui/responsive';

function HeroMobile() {
  return (
    <div className="mb-8 mt-4 px-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-0.5 w-6 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
        <span className="text-[9px] tracking-[0.15em] uppercase font-light">
          <span className="text-[#81C4FF]">Чип-тюнинг</span> <span className="text-white/40">•</span> <span className="text-[#81C4FF]">Кодирование</span>
        </span>
      </div>
      
      <h1 className="text-4xl font-extralight text-white tracking-tight leading-none mb-2" style={{ fontFamily: 'BMW Helvetica, sans-serif' }}>
        REBORN
        <br />
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          BMW
        </span>
      </h1>
      
      <p className="text-sm text-white/70 font-light mb-4">
        Профессиональное программирование
      </p>

      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-start gap-2">
          <Icon name="ShieldCheck" className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-white/90 font-light text-sm mb-0.5">Без экспериментов</div>
            <div className="text-white/75 text-xs font-light leading-relaxed">
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
    <div className="mb-16 mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
        <span className="text-xs tracking-[0.3em] uppercase font-light">
          <span className="text-[#81C4FF]">Чип-тюнинг</span> <span className="text-white/40">•</span> <span className="text-[#81C4FF]">Кодирование</span> <span className="text-white/40">•</span> <span className="text-[#81C4FF]">Дооснащение</span>
        </span>
      </div>
      
      <div className="flex items-start justify-between gap-12">
        <div className="flex-1">
          <h1 className="text-6xl md:text-8xl font-extralight text-white tracking-tight leading-none mb-4" style={{ fontFamily: 'BMW Helvetica, sans-serif' }}>
            REBORN
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              BMW
            </span>
          </h1>
          
          <p className="text-xl text-white/70 font-light max-w-2xl mb-12">
            Профессиональное программирование и активация скрытых функций
          </p>
        </div>

        <div className="flex-shrink-0 mt-4 -ml-32">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 rounded-xl p-7 backdrop-blur-sm max-w-[360px]">
            <div className="flex items-start gap-4">
              <Icon name="ShieldCheck" className="w-9 h-9 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white/90 font-light text-lg mb-2">Без экспериментов</div>
                <div className="text-white/75 text-lg font-light leading-relaxed">
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