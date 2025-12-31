import { useState } from 'react';
import Icon from '@/components/ui/icon';

const vibrate = (pattern: number | number[] = 10) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AIChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);

  const handleToggle = () => {
    vibrate(15);
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || !apiKey) return;

    vibrate(10);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/82216dc4-3ce0-4f44-9084-9ce91dba6cbf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessage.text,
          history: messages,
          apiKey: apiKey
        })
      });

      const data = await response.json();

      if (response.ok) {
        vibrate([10, 50, 10]);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(data.error || 'Ошибка');
      }
    } catch (error) {
      vibrate([50, 100, 50]);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Извините, произошла ошибка. Попробуйте позже.',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className="fixed bottom-6 right-4 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl"
        aria-label="AI консультант"
      >
        {isOpen ? (
          <Icon name="X" className="w-6 h-6 text-white" />
        ) : (
          <Icon name="Bot" className="w-6 h-6 text-white" />
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[500px] bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 flex items-center gap-3">
            <Icon name="Bot" className="w-6 h-6 text-white" />
            <div className="flex-1">
              <h3 className="text-white font-semibold">AI Консультант</h3>
              <p className="text-white/80 text-xs">Спросите про ваш автомобиль</p>
            </div>
            {!showApiKeyInput && apiKey && (
              <button
                onClick={() => { vibrate(5); setShowApiKeyInput(true); }}
                className="text-white/60 hover:text-white transition-colors"
                title="Изменить API ключ"
              >
                <Icon name="Settings" className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {showApiKeyInput && (
              <div className="bg-white/5 rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-2">
                  <Icon name="Key" className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium mb-1">API Ключ Google AI</p>
                    <p className="text-gray-400 text-xs mb-3">Получите на <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener" className="text-purple-400 underline">aistudio.google.com</a></p>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="AIzaSy..."
                      className="w-full bg-white/10 text-white placeholder:text-gray-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    />
                    {apiKey && (
                      <button
                        onClick={() => { vibrate(10); setShowApiKeyInput(false); }}
                        className="mt-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm py-2 rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Сохранить
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {messages.length === 0 && !showApiKeyInput && (
              <div className="text-center text-gray-400 mt-8">
                <Icon name="MessageCircle" className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Задайте вопрос о вашем авто</p>
                <p className="text-xs mt-2 opacity-70">Например: "Что такое чип-тюнинг?"</p>
              </div>
            )}
            
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                      : 'bg-white/10 text-white'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-2xl px-4 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ваш вопрос..."
                disabled={isLoading}
                className="flex-1 bg-white/10 text-white placeholder:text-gray-400 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="Send" className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}