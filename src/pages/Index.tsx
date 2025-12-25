import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const services = [
  {
    id: 'coding',
    title: 'Кодирование',
    description: 'Активация скрытых функций BMW через программное обеспечение',
    icon: 'Code2',
    features: ['Складывание зеркал', 'Комфортное открывание', 'Видео в движении', 'Настройка приборной панели']
  },
  {
    id: 'equipment',
    title: 'Дооснащение',
    description: 'Установка дополнительного оборудования и модернизация',
    icon: 'Cog',
    features: ['Камеры кругового обзора', 'Парктроники', 'Мультимедиа системы', 'LED оптика']
  },
  {
    id: 'russian',
    title: 'Русификация',
    description: 'Полная локализация интерфейса на русский язык',
    icon: 'Languages',
    features: ['Меню на русском', 'Голосовое управление', 'Навигация', 'Приборная панель']
  },
  {
    id: 'maps',
    title: 'Навигация',
    description: 'Обновление карт и навигационного ПО до последних версий',
    icon: 'Map',
    features: ['Актуальные карты РФ', 'Обновление ПО', 'Пробки онлайн', 'Точки интереса']
  },
  {
    id: 'keys',
    title: 'Изготовление ключей',
    description: 'Программирование и изготовление дополнительных ключей',
    icon: 'Key',
    features: ['Запасной ключ', 'Comfort Access', 'Display Key', 'Восстановление ключей']
  }
];

export default function Index() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div 
        className="fixed inset-0 opacity-20 grid-pattern"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/projects/892585f1-24a2-432b-810c-dd69d2686659/files/0c398184-5bec-469d-8396-999c18e132c4.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3)'
        }}
      />
      
      <div className="relative z-10">
        <header className="border-b border-primary/20 backdrop-blur-sm bg-black/80">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/30 transition-all" />
                <img 
                  src="https://cdn.poehali.dev/files/reborn.jpg" 
                  alt="Reborn Technologies" 
                  className="h-20 md:h-24 w-auto object-contain relative z-10 drop-shadow-[0_0_15px_rgba(220,0,0,0.5)]"
                />
              </div>
              <div className="hidden lg:block">
                <h1 className="text-3xl font-bold text-white tracking-wide">BMW CODING</h1>
                <p className="text-sm text-muted-foreground">Профессиональная работа с электроникой BMW</p>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/80 text-white font-bold neon-border animate-glow">
              <Icon name="Phone" className="w-4 h-4 mr-2" />
              Связаться
            </Button>
          </div>
        </header>

        <section className="container mx-auto px-4 py-20 text-center">
          <div className="animate-slide-in">
            <div className="inline-block bg-primary/10 border border-primary/30 rounded-full px-6 py-2 mb-6">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider">
                ⚡ Активируем за 1 час то, что BMW скрыл в вашем авто
              </p>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 neon-glow leading-tight">
              +10 СКРЫТЫХ ФУНКЦИЙ<br/>БЕЗ ВИЗИТА В ДИЛЕР
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-3xl mx-auto">
              Складывание зеркал, видео в движении, русское меню — всё это уже есть в вашем BMW. 
              Просто заблокировано заводом.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-4">
              <div className="flex items-center gap-2 text-accent">
                <Icon name="CheckCircle2" className="w-5 h-5" />
                <span className="font-semibold">Гарантия на работу</span>
              </div>
              <div className="flex items-center gap-2 text-accent">
                <Icon name="Shield" className="w-5 h-5" />
                <span className="font-semibold">Без потери гарантии BMW</span>
              </div>
            </div>
            <p className="text-lg text-primary font-bold">
              🎁 При заказе сегодня — диагностика всех систем БЕСПЛАТНО (обычно 3000₽)
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card
                key={service.id}
                className="bg-card/80 backdrop-blur-md border-primary/10 hover:border-primary/30 transition-all cursor-pointer group relative overflow-hidden premium-shadow hover:scale-[1.02]"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <CardHeader>
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center mb-4 border border-primary/20 group-hover:border-primary/40 transition-all">
                    <Icon name={service.icon as any} className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white transition-all">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className={`space-y-2 transition-all ${selectedService === service.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <p className="text-sm font-semibold text-accent mb-2">Возможности:</p>
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-neon-pulse" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-primary/30 hover:bg-primary/10 hover:border-primary text-white"
                  >
                    <Icon name="ArrowRight" className="w-4 h-4 mr-2" />
                    {selectedService === service.id ? 'Скрыть детали' : 'Подробнее'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <Card className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-md border-primary/20 premium-shadow">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                ГОТОВЫ МОДЕРНИЗИРОВАТЬ ВАШ BMW?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Свяжитесь с нами для консультации и записи на обслуживание. 
                Работаем со всеми моделями BMW.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-10 py-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                  <Icon name="MessageCircle" className="w-5 h-5 mr-2" />
                  Написать в WhatsApp
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-primary/30 hover:bg-primary/5 hover:border-primary/50 text-white font-bold text-lg px-10 py-6 transition-all">
                  <Icon name="Phone" className="w-5 h-5 mr-2" />
                  Позвонить
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <footer className="border-t border-primary/20 backdrop-blur-sm bg-black/50 mt-20">
          <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
            <p className="text-sm">© 2024 BMW Coding. Профессиональная работа с электроникой BMW</p>
            <div className="flex justify-center gap-6 mt-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Instagram" className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Icon name="Youtube" className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Icon name="Mail" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}