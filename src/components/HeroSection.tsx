import Icon from '@/components/ui/icon';
import { Adaptive } from '@/components/ui/responsive';

function HeroMobile() {
  return (
    <div className="mb-12 mt-6 px-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-0.5 w-8 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
        <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase font-light">Чип-тюнинг • Кодирование</span>
      </div>
      
      <h1 className="text-5xl font-extralight text-white tracking-tight leading-none mb-3" style={{ fontFamily: 'BMW Helvetica, sans-serif' }}>
        REBORN
        <br />
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          BMW
        </span>
      </h1>
      
      <p className="text-base text-white/70 font-light mb-6">
        Профессиональное программирование и активация скрытых функций
      </p>

      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 rounded-lg p-5 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <Icon name="ShieldCheck" className="w-7 h-7 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-white/90 font-light text-base mb-1">Без экспериментов</div>
            <div className="text-white/75 text-sm font-light leading-relaxed">
              Применяем только рабочие решения
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
        <span className="text-white/40 text-xs tracking-[0.3em] uppercase font-light">Чип-тюнинг • Кодирование • Дооснащение</span>
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