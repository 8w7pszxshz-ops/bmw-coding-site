interface BMWKeyIconProps {
  className?: string;
  color?: string;
}

export default function BMWKeyIcon({ className = "w-7 h-7", color = "#E7222E" }: BMWKeyIconProps) {
  return (
    <svg 
      viewBox="0 0 48 48" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Корпус ключа */}
      <path
        d="M14 12C14 9.79086 15.7909 8 18 8H38C40.2091 8 42 9.79086 42 12V36C42 38.2091 40.2091 40 38 40H18C15.7909 40 14 38.2091 14 36V12Z"
        fill="url(#keyGradient)"
        stroke="currentColor"
        strokeWidth="1.5"
        style={{ color }}
      />
      
      {/* Металлическая вставка сверху */}
      <path
        d="M16 12C16 10.8954 16.8954 10 18 10H24C25.1046 10 26 10.8954 26 12V14C26 15.1046 25.1046 16 24 16H18C16.8954 16 16 15.1046 16 14V12Z"
        fill="url(#metalGradient)"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.9"
        style={{ color }}
      />
      
      {/* BMW лого (круг) */}
      <circle 
        cx="28" 
        cy="24" 
        r="6" 
        fill="url(#logoGradient)"
        stroke="currentColor"
        strokeWidth="1.5"
        style={{ color }}
      />
      
      {/* M-Sport полоски */}
      <rect x="16" y="36" width="6" height="3" rx="0.5" fill="#81C4FF" />
      <rect x="22" y="36" width="6" height="3" rx="0.5" fill="#E7222E" />
      <rect x="28" y="36" width="8" height="3" rx="0.5" fill="url(#darkGradient)" opacity="0.6" />
      
      {/* Кнопки на ключе */}
      <circle cx="20" cy="22" r="2" fill="currentColor" opacity="0.3" style={{ color }} />
      <circle cx="20" cy="30" r="2" fill="currentColor" opacity="0.3" style={{ color }} />
      <circle cx="36" cy="26" r="2" fill="currentColor" opacity="0.3" style={{ color }} />
      
      {/* Детали корпуса */}
      <path
        d="M14 18L10 20V28L14 30"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="url(#sideGradient)"
        style={{ color }}
      />
      
      <defs>
        <linearGradient id="keyGradient" x1="14" y1="8" x2="42" y2="40">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="50%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
        
        <linearGradient id="metalGradient" x1="16" y1="10" x2="26" y2="16">
          <stop offset="0%" stopColor="#c0c0c0" />
          <stop offset="50%" stopColor="#909090" />
          <stop offset="100%" stopColor="#707070" />
        </linearGradient>
        
        <linearGradient id="logoGradient" x1="22" y1="18" x2="34" y2="30">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#d0d0d0" />
        </linearGradient>
        
        <linearGradient id="sideGradient" x1="10" y1="20" x2="14" y2="30">
          <stop offset="0%" stopColor="#808080" />
          <stop offset="100%" stopColor="#505050" />
        </linearGradient>
        
        <linearGradient id="darkGradient" x1="28" y1="36" x2="36" y2="39">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>
    </svg>
  );
}
