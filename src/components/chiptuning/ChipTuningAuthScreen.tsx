import Icon from '@/components/ui/icon';

interface ChipTuningAuthScreenProps {
  password: string;
  setPassword: (password: string) => void;
  handleAuth: () => void;
  authError: string;
}

export default function ChipTuningAuthScreen({
  password,
  setPassword,
  handleAuth,
  authError
}: ChipTuningAuthScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, rgba(10, 10, 15, 0.98), rgba(20, 20, 30, 0.98))'
      }}
    >
      <div className="w-full max-w-md p-8 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.98), rgba(10, 10, 15, 0.98))',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 30px 80px -20px rgba(0, 0, 0, 0.8)'
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Icon name="Shield" className="w-8 h-8 text-[#FF0040]" />
          <h1 className="text-2xl font-light text-white">Админка Чип-тюнинга</h1>
        </div>

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
          {authError && <p className="text-red-400 text-sm text-center">{authError}</p>}
        </div>
      </div>
    </div>
  );
}
