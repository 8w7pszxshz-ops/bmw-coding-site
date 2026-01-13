import { useState } from 'react';
import Icon from '@/components/ui/icon';

const vibrate = (pattern: number | number[] = 10) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

export default function ApiIntegration() {
  const [copiedCode, setCopiedCode] = useState(false);

  const integrationCode = `<!-- BMW Coding Integration -->
<div id="bmw-coding-widget"></div>
<script>
  (function() {
    const widget = document.getElementById('bmw-coding-widget');
    const iframe = document.createElement('iframe');
    iframe.src = 'https://preview--bmw-coding-site.poehali.dev/widget';
    iframe.style.width = '100%';
    iframe.style.height = '600px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '12px';
    widget.appendChild(iframe);
  })();
</script>`;

  const handleCopy = () => {
    vibrate(15);
    navigator.clipboard.writeText(integrationCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-full mb-4">
              <Icon name="Code" className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">Для разработчиков</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              API Интеграция
            </h2>
            <p className="text-gray-400 text-lg">
              Встройте наши услуги на свой сайт за 2 минуты
            </p>
          </div>

          <div 
            className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
            style={{
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.1)'
            }}
          >
            <div 
              className="absolute top-0 left-0 right-0"
              style={{
                height: '2px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.4) 20%, rgba(6, 182, 212, 0.8) 50%, rgba(59, 130, 246, 0.4) 80%, transparent 100%)',
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
              }}
            />
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" style={{ mixBlendMode: 'screen' }}>
              <defs>
                <pattern id="api-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                  <circle cx="15" cy="15" r="1" fill="rgba(59, 130, 246, 0.5)">
                    <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" />
                  </circle>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#api-pattern)" />
            </svg>
            <div className="relative p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Icon name="Terminal" className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Custom Build Widget</h3>
                    <p className="text-gray-400 text-sm">Скопируйте код и вставьте на свой сайт</p>
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all active:scale-95"
                >
                  <Icon name={copiedCode ? "Check" : "Copy"} className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {copiedCode ? "Скопировано!" : "Копировать"}
                  </span>
                </button>
              </div>
            </div>

            <div className="relative p-6 bg-gray-950/50">
              <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
                <code>{integrationCode}</code>
              </pre>
            </div>

            <div className="relative p-6 border-t border-white/10">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="Zap" className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium mb-1">Быстрая установка</div>
                    <div className="text-gray-400 text-xs">Вставьте код в HTML</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="Sparkles" className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium mb-1">Автообновление</div>
                    <div className="text-gray-400 text-xs">Всегда актуальная версия</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="Smartphone" className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium mb-1">Адаптивность</div>
                    <div className="text-gray-400 text-xs">Работает на всех устройствах</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <div className="flex items-start gap-3">
              <Icon name="Info" className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-white text-sm font-medium mb-1">Нужна кастомизация?</div>
                <div className="text-gray-400 text-sm">
                  Свяжитесь с нами для настройки внешнего вида виджета под ваш бренд
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}