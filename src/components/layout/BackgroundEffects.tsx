export default function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(0, 150, 255, 0.14), transparent)',
          top: '10%',
          left: '15%',
          animationDuration: '8s'
        }}
      />
      <div 
        className="absolute w-80 h-80 rounded-full blur-3xl animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(100, 200, 255, 0.105), transparent)',
          bottom: '15%',
          right: '20%',
          animationDuration: '10s',
          animationDelay: '2s'
        }}
      />
      <div 
        className="absolute w-64 h-64 rounded-full blur-3xl animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(50, 180, 255, 0.126), transparent)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animationDuration: '12s',
          animationDelay: '4s'
        }}
      />
    </div>
  );
}