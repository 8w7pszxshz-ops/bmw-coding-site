import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import StickyContactButton from '@/components/StickyContactButton';
import Icon from '@/components/ui/icon';
import { City } from '@/components/CitySelector';
import { detectCityByGeolocation } from '@/utils/geolocation';
import { getCityConfig } from '@/utils/cityConfig';
import { updateSeoMeta, injectServiceSchema, injectBreadcrumbSchema, cleanupSchemas } from '@/utils/seo';

export default function EcologyPage() {
  const [selectedCity, setSelectedCity] = useState<City>('saratov');
  const [showCityPulse, setShowCityPulse] = useState(false);

  useEffect(() => {
    updateSeoMeta({
      title: 'Отключение экологии BMW — EGR, DPF, ADBLUE, Euro 2 | Reborn BMW',
      description: 'Отключение экологии BMW: EGR, DPF, ADBLUE, Euro 2. Программное удаление сажевого фильтра, клапана EGR, системы мочевины. Саратов, Москва.',
      path: '/ecology'
    });
    injectBreadcrumbSchema([
      { name: 'Главная', url: 'https://reborn-bmw.tech/' },
      { name: 'Отключение экологии BMW', url: 'https://reborn-bmw.tech/ecology' }
    ]);
    injectServiceSchema({ name: 'Отключение экологии BMW', description: 'Программное удаление EGR, DPF, ADBLUE, Euro 2 на BMW.', path: '/ecology' });

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

  const ecoSystems = [
    {
      name: 'EGR',
      fullName: 'Exhaust Gas Recirculation',
      desc: 'Система рециркуляции отработавших газов. Возвращает часть выхлопа обратно во впуск, что приводит к закоксовке впускного коллектора и снижению мощности.',
      problems: ['Закоксовка впускного коллектора', 'Потеря мощности', 'Повышенный расход топлива', 'Нестабильная работа двигателя'],
      priceAlone: '12 000 ₽',
      priceWithStage: '5 000 ₽'
    },
    {
      name: 'DPF',
      fullName: 'Diesel Particulate Filter',
      desc: 'Сажевый фильтр для дизельных двигателей. Со временем забивается сажей, что приводит к режиму аварийной работы и потере мощности.',
      problems: ['Потеря мощности до 40%', 'Аварийный режим двигателя', 'Частые регенерации', 'Дорогостоящая замена фильтра'],
      priceAlone: '12 000 ₽',
      priceWithStage: '5 000 ₽'
    },
    {
      name: 'ADBLUE',
      fullName: 'Система впрыска мочевины',
      desc: 'Система нейтрализации оксидов азота. Требует постоянной заправки реагента AdBlue. Выход из строя датчиков или насоса приводит к блокировке запуска двигателя.',
      problems: ['Блокировка запуска двигателя', 'Дорогие датчики и насос', 'Постоянные расходы на реагент', 'Ошибки системы SCR'],
      priceAlone: '20 000 ₽',
      priceWithStage: '20 000 ₽'
    },
    {
      name: 'Euro 2',
      fullName: 'Переход на стандарт Евро-2',
      desc: 'Программное отключение каталитических нейтрализаторов для бензиновых двигателей. Удаление ошибок кислородных датчиков после удаления катализатора.',
      problems: ['Забитый катализатор', 'Ошибки кислородных датчиков', 'Потеря мощности', 'Повышенный расход'],
      priceAlone: '12 000 ₽',
      priceWithStage: '5 000 ₽'
    }
  ];

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
            Отключение экологии <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">BMW</span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl font-light mb-8 leading-relaxed">
            Программное отключение экологических систем BMW: EGR, DPF, ADBLUE, Euro 2. 
            Решаем проблемы с сажевым фильтром, клапаном EGR и системой мочевины без замены деталей.
          </p>

          <div className="space-y-6 mb-12">
            {ecoSystems.map((sys) => (
              <div
                key={sys.name}
                className="p-6 rounded-2xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(20, 20, 30, 0.95) 0%, rgba(10, 10, 15, 0.98) 100%)',
                  border: '1px solid rgba(34, 197, 94, 0.2)',
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.6), transparent)' }} />
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white text-2xl font-light">{sys.name}</h3>
                      <span className="text-white/30 text-sm">{sys.fullName}</span>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed mb-3">{sys.desc}</p>
                    <div className="space-y-1">
                      {sys.problems.map((p, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Icon name="AlertTriangle" className="w-3 h-3 text-amber-400/60 flex-shrink-0" />
                          <span className="text-white/50 text-sm">{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:text-right flex-shrink-0">
                    <div className="text-white/40 text-xs mb-1">Отдельно</div>
                    <div className="text-white text-xl font-light mb-2">{sys.priceAlone}</div>
                    <div className="text-white/40 text-xs mb-1">С чип-тюнингом</div>
                    <div className="text-green-400 text-xl font-light">{sys.priceWithStage}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6">Почему отключают экологию</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Экологические системы BMW рассчитаны на европейское качество топлива. В условиях российского топлива 
              они выходят из строя значительно раньше срока. Замена сажевого фильтра у дилера стоит от 200 000 ₽, 
              радиатор EGR — от 42 000 ₽, ремонт системы AdBlue — от 100 000 ₽.
            </p>
            <p className="text-white/60 leading-relaxed">
              Программное отключение — это безопасная альтернатива дорогостоящему ремонту. 
              Двигатель работает стабильнее, увеличивается ресурс, снижается расход топлива.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6">Как это работает</h2>
            <div className="space-y-3">
              {[
                'Диагностика — определяем состояние экологических систем',
                'Считывание прошивки ЭБУ',
                'Программное отключение выбранных систем',
                'Удаление ошибок из памяти блока управления',
                'Проверка работы двигателя после отключения'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <Icon name="Check" className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white/80 font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6">Часто задаваемые вопросы</h2>
            <div className="space-y-4">
              {[
                { q: 'Безопасно ли отключение экологии для двигателя?', a: 'Да. Экологические системы не влияют на работу двигателя напрямую. Их отключение даже положительно сказывается на ресурсе — нет закоксовки от EGR, нет противодавления от забитого DPF.' },
                { q: 'Пройдёт ли автомобиль техосмотр?', a: 'В большинстве регионов России техосмотр не включает проверку экологического класса выхлопа. Визуально автомобиль не отличается.' },
                { q: 'Можно ли отключить экологию вместе с чип-тюнингом?', a: 'Да, и это самый выгодный вариант. При заказе вместе с чип-тюнингом стоимость отключения EGR/DPF/Euro2 снижается с 12 000₽ до 5 000₽ за каждую систему.' },
                { q: 'Увеличится ли мощность после отключения?', a: 'Если системы были неисправны — да, вы получите обратно потерянную мощность. Отключение DPF на дизеле может дать +5-10% к мощности за счёт снятия противодавления.' }
              ].map((faq, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 className="text-white font-medium mb-2">{faq.q}</h3>
                  <p className="text-white/60 font-light leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl mb-12 text-center" style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(34, 197, 94, 0.05))', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
            <h2 className="text-2xl font-light text-white mb-3">Выгоднее вместе с чип-тюнингом</h2>
            <p className="text-white/60 mb-4">Закажите чип-тюнинг + отключение экологии и сэкономьте до 70%</p>
            <Link
              to="/#chiptuning"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white font-medium transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 10px 40px rgba(34, 197, 94, 0.4)' }}
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
                { title: 'Изготовление ключей BMW', desc: 'Программирование ключей', link: '/keys' }
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
              href={`${config.telegram}?text=${encodeURIComponent('Здравствуйте! Интересует отключение экологии BMW')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-medium transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 10px 40px rgba(34, 197, 94, 0.4)' }}
            >
              <Icon name="Send" size={18} />
              Записаться на диагностику
            </a>
          </div>
        </div>
      </MainLayout>
    </>
  );
}