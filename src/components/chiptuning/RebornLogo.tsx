export default function RebornLogo({ className = "h-6" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 whitespace-nowrap ${className}`} style={{ filter: 'drop-shadow(0 2px 6px rgba(231, 34, 46, 0.4))' }}>
      <span 
        className="font-black"
        style={{
          background: 'linear-gradient(90deg, #E7222E 0%, #FF4444 25%, #E7222E 50%, #C51D26 75%, #E7222E 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontFamily: 'Impact, Arial Black, sans-serif',
          fontSize: '1em',
          letterSpacing: '-0.05em'
        }}
      >
        REBORN
      </span>
      <span 
        className="font-light"
        style={{
          background: 'linear-gradient(90deg, #CCCCCC 0%, #FFFFFF 25%, #DDDDDD 50%, #FFFFFF 75%, #CCCCCC 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontSize: '0.75em',
          letterSpacing: '0.2em'
        }}
      >
        TECHNOLOGIES
      </span>
    </div>
  );
}