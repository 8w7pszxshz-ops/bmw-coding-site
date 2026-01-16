export default function RebornLogo({ className = "h-6" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`} style={{ filter: 'drop-shadow(0 2px 6px rgba(231, 34, 46, 0.4))' }}>
      <div 
        className="font-black tracking-tighter text-2xl"
        style={{
          background: 'linear-gradient(90deg, #E7222E 0%, #FF4444 25%, #E7222E 50%, #C51D26 75%, #E7222E 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontFamily: 'Impact, Arial Black, sans-serif',
          letterSpacing: '-1px'
        }}
      >
        REBORN
      </div>
      <div 
        className="font-light tracking-widest text-lg"
        style={{
          background: 'linear-gradient(90deg, #CCCCCC 0%, #FFFFFF 25%, #DDDDDD 50%, #FFFFFF 75%, #CCCCCC 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontFamily: 'Arial, Helvetica, sans-serif',
          letterSpacing: '4px'
        }}
      >
        TECHNOLOGIES
      </div>
    </div>
  );
}