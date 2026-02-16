import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Adaptive } from '@/components/ui/responsive';

function GlitchTitle({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const [glitching, setGlitching] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setGlitching(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <h1 className={`relative select-none ${className || ''}`} style={style}>
      <span className="relative inline-block">
        <span className={glitching ? 'hero-glitch' : ''} data-text="REBORN">REBORN</span>
      </span>
      {' '}
      <span className="relative inline-block">
        <span
          className={`bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent ${glitching ? 'hero-glitch-blue' : ''}`}
          data-text="BMW"
        >
          BMW
        </span>
      </span>
    </h1>
  );
}

function OfferCard({ mobile }: { mobile?: boolean }) {
  const size = mobile
    ? { pad: '12px', clip: 12, icon: 'w-8 h-8', iconClip: 5, iconInner: 'w-4 h-4', titleClass: 'text-sm', descClass: 'text-[11px]', cornerSize: 'w-8 h-8', cornerLg: 'w-8 h-8' }
    : { pad: '20px', clip: 16, icon: 'w-11 h-11', iconClip: 6, iconInner: 'w-5 h-5', titleClass: 'text-base mb-1', descClass: 'text-xs', cornerSize: 'w-12 h-12', cornerLg: 'w-12 h-12' };

  return (
    <div className="relative overflow-hidden" style={{
      background: 'linear-gradient(160deg, rgba(26, 8, 8, 0.85) 0%, rgba(10, 10, 15, 0.85) 100%)',
      border: '2px solid',
      borderImage: 'linear-gradient(160deg, rgba(255, 0, 0, 0.6) 0%, rgba(0, 212, 255, 0.6) 100%) 1',
      boxShadow: '0 0 25px rgba(127, 106, 127, 0.4), inset 0 0 40px rgba(0, 0, 0, 0.4)',
      clipPath: `polygon(0 0, calc(100% - ${size.clip}px) 0, 100% ${size.clip}px, 100% 100%, ${size.clip}px 100%, 0 calc(100% - ${size.clip}px))`,
      padding: size.pad
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
      <div className={`absolute top-0 right-0 ${size.cornerSize} pointer-events-none`} style={{
        background: 'linear-gradient(to bottom right, rgba(255, 0, 0, 0.2), rgba(0, 212, 255, 0.15))',
        clipPath: 'polygon(100% 0, 100% 100%, 0 0)'
      }} />
      <div className={`absolute bottom-0 left-0 ${size.cornerLg} pointer-events-none`} style={{
        background: 'linear-gradient(to top left, rgba(0, 212, 255, 0.15), rgba(255, 0, 0, 0.1))',
        clipPath: 'polygon(0 100%, 100% 100%, 0 0)'
      }} />
      <div className="flex items-start gap-2.5 relative z-10">
        <div className={`${size.icon} flex items-center justify-center flex-shrink-0`} style={{
          background: '#000000',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)',
          clipPath: `polygon(0 0, calc(100% - ${size.iconClip}px) 0, 100% ${size.iconClip}px, 100% 100%, ${size.iconClip}px 100%, 0 calc(100% - ${size.iconClip}px))`
        }}>
          <Icon name="ShieldCheck" className={size.iconInner} style={{ color: '#00d4ff' }} />
        </div>
        <div>
          <div className={`text-white font-medium tracking-wide ${size.titleClass}`}>Без экспериментов</div>
          <div className={`text-white/50 font-light leading-relaxed ${size.descClass}`}>
            {mobile ? 'Только проверенные решения для вашего BMW' : 'Применяем только проверенные решения для вашего BMW'}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScrollIndicator() {
  return (
    <button
      onClick={() => {
        const el = document.getElementById('offers');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors z-20"
    >
      <span className="text-[10px] tracking-widest uppercase">Листай</span>
      <Icon name="ChevronDown" className="w-5 h-5 animate-bounce" />
    </button>
  );
}

function HeroMobile() {
  return (
    <div className="relative flex flex-col justify-center min-h-[85vh] px-4 -mt-4 -mx-4 mb-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn.poehali.dev/files/reborn.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.25) contrast(1.1) saturate(0.8)' }}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0.95) 100%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 30% 40%, rgba(255, 0, 0, 0.06), transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(0, 150, 255, 0.06), transparent 60%)'
        }} />
      </div>

      <div className="relative z-10 mt-auto mb-16">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-0.5 w-5 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
          <span className="text-[9px] tracking-[0.15em] uppercase font-light">
            <span className="text-[#81C4FF]">Чип-тюнинг</span> <span className="text-white/40">•</span> <span className="text-[#81C4FF]">Кодирование</span>
          </span>
        </div>

        <GlitchTitle
          className="text-4xl font-extralight text-white tracking-tight leading-none mb-4"
          style={{ fontFamily: 'BMW Helvetica, sans-serif' }}
        />

        <OfferCard mobile />
      </div>

      <ScrollIndicator />
    </div>
  );
}

function HeroDesktop() {
  return (
    <div className="relative flex flex-col justify-center min-h-[90vh] -mt-6 -mx-6 mb-10 overflow-hidden rounded-2xl">
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn.poehali.dev/files/reborn.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.2) contrast(1.15) saturate(0.7)' }}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.95) 100%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 25% 45%, rgba(255, 0, 0, 0.07), transparent 50%), radial-gradient(ellipse at 75% 55%, rgba(0, 150, 255, 0.07), transparent 50%)'
        }} />
      </div>

      <div className="relative z-10 px-12 mt-auto mb-20">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="h-0.5 w-8 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
          <span className="text-xs tracking-[0.25em] uppercase font-light">
            <span className="text-[#81C4FF]">Чип-тюнинг</span> <span className="text-white/40">•</span> <span className="text-[#81C4FF]">Кодирование</span> <span className="text-white/40">•</span> <span className="text-[#81C4FF]">Дооснащение</span>
          </span>
        </div>

        <div className="flex items-end justify-between gap-10">
          <div>
            <GlitchTitle
              className="text-6xl md:text-7xl lg:text-8xl font-extralight text-white tracking-tight leading-none mb-0"
              style={{ fontFamily: 'BMW Helvetica, sans-serif' }}
            />
          </div>
          <div className="flex-shrink-0 max-w-[320px] mb-1">
            <OfferCard />
          </div>
        </div>
      </div>

      <ScrollIndicator />
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
