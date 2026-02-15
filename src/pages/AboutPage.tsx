import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import StickyContactButton from '@/components/StickyContactButton';
import BurgerMenu from '@/components/BurgerMenu';
import Icon from '@/components/ui/icon';
import { City } from '@/components/CitySelector';
import { detectCityByGeolocation } from '@/utils/geolocation';
import { getCityConfig } from '@/utils/cityConfig';
import { updateSeoMeta, injectBreadcrumbSchema, cleanupSchemas } from '@/utils/seo';

export default function AboutPage() {
  const [selectedCity, setSelectedCity] = useState<City>('saratov');
  const [showCityPulse, setShowCityPulse] = useState(false);

  useEffect(() => {
    updateSeoMeta({
      title: 'О компании Reborn BMW — чип-тюнинг и кодирование BMW в Саратове',
      description: 'Reborn BMW — профессиональный чип-тюнинг и кодирование BMW в Саратове. Опыт работы с BMW более 5 лет. Более 500 прошитых автомобилей.',
      path: '/about'
    });
    injectBreadcrumbSchema([
      { name: 'Главная', url: 'https://reborn-bmw.tech/' },
      { name: 'О компании', url: 'https://reborn-bmw.tech/about' }
    ]);

    const initCity = async () => {
      const result = await detectCityByGeolocation();
      if (result.detected && result.city) {
        setSelectedCity(result.city);
      } else {
        setShowCityPulse(true);
        setTimeout(() => setShowCityPulse(false), 5000);
      }
    };
    initCity();

    return () => { cleanupSchemas(); };
  }, []);

  const config = getCityConfig(selectedCity);

  const stats = [
    { value: '500+', label: 'Прошитых автомобилей' },
    { value: '5+', label: 'Лет опыта' },
    { value: '100%', label: 'Довольных клиентов' },
    { value: '0', label: 'Сгоревших двигателей' },
  ];

  const advantages = [
    { icon: 'Shield', title: 'Безопасность', desc: 'Используем только проверенные калибровки. Диагностика двигателя перед каждой прошивкой. Не прошиваем больные моторы.' },
    { icon: 'Undo2', title: 'Откат к стоку', desc: 'Сохраняем оригинальную прошивку и можем вернуть её в любой момент.' },
    { icon: 'Cpu', title: 'Профессиональное оборудование', desc: 'Работаем на лицензионном ПО BMW (ISTA, E-Sys). Прошивки от проверенных калибровщиков с мировым именем.' },
    { icon: 'UserCheck', title: 'Индивидуальный подход', desc: 'Калибровка под каждый конкретный автомобиль с учётом пробега, состояния двигателя и пожеланий владельца.' },
    { icon: 'Clock', title: 'Быстро', desc: 'Чип-тюнинг за 1-3 часа. Кодирование за 30-60 минут. Не нужно оставлять автомобиль — работаем при вас.' },
    { icon: 'CreditCard', title: 'Оплата по факту', desc: 'Никакой предоплаты. Платите только после выполнения работы, когда убедитесь в результате.' },
  ];

  return (
    <>
      <StickyContactButton selectedCity={selectedCity} />
      <BurgerMenu />
      <MainLayout selectedCity={selectedCity} onCityChange={setSelectedCity} showCityPulse={showCityPulse}>
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors mb-6 text-sm">
            <Icon name="ChevronLeft" size={16} />
            <span>На главную</span>
          </Link>

          <h1 className="text-3xl md:text-5xl font-extralight text-white mb-4 leading-tight">
            О компании <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">Reborn BMW</span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl font-light mb-8 leading-relaxed">
            Профессиональный чип-тюнинг и кодирование BMW в Саратове. 
            Работаем только с BMW — знаем каждый двигатель и каждую модель.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(231, 34, 46, 0.2)' }}>
                <div className="text-3xl md:text-4xl font-extralight text-white mb-1">{stat.value}</div>
                <div className="text-white/40 text-xs">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6">Наша специализация</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Reborn BMW — это команда специалистов, которая работает исключительно с автомобилями BMW. 
              Мы не распыляемся на другие марки, потому что верим: лучше быть экспертом в одном деле, 
              чем посредственностью во многих.
            </p>
            <p className="text-white/60 leading-relaxed mb-4">
              Наш опыт охватывает все поколения BMW — от классических E-серий до новейших G и U. 
              Мы знаем особенности каждого двигателя, каждой коробки передач, каждого электронного блока.
            </p>
            <p className="text-white/60 leading-relaxed">
              За более чем 5 лет работы мы прошили более 500 автомобилей BMW и ни один двигатель 
              не пострадал. Это наш главный показатель качества.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6">Почему выбирают нас</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {advantages.map((adv) => (
                <div key={adv.title} className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name={adv.icon} className="w-5 h-5 text-red-400" />
                    <h3 className="text-white font-light text-lg">{adv.title}</h3>
                  </div>
                  <p className="text-white/50 text-sm font-light leading-relaxed">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6">Наши услуги</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Чип-тюнинг BMW', desc: 'Stage 1, Stage 2, Stage 3. Увеличение мощности от 20% до 60%. Все двигатели — бензин и дизель.', link: '/chip-tuning', icon: 'Zap' },
                { title: 'Кодирование BMW', desc: 'Активация скрытых функций: Apple CarPlay, видео в движении, отключение Start/Stop и ещё 100+ опций.', link: '/coding', icon: 'Code' },
                { title: 'Изготовление ключей', desc: 'Программирование новых ключей для серий F, G, U. Запасные ключи, Digital Key, привязка б/у.', link: '/keys', icon: 'Key' },
                { title: 'Отключение экологии', desc: 'EGR, DPF, ADBLUE, SCR, понижение до Евро 2. Программное и физическое удаление.', link: '/ecology', icon: 'Leaf' },
              ].map((service) => (
                <Link
                  key={service.link}
                  to={service.link}
                  className="p-5 rounded-2xl transition-all hover:scale-[1.02]"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name={service.icon} className="w-5 h-5 text-red-400" />
                    <h3 className="text-white font-light text-lg">{service.title}</h3>
                  </div>
                  <p className="text-white/50 text-sm font-light leading-relaxed">{service.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6">Как мы работаем</h2>
            <div className="space-y-3">
              {[
                { step: '01', text: 'Вы пишете нам в Telegram — описываете модель BMW и желаемую услугу' },
                { step: '02', text: 'Мы рассчитываем стоимость и называем точный результат (мощность, опции)' },
                { step: '03', text: 'Вы приезжаете — мы проводим бесплатную диагностику' },
                { step: '04', text: 'Выполняем работу при вас — чип-тюнинг, кодирование или другие услуги' },
                { step: '05', text: 'Проверяем результат вместе — вы платите только когда довольны' },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-4 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="text-red-400/40 text-2xl font-light w-10">{item.step}</span>
                  <span className="text-white/80 font-light">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl mb-12 text-center" style={{ background: 'linear-gradient(135deg, rgba(231, 34, 46, 0.15), rgba(231, 34, 46, 0.05))', border: '1px solid rgba(231, 34, 46, 0.3)' }}>
            <h2 className="text-2xl font-light text-white mb-3">Связаться с нами</h2>
            <p className="text-white/60 mb-4">Ответим на любые вопросы о вашем BMW</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={config.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-white font-medium transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, rgba(231, 34, 46, 0.9), rgba(231, 34, 46, 0.7))', boxShadow: '0 10px 40px rgba(231, 34, 46, 0.4)' }}
              >
                <Icon name="MessageCircle" size={18} />
                Telegram
              </a>
              <a
                href={`tel:${config.phone}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-white font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                <Icon name="Phone" size={18} />
                {config.displayPhone}
              </a>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6">Часто задаваемые вопросы</h2>
            <div className="space-y-4">
              {[
                { q: 'Где вы находитесь?', a: 'Мы работаем в Саратове. Точный адрес сообщаем при записи. Также возможен выезд к клиенту при наличии доступа к электричеству и укрытия от осадков.' },
                { q: 'Работаете ли вы с другими марками?', a: 'Нет, только BMW. Это позволяет нам быть настоящими экспертами и обеспечивать высокое качество работы.' },
                { q: 'Нужно ли записываться заранее?', a: 'Да, рекомендуем записаться за 1-2 дня. Пишите в Telegram — подберём удобное время.' },
                { q: 'Можно ли вернуть стоковую прошивку?', a: 'Да. Возврат к стоковой прошивке — бесплатно и навсегда. Если что-то не устроит — вернём как было без вопросов.' },
              ].map((faq, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 className="text-white font-medium mb-2">{faq.q}</h3>
                  <p className="text-white/60 font-light leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { title: 'Чип-тюнинг', link: '/chip-tuning' },
                { title: 'Кодирование', link: '/coding' },
                { title: 'Цены', link: '/prices' },
                { title: 'Коды ошибок', link: '/error-codes' },
              ].map((s) => (
                <Link
                  key={s.link}
                  to={s.link}
                  className="p-4 rounded-xl text-center transition-all hover:scale-[1.02]"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <span className="text-white font-light text-sm">{s.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}