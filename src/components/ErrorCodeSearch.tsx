import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface ErrorCodeSearchProps {
  onSearch: (code: string) => void;
}

export default function ErrorCodeSearch({ onSearch }: ErrorCodeSearchProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const validateCode = (input: string): boolean => {
    const cleaned = input.toUpperCase().trim();
    
    // P-коды (OBD2): P0XXX, P1XXX, P2XXX, P3XXX
    const pCodePattern = /^P[0-3][0-9A-F]{3}$/;
    
    // BMW-специфичные коды: 4-6 hex символов
    const bmwCodePattern = /^[0-9A-F]{4,6}$/;
    
    return pCodePattern.test(cleaned) || bmwCodePattern.test(cleaned);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleaned = code.toUpperCase().trim();

    if (!cleaned) {
      setError('Введите код ошибки');
      return;
    }

    if (!validateCode(cleaned)) {
      setError('Неверный формат. Примеры: P0171, 30FF, 00457A');
      return;
    }

    onSearch(cleaned);
  };

  const exampleCodes = [
    { code: 'P0171', label: 'Бедная смесь' },
    { code: 'P0300', label: 'Пропуски зажигания' },
    { code: '30FF', label: 'Ошибка DME' },
    { code: '00457A', label: 'Датчик коленвала' }
  ];

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError('');
              }}
              placeholder="Введите код ошибки (P0171, 30FF, 00457A...)"
              className="w-full px-4 py-4 md:px-6 md:py-5 bg-white/5 border-2 border-white/20 rounded-xl text-white text-lg placeholder-white/50 focus:outline-none focus:border-blue-400/50 transition-all"
              style={{
                backdropFilter: 'blur(10px)',
                boxShadow: error ? '0 0 0 2px rgba(239, 68, 68, 0.5)' : 'none'
              }}
            />
            {error && (
              <p className="absolute -bottom-6 left-0 text-red-400 text-sm flex items-center gap-1">
                <Icon name="AlertCircle" className="w-4 h-4" />
                {error}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="px-8 py-5 text-lg font-medium whitespace-nowrap"
            style={{
              background: 'linear-gradient(135deg, #E7222E, #B51820)',
              boxShadow: '0 8px 32px rgba(231, 34, 46, 0.4)'
            }}
          >
            <Icon name="Search" className="w-5 h-5 md:mr-2" />
            <span className="hidden md:inline">Найти</span>
          </Button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2 md:gap-3">
        <span className="text-white/60 text-sm self-center whitespace-nowrap">Примеры:</span>
        {exampleCodes.map((example) => (
          <button
            key={example.code}
            onClick={() => {
              setCode(example.code);
              setError('');
            }}
            className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm text-white/80 hover:text-white transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <span className="font-mono font-bold">{example.code}</span>
            <span className="hidden md:inline text-white/60 ml-2">— {example.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
