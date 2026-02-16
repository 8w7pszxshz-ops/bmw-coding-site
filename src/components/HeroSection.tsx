import { useState, useEffect } from 'react';
import { Adaptive } from '@/components/ui/responsive';

function GlitchText({ text, gradient, className, style }: { text: string; gradient?: boolean; className?: string; style?: React.CSSProperties }) {
  const [showStrobes, setShowStrobes] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStrobes(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (gradient) {
    return (
      <span className={`relative inline-block ${className || ''}`} style={style}>
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {text}
        </span>
      </span>
    );
  }

  const firstLetter = text.charAt(0);
  const rest = text.slice(1);

  return (
    <span className={`relative inline-block ${className || ''}`} style={style}>
      <span className="text-[#ff0033]">{firstLetter}</span>
      <span className={showStrobes ? 'strobe-stencil' : 'strobe-stencil-fade'}>
        {rest}
      </span>
    </span>
  );
}

function HeroMobile() {
  return (
    <div className="mb-4 mt-3 px-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-0.5 w-5 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
        <span className="text-[9px] tracking-[0.15em] uppercase font-light">
          <span className="text-[#81C4FF]">Чип-тюнинг</span> <span className="text-white/40">•</span> <span className="text-[#81C4FF]">Кодирование</span>
        </span>
      </div>
      
      <h1 className="text-[8.5vw] font-medium text-white tracking-tight leading-none whitespace-nowrap">
        <GlitchText text="REBORN" style={{ fontFamily: '"Reborn Technologies", sans-serif' }} />
        {' '}
        <GlitchText text="BMW" gradient style={{ fontFamily: 'BMW Helvetica, sans-serif' }} />
      </h1>
    </div>
  );
}

function HeroDesktop() {
  return (
    <div className="mb-6 mt-6">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="h-0.5 w-8 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
        <span className="text-xs tracking-[0.25em] uppercase font-light">
          <span className="text-[#81C4FF]">Чип-тюнинг</span> <span className="text-white/40">•</span> <span className="text-[#81C4FF]">Кодирование</span> <span className="text-white/40">•</span> <span className="text-[#81C4FF]">Дооснащение</span>
        </span>
      </div>
      
      <h1 className="text-6xl md:text-7xl font-medium text-white tracking-tight leading-none">
        <GlitchText text="REBORN" style={{ fontFamily: '"Reborn Technologies", sans-serif' }} />
        {' '}
        <GlitchText text="BMW" gradient style={{ fontFamily: 'BMW Helvetica, sans-serif' }} />
      </h1>
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