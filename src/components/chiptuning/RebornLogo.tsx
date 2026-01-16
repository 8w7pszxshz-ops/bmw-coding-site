export default function RebornLogo({ className = "h-6" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 800 120" className="w-full h-full" style={{ filter: 'drop-shadow(0 2px 8px rgba(231, 34, 46, 0.3))' }}>
        <defs>
          <linearGradient id="rebornGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#E7222E', stopOpacity: 1 }} />
            <stop offset="25%" style={{ stopColor: '#FF4444', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#E7222E', stopOpacity: 1 }} />
            <stop offset="75%" style={{ stopColor: '#C51D26', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#E7222E', stopOpacity: 1 }} />
          </linearGradient>
          
          <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#CCCCCC', stopOpacity: 1 }} />
            <stop offset="25%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#DDDDDD', stopOpacity: 1 }} />
            <stop offset="75%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#CCCCCC', stopOpacity: 1 }} />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#glow)">
          <path
            d="M 40 30 L 60 30 L 75 45 L 75 30 L 95 30 L 95 90 L 75 90 L 75 60 L 60 75 L 80 75 L 60 90 L 40 90 L 60 60 L 40 60 Z"
            fill="url(#rebornGradient)"
            style={{ 
              fontFamily: 'Impact, Arial Black, sans-serif',
              fontWeight: 900,
              letterSpacing: '-2px'
            }}
          />
          
          <text
            x="110"
            y="75"
            fill="url(#rebornGradient)"
            style={{
              fontFamily: 'Impact, Arial Black, sans-serif',
              fontSize: '56px',
              fontWeight: 900,
              letterSpacing: '-2px',
              textTransform: 'uppercase'
            }}
          >
            REBORN
          </text>

          <text
            x="380"
            y="75"
            fill="url(#techGradient)"
            style={{
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontSize: '40px',
              fontWeight: 300,
              letterSpacing: '8px',
              textTransform: 'uppercase'
            }}
          >
            TECHNOLOGIES
          </text>
        </g>
      </svg>
    </div>
  );
}
