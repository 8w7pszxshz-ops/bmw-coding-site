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
        <header className="border-b border-primary/20 backdrop-blur-sm bg-black/50">
          <div className="container mx-auto px-4 py-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="https://cdn.poehali.dev/files/reborn.jpg" 
                alt="Reborn Technologies" 
                className="h-16 w-auto object-contain"
              />
              <div className="hidden sm:block border-l border-primary/30 h-12 mx-2" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold neon-glow">BMW CODING</h1>
                <p className="text-xs md:text-sm text-muted-foreground">Профессиональная работа с электроникой BMW</p>
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
            <h2 className="text-5xl md:text-7xl font-bold mb-6 neon-glow">
              МАКСИМУМ ОТ ВАШЕГО BMW
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
              Профессиональное кодирование, дооснащение и обслуживание автомобилей BMW
            </p>
            <p className="text-lg text-accent cyan-glow">
              Раскройте потенциал вашего автомобиля
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card
                key={service.id}
                className="bg-card/50 backdrop-blur-md border-primary/20 hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 border border-primary/30 group-hover:animate-glow">
                    <Icon name={service.icon as any} className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white group-hover:neon-glow transition-all">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
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
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-md border-primary/30 neon-border">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 neon-glow">
                ГОТОВЫ МОДЕРНИЗИРОВАТЬ ВАШ BMW?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Свяжитесь с нами для консультации и записи на обслуживание. 
                Работаем со всеми моделями BMW.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/80 text-white font-bold neon-border text-lg px-8">
                  <Icon name="MessageCircle" className="w-5 h-5 mr-2" />
                  Написать в WhatsApp
                </Button>
                <Button size="lg" variant="outline" className="border-accent/50 hover:bg-accent/10 text-white font-bold text-lg px-8">
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