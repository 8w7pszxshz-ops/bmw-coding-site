import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import StickyContactButton from '@/components/StickyContactButton';
import Icon from '@/components/ui/icon';
import { City } from '@/components/CitySelector';
import { detectCityByGeolocation } from '@/utils/geolocation';
import { getCityConfig } from '@/utils/cityConfig';
import { updateSeoMeta, injectServiceSchema, injectBreadcrumbSchema, cleanupSchemas } from '@/utils/seo';

export default function KeysPage() {
  const [selectedCity, setSelectedCity] = useState<City>('saratov');
  const [showCityPulse, setShowCityPulse] = useState(false);

  useEffect(() => {
    updateSeoMeta({
      title: 'Изготовление ключей BMW — Программирование и копия | Reborn BMW',
      description: 'Изготовление и программирование ключей BMW: серии F, G, U. Копия ключа, дилерский ключ. Привязка к автомобилю. Саратов, Москва.',
      path: '/keys'
    });
    injectBreadcrumbSchema([
      { name: 'Главная', url: 'https://reborn-bmw.tech/' },
      { name: 'Ключи BMW', url: 'https://reborn-bmw.tech/keys' }
    ]);
    injectServiceSchema({ name: 'Изготовление ключей BMW', description: 'Программирование и изготовление ключей BMW серий F, G, U.', path: '/keys' });

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
            Изготовление ключей <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">BMW</span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl font-light mb-8 leading-relaxed">
            Изготовление, программирование и привязка ключей BMW всех поколений. 
            Копия или дилерский ключ с полной интеграцией в систему автомобиля.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              { series: 'Серия F', desc: 'F10, F20, F25, F30, F15 и другие. Ключи с чипом, несколько позиций на выбор.', price: 'от 15 000 ₽' },
              { series: 'Серия G', desc: 'G20, G30, G05 и другие. Копия или дилерский ключ. Дистанционный запуск двигателя.', price: 'от 25 000 ₽' },
              { series: 'Серия U', desc: 'Новейшие модели BMW. Программирование ключей последнего поколения.', price: 'от 50 000 ₽' }
            ].map((item) => (
              <div
                key={item.series}
                className="p-6 rounded-2xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.95) 0%, rgba(10, 10, 15, 0.98) 100%)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.8), transparent)' }} />
                <h3 className="text-white text-xl font-light mb-2">{item.series}</h3>
                <p className="text-white/60 text-sm mb-3 leading-relaxed">{item.desc}</p>
                <div className="text-white/80 text-lg font-light">{item.price}</div>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6">Типы ключей BMW</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="Key" className="w-6 h-6 text-amber-400" />
                  <h3 className="text-white text-xl font-light">Копия ключа</h3>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">
                  Делается копия вашего ключа с сохранением его номера. Полностью функциональный — открытие/закрытие, запуск двигателя, иммобилайзер. 
                  Идеально как запасной ключ или для второго водителя.
                </p>
              </div>
              <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="Award" className="w-6 h-6 text-amber-400" />
                  <h3 className="text-white text-xl font-light">Дилерский ключ</h3>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">
                  Новый ключ BMW с присвоением собственного номера в системе автомобиля. Полный набор функций: дистанционное управление, 
                  комфортный доступ, дисплей на ключе (для серии G). Неотличим от заводского.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6">Когда нужен новый ключ</h2>
            <div className="space-y-3">
              {[
                'Потеря или кража ключа',
                'Нужен запасной ключ',
                'Ключ перестал работать или повреждён',
                'Покупка автомобиля с одним ключом',
                'Ключ для второго водителя (жена, семья)',
                'Ключ для установки сигнализации с автозапуском'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <Icon name="Check" className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-white/80 font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6">Часто задаваемые вопросы</h2>
            <div className="space-y-4">
              {[
                { q: 'Сколько времени занимает изготовление ключа?', a: 'От 1 до 3 часов в зависимости от серии автомобиля. Серия F — быстрее всего, серия U — дольше из-за новой системы шифрования.' },
                { q: 'Нужно ли пригонять автомобиль?', a: 'Да, автомобиль нужен для привязки ключа к иммобилайзеру. Процедура проводится через OBD-порт.' },
                { q: 'Будут ли работать старые ключи?', a: 'Да, все существующие ключи продолжат работать. Новый ключ добавляется в систему как дополнительный.' },
                { q: 'Можно ли удалить потерянный ключ из системы?', a: 'Да, мы можем удалить утерянный ключ из памяти иммобилайзера, чтобы им нельзя было воспользоваться.' }
              ].map((faq, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 className="text-white font-medium mb-2">{faq.q}</h3>
                  <p className="text-white/60 font-light leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl mb-12 text-center" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05))', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            <h2 className="text-2xl font-light text-white mb-3">Рассчитать стоимость ключа</h2>
            <p className="text-white/60 mb-4">Выберите серию и тип ключа — получите точную цену</p>
            <Link
              to="/?calculator=true"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white font-medium transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 10px 40px rgba(245, 158, 11, 0.4)' }}
            >
              <Icon name="Calculator" size={18} />
              Открыть калькулятор
            </Link>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-light text-white/50 mb-4">Другие услуги</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { title: 'Чип-тюнинг BMW', desc: 'Увеличение мощности до 30%', link: '/chip-tuning' },
                { title: 'Кодирование BMW', desc: 'Активация скрытых функций', link: '/coding' },
                { title: 'Отключение экологии BMW', desc: 'EGR, DPF, ADBLUE, Euro 2', link: '/ecology' }
              ].map((s) => (
                <Link key={s.link} to={s.link} className="p-4 rounded-xl transition-all hover:scale-[1.02]" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="text-white font-light mb-1">{s.title}</div>
                  <div className="text-white/40 text-sm">{s.desc}</div>
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center pb-8">
            <a
              href={`${config.telegram}?text=${encodeURIComponent('Здравствуйте! Интересует изготовление ключа BMW')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-medium transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 10px 40px rgba(245, 158, 11, 0.4)' }}
            >
              <Icon name="Send" size={18} />
              Заказать ключ
            </a>
          </div>
        </div>
      </MainLayout>
    </>
  );
}