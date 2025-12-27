import Icon from '@/components/ui/icon';

export default function HeroSection() {
  return (
    <div className="mb-16 mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
        <span className="text-white/40 text-xs tracking-[0.3em] uppercase font-light">Чип-тюнинг • Кодирование • Дооснащение</span>
      </div>
      
      <h1 className="text-6xl md:text-8xl font-extralight text-white tracking-tight leading-none mb-4" style={{ fontFamily: 'BMW Helvetica, sans-serif' }}>
        REBORN
        <br />
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          BMW
        </span>
      </h1>
      
      <p className="text-xl text-white/50 font-light max-w-2xl mb-12">
        Профессиональное программирование и активация скрытых функций
      </p>
    </div>
  );
}
