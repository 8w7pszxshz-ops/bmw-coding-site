export default function RebornLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-1.5 whitespace-nowrap ${className}`} style={{ filter: 'drop-shadow(0 2px 6px rgba(231, 34, 46, 0.4))' }}>
      <span 
        className="font-black text-base"
        style={{
          background: 'linear-gradient(90deg, #E7222E 0%, #FF4444 25%, #E7222E 50%, #C51D26 75%, #E7222E 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontFamily: 'Impact, Arial Black, sans-serif',
          letterSpacing: '-0.03em'
        }}
      >
        REBORN
      </span>
      <span 
        className="font-light text-[10px]"
        style={{
          background: 'linear-gradient(90deg, #CCCCCC 0%, #FFFFFF 25%, #DDDDDD 50%, #FFFFFF 75%, #CCCCCC 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontFamily: 'Arial, Helvetica, sans-serif',
          letterSpacing: '0.25em'
        }}
      >
        TECHNOLOGIES
      </span>
    </div>
  );
}