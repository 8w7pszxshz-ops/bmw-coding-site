import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import StickyContactButton from '@/components/StickyContactButton';
import Icon from '@/components/ui/icon';
import { City } from '@/components/CitySelector';
import { detectCityByGeolocation } from '@/utils/geolocation';
import { getCityConfig } from '@/utils/cityConfig';
import { updateSeoMeta, injectBreadcrumbSchema, cleanupSchemas } from '@/utils/seo';

const priceCategories = [
  {
    title: 'Чип-тюнинг',
    color: 'rgba(231, 34, 46, 0.25)',
    items: [
      { name: 'Stage 1 (4 цилиндра)', price: 'от 35 000 ₽', desc: 'N20, B48, N13, B38', time: '1-2 часа' },
      { name: 'Stage 1 (6 цилиндров)', price: 'от 40 000 ₽', desc: 'N55, B58, N54, N57, B57', time: '1-3 часа' },
      { name: 'Stage 1 (V8)', price: 'от 50 000 ₽', desc: 'N63, S63', time: '2-4 часа' },
      { name: 'Stage 1 (M-моторы)', price: 'от 55 000 ₽', desc: 'S55, S58', time: '2-4 часа' },
      { name: 'Stage 2', price: 'от 55 000 ₽', desc: 'Требуется даунпайп + впуск', time: '2-4 часа' },
      { name: 'Откат к стоку', price: 'Бесплатно', desc: 'Для наших клиентов', time: '30-60 мин' },
    ]
  },
  {
    title: 'Кодирование',
    color: 'rgba(59, 130, 246, 0.25)',
    items: [
      { name: '1 опция', price: 'от 3 000 ₽', desc: 'Любая одна функция', time: '15-30 мин' },
      { name: 'Пакет 5 опций', price: 'от 10 000 ₽', desc: 'Экономия 5 000 ₽', time: '30-60 мин' },
      { name: 'Пакет 10 опций', price: 'от 15 000 ₽', desc: 'Экономия 15 000 ₽', time: '40-90 мин' },
      { name: 'Максимальный пакет', price: 'от 20 000 ₽', desc: 'Все доступные опции', time: '1-2 часа' },
      { name: 'Восстановление после дилера', price: 'Бесплатно', desc: 'Для наших клиентов', time: '30 мин' },
    ]
  },
  {
    title: 'Изготовление ключей',
    color: 'rgba(168, 85, 247, 0.25)',
    items: [
      { name: 'Ключ BMW серия F', price: 'от 15 000 ₽', desc: 'F10, F20, F25, F30, F15', time: '1-2 часа' },
      { name: 'Ключ BMW серия G', price: 'от 25 000 ₽', desc: 'G20, G30, G05, G01', time: '1-3 часа' },
      { name: 'Digital Key', price: 'от 20 000 ₽', desc: 'Цифровой ключ BMW', time: '1-2 часа' },
      { name: 'Привязка б/у ключа', price: 'от 10 000 ₽', desc: 'Программирование существующего', time: '30-60 мин' },
    ]
  },
  {
    title: 'Отключение экологии',
    color: 'rgba(34, 197, 94, 0.25)',
    items: [
      { name: 'Отключение EGR', price: 'от 15 000 ₽', desc: 'Программное отключение', time: '1-2 часа' },
      { name: 'Удаление DPF', price: 'от 20 000 ₽', desc: 'Программное + физическое', time: '2-4 часа' },
      { name: 'Удаление ADBLUE (SCR)', price: 'от 20 000 ₽', desc: 'Полное отключение системы', time: '2-3 часа' },
      { name: 'Понижение до Евро 2', price: 'от 15 000 ₽', desc: 'Удаление катализаторов из ПО', time: '1-2 часа' },
      { name: 'Комплекс экологии', price: 'от 45 000 ₽', desc: 'EGR + DPF + ADBLUE + Euro 2', time: '3-5 часов' },
    ]
  },
  {
    title: 'Диагностика',
    color: 'rgba(234, 179, 8, 0.25)',
    items: [
      { name: 'Компьютерная диагностика', price: 'от 3 000 ₽', desc: 'Чтение ошибок, параметры', time: '30-60 мин' },
      { name: 'Диагностика перед прошивкой', price: 'Бесплатно', desc: 'При заказе чип-тюнинга', time: '30 мин' },
      { name: 'Расширенная диагностика', price: 'от 5 000 ₽', desc: 'Все системы + рекомендации', time: '1-2 часа' },
    ]
  },
];

export default function PricesPage() {
  const [selectedCity, setSelectedCity] = useState<City>('saratov');
  const [showCityPulse, setShowCityPulse] = useState(false);

  useEffect(() => {
    updateSeoMeta({
      title: 'Цены на чип-тюнинг и кодирование BMW — Reborn BMW',
      description: 'Прайс-лист Reborn BMW: чип-тюнинг от 35 000 ₽, кодирование от 3 000 ₽, изготовление ключей от 15 000 ₽, отключение экологии от 15 000 ₽. Саратов.',
      path: '/prices'
    });
    injectBreadcrumbSchema([
      { name: 'Главная', url: 'https://reborn-bmw.tech/' },
      { name: 'Цены', url: 'https://reborn-bmw.tech/prices' }
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

  return (
    <>
      <StickyContactButton selectedCity={selectedCity} />
      <MainLayout selectedCity={selectedCity} onCityChange={setSelectedCity} showCityPulse={showCityPulse}>
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors mb-6 text-sm">
            <Icon name="ChevronLeft" size={16} />
            <span>На главную</span>
          </Link>

          <h1 className="text-3xl md:text-5xl font-extralight text-white mb-4 leading-tight">
            Цены на услуги <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">Reborn BMW</span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl font-light mb-8 leading-relaxed">
            Прозрачные цены без скрытых доплат. Точная стоимость зависит от модели и двигателя — уточняйте в Telegram.
          </p>

          <div className="space-y-10 mb-12">
            {priceCategories.map((category) => (
              <div key={category.title}>
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4">{category.title}</h2>
                <div className="space-y-2">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl gap-2"
                      style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${category.color}` }}
                    >
                      <div className="flex-1">
                        <h3 className="text-white font-light">{item.name}</h3>
                        <p className="text-white/40 text-xs">{item.desc}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-white/40 text-xs flex items-center gap-1">
                          <Icon name="Clock" size={12} /> {item.time}
                        </span>
                        <span className={`text-lg font-light whitespace-nowrap ${item.price === 'Бесплатно' ? 'text-green-400' : 'text-white'}`}>
                          {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-12 p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-xl font-light text-white mb-3">Важная информация</h2>
            <div className="space-y-2 text-white/60 text-sm font-light leading-relaxed">
              <p>• Указаны минимальные цены. Точная стоимость зависит от модели, двигателя и объёма работ.</p>
              <p>• Диагностика перед прошивкой — бесплатно при заказе чип-тюнинга.</p>
              <p>• Откат к стоковой прошивке — бесплатно для наших клиентов.</p>
              <p>• Оплата после выполнения работы. Принимаем наличные и переводы.</p>
              <p>• Скидки при заказе нескольких услуг.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl mb-12 text-center" style={{ background: 'linear-gradient(135deg, rgba(231, 34, 46, 0.15), rgba(231, 34, 46, 0.05))', border: '1px solid rgba(231, 34, 46, 0.3)' }}>
            <h2 className="text-2xl font-light text-white mb-3">Узнать точную цену</h2>
            <p className="text-white/60 mb-4">Напишите модель и двигатель — рассчитаем стоимость за 5 минут</p>
            <a
              href={config.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white font-medium transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, rgba(231, 34, 46, 0.9), rgba(231, 34, 46, 0.7))', boxShadow: '0 10px 40px rgba(231, 34, 46, 0.4)' }}
            >
              <Icon name="MessageCircle" size={18} />
              Написать в Telegram
            </a>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6">Часто задаваемые вопросы о ценах</h2>
            <div className="space-y-4">
              {[
                { q: 'Почему цены «от»?', a: 'Стоимость зависит от конкретной модели, двигателя и сложности работы. Например, прошивка 4-цилиндрового мотора проще, чем V8. Мы всегда называем точную цену до начала работ.' },
                { q: 'Есть ли скидки?', a: 'Да. При заказе чип-тюнинга + кодирования скидка 10%. При заказе комплекса экологии — скидка на каждую услугу. Постоянным клиентам — индивидуальные условия.' },
                { q: 'Нужна ли предоплата?', a: 'Нет. Оплата только после выполнения работы. Вы платите только когда убедитесь в результате.' },
                { q: 'Что если результат не устроит?', a: 'Мы возвращаем стоковую прошивку бесплатно и не берём денег. Такое случается крайне редко — менее 1% случаев.' },
              ].map((faq, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 className="text-white font-medium mb-2">{faq.q}</h3>
                  <p className="text-white/60 font-light leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-light text-white/50 mb-4">Услуги</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { title: 'Чип-тюнинг', link: '/chip-tuning' },
                { title: 'Кодирование', link: '/coding' },
                { title: 'Ключи BMW', link: '/keys' },
                { title: 'Экология', link: '/ecology' },
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