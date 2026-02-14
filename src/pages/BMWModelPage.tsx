import { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import StickyContactButton from '@/components/StickyContactButton';
import BurgerMenu from '@/components/BurgerMenu';
import Icon from '@/components/ui/icon';
import { City } from '@/components/CitySelector';
import { detectCityByGeolocation } from '@/utils/geolocation';
import { getCityConfig } from '@/utils/cityConfig';
import { getModelBySlug, bmwModels } from '@/data/bmwModels';
import { bmwEngines } from '@/data/bmwEngines';
import { updateSeoMeta, injectFaqSchema, injectBreadcrumbSchema, injectServiceSchema, cleanupSchemas } from '@/utils/seo';

export default function BMWModelPage() {
  const { slug } = useParams<{ slug: string }>();
  const [selectedCity, setSelectedCity] = useState<City>('saratov');
  const [showCityPulse, setShowCityPulse] = useState(false);

  const model = slug ? getModelBySlug(slug) : undefined;

  useEffect(() => {
    if (model) {
      const path = `/chip-tuning/${model.slug}`;
      updateSeoMeta({ title: model.metaTitle, description: model.metaDescription, path });
      injectBreadcrumbSchema([
        { name: 'Главная', url: 'https://reborn-bmw.tech/' },
        { name: 'Чип-тюнинг', url: 'https://reborn-bmw.tech/chip-tuning' },
        { name: model.name, url: `https://reborn-bmw.tech${path}` }
      ]);
      injectServiceSchema({ name: `Чип-тюнинг ${model.name}`, description: model.description, path });
      if (model.faq?.length) injectFaqSchema({ questions: model.faq });
    }

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
  }, [model]);

  if (!model) return <Navigate to="/chip-tuning" replace />;

  const config = getCityConfig(selectedCity);
  const relatedModels = bmwModels.filter(m => m.slug !== model.slug).slice(0, 4);
  const relatedEngines = bmwEngines.filter(e => 
    model.engines.some(me => me.name.toLowerCase().includes(e.name.toLowerCase()))
  ).slice(0, 3);

  return (
    <>
      <StickyContactButton selectedCity={selectedCity} />
      <BurgerMenu />
      <MainLayout selectedCity={selectedCity} onCityChange={setSelectedCity} showCityPulse={showCityPulse}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-6 flex-wrap">
            <Link to="/" className="hover:text-white/80 transition-colors">Главная</Link>
            <Icon name="ChevronRight" size={14} />
            <Link to="/chip-tuning" className="hover:text-white/80 transition-colors">Чип-тюнинг</Link>
            <Icon name="ChevronRight" size={14} />
            <span className="text-white/70">{model.generation}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extralight text-white mb-4 leading-tight">
            Чип-тюнинг <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">{model.name}</span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl font-light mb-3 leading-relaxed">{model.heroText}</p>
          <p className="text-white/40 text-sm mb-8">Годы выпуска: {model.years}</p>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6">Таблица мощности {model.generation}</h2>
            <div className="overflow-x-auto">
              <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: '0 4px' }}>
                <thead>
                  <tr>
                    <th className="text-left text-white/40 text-xs uppercase tracking-wider px-4 py-2">Двигатель</th>
                    <th className="text-left text-white/40 text-xs uppercase tracking-wider px-4 py-2">Сток</th>
                    <th className="text-left text-white/40 text-xs uppercase tracking-wider px-4 py-2">Stage 1</th>
                    <th className="text-left text-white/40 text-xs uppercase tracking-wider px-4 py-2">Прирост</th>
                  </tr>
                </thead>
                <tbody>
                  {model.engines.map((engine) => (
                    <tr key={engine.name} className="rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <td className="px-4 py-3 rounded-l-xl">
                        <span className="text-white font-light">{engine.name}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-white/60">{engine.power}</span>
                        <span className="text-white/30 text-xs ml-1">/ {engine.torque}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-white/80">{engine.stage1}</span>
                      </td>
                      <td className="px-4 py-3 rounded-r-xl">
                        <span className="text-red-400 font-medium">{engine.stage1power}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">{model.name} — обзор для тюнинга</h2>
            <p className="text-white/60 leading-relaxed mb-6">{model.description}</p>
            <div className="space-y-3">
              {model.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <Icon name="Check" className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white/80 font-light">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6">Кодирование {model.generation}</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Помимо чип-тюнинга, для {model.name} доступно кодирование скрытых функций:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {model.codingOptions.map((option, i) => (
                <div key={i} className="flex items-center gap-2 p-3 rounded-xl" style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.15)' }}>
                  <Icon name="Check" className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm font-light">{option}</span>
                </div>
              ))}
            </div>
            <Link to="/coding" className="inline-flex items-center gap-2 mt-4 text-blue-400 hover:text-blue-300 text-sm transition-colors">
              Все опции кодирования <Icon name="ArrowRight" size={14} />
            </Link>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6">Часто задаваемые вопросы о {model.generation}</h2>
            <div className="space-y-4">
              {model.faq.map((faq, i) => (
                <div key={i} className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 className="text-white font-medium mb-2">{faq.q}</h3>
                  <p className="text-white/60 font-light leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl mb-12 text-center" style={{ background: 'linear-gradient(135deg, rgba(231, 34, 46, 0.15), rgba(231, 34, 46, 0.05))', border: '1px solid rgba(231, 34, 46, 0.3)' }}>
            <h2 className="text-2xl font-light text-white mb-3">Записаться на чип-тюнинг {model.generation}</h2>
            <p className="text-white/60 mb-4">Бесплатная диагностика + расчёт мощности для вашего {model.name}</p>
            <a
              href={config.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white font-medium transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, rgba(231, 34, 46, 0.9), rgba(231, 34, 46, 0.7))', boxShadow: '0 10px 40px rgba(231, 34, 46, 0.4)' }}
            >
              <Icon name="MessageCircle" size={18} />
              Записаться в Telegram
            </a>
          </div>

          {relatedEngines.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-light text-white/50 mb-4">Двигатели {model.generation}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {relatedEngines.map((engine) => (
                  <Link
                    key={engine.slug}
                    to={`/engines/${engine.slug}`}
                    className="p-4 rounded-xl transition-all hover:scale-[1.02]"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <h3 className="text-white font-light mb-1">BMW {engine.name}</h3>
                    <p className="text-white/40 text-xs">{engine.type} • {engine.displacement}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mb-12">
            <h2 className="text-xl font-light text-white/50 mb-4">Другие модели</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {relatedModels.map((m) => (
                <Link
                  key={m.slug}
                  to={`/chip-tuning/${m.slug}`}
                  className="p-4 rounded-xl transition-all hover:scale-[1.02]"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <h3 className="text-white font-light text-sm mb-1">{m.generation}</h3>
                  <p className="text-white/40 text-xs">{m.series} • {m.years}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-light text-white/50 mb-4">Другие услуги</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { title: 'Кодирование BMW', desc: 'Активация скрытых функций', link: '/coding' },
                { title: 'Изготовление ключей BMW', desc: 'Программирование ключей', link: '/keys' },
                { title: 'Отключение экологии BMW', desc: 'EGR, DPF, ADBLUE, Euro 2', link: '/ecology' },
              ].map((s) => (
                <Link
                  key={s.link}
                  to={s.link}
                  className="p-4 rounded-xl transition-all hover:scale-[1.02]"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <h3 className="text-white font-light mb-1">{s.title}</h3>
                  <p className="text-white/40 text-xs">{s.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}