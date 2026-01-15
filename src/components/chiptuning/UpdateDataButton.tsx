import { useState } from 'react';
import Icon from '@/components/ui/icon';

const API_URL = 'https://functions.poehali.dev/8f9e18f2-51fd-4835-a3a1-c9b410946229';
const ADMIN_PASSWORD = 'bmw2025';

export default function UpdateDataButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setMessage('');
    } else {
      setMessage('Неверный пароль');
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    setMessage('Загрузка данных с reborn.tech...');

    try {
      const response = await fetch(`${API_URL}?limit=50`);
      const data = await response.json();
      
      if (response.ok) {
        setMessage(`✅ Успешно загружено ${data.length} моделей BMW`);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setMessage(`❌ Ошибка: ${data.error || 'Не удалось загрузить данные'}`);
      }
    } catch (error) {
      setMessage(`❌ Ошибка сети: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
        style={{
          background: 'linear-gradient(135deg, #FF0040, #E7222E)',
          boxShadow: '0 4px 20px rgba(255, 0, 64, 0.4)'
        }}
        title="Админ-панель"
      >
        <Icon name="Settings" className="w-6 h-6 text-white" />
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="rounded-2xl p-6 max-w-md w-full"
            style={{
              background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.98), rgba(10, 10, 15, 0.98))',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.8)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Icon name="Shield" className="w-6 h-6 text-[#FF0040]" />
                <h3 className="text-xl font-light text-white">Админ-панель</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <Icon name="X" className="w-5 h-5" />
              </button>
            </div>

            {!isAuthenticated ? (
              <div className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                  placeholder="Введите пароль"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#FF0040]"
                />
                <button
                  onClick={handleAuth}
                  className="w-full py-3 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #FF0040, #E7222E)'
                  }}
                >
                  Войти
                </button>
                {message && <p className="text-red-400 text-sm text-center">{message}</p>}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-white/70 text-sm mb-3">
                    Обновление данных чип-тюнинга с сайта reborn.tech
                  </p>
                  <button
                    onClick={handleUpdate}
                    disabled={isUpdating}
                    className="w-full py-3 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                      background: isUpdating 
                        ? 'linear-gradient(135deg, rgba(255, 0, 64, 0.5), rgba(231, 34, 46, 0.5))'
                        : 'linear-gradient(135deg, #FF0040, #E7222E)'
                    }}
                  >
                    {isUpdating ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                        Обновление...
                      </>
                    ) : (
                      <>
                        <Icon name="RefreshCw" className="w-5 h-5" />
                        Обновить данные
                      </>
                    )}
                  </button>
                </div>

                {message && (
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-white text-sm">{message}</p>
                  </div>
                )}

                <div className="text-white/50 text-xs space-y-1">
                  <p>• Парсинг ~50 моделей BMW</p>
                  <p>• Время выполнения: 1-2 минуты</p>
                  <p>• После обновления страница перезагрузится</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
